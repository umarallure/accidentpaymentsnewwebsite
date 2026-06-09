import type { Metadata } from "next";

// Utility opt-in page — useful to people who land on it, but thin/duplicative
// for search. Keep it out of the index while leaving links followable.
export const metadata: Metadata = {
  title: "SMS Sign Up",
  description:
    "Sign up to receive important updates and notifications from Accident Payments via text message. Message and data rates may apply. Reply STOP to unsubscribe.",
  alternates: { canonical: "/sms-signup" },
  robots: {
    index: false,
    follow: true,
  },
};

export default function SmsSignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
