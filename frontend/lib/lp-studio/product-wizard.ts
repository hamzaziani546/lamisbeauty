import { newLpProductId, type LandingPageInput, type LpProductInput } from "@/lib/landing-pages";

export type OfferDraft = {
  label_ar: string;
  price_mad: number;
  compare_at_price_mad: number | null;
};

export type NewProductDraft = {
  name_ar: string;
  title_ar: string;
  slug: string;
  sku_base: string;
  hero_image: string;
  product_image: string;
  offers: OfferDraft[];
  gallery_images: string[];
  rating: number;
  review_count: number;
};

const OFFER_SUFFIXES = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"] as const;

export function slugifyProductName(name: string): string {
  const map: Record<string, string> = {
    ا: "a", ب: "b", ت: "t", ث: "th", ج: "j", ح: "h", خ: "kh", د: "d", ذ: "dh",
    ر: "r", ز: "z", س: "s", ش: "sh", ص: "s", ض: "d", ط: "t", ظ: "z", ع: "a",
    غ: "gh", ف: "f", ق: "q", ك: "k", ل: "l", م: "m", ن: "n", ه: "h", و: "w",
    ي: "y", ة: "a", ى: "a", ئ: "y", ء: "",
  };
  let out = "";
  for (const ch of name.trim().toLowerCase()) {
    if (/[a-z0-9]/.test(ch)) out += ch;
    else if (ch === " " || ch === "-" || ch === "_") out += "-";
    else if (map[ch]) out += map[ch];
  }
  return out.replace(/-{2,}/g, "-").replace(/^-|-$/g, "").slice(0, 48);
}

export function skuBaseFromSlug(slug: string): string {
  return slug.replace(/-/g, "").slice(0, 8).toUpperCase() || "PROD";
}

export function defaultOfferTiers(unitPrice = 199): OfferDraft[] {
  return [
    { label_ar: "علبة واحدة", price_mad: unitPrice, compare_at_price_mad: null },
    {
      label_ar: "علبتين",
      price_mad: Math.round(unitPrice * 1.75),
      compare_at_price_mad: unitPrice * 2,
    },
    {
      label_ar: "3 علب",
      price_mad: Math.round(unitPrice * 2.25),
      compare_at_price_mad: unitPrice * 3,
    },
  ];
}

export function emptyProductDraft(): NewProductDraft {
  return {
    name_ar: "",
    title_ar: "",
    slug: "",
    sku_base: "",
    hero_image: "",
    product_image: "",
    offers: defaultOfferTiers(),
    gallery_images: [],
    rating: 4.9,
    review_count: 120,
  };
}

export function syncDraftFromName(draft: NewProductDraft, name_ar: string): NewProductDraft {
  const next = { ...draft, name_ar };
  if (!draft.title_ar.trim()) next.title_ar = name_ar;
  if (!draft.slug.trim()) next.slug = slugifyProductName(name_ar);
  if (!draft.sku_base.trim()) next.sku_base = skuBaseFromSlug(next.slug || slugifyProductName(name_ar));
  return next;
}

export function recalcOffersFromUnitPrice(offers: OfferDraft[], unitPrice: number): OfferDraft[] {
  const tiers = defaultOfferTiers(unitPrice);
  return offers.map((offer, i) => ({
    ...offer,
    price_mad: tiers[i]?.price_mad ?? offer.price_mad,
    compare_at_price_mad:
      i === 0 ? null : (tiers[i]?.compare_at_price_mad ?? offer.compare_at_price_mad),
  }));
}

export function offerDraftToProduct(
  offer: OfferDraft,
  index: number,
  draft: NewProductDraft
): LpProductInput {
  const suffix = OFFER_SUFFIXES[index] || String(index + 1);
  const base = draft.sku_base.trim().toUpperCase() || "PROD";
  const shortName = draft.name_ar.trim() || "منتج";
  return {
    id: newLpProductId(),
    name_ar: `${shortName} — ${offer.label_ar}`,
    price_mad: offer.price_mad,
    compare_at_price_mad: offer.compare_at_price_mad,
    image: draft.product_image.trim() || draft.hero_image.trim(),
    sku: `${base}-${suffix}`,
  };
}

export function buildLpFromDraft(draft: NewProductDraft): LandingPageInput {
  const products = draft.offers.map((offer, i) => offerDraftToProduct(offer, i, draft));
  const hero = draft.hero_image.trim();
  const gallery = draft.gallery_images.filter(Boolean);

  return {
    slug: draft.slug.trim().toLowerCase(),
    title_ar: draft.title_ar.trim() || draft.name_ar.trim(),
    hero_image: hero,
    rating: draft.rating,
    review_count: draft.review_count,
    products,
    gallery_images: gallery.length ? gallery : hero ? [hero] : [],
    is_active: true,
  };
}

export type WizardIssue = { field: string; message: string };

export function validateProductDraft(draft: NewProductDraft): WizardIssue[] {
  const issues: WizardIssue[] = [];

  if (!draft.name_ar.trim()) issues.push({ field: "name_ar", message: "اسم المنتج مطلوب" });
  if (!draft.title_ar.trim()) issues.push({ field: "title_ar", message: "عنوان الصفحة مطلوب" });
  if (!draft.slug.trim()) issues.push({ field: "slug", message: "الرابط (slug) مطلوب" });
  if (!draft.sku_base.trim()) issues.push({ field: "sku_base", message: "SKU الأساسي مطلوب" });
  if (!draft.hero_image.trim()) issues.push({ field: "hero_image", message: "صورة الهيرو مطلوبة" });
  if (!draft.product_image.trim() && !draft.hero_image.trim()) {
    issues.push({ field: "product_image", message: "صورة المنتج مطلوبة" });
  }

  if (!draft.offers.length) {
    issues.push({ field: "offers", message: "أضيفي عرضاً واحداً على الأقل" });
  }

  draft.offers.forEach((o, i) => {
    if (!o.label_ar.trim()) issues.push({ field: `offers.${i}`, message: `عرض ${i + 1}: التسمية مطلوبة` });
    if (!o.price_mad || o.price_mad <= 0) {
      issues.push({ field: `offers.${i}.price`, message: `عرض ${i + 1}: السعر غير صالح` });
    }
  });

  return issues;
}
