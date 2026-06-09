"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { OfferId } from "@/config/products";

export type CartItemSource =
  | "pdp"
  | "cart_cross_sell"
  | "checkout_upsell"
  | `lp:${string}`;

export interface CartItem {
  productId: string;
  offerId: OfferId | string;
  quantity: number;
  unitCount: number;
  titleAr: string;
  priceMad: number;
  source: CartItemSource;
  /** LP / custom products — not in PRODUCT_MAP */
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, offerId: OfferId | string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalMad: () => number;
  itemCount: () => number;
}

function mergeCartItem(items: CartItem[], nextItem: CartItem): CartItem[] {
  const existingIndex = items.findIndex(
    (item) =>
      item.productId === nextItem.productId && item.offerId === nextItem.offerId
  );

  if (existingIndex === -1) {
    return [...items, nextItem];
  }

  return items.map((item, index) =>
    index === existingIndex
      ? {
          ...item,
          quantity: item.quantity + nextItem.quantity,
          unitCount: item.unitCount + nextItem.unitCount,
          priceMad: item.priceMad + nextItem.priceMad,
        }
      : item
  );
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => ({
          items: mergeCartItem(state.items, item),
          isOpen: true,
        })),
      removeItem: (productId, offerId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.offerId === offerId)
          ),
        })),
      clearCart: () => set({ items: [], isOpen: false }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      totalMad: () => get().items.reduce((sum, item) => sum + item.priceMad, 0),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "lamis-cart-ma",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
