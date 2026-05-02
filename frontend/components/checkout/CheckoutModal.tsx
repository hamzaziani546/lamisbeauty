"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { X, Shield } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { normalizeKsaPhone, isValidKsaPhone } from "@/lib/phone";
import { createOrder, getAttribution } from "@/lib/api";
import { getUpsellProduct, OFFER_UPSELL_PRICE } from "@/config/products";
import { formatSarShort } from "@/lib/money";
import { Button } from "@/components/ui/Button";
import { UpsellModal } from "./UpsellModal";
import { trackPurchase } from "@/lib/tracking";

const schema = z.object({
  name: z.string().min(3, "اكتبي اسمك عشان نقدر نأكد الطلب."),
  phone: z
    .string()
    .min(1, "اكتبي رقم جوال سعودي صحيح يبدأ بـ 05.")
    .refine(isValidKsaPhone, "اكتبي رقم جوال سعودي صحيح يبدأ بـ 05."),
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
  const { items, totalSar, clearCart } = useCartStore();
  const total = totalSar();
  const closeRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<FormData | null>(null);

  const cartProductIds = items.map((i) => i.productId);
  const upsellProduct = getUpsellProduct(cartProductIds);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });

  useEffect(() => {
    if (isOpen) {
      setStep("form");
      setError(null);
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      reset();
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
      priceSar: OFFER_UPSELL_PRICE,
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
      const { e164 } = normalizeKsaPhone(data.phone);
      const currentItems = useCartStore.getState().items;
      const currentTotal = useCartStore.getState().totalSar();

      const attribution = getAttribution();

      const resp = await createOrder({
        customer: { name: data.name.trim(), phone: e164 },
        items: currentItems.map((item) => ({
          product_id: item.productId,
          product_name_ar: item.titleAr,
          offer_id: item.offerId,
          quantity: item.quantity,
          unit_count: item.unitCount,
          price_sar: item.priceSar,
          source: item.source,
        })),
        attribution,
      });

      // Fire browser purchase pixels using backend event_id
      trackPurchase(currentItems, currentTotal, resp.event_id);

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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={step === "form" ? onClose : undefined}
        aria-hidden
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={step === "upsell" ? "عرض خاص" : "إتمام الطلب"}
        dir="rtl"
        className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[95dvh] overflow-y-auto"
      >
        {step !== "submitting" && step !== "upsell" && (
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="إغلاق"
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-[#F7E8E6] transition-colors z-10"
          >
            <X size={18} aria-hidden />
          </button>
        )}

        <div className="p-6">
          {step === "form" && (
            <>
              <h2 className="text-xl font-bold text-[#251F20] mb-1 text-right">
                ثبتي طلبك والدفع عند الاستلام
              </h2>
              <p className="text-sm text-[#6F6262] mb-4 text-right">
                العروض متاحة لفترة محدودة حسب توفر الكمية.
              </p>

              {/* Order summary */}
              <div className="bg-[#FFF8F1] rounded-2xl p-4 mb-4 text-right">
                <p className="text-sm font-bold text-[#251F20] mb-2">
                  ملخص الطلب
                </p>
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.offerId}`}
                    className="flex justify-between text-sm text-[#6F6262] mb-1"
                  >
                    <span>{formatSarShort(item.priceSar)}</span>
                    <span className="text-right">{item.titleAr}</span>
                  </div>
                ))}
                <div className="border-t border-[#E8DAD6] mt-2 pt-2 flex justify-between font-bold text-[#251F20]">
                  <span className="text-[#8F3F55]">{formatSarShort(total)}</span>
                  <span>المجموع</span>
                </div>
              </div>

              {/* Trust */}
              <div className="flex items-center gap-2 text-sm text-[#7B9277] mb-5 justify-end">
                <Shield size={14} aria-hidden />
                <span>الدفع عند الاستلام · شحن سعودي</span>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-right">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form
                onSubmit={handleSubmit(onFormSubmit)}
                noValidate
                className="space-y-4 text-right"
              >
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-sm font-medium text-[#251F20] mb-1"
                  >
                    الاسم الكامل
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    autoComplete="name"
                    placeholder="اسمك الكريم"
                    dir="rtl"
                    {...register("name")}
                    className="w-full border border-[#E8DAD6] rounded-xl px-4 py-3 text-right text-[#251F20] placeholder:text-[#6F6262]/60 focus:outline-none focus:border-[#8F3F55] focus:ring-1 focus:ring-[#8F3F55] transition"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-sm font-medium text-[#251F20] mb-1"
                  >
                    رقم الجوال السعودي
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="05xxxxxxxx"
                    dir="ltr"
                    {...register("phone")}
                    className="w-full border border-[#E8DAD6] rounded-xl px-4 py-3 text-right text-[#251F20] placeholder:text-[#6F6262]/60 focus:outline-none focus:border-[#8F3F55] focus:ring-1 focus:ring-[#8F3F55] transition"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={!isValid}
                >
                  ثبتي طلبي الآن
                </Button>

                <p className="text-xs text-center text-[#6F6262]">
                  بالمتابعة توافقين على{" "}
                  <a href="/terms" className="underline hover:text-[#8F3F55]">
                    الشروط والأحكام
                  </a>{" "}
                  و
                  <a href="/privacy" className="underline hover:text-[#8F3F55]">
                    سياسة الخصوصية
                  </a>
                </p>
              </form>
            </>
          )}

          {step === "upsell" && upsellProduct && (
            <UpsellModal
              product={upsellProduct}
              onAccept={handleUpsellAccept}
              onDecline={handleUpsellDecline}
            />
          )}

          {step === "submitting" && (
            <div className="py-16 text-center">
              <div className="w-12 h-12 border-4 border-[#8F3F55] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-bold text-[#251F20]">جاري تأكيد طلبك...</p>
              <p className="text-sm text-[#6F6262] mt-1">
                لحظة واحدة من فضلك
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
