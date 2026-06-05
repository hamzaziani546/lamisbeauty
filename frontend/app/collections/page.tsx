import type { Metadata } from "next";
import Link from "next/link";
import { Star, ShieldCheck, CreditCard, Truck, BadgeCheck } from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { MARKET } from "@/config/market";
import { OnssaCertificate } from "@/components/trust/OnssaCertificate";
import { ProductCard } from "@/components/product/ProductCard";
import { ReviewCard, PRODUCT_REVIEWS } from "@/components/product/ReviewCard";

export const metadata: Metadata = {
  title: "جميع المنتجات — لاميس",
  description:
    "جربي روتين علكات لاميس: لوتين للعين، كولاجين للبشرة، وكلوروفيل للانتعاش. الدفع عند الاستلام فالمغرب.",
};


export default function CollectionsPage() {
  return (
    <div dir="rtl">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-[#F7FAF9] to-white py-14 md:py-20">
        <div className="container-padded text-center">

          <span className="inline-block text-[#0B6B5C] font-bold text-xs bg-[#E8F0ED] px-3 py-1 rounded-full mb-5">
            {MARKET.onssa.badgeAr} · توصيل سريع لكل المغرب
          </span>

          {/* H1 — pain-led */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4 leading-tight max-w-2xl mx-auto">
            جمالك من الداخل —<br className="hidden sm:block" />
            هالات، بشرة، وانتعاش في علكة يومية
          </h1>

          {/* Sub-copy */}
          <p className="text-[#5A6A72] text-lg mb-4 max-w-xl mx-auto leading-relaxed">
            كل علبة فيها <strong className="text-[#1A2332]">60 علكة</strong> · شهر كامل ·
            علكتين يومياً فقط. لا حبوب، لا روتين معقد.
          </p>

        </div>
      </section>


      {/* ── PRODUCTS GRID ─────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-[#F7FAF9]">
        <div className="container-padded">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h2 className="text-2xl font-bold text-[#1A2332]">جميع المنتجات</h2>
              <p className="text-sm text-[#5A6A72] mt-1">
                كل منتج بـ 3 خيارات: شهر · شهرين · 3 شهور — مع تخفيض على المدد الأطول
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck size={14} className="text-[#2D8B6F]" aria-hidden />
              <span className="text-xs text-[#5A6A72] font-medium">الدار البيضاء نفس اليوم · 1–2 يوم</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-white border-y border-[#D5E0DC]">
        <div className="container-padded flex flex-col md:flex-row items-center gap-8 justify-center">
          <OnssaCertificate variant="thumb" />
          <div className="text-center md:text-right max-w-md">
            <h2 className="text-lg font-bold text-[#1A2332] mb-2">{MARKET.onssa.badgeFullAr}</h2>
            <p className="text-sm text-[#5A6A72] leading-relaxed">
              شهادتنا معروضة للتحقق — اضغطي على الصورة للتكبير.
            </p>
          </div>
        </div>
      </section>

      {/* ── MINI SOCIAL PROOF (NEW) ───────────────────────── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-padded">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={18} className="fill-[#C9A45C] text-[#C9A45C]" aria-hidden />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-2">
              ماذا تقول عميلاتنا؟
            </h2>
            <p className="text-[#5A6A72] flex items-center justify-center gap-1.5 text-sm">
              <BadgeCheck size={15} className="text-[#2D8B6F]" aria-hidden />
              تقييمات موثّقة من عميلات اشترت فعلاً
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRODUCTS.map((product) => {
              const review = PRODUCT_REVIEWS[product.id]?.[0];
              if (!review) return null;
              return <ReviewCard key={product.id} review={review} />;
            })}
          </div>
        </div>
      </section>

      {/* ── BEST VALUE — 3-MONTH PUSH ─────────────────────── */}
      <section className="py-12 md:py-16 bg-[#F7FAF9]">
        <div className="container-padded">
          <div className="bg-gradient-to-br from-[#0B6B5C] via-[#095A4C] to-[#084A3E] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">

            {/* Decorative glow */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #C9A45C 0%, transparent 55%)" }}
            />

            <div className="absolute top-4 right-4 bg-[#C9A45C] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
              أفضل قيمة
            </div>

            <span className="inline-block text-[#C9A45C] font-bold text-sm bg-white/10 px-3 py-1 rounded-full mb-5 backdrop-blur-sm border border-white/10">
              روتين 3 شهور
            </span>

            <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
              180 علكة · 3 شهور كاملة · 5 درهم فقط في اليوم
            </h2>

            <p className="text-[#E8F0ED] mb-1 max-w-xl mx-auto text-base">
              خذي عرض 3 علب من أي منتج، 449 درهم بدل 597 —
              <strong className="text-[#C9A45C]"> ووفّري 148 درهم</strong>.
            </p>
            <p className="text-[#E8F0ED]/70 text-sm mb-8 max-w-xl mx-auto">
              المدة الكافية باش تشوفي النتائج الكاملة على البشرة، الشعر، والانتعاش.
            </p>

            {/* 3 product CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8 flex-wrap">
              <Link
                href="/products/collagen-glow-gummies"
                className="inline-block bg-[#C9A45C] text-white font-bold px-6 py-3 rounded-full hover:bg-[#a8843e] hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                3 شهور كولاجين الإشراقة
              </Link>
              <Link
                href="/products/lutein-eye-glow-gummies"
                className="inline-block bg-white text-[#0B6B5C] font-bold px-6 py-3 rounded-full hover:bg-[#F7FAF9] hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                3 شهور شوت العين
              </Link>
              <Link
                href="/products/chlorophyll-gummies"
                className="inline-block bg-white/20 text-white font-bold px-6 py-3 rounded-full hover:bg-white/30 hover:-translate-y-0.5 transition-all duration-300 border border-white/30 hover:shadow-lg"
              >
                3 شهور الكلوروفيل
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: CreditCard,  text: "الدفع عند الاستلام" },
                { icon: ShieldCheck, text: "ضمان 30 يوم" },
                { icon: Truck,       text: "توصيل لكل المغرب" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5"
                >
                  <Icon size={13} className="text-white/80" aria-hidden />
                  <span className="text-white/90 text-xs font-bold">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
