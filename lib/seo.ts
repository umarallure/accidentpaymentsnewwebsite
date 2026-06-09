/**
 * Centralized SEO config + JSON-LD structured-data builders for Accident Payments.
 *
 * One source of truth for the canonical origin, the keyword universe, and every
 * schema.org object we emit. Keeping the structured data here (rather than inline
 * in components) means it can be unit-reasoned about and reused across routes,
 * and it guarantees the data we feed Google matches the copy users actually see.
 */

import { caseTypes, faqs, site, stats, testimonials } from "@/lib/site";

/**
 * Canonical origin — NO trailing slash, NO `www`.
 * Pick ONE host and stick to it everywhere (metadataBase, sitemap, robots,
 * JSON-LD) so we never split link equity across www/non-www duplicates.
 */
export const SITE_URL = "https://accidentpayments.com";

/**
 * Build an absolute URL from a path. Root maps to the bare origin (no trailing
 * slash) so it matches the homepage canonical Next derives from metadataBase.
 */
export const absoluteUrl = (path = "/"): string => {
  if (path === "/" || path === "") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

/**
 * The keyword universe for this niche. Google ignores the legacy <meta keywords>
 * tag, but we still surface these terms in titles, descriptions, alt text and
 * structured data — which is where ranking signals actually come from. Grouped
 * by intent so future copy edits can pull from the right bucket.
 */
export const KEYWORDS: string[] = [
  // Core / brand-adjacent
  "personal injury lawyer",
  "personal injury attorney",
  "accident lawyer",
  "accident attorney",
  "injury claim",
  "accident compensation",
  "free case review",
  "free legal consultation",
  "no win no fee lawyer",
  "contingency fee attorney",
  "maximum compensation",
  "accident settlement",
  "injury settlement amounts",
  "how much is my claim worth",
  // Auto
  "car accident lawyer",
  "car accident attorney near me",
  "auto accident lawyer",
  "truck accident lawyer",
  "motorcycle accident lawyer",
  "rideshare accident lawyer",
  "uber accident lawyer",
  "hit and run accident claim",
  "drunk driving accident lawyer",
  // Premises / personal injury
  "slip and fall lawyer",
  "premises liability attorney",
  "dog bite lawyer",
  "wrongful death attorney",
  "nursing home abuse lawyer",
  "product liability lawyer",
  "catastrophic injury lawyer",
  "brain injury lawyer",
  "spinal cord injury attorney",
  // Work / disability / medical
  "workers compensation lawyer",
  "workplace injury attorney",
  "work injury claim",
  "medical malpractice lawyer",
  "misdiagnosis attorney",
  "surgical error lawyer",
  "birth injury lawyer",
  "SSDI lawyer",
  "social security disability attorney",
  "long term disability lawyer",
  "denied disability appeal",
  // Insurance / process intent
  "fight insurance company",
  "insurance claim denied",
  "lawyer near me",
  "attorney near me",
  "find a lawyer",
  "talk to a lawyer free",
];

/* ------------------------------------------------------------------ */
/* schema.org builders                                                 */
/* ------------------------------------------------------------------ */

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
  "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
  "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Visible on-page social proof — keep these in lockstep with the UI. */
const RATING_VALUE = 4.9;
const RATING_COUNT = 12000;

/**
 * Organization / LegalService. Carries the aggregateRating, the nationwide
 * service area, and the contact point — this is the node search engines use to
 * build the knowledge-panel/business entity for the brand.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LegalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.name,
    url: SITE_URL,
    logo: absoluteUrl("/logo.svg"),
    image: absoluteUrl("/opengraph-image"),
    description:
      "Accident Payments connects injured Americans with top-rated personal injury attorneys for a free, no-obligation case review. No win, no fee — you pay nothing unless your lawyer wins.",
    slogan: site.tagline,
    telephone: site.phone,
    priceRange: "Free case review · No win, no fee",
    areaServed: US_STATES.map((name) => ({
      "@type": "State",
      name,
    })),
    knowsAbout: [
      "Personal injury law",
      "Car accident claims",
      "Truck and motorcycle accidents",
      "Slip and fall / premises liability",
      "Workers' compensation",
      "Medical malpractice",
      "Wrongful death",
      "Social Security Disability (SSDI)",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneHref.replace("tel:", ""),
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: ["English"],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING_VALUE,
      bestRating: 5,
      worstRating: 1,
      ratingCount: RATING_COUNT,
      reviewCount: RATING_COUNT,
    },
  };
}

/** WebSite node — ties pages to the brand entity and declares the search box. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: site.name,
    description: `${site.name} — ${site.tagline}`,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

/** FAQPage built from the same data the on-page accordion renders. */
export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** Service node enumerating each practice area we match claimants to. */
export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Personal injury attorney matching",
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "United States" },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free, no-obligation case review. No win, no fee.",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Case types we help people win",
      itemListElement: caseTypes.map((c) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: c.title,
          description: c.blurb,
        },
      })),
    },
  };
}

/** A handful of representative client reviews for review rich-results. */
export function reviewsSchema() {
  return testimonials.slice(0, 6).map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": ORG_ID },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: 5,
    },
    author: { "@type": "Person", name: t.name },
    reviewBody: t.text,
  }));
}

/** BreadcrumbList — give each item a name + absolute URL. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Re-export so consumers can read headline numbers without a second import. */
export const seoStats = stats;
