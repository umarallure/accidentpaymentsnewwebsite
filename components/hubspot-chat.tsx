"use client";

import { Suspense, useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    HubSpotConversations?: {
      widget?: {
        refresh: (options?: { openToNewThread?: boolean }) => void;
      };
    };
    hsConversationsOnReady?: Array<() => void>;
  }
}

const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID?.trim();
// Optional data-center region (e.g. "na1", "na2", "eu1"). Leave unset to use
// the default host, which resolves to the account's region automatically.
const region = process.env.NEXT_PUBLIC_HUBSPOT_REGION?.trim();

/**
 * In a single-page app the URL can change without a full reload, so HubSpot may
 * not re-evaluate chatflow targeting (URL / query-parameter rules) on its own.
 * Refreshing the widget after each client-side navigation makes it pick up the
 * correct chatflow for the new route.
 */
function HubSpotRouteRefresh() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // The tracking code already evaluates the current page on first load, so we
    // only need to refresh on subsequent in-app navigations.
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    window.HubSpotConversations?.widget?.refresh();
  }, [pathname, searchParams]);

  return null;
}

/**
 * Loads the HubSpot tracking code once for the whole app and keeps the chat
 * widget in sync with App Router navigation. Renders nothing until a portal ID
 * is configured via NEXT_PUBLIC_HUBSPOT_PORTAL_ID.
 */
export default function HubSpotChat() {
  if (!portalId) return null;

  const host = region ? `js-${region}.hs-scripts.com` : "js.hs-scripts.com";

  return (
    <>
      <Script
        id="hs-script-loader"
        src={`https://${host}/${portalId}.js`}
        strategy="afterInteractive"
      />
      <Suspense fallback={null}>
        <HubSpotRouteRefresh />
      </Suspense>
    </>
  );
}
