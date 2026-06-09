import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { MiniFooter } from "@/components/sections/mini-footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import {
  COMPANY_NAME,
  PRIVACY_POLICY_UPDATED_LABEL,
  SMS_PROGRAM_MESSAGE_TYPES,
  WEBSITE_HOSTNAME,
  WEBSITE_URL,
} from "@/lib/sms-compliance";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Accident Payments collects, uses, shares, and protects personal information, including SMS consent and mobile data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <Navbar />
      <main className="flex-1">
        {/* Header */}
        <div className="border-b border-border/60">
          <div className="mx-auto max-w-4xl px-4 pt-32 pb-10 sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
              Legal
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance text-foreground">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: {PRIVACY_POLICY_UPDATED_LABEL}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Introduction</h2>
              <p className="leading-relaxed text-muted-foreground">
                {COMPANY_NAME} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the
                website <strong className="text-foreground">{WEBSITE_HOSTNAME}</strong>. This
                Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website, request services from us, or opt in to
                receive SMS or other communications from us.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Information We Collect</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Fill out a contact form or case review form on our website</li>
                <li>Provide a mobile number and opt in to receive SMS messages</li>
                <li>Subscribe to our communications</li>
                <li>Communicate with us through our website or by text message</li>
              </ul>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                The types of personal information we may collect include:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Contact Information:</strong> First name, last
                  name, email address, and mobile phone number
                </li>
                <li>
                  <strong className="text-foreground">Case Information:</strong> Details about your
                  legal matter, including accident type, location, and description
                </li>
                <li>
                  <strong className="text-foreground">SMS Consent and Preference Data:</strong>{" "}
                  Records of your consent to receive text messages, including checkbox selections,
                  timestamps, policy versions, IP address, page URL, and user agent
                </li>
                <li>
                  <strong className="text-foreground">Usage Data:</strong> Information about how you
                  interact with our website, collected automatically through cookies and analytics
                  tools
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                How We Use Your Information
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>To respond to your inquiries and provide case review services</li>
                <li>
                  To review your request and, when appropriate and requested by you, help facilitate
                  contact with an independent attorney or law firm
                </li>
                <li>
                  To send SMS messages you have specifically opted in to receive, including{" "}
                  {SMS_PROGRAM_MESSAGE_TYPES}
                </li>
                <li>To improve our website, services, and user experience</li>
                <li>
                  To maintain consent records and satisfy legal, carrier, and compliance
                  requirements
                </li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">SMS/Text Messaging Policy</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                If you opt in to receive SMS text messages from {COMPANY_NAME}:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>Message types may include {SMS_PROGRAM_MESSAGE_TYPES}</li>
                <li>Message frequency varies</li>
                <li>Message and data rates may apply</li>
                <li>
                  You may opt out at any time by replying{" "}
                  <strong className="text-foreground">STOP</strong> to any text message
                </li>
                <li>
                  Reply <strong className="text-foreground">HELP</strong> to any text message for
                  support, or use the contact options available on our website
                </li>
                <li>Consent to receive SMS is not a condition of purchase or service</li>
              </ul>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Submitting a case review or contact request does not, by itself, enroll you in SMS.
                We send text messages only after you provide your mobile number and affirmatively
                check the SMS consent box displayed with the required disclosures.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Data Sharing and Third Parties
              </h2>
              <p className="mb-4 rounded-r-lg border-l-4 border-primary bg-primary/10 p-4 leading-relaxed font-semibold text-foreground">
                We do not share, sell, rent, or trade your personal information, including mobile
                numbers or SMS opt-in data, with third parties or affiliates for their marketing or
                promotional purposes.
              </p>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                We may share your information only in the following limited circumstances:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Requested Service Fulfillment:</strong> With
                  an independent attorney or law firm only when you have asked us to help facilitate
                  a case review or similar requested service
                </li>
                <li>
                  <strong className="text-foreground">Service Providers:</strong> With trusted
                  service providers who assist in operating our website and services (such as
                  hosting, analytics, form processing, and messaging delivery), each bound by
                  appropriate confidentiality and data-protection obligations
                </li>
                <li>
                  <strong className="text-foreground">Legal Requirements:</strong> When required by
                  law, court order, or governmental regulation
                </li>
              </ul>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Text messaging originator opt-in data and consent will not be shared with any third
                parties except vendors, platforms, and carriers that help us deliver the messaging
                services you requested.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Cookies and Analytics</h2>
              <p className="leading-relaxed text-muted-foreground">
                Our website uses cookies and similar technologies, including Google Analytics, to
                analyze website traffic and improve your experience. These tools may collect
                information such as your IP address, browser type, pages visited, and time spent on
                the site. This data is collected in aggregate and does not personally identify you.
                You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Data Security</h2>
              <p className="leading-relaxed text-muted-foreground">
                We implement reasonable administrative, technical, and physical security measures to
                protect your personal information from unauthorized access, use, or disclosure.
                However, no method of transmission over the Internet or electronic storage is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Data Retention</h2>
              <p className="leading-relaxed text-muted-foreground">
                We retain your personal information only for as long as necessary to fulfill the
                purposes described in this Privacy Policy, or as required by law. SMS consent
                records are retained for the duration of your subscription and for a reasonable
                period after you opt out, as needed for legal, carrier, and compliance purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Your Rights</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Depending on your location, you may have certain rights regarding your personal
                information, including:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>The right to access the personal information we hold about you</li>
                <li>The right to request correction of inaccurate information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to opt out of SMS communications at any time by replying STOP</li>
                <li>The right to withdraw consent for data processing</li>
              </ul>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                To exercise any of these rights, please contact us using the information provided
                below.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Children&apos;s Privacy</h2>
              <p className="leading-relaxed text-muted-foreground">
                Our services are not directed to individuals under the age of 18. We do not
                knowingly collect personal information from children. If you believe we have
                inadvertently collected information from a child, please contact us immediately so
                we can delete it.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">
                Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                We may update this Privacy Policy from time to time. Any changes will be posted on
                this page with a revised &quot;Last updated&quot; date. We encourage you to review
                this Privacy Policy periodically to stay informed about how we protect your
                information.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Contact Us</h2>
              <p className="leading-relaxed text-muted-foreground">
                If you have any questions or concerns about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="mt-4 rounded-xl border border-border/60 bg-card p-6">
                <p className="text-lg font-semibold text-foreground">{COMPANY_NAME}</p>
                <p className="mt-2 text-muted-foreground">
                  Website:{" "}
                  <a href={WEBSITE_URL} className="text-primary hover:text-primary/80">
                    {WEBSITE_HOSTNAME}
                  </a>
                </p>
                <p className="mt-2 text-muted-foreground">
                  SMS Support: Reply <strong className="text-foreground">HELP</strong> to any
                  message sent through our SMS program.
                </p>
              </div>
            </section>

            <section className="mt-8 border-t border-border/60 pt-8">
              <p className="text-sm text-muted-foreground">
                See also:{" "}
                <Link href="/terms" className="text-primary underline hover:text-primary/80">
                  Terms and Conditions
                </Link>
              </p>
            </section>
          </div>
        </div>
      </main>
      <MiniFooter />
    </>
  );
}
