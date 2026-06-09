// Server-only Aloware client. Reads only non-public env vars, so Next.js
// will refuse to bundle them into client output.

const BASE_URL = "https://app.aloware.io/api/v1";

export type AlowareContactInput = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  lead_source?: string;
  notes?: string;
};

export type AlowareResult = {
  ok: boolean;
  status: number;
  body: unknown;
};

// Creates (or updates, if force_update is set and the contact exists) a
// contact in Aloware via their Lead API:
//   POST https://app.aloware.io/api/v1/webhook/forms
// Docs: https://support.aloware.com/en/articles/9020058-aloware-lead-api-documentation
//
// api_token is passed in the JSON body per Aloware's spec (not a header).
export async function createAlowareContact(input: AlowareContactInput): Promise<AlowareResult> {
  const token = process.env.ALOWARE_API_TOKEN || process.env.VITE_ALOWARE_API_TOKEN;
  if (!token) {
    return {
      ok: false,
      status: 0,
      body: {
        error: "ALOWARE_API_TOKEN or VITE_ALOWARE_API_TOKEN not configured",
      },
    };
  }

  const payload: Record<string, unknown> = {
    api_token: token,
    first_name: input.first_name,
    last_name: input.last_name,
    name: `${input.first_name} ${input.last_name}`.trim(),
    email: input.email,
    phone_number: input.phone_number,
    lead_source: input.lead_source ?? "Website SMS Opt-In",
    notes: input.notes,
    force_update: true,
  };

  if (process.env.ALOWARE_TAG_ID) payload.tag_id = process.env.ALOWARE_TAG_ID;
  if (process.env.ALOWARE_LINE_ID) payload.line_id = process.env.ALOWARE_LINE_ID;
  if (process.env.ALOWARE_RING_GROUP_ID) {
    payload.ring_group_id = process.env.ALOWARE_RING_GROUP_ID;
    payload.distribute_to_ring_group = true;
  }

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/webhook/forms`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    return {
      ok: false,
      status: 0,
      body: {
        error: error instanceof Error ? error.message : "Could not reach Aloware",
      },
    };
  }

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = { message: await res.text() };
  }

  return { ok: res.ok, status: res.status, body };
}
