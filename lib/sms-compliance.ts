// Compliance constants shared between the opt-in form and the API route.
// The strings here are the exact language the user sees and consents to; the
// API writes them verbatim into sms_consents so we have durable proof.
// Bump the version fields whenever the wording or policy materially changes.

export const COMPANY_NAME = "Accident Payments";
export const WEBSITE_URL = "https://www.accidentpayments.com";
export const WEBSITE_HOSTNAME = "accidentpayments.com";

export const PRIVACY_POLICY_VERSION = "2026-04-16";
export const TERMS_VERSION = "2026-04-16";

const formatComplianceDate = (isoDate: string): string =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));

export const PRIVACY_POLICY_UPDATED_LABEL = formatComplianceDate(PRIVACY_POLICY_VERSION);
export const TERMS_UPDATED_LABEL = formatComplianceDate(TERMS_VERSION);

export const SMS_PROGRAM_MESSAGE_TYPES =
  "appointment reminders, notifications, and other service-related updates";

export const CHECKBOX_SMS_TEXT =
  `By checking this box, I agree to receive SMS messages from ${COMPANY_NAME}, ` +
  "including appointment reminders and notifications. Message frequency varies. " +
  "Message and data rates may apply. Reply STOP to unsubscribe. Reply HELP for help. " +
  "Consent is not a condition of purchase.";

export const CHECKBOX_TERMS_TEXT = `I have reviewed and accept ${COMPANY_NAME}'s Terms and Conditions and Privacy Policy.`;
