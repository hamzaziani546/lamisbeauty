"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Flame } from "lucide-react";
import type { LandingPagePublic } from "@/lib/landing-pages";
import { LpProductSelector } from "@/components/lp/LpProductSelector";
import { StarRating } from "@/components/product/StarRating";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cart-store";
import { trackAddToCart, trackViewContent } from "@/lib/tracking";

export function LandingPageClient({ page }: { page: LandingPagePublic }) {
  const [selectedId, setSelectedId] = useState(page.products[0]?.id ?? "");
  const { addItem, openCart } = useCartStore();
  const mainCtaRef = useRef<HTMLDivElement>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  const selected = page.products.find((p) => p.id === selectedId) ?? page.products[0];

  useEffect(() => {
    if (selected) trackViewContent(`lp-${selected.sku}`, selected.price_mad);
  }, [selected]);

  useEffect(() => {
    const el = mainCtaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyCta(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleAddToCart() {
    if (!selected) return;
    const item = {
      productId: `lp-${selected.sku}`,
      offerId: selected.id,
      quantity: 1,
      unitCount: 1,
      titleAr: selected.name_ar,
      priceMad: selected.price_mad,
      source: `lp:${page.slug}:${selected.id}` as const,
      imageUrl: selected.image,
    };
    addItem(item);
    trackAddToCart(item);
    openCart();
  }

  if (!selected || page.products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#5A6A72]">
        لا توجد منتجات على هذه الصفحة
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#F7FAF9] pb-6">
      <div className="w-full max-w-lg mx-auto bg-white shadow-sm">
        <div className="relative aspect-[4/5] w-full bg-[#E8F0ED]">
          <Image
            src={page.hero_image}
            alt={page.title_ar}
            fill
            priority
            sizes="(max-width: 512px) 100vw, 512px"
            className="object-cover object-center"
          />
        </div>

        <div className="px-4 py-5 space-y-5">
          <div className="flex justify-center">
            <StarRating rating={page.rating} count={page.review_count} />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#1A2332] text-center leading-snug">
            {page.title_ar}
          </h1>

          <div>
            <p className="text-sm font-bold text-[#1A2332] mb-3 text-center">
              اختاري العرض المناسب:
            </p>
            <LpProductSelector
              products={page.products}
              selected={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div ref={mainCtaRef}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              className="text-lg shadow-lg shadow-[#0B6B5C]/20"
            >
              زيدي للسلة — {selected.price_mad} درهم
            </Button>
          </div>
        </div>

        {page.gallery_images.length > 0 && (
          <div className="space-y-0">
            {page.gallery_images.map((src, i) => (
              <div key={`${src}-${i}`} className="relative aspect-[4/5] w-full bg-[#E8F0ED]">
                <Image
                  src={src}
                  alt={`${page.title_ar} — صورة ${i + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 512px) 100vw, 512px"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        )}

        <div className="px-4 py-6 bg-[#1A2332]">
          <LpProductSelector
            products={page.products}
            selected={selectedId}
            onSelect={setSelectedId}
          />
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            className="mt-4 text-lg"
          >
            زيدي للسلة — {selected.price_mad} درهم
          </Button>
        </div>
      </div>

      <div
        className={`fixed bottom-3 left-3 right-3 z-50 max-w-lg mx-auto transition-all duration-300 ${
          showStickyCta
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        aria-hidden={!showStickyCta}
      >
        <button
          type="button"
          onClick={handleAddToCart}
          className="group w-full flex items-center justify-between gap-3 bg-gradient-to-l from-[#0B6B5C] via-[#1E7B68] to-[#0B6B5C] text-white rounded-full pr-2 pl-5 py-2 shadow-2xl shadow-[#0B6B5C]/40 ring-1 ring-white/20"
        >
          <span className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 w-11 h-11 rounded-full bg-white text-[#0B6B5C] flex items-center justify-center">
              <ArrowLeft size={20} className="rtl:rotate-180" aria-hidden />
            </span>
            <span className="flex flex-col items-start text-right min-w-0">
              <span className="text-[11px] font-medium text-white/80 flex items-center gap-1">
                <Flame size={11} className="text-amber-300" aria-hidden />
                {selected.name_ar}
              </span>
              <span className="font-bold text-[15px] truncate">زيدي للسلة</span>
            </span>
          </span>
          <span className="shrink-0 font-extrabold text-lg">{selected.price_mad} د.م</span>
        </button>
      </div>

      <div className={`transition-all duration-300 ${showStickyCta ? "h-24" : "h-0"}`} aria-hidden />
    </div>
  );
}
