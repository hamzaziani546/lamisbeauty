import Link from "next/link";
import { Star, ArrowLeft, ShieldCheck, Flame } from "lucide-react";
import type { Product } from "@/config/products";

const BEST_SELLER_ID = "collagen-glow-gummies";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const baseOffer = product.offers.find((o) => o.id === "one");
  const bestOffer = product.offers.find((o) => o.id === "three");
  const isBestSeller = product.id === BEST_SELLER_ID;

  return (
    <div
      className={`bg-white rounded-3xl border-2 ${
        isBestSeller ? "border-[#C9A45C]" : "border-[#D5E0DC]"
      } overflow-hidden shadow-sm hover:shadow-xl transition-all group relative flex flex-col`}
    >
      {/* Best seller badge */}
      {isBestSeller && (
        <div className="absolute top-3 right-3 z-10 bg-[#C9A45C] text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Flame size={10} aria-hidden />
          الأكثر مبيعاً
        </div>
      )}

      {/* Guarantee badge */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm z-10 flex items-center gap-1 text-[10px] font-bold text-[#2D8B6F] border border-[#D5E0DC]">
        <ShieldCheck size={11} aria-hidden />
        ضمان ٣٠ يوم
      </div>

      {/* Product image */}
      <div className="relative aspect-[4/5] bg-white overflow-hidden shrink-0">
        <img
          src={product.images.main}
          alt={product.shortNameAr}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Order count overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent pt-8 pb-3 px-4">
          <span className="text-white text-[11px] font-bold flex items-center gap-1">
            🔥 {product.orderCountBadge}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1" dir="rtl">

        {/* Stars + duration pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="fill-[#C9A45C] text-[#C9A45C]" aria-hidden />
            ))}
            <span className="text-[11px] text-[#5A6A72] font-bold mr-1">4.9</span>
          </div>
          <span className="text-[10px] text-[#2D8B6F] font-bold bg-[#2D8B6F]/10 px-2 py-0.5 rounded-full whitespace-nowrap">
            ٦٠ علكة · شهر كامل
          </span>
        </div>

        {/* Product name */}
        <h3 className="font-bold text-[#1A2332] text-lg leading-snug mb-1 group-hover:text-[#0B6B5C] transition-colors">
          {product.shortNameAr}
        </h3>

        {/* Emotional hook */}
        <p className="text-sm text-[#5A6A72] mb-3 line-clamp-2 leading-relaxed">
          {product.heroHeadline}
        </p>

        {/* First 2 benefits as bullets */}
        <ul className="space-y-1.5 mb-4">
          {product.benefits.slice(0, 2).map((b) => (
            <li key={b} className="flex items-start gap-2 text-[12px] text-[#5A6A72]">
              <span className="text-[#2D8B6F] mt-0.5 shrink-0 font-bold">✓</span>
              <span className="leading-snug">{b}</span>
            </li>
          ))}
        </ul>

        {/* Spacer pushes footer down */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-[#D5E0DC]/60 gap-3">
          <div>
            <span className="text-[10px] text-[#5A6A72] block mb-0.5">يبدأ من</span>
            <span className="text-[#0B6B5C] font-extrabold text-xl leading-none">
              {baseOffer?.priceSar}
              <span className="text-sm font-medium mr-0.5">ريال</span>
            </span>
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center gap-1.5 bg-[#0B6B5C] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#095A4C] transition-all shadow-md shadow-[#0B6B5C]/20 group-hover:shadow-[#0B6B5C]/30 whitespace-nowrap"
            aria-label={`اختاري عرض ${product.shortNameAr}`}
          >
            اختاري عرضك
            <ArrowLeft size={14} aria-hidden />
          </Link>
        </div>

        {/* Best offer teaser */}
        {bestOffer && bestOffer.savingsSar && (
          <p className="text-[10px] text-[#2D8B6F] font-bold mt-3 text-center bg-[#2D8B6F]/5 rounded-xl py-1.5 border border-[#D5E0DC]/50">
            عرض ٣ شهور: {bestOffer.priceSar} ريال · وفّري {bestOffer.savingsSar} ريال
          </p>
        )}
      </div>
    </div>
  );
}
