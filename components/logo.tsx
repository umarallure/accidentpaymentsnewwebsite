import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type LogoProps = {
  /** Controls the rendered height (and width via aspect ratio). Defaults to h-7. */
  className?: string;
};

/**
 * Accident Payments wordmark. Renders the white SVG lockup from /public,
 * so it sits cleanly on the dark theme. Size it with a height utility, e.g.
 * <Logo className="h-8" />.
 */
export function Logo({ className }: LogoProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt={site.name}
      className={cn("h-7 w-auto select-none", className)}
      draggable={false}
    />
  );
}
