"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import type { Product } from "@/config/products";
import { OFFER_UPSELL_PRICE } from "@/config/products";
import { Button } from "@/components/ui/Button";
import { Clock } from "lucide-react";

const UPSELL_SECONDS = 12;

interface UpsellModalProps {
  product: Product;
  onAccept: () => void;
  onDecline: () => void;
}

export function UpsellModal({ product, onAccept, onDecline }: UpsellModalProps) {
  const [seconds, setSeconds] = useState(UPSELL_SECONDS);
  const declineRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    declineRef.current?.focus();
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const progress = ((UPSELL_SECONDS - seconds) / UPSELL_SECONDS) * 100;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="عرض خاص لمرة واحدة"
      dir="rtl"
      className="text-right"
    >
      {/* Countdown bar */}
      <div className="h-1.5 bg-[#D5E0DC] rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-[#0B6B5C] transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
          aria-hidden
        />
      </div>

      {/* Timer */}
      <div className="flex items-center gap-1.5 text-[#5A6A72] text-sm mb-4">
        <Clock size={14} aria-hidden />
        <span>
          يظهر هذا العرض لمدة{" "}
          <strong className="text-[#0B6B5C]">{seconds}</strong> ثانية فقط
        </span>
      </div>

      <h2 className="text-xl font-bold text-[#1A2332] mb-2">
        عرض خاص يظهر لك مرة واحدة
      </h2>

      <p className="text-[#5A6A72] mb-4">
        حيت ثبتّي الطلب، تقدري تزيدي هاد المنتج لروتينك اليوم بـ {OFFER_UPSELL_PRICE} درهم.
      </p>

      {/* Product card */}
      <div className="bg-[#F7FAF9] border border-[#D5E0DC] rounded-2xl p-4 mb-5 hover:border-[#0B6B5C]/30 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-center gap-3">
          <Link
            href={`/products/${product.slug}`}
            aria-label={`ادخلي صفحة ${product.shortNameAr}`}
            className="relative w-20 h-20 rounded-xl bg-white border border-[#D5E0DC] overflow-hidden shrink-0 block group-hover:border-[#0B6B5C]/20 transition-colors"
          >
            <Image
              src={product.images.main}
              alt={product.shortNameAr}
              fill
              loading="lazy"
              sizes="80px"
              className="h-full w-full object-cover"
            />
          </Link>
          <div>
            <p className="font-bold text-[#1A2332] text-sm leading-snug">
              {product.shortNameAr}
            </p>
            <p className="text-xs text-[#5A6A72] mt-1 line-clamp-2">
              {product.subheadline}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[#0B6B5C] font-bold text-lg">
                {OFFER_UPSELL_PRICE} درهم
              </span>
              <span className="text-[#5A6A72] text-sm line-through">
                {product.offers[0].priceMad} درهم
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onAccept}
        >
          زيديه لطلبي بـ {OFFER_UPSELL_PRICE} درهم
        </Button>
        <button
          ref={declineRef}
          onClick={onDecline}
          className="w-full text-center text-sm text-[#5A6A72] hover:text-[#1A2332] py-2 transition-colors"
        >
          لا شكراً، كملي الطلب
        </button>
      </div>
    </div>
  );
}
