"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Plus, Sparkles, Trash2, Wand2 } from "lucide-react";
import { ImageUploadField, GalleryUploadField } from "@/components/admin/ImageUploadField";
import { LandingPageClient } from "@/app/lp/[slug]/LandingPageClient";
import {
  buildLpFromDraft,
  defaultOfferTiers,
  emptyProductDraft,
  recalcOffersFromUnitPrice,
  skuBaseFromSlug,
  syncDraftFromName,
  validateProductDraft,
  type NewProductDraft,
  type OfferDraft,
} from "@/lib/lp-studio/product-wizard";
import type { LandingPagePublic } from "@/lib/landing-pages";

type Props = {
  onComplete: (form: ReturnType<typeof buildLpFromDraft>) => void;
  onCancel: () => void;
};

export function NewProductWizard({ onComplete, onCancel }: Props) {
  const [draft, setDraft] = useState<NewProductDraft>(emptyProductDraft);
  const [unitPrice, setUnitPrice] = useState(199);
  const [error, setError] = useState<string | null>(null);

  const issues = useMemo(() => validateProductDraft(draft), [draft]);

  const previewPage = useMemo<LandingPagePublic>(() => {
    const form = buildLpFromDraft(draft);
    return {
      slug: form.slug || "preview",
      title_ar: form.title_ar || "عنوان الصفحة",
      hero_image: form.hero_image || "/images/placeholders/hero-lamis-beauty.webp",
      rating: form.rating,
      review_count: form.review_count,
      gallery_images: form.gallery_images,
      products: form.products.map((p) => ({
        id: p.id || "p1",
        name_ar: p.name_ar || "منتج",
        price_mad: p.price_mad,
        compare_at_price_mad: p.compare_at_price_mad ?? null,
        image: p.image || form.hero_image || "/images/placeholders/hero-lamis-beauty.webp",
        sku: p.sku || "SKU",
      })),
    };
  }, [draft]);

  function patch(next: Partial<NewProductDraft>) {
    setDraft((prev) => ({ ...prev, ...next }));
  }

  function updateOffer(index: number, next: Partial<OfferDraft>) {
    setDraft((prev) => ({
      ...prev,
      offers: prev.offers.map((o, i) => (i === index ? { ...o, ...next } : o)),
    }));
  }

  function addOffer() {
    const i = draft.offers.length;
    const tiers = defaultOfferTiers(unitPrice);
    patch({
      offers: [
        ...draft.offers,
        tiers[i] || {
          label_ar: `عرض ${i + 1}`,
          price_mad: unitPrice,
          compare_at_price_mad: null,
        },
      ],
    });
  }

  function applySmartPricing() {
    patch({ offers: recalcOffersFromUnitPrice(draft.offers, unitPrice) });
  }

  function handleSubmit() {
    const validation = validateProductDraft(draft);
    if (validation.length) {
      setError(validation.map((v) => v.message).join(" · "));
      return;
    }
    setError(null);
    onComplete(buildLpFromDraft(draft));
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#EEF1F4]" dir="rtl">
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowRight size={16} className="rtl:rotate-180" />
          رجوع
        </button>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
            <Sparkles size={16} className="text-emerald-600" />
            منتج جديد — معالج الإعداد
          </p>
          <p className="text-xs text-slate-500">اسم، SKU، عروض، صور — كلشي فمكان واحد</p>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-xl bg-emerald-600 px-5 py-2 text-sm font-bold text-white hover:bg-emerald-700"
        >
          إنشاء الصفحة
        </button>
      </header>

      {error && (
        <div className="shrink-0 border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {issues.length > 0 && !error && (
        <div className="shrink-0 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          {issues.length} حقل ناقص — أكملي قبل الإنشاء
        </div>
      )}

      <div className="grid min-h-0 flex-1 lg:grid-cols-[1fr_360px]">
        <div className="overflow-y-auto p-6 space-y-6 max-w-3xl mx-auto w-full">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">① معلومات المنتج</h2>

            <label className="block space-y-1 text-sm">
              <span className="font-medium text-slate-600">اسم المنتج (قصير)</span>
              <input
                value={draft.name_ar}
                onChange={(e) => setDraft((prev) => syncDraftFromName(prev, e.target.value))}
                placeholder="علكات الكولاجين"
                className="w-full rounded-xl border border-slate-200 px-3 py-2"
              />
            </label>

            <label className="block space-y-1 text-sm">
              <span className="font-medium text-slate-600">عنوان صفحة الهبوط</span>
              <textarea
                rows={3}
                value={draft.title_ar}
                onChange={(e) => patch({ title_ar: e.target.value })}
                placeholder="جملة إعلانية قوية بالدارجة..."
                className="w-full rounded-xl border border-slate-200 px-3 py-2 leading-relaxed"
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-slate-600">Slug (الرابط)</span>
                <input
                  value={draft.slug}
                  onChange={(e) =>
                    patch({
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""),
                      sku_base: skuBaseFromSlug(e.target.value),
                    })
                  }
                  placeholder="collagen-glow"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
                />
                <span className="text-xs text-slate-400">/lp/{draft.slug || "..."}</span>
              </label>
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-slate-600">SKU الأساسي</span>
                <input
                  value={draft.sku_base}
                  onChange={(e) =>
                    patch({ sku_base: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") })
                  }
                  placeholder="COLLAGEN"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
                />
                <span className="text-xs text-slate-400">
                  العروض: {draft.sku_base || "SKU"}-ONE, -TWO...
                </span>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-slate-900">② العروض والأسعار</h2>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1.5 text-xs text-slate-600">
                  سعر علبة:
                  <input
                    type="number"
                    min={1}
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(Number(e.target.value))}
                    className="w-20 rounded-lg border border-slate-200 px-2 py-1"
                  />
                  د.م
                </label>
                <button
                  type="button"
                  onClick={applySmartPricing}
                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
                >
                  <Wand2 size={13} />
                  تسعير ذكي
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {draft.offers.map((offer, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      عرض {i + 1} · SKU: {draft.sku_base || "SKU"}-
                      {["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"][i] || i + 1}
                    </span>
                    {draft.offers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => patch({ offers: draft.offers.filter((_, j) => j !== i) })}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                  <input
                    value={offer.label_ar}
                    onChange={(e) => updateOffer(i, { label_ar: e.target.value })}
                    placeholder="علبة واحدة / 3 شهور..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <label className="text-xs space-y-1">
                      <span className="text-slate-500">السعر (د.م)</span>
                      <input
                        type="number"
                        min={1}
                        value={offer.price_mad}
                        onChange={(e) => updateOffer(i, { price_mad: Number(e.target.value) })}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="text-xs space-y-1">
                      <span className="text-slate-500">سعر قبل (اختياري)</span>
                      <input
                        type="number"
                        min={0}
                        value={offer.compare_at_price_mad ?? ""}
                        onChange={(e) =>
                          updateOffer(i, {
                            compare_at_price_mad: e.target.value ? Number(e.target.value) : null,
                          })
                        }
                        placeholder="—"
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addOffer}
              className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              <Plus size={14} />
              عرض إضافي
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
            <h2 className="text-sm font-bold text-slate-900">③ الصور والثقة</h2>
            <ImageUploadField
              label="صورة الهيرو (أعلى الصفحة)"
              value={draft.hero_image}
              onChange={(hero_image) => patch({ hero_image })}
            />
            <ImageUploadField
              label="صورة المنتج (للعروض)"
              value={draft.product_image}
              onChange={(product_image) => patch({ product_image })}
              placeholder="نفس الهيرو أو صورة العلبة"
            />
            {!draft.product_image && draft.hero_image && (
              <button
                type="button"
                onClick={() => patch({ product_image: draft.hero_image })}
                className="text-xs text-emerald-700 hover:underline"
              >
                استخدمي صورة الهيرو للعروض
              </button>
            )}
            <GalleryUploadField
              label="معرض الصور (اختياري)"
              urls={draft.gallery_images}
              onChange={(gallery_images) => patch({ gallery_images })}
            />
            <div className="grid grid-cols-2 gap-3">
              <label className="text-sm space-y-1">
                <span className="font-medium text-slate-600">التقييم</span>
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  value={draft.rating}
                  onChange={(e) => patch({ rating: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </label>
              <label className="text-sm space-y-1">
                <span className="font-medium text-slate-600">عدد التقييمات</span>
                <input
                  type="number"
                  min={0}
                  value={draft.review_count}
                  onChange={(e) => patch({ review_count: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </label>
            </div>
          </section>
        </div>

        <aside className="hidden lg:flex flex-col border-r border-slate-200 bg-white p-4 overflow-y-auto">
          <p className="mb-3 text-center text-xs font-medium text-slate-500">معاينة مباشرة</p>
          <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[1.75rem] border-[8px] border-slate-800 shadow-xl">
            <LandingPageClient page={previewPage} />
          </div>
        </aside>
      </div>
    </div>
  );
}
