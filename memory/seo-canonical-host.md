---
name: seo-canonical-host
description: The canonical host/origin convention for SEO across the site
metadata:
  type: project
---

The canonical origin for SEO is **`https://accidentpayments.com`** (non-www, no trailing slash), defined once as `SITE_URL` in [lib/seo.ts](../lib/seo.ts) and reused by `metadataBase`, sitemap, robots, canonicals, and JSON-LD.

**Why:** The repo is inconsistent — `lib/sms-compliance.ts` uses the **www** form (`https://www.accidentpayments.com`) while `lib/site.ts`/layout use non-www. Splitting canonical signals across www and non-www would dilute link equity, so all SEO surfaces were standardized on non-www.

**How to apply:** When adding routes, canonicals, or structured data, import `SITE_URL`/`absoluteUrl` from `lib/seo.ts` — never hardcode a host and never copy the www value from `sms-compliance.ts`. If the production host ever becomes www, change `SITE_URL` in one place. SEO architecture: `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`, schema builders in `lib/seo.ts`, injected via `components/json-ld.tsx`.
