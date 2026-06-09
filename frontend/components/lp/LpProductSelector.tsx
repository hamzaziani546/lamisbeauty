"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import type { LpProduct } from "@/lib/landing-pages";

export function LpProductSelector({
  products,
  selected,
  onSelect,
}: {
  products: LpProduct[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3" dir="rtl">
      {products.map((product, index) => {
        const isSelected = selected === product.id;
        const savings =
          product.compare_at_price_mad && product.compare_at_price_mad > product.price_mad
            ? product.compare_at_price_mad - product.price_mad
            : null;

        return (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelect(product.id)}
            aria-pressed={isSelected}
            className={`relative flex items-center gap-3 w-full rounded-2xl border-2 px-3 py-3 text-right transition-all ${
              isSelected
                ? "border-[#0B6B5C] bg-[#F7FAF9] shadow-md ring-1 ring-[#0B6B5C]/20"
                : "border-[#D5E0DC] bg-white hover:border-[#0B6B5C]/40"
            }`}
          >
            {index === products.length - 1 && products.length > 1 && (
              <span className="absolute -top-2.5 right-4 bg-[#C9A45C] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                الأكثر مبيعاً
              </span>
            )}

            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-[#D5E0DC] bg-[#F7FAF9]">
              <Image
                src={product.image}
                alt={product.name_ar}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-[#1A2332] truncate">{product.name_ar}</p>
              <p className="text-[10px] text-[#5A6A72] mt-0.5">SKU: {product.sku}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-extrabold text-[#0B6B5C]">{product.price_mad} د.م</span>
                {product.compare_at_price_mad ? (
                  <span className="text-xs text-[#5A6A72] line-through">
                    {product.compare_at_price_mad} د.م
                  </span>
                ) : null}
                {savings ? (
                  <span className="text-[10px] font-bold text-[#2D8B6F]">
                    وفّري {savings} د.م
                  </span>
                ) : null}
              </div>
            </div>

            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                isSelected ? "border-[#0B6B5C] bg-[#0B6B5C]" : "border-[#D5E0DC]"
              }`}
            >
              {isSelected && <Check size={12} className="text-white" />}
            </div>
          </button>
        );
      })}
    </div>
  );
}
