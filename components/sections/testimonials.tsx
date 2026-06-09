"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { StarRating } from "@/components/star-rating";
import { SectionHeading } from "@/components/section-heading";
import { testimonials, type Testimonial } from "@/lib/site";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="w-full max-w-xs rounded-3xl border border-border/70 bg-card p-7 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] ring-1 ring-white/5">
      <div className="flex items-center justify-between">
        <StarRating rating={t.rating} />
        <Quote className="size-6 text-primary/30" aria-hidden />
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
        “{t.text}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.image}
          alt={t.name}
          width={40}
          height={40}
          loading="lazy"
          className="size-10 rounded-full object-cover ring-1 ring-white/10"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{t.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {t.role} · {t.location}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

function TestimonialsColumn({
  items,
  duration = 18,
  className,
}: {
  items: Testimonial[];
  duration?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-6 pb-6"
      >
        {[0, 1].map((dup) => (
          <Fragment key={dup}>
            {items.map((t, i) => (
              <TestimonialCard key={`${dup}-${i}`} t={t} />
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const col1 = testimonials.slice(0, 3);
  const col2 = testimonials.slice(3, 6);
  const col3 = testimonials.slice(6, 9);

  return (
    <section id="testimonials" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Testimonials"
          title="Real people. Real recoveries."
          description="Thousands of injured Americans have used a free review to find the right attorney — and the compensation they were owed."
        />

        <div className="relative mt-14 flex max-h-[42rem] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <TestimonialsColumn items={col1} duration={20} />
          <TestimonialsColumn items={col2} duration={26} className="hidden md:block" />
          <TestimonialsColumn items={col3} duration={22} className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
