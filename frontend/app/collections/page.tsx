import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/product/ProductCard";
import { TrustChips } from "@/components/product/TrustChips";

export const metadata: Metadata = {
  title: "جميع المنتجات",
  description:
    "اختاري من روتين علكات لاميس: علكات اللوتين لإشراقة العين، علكات الكولاجين بفيتامين C والزنك، وعلكات الكلوروفيل للانتعاش. الدفع عند الاستلام.",
};

const filters = [
  { label: "الكل", value: "all" },
  { label: "العين والهالات", value: "eyes" },
  { label: "البشرة والشعر", value: "skin" },
  { label: "الانتعاش والمناعة", value: "freshness" },
];

export default function CollectionsPage() {
  return (
    <div dir="rtl">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#F7FAF9] to-white py-12 md:py-16">
        <div className="container-padded text-center">
          <span className="inline-block text-[#0B6B5C] font-bold text-xs bg-[#E8F0ED] px-3 py-1 rounded-full mb-4">
            مكملات بمعايير صيدلانية · مصرّحة SFDA
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A2332] mb-3">
            اختاري الروتين المناسب لاحتياجك
          </h1>
          <p className="text-[#5A6A72] text-lg mb-3 max-w-xl mx-auto">
            كل علبة فيها <strong className="text-[#1A2332]">60 علكة</strong> ·
            شهر كامل من الروتين · علكتين يومياً فقط
          </p>
          <p className="text-[#2D8B6F] text-sm font-bold mb-6">
            ابدئي من 199 ريال · الدفع عند الاستلام · ضمان استرجاع 30 يوم
          </p>
          <TrustChips />
        </div>
      </section>

      {/* Filter chips */}
      <div className="bg-white border-b border-[#D5E0DC] sticky top-[64px] sm:top-[80px] z-20">
        <div className="container-padded py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                f.value === "all"
                  ? "bg-[#0B6B5C] text-white border-[#0B6B5C]"
                  : "bg-white text-[#5A6A72] border-[#D5E0DC] hover:border-[#0B6B5C]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <section className="py-12 md:py-16 bg-[#F7FAF9]">
        <div className="container-padded">
          <p className="text-sm text-[#5A6A72] mb-6 text-right">
            كل منتج له 3 خيارات: شهر · شهرين · 3 شهور · مع تخفيض على المدد الأطول.
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
          <h2 className="text-2xl font-bold text-[#1A2332] mb-8 text-center">
            قارني المنتجات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-[#F7FAF9] border border-[#D5E0DC] rounded-3xl p-6 text-right"
              >
                <h3 className="font-bold text-[#1A2332] mb-3">
                  {product.shortNameAr}
                </h3>
                <ul className="space-y-2 mb-4">
                  {product.benefits.map((b) => (
                    <li
                      key={b}
                      className="text-sm text-[#5A6A72] flex items-start gap-2"
                    >
                      <span className="text-[#2D8B6F] mt-0.5">✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-[#D5E0DC] pt-4 flex items-center justify-between">
                  <Link
                    href={`/products/${product.slug}`}
                    className="bg-[#0B6B5C] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#095A4C] transition-colors"
                  >
                    اختاري عرضك
                  </Link>
                  <span className="text-[#0B6B5C] font-bold">
                    من {product.offers[0].priceSar} ريال
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best value prompt — push 3-month commitment for higher AOV */}
      <section className="py-12 md:py-16 bg-[#F7FAF9]">
        <div className="container-padded">
          <div className="bg-gradient-to-br from-[#0B6B5C] via-[#095A4C] to-[#084A3E] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#C9A45C] text-white text-[11px] font-bold px-3 py-1 rounded-full">
              أفضل قيمة
            </div>
            <span className="inline-block text-[#C9A45C] font-bold text-sm bg-white/10 px-3 py-1 rounded-full mb-4">
              روتين 3 شهور
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              ١٨٠ علكة · ٣ شهور كاملة · ٥ ريال فقط في اليوم
            </h2>
            <p className="text-[#E8F0ED] mb-2 max-w-xl mx-auto text-base">
              اختاري عرض 3 علب من أي منتج، ادفعي 449 ريال بدل 597،
              <strong className="text-[#C9A45C]"> ووفّري 148 ريال</strong>.
            </p>
            <p className="text-[#E8F0ED]/80 text-sm mb-6 max-w-xl mx-auto">
              المدة الكافية لتشوفي النتائج الكاملة على بشرتك، شعرك، وانتعاشك.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/products/collagen-glow-gummies"
                className="inline-block bg-white text-[#0B6B5C] font-bold px-6 py-3 rounded-full hover:bg-[#F7FAF9] transition-colors"
              >
                ابدئي بـ 3 شهور كولاجين
              </Link>
              <Link
                href="/products/lutein-eye-glow-gummies"
                className="inline-block bg-[#C9A45C] text-white font-bold px-6 py-3 rounded-full hover:bg-[#a8843e] transition-colors"
              >
                3 شهور لوتين للهالات
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[#E8F0ED]/90 text-xs font-medium">
              <span>✓ دفع عند الاستلام</span>
              <span>✓ ضمان 30 يوم</span>
              <span>✓ شحن سريع لكل المملكة</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
