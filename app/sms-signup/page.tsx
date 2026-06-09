"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { MiniFooter } from "@/components/sections/mini-footer";
import { CHECKBOX_SMS_TEXT, CHECKBOX_TERMS_TEXT, COMPANY_NAME } from "@/lib/sms-compliance";

type FieldErrors = Partial<
  Record<"firstName" | "lastName" | "email" | "phone" | "termsConsent" | "form", string>
>;

export default function SmsSignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [termsConsent, setTermsConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionWarning, setSubmissionWarning] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!formData.firstName.trim()) next.firstName = "First name is required";
    if (!formData.lastName.trim()) next.lastName = "Last name is required";
    if (!formData.email.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      next.email = "Enter a valid email address";
    const digits = formData.phone.replace(/\D+/g, "");
    if (digits && (digits.length < 10 || digits.length > 11))
      next.phone = "Enter a valid US mobile phone number";
    if (!termsConsent) next.termsConsent = "You must accept the Terms and Privacy Policy";
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setErrors({});
    setSubmissionWarning(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/sms-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          smsConsent,
          termsConsent,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data?.details) {
          const fieldErrors: FieldErrors = {};
          for (const [key, messages] of Object.entries(data.details as Record<string, string[]>)) {
            fieldErrors[key as keyof FieldErrors] = messages?.[0];
          }
          setErrors(fieldErrors);
        } else {
          setErrors({
            form: data?.error || "Something went wrong. Please try again.",
          });
        }
        return;
      }

      setSubmissionWarning(typeof data?.warning === "string" ? data.warning : null);
      setSubmitted(true);
    } catch {
      setErrors({
        form: "Network error. Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    const submittedWithPhone = formData.phone.replace(/\D+/g, "").length > 0;
    const willReceiveSms = submittedWithPhone && smsConsent;

    return (
      <>
        <Navbar />
        <main className="flex flex-1 items-center justify-center px-4 pt-32 pb-20">
          <div className="w-full max-w-md rounded-3xl border border-border/70 bg-card p-8 text-center ring-1 ring-white/5">
            <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/25">
              <CheckCircle2 className="size-8" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-foreground">You&apos;re Signed Up!</h2>
            <p className="mb-6 text-muted-foreground">
              {willReceiveSms
                ? "Thank you for signing up. You will receive SMS notifications at the number provided. Reply STOP at any time to unsubscribe."
                : "Thank you for signing up. Your preferences have been recorded."}
            </p>
            {submissionWarning && (
              <div className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                {submissionWarning}
              </div>
            )}
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to Home
            </Link>
          </div>
        </main>
        <MiniFooter />
      </>
    );
  }

  const inputBase =
    "block w-full rounded-xl border bg-black/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 outline-none transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20";
  const inputOk = "border-white/12";
  const inputErr = "border-destructive/70 bg-destructive/5";

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Header band */}
        <div className="bg-gradient-to-r from-primary to-orange-600 px-4 pt-32 pb-12 text-primary-foreground">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
              Stay Updated with {COMPANY_NAME}
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Sign up to receive important updates and notifications via text message.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-xl px-4 py-12 sm:px-6">
          <div className="rounded-3xl border border-border/70 bg-card p-6 ring-1 ring-white/5 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    First Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`${inputBase} ${errors.firstName ? inputErr : inputOk}`}
                    placeholder="Enter your first name"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="mt-1 text-sm text-destructive">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    Last Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`${inputBase} ${errors.lastName ? inputErr : inputOk}`}
                    placeholder="Enter your last name"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="mt-1 text-sm text-destructive">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                    placeholder="Enter your email address"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-sm text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone field is optional; validate only when a value is provided. */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-sm font-semibold text-foreground"
                  >
                    Mobile Phone{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.phone ? inputErr : inputOk}`}
                    placeholder="(555) 123-4567"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="mt-1 text-sm text-destructive">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-border/60 pt-5" />

              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="smsConsent"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                    className="mt-1 size-5 flex-shrink-0 cursor-pointer rounded border-white/20 bg-black/40 accent-primary"
                  />
                  <label
                    htmlFor="smsConsent"
                    className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
                  >
                    {CHECKBOX_SMS_TEXT}
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="termsConsent"
                    checked={termsConsent}
                    onChange={(e) => {
                      setTermsConsent(e.target.checked);
                      if (errors.termsConsent)
                        setErrors((p) => ({ ...p, termsConsent: undefined }));
                    }}
                    className="mt-1 size-5 flex-shrink-0 cursor-pointer rounded border-white/20 bg-black/40 accent-primary"
                    aria-invalid={!!errors.termsConsent}
                  />
                  <label
                    htmlFor="termsConsent"
                    className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
                  >
                    I have reviewed and accept {COMPANY_NAME}&apos;s{" "}
                    <Link
                      href="/terms"
                      className="text-primary underline hover:text-primary/80"
                      target="_blank"
                    >
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-primary underline hover:text-primary/80"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </label>
                </div>
                {/* Screen-reader-only copy of the exact consent string captured
                    to sms_consents, so the recorded text matches what sighted
                    users see even though the visible version contains links. */}
                <span className="sr-only">{CHECKBOX_TERMS_TEXT}</span>
                {errors.termsConsent && (
                  <p className="mt-1 ml-8 text-sm text-destructive">{errors.termsConsent}</p>
                )}
              </div>

              <div className="mt-2 rounded-xl border border-border/60 bg-black/30 p-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  By submitting this form, I consent to receive calls and emails from {COMPANY_NAME}{" "}
                  using the contact information provided above. If I check the SMS box, I also agree
                  to receive text messages from {COMPANY_NAME}, including messages sent via
                  automation. Consent is not a condition of purchase. Message and data rates may
                  apply. Message frequency varies. You may unsubscribe any time by reply STOP via
                  text message or clicking the unsubscribe link via email. Reply HELP anytime for
                  assistance.
                </p>
                <div className="mt-3 flex gap-4">
                  <Link
                    href="/privacy-policy"
                    className="text-xs text-primary underline hover:text-primary/80"
                    target="_blank"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-xs text-primary underline hover:text-primary/80"
                    target="_blank"
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </div>

              {errors.form && (
                <div className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errors.form}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-primary py-3.5 text-lg font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Signing Up..." : "Sign Up"}
              </button>

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-primary" />
                Your information is private &amp; secure.
              </p>
            </form>
          </div>
        </div>
      </main>
      <MiniFooter />
    </>
  );
}
