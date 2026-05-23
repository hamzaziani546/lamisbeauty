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

// Strip the leading '+' from E.164 so Meta gets digits-only (9665XXXXXXXX)
function phoneDigits(e164: string): string {
  return e164.replace(/^\+/, "");
}

// ─── PageView ──────────────────────────────────────────────────────────────

export function trackPageView(): void {
  const eid = genEventId("pv");
  window.fbq?.("track", "PageView", {}, { eventID: eid });
  window.ttq?.track("PageView", {}, { event_id: eid });
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
      currency: "SAR",
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
      currency: "SAR",
    },
    { event_id: eid }
  );

  window.snaptr?.("track", "VIEW_CONTENT", {
    price: value,
    currency: "SAR",
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
      value: item.priceSar,
      currency: "SAR",
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
          price: item.priceSar,
        },
      ],
      value: item.priceSar,
      currency: "SAR",
    },
    { event_id: eid }
  );

  window.snaptr?.("track", "ADD_CART", {
    price: item.priceSar,
    currency: "SAR",
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
      currency: "SAR",
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
        price: i.priceSar,
      })),
      value: total,
      currency: "SAR",
    },
    { event_id: eid }
  );

  window.snaptr?.("track", "START_CHECKOUT", {
    price: total,
    currency: "SAR",
    item_ids: contentIds,
    number_items: numItems,
    client_dedup_id: eid,
  });
}

// ─── Purchase ──────────────────────────────────────────────────────────────
// event_id MUST equal the order_number used by all three CAPI backends.
// phone is passed raw (no hashing) — hashing is server-side only.

export function trackPurchase(
  items: CartItem[],
  total: number,
  eventId: string,
  phone?: string
): void {
  const contentIds = items.map((i) => i.productId);
  const numItems = items.reduce((s, i) => s + i.unitCount, 0);

  // ── Meta ──────────────────────────────────────────────────────────────────
  // Advanced matching: set phone via setUserData (digits only, no '+').
  // The pixel reads _fbp / _fbc cookies automatically — do NOT pass them
  // in the track() call's 4th argument (only eventID belongs there).
  if (phone) {
    window.fbq?.("setUserData", { ph: phoneDigits(phone) });
  }
  window.fbq?.(
    "track",
    "Purchase",
    {
      value: total,
      currency: "SAR",
      content_ids: contentIds,
      content_type: "product",
      num_items: numItems,
      contents: items.map((i) => ({
        id: i.productId,
        quantity: i.unitCount,
        item_price: i.priceSar,
      })),
    },
    { eventID: eventId }
  );

  // ── TikTok ────────────────────────────────────────────────────────────────
  // identify() before track() enriches the event with the phone number.
  // The SDK normalises + hashes it automatically — pass raw E.164.
  // Do NOT include ttp in the event data object; the SDK reads _ttp cookie itself.
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
        price: i.priceSar,
      })),
      value: total,
      currency: "SAR",
    },
    { event_id: eventId }
  );

  // ── Snapchat ──────────────────────────────────────────────────────────────
  // client_dedup_id = transaction_id = eventId → enables 30-day PURCHASE dedup window.
  // Snap does not support phone number on the browser pixel.
  window.snaptr?.("track", "PURCHASE", {
    price: total,
    currency: "SAR",
    item_ids: contentIds,
    number_items: numItems,
    transaction_id: eventId,
    client_dedup_id: eventId,
  });
}
