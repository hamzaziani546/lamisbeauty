"use client";

import type { CartItem } from "@/store/cart-store";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, data: object, options?: object) => void;
      page: () => void;
    };
    snaptr?: (action: string, event: string, data?: object) => void;
  }
}

function genEventId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function trackPageView(): void {
  const eventId = genEventId("pv");
  window.fbq?.("track", "PageView", {}, { eventID: eventId });
  window.ttq?.track("PageView", {}, { event_id: eventId });
  window.snaptr?.("track", "PAGE_VIEW", { client_dedup_id: eventId });
}

export function trackViewContent(
  productId: string,
  value: number,
  eventId?: string
): void {
  const eid = eventId || genEventId("vc");
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
      contents: [{ content_id: productId, quantity: 1, price: value }],
      content_type: "product",
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

export function trackAddToCart(
  item: CartItem,
  eventId?: string
): void {
  const eid = eventId || genEventId("atc");
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
          quantity: item.unitCount,
          price: item.priceSar,
        },
      ],
      content_type: "product",
      value: item.priceSar,
      currency: "SAR",
    },
    { event_id: eid }
  );
  window.snaptr?.("track", "ADD_CART", {
    price: item.priceSar,
    currency: "SAR",
    item_ids: [item.productId],
    client_dedup_id: eid,
  });
}

export function trackInitiateCheckout(
  items: CartItem[],
  total: number,
  eventId?: string
): void {
  const eid = eventId || genEventId("ic");
  const contentIds = items.map((i) => i.productId);
  window.fbq?.(
    "track",
    "InitiateCheckout",
    {
      content_ids: contentIds,
      content_type: "product",
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
        quantity: i.unitCount,
        price: i.priceSar,
      })),
      content_type: "product",
      value: total,
      currency: "SAR",
    },
    { event_id: eid }
  );
  window.snaptr?.("track", "START_CHECKOUT", {
    price: total,
    currency: "SAR",
    item_ids: contentIds,
    client_dedup_id: eid,
  });
}

export function trackPurchase(
  items: CartItem[],
  total: number,
  eventId: string
): void {
  const contentIds = items.map((i) => i.productId);

  window.fbq?.(
    "track",
    "Purchase",
    {
      value: total,
      currency: "SAR",
      content_ids: contentIds,
      content_type: "product",
    },
    { eventID: eventId }
  );

  window.ttq?.track(
    "CompletePayment",
    {
      contents: items.map((i) => ({
        content_id: i.productId,
        quantity: i.unitCount,
        price: i.priceSar,
      })),
      content_type: "product",
      value: total,
      currency: "SAR",
    },
    { event_id: eventId }
  );

  window.snaptr?.("track", "PURCHASE", {
    price: total,
    currency: "SAR",
    item_ids: contentIds,
    number_items: items.reduce((s, i) => s + i.unitCount, 0),
    transaction_id: eventId,
    client_dedup_id: eventId,
  });
}
