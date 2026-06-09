import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description:
      "Get connected with a top personal injury lawyer near you. Free, no-obligation case review. No win, no fee.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0c",
    theme_color: "#F97316",
    categories: ["legal", "business"],
    lang: "en-US",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
