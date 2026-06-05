"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ZoomIn, ShieldCheck } from "lucide-react";
import { MARKET } from "@/config/market";

type Variant = "document" | "feature" | "thumb";

const VARIANTS: Record<
  Variant,
  { className: string; sizes: string; width: number; height: number }
> = {
  document: {
    className: "w-full max-w-md mx-auto",
    sizes: "(max-width: 768px) 100vw, 448px",
    width: 448,
    height: 620,
  },
  feature: {
    className: "w-full max-h-[440px] aspect-[3/4] mx-auto",
    sizes: "(max-width: 768px) 90vw, 440px",
    width: 440,
    height: 586,
  },
  thumb: {
    className: "w-full max-w-[200px]",
    sizes: "200px",
    width: 200,
    height: 280,
  },
};

export function OnssaCertificate({ variant = "document" }: { variant?: Variant }) {
  const [srcIndex, setSrcIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const paths = MARKET.onssa.certificatePaths;
  const src = paths[srcIndex] ?? paths[paths.length - 1];
  const v = VARIANTS[variant];

  const handleError = useCallback(() => {
    setSrcIndex((i) => (i < paths.length - 1 ? i + 1 : i));
  }, [paths.length]);

  const frame = (
    <button
      type="button"
      onClick={() => setLightbox(true)}
      className={`group relative block ${v.className} rounded-2xl overflow-hidden border-2 border-[#D5E0DC] bg-white shadow-lg hover:border-[#0B6B5C]/40 hover:shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-[#0B6B5C]/20`}
      aria-label="عرض شهادة ONSSA بالحجم الكامل"
    >
      <Image
        src={src}
        alt={MARKET.onssa.certificateAltAr}
        width={v.width}
        height={v.height}
        sizes={v.sizes}
        className="w-full h-auto object-contain bg-[#F7FAF9]"
        onError={handleError}
        priority={variant === "feature"}
      />
      <span className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 bg-[#0B6B5C]/90 text-white text-xs font-bold py-2 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <ZoomIn size={14} aria-hidden />
        تكبير الشهادة
      </span>
      <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 text-[#0B6B5C] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#D5E0DC] shadow-sm">
        <ShieldCheck size={12} aria-hidden />
        ONSSA
      </span>
    </button>
  );

  return (
    <>
      {frame}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="شهادة ONSSA"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="إغلاق"
          >
            <X size={22} />
          </button>
          <div
            className="relative max-w-2xl w-full max-h-[90dvh] overflow-auto rounded-2xl bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={MARKET.onssa.certificateAltAr}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
