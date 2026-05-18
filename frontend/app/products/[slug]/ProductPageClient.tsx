"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  CheckCircle,
  ShieldCheck,
  ArrowLeft,
  Flame,
  Truck,
  CreditCard,
  BadgeCheck,
  FlaskConical,
} from "lucide-react";
import type { Product } from "@/config/products";
import { useCartStore } from "@/store/cart-store";
import { OfferSelector } from "@/components/product/OfferSelector";
import { StarRating } from "@/components/product/StarRating";
import { ReviewCard, PRODUCT_REVIEWS, SAMPLE_REVIEWS } from "@/components/product/ReviewCard";
import { Button } from "@/components/ui/Button";
import { trackAddToCart, trackViewContent } from "@/lib/tracking";
import { PRODUCTS } from "@/config/products";

interface Props {
  product: Product;
}

/** Full-height image that stretches to match its sibling column — fixes desktop tiny-image bug */
function SectionImage({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge?: string;
}) {
  return (
    <div className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-[#D5E0DC] shadow-sm bg-white hover:shadow-lg hover:border-[#0B6B5C]/20 transition-all duration-500 group">
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes="(min-width: 768px) 50vw, 100vw"
        className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
      />
      {badge && (
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-bold text-[#0B6B5C] shadow-md border border-[#D5E0DC]/50">
          {badge}
        </div>
      )}
    </div>
  );
}

/** Three trust badges row under the CTA */
function TrustRow() {
  return (
    <div className="grid grid-cols-3 gap-2.5 mt-4">
      {[
        { icon: ShieldCheck, title: "ضمان ذهبي ٣٠ يوم", sub: "استرجاع كامل بلا أسئلة" },
        { icon: CreditCard, title: "الدفع عند الاستلام", sub: "لا دفع مسبق أبداً" },
        { icon: Truck, title: "شحن للسعودية", sub: "توصيل خلال ٢–٤ أيام" },
      ].map(({ icon: Icon, title, sub }) => (
        <div
          key={title}
          className="flex flex-col items-center text-center bg-white rounded-2xl p-3 border border-[#D5E0DC] shadow-sm gap-1 hover:border-[#0B6B5C]/30 hover:shadow-md transition-all duration-300 group"
        >
          <Icon size={18} className="text-[#0B6B5C] group-hover:scale-110 transition-transform duration-300" aria-hidden />
          <p className="text-[11px] font-bold text-[#1A2332] leading-tight">{title}</p>
          <p className="text-[10px] text-[#5A6A72] leading-tight">{sub}</p>
        </div>
      ))}
    </div>
  );
}

export function ProductPageClient({ product }: Props) {
  const [selectedOfferId, setSelectedOfferId] = useState("three");
  const { addItem, openCart } = useCartStore();
  const mainCtaRef = useRef<HTMLDivElement>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  const selectedOffer = product.offers.find((o) => o.id === selectedOfferId)!;
  const pdpImages = {
    hero: product.images.pdpHero ?? product.images.main,
    ingredients: product.images.pdpIngredients ?? product.images.routine,
    routine: product.images.pdpRoutine ?? product.images.routine,
    science: product.images.pdpScience ?? product.images.lifestyle ?? product.images.routine,
  };

  const reviews = PRODUCT_REVIEWS[product.id] ?? SAMPLE_REVIEWS;
  const crossSells = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  useEffect(() => {
    trackViewContent(product.id, product.offers[0].priceSar);
  }, [product.id, product.offers]);

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
    const item = {
      productId: product.id,
      offerId: selectedOfferId as "one" | "two" | "three",
      quantity: 1,
      unitCount: selectedOffer.quantity,
      titleAr: `${product.shortNameAr} - ${selectedOffer.labelAr}`,
      priceSar: selectedOffer.priceSar,
      source: "pdp" as const,
    };
    addItem(item);
    trackAddToCart(item);
    openCart();
  }

  function handleAddBundle(crossSellProduct: Product) {
    const bundleUnitPrice = 175;
    const mainItem = {
      productId: product.id,
      offerId: "one" as const,
      quantity: 1,
      unitCount: 1,
      titleAr: `${product.shortNameAr} - عرض الباقة`,
      priceSar: bundleUnitPrice,
      source: "pdp" as const,
    };
    addItem(mainItem);
    trackAddToCart(mainItem);
    const crossSellItem = {
      productId: crossSellProduct.id,
      offerId: "one" as const,
      quantity: 1,
      unitCount: 1,
      titleAr: `${crossSellProduct.shortNameAr} - عرض الباقة`,
      priceSar: 174,
      source: "pdp" as const,
    };
    addItem(crossSellItem);
    trackAddToCart(crossSellItem);
    openCart();
  }

  return (
    <div dir="rtl">


      {/* ── HERO ───────────────────────────────────────── */}
      <section className="py-10 md:py-16 bg-[#F7FAF9]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* Image column — sticky on desktop */}
            <div className="md:sticky md:top-24 order-1 md:order-2">
              <div className="aspect-[4/5] bg-white rounded-3xl shadow-md border border-[#D5E0DC]/50 relative overflow-hidden">
                <Image
                  src={pdpImages.hero}
                  alt={product.nameAr}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover object-center"
                />
                {/* Guarantee badge — top */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-[#0B6B5C] flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={13} aria-hidden />
                  ضمان ٣٠ يوم
                </div>
              </div>
            </div>

            {/* Text column */}
            <div className="order-2 md:order-1 space-y-5">

              {/* Social proof bar */}
              <div className="flex items-center gap-3 flex-wrap">
                <StarRating rating={4.9} count={120} />
                <span className="text-xs font-bold text-[#2D8B6F] bg-[#2D8B6F]/10 px-2.5 py-1 rounded-full">
                  مصرحة من هيئة الغذاء والدواء
                </span>
              </div>

              {/* Emotional H1 */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2332] leading-tight">
                  {product.heroHeadline}
                </h1>
                <p className="text-sm text-[#5A6A72] mt-2 font-medium">{product.shortNameAr} · ٦٠ علكة · شهر كامل</p>
              </div>

              <p className="text-[#5A6A72] leading-relaxed text-base">
                {product.subheadline}
              </p>

              {/* Benefits */}
              <ul className="space-y-2.5 bg-white p-5 rounded-2xl border border-[#D5E0DC] shadow-sm hover:shadow-md hover:border-[#0B6B5C]/20 transition-all duration-300">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-[#1A2332] font-medium">
                    <span className="text-[#2D8B6F] bg-[#2D8B6F]/10 p-1 rounded-full mt-0.5 shrink-0 shadow-sm">
                      <CheckCircle size={13} />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Urgency */}
              <div className="flex items-center gap-2 text-xs font-bold text-[#C9A45C] bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl">
                <Flame size={14} className="shrink-0" aria-hidden />
                متاح الآن للشحن الفوري داخل السعودية
              </div>

              {/* Offer selector */}
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-sm font-bold text-[#1A2332]">اختاري المدة المناسبة لروتينك:</p>
                  <span className="text-[11px] font-bold text-[#2D8B6F] bg-[#2D8B6F]/10 px-2.5 py-1 rounded-full">
                    كل علبة = ٦٠ علكة · شهر كامل
                  </span>
                </div>
                <OfferSelector
                  offers={product.offers.filter((o) => o.id !== "upsell")}
                  selected={selectedOfferId}
                  onSelect={setSelectedOfferId}
                />
              </div>

              {/* CTA */}
              <div ref={mainCtaRef}>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  aria-label={`أضيفي ${product.shortNameAr} - ${selectedOffer.labelAr} بسعر ${selectedOffer.priceSar} ريال`}
                  className="text-lg shadow-lg shadow-[#0B6B5C]/20 hover:shadow-[#0B6B5C]/30 transform hover:-translate-y-0.5 transition-all"
                >
                  أضيفي للسلة — {selectedOffer.priceSar} ريال
                </Button>
              </div>

              {/* Trust row */}
              <TrustRow />
            </div>

          </div>
        </div>
      </section>

      {/* ── PAIN / PROBLEM ─────────────────────────────── */}
      <section className="py-12 md:py-16 bg-white [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded max-w-3xl">
          <div className="text-center mb-4">
            <span className="text-xs font-bold text-[#0B6B5C] bg-[#E8F0ED] px-3 py-1 rounded-full">
              هل هذا يشبهك؟
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A2332] text-center leading-tight mb-5">
            {product.heroHeadline}
          </h2>
          <p className="text-[#5A6A72] leading-relaxed text-lg text-center mb-8">
            {product.emotionalCopy}
          </p>
          <div className="text-center">
            <button
              onClick={handleAddToCart}
              className="text-sm font-bold text-[#0B6B5C] underline underline-offset-4 hover:no-underline transition-all"
            >
              ابدئي التغيير اليوم ←
            </button>
          </div>
        </div>
      </section>

      {/* ── INGREDIENTS ────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10">

            {/* Image — stretches to text height */}
            <div className="order-1">
              <SectionImage
                src={pdpImages.ingredients}
                alt={`مكونات ${product.shortNameAr}`}
                badge="جرعات بحثية مدروسة"
              />
            </div>

            {/* Text */}
            <div className="order-2">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#D5E0DC] mb-4">
                <FlaskConical size={14} className="text-[#2D8B6F]" aria-hidden />
                <span className="text-xs font-bold text-[#5A6A72]">سر الفعالية</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-2">
                المكونات الفعّالة
              </h2>
              <p className="text-sm text-[#5A6A72] mb-6">كل مكون بجرعته المثبتة علمياً — لا حشو، لا ماء</p>
              <div className="space-y-3">
                {product.ingredientNotes.map((note, i) => {
                  const colonIdx = note.indexOf(":");
                  const name = colonIdx > -1 ? note.slice(0, colonIdx) : note;
                  const desc = colonIdx > -1 ? note.slice(colonIdx + 1).trim() : "";
                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-4 border border-[#D5E0DC] shadow-sm hover:shadow-md hover:border-[#0B6B5C]/30 transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-8 h-8 rounded-xl bg-[#E8F0ED] text-[#0B6B5C] flex items-center justify-center font-bold text-sm mt-0.5 group-hover:scale-110 transition-transform duration-300">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-bold text-[#1A2332] text-sm leading-snug">{name}</p>
                          {desc && (
                            <p className="text-[13px] text-[#5A6A72] mt-1 leading-relaxed">{desc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── RESULTS TIMELINE ───────────────────────────── */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#0B6B5C] to-[#1E7B68] [content-visibility:auto] [contain-intrinsic-size:700px]">
        <div className="container-padded">
          <div className="text-center mb-10">
            <span className="text-white/60 text-xs font-bold tracking-wider uppercase">ماذا تتوقعين؟</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              جهزي نفسك — النتائج أسرع مما تتوقعين ✨
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {product.resultTimeline.map((step, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {i + 1}
                  </span>
                  <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                    {step.period}
                  </span>
                </div>
                <p className="font-semibold text-base leading-snug">{step.result}</p>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mt-6">
            النتائج تتفاوت حسب الانتظام في الاستخدام والحالة الفردية
          </p>
        </div>
      </section>

      {/* ── REVIEWS (moved up — before routine) ─────────── */}
      <section className="py-12 md:py-16 bg-white [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          {/* Aggregate header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3 flex-wrap">
              <StarRating rating={4.9} />
              <span className="font-bold text-[#1A2332] text-lg">٤.٩ من ٥</span>
              <span className="text-[#5A6A72] text-sm">· ١٢٠+ تقييم موثّق</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332]">
              تقييمات عميلاتنا في السعودية
            </h2>
            <p className="text-[#5A6A72] mt-2 text-sm flex items-center justify-center gap-1.5">
              <BadgeCheck size={15} className="text-[#2D8B6F]" aria-hidden />
              كل تقييم من عميلة اشترت فعلاً وتحققنا من طلبها
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ROUTINE ────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10">

            {/* Text */}
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#D5E0DC] mb-4">
                <span className="text-[#0B6B5C] text-sm">⏱️</span>
                <span className="text-xs font-bold text-[#5A6A72]">روتين سهل</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-4">
                كيف تستخدمينه؟
              </h2>
              <div className="bg-white rounded-2xl p-5 border border-[#D5E0DC] mb-5">
                <p className="text-[#1A2332] text-lg leading-relaxed font-medium">
                  {product.usage}
                </p>
              </div>
              <div className="bg-[#E8F0ED] rounded-2xl p-4 border border-[#C5D9D3]">
                <p className="text-sm font-bold text-[#0B6B5C] mb-1">نصيحة للنتائج الأفضل:</p>
                <p className="text-sm text-[#5A6A72] leading-relaxed">
                  الانتظام هو المفتاح. العلكتان يومياً بدون انقطاع — حتى في أيام السفر.
                </p>
              </div>
            </div>

            {/* Image — stretches to text height */}
            <div className="order-1 md:order-2">
              <SectionImage
                src={pdpImages.routine}
                alt={`روتين استخدام ${product.shortNameAr}`}
                badge="علكتين يومياً · بدون حبوب"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ── SCIENCE / AUTHORITY ────────────────────────── */}
      <section className="py-12 md:py-16 bg-white [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10">

            {/* Image */}
            <div className="order-1">
              <SectionImage
                src={pdpImages.science}
                alt={`جودة وموثوقية ${product.shortNameAr}`}
                badge="مصرّحة SFDA · جودة مضمونة"
              />
            </div>

            {/* Text */}
            <div className="order-2">
              <div className="inline-flex items-center gap-2 bg-[#F7FAF9] px-3 py-1 rounded-full border border-[#D5E0DC] mb-4">
                <ShieldCheck size={14} className="text-[#2D8B6F]" aria-hidden />
                <span className="text-xs font-bold text-[#5A6A72]">العلم يثبتها</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-4">
                جودة تثقين فيها
              </h2>
              <p className="text-[#5A6A72] text-base leading-relaxed mb-6">
                {product.scienceCopy}
              </p>
              <ul className="space-y-3">
                {[
                  "مصرحة من هيئة الغذاء والدواء السعودية (SFDA)",
                  "مكونات بجرعات مدروسة وموثّقة علمياً",
                  "تركيبة تناسب بيئة واحتياجات المرأة في المملكة",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#1A2332] font-medium bg-[#F7FAF9] p-3 rounded-xl border border-[#D5E0DC] hover:border-[#0B6B5C]/30 hover:shadow-sm transition-all duration-300 group"
                  >
                    <span className="text-white bg-[#2D8B6F] rounded-full p-1 shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle size={14} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── WARRANTY ───────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:700px]">
        <div className="container-padded max-w-3xl">
          <div className="bg-gradient-to-br from-[#0B6B5C] to-[#1E7B68] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, #C9A45C 0%, transparent 60%)" }} />
            <div className="w-16 h-16 bg-white/15 rounded-full flex items-center justify-center mx-auto mb-5 border border-white/30">
              <ShieldCheck size={32} className="text-white" aria-hidden />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              ضمان لاميس الذهبي — ٣٠ يوم
            </h2>
            <p className="text-white/80 text-base leading-relaxed max-w-xl mx-auto mb-6">
              واثقين من أثر منتجاتنا. إذا ما حسيتي بالفرق خلال ٣٠ يوماً من الاستخدام المنتظم، نرجع لكِ فلوسك كاملة — بدون نقاش، بدون شرط.
            </p>
            <button
              onClick={handleAddToCart}
              className="bg-white text-[#0B6B5C] font-bold px-8 py-3 rounded-full text-base hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              جربي الآن بدون مخاطرة
            </button>
          </div>
        </div>
      </section>

      {/* ── CROSS-SELL BUNDLE ──────────────────────────── */}
      {crossSells.length > 0 && (
        <section className="py-14 md:py-18 bg-white [content-visibility:auto] [contain-intrinsic-size:900px]" id="offer-stack">
          <div className="container-padded max-w-4xl">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#E8F0ED] text-[#0B6B5C] text-xs font-bold px-3 py-1 rounded-full mb-3">
                نتائج مضاعفة
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-3">
                ضاعفي النتائج مع الباقة المتكاملة ✨
              </h2>
              <p className="text-[#5A6A72]">
                أكملي روتينك بمنتجات تتكامل مع بعضها لنتائج أسرع وأشمل.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {crossSells.map((crossProduct) => (
                <div
                  key={crossProduct.id}
                  className="bg-white border-2 border-[#D5E0DC] rounded-3xl overflow-hidden hover:border-[#0B6B5C]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-sm group"
                >
                  <div className="relative aspect-[4/5] bg-white overflow-hidden">
                    <Image
                      src={crossProduct.images.main}
                      alt={crossProduct.shortNameAr}
                      fill
                      loading="lazy"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3 gap-3">
                      <div>
                        <h3 className="font-bold text-[#1A2332] text-lg">{crossProduct.shortNameAr}</h3>
                        <p className="text-sm text-[#5A6A72] mt-0.5">يتكامل مع {product.shortNameAr}</p>
                      </div>
                      <div className="text-left shrink-0">
                        <p className="font-bold text-xl text-[#0B6B5C]">٣٤٩ ريال</p>
                        <p className="text-xs text-[#5A6A72] line-through">بدل ٣٩٨</p>
                        <p className="text-[10px] text-[#2D8B6F] font-bold mt-0.5">وفّري ٤٩ ريال</p>
                      </div>
                    </div>
                    <p className="text-sm text-[#5A6A72] mb-5 leading-relaxed line-clamp-2">
                      {crossProduct.subheadline}
                    </p>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={() => handleAddBundle(crossProduct)}
                      className="shadow-md shadow-[#0B6B5C]/10"
                    >
                      أضيفي الباقة للسلة
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="py-14 md:py-18 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:800px]">
        <div className="container-padded max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-2">أسئلة شائعة</h2>
            <p className="text-[#5A6A72]">كل ما تحتاجين معرفته عن {product.shortNameAr}</p>
          </div>
          <div className="space-y-3">
            {product.faq.map((item) => (
              <details
                key={item.q}
                className="bg-white border border-[#D5E0DC] rounded-2xl p-6 group shadow-sm hover:shadow-md hover:border-[#0B6B5C]/30 transition-all duration-300"
              >
                <summary className="font-bold text-base text-[#1A2332] cursor-pointer list-none flex justify-between items-center gap-3">
                  <span className="group-hover:text-[#0B6B5C] transition-colors">{item.q}</span>
                  <span className="shrink-0 text-[#0B6B5C] text-xl leading-none group-open:rotate-45 transition-transform duration-300 w-8 h-8 rounded-full bg-[#E8F0ED] flex items-center justify-center font-bold">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[#5A6A72] text-sm leading-relaxed border-t border-[#D5E0DC] pt-4">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[#1A2332] [content-visibility:auto] [contain-intrinsic-size:700px]">
        <div className="container-padded max-w-xl">
          <div className="text-center mb-8">
            <span className="text-[#C9A45C] text-sm font-bold">جاهزة تبدئي؟</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 leading-tight">
              اختاري عرضك وابدئي روتينك اليوم
            </h2>
            <p className="text-white/50 text-sm mt-2">الدفع عند الاستلام · لا مخاطرة · ضمان ٣٠ يوم</p>
          </div>
          <OfferSelector
            offers={product.offers.filter((o) => o.id !== "upsell")}
            selected={selectedOfferId}
            onSelect={setSelectedOfferId}
          />
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            className="mt-5 text-lg shadow-lg shadow-[#0B6B5C]/30 hover:shadow-[#0B6B5C]/50 transform hover:-translate-y-0.5 transition-all"
          >
            أضيفي للسلة — {selectedOffer.priceSar} ريال
          </Button>
          <TrustRow />
          <p className="text-white/30 text-xs text-center mt-6">
            مصرحة من هيئة الغذاء والدواء السعودية (SFDA) · شحن لجميع مناطق المملكة
          </p>
        </div>
      </section>

      {/* ── STICKY CTA ─────────────────────────────────── */}
      <div
        className={`fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[min(640px,calc(100%-2.5rem))] z-50 transition-all duration-300 ease-out ${
          showStickyCta
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        aria-hidden={!showStickyCta}
      >
        <button
          onClick={handleAddToCart}
          className="group w-full flex items-center justify-between gap-3 bg-gradient-to-l from-[#0B6B5C] via-[#1E7B68] to-[#0B6B5C] text-white rounded-full pr-2 pl-5 py-2 shadow-2xl shadow-[#0B6B5C]/40 ring-1 ring-white/20 hover:shadow-[#0B6B5C]/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
        >
          <span className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 w-11 h-11 rounded-full bg-white text-[#0B6B5C] flex items-center justify-center shadow-inner">
              <ArrowLeft size={20} className="rtl:rotate-180 group-hover:-translate-x-0.5 transition-transform" aria-hidden />
            </span>
            <span className="flex flex-col items-start text-right min-w-0">
              <span className="text-[11px] font-medium text-white/80 flex items-center gap-1 leading-none">
                <Flame size={11} className="text-amber-300" aria-hidden />
                <span>
                  {selectedOffer.durationAr || `${selectedOffer.quantity} علبة`}
                  {selectedOffer.savingsSar ? ` · وفّري ${selectedOffer.savingsSar} ريال` : ""}
                </span>
              </span>
              <span className="font-bold text-[15px] sm:text-base mt-0.5 truncate">أضيفي للسلة</span>
            </span>
          </span>
          <span className="shrink-0 flex flex-col items-end leading-none">
            <span className="text-[10px] text-white/70">السعر</span>
            <span className="font-extrabold text-lg sm:text-xl">{selectedOffer.priceSar} ر.س</span>
          </span>
        </button>
      </div>

      <div
        className={`transition-all duration-300 ${showStickyCta ? "h-24" : "h-0"}`}
        aria-hidden
      />

    </div>
  );
}
