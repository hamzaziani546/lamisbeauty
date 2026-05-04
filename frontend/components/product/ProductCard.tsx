import Link from "next/link";
import { Star, ArrowLeft, ShieldCheck } from "lucide-react";
import type { Product } from "@/config/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const baseOffer = product.offers.find((o) => o.id === "one");

  return (
    <div className="bg-white rounded-3xl border border-[#D5E0DC] overflow-hidden shadow-sm hover:shadow-lg transition-all group relative">
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm z-10 flex items-center gap-1 text-xs font-bold text-[#2D8B6F] border border-[#D5E0DC]">
        <ShieldCheck size={12} />
        ضمان 30 يوم
      </div>
      {/* Image placeholder */}
      <div className="relative h-56 bg-gradient-to-br from-[#E8F0ED] to-[#F7FAF9] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors"></div>
        <div className="text-center p-4 relative z-10 transform group-hover:scale-105 transition-transform">
          <div className="text-5xl mb-2 drop-shadow-sm">✨</div>
          <p className="text-[#0B6B5C] font-bold text-sm bg-white px-3 py-1 rounded-full shadow-sm inline-block">
            {product.shortNameAr}
          </p>
        </div>
      </div>

      <div className="p-6" dir="rtl">
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className="fill-[#C9A45C] text-[#C9A45C]"
                  aria-hidden
                />
              ))}
            </div>
            <span className="text-[11px] text-[#5A6A72] font-bold">4.9</span>
          </div>
          <span className="text-[10px] text-[#2D8B6F] font-bold bg-[#2D8B6F]/10 px-2 py-0.5 rounded-full">
            60 علكة · شهر كامل
          </span>
        </div>

        <h3 className="font-bold text-[#1A2332] text-lg leading-snug mb-2 group-hover:text-[#0B6B5C] transition-colors">
          {product.heroHeadline}
        </h3>

        <p className="text-[15px] text-[#5A6A72] mb-5 line-clamp-2 leading-relaxed">
          {product.subheadline}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#D5E0DC]/50">
          <div className="flex flex-col">
            <span className="text-xs text-[#5A6A72] mb-0.5">يبدأ من</span>
            <span className="text-[#0B6B5C] font-bold text-xl">
              {baseOffer?.priceSar} ريال
            </span>
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center gap-1.5 bg-[#0B6B5C] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#095A4C] transition-all shadow-md shadow-[#0B6B5C]/20 group-hover:shadow-[#0B6B5C]/30 group-hover:-translate-x-1"
            aria-label={`تسوقي ${product.shortNameAr}`}
          >
            تسوقي
            <ArrowLeft size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
