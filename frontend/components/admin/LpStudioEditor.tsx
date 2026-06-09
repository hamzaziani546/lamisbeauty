"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  ImageIcon,
  LayoutGrid,
  Package,
  Save,
  Settings,
  Star,
  AlertCircle,
} from "lucide-react";
import { adminFetch } from "@/lib/admin-api";
import { LandingPageClient } from "@/app/lp/[slug]/LandingPageClient";
import { ImageUploadField, GalleryUploadField } from "@/components/admin/ImageUploadField";
import { LpProductsDrawer } from "@/components/admin/LpProductsDrawer";
import { validateLpForm } from "@/lib/lp-studio/validation";
import type { LandingPageInput, LandingPagePublic } from "@/lib/landing-pages";
import { getPublicSiteUrl } from "@/lib/public-site-url";

type Section = "settings" | "hero" | "proof" | "offers" | "gallery";

const SECTIONS: { id: Section; label: string; icon: typeof Settings }[] = [
  { id: "settings", label: "إعدادات", icon: Settings },
  { id: "hero", label: "هيرو", icon: ImageIcon },
  { id: "proof", label: "تقييم", icon: Star },
  { id: "offers", label: "العروض", icon: Package },
  { id: "gallery", label: "معرض", icon: LayoutGrid },
];

type Props = {
  lpId: string | null;
  initial: LandingPageInput;
};

export function LpStudioEditor({ lpId, initial }: Props) {
  const [form, setForm] = useState<LandingPageInput>(initial);
  const [section, setSection] = useState<Section>("hero");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productsOpen, setProductsOpen] = useState(false);

  const previewPage = useMemo<LandingPagePublic>(
    () => ({
      slug: form.slug || "preview",
      title_ar: form.title_ar || "عنوان الصفحة",
      hero_image: form.hero_image || "/images/placeholders/hero-lamis-beauty.webp",
      rating: form.rating,
      review_count: form.review_count,
      gallery_images: form.gallery_images,
      products: form.products.map((p) => ({
        id: p.id || "p1",
        name_ar: p.name_ar || "منتج",
        price_mad: p.price_mad || 199,
        compare_at_price_mad: p.compare_at_price_mad ?? null,
        image: p.image || form.hero_image || "/images/placeholders/hero-lamis-beauty.webp",
        sku: p.sku || "SKU",
      })),
    }),
    [form]
  );

  const issues = useMemo(() => validateLpForm(form), [form]);
  const previewUrl = form.slug.trim()
    ? `${getPublicSiteUrl()}/lp/${form.slug.trim()}`
    : "";

  const patch = useCallback((next: Partial<LandingPageInput>) => {
    setForm((prev) => ({ ...prev, ...next }));
  }, []);

  const handleSave = useCallback(async () => {
    const validation = validateLpForm(form);
    if (validation.length) {
      setError(validation.map((v) => v.message).join(" · "));
      return;
    }

    setSaving(true);
    setError(null);
    const payload: LandingPageInput = {
      ...form,
      slug: form.slug.trim().toLowerCase(),
      title_ar: form.title_ar.trim(),
      hero_image: form.hero_image.trim(),
      products: form.products.map((p) => ({
        ...p,
        name_ar: p.name_ar.trim(),
        sku: p.sku.trim().toUpperCase(),
        image: p.image.trim(),
      })),
    };

    try {
      if (lpId) {
        await adminFetch(`/admin/landing-pages/${lpId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        });
      } else {
        const created = await adminFetch<{ id: string }>("/admin/landing-pages", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        window.location.replace(`/admin/lp-studio?id=${created.id}`);
        return;
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }, [form, lpId]);

  return (
    <div className="flex h-screen flex-col bg-[#EEF1F4]" dir="rtl">
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 py-2.5">
        <Link
          href="/admin?tab=landing-pages"
          className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowRight size={16} className="rtl:rotate-180" />
          رجوع
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {lpId ? "تعديل صفحة هبوط" : "صفحة هبوط جديدة"}
          </p>
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate text-xs text-emerald-700 hover:underline"
            >
              {previewUrl}
            </a>
          )}
        </div>
        <label
          className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold ${
            form.is_active
              ? "bg-emerald-50 text-emerald-800"
              : "bg-amber-50 text-amber-800"
          }`}
        >
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => patch({ is_active: e.target.checked })}
          />
          {form.is_active ? "نشطة — ظاهرة للزبائن" : "معطّلة — 404 للزبائن"}
        </label>
        {previewUrl && (
          <a
            href={previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <ExternalLink size={14} />
            معاينة حية
          </a>
        )}
        <button
          type="button"
          disabled={saving}
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          <Save size={14} />
          {saving ? "جاري الحفظ..." : "حفظ"}
        </button>
      </header>

      {error && (
        <div className="shrink-0 border-b border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {!form.is_active && (
        <div className="shrink-0 flex items-center gap-2 border-b border-amber-300 bg-amber-100 px-4 py-2 text-sm text-amber-900">
          <AlertCircle size={16} className="shrink-0" />
          الصفحة معطّلة — /lp/{form.slug || "..."} تعطي 404. فعّلي «نشطة» واحفظي.
        </div>
      )}

      {issues.length > 0 && !error && (
        <div className="shrink-0 flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800">
          <AlertCircle size={14} className="shrink-0" />
          {issues.length} تنبيه قبل الحفظ — أكملي الحقول الناقصة
        </div>
      )}

      <div className="grid min-h-0 flex-1 grid-cols-[200px_1fr_340px]">
        <nav className="overflow-y-auto border-l border-slate-200 bg-white p-2">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              className={`mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                section === id
                  ? "bg-emerald-50 text-emerald-800"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <main className="flex min-h-0 items-start justify-center overflow-y-auto p-6">
          <div className="sticky top-0 w-full max-w-[390px]">
            <div className="mb-3 text-center text-xs font-medium text-slate-500">معاينة موبايل</div>
            <div className="overflow-hidden rounded-[2rem] border-[10px] border-slate-800 bg-white shadow-2xl">
              <LandingPageClient page={previewPage} />
            </div>
          </div>
        </main>

        <aside className="overflow-y-auto border-r border-slate-200 bg-white p-4">
          {section === "settings" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">إعدادات الصفحة</h3>
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-slate-600">Slug (الرابط)</span>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    patch({ slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })
                  }
                  placeholder="chlorophyll-juin"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 font-mono text-sm"
                />
                <span className="text-xs text-slate-400">/lp/{form.slug || "..."}</span>
              </label>
            </div>
          )}

          {section === "hero" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">صورة الهيرو + العنوان</h3>
              <ImageUploadField
                label="صورة الهيرو"
                value={form.hero_image}
                onChange={(hero_image) => patch({ hero_image })}
              />
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-slate-600">العنوان (عربي)</span>
                <textarea
                  rows={4}
                  value={form.title_ar}
                  onChange={(e) => patch({ title_ar: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm leading-relaxed"
                />
              </label>
            </div>
          )}

          {section === "proof" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">تقييم اجتماعي</h3>
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-slate-600">التقييم (1–5)</span>
                <input
                  type="number"
                  min={1}
                  max={5}
                  step={0.1}
                  value={form.rating}
                  onChange={(e) => patch({ rating: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="font-medium text-slate-600">عدد التقييمات</span>
                <input
                  type="number"
                  min={0}
                  value={form.review_count}
                  onChange={(e) => patch({ review_count: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2"
                />
              </label>
            </div>
          )}

          {section === "offers" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">العروض / المنتجات</h3>
                <button
                  type="button"
                  onClick={() => setProductsOpen(true)}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  تحرير كامل ({form.products.length})
                </button>
              </div>
              <p className="text-xs text-slate-500">
                كل عرض = اسم + سعر + SKU + صورة. كتتباع كباقة منفصلة فالسلة.
              </p>
              <ul className="space-y-2">
                {form.products.map((p, i) => (
                  <li
                    key={p.id || i}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
                  >
                    <p className="font-semibold text-slate-800 truncate">{p.name_ar || `عرض ${i + 1}`}</p>
                    <p className="text-slate-500">
                      {p.price_mad} د.م
                      {p.compare_at_price_mad ? ` (قبل ${p.compare_at_price_mad})` : ""}
                      {" · "}
                      {p.sku || "بدون SKU"}
                    </p>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setProductsOpen(true)}
                className="w-full rounded-xl border border-dashed border-emerald-300 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                + إضافة / تعديل عروض
              </button>
            </div>
          )}

          {section === "gallery" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900">معرض الصور (scroll)</h3>
              <GalleryUploadField
                label="صور المعرض"
                urls={form.gallery_images}
                onChange={(gallery_images) => patch({ gallery_images })}
              />
            </div>
          )}
        </aside>
      </div>

      <LpProductsDrawer
        open={productsOpen}
        products={form.products}
        onChange={(products) => patch({ products })}
        onClose={() => setProductsOpen(false)}
      />
    </div>
  );
}
