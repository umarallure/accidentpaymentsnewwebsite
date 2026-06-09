import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";
import { faqs, site } from "@/lib/site";

export function Faq() {
  return (
    <section id="faq" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Left: heading + help prompt */}
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            FAQ
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
            Questions, answered
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">
            Everything you need to know before you start. Still unsure? A free review costs you
            nothing and answers the rest.
          </p>
          <a
            href={site.ctaHref}
            className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-white/10"
          >
            {site.ctaLabel}
          </a>
        </Reveal>

        {/* Right: accordion */}
        <Reveal delay={0.1}>
          <Accordion
            multiple={false}
            defaultValue={[faqs[0].id]}
            className="overflow-hidden rounded-2xl border border-border/70 bg-card/50 ring-1 ring-white/5"
          >
            {faqs.map((f) => (
              <AccordionItem
                key={f.id}
                value={f.id}
                className="border-b border-border/60 px-5 last:border-b-0"
              >
                <AccordionTrigger className="py-5 text-[15px] font-semibold text-foreground hover:no-underline">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="pr-6 text-sm leading-relaxed text-muted-foreground">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
