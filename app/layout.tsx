import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { KEYWORDS, SITE_URL, organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "Accident Payments — Free Case Review. Maximum Compensation.";
const description =
  "Injured in an accident? Get connected with a top personal injury lawyer near you in minutes. Free, no-obligation case review for car accidents, truck & motorcycle crashes, slip & fall, workplace injury, medical malpractice, and disability claims. No win, no fee — you pay nothing unless your lawyer wins.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Accident Payments",
  },
  description,
  applicationName: site.name,
  keywords: KEYWORDS,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: "Legal Services",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title,
    description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Accident Payments — Free Case Review",
    description:
      "Get connected with a top personal injury attorney near you. Free review. No win, no fee — pay nothing unless you win.",
  },
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in the environment to emit the
  // Search Console verification tag; omitted cleanly when unset.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
    { media: "(prefers-color-scheme: light)", color: "#F97316" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${jakarta.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Site-wide entity graph: brand/LegalService + WebSite. Page-specific
            nodes (FAQ, breadcrumbs, service) are emitted by individual routes. */}
        <JsonLd schema={[organizationSchema(), websiteSchema()]} />
        {children}
      </body>
    </html>
  );
}
