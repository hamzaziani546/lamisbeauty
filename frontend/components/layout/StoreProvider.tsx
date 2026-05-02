"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { TrackingProvider } from "@/components/tracking/TrackingProvider";

// Dynamically import heavy interactive components so their chunks are
// only resolved in the browser, after hydration — prevents ChunkLoadError
// from RSC streaming trying to resolve these chunks server-side.
const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((m) => m.CartDrawer),
  { ssr: false }
);

const CheckoutModal = dynamic(
  () => import("@/components/checkout/CheckoutModal").then((m) => m.CheckoutModal),
  { ssr: false }
);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <TrackingProvider />
      {children}
      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}
