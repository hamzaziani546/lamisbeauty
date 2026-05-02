"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AlertCircle, ChevronRight, CheckCircle, ShieldCheck } from "lucide-react";
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

export function ProductPageClient({ product }: Props) {
  const [selectedOfferId, setSelectedOfferId] = useState("three");
  const { addItem, openCart } = useCartStore();

  const selectedOffer = product.offers.find((o) => o.id === selectedOfferId)!;

  useEffect(() => {
    trackViewContent(product.id, product.offers[0].priceSar);
  }, [product.id, product.offers]);

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
    // Add main product (1 piece)
    const mainItem = {
      productId: product.id,
      offerId: "one" as const,
      quantity: 1,
      unitCount: 1,
      titleAr: `${product.shortNameAr} - قطعة واحدة`,
      priceSar: 199,
      source: "pdp" as const,
    };
    addItem(mainItem);
    trackAddToCart(mainItem);

    // Add cross-sell product (1 piece)
    const crossSellItem = {
      productId: crossSellProduct.id,
      offerId: "one" as const,
      quantity: 1,
      unitCount: 1,
      titleAr: `${crossSellProduct.shortNameAr} - قطعة واحدة`,
      priceSar: 199,
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
      <div className="bg-white border-b border-[#E8DAD6]">
        <div className="container-padded py-3 flex items-center gap-2 text-sm text-[#6F6262]">
          <Link href="/" className="hover:text-[#8F3F55] transition-colors">
            الرئيسية
          </Link>
          <ChevronRight size={14} aria-hidden />
          <Link
            href="/collections"
            className="hover:text-[#8F3F55] transition-colors"
          >
            المنتجات
          </Link>
          <ChevronRight size={14} aria-hidden />
          <span className="text-[#251F20] font-medium">
            {product.shortNameAr}
          </span>
        </div>
      </div>

      {/* Above the fold */}
      <section className="py-10 md:py-16 bg-[#FFF8F1]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Image (RTL: order-1 md:order-2 => Image on the Right) */}
            <div className="md:sticky md:top-24 order-1 md:order-2">
              <div className="aspect-square bg-gradient-to-br from-[#F7E8E6] to-[#FFF8F1] rounded-3xl flex items-center justify-center shadow-md border border-[#E8DAD6]/50 relative overflow-hidden">
                <div className="text-center p-8 z-10">
                  <p className="text-6xl mb-4">✨</p>
                  <p className="text-[#8F3F55] font-bold text-lg">
                    {product.shortNameAr}
                  </p>
                  <p className="text-[#6F6262] text-sm mt-1">صورة المنتج قريباً</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-bold text-[#8F3F55] flex items-center gap-1 shadow-sm">
                  <ShieldCheck size={14} />
                  ضمان 30 يوم
                </div>
              </div>
            </div>

            {/* Info (RTL: order-2 md:order-1 => Text on the Left) */}
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-2 mb-3">
                <StarRating />
                <span className="text-xs font-medium text-[#6F6262] bg-white px-2 py-1 rounded-full border border-[#E8DAD6]">
                  +10,000 عميلة يثقون بنا
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#251F20] leading-tight mb-3">
                {product.nameAr}
              </h1>
              <p className="text-[#6F6262] mt-3 mb-5 leading-relaxed text-lg">
                {product.subheadline}
              </p>

              {/* Benefits */}
              <ul className="space-y-3 mb-6 bg-white p-5 rounded-2xl border border-[#E8DAD6]">
                {product.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm text-[#251F20] font-medium"
                  >
                    <span className="text-[#7B9277] bg-[#7B9277]/10 p-1 rounded-full mt-0.5">
                      <CheckCircle size={14} />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Offer selector */}
              <div className="mb-5">
                <p className="text-sm font-bold text-[#251F20] mb-3 flex items-center gap-2">
                  <span>اختاري عرضك:</span>
                  <span className="text-xs font-normal text-white bg-[#8F3F55] px-2 py-0.5 rounded-full animate-pulse">
                    الكمية محدودة
                  </span>
                </p>
                <OfferSelector
                  offers={product.offers.filter((o) => o.id !== "upsell")}
                  selected={selectedOfferId}
                  onSelect={setSelectedOfferId}
                />
              </div>

              {/* CTA */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                aria-label={`أضيفي ${product.shortNameAr} - ${selectedOffer.labelAr} بسعر ${selectedOffer.priceSar} ريال`}
                className="text-lg shadow-lg shadow-[#8F3F55]/20 hover:shadow-[#8F3F55]/30 transform hover:-translate-y-0.5 transition-all"
              >
                أضيفي العرض للسلة — {selectedOffer.priceSar} ريال
              </Button>

              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-[#7B9277] font-medium bg-[#7B9277]/5 p-2 rounded-lg">
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
          <div className="bg-gradient-to-br from-[#FFF8F1] to-white border border-[#E8DAD6] shadow-sm rounded-3xl p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8F3F55] to-transparent opacity-20"></div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#8F3F55] mb-5 leading-tight">
              {product.heroHeadline}
            </h2>
            <p className="text-[#6F6262] leading-relaxed text-lg">
              {product.emotionalCopy}
            </p>
          </div>
        </div>
      </section>

      {/* Product mechanism / ingredients */}
      <section className="py-12 md:py-16 bg-[#FFF8F1]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image placeholder (RTL: order-1 md:order-1 => Image on the Left) */}
            <div className="order-1 md:order-1">
              <div className="aspect-video bg-gradient-to-br from-[#F7E8E6] to-[#FFF8F1] rounded-3xl flex items-center justify-center shadow-inner border border-white">
                <div className="text-center">
                  <p className="text-5xl mb-3">🌿</p>
                  <p className="text-[#8F3F55] text-sm font-bold bg-white px-4 py-1.5 rounded-full shadow-sm">
                    صورة المكونات
                  </p>
                </div>
              </div>
            </div>
            {/* Text (RTL: order-2 md:order-2 => Text on the Right) */}
            <div className="order-2 md:order-2">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#E8DAD6] mb-4">
                <span className="text-[#7B9277]">✨</span>
                <span className="text-xs font-bold text-[#6F6262]">سر الفعالية</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#251F20] mb-6">
                المكونات والآلية
              </h2>
              <div className="space-y-4">
                {product.ingredientNotes.map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-[#E8DAD6] shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span
                      className="bg-[#FFF8F1] p-2 rounded-xl text-[#7B9277] font-bold text-xl leading-none mt-0.5"
                      aria-hidden
                    >
                      🌿
                    </span>
                    <p className="text-[15px] text-[#6F6262] leading-relaxed font-medium">
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
              <div className="inline-flex items-center gap-2 bg-[#FFF8F1] px-3 py-1 rounded-full border border-[#E8DAD6] mb-4">
                <span className="text-[#8F3F55]">⏱️</span>
                <span className="text-xs font-bold text-[#6F6262]">روتين سهل</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#251F20] mb-5">
                كيف تستخدمينه؟
              </h2>
              <p className="text-[#6F6262] text-lg leading-relaxed mb-6 bg-[#FFF8F1] p-5 rounded-2xl border border-[#E8DAD6]">
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
            {/* Image placeholder (RTL: order-1 md:order-2 => Image on the Right) */}
            <div className="order-1 md:order-2">
              <div className="aspect-video bg-gradient-to-br from-[#FFF8F1] to-[#F7E8E6] rounded-3xl flex items-center justify-center shadow-inner border border-white">
                <div className="text-center">
                  <p className="text-5xl mb-3">💧</p>
                  <p className="text-[#8F3F55] text-sm font-bold bg-white px-4 py-1.5 rounded-full shadow-sm">
                    صورة الاستخدام
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Science & Authority section */}
      <section className="py-12 md:py-20 bg-[#FFF8F1]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Image placeholder (RTL: order-1 md:order-1 => Image on the Left) */}
            <div className="order-1 md:order-1">
              <div className="aspect-video bg-gradient-to-br from-white to-[#FFF8F1] rounded-3xl flex items-center justify-center shadow-sm border border-[#E8DAD6]">
                <div className="text-center">
                  <p className="text-5xl mb-3">🔬</p>
                  <p className="text-[#8F3F55] text-sm font-bold bg-[#F7E8E6] px-4 py-1.5 rounded-full">
                    صورة التصريح / المختبر
                  </p>
                </div>
              </div>
            </div>
            {/* Text (RTL: order-2 md:order-2 => Text on the Right) */}
            <div className="order-2 md:order-2">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#E8DAD6] mb-4">
                <span className="text-[#7B9277]">🛡️</span>
                <span className="text-xs font-bold text-[#6F6262]">موثوقية وأمان</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#251F20] mb-5">
                جودة تثقين فيها
              </h2>
              <p className="text-[#6F6262] text-lg leading-relaxed mb-6">
                صحتك وجمالك أمانة. لذلك نحرص على أن تكون منتجاتنا مصرحة من هيئة الغذاء والدواء السعودية (SFDA)، ومكوناتها مدروسة بعناية لتناسب طبيعة واحتياج المرأة في السعودية.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-[15px] text-[#251F20] font-medium bg-white p-3 rounded-xl border border-[#E8DAD6]">
                  <span className="text-white bg-[#7B9277] rounded-full p-1">
                    <CheckCircle size={16} />
                  </span>
                  <span>مصرحة من هيئة الغذاء والدواء (SFDA)</span>
                </li>
                <li className="flex items-center gap-3 text-[15px] text-[#251F20] font-medium bg-white p-3 rounded-xl border border-[#E8DAD6]">
                  <span className="text-white bg-[#7B9277] rounded-full p-1">
                    <CheckCircle size={16} />
                  </span>
                  <span>مكونات آمنة ومدروسة بعناية</span>
                </li>
                <li className="flex items-center gap-3 text-[15px] text-[#251F20] font-medium bg-white p-3 rounded-xl border border-[#E8DAD6]">
                  <span className="text-white bg-[#7B9277] rounded-full p-1">
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
          <div className="bg-gradient-to-b from-[#FFF8F1] to-white rounded-3xl p-8 md:p-12 shadow-sm border border-[#E8DAD6]">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#E8DAD6]">
              <span className="text-4xl">🛡️</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#251F20] mb-4">
              ضمان لاميس الذهبي - 30 يوم
            </h2>
            <p className="text-[#6F6262] text-lg leading-relaxed max-w-2xl mx-auto">
              واثقين من جودة منتجاتنا وتأثيرها على روتينك. إذا ما حسيتي بالفرق اللي تتمنينه خلال 30 يوم، نرجع لك فلوسك بدون أي أسئلة معقدة. جربي الروتين وأنتِ مرتاحة البال.
            </p>
          </div>
        </div>
      </section>

      {/* Cross-sell Bundle Section (Replaced Offer Stack) */}
      {crossSells.length > 0 && (
        <section className="py-16 md:py-20 bg-[#FFF8F1]" id="offer-stack">
          <div className="container-padded max-w-4xl">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#F7E8E6] text-[#8F3F55] text-xs font-bold px-3 py-1 rounded-full mb-3">
                نتائج مضاعفة
              </span>
              <h2 className="text-3xl font-bold text-[#251F20] mb-3">
                ضاعفي النتائج مع الباقة المتكاملة ✨
              </h2>
              <p className="text-[#6F6262] text-lg">
                أكملي روتينك بمنتجات تتكامل مع بعضها لنتائج أسرع وأفضل.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {crossSells.map((crossProduct) => (
                <div key={crossProduct.id} className="bg-white border-2 border-[#E8DAD6] rounded-3xl p-6 hover:border-[#8F3F55]/50 transition-colors shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#FFF8F1] rounded-xl flex items-center justify-center text-2xl">
                        ✨
                      </div>
                      <div>
                        <h3 className="font-bold text-[#251F20] text-lg">{crossProduct.shortNameAr}</h3>
                        <p className="text-sm text-[#6F6262]">+ {product.shortNameAr}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-xl text-[#8F3F55]">398 ريال</p>
                      <p className="text-xs text-[#7B9277] font-medium line-through">بدل 450 ريال</p>
                    </div>
                  </div>
                  
                  <p className="text-[15px] text-[#6F6262] mb-6 leading-relaxed line-clamp-2">
                    {crossProduct.subheadline}
                  </p>
                  
                  <Button
                    variant="primary"
                    fullWidth
                    onClick={() => handleAddBundle(crossProduct)}
                    className="shadow-md shadow-[#8F3F55]/10"
                  >
                    أضيفي الباقة للسلة
                  </Button>
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
            <h2 className="text-3xl font-bold text-[#251F20] mb-3">
              تقييمات العميلات
            </h2>
            <p className="text-lg text-[#6F6262]">
              تجارب حقيقية من عميلاتنا في السعودية
            </p>
            <p className="text-xs text-[#6F6262] mt-2 opacity-60">
              ⚠️ بيانات تجريبية — تُستبدل بتقييمات حقيقية عند الإطلاق.
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
      <section className="py-16 md:py-20 bg-[#FFF8F1]">
        <div className="container-padded max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#251F20] mb-3">
              أسئلة شائعة
            </h2>
            <p className="text-lg text-[#6F6262]">
              كل ما تحتاجين معرفته عن {product.shortNameAr}
            </p>
          </div>
          <div className="space-y-4">
            {product.faq.map((item) => (
              <details
                key={item.q}
                className="bg-white border border-[#E8DAD6] rounded-2xl p-6 group shadow-sm"
              >
                <summary className="font-bold text-lg text-[#251F20] cursor-pointer list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-[#8F3F55] text-2xl leading-none group-open:rotate-45 transition-transform inline-block bg-[#F7E8E6] w-8 h-8 rounded-full flex items-center justify-center">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[#6F6262] text-[15px] leading-relaxed border-t border-[#E8DAD6] pt-4">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky CTA (Mobile & Desktop) */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E8DAD6] p-4 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]"
        aria-label="زر الإضافة للسلة ثابت"
      >
        <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex-1 md:flex-none">
            <p className="text-xs md:text-sm font-medium text-[#6F6262] mb-0.5">
              {product.shortNameAr}
            </p>
            <p className="font-bold text-[#8F3F55] text-lg md:text-xl">
              199 ريال
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-[#8F3F55] text-white font-bold px-8 md:px-14 py-3.5 md:py-4 rounded-full text-[15px] md:text-lg hover:bg-[#7a3549] transition-colors shadow-lg shadow-[#8F3F55]/30"
          >
            أضيفي للسلة
          </button>
        </div>
      </div>

      {/* Bottom spacer for sticky CTA */}
      <div className="h-24 md:h-28" aria-hidden />

    </div>
  );
}
