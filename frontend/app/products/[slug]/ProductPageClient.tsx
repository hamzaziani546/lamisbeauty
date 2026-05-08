"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AlertCircle, ChevronRight, CheckCircle, ShieldCheck, ArrowLeft, Flame } from "lucide-react";
import type { Product } from "@/config/products";
import { useCartStore } from "@/store/cart-store";
import { OfferSelector } from "@/components/product/OfferSelector";
import { TrustChips } from "@/components/product/TrustChips";
import { StarRating } from "@/components/product/StarRating";
import { ReviewCard, SAMPLE_REVIEWS } from "@/components/product/ReviewCard";
import { Button } from "@/components/ui/Button";
import { trackAddToCart, trackViewContent } from "@/lib/tracking";
import { PRODUCTS } from "@/config/products";

interface Props {
  product: Product;
}

function ProductSectionImage({
  src,
  alt,
  badge,
}: {
  src: string;
  alt: string;
  badge: string;
}) {
  return (
    <div className="aspect-video bg-white rounded-3xl shadow-sm border border-[#D5E0DC] relative overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-bold text-[#0B6B5C] shadow-sm">
        {badge}
      </div>
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

  useEffect(() => {
    trackViewContent(product.id, product.offers[0].priceSar);
  }, [product.id, product.offers]);

  // Show sticky CTA only when the main CTA is out of view
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

  const crossSells = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div dir="rtl">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#D5E0DC]">
        <div className="container-padded py-3 flex items-center gap-2 text-sm text-[#5A6A72]">
          <Link href="/" className="hover:text-[#0B6B5C] transition-colors">
            الرئيسية
          </Link>
          <ChevronRight size={14} aria-hidden />
          <Link
            href="/collections"
            className="hover:text-[#0B6B5C] transition-colors"
          >
            المنتجات
          </Link>
          <ChevronRight size={14} aria-hidden />
          <span className="text-[#1A2332] font-medium">
            {product.shortNameAr}
          </span>
        </div>
      </div>

      {/* Above the fold */}
      <section className="py-10 md:py-16 bg-[#F7FAF9]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Image (RTL: order-1 md:order-2 => Image on the Right) */}
            <div className="md:sticky md:top-24 order-1 md:order-2">
              <div className="aspect-square bg-white rounded-3xl flex items-center justify-center shadow-md border border-[#D5E0DC]/50 relative overflow-hidden">
                <img
                  src={pdpImages.hero}
                  alt={product.nameAr}
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-[#0B6B5C] flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={14} />
                  ضمان 30 يوم
                </div>
              </div>
            </div>

            {/* Info (RTL: order-2 md:order-1 => Text on the Left) */}
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-2 mb-3">
                <StarRating />
                <span className="text-xs font-medium text-[#5A6A72] bg-white px-2 py-1 rounded-full border border-[#D5E0DC]">
                  60 علكة · شهر كامل · مصرّحة SFDA
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2332] leading-tight mb-3">
                {product.nameAr}
              </h1>
              <p className="text-[#5A6A72] mt-3 mb-5 leading-relaxed text-lg">
                {product.subheadline}
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-6 bg-white p-5 rounded-2xl border border-[#D5E0DC]">
                {product.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-[#1A2332] font-medium"
                  >
                    <span className="text-[#2D8B6F] bg-[#2D8B6F]/10 p-1 rounded-full mt-0.5">
                      <CheckCircle size={14} />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Offer selector */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <p className="text-sm font-bold text-[#1A2332]">
                    اختاري المدة المناسبة لروتينك:
                  </p>
                  <span className="text-[11px] font-bold text-[#2D8B6F] bg-[#2D8B6F]/10 px-2.5 py-1 rounded-full">
                    كل علبة = 60 علكة · شهر كامل
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
                  أضيفي العرض للسلة — {selectedOffer.priceSar} ريال
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#2D8B6F] font-medium bg-[#2D8B6F]/5 p-2 rounded-lg">
                <CheckCircle size={16} />
                الدفع عند الاستلام متاح، وفريقنا يتواصل معك للتأكيد.
              </div>

              <div className="mt-6">
                <TrustChips compact />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional problem */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-padded max-w-3xl">
          <div className="bg-gradient-to-br from-[#F7FAF9] to-white border border-[#D5E0DC] shadow-sm rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0B6B5C] to-transparent opacity-20"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B6B5C] mb-5 leading-tight">
              {product.heroHeadline}
            </h2>
            <p className="text-[#5A6A72] leading-relaxed text-lg">
              {product.emotionalCopy}
            </p>
          </div>
        </div>
      </section>

      {/* Product mechanism / ingredients */}
      <section className="py-12 md:py-16 bg-[#F7FAF9]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image (RTL: order-1 md:order-1 => Image on the Left) */}
            <div className="order-1 md:order-1">
              <ProductSectionImage
                src={pdpImages.ingredients}
                alt={`مكونات ${product.shortNameAr}`}
                badge="مكونات بحثية بجرعات واضحة"
              />
            </div>
            {/* Text (RTL: order-2 md:order-2 => Text on the Right) */}
            <div className="order-2 md:order-2">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#D5E0DC] mb-4">
                <span className="text-[#2D8B6F]">✨</span>
                <span className="text-xs font-bold text-[#5A6A72]">سر الفعالية</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-6">
                المكونات والآلية
              </h2>
              <div className="space-y-4">
                {product.ingredientNotes.map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#D5E0DC] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span
                      className="bg-[#F7FAF9] p-2 rounded-xl text-[#2D8B6F] font-bold text-xl leading-none mt-0.5"
                      aria-hidden
                    >
                      🌿
                    </span>
                    <p className="text-[15px] text-[#5A6A72] leading-relaxed font-medium">
                      {note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Routine section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Text (RTL: order-2 md:order-1 => Text on the Left) */}
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-[#F7FAF9] px-3 py-1 rounded-full border border-[#D5E0DC] mb-4">
                <span className="text-[#0B6B5C]">⏱️</span>
                <span className="text-xs font-bold text-[#5A6A72]">روتين سهل</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-5">
                كيف تستخدمينه؟
              </h2>
              <p className="text-[#5A6A72] text-lg leading-relaxed mb-6 bg-[#F7FAF9] p-5 rounded-2xl border border-[#D5E0DC]">
                {product.usage}
              </p>
              {product.warnings.map((w) => (
                <div
                  key={w}
                  className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mt-4"
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-600" aria-hidden />
                  <p className="font-medium">{w}</p>
                </div>
              ))}
            </div>
            {/* Image (RTL: order-1 md:order-2 => Image on the Right) */}
            <div className="order-1 md:order-2">
              <ProductSectionImage
                src={pdpImages.routine}
                alt={`روتين استخدام ${product.shortNameAr}`}
                badge="علكتين يومياً · بدون حبوب مرة"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Science & Authority section */}
      <section className="py-12 md:py-20 bg-[#F7FAF9]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image (RTL: order-1 md:order-1 => Image on the Left) */}
            <div className="order-1 md:order-1">
              <ProductSectionImage
                src={pdpImages.science}
                alt={`جودة وموثوقية ${product.shortNameAr}`}
                badge="مصرّحة SFDA · اختبار جودة لكل دفعة"
              />
            </div>
            {/* Text (RTL: order-2 md:order-2 => Text on the Right) */}
            <div className="order-2 md:order-2">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#D5E0DC] mb-4">
                <span className="text-[#2D8B6F]">🛡️</span>
                <span className="text-xs font-bold text-[#5A6A72]">موثوقية وأمان</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-5">
                جودة تثقين فيها
              </h2>
              <p className="text-[#5A6A72] text-lg leading-relaxed mb-6">
                صحتك وجمالك أمانة. لذلك نحرص على أن تكون منتجاتنا مصرحة من هيئة الغذاء والدواء السعودية (SFDA)، ومكوناتها مدروسة بعناية لتناسب طبيعة واحتياج المرأة في السعودية.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[15px] text-[#1A2332] font-medium bg-white p-3 rounded-xl border border-[#D5E0DC]">
                  <span className="text-white bg-[#2D8B6F] rounded-full p-1">
                    <CheckCircle size={16} />
                  </span>
                  <span>مصرحة من هيئة الغذاء والدواء (SFDA)</span>
                </li>
                <li className="flex items-center gap-3 text-[15px] text-[#1A2332] font-medium bg-white p-3 rounded-xl border border-[#D5E0DC]">
                  <span className="text-white bg-[#2D8B6F] rounded-full p-1">
                    <CheckCircle size={16} />
                  </span>
                  <span>مكونات آمنة ومدروسة بعناية</span>
                </li>
                <li className="flex items-center gap-3 text-[15px] text-[#1A2332] font-medium bg-white p-3 rounded-xl border border-[#D5E0DC]">
                  <span className="text-white bg-[#2D8B6F] rounded-full p-1">
                    <CheckCircle size={16} />
                  </span>
                  <span>تركيبة تناسب بيئة وأجواء المملكة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-padded max-w-4xl text-center">
          <div className="bg-gradient-to-b from-[#F7FAF9] to-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#D5E0DC]">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#D5E0DC]">
              <span className="text-4xl">🛡️</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-4">
              ضمان لاميس الذهبي - 30 يوم
            </h2>
            <p className="text-[#5A6A72] text-lg leading-relaxed max-w-2xl mx-auto">
              واثقين من جودة منتجاتنا وتأثيرها على روتينك. إذا ما حسيتي بالفرق اللي تتمنينه خلال 30 يوم، نرجع لك فلوسك بدون أي أسئلة معقدة. جربي الروتين وأنتِ مرتاحة البال.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-sell Bundle Section (Replaced Offer Stack) */}
      {crossSells.length > 0 && (
        <section className="py-16 md:py-20 bg-[#F7FAF9]" id="offer-stack">
          <div className="container-padded max-w-4xl">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#E8F0ED] text-[#0B6B5C] text-xs font-bold px-3 py-1 rounded-full mb-3">
                نتائج مضاعفة
              </span>
              <h2 className="text-3xl font-bold text-[#1A2332] mb-3">
                ضاعفي النتائج مع الباقة المتكاملة ✨
              </h2>
              <p className="text-[#5A6A72] text-lg">
                أكملي روتينك بمنتجات تتكامل مع بعضها لنتائج أسرع وأفضل.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {crossSells.map((crossProduct) => (
                <div key={crossProduct.id} className="bg-white border-2 border-[#D5E0DC] rounded-3xl overflow-hidden hover:border-[#0B6B5C]/50 transition-colors shadow-sm">
                  <div className="relative h-56 bg-white overflow-hidden">
                    <img
                      src={crossProduct.images.main}
                      alt={crossProduct.shortNameAr}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-[#1A2332] text-lg">{crossProduct.shortNameAr}</h3>
                        <p className="text-sm text-[#5A6A72]">+ {product.shortNameAr}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-xl text-[#0B6B5C]">349 ريال</p>
                        <p className="text-xs text-[#5A6A72] line-through">بدل 398 ريال</p>
                        <p className="text-[10px] text-[#2D8B6F] font-bold mt-0.5">
                          وفّري 49 ريال
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-[15px] text-[#5A6A72] mb-6 leading-relaxed line-clamp-2">
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
            
            <div className="flex justify-center mt-8">
              <TrustChips compact />
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-padded">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A2332] mb-3">
              تقييمات العميلات
            </h2>
            <p className="text-lg text-[#5A6A72]">
              تجارب حقيقية من عميلاتنا في السعودية
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_REVIEWS.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-[#F7FAF9]">
        <div className="container-padded max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1A2332] mb-3">
              أسئلة شائعة
            </h2>
            <p className="text-lg text-[#5A6A72]">
              كل ما تحتاجين معرفته عن {product.shortNameAr}
            </p>
          </div>
          <div className="space-y-4">
            {product.faq.map((item) => (
              <details
                key={item.q}
                className="bg-white border border-[#D5E0DC] rounded-2xl p-6 group shadow-sm"
              >
                <summary className="font-bold text-lg text-[#1A2332] cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-[#0B6B5C] text-2xl leading-none group-open:rotate-45 transition-transform inline-block bg-[#E8F0ED] w-8 h-8 rounded-full flex items-center justify-center">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[#5A6A72] text-[15px] leading-relaxed border-t border-[#D5E0DC] pt-4">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA — only visible when main CTA is out of view */}
      <div
        className={`fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-[min(640px,calc(100%-2.5rem))] z-50 transition-all duration-300 ease-out ${
          showStickyCta
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
        aria-hidden={!showStickyCta}
        aria-label="زر الإضافة للسلة ثابت"
      >
        <button
          onClick={handleAddToCart}
          className="group w-full flex items-center justify-between gap-3 bg-gradient-to-l from-[#0B6B5C] via-[#1E7B68] to-[#0B6B5C] text-white rounded-full pr-2 pl-5 py-2 shadow-2xl shadow-[#0B6B5C]/40 ring-1 ring-white/20 hover:shadow-[#0B6B5C]/50 active:scale-[0.99] transition-all overflow-hidden"
        >
          {/* Right side (RTL start): icon + text */}
          <span className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 w-11 h-11 rounded-full bg-white text-[#0B6B5C] flex items-center justify-center shadow-inner">
              <ArrowLeft size={20} className="rtl:rotate-180 group-hover:-translate-x-0.5 transition-transform" aria-hidden />
            </span>
            <span className="flex flex-col items-start text-right min-w-0">
              <span className="text-[11px] font-medium text-white/80 flex items-center gap-1 leading-none">
                <Flame size={11} className="text-amber-300" aria-hidden />
                <span>
                  {selectedOffer.durationAr || `${selectedOffer.quantity} علبة`}
                  {selectedOffer.savingsSar
                    ? ` · وفّري ${selectedOffer.savingsSar} ريال`
                    : ""}
                </span>
              </span>
              <span className="font-bold text-[15px] sm:text-base mt-0.5 truncate">
                أضيفي للسلة
              </span>
            </span>
          </span>

          {/* Left side (RTL end): price */}
          <span className="shrink-0 flex flex-col items-end leading-none">
            <span className="text-[10px] text-white/70">السعر</span>
            <span className="font-extrabold text-lg sm:text-xl">
              {selectedOffer.priceSar} ر.س
            </span>
          </span>
        </button>
      </div>

      {/* Bottom spacer reserved only when sticky is active to avoid covering content */}
      <div
        className={`transition-all duration-300 ${showStickyCta ? "h-24 md:h-24" : "h-0"}`}
        aria-hidden
      />

    </div>
  );
}
