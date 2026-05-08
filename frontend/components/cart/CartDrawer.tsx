"use client";

import { X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { getCrossSells, PRODUCT_MAP } from "@/config/products";
import { formatSarShort } from "@/lib/money";
import { TrustChips } from "@/components/product/TrustChips";
import { CrossSellCard } from "./CrossSellCard";
import { Button } from "@/components/ui/Button";
import { useEffect, useRef } from "react";
import { trackInitiateCheckout } from "@/lib/tracking";

interface CartDrawerProps {
  onCheckout: () => void;
}

export function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, totalSar } = useCartStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = totalSar();

  const cartProductIds = items.map((i) => i.productId);
  const crossSells = getCrossSells(cartProductIds);

  useEffect(() => {
    if (isOpen) {
      closeRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) closeCart();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  function handleCheckout() {
    trackInitiateCheckout(items, total);
    closeCart();
    onCheckout();
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeCart}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="سلة التسوق"
        dir="rtl"
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#F7FAF9] z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D5E0DC] bg-white">
          <div className="flex items-center gap-2 text-[#1A2332]">
            <ShoppingBag size={20} aria-hidden />
            <h2 className="font-bold text-lg">سلة التسوق</h2>
          </div>
          <button
            ref={closeRef}
            onClick={closeCart}
            aria-label="إغلاق السلة"
            className="p-2 rounded-full hover:bg-[#E8F0ED] transition-colors"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-[#5A6A72]">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-30" aria-hidden />
              <p className="font-medium">السلة فارغة</p>
              <p className="text-sm mt-1">اختاري منتجاً من روتين لاميس</p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.offerId}`}
                    className="bg-white rounded-2xl p-4 border border-[#D5E0DC] flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className="w-16 h-16 rounded-xl bg-[#F7FAF9] border border-[#D5E0DC] overflow-hidden shrink-0">
                        {PRODUCT_MAP[item.productId] ? (
                          <img
                            src={PRODUCT_MAP[item.productId].images.main}
                            alt={PRODUCT_MAP[item.productId].shortNameAr}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1A2332] text-sm leading-snug">
                          {item.titleAr}
                        </p>
                        <p className="text-xs text-[#5A6A72] mt-0.5">
                          {item.unitCount} {item.unitCount === 1 ? "قطعة" : "قطع"}
                        </p>
                      </div>
                    </div>
                    <div className="text-left shrink-0">
                      <p className="font-bold text-[#0B6B5C]">
                        {formatSarShort(item.priceSar)}
                      </p>
                      <button
                        onClick={() => removeItem(item.productId, item.offerId)}
                        aria-label={`حذف ${item.titleAr}`}
                        className="text-xs text-[#5A6A72] hover:text-red-600 mt-1 transition-colors"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar upsell hint */}
              {items.length < 2 && (
                <div className="bg-[#E8F0ED] rounded-xl p-3 text-sm text-[#0B6B5C] text-center font-medium">
                  أضيفي منتجاً واحداً واحصلي على عرض خاص في الخطوة التالية ✨
                </div>
              )}

              {/* Totals */}
              <div className="bg-white rounded-2xl p-4 border border-[#D5E0DC]">
                <div className="flex justify-between items-center font-bold text-[#1A2332]">
                  <span>المجموع</span>
                  <span className="text-[#0B6B5C] text-lg">
                    {formatSarShort(total)}
                  </span>
                </div>
                <p className="text-xs text-[#2D8B6F] mt-1 text-center">
                  الدفع عند الاستلام، وفريقنا يتواصل معك لتأكيد الطلب قبل الشحن.
                </p>
              </div>

              {/* Cross-sells */}
              {crossSells.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-[#1A2332] mb-2">
                    كمّلي روتين لاميس
                  </p>
                  <p className="text-xs text-[#5A6A72] mb-3">
                    عميلات كثير يضيفون منتج ثاني عشان يكون الروتين متكامل.
                  </p>
                  <div className="space-y-3">
                    {crossSells.map((product) => (
                      <CrossSellCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}

              {/* Trust */}
              <TrustChips compact />
            </>
          )}
        </div>

        {/* Footer CTA */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#D5E0DC] bg-white">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCheckout}
            >
              إتمام الطلب والدفع عند الاستلام
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}
