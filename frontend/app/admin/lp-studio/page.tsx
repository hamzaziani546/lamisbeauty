"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminFetch, getAdminToken } from "@/lib/admin-api";
import { LpStudioEditor } from "@/components/admin/LpStudioEditor";
import { NewProductWizard } from "@/components/admin/lp-studio/NewProductWizard";
import {
  buildLpTemplate,
  LP_TEMPLATES,
  type LpTemplateId,
} from "@/lib/lp-studio/templates";
import type { LandingPageAdmin, LandingPageInput } from "@/lib/landing-pages";

function adminToInput(lp: LandingPageAdmin): LandingPageInput {
  return {
    slug: lp.slug,
    title_ar: lp.title_ar,
    hero_image: lp.hero_image,
    rating: lp.rating,
    review_count: lp.review_count,
    products: lp.products.map((p) => ({
      id: p.id,
      name_ar: p.name_ar,
      price_mad: p.price_mad,
      compare_at_price_mad: p.compare_at_price_mad,
      image: p.image,
      sku: p.sku,
    })),
    gallery_images: lp.gallery_images,
    is_active: lp.is_active,
  };
}

function TemplatePicker({ onPick }: { onPick: (id: LpTemplateId) => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EEF1F4] p-6" dir="rtl">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">LP Studio — صفحة جديدة</h1>
        <p className="mt-2 text-sm text-slate-500">
          قوالب جاهزة للمنتجات الحالية، أو معالج ذكي لمنتج جديد بالكامل.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {LP_TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onPick(t.id)}
              className={`rounded-2xl border p-4 text-right transition ${
                t.id === "blank"
                  ? "border-emerald-300 bg-emerald-50/40 hover:border-emerald-500 hover:bg-emerald-50"
                  : "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50"
              }`}
            >
              <p className="font-semibold text-slate-900">{t.label}</p>
              <p className="text-xs text-slate-500 mt-1">{t.hint}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LpStudioLoader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lpId = searchParams.get("id");
  const [initial, setInitial] = useState<LandingPageInput | null>(null);
  const [templateId, setTemplateId] = useState<LpTemplateId | null>(null);
  const [loading, setLoading] = useState(Boolean(lpId));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
    }
  }, [router]);

  useEffect(() => {
    if (!lpId) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        let lp: LandingPageAdmin;
        try {
          lp = await adminFetch<LandingPageAdmin>(`/admin/landing-pages/${lpId}`);
        } catch (err) {
          if ((err as { status?: number }).status === 404) {
            const list = await adminFetch<{ items: LandingPageAdmin[] }>("/admin/landing-pages");
            const found = list.items.find((item) => item.id === lpId);
            if (!found) {
              if (!cancelled) router.replace("/admin/lp-studio");
              return;
            }
            lp = found;
          } else {
            throw err;
          }
        }
        if (!cancelled) setInitial(adminToInput(lp));
      } catch (err) {
        if (!cancelled) setError((err as Error).message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lpId, router]);

  if (!lpId && !templateId) {
    return (
      <TemplatePicker
        onPick={(id) => {
          setTemplateId(id);
          if (id !== "blank") {
            setInitial(buildLpTemplate(id));
          }
        }}
      />
    );
  }

  if (!lpId && templateId === "blank" && !initial) {
    return (
      <NewProductWizard
        onComplete={(form) => setInitial(form)}
        onCancel={() => setTemplateId(null)}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
        تحميل...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={() => router.push("/admin?tab=landing-pages")}
          className="text-sm text-emerald-700 hover:underline"
        >
          رجوع للقائمة
        </button>
      </div>
    );
  }

  if (!initial) return null;

  return <LpStudioEditor lpId={lpId} initial={initial} />;
}

export default function LpStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
          تحميل...
        </div>
      }
    >
      <LpStudioLoader />
    </Suspense>
  );
}
