import { FileText, PhoneCall, BadgeDollarSign, type LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { processSteps, type ProcessStep } from "@/lib/site";
import { cn } from "@/lib/utils";

const iconMap: Record<ProcessStep["icon"], LucideIcon> = {
  file: FileText,
  phone: PhoneCall,
  dollar: BadgeDollarSign,
};

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Our Process"
          title="Help is three simple steps away"
          description="No call centers. No confusing paperwork. Just a fast, free path to a real attorney who fights for what you're owed."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {processSteps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <Reveal key={step.step} delay={i * 0.1}>
                <article
                  className={cn(
                    "group relative h-full overflow-hidden rounded-3xl border border-border/70 bg-card p-7",
                    "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_24px_60px_-40px_rgba(0,0,0,0.9)]",
                    "ring-1 ring-white/5 transition-colors hover:border-primary/40",
                  )}
                >
                  {/* glow on hover */}
                  <div className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  {/* window dots, echoing the source card */}
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-muted-foreground/30" />
                      <span className="size-2 rounded-full bg-muted-foreground/30" />
                      <span className="size-2 rounded-full bg-muted-foreground/30" />
                    </span>
                    <span className="font-mono text-5xl leading-none font-bold text-white/5 transition-colors group-hover:text-primary/15">
                      {step.step}
                    </span>
                  </div>

                  <div className="mt-6 grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/20">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
