import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/product/ProductCard";
import { TrustChips } from "@/components/product/TrustChips";

export const metadata: Metadata = {
  title: "جميع المنتجات",
  description:
    "اختاري من روتين لاميس: كولاجين بحري، بخاخ إكليل وبيوتين، وعلكات كلوروفيل. الدفع عند الاستلام.",
};

const filters = [
  { label: "الكل", value: "all" },
  { label: "البشرة", value: "skin" },
  { label: "الشعر", value: "hair" },
  { label: "الانتعاش", value: "freshness" },
];

export default function CollectionsPage() {
  return (
    <div dir="rtl">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#FFF8F1] to-white py-12 md:py-16">
        <div className="container-padded text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-3">
            اختاري المنتج الأقرب لاحتياجك اليوم
          </h1>
          <p className="text-[#6F6262] text-lg mb-6 max-w-xl mx-auto">
            كل منتج في روتين لاميس مختار ليكون جزء واضح ومريح من يومك.
          </p>
          <TrustChips />
        </div>
      </section>

      {/* Filter chips */}
      <div className="bg-white border-b border-[#E8DAD6] sticky top-[64px] sm:top-[80px] z-20">
        <div className="container-padded py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                f.value === "all"
                  ? "bg-[#8F3F55] text-white border-[#8F3F55]"
                  : "bg-white text-[#6F6262] border-[#E8DAD6] hover:border-[#8F3F55]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <section className="py-12 md:py-16 bg-[#FFF8F1]">
        <div className="container-padded">
          <p className="text-sm text-[#6F6262] mb-6 text-right">
            كل منتج له عروض 1 / 2 / 3 قطع — اختاري ما يناسب روتينك.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison cards */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-padded">
          <h2 className="text-2xl font-bold text-[#251F20] mb-8 text-center">
            قارني المنتجات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-[#FFF8F1] border border-[#E8DAD6] rounded-3xl p-6 text-right"
              >
                <h3 className="font-bold text-[#251F20] mb-3">
                  {product.shortNameAr}
                </h3>
                <ul className="space-y-2 mb-4">
                  {product.benefits.map((b) => (
                    <li
                      key={b}
                      className="text-sm text-[#6F6262] flex items-start gap-2"
                    >
                      <span className="text-[#7B9277] mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[#E8DAD6] pt-4 flex items-center justify-between">
                  <Link
                    href={`/products/${product.slug}`}
                    className="bg-[#8F3F55] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#7a3549] transition-colors"
                  >
                    اختاري عرضك
                  </Link>
                  <span className="text-[#8F3F55] font-bold">
                    من {product.offers[0].priceSar} ريال
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle prompt */}
      <section className="py-12 bg-[#FFF8F1]">
        <div className="container-padded">
          <div className="bg-gradient-to-r from-[#8F3F55] to-[#6E4B3A] rounded-3xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">وفري أكثر مع روتين الشهر</h2>
            <p className="text-[#F7E8E6] mb-6 max-w-lg mx-auto">
              اختاري عرض 3 قطع من أي منتج واحصلي على أفضل قيمة — روتين كامل
              لشهر كامل.
            </p>
            <Link
              href="/products/marine-collagen-latte"
              className="inline-block bg-white text-[#8F3F55] font-bold px-6 py-3 rounded-full hover:bg-[#FFF8F1] transition-colors"
            >
              ابدئي بالكولاجين البحري
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
