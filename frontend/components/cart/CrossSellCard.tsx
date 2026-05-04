"use client";

import { Plus } from "lucide-react";
import type { Product } from "@/config/products";
import { useCartStore } from "@/store/cart-store";
import { trackAddToCart } from "@/lib/tracking";

export function CrossSellCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const offer = product.offers.find((o) => o.id === "one")!;

  function handleAdd() {
    const item = {
      productId: product.id,
      offerId: "one" as const,
      quantity: 1,
      unitCount: 1,
      titleAr: product.shortNameAr,
      priceSar: offer.priceSar,
      source: "cart_cross_sell" as const,
    };
    addItem(item);
    trackAddToCart(item);
  }

  return (
    <div
      className="bg-[#F7FAF9] rounded-2xl border border-[#D5E0DC] p-3 flex items-center gap-3"
      dir="rtl"
    >
      {/* Placeholder image */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#E8F0ED] to-[#F7FAF9] flex items-center justify-center shrink-0 text-lg">
        ✨
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#1A2332] leading-snug line-clamp-2">
          {product.shortNameAr}
        </p>
        <p className="text-sm text-[#0B6B5C] font-medium mt-0.5">
          {offer.priceSar} ريال
        </p>
      </div>
      <button
        onClick={handleAdd}
        aria-label={`أضيفي ${product.shortNameAr} للسلة`}
        className="shrink-0 flex items-center gap-1 bg-[#0B6B5C] text-white text-xs font-bold px-3 py-2 rounded-full hover:bg-[#095A4C] transition-colors"
      >
        <Plus size={12} aria-hidden />
        أضيفيه
      </button>
    </div>
  );
}
