"use client";

import type { CartItem } from "@/store/cart-store";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, data: object, options?: object) => void;
      identify: (userData: object) => void;
      page: () => void;
    };
    snaptr?: (action: string, event: string, data?: object) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// ─── helpers ───────────────────────────────────────────────────────────────

export function genEventId(prefix: string): string {
  const rand =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 12)
      : Math.random().toString(36).slice(2, 14);
  return `${prefix}_${Date.now()}_${rand}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") +
        "=([^;]*)"
    )
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

// SHA-256 hash via Web Crypto API (browser-side, for pixel advanced matching).
async function sha256Hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Normalise phone to digits-only (no +) for Meta hashing: +966527837429 → 966527837429
function stripPlus(phone: string): string {
  return phone.replace(/^\+/, "");
}

// ─── PageView ──────────────────────────────────────────────────────────────

export function trackPageView(): void {
  const eid = genEventId("pv");
  window.fbq?.("track", "PageView", {}, { eventID: eid });
  // ttq.page() fires LandingPageView — same as the init call — so all TikTok
  // page views appear under one consistent event name in the pixel helper.
  window.ttq?.page();
  window.snaptr?.("track", "PAGE_VIEW", { client_dedup_id: eid });
}

// ─── ViewContent ───────────────────────────────────────────────────────────

export function trackViewContent(
  productId: string,
  value: number,
  eventId?: string
): void {
  const eid = eventId ?? genEventId("vc");

  window.fbq?.(
    "track",
    "ViewContent",
    {
      content_ids: [productId],
      content_type: "product",
      value,
      currency: "MAD",
    },
    { eventID: eid }
  );

  window.ttq?.track(
    "ViewContent",
    {
      contents: [
        { content_id: productId, content_type: "product", quantity: 1, price: value },
      ],
      value,
      currency: "MAD",
    },
    { event_id: eid }
  );

  window.snaptr?.("track", "VIEW_CONTENT", {
    price: value,
    currency: "MAD",
    item_ids: [productId],
    client_dedup_id: eid,
  });
}

// ─── AddToCart ─────────────────────────────────────────────────────────────

export function trackAddToCart(item: CartItem, eventId?: string): void {
  const eid = eventId ?? genEventId("atc");

  window.fbq?.(
    "track",
    "AddToCart",
    {
      content_ids: [item.productId],
      content_type: "product",
      value: item.priceMad,
      currency: "MAD",
    },
    { eventID: eid }
  );

  window.ttq?.track(
    "AddToCart",
    {
      contents: [
        {
          content_id: item.productId,
          content_type: "product",
          quantity: item.unitCount,
          price: item.priceMad,
        },
      ],
      value: item.priceMad,
      currency: "MAD",
    },
    { event_id: eid }
  );

  window.snaptr?.("track", "ADD_CART", {
    price: item.priceMad,
    currency: "MAD",
    item_ids: [item.productId],
    number_items: item.unitCount,
    client_dedup_id: eid,
  });
}

// ─── InitiateCheckout ──────────────────────────────────────────────────────

export function trackInitiateCheckout(
  items: CartItem[],
  total: number,
  eventId?: string
): void {
  const eid = eventId ?? genEventId("ic");
  const contentIds = items.map((i) => i.productId);
  const numItems = items.reduce((s, i) => s + i.unitCount, 0);

  window.fbq?.(
    "track",
    "InitiateCheckout",
    {
      content_ids: contentIds,
      content_type: "product",
      num_items: numItems,
      value: total,
      currency: "MAD",
    },
    { eventID: eid }
  );

  window.ttq?.track(
    "InitiateCheckout",
    {
      contents: items.map((i) => ({
        content_id: i.productId,
        content_type: "product",
        quantity: i.unitCount,
        price: i.priceMad,
      })),
      value: total,
      currency: "MAD",
    },
    { event_id: eid }
  );

  window.snaptr?.("track", "START_CHECKOUT", {
    price: total,
    currency: "MAD",
    item_ids: contentIds,
    number_items: numItems,
    client_dedup_id: eid,
  });
}

// ─── Purchase ──────────────────────────────────────────────────────────────
// event_id MUST equal the order_number used by all three CAPI backends.
// phone is E.164 (e.g. +966527837429) — hashing done here for Meta advanced matching.

export async function trackPurchase(
  items: CartItem[],
  total: number,
  eventId: string,
  phone?: string
): Promise<void> {
  const contentIds = items.map((i) => i.productId);
  const numItems = items.reduce((s, i) => s + i.unitCount, 0);

  // ── Meta ──────────────────────────────────────────────────────────────────
  // Re-call fbq('init') with hashed phone for advanced matching before Purchase.
  // ph must be SHA-256 of the digits-only number (no + sign).
  if (phone) {
    const metaId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    const hashedPhone = await sha256Hex(stripPlus(phone));
    if (metaId) window.fbq?.("init", metaId, { ph: hashedPhone });
  }
  window.fbq?.(
    "track",
    "Purchase",
    {
      value: total,
      currency: "MAD",
      content_ids: contentIds,
      content_type: "product",
      num_items: numItems,
      contents: items.map((i) => ({
        id: i.productId,
        quantity: i.unitCount,
        item_price: i.priceMad,
      })),
    },
    { eventID: eventId }
  );

  // ── TikTok ────────────────────────────────────────────────────────────────
  // identify() before track() enriches the event with the phone number.
  // The SDK normalises + hashes it automatically — pass raw E.164.
  if (phone) {
    window.ttq?.identify({ phone_number: phone });
  }
  window.ttq?.track(
    "CompletePayment",
    {
      contents: items.map((i) => ({
        content_id: i.productId,
        content_type: "product",
        quantity: i.unitCount,
        price: i.priceMad,
      })),
      value: total,
      currency: "MAD",
    },
    { event_id: eventId }
  );

  // ── Snapchat ──────────────────────────────────────────────────────────────
  // Re-call snaptr('init') with phone for user matching — Snap hashes automatically.
  // client_dedup_id = transaction_id = eventId → enables 30-day PURCHASE dedup window.
  if (phone) {
    const snapId = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;
    if (snapId) window.snaptr?.("init", snapId, { user_phone_number: phone });
  }
  window.snaptr?.("track", "PURCHASE", {
    price: total,
    currency: "MAD",
    item_ids: contentIds,
    number_items: numItems,
    transaction_id: eventId,
    client_dedup_id: eventId,
  });

  // ── Google Ads ────────────────────────────────────────────────────────────
  // Enhanced conversions: set user_data before firing conversion event.
  // transaction_id deduplicates repeat firings for the same order.
  const gadsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL;
  const gadsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  if (gadsId && gadsLabel) {
    if (phone) window.gtag?.("set", "user_data", { phone_number: phone });
    window.gtag?.("event", "conversion", {
      send_to: `${gadsId}/${gadsLabel}`,
      value: total,
      currency: "MAD",
      transaction_id: eventId,
    });
  }
}
