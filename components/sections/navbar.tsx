"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { navItems, site } from "@/lib/site";

const TOP_BAR = 64;

/**
 * Glass, rounded navigation bar adapted from React Bits' CardNav.
 * Tapping the hamburger expands a card panel of grouped links.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const ease = "power3.out";

  // Measure the cards so the bar expands to exactly fit them right under the
  // top bar — no dead space above the cards on any viewport.
  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 280;

    const contentEl = navEl.querySelector(".nav-content") as HTMLElement | null;
    if (contentEl) {
      const prev = {
        visibility: contentEl.style.visibility,
        pointerEvents: contentEl.style.pointerEvents,
        position: contentEl.style.position,
        height: contentEl.style.height,
      };
      contentEl.style.visibility = "visible";
      contentEl.style.pointerEvents = "auto";
      contentEl.style.position = "static";
      contentEl.style.height = "auto";
      void contentEl.offsetHeight;
      const contentHeight = contentEl.scrollHeight;
      Object.assign(contentEl.style, prev);
      return TOP_BAR + contentHeight;
    }
    return 280;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: TOP_BAR, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 44, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease });
    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, "-=0.1");
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    const handleResize = () => {
      if (!tlRef.current) return;
      const wasOpen = tlRef.current.progress() === 1;
      tlRef.current.kill();
      const next = createTimeline();
      if (next) {
        if (wasOpen) next.progress(1);
        tlRef.current = next;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isOpen) {
      setIsOpen(true);
      tl.play(0);
    } else {
      tl.eventCallback("onReverseComplete", () => setIsOpen(false));
      tl.reverse();
    }
  };

  const close = () => {
    const tl = tlRef.current;
    if (!tl || !isOpen) return;
    tl.eventCallback("onReverseComplete", () => setIsOpen(false));
    tl.reverse();
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6">
      <nav
        ref={navRef}
        className={cn(
          "glass relative w-full max-w-3xl overflow-hidden rounded-[1.4rem] border border-white/10",
          "shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/5",
        )}
        style={{ height: TOP_BAR }}
      >
        {/* Top bar */}
        <div
          className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-2 px-2.5 pl-4"
          style={{ height: TOP_BAR }}
        >
          <button
            type="button"
            onClick={toggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="group flex h-10 w-10 flex-col items-center justify-center gap-[7px] rounded-lg text-foreground transition-colors hover:bg-white/5 md:order-1"
          >
            <span
              className={cn(
                "h-[2px] w-[26px] rounded-full bg-current transition-transform duration-300",
                isOpen && "translate-y-[4.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-[2px] w-[26px] rounded-full bg-current transition-transform duration-300",
                isOpen && "-translate-y-[4.5px] -rotate-45",
              )}
            />
          </button>

          <a
            href="#top"
            className="md:absolute md:left-1/2 md:order-2 md:-translate-x-1/2"
            aria-label={site.name}
          >
            <Logo className="h-7 sm:h-8" />
          </a>

          <div className="flex items-center gap-2 md:order-3">
            <a
              href={site.ctaHref}
              className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_6px_20px_-6px] shadow-primary/70 transition-all hover:bg-primary/90 active:translate-y-px"
            >
              <span className="hidden sm:inline">{site.ctaLabel}</span>
              <span className="sm:hidden">Free Review</span>
            </a>
          </div>
        </div>

        {/* Expanding content */}
        <div
          className={cn(
            "nav-content invisible absolute inset-x-0 bottom-0 z-10 flex items-start gap-3 px-2.5 pt-2.5 pb-1.5",
            "max-md:flex-col max-md:items-stretch",
            isOpen && "visible",
          )}
          style={{ top: TOP_BAR }}
          aria-hidden={!isOpen}
        >
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              ref={setCardRef(idx)}
              className="flex flex-1 flex-col rounded-2xl p-4"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <p className="text-lg font-semibold tracking-tight">{item.label}</p>
              <div className="mt-3 flex flex-col gap-1.5">
                {item.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    onClick={close}
                    className="inline-flex items-center gap-1.5 text-sm opacity-80 transition-opacity hover:opacity-100"
                  >
                    <GoArrowUpRight aria-hidden className="size-3.5" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
