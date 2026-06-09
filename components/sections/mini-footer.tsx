import Link from "next/link";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

const links = [
  { label: "Free Case Review", href: "/case-review" },
  { label: "SMS Sign Up", href: "/sms-signup" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];

/**
 * Compact footer for interior pages (legal, SMS signup). The homepage uses the
 * full cinematic footer instead.
 */
export function MiniFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-10 md:flex-row md:justify-between">
        <Link href="/" aria-label={site.name}>
          <Logo className="h-6" />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
