import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { CaseTypes } from "@/components/sections/case-types";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, serviceSchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* FAQ + Service structured data — matches the visible FAQ accordion and
          case-types grid below, making the page eligible for FAQ rich results. */}
      <JsonLd schema={[faqSchema(), serviceSchema()]} />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Process />
        <CaseTypes />
        <About />
        <Testimonials />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
