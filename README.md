# Accident Payments

A modern, conversion-focused marketing site for **Accident Payments** — a service that
connects injured people with a top personal-injury attorney near them. Free case review,
no win / no fee.

Built from scratch with a dark-first, premium aesthetic.

## Tech stack

- **Next.js 16** (App Router) + **Turbopack** (dev & build)
- **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first `@theme` tokens)
- **shadcn/ui** (Base UI primitives)
- **pnpm**, ESLint, Prettier (`prettier-plugin-tailwindcss`)
- Motion (`motion/react`) for scroll reveals & marquees
- GSAP for the nav expansion and cinematic footer
- React Bits `ColorBends` (WebGL / `three`) hero backdrop

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:3000 (Turbopack)
```

### Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `pnpm dev`          | Dev server (Turbopack)       |
| `pnpm build`        | Production build (Turbopack) |
| `pnpm start`        | Serve the production build   |
| `pnpm lint`         | ESLint                       |
| `pnpm typecheck`    | `tsc --noEmit`               |
| `pnpm format`       | Prettier write               |
| `pnpm format:check` | Prettier check               |

## Project structure

```
app/
  layout.tsx          Root layout, fonts (Plus Jakarta Sans), metadata/SEO
  page.tsx            Landing page — composes the sections
  globals.css         Tailwind v4 theme tokens (dark-first), utilities, keyframes
components/
  logo.tsx            Brand wordmark + mark
  reveal.tsx          Scroll-reveal wrapper (motion)
  section-heading.tsx Shared eyebrow + title + description
  star-rating.tsx     Reusable star rating
  ColorBends.tsx      React Bits WebGL backdrop (vendored)
  sections/
    navbar.tsx        Glass, rounded nav with GSAP card expansion + CTA
    hero.tsx          ColorBends hero + lead-capture card
    process.tsx       "Our Process" — 3 polished step cards
    case-types.tsx    Legal areas grid
    about.tsx         Why-it's-free + recent-recoveries table + stats band
    testimonials.tsx  Animated columns with star ratings
    faq.tsx           Accordion FAQ
    footer.tsx        Cinematic curtain-reveal footer
  ui/                 shadcn primitives
lib/
  site.ts             All brand copy & data (single source of truth)
  utils.ts            cn() helper
```

## Theming

The brand palette lives in [`app/globals.css`](app/globals.css) as Tailwind v4 tokens.

- **Primary:** `rgb(255, 126, 51)` (`#FF7E33`) orange
- **Surfaces:** near-black, with slate/white text
- Dark-first: tokens are applied to both `:root` and `.dark`, and `<html>` carries `dark`.

Edit copy and section data in [`lib/site.ts`](lib/site.ts) — no markup changes needed.
