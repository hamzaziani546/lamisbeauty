import { create } from "zustand";
import { persist } from "zustand/middleware";

export type OfferId = "one" | "two" | "three" | "upsell";

export type CartItem = {
  productId: string;
  offerId: OfferId;
  quantity: number;
  unitCount: number;
  titleAr: string;
  priceSar: number;
  source: "pdp" | "cart_cross_sell" | "checkout_upsell";
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, offerId: OfferId) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalSar: () => number;
  itemCount: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.findIndex(
            (i) => i.productId === item.productId && i.offerId === item.offerId
          );
          if (existing >= 0) {
            const updated = [...state.items];
            updated[existing] = {
              ...updated[existing],
              quantity: updated[existing].quantity + item.quantity,
              priceSar: updated[existing].priceSar + item.priceSar,
            };
            return { items: updated };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId, offerId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.offerId === offerId)
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalSar: () =>
        get().items.reduce((sum, item) => sum + item.priceSar, 0),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "lamis-cart-v2",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
