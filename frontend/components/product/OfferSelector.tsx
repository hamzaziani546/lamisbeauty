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
    <div className="grid grid-cols-1 gap-3" dir="rtl">
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
            className={`relative flex items-center justify-between w-full rounded-2xl border-2 px-4 py-3.5 text-right transition-all duration-300 hover:-translate-y-0.5 ${
              isSelected
                ? "border-[#0B6B5C] bg-[#F7FAF9] shadow-md ring-1 ring-[#0B6B5C]/20"
                : "border-[#D5E0DC] bg-white hover:border-[#0B6B5C]/40 hover:shadow-sm"
            } ${isBest ? "ring-2 ring-[#C9A45C]/30" : ""}`}
          >
            {isBest && (
              <span className="absolute -top-2.5 right-4 bg-[#C9A45C] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm whitespace-nowrap">
                <Sparkles size={10} />
                الأكثر مبيعاً
              </span>
            )}
            {isMiddle && (
              <span className="absolute -top-2.5 right-4 bg-[#2D8B6F] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                وفّري {offer.savingsMad} د.م
              </span>
            )}

            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "border-[#0B6B5C] bg-[#0B6B5C]"
                    : "border-[#D5E0DC] bg-white"
                }`}
              >
                {isSelected && <Check size={12} className="text-white" aria-hidden />}
              </div>
              <div className="text-right min-w-0">
                <p
                  className={`font-bold text-base leading-tight ${
                    isSelected ? "text-[#0B6B5C]" : "text-[#1A2332]"
                  }`}
                >
                  {offer.labelAr}
                </p>
                <p className="text-[12px] text-[#5A6A72] mt-0.5 leading-tight">
                  {offer.durationAr}
                </p>
              </div>
            </div>

            <div className="text-left shrink-0">
              <p
                className={`font-bold text-xl leading-none ${
                  isSelected ? "text-[#0B6B5C]" : "text-[#1A2332]"
                }`}
              >
                {offer.priceMad}
                <span className="text-[11px] font-medium mr-0.5">د.م</span>
              </p>
              <p className="text-[10px] text-[#2D8B6F] font-bold mt-1 whitespace-nowrap">
                ≈ {offer.perDayMad} د.م/اليوم
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
