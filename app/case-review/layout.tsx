import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

const title = "Free Case Review — Talk to a Top Injury Lawyer Near You";
const description =
  "Start your free, no-obligation case review. Tell us about your car accident, truck or motorcycle crash, slip & fall, workplace injury, medical malpractice, or disability claim and get connected with a top personal injury attorney near you in minutes. No win, no fee.";
 
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case-review" },
  openGraph: {
    title: `${title} · Accident Payments`,
    description,
    url: "/case-review",
    type: "website",
  },
};
 
export default function CaseReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Free Case Review", path: "/case-review" },
        ])}
      />
      {children}
    </>
  );
}
