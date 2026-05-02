"use client";

import { Check, Sparkles } from "lucide-react";
import type { ProductOffer } from "@/config/products";

interface OfferSelectorProps {
  offers: ProductOffer[];
  selected: string;
  onSelect: (offerId: string) => void;
}

export function OfferSelector({
  offers,
  selected,
  onSelect,
}: OfferSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4" dir="rtl">
      {offers.map((offer) => {
        const isSelected = selected === offer.id;
        const isBest = offer.id === "three";
        const isMiddle = offer.id === "two";

        return (
          <button
            key={offer.id}
            type="button"
            onClick={() => onSelect(offer.id)}
            aria-pressed={isSelected}
            className={`relative flex items-center justify-between w-full rounded-2xl border-2 p-5 text-right transition-all ${
              isSelected
                ? "border-[#8F3F55] bg-[#FFF8F1] shadow-md transform scale-[1.02]"
                : "border-[#E8DAD6] bg-white hover:border-[#8F3F55]/40 hover:shadow-sm"
            }`}
          >
            {isBest && (
              <span className="absolute -top-3 right-4 bg-[#8F3F55] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles size={12} />
                {offer.badgeAr || "الأكثر طلباً"}
              </span>
            )}
            
            {isMiddle && (
              <span className="absolute -top-3 right-4 bg-[#7B9277] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                {offer.badgeAr || "خيار ممتاز"}
              </span>
            )}

            <div className="flex items-center gap-4">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "border-[#8F3F55] bg-[#8F3F55]"
                    : "border-[#E8DAD6] bg-white"
                }`}
              >
                {isSelected && <Check size={14} className="text-white" aria-hidden />}
              </div>
              <div>
                <p className={`font-bold text-lg ${isSelected ? "text-[#8F3F55]" : "text-[#251F20]"}`}>
                  {offer.labelAr}
                </p>
                {offer.reasonAr && !isBest && (
                  <p className="text-sm text-[#6F6262] mt-1 font-medium">
                    {offer.reasonAr}
                  </p>
                )}
                {isBest && (
                  <p className="text-sm text-[#7B9277] font-bold mt-1 bg-[#7B9277]/10 inline-block px-2 py-0.5 rounded-md">
                    أفضل قيمة للاستمرار
                  </p>
                )}
              </div>
            </div>

            <div className="text-left">
              <p className={`font-bold text-xl ${isSelected ? "text-[#8F3F55]" : "text-[#251F20]"}`}>
                {offer.priceSar} ريال
              </p>
              {offer.id === "three" && (
                <p className="text-xs text-[#7B9277] font-bold mt-1">
                  {Math.round(offer.priceSar / offer.quantity)} ريال / للحبة
                </p>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
