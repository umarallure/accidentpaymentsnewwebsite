import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/sections/navbar";
import { MiniFooter } from "@/components/sections/mini-footer";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";
import {
  COMPANY_NAME,
  SMS_PROGRAM_MESSAGE_TYPES,
  TERMS_UPDATED_LABEL,
  WEBSITE_HOSTNAME,
  WEBSITE_URL,
} from "@/lib/sms-compliance";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for using Accident Payments website and services, including SMS messaging terms and support instructions.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms and Conditions", path: "/terms" },
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
              Terms and Conditions
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Last updated: {TERMS_UPDATED_LABEL}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Agreement to Terms</h2>
              <p className="leading-relaxed text-muted-foreground">
                By accessing or using the website{" "}
                <strong className="text-foreground">{WEBSITE_HOSTNAME}</strong> (&quot;the
                Site&quot;) operated by {COMPANY_NAME} (&quot;we,&quot; &quot;us,&quot; or
                &quot;our&quot;), you agree to be bound by these Terms and Conditions. If you do not
                agree with any part of these terms, you must not use the Site or our services.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Description of Services</h2>
              <p className="leading-relaxed text-muted-foreground">
                {COMPANY_NAME} is an information and case-intake platform. We provide educational
                resources related to personal injury, car accidents, medical malpractice,
                workers&apos; compensation, SSDI benefits, and other legal matters. If you request a
                case review, we may help facilitate contact with an independent attorney or law firm
                that may be able to evaluate your matter.
              </p>
              <div className="mt-4 rounded-r-lg border-l-4 border-amber-500 bg-amber-500/10 p-4">
                <p className="font-semibold text-foreground">Important Disclaimer:</p>
                <p className="mt-1 text-muted-foreground">
                  {COMPANY_NAME} is <strong className="text-foreground">not a law firm</strong> and
                  does not provide legal advice. The information on this website is for general
                  educational purposes only and should not be construed as legal advice. No
                  attorney-client relationship is formed by using this website or submitting a case
                  review. Any legal matter should be discussed with a licensed attorney in your
                  jurisdiction.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">User Responsibilities</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                By using this Site, you represent and warrant that:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>You are at least 18 years of age</li>
                <li>The information you provide is accurate, complete, and current</li>
                <li>You will not use the Site for any unlawful or prohibited purpose</li>
                <li>You will not attempt to interfere with the proper functioning of the Site</li>
                <li>
                  You will not submit false or misleading information through any form on the Site
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">SMS/Text Messaging Terms</h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                By opting in to receive SMS text messages from {COMPANY_NAME}, you agree to the
                following messaging terms:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  You consent to receive text messages from {COMPANY_NAME} at the mobile phone
                  number you provided, including messages sent via automated technology where
                  permitted by law
                </li>
                <li>Message types may include {SMS_PROGRAM_MESSAGE_TYPES}</li>
                <li>Message frequency varies</li>
                <li>Message and data rates may apply</li>
                <li>
                  Consent to receive SMS messages is{" "}
                  <strong className="text-foreground">not</strong> a condition of purchase or
                  receiving any services
                </li>
                <li>
                  You may opt out at any time by replying{" "}
                  <strong className="text-foreground">STOP</strong> to any message we send
                </li>
                <li>
                  For assistance, reply <strong className="text-foreground">HELP</strong> to any
                  message or visit{" "}
                  <a href={WEBSITE_URL} className="text-primary underline hover:text-primary/80">
                    {WEBSITE_HOSTNAME}
                  </a>
                </li>
                <li>
                  We send SMS only after you separately consent through a form that clearly
                  discloses the program terms
                </li>
              </ul>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Your SMS consent applies only to messages from {COMPANY_NAME}; it does not authorize
                unrelated third-party marketing texts. You understand that wireless carriers are not
                liable for delayed or undelivered messages.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Case Review Services</h2>
              <p className="leading-relaxed text-muted-foreground">
                When you submit a case review request, your information may be shared with an
                independent attorney or law firm for the purpose of evaluating your legal matter.
                Submitting a case review does not guarantee representation by any attorney. Any
                attorney-client relationship is formed directly between you and the attorney,
                subject to their own terms and agreements. Submitting a case review does not
                automatically enroll you in SMS messaging; text messaging requires separate opt-in
                consent.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Intellectual Property</h2>
              <p className="leading-relaxed text-muted-foreground">
                All content on the Site, including text, graphics, logos, images, articles, and
                software, is the property of Accident Payments or its content providers and is
                protected by copyright and intellectual property laws. You may not reproduce,
                distribute, modify, or create derivative works from any content on this Site without
                our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Limitation of Liability</h2>
              <p className="leading-relaxed text-muted-foreground">
                To the fullest extent permitted by law, Accident Payments and its affiliates,
                officers, employees, and agents shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages arising out of or related to your use of
                the Site or services. This includes, without limitation, damages for loss of
                profits, data, or other intangible losses, even if we have been advised of the
                possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Disclaimer of Warranties</h2>
              <p className="leading-relaxed text-muted-foreground">
                The Site and its content are provided on an &quot;as is&quot; and &quot;as
                available&quot; basis without warranties of any kind, either express or implied. We
                do not warrant that the Site will be uninterrupted, error-free, or free of viruses
                or other harmful components. We make no guarantees regarding the accuracy,
                completeness, or reliability of any content or information on the Site.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Third-Party Links</h2>
              <p className="leading-relaxed text-muted-foreground">
                The Site may contain links to third-party websites or services that are not owned or
                controlled by Accident Payments. We are not responsible for the content, privacy
                policies, or practices of any third-party sites. Accessing third-party links is at
                your own risk.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Indemnification</h2>
              <p className="leading-relaxed text-muted-foreground">
                You agree to indemnify and hold harmless Accident Payments, its affiliates,
                officers, employees, and agents from any claims, liabilities, damages, losses, or
                expenses (including reasonable attorney&apos;s fees) arising out of your use of the
                Site, violation of these Terms, or infringement of any rights of a third party.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Governing Law</h2>
              <p className="leading-relaxed text-muted-foreground">
                These Terms and Conditions shall be governed by and construed in accordance with the
                laws of the United States. Any disputes arising under these terms shall be subject
                to the exclusive jurisdiction of the courts in the applicable jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Changes to These Terms</h2>
              <p className="leading-relaxed text-muted-foreground">
                We reserve the right to modify or replace these Terms and Conditions at any time.
                Changes will be posted on this page with a revised &quot;Last updated&quot; date.
                Your continued use of the Site after any changes constitutes acceptance of the
                revised terms.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-foreground">Contact Us</h2>
              <p className="leading-relaxed text-muted-foreground">
                If you have any questions about these Terms and Conditions, please contact us:
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
                  SMS Help: Reply <strong className="text-foreground">HELP</strong> to any text
                  message from our SMS program.
                </p>
              </div>
            </section>

            <section className="mt-8 border-t border-border/60 pt-8">
              <p className="text-sm text-muted-foreground">
                See also:{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary underline hover:text-primary/80"
                >
                  Privacy Policy
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
