"use client";

import { X, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { getCrossSells } from "@/config/products";
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
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-[#FFF8F1] z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E8DAD6] bg-white">
          <div className="flex items-center gap-2 text-[#251F20]">
            <ShoppingBag size={20} aria-hidden />
            <h2 className="font-bold text-lg">سلة التسوق</h2>
          </div>
          <button
            ref={closeRef}
            onClick={closeCart}
            aria-label="إغلاق السلة"
            className="p-2 rounded-full hover:bg-[#F7E8E6] transition-colors"
          >
            <X size={20} aria-hidden />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 text-[#6F6262]">
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
                    className="bg-white rounded-2xl p-4 border border-[#E8DAD6] flex items-start justify-between gap-3"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-[#251F20] text-sm leading-snug">
                        {item.titleAr}
                      </p>
                      <p className="text-xs text-[#6F6262] mt-0.5">
                        {item.unitCount} {item.unitCount === 1 ? "قطعة" : "قطع"}
                      </p>
                    </div>
                    <div className="text-left shrink-0">
                      <p className="font-bold text-[#8F3F55]">
                        {formatSarShort(item.priceSar)}
                      </p>
                      <button
                        onClick={() => removeItem(item.productId, item.offerId)}
                        aria-label={`حذف ${item.titleAr}`}
                        className="text-xs text-[#6F6262] hover:text-red-600 mt-1 transition-colors"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar upsell hint */}
              {items.length < 2 && (
                <div className="bg-[#F7E8E6] rounded-xl p-3 text-sm text-[#8F3F55] text-center font-medium">
                  أضيفي منتجاً واحداً واحصلي على عرض خاص في الخطوة التالية ✨
                </div>
              )}

              {/* Totals */}
              <div className="bg-white rounded-2xl p-4 border border-[#E8DAD6]">
                <div className="flex justify-between items-center font-bold text-[#251F20]">
                  <span>المجموع</span>
                  <span className="text-[#8F3F55] text-lg">
                    {formatSarShort(total)}
                  </span>
                </div>
                <p className="text-xs text-[#7B9277] mt-1 text-center">
                  الدفع عند الاستلام، وفريقنا يتواصل معك لتأكيد الطلب قبل الشحن.
                </p>
              </div>

              {/* Cross-sells */}
              {crossSells.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-[#251F20] mb-2">
                    كمّلي روتين لاميس
                  </p>
                  <p className="text-xs text-[#6F6262] mb-3">
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
          <div className="p-4 border-t border-[#E8DAD6] bg-white">
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
