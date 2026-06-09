import {
  Car,
  User,
  HardHat,
  TriangleAlert,
  Stethoscope,
  Gavel,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { caseTypes, type CaseType, site } from "@/lib/site";

const iconMap: Record<CaseType["icon"], LucideIcon> = {
  car: Car,
  user: User,
  hardhat: HardHat,
  alert: TriangleAlert,
  stethoscope: Stethoscope,
  gavel: Gavel,
};

export function CaseTypes() {
  return (
    <section id="case-types" className="relative scroll-mt-24 py-24 md:py-32">
      {/* faint grid texture */}
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Case Types"
          title="The claims we help people win"
          description="If someone else's negligence left you hurt, there's likely a case here. Not sure? A free review will tell you in minutes."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {caseTypes.map((type, i) => {
            const Icon = iconMap[type.icon];
            return (
              <Reveal key={type.title} delay={(i % 3) * 0.08}>
                <a
                  href={site.ctaHref}
                  className="group relative flex h-full flex-col rounded-3xl border border-border/70 bg-card/60 p-6 ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card"
                >
                  <div className="flex items-start justify-between">
                    <div className="grid size-12 place-items-center rounded-2xl bg-primary/12 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-6" />
                    </div>
                    <ArrowUpRight className="size-5 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {type.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {type.blurb}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {type.examples.map((ex) => (
                      <span
                        key={ex}
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
