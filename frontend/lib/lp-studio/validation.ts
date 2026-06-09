import type { LandingPageInput } from "@/lib/landing-pages";

export type LpValidationIssue = { field: string; message: string };

export function validateLpForm(form: LandingPageInput): LpValidationIssue[] {
  const issues: LpValidationIssue[] = [];

  if (!form.slug.trim()) {
    issues.push({ field: "slug", message: "الرابط (slug) مطلوب" });
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug.trim())) {
    issues.push({ field: "slug", message: "الرابط: حروف إنجليزية صغيرة وأرقام وشرطات فقط" });
  }

  if (!form.title_ar.trim()) {
    issues.push({ field: "title_ar", message: "العنوان مطلوب" });
  }

  if (!form.hero_image.trim()) {
    issues.push({ field: "hero_image", message: "صورة الهيرو مطلوبة" });
  }

  if (!form.products.length) {
    issues.push({ field: "products", message: "أضيفي عرضاً واحداً على الأقل" });
  }

  form.products.forEach((p, i) => {
    if (!p.name_ar.trim()) {
      issues.push({ field: `products.${i}.name_ar`, message: `منتج ${i + 1}: الاسم مطلوب` });
    }
    if (!p.sku.trim()) {
      issues.push({ field: `products.${i}.sku`, message: `منتج ${i + 1}: SKU مطلوب` });
    }
    if (!p.image.trim()) {
      issues.push({ field: `products.${i}.image`, message: `منتج ${i + 1}: الصورة مطلوبة` });
    }
    if (!p.price_mad || p.price_mad <= 0) {
      issues.push({ field: `products.${i}.price_mad`, message: `منتج ${i + 1}: السعر غير صالح` });
    }
  });

  return issues;
}
