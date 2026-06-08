"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { X, ShieldCheck, CreditCard, Truck, BadgeCheck, Package, MessageCircle } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { normalizeMaPhone, isValidMaPhone } from "@/lib/phone";
import { createOrder, getAttribution } from "@/lib/api";
import { getUpsellProduct, OFFER_UPSELL_PRICE, PRODUCT_MAP } from "@/config/products";
import { formatMadShort } from "@/lib/money";
import { MARKET, shippingEstimateForCity } from "@/config/market";
import { Button } from "@/components/ui/Button";
import { UpsellModal } from "./UpsellModal";
import { trackPurchase } from "@/lib/tracking";

const schema = z.object({
  name: z.string().min(3, "كتبي السمية الكاملة."),
  phone: z
    .string()
    .min(1, "رقم جوال مغربي صحيح يبدأ بـ 06 أو 07.")
    .refine(isValidMaPhone, "رقم جوال مغربي صحيح يبدأ بـ 06 أو 07."),
  city: z.string().min(2, "اختاري المدينة."),
  address: z.string().min(5, "كتبي العنوان الكامل (الحي، الشارع، رقم الدار)."),
});

type FormData = z.infer<typeof schema>;
type Step = "form" | "upsell" | "submitting";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { items, totalMad, clearCart } = useCartStore();
  const total = totalMad();
  const closeRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<FormData | null>(null);

  const cartProductIds = items.map((i) => i.productId);
  const upsellProduct = getUpsellProduct(cartProductIds);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { city: MARKET.cities[0] },
  });

  const selectedCity = watch("city");
  const shippingHint = selectedCity
    ? shippingEstimateForCity(selectedCity)
    : MARKET.shipping.shortAr;

  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setError(null);
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      reset({ city: MARKET.cities[0] });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, reset]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && step === "form") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, step, onClose]);

  function onFormSubmit(data: FormData) {
    formRef.current = data;
    if (upsellProduct) {
      setStep("upsell");
    } else {
      void submitOrder(data);
    }
  }

  function handleUpsellAccept() {
    if (!upsellProduct) return;
    const addItem = useCartStore.getState().addItem;
    addItem({
      productId: upsellProduct.id,
      offerId: "upsell",
      quantity: 1,
      unitCount: 1,
      titleAr: upsellProduct.shortNameAr,
      priceMad: OFFER_UPSELL_PRICE,
      source: "checkout_upsell",
    });
    void submitOrder(formRef.current!);
  }

  function handleUpsellDecline() {
    void submitOrder(formRef.current!);
  }

  async function submitOrder(data: FormData) {
    setStep("submitting");
    setError(null);

    try {
      const { e164 } = normalizeMaPhone(data.phone);
      const currentItems = useCartStore.getState().items;
      const currentTotal = useCartStore.getState().totalMad();

      const attribution = getAttribution();

      const resp = await createOrder({
        customer: {
          name: data.name.trim(),
          phone: e164,
          city: data.city.trim(),
          address: data.address.trim(),
        },
        items: currentItems.map((item) => ({
          product_id: item.productId,
          product_name_ar: item.titleAr,
          offer_id: item.offerId,
          quantity: item.quantity,
          unit_count: item.unitCount,
          price_mad: item.priceMad,
          source: item.source,
        })),
        attribution,
      });

      trackPurchase(currentItems, currentTotal, resp.event_id, e164).catch(() => {});

      try {
        sessionStorage.setItem(
          "lamis_last_order",
          JSON.stringify({
            items: currentItems,
            total: currentTotal,
            orderNumber: resp.order_number,
          })
        );
      } catch {
        // sessionStorage unavailable
      }

      clearCart();
      onClose();
      router.push(`/thank-you/${resp.order_number}`);
    } catch (err) {
      setStep("form");
      setError(
        err instanceof Error ? err.message : "حدث خطأ، يرجى المحاولة مجدداً."
      );
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={step === "form" ? onClose : undefined}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={step === "upsell" ? "عرض خاص" : "إتمام الطلب"}
        dir="rtl"
        className="relative w-full sm:max-w-md bg-white rounded-3xl shadow-2xl my-auto max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] overflow-y-auto modal-pop"
      >
        {step !== "submitting" && step !== "upsell" && (
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-[#E8F0ED] transition-colors z-10"
          >
            <X size={18} aria-hidden />
          </button>
        )}

        {step === "form" && (
          <div className="p-6">
            <div className="mb-5">
              <span className="inline-flex items-center gap-1.5 bg-[#E8F0ED] text-[#0B6B5C] text-xs font-bold px-3 py-1 rounded-full mb-3">
                <CreditCard size={12} aria-hidden />
                الدفع عند الاستلام — لا دفع مسبق
              </span>
              <h2 className="text-xl font-bold text-[#1A2332] leading-tight">
                خطوة أخيرة — طلبك على وشك يكتمل ✨
              </h2>
              <p className="text-sm text-[#5A6A72] mt-1.5">
                أكملي بياناتك. فريقنا يتواصل معك على واتساب لتأكيد الطلب قبل التوصيل.
              </p>
            </div>

            <div className="bg-[#F7FAF9] rounded-2xl p-4 mb-4 border border-[#D5E0DC]">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-[#5A6A72] uppercase tracking-wide">ملخص طلبك</p>
                <span className="text-xs text-[#2D8B6F] font-bold flex items-center gap-1">
                  <Package size={12} aria-hidden />
                  {items.length} {items.length === 1 ? "منتج" : "منتجات"}
                </span>
              </div>

              <div className="space-y-3">
                {items.map((item) => {
                  const prod = PRODUCT_MAP[item.productId];
                  return (
                    <div
                      key={`${item.productId}-${item.offerId}`}
                      className="flex items-center gap-3"
                    >
                      <div className="relative w-14 h-14 rounded-xl bg-white border border-[#D5E0DC] overflow-hidden shrink-0">
                        {prod && (
                          <Image
                            src={prod.images.main}
                            alt={prod.shortNameAr}
                            fill
                            loading="lazy"
                            sizes="56px"
                            className="h-full w-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#1A2332] line-clamp-2 leading-snug">
                          {item.titleAr}
                        </p>
                      </div>
                      <span className="shrink-0 font-bold text-[#0B6B5C] text-sm">
                        {formatMadShort(item.priceMad)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-[#D5E0DC] flex items-center justify-between">
                <span className="font-extrabold text-lg text-[#0B6B5C]">{formatMadShort(total)}</span>
                <span className="text-sm font-bold text-[#1A2332]">المجموع الكلي</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { icon: CreditCard, text: MARKET.trust.codAr },
                { icon: ShieldCheck, text: MARKET.trust.guaranteeAr },
                { icon: BadgeCheck, text: MARKET.trust.qualityBadgeAr },
                { icon: Truck, text: MARKET.trust.nationwideAr },
                { icon: MessageCircle, text: MARKET.trust.whatsappAr },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-1.5 bg-[#F7FAF9] border border-[#D5E0DC] rounded-full px-3 py-1.5"
                >
                  <Icon size={13} className="text-[#0B6B5C] shrink-0" aria-hidden />
                  <span className="text-[11px] font-bold text-[#1A2332] whitespace-nowrap">{text}</span>
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
                <p className="text-sm text-red-600 text-right">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onFormSubmit)} noValidate className="space-y-4">
              <div>
                <label htmlFor="checkout-name" className="block text-sm font-bold text-[#1A2332] mb-1.5">
                  الاسم الكامل
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  autoComplete="name"
                  placeholder="اسمك الكريم"
                  dir="rtl"
                  {...register("name")}
                  className="w-full border-2 border-[#D5E0DC] rounded-xl px-4 py-3 text-right text-[#1A2332] placeholder:text-[#5A6A72]/50 focus:outline-none focus:border-[#0B6B5C] focus:ring-4 focus:ring-[#0B6B5C]/10 transition-all bg-white"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-sm font-bold text-[#1A2332] mb-1.5">
                  رقم الجوال
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  placeholder={MARKET.phonePlaceholder}
                  dir="ltr"
                  {...register("phone")}
                  className="w-full border-2 border-[#D5E0DC] rounded-xl px-4 py-3 text-right text-[#1A2332] placeholder:text-[#5A6A72]/50 focus:outline-none focus:border-[#0B6B5C] focus:ring-4 focus:ring-[#0B6B5C]/10 transition-all bg-white"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-city" className="block text-sm font-bold text-[#1A2332] mb-1.5">
                  المدينة
                </label>
                <select
                  id="checkout-city"
                  {...register("city")}
                  className="w-full border-2 border-[#D5E0DC] rounded-xl px-4 py-3 text-right text-[#1A2332] focus:outline-none focus:border-[#0B6B5C] focus:ring-4 focus:ring-[#0B6B5C]/10 bg-white"
                >
                  {MARKET.cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-sm font-bold text-[#1A2332] mb-1.5">
                  العنوان الكامل
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  placeholder="الحي، الشارع، رقم المنزل أو العمارة"
                  dir="rtl"
                  {...register("address")}
                  className="w-full border-2 border-[#D5E0DC] rounded-xl px-4 py-3 text-right text-[#1A2332] placeholder:text-[#5A6A72]/50 focus:outline-none focus:border-[#0B6B5C] focus:ring-4 focus:ring-[#0B6B5C]/10 resize-none bg-white"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.address.message}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={!isValid}
                className="text-base shadow-lg shadow-[#0B6B5C]/30 hover:shadow-[#0B6B5C]/50 hover:-translate-y-0.5 transition-all"
              >
                أكملي الطلب — {formatMadShort(total)}
              </Button>

              <div className="flex items-center justify-center gap-4 pt-1 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-[#5A6A72]">
                  <Truck size={13} className="text-[#2D8B6F]" aria-hidden />
                  {shippingHint}
                </span>
                <span className="text-[#D5E0DC]">|</span>
                <span className="text-xs text-[#5A6A72]">📦 توصيل لكل المغرب</span>
              </div>

              <p className="text-xs text-center text-[#5A6A72]">
                بالمتابعة توافقين على{" "}
                <a href="/terms" className="underline hover:text-[#0B6B5C]">الشروط</a>
                {" "}و
                <a href="/privacy" className="underline hover:text-[#0B6B5C]">الخصوصية</a>
              </p>
            </form>
          </div>
        )}

        {step === "upsell" && upsellProduct && (
          <div className="p-6">
            <UpsellModal
              product={upsellProduct}
              onAccept={handleUpsellAccept}
              onDecline={handleUpsellDecline}
            />
          </div>
        )}

        {step === "submitting" && (
          <div className="py-20 text-center px-6">
            <div className="w-14 h-14 border-4 border-[#0B6B5C] border-t-transparent rounded-full animate-spin mx-auto mb-5" />
            <p className="font-bold text-lg text-[#1A2332]">جاري تأكيد طلبك...</p>
            <p className="text-sm text-[#5A6A72] mt-2">لحظة واحدة — نحجز لك طلبك الآن</p>
          </div>
        )}
      </div>
    </div>
  );
}
