import { ImageResponse } from "next/og";

// Route segment config + image metadata. Next wires these into og:image and
// twitter:image automatically for every page that inherits this segment.
export const alt =
  "Accident Payments — Free Case Review. Get connected with a top personal injury lawyer near you. No win, no fee.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(120% 120% at 0% 0%, #2a1206 0%, #0a0a0c 55%)",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#F97316",
              color: "#0a0a0c",
              fontSize: "34px",
              fontWeight: 800,
            }}
          >
            A
          </div>
          <div style={{ display: "flex", fontSize: "30px", fontWeight: 700 }}>
            Accident Payments
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "78px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "920px",
            }}
          >
            Injured in an accident? Get the payout you deserve.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              color: "#F97316",
              fontWeight: 600,
            }}
          >
            Free case review · No win, no fee · All 50 states
          </div>
        </div>

        {/* Trust footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            fontSize: "26px",
            color: "#a1a1aa",
          }}
        >
          {/* Plain ASCII only — non-ASCII glyphs (e.g. ★) force ImageResponse to
              fetch a dynamic font, which fails in offline build environments. */}
          <div style={{ display: "flex", color: "#F97316", fontWeight: 700 }}>
            Rated 4.9/5
          </div>
          <div style={{ display: "flex" }}>from 12,000+ claimants</div>
          <div style={{ display: "flex", color: "#52525b" }}>|</div>
          <div style={{ display: "flex" }}>Top personal injury attorneys</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
