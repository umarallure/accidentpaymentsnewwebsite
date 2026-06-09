import { NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabase-server";
import { createAlowareContact, type AlowareResult } from "@/lib/aloware";
import {
  CHECKBOX_SMS_TEXT,
  CHECKBOX_TERMS_TEXT,
  PRIVACY_POLICY_VERSION,
  TERMS_VERSION,
} from "@/lib/sms-compliance";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// E.164-ish: optional +, 10-15 digits. Accepts user-typed formats like
// "(555) 123-4567" by stripping non-digits before validation.
const normalizePhone = (raw: string): string => {
  const digits = raw.replace(/\D+/g, "");
  if (!digits) return "";
  // US default: prepend +1 if 10 digits and not already prefixed.
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
};

const schema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  phone: z.string().trim().optional().default(""),
  smsConsent: z.boolean().optional().default(false),
  termsConsent: z.literal(true, {
    errorMap: () => ({
      message: "You must accept the Terms and Privacy Policy",
    }),
  }),
});

type RouteFieldErrors = Partial<Record<"phone" | "email" | "form", string[]>>;

type AlowareHandling =
  | { kind: "success" }
  | { kind: "user_error"; details: RouteFieldErrors }
  | { kind: "warning"; warning: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const toMessages = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
};

const getAlowareMessage = (body: unknown): string | null => {
  if (!isRecord(body)) return null;
  if (typeof body.error === "string" && body.error.trim()) return body.error.trim();
  if (typeof body.message === "string" && body.message.trim()) return body.message.trim();
  return null;
};

const getAlowareValidationErrors = (body: unknown): Record<string, string[]> => {
  if (!isRecord(body) || !isRecord(body.errors)) return {};

  const output: Record<string, string[]> = {};
  for (const [field, value] of Object.entries(body.errors)) {
    const messages = toMessages(value);
    if (messages.length > 0) output[field] = messages;
  }
  return output;
};

const mapAlowareFieldMessage = (field: "phone" | "email" | "form", message: string): string => {
  const lower = message.toLowerCase();

  if (field === "phone") {
    if (lower.includes("required")) return "Enter a valid mobile phone number";
    if (lower.includes("invalid") || lower.includes("empty"))
      return "Enter a valid mobile phone number";
  }

  if (field === "email" && lower.includes("invalid")) {
    return "Enter a valid email address";
  }

  return message;
};

const classifyAlowareResult = (aloware: AlowareResult): AlowareHandling => {
  if (aloware.ok) return { kind: "success" };

  const bodyMessage = getAlowareMessage(aloware.body);
  const rawErrors = getAlowareValidationErrors(aloware.body);
  const details: RouteFieldErrors = {};

  for (const [field, messages] of Object.entries(rawErrors)) {
    const mappedField =
      field === "phone_number" || field === "phone"
        ? "phone"
        : field === "email"
          ? "email"
          : field === "message"
            ? "form"
            : null;

    if (!mappedField) continue;

    details[mappedField] = messages.map((message) => mapAlowareFieldMessage(mappedField, message));
  }

  if (Object.keys(details).length > 0) {
    return { kind: "user_error", details };
  }

  const normalizedMessage = bodyMessage?.toLowerCase() ?? "";
  if (
    normalizedMessage.includes("phone number is empty or invalid") ||
    (normalizedMessage.includes("phone") && normalizedMessage.includes("invalid"))
  ) {
    return {
      kind: "user_error",
      details: { phone: ["Enter a valid mobile phone number"] },
    };
  }

  if (
    normalizedMessage.includes("already exists") ||
    normalizedMessage.includes("already been taken") ||
    normalizedMessage.includes("duplicate")
  ) {
    return {
      kind: "warning",
      warning:
        "This phone number is already on file. We recorded your latest signup and will review the existing contact.",
    };
  }

  return {
    kind: "warning",
    warning:
      "We received your signup, but could not fully sync it with our messaging platform yet. Our team will review it shortly.",
  };
};

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { firstName, lastName, email, phone, smsConsent, termsConsent } = parsed.data;

  const phoneDigits = phone.replace(/\D+/g, "");
  const normalizedPhone = phoneDigits ? normalizePhone(phone) : "";
  if (phoneDigits && (phoneDigits.length < 10 || phoneDigits.length > 11)) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: { phone: ["Enter a valid US mobile phone number"] },
      },
      { status: 400 },
    );
  }

  const headers = request.headers;
  const ip =
    headers.get("x-forwarded-for")?.split(",")[0].trim() || headers.get("x-real-ip") || null;
  const userAgent = headers.get("user-agent") || null;
  const pageUrl = headers.get("referer") || null;

  // 1. Forward to Aloware only when SMS consent and a phone number are present.
  //    We record the outcome in the same insert below so the audit row reflects
  //    what happened.
  let aloware: AlowareResult | null = null;
  let alowareHandling: AlowareHandling = { kind: "success" };

  if (smsConsent && normalizedPhone) {
    aloware = await createAlowareContact({
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: normalizedPhone,
      lead_source: "Website SMS Opt-In",
      notes: `Consent captured ${new Date().toISOString()} from ${pageUrl ?? "unknown page"}`,
    });
    alowareHandling = classifyAlowareResult(aloware);
  }

  if (aloware && !aloware.ok) {
    console.error("Aloware forwarding failed:", aloware.status, aloware.body);
  }

  if (alowareHandling.kind === "user_error") {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: alowareHandling.details,
      },
      { status: 400 },
    );
  }

  const alowareErrorText =
    !aloware || aloware.ok ? null : (getAlowareMessage(aloware.body) ?? `HTTP ${aloware.status}`);

  // 2. Write the consent record. No .select() — returning the inserted row
  //    would trigger a SELECT RLS check, and we intentionally have no SELECT
  //    policy (audit integrity). A single insert avoids that entirely.
  const { error: insertError } = await supabaseServer.from("sms_consents").insert({
    first_name: firstName,
    last_name: lastName,
    email,
    phone: normalizedPhone || null,
    sms_consent: smsConsent,
    terms_consent: termsConsent,
    checkbox_sms_text: CHECKBOX_SMS_TEXT,
    checkbox_terms_text: CHECKBOX_TERMS_TEXT,
    privacy_policy_version: PRIVACY_POLICY_VERSION,
    terms_version: TERMS_VERSION,
    ip_address: ip,
    user_agent: userAgent,
    page_url: pageUrl,
    aloware_forwarded: aloware?.ok ?? false,
    aloware_response: aloware ? (aloware.body as never) : null,
    aloware_error: alowareErrorText,
  });

  if (insertError) {
    console.error("sms_consents insert failed:", insertError);
    return NextResponse.json(
      { error: "Could not save your signup. Please try again." },
      { status: 500 },
    );
  }

  if (alowareHandling.kind === "warning") {
    return NextResponse.json(
      {
        success: true,
        warning: alowareHandling.warning,
      },
      { status: 202 },
    );
  }

  return NextResponse.json({ success: true });
}
