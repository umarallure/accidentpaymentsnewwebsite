"use client";

import { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ShieldCheck, BadgeDollarSign, Clock, Lock, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { StarRating } from "@/components/star-rating";
import { site, caseTypes } from "@/lib/site";

// Fillout form per accident type, matched to the hero's case-type slugs.
const formIds = {
  "auto-accident": "16Jv2jDB3Tus",
  malpractice: "3fGY74GoG2us",
  "personal-injury": "wEBpcFpTixus",
  "workers-comp": "tMUmUCzECTus",
  "slip-and-fall": "oRFDU2hKRHus",
  ssdi: "aKz95Tnb9Gus",
} as const;

const trustChips = [
  { icon: ShieldCheck, label: "100% Free" },
  { icon: BadgeDollarSign, label: "No Win, No Fee" },
  { icon: Clock, label: "~2 Minutes" },
  { icon: Lock, label: "Private & Secure" },
];

function CaseReviewContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "auto-accident";
  const formId = formIds[type as keyof typeof formIds] || formIds["auto-accident"];
  const selected = caseTypes.find((c) => c.slug === type);

  // (Re)load the Fillout embed script whenever the form changes so the new
  // form node gets initialized — including on client-side navigation between
  // case types.
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://server.fillout.com/embed/v1/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [formId]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Ambient backdrop to match the brand palette */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-[50%] bg-primary/15 blur-[120px]" />
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(70%_50%_at_50%_0%,black,transparent)]" />
      </div>

      {/* Sticky header */}
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" aria-label={site.name}>
            <Logo className="h-6" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              <Phone className="size-4 text-primary" />
              {site.phone}
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back to site</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
            Free Case Review
            {selected && <span className="text-primary/60">· {selected.title}</span>}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
            Tell us about your case
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Answer a few quick questions and we&apos;ll connect you with a top injury attorney near
            you. It&apos;s free, confidential, and there&apos;s no obligation.
          </p>

          {/* Trust chips */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
            {trustChips.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground"
              >
                <Icon className="size-3.5 text-primary" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Embedded form card */}
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-border/70 bg-card ring-1 ring-white/5 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.9)]">
          {/* Loading state sits behind the iframe until Fillout paints over it */}
          <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <span className="size-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
            <span className="text-sm">Loading your secure form…</span>
          </div>

          <div
            key={formId}
            data-fillout-id={formId}
            data-fillout-embed-type="standard"
            data-fillout-inherit-parameters
            className="relative z-10"
            style={{ width: "100%", height: "min(82vh, 880px)", minHeight: "640px" }}
          />
        </div>

        {/* Reassurance footer */}
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-5">
          <div className="flex items-center gap-2">
            <StarRating rating={5} />
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4.9/5</span> from 12,000+ claimants
            </span>
          </div>
          <span className="hidden h-4 w-px bg-border sm:block" />
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Lock className="size-3.5 text-primary" />
            Your information is encrypted &amp; never sold.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function CaseReviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center text-muted-foreground">
          <span className="size-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
        </div>
      }
    >
      <CaseReviewContent />
    </Suspense>
  );
}
