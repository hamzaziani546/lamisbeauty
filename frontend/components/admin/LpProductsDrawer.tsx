"use client";

import type { LpProductInput } from "@/lib/landing-pages";
import { newLpProductId } from "@/lib/landing-pages";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { X } from "lucide-react";

const emptyProduct = (): LpProductInput => ({
  id: newLpProductId(),
  name_ar: "",
  price_mad: 199,
  compare_at_price_mad: null,
  image: "",
  sku: "",
});

export function LpProductsDrawer({
  open,
  products,
  onChange,
  onClose,
}: {
  open: boolean;
  products: LpProductInput[];
  onChange: (products: LpProductInput[]) => void;
  onClose: () => void;
}) {
  if (!open) return null;

  function update(index: number, patch: Partial<LpProductInput>) {
    onChange(products.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }

  return (
    <div className="fixed inset-0 z-[200] flex">
      <button type="button" className="flex-1 bg-black/30" onClick={onClose} aria-label="إغلاق" />
      <aside className="w-full max-w-md bg-white shadow-2xl overflow-y-auto" dir="rtl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
          <h3 className="font-semibold text-slate-900">المنتجات / العروض</h3>
          <button type="button" onClick={onClose} className="p-1 text-slate-500 hover:text-slate-800">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {products.map((product, index) => (
            <div key={product.id || index} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">منتج {index + 1}</span>
                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onChange(products.filter((_, i) => i !== index))}
                    className="text-xs text-red-600"
                  >
                    حذف
                  </button>
                )}
              </div>
              <input
                placeholder="اسم المنتج"
                value={product.name_ar}
                onChange={(e) => update(index, { name_ar: e.target.value })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min={1}
                  placeholder="السعر"
                  value={product.price_mad}
                  onChange={(e) => update(index, { price_mad: Number(e.target.value) })}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
                <input
                  type="number"
                  min={0}
                  placeholder="سعر قبل"
                  value={product.compare_at_price_mad ?? ""}
                  onChange={(e) =>
                    update(index, {
                      compare_at_price_mad: e.target.value ? Number(e.target.value) : null,
                    })
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <input
                placeholder="SKU"
                value={product.sku}
                onChange={(e) => update(index, { sku: e.target.value.toUpperCase() })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono"
              />
              <ImageUploadField
                label="صورة المنتج"
                value={product.image}
                onChange={(image) => update(index, { image })}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={() => onChange([...products, emptyProduct()])}
            className="w-full rounded-xl border border-dashed border-emerald-300 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            + منتج
          </button>
        </div>
      </aside>
    </div>
  );
}
