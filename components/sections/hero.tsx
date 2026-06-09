"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Clock, BadgeDollarSign } from "lucide-react";
import ColorBends from "@/components/ColorBends";
import TextType from "@/components/TextType";
import { StarRating } from "@/components/star-rating";
import { site, caseTypes, testimonials } from "@/lib/site";

const trustPoints = [
  { icon: ShieldCheck, label: "100% Free Review" },
  { icon: BadgeDollarSign, label: "No Win, No Fee" },
  { icon: Clock, label: "Lawyers Call in Minutes" },
];

// Cycled in the headline typing effect — each reads naturally after
// "Injured in a" and maps to a case type from the dropdown below.
const accidentPhrases = [
  "Car Accident?",
  "Truck Crash?",
  "Motorcycle Wreck?",
  "Slip & Fall?",
  "Workplace Accident?",
  "Rideshare Crash?",
  "Dog Attack?",
];

// Illustrative typical recovery ranges, shown in the lead card per case type.
const recoveryByType: Record<(typeof caseTypes)[number]["slug"], string> = {
  "auto-accident": "$15K – $185K",
  "personal-injury": "$10K – $150K",
  "workers-comp": "$20K – $240K",
  "slip-and-fall": "$8K – $95K",
  malpractice: "$50K – $310K",
  ssdi: "$1,500 / mo +",
};

const avatars = testimonials.slice(0, 4);

export function Hero() {
  const router = useRouter();
  const [caseType, setCaseType] = useState(caseTypes[0].slug);
  const [zip, setZip] = useState("");

  const selectedTitle = caseTypes.find((c) => c.slug === caseType)?.title ?? "your";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ type: caseType });
    if (zip.trim()) params.set("location", zip.trim());
    router.push(`/case-review?${params.toString()}`);
  };

  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Animated ColorBends backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <ColorBends
          rotation={60}
          speed={0.2}
          colors={["#F97316", "#000000"]}
          transparent
          autoRotate={0}
          scale={1.2}
          frequency={1.2}
          warpStrength={1}
          mouseInfluence={0}
          parallax={0.2}
          noise={0.15}
          iterations={1}
          intensity={2}
          bandWidth={3}
          style={{ width: "100%", height: "100%" }}
        />
        {/* Vignette + blend into the page below */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,transparent_30%,rgba(10,10,12,0.55)_75%,var(--background)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pt-28 pb-16 sm:gap-12 sm:pt-32 sm:pb-24 md:pt-44 md:pb-32 lg:flex-row lg:items-center">
        {/* Left: messaging */}
        <div className="flex-1">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur-md sm:mx-0">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            Free case review · Available in all 50 states
          </div>

          <h1 className="mt-5 text-center text-[2rem] leading-[1.1] font-bold tracking-tight text-balance text-foreground sm:mt-6 sm:text-left sm:text-5xl sm:leading-[1.08] md:text-6xl">
            <span className="block">Injured in a</span>
            {/* At text-[2rem] the longest phrase ("Workplace Accident?") fits on
                one line on common phone widths; the reserved min-height keeps the
                line stable so the typing effect doesn't nudge the layout. */}
            <span className="block min-h-[1.3em] sm:min-h-[1.15em]">
              <TextType
                as="span"
                text={accidentPhrases}
                typingSpeed={70}
                deletingSpeed={40}
                pauseDuration={1600}
                variableSpeed={{ min: 60, max: 105 }}
                showCursor
                cursorCharacter="|"
                cursorClassName="text-primary"
                cursorBlinkDuration={0.5}
                className="text-primary"
              />
            </span>
            {/* Divider separating the question from the promise */}
            <span
              aria-hidden
              className="mx-auto mt-4 mb-3 block h-px w-16 bg-gradient-to-r from-primary via-primary/50 to-transparent sm:mx-0 sm:mt-5 sm:mb-4"
            />
            <span className="block text-[1.7rem] text-gradient sm:text-4xl md:text-5xl">
              Get The Payout You Deserve.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:mt-6 md:text-lg">
            We connect you with a top personal-injury attorney near you in minutes. The review is
            free, and you pay <span className="font-semibold text-foreground"> nothing </span> unless
            your lawyer wins. Don&apos;t let insurance companies take advantage.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={site.ctaHref}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px] shadow-primary/60 transition-all hover:bg-primary/90 active:translate-y-px"
            >
              {site.ctaLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#process"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:bg-white/10"
            >
              See how it works
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-9">
            <div className="flex items-center gap-2.5">
              <StarRating rating={5} />
              <span className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">4.9/5</span> from 12,000+ claimants
              </span>
            </div>
            <div className="hidden h-4 w-px bg-white/15 sm:block" />
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {trustPoints.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <Icon className="size-4 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: lead capture card */}
        <div id="case-review" className="mt-14 w-full max-w-md scroll-mt-28 sm:mt-0 lg:w-[26rem]">
          <form
            onSubmit={handleSubmit}
            className="glass relative overflow-hidden rounded-3xl border border-white/12 p-6 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.85)] ring-1 ring-white/5 md:p-7"
          >
            {/* Accent flourishes */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
            <div className="pointer-events-none absolute -top-24 -right-16 size-48 rounded-full bg-primary/20 blur-3xl" />

            {/* Header */}
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground">
                  What&apos;s my claim worth?
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Free estimate · under 2 minutes
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/25">
                <span className="size-1.5 rounded-full bg-primary" />
                Free
              </span>
            </div>

            {/* Social proof: lawyers online */}
            <div className="relative mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex -space-x-2.5">
                {avatars.map((a) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={a.name}
                    src={a.image}
                    alt=""
                    width={28}
                    height={28}
                    loading="lazy"
                    className="size-7 rounded-full object-cover ring-2 ring-card"
                  />
                ))}
              </div>
              <div className="min-w-0 text-xs leading-tight">
                <p className="font-semibold text-foreground">2,300+ vetted lawyers</p>
                <p className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                  </span>
                  online &amp; ready to review
                </p>
              </div>
            </div>

            {/* Dynamic recovery estimate */}
            <div className="relative mt-4 flex items-center justify-between gap-3 rounded-2xl bg-primary/10 px-4 py-3 ring-1 ring-primary/20">
              <div className="min-w-0">
                <p className="text-[11px] font-medium tracking-wide text-primary/80 uppercase">
                  Typical {selectedTitle} recovery
                </p>
                <p className="text-lg font-bold tabular-nums text-foreground">
                  {recoveryByType[caseType]}
                </p>
              </div>
              <BadgeDollarSign className="size-7 shrink-0 text-primary/70" />
            </div>

            {/* Fields */}
            <div className="relative mt-5 space-y-4">
              <div>
                <label
                  htmlFor="caseType"
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                >
                  Type of accident
                </label>
                <div className="relative">
                  <select
                    id="caseType"
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value as typeof caseType)}
                    className="h-12 w-full appearance-none rounded-xl border border-white/12 bg-black/40 px-4 pr-10 text-sm text-foreground transition-colors outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  >
                    {caseTypes.map((t) => (
                      <option key={t.slug} value={t.slug} className="bg-neutral-900">
                        {t.title}
                      </option>
                    ))}
                  </select>
                  <ArrowRight className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="zip"
                  className="mb-1.5 block text-xs font-medium text-muted-foreground"
                >
                  Your location
                </label>
                <input
                  id="zip"
                  inputMode="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="City, State or ZIP code"
                  className="h-12 w-full rounded-xl border border-white/12 bg-black/40 px-4 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-[0_10px_30px_-8px] shadow-primary/60 transition-all hover:bg-primary/90 active:translate-y-px"
              >
                See what I qualify for
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            <p className="relative mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" />
              Your information is private &amp; secure.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
