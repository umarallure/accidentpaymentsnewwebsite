"use client";

import {
  Check,
  ArrowRight,
  Car,
  Stethoscope,
  HardHat,
  TriangleAlert,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import ColorBends from "@/components/ColorBends";
import CountUp from "@/components/CountUp";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const promises = [
  {
    title: "Nationwide network",
    body: "Vetted personal-injury lawyers in all 50 states, matched to your specific claim type.",
  },
  {
    title: "Pay nothing up front",
    body: "Our attorneys work on contingency — fees only come out of a win, never your pocket.",
  },
  {
    title: "Real advice, fast",
    body: "A lawyer reaches out directly to discuss your case, usually within minutes.",
  },
];

type Settlement = {
  type: string;
  state: string;
  date: string;
  status: "Settled" | "Won";
  amount: string;
  icon: LucideIcon;
};

const settlements: Settlement[] = [
  { type: "Auto Accident", state: "TX", date: "May 2026", status: "Settled", amount: "$185,000", icon: Car },
  { type: "Medical Malpractice", state: "FL", date: "Apr 2026", status: "Won", amount: "$310,000", icon: Stethoscope },
  { type: "Workplace Injury", state: "GA", date: "Apr 2026", status: "Settled", amount: "$240,000", icon: HardHat },
  { type: "Slip & Fall", state: "TN", date: "Mar 2026", status: "Won", amount: "$92,500", icon: TriangleAlert },
];

const cardStats = [
  { value: "98%", label: "Win or settle rate" },
  { value: "$340M+", label: "Recovered this year" },
];

// Animated count-up figures for the stats band below the section.
const countStats = [
  { prefix: "$", to: 1.4, suffix: "B+", label: "Recovered for clients" },
  { prefix: "", to: 70, suffix: "K+", label: "Cases reviewed" },
  { prefix: "", to: 50, suffix: "", label: "States covered" },
  { prefix: "$", to: 0, suffix: "", label: "Cost unless you win" },
];

function StatusBadge({ status }: { status: Settlement["status"] }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium ring-1",
        status === "Won"
          ? "bg-emerald-500/12 text-emerald-300 ring-emerald-500/20"
          : "bg-primary/12 text-primary ring-primary/20",
      )}
    >
      {status}
    </span>
  );
}

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      {/* Reused ColorBends effect — different settings, faded right → left so it
          sits behind the card and never competes with the copy on the left. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-65 [mask-image:linear-gradient(to_left,black,transparent_70%)]">
          <ColorBends
            rotation={30}
            speed={0.2}
            scale={0.9}
            frequency={1.2}
            warpStrength={1}
            mouseInfluence={1}
            noise={0.15}
            parallax={0.5}
            iterations={1}
            intensity={2}
            bandWidth={6}
            transparent
            autoRotate={0}
            colors={["#F97316", "#000000"]}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        {/* Blend into the sections above and below */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        {/* Keep the left column crisp for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: message */}
          <Reveal id="why-free" className="scroll-mt-28">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
              Why it&apos;s free
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
              Don&apos;t let insurance companies take advantage
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
              Insurers make more money when they pay you less. {site.name} exists for one reason:{" "}
              {site.mission} We&apos;ve built a network of attorneys for every kind of claim — so the
              moment you need help, the right lawyer is already there.
            </p>

            <ul className="mt-8 space-y-4">
              {promises.map((p) => (
                <li key={p.title} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/25">
                    <Check className="size-3.5" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{p.title}</p>
                    <p className="text-sm text-muted-foreground">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={site.ctaHref}
              className="group mt-9 inline-flex h-12 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px] shadow-primary/60 transition-all hover:bg-primary/90 active:translate-y-px"
            >
              {site.ctaLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          {/* Right: case-outcomes card */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl border border-white/12 bg-card/70 ring-1 ring-white/5 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.95)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

              {/* Header */}
              <div className="flex items-start justify-between gap-3 border-b border-border/60 p-6">
                <div>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-muted-foreground/30" />
                    <span className="size-2 rounded-full bg-muted-foreground/30" />
                    <span className="size-2 rounded-full bg-muted-foreground/30" />
                  </span>
                  <h3 className="pt-2 text-lg font-semibold tracking-tight text-foreground">
                    Recent recoveries
                  </h3>
                  <p className="text-sm text-muted-foreground">Outcomes from our attorney network.</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/12 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/20">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Live
                </span>
              </div>

              {/* Stat tiles */}
              <div className="grid grid-cols-2 divide-x divide-border/60 border-b border-border/60">
                {cardStats.map((s) => (
                  <div key={s.label} className="px-6 py-5">
                    <p className="flex items-center gap-1.5 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                      {s.value}
                      <TrendingUp className="size-4 text-emerald-400" />
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Settlement list */}
              <ul>
                {settlements.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li
                      key={s.type}
                      className="flex items-center gap-3 border-b border-border/50 px-6 py-3.5 transition-colors last:border-b-0 hover:bg-white/[0.025]"
                    >
                      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="size-4.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{s.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {s.state} · {s.date}
                        </p>
                      </div>
                      <StatusBadge status={s.status} />
                      <p className="w-20 text-right text-sm font-semibold tabular-nums text-foreground">
                        {s.amount}
                      </p>
                    </li>
                  );
                })}
              </ul>

              {/* Footer */}
              <div className="flex items-center justify-between gap-3 border-t border-border/60 p-4 text-xs text-muted-foreground">
                <span>Outcomes vary by case.</span>
                <span className="font-medium text-primary">No fee unless you win</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats band */}
        <Reveal delay={0.05} className="mt-16 md:mt-20">
          <dl className="grid grid-cols-2 gap-y-10 rounded-3xl border border-border/60 bg-card/40 py-10 backdrop-blur-sm md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-border/50">
            {countStats.map((s, i) => (
              <div key={s.label} className="px-6 text-center">
                <dd className="flex items-baseline justify-center text-4xl font-bold tracking-tight text-primary tabular-nums md:text-5xl">
                  {s.prefix && <span>{s.prefix}</span>}
                  <CountUp from={0} to={s.to} duration={2} separator="," delay={i * 0.1} />
                  {s.suffix && <span>{s.suffix}</span>}
                </dd>
                <dt className="mt-2 text-sm text-muted-foreground">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
