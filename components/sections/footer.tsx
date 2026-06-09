"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.ap-footer {
  --pill-bg-1: color-mix(in oklch, var(--foreground) 4%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 12%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-bg-1-hover: color-mix(in oklch, var(--primary) 14%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--primary) 50%, transparent);
}

@keyframes ap-footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.55; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.9; }
}
@keyframes ap-footer-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.ap-animate-breathe { animation: ap-footer-breathe 8s ease-in-out infinite alternate; }
.ap-animate-marquee { animation: ap-footer-marquee 38s linear infinite; }

.ap-footer-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3.5%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3.5%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}
.ap-footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 22%, transparent) 0%,
    color-mix(in oklch, var(--primary) 8%, transparent) 38%,
    transparent 70%
  );
}
.ap-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 0 10px 30px -10px var(--pill-shadow), inset 0 1px 1px var(--pill-highlight), inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.ap-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2) 100%);
  border-color: var(--pill-border-hover);
  color: var(--foreground);
}
.ap-giant-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--foreground) 6%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 14%, transparent) 0%, transparent 62%);
  -webkit-background-clip: text;
  background-clip: text;
}
.ap-text-glow {
  background: linear-gradient(180deg, var(--foreground) 0%, color-mix(in oklch, var(--foreground) 42%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 22px color-mix(in oklch, var(--primary) 18%, transparent));
}
`;

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const element = localRef.current;
      if (!element) return;
      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(element, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.04,
            ease: "power2.out",
            duration: 0.4,
          });
        };
        const onLeave = () => {
          gsap.to(element, { x: 0, y: 0, scale: 1, ease: "elastic.out(1, 0.3)", duration: 1.1 });
        };
        element.addEventListener("mousemove", onMove as EventListener);
        element.addEventListener("mouseleave", onLeave);
        return () => {
          element.removeEventListener("mousemove", onMove as EventListener);
          element.removeEventListener("mouseleave", onLeave);
        };
      }, element);
      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          localRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef)
            (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
MagneticButton.displayName = "MagneticButton";

const marqueeWords = [
  "Free Case Review",
  "No Win · No Fee",
  "All 50 States",
  "Top Injury Lawyers",
  "Maximum Compensation",
];

const MarqueeRun = () => (
  <div className="flex items-center gap-12 px-6">
    {marqueeWords.map((w) => (
      <React.Fragment key={w}>
        <span>{w}</span>
        <span className="text-primary/60">✦</span>
      </React.Fragment>
    ))}
  </div>
);

const linkColumns = [
  {
    title: "Company",
    links: [
      { label: "How it works", href: "/#process" },
      { label: "About us", href: "/#about" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Case types",
    links: [
      { label: "Auto accidents", href: "/#case-types" },
      { label: "Personal injury", href: "/#case-types" },
      { label: "Workplace injury", href: "/#case-types" },
      { label: "Medical malpractice", href: "/#case-types" },
    ],
  },
  {
    title: "Get started",
    links: [
      { label: "Free case review", href: "/case-review" },
      { label: "SMS sign up", href: "/sms-signup" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

export function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.85, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
      gsap.fromTo(
        [headingRef.current, contentRef.current],
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="ap-footer fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground">
          {/* Ambient */}
          <div className="ap-footer-aurora ap-animate-breathe pointer-events-none absolute top-1/2 left-1/2 z-0 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[80px]" />
          <div className="ap-footer-grid pointer-events-none absolute inset-0 z-0" />

          {/* Giant brand text */}
          <div
            ref={giantTextRef}
            className="ap-giant-text pointer-events-none absolute -bottom-[4vh] left-1/2 z-0 -translate-x-1/2 whitespace-nowrap select-none"
          >
            PAYMENTS
          </div>

          {/* Diagonal marquee */}
          <div className="absolute top-10 left-0 z-10 w-full scale-110 -rotate-2 overflow-hidden border-y border-border/50 bg-background/60 py-3.5 backdrop-blur-md">
            <div className="flex w-max animate-[ap-footer-marquee_38s_linear_infinite] text-xs font-bold tracking-[0.3em] text-muted-foreground uppercase md:text-sm">
              <MarqueeRun />
              <MarqueeRun />
            </div>
          </div>

          {/* Center CTA */}
          <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pt-20">
            <h2
              ref={headingRef}
              className="ap-text-glow text-center text-4xl font-black tracking-tighter md:text-7xl"
            >
              Ready To Get What
              <br />
              You&apos;re Owed?
            </h2>

            <div ref={contentRef} className="mt-10 flex w-full flex-col items-center gap-12">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton
                  as="a"
                  href={site.ctaHref}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-[0_14px_40px_-10px] shadow-primary/60 md:text-base"
                >
                  {site.ctaLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </MagneticButton>
                <MagneticButton
                  as="a"
                  href={site.phoneHref}
                  className="ap-glass-pill inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-foreground md:text-base"
                >
                  <Phone className="size-4 text-primary" />
                  {site.phone}
                </MagneticButton>
              </div>

              {/* Quick link columns */}
              <nav className="grid w-full max-w-3xl grid-cols-2 gap-8 sm:grid-cols-3">
                {linkColumns.map((col) => (
                  <div key={col.title}>
                    <p className="text-xs font-bold tracking-widest text-primary/80 uppercase">
                      {col.title}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {col.links.map((l) => (
                        <li key={l.label}>
                          <a
                            href={l.href}
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {l.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 flex w-full flex-col items-center gap-5 px-6 pb-8 md:flex-row md:justify-between md:px-12">
            <Logo className="h-7" />

            <p className="order-3 text-[11px] font-medium tracking-widest text-muted-foreground uppercase md:order-2">
              © {year} {site.name}. All rights reserved.
            </p>

            <div className="order-2 flex items-center gap-5 md:order-3">
              <a
                href="/privacy-policy"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Terms of Service
              </a>
              <MagneticButton
                as="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="ap-glass-pill grid size-10 place-items-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <ArrowRight className="size-4 -rotate-90" />
              </MagneticButton>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
