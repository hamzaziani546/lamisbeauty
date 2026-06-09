"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/admin-api";
import type { LandingPageAdmin, LandingPageInput } from "@/lib/landing-pages";
import { newLpProductId } from "@/lib/landing-pages";
import { getPublicSiteUrl } from "@/lib/public-site-url";
import { Copy, LayoutTemplate, Pencil, Trash2 } from "lucide-react";

export function LandingPagesPanel() {
  const [items, setItems] = useState<LandingPageAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminFetch<{ items: LandingPageAdmin[] }>("/admin/landing-pages");
      setItems(data.items || []);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id: string) {
    if (!confirm("حذف صفحة الهبوط؟")) return;
    setSaving(true);
    setError(null);
    try {
      await adminFetch(`/admin/landing-pages/${id}`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDuplicate(lp: LandingPageAdmin) {
    const slug = `${lp.slug}-copy-${Date.now().toString(36).slice(-4)}`;
    const payload: LandingPageInput = {
      slug,
      title_ar: `${lp.title_ar} (نسخة)`,
      hero_image: lp.hero_image,
      rating: lp.rating,
      review_count: lp.review_count,
      products: lp.products.map((p) => ({
        id: newLpProductId(),
        name_ar: p.name_ar,
        price_mad: p.price_mad,
        compare_at_price_mad: p.compare_at_price_mad,
        image: p.image,
        sku: `${p.sku}-C${Date.now().toString(36).slice(-4)}`,
      })),
      gallery_images: [...lp.gallery_images],
      is_active: false,
    };

    setSaving(true);
    setError(null);
    try {
      const created = await adminFetch<{ id: string }>("/admin/landing-pages", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      window.location.href = `/admin/lp-studio?id=${created.id}`;
    } catch (err) {
      setError((err as Error).message);
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">LP Studio</h2>
          <p className="text-sm text-slate-500">
            محرر سريع — هيرو، عروض، معرض، معاينة موبايل حية. بدون تعقيد.
          </p>
        </div>
        <Link
          href="/admin/lp-studio"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <LayoutTemplate size={16} />
          + صفحة جديدة
        </Link>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 px-5 py-3 text-sm font-semibold text-slate-700">
          {loading ? "تحميل..." : `${items.length} صفحة`}
        </div>
        <ul className="divide-y divide-slate-100">
          {items.length === 0 && (
            <li className="px-5 py-12 text-center text-sm text-slate-400">
              لا توجد صفحات بعد — أنشئي أول LP من Studio
            </li>
          )}
          {items.map((lp) => (
            <li key={lp.id} className="px-5 py-4 hover:bg-slate-50">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{lp.title_ar}</p>
                  <a
                    href={`${getPublicSiteUrl()}${lp.url_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-700 hover:underline break-all"
                  >
                    {lp.url_path}
                  </a>
                  <p className="text-xs text-slate-400 mt-1">
                    {lp.is_active ? "نشطة" : "معطّلة"} · {lp.products.length} عرض
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Link
                    href={`/admin/lp-studio?id=${lp.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={12} />
                    تحرير
                  </Link>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleDuplicate(lp)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-800 disabled:opacity-50"
                  >
                    <Copy size={12} />
                    نسخ
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => handleDelete(lp.id)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 disabled:opacity-50"
                  >
                    <Trash2 size={12} />
                    حذف
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
