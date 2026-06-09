import { PRODUCTS } from "@/config/products";
import { newLpProductId, type LandingPageInput } from "@/lib/landing-pages";

export type LpTemplateId = "chlorophyll" | "lutein" | "collagen" | "blank";

const SLUG_BY_TEMPLATE: Record<Exclude<LpTemplateId, "blank">, string> = {
  chlorophyll: "chlorophyll-gummies",
  lutein: "lutein-eye-glow-gummies",
  collagen: "collagen-glow-gummies",
};

export const LP_TEMPLATES: { id: LpTemplateId; label: string; hint: string }[] = [
  { id: "chlorophyll", label: "Chlorophyll", hint: "انتعاش داخلي" },
  { id: "lutein", label: "Lutein Eye", hint: "هالات وتعب العين" },
  { id: "collagen", label: "Collagen", hint: "إشراقة وبشرة" },
  { id: "blank", label: "منتج جديد", hint: "اسم، SKU، عروض، صور — معالج ذكي" },
];

function galleryFromProduct(images: (typeof PRODUCTS)[0]["images"]): string[] {
  return [
    images.pdpHero,
    images.pdpRoutine,
    images.pdpScience,
    images.pdpIngredients,
    images.lifestyle,
    images.ugc,
  ].filter((u): u is string => Boolean(u));
}

export function buildLpTemplate(templateId: LpTemplateId): LandingPageInput {
  if (templateId === "blank") {
    return {
      slug: "",
      title_ar: "",
      hero_image: "",
      rating: 4.9,
      review_count: 120,
      products: [
        {
          id: newLpProductId(),
          name_ar: "",
          price_mad: 199,
          compare_at_price_mad: null,
          image: "",
          sku: "",
        },
      ],
      gallery_images: [],
      is_active: false,
    };
  }

  const product = PRODUCTS.find((p) => p.slug === SLUG_BY_TEMPLATE[templateId]);
  if (!product) {
    return buildLpTemplate("blank");
  }

  const skuBase = product.id
    .replace(/-gummies$/, "")
    .replace(/-/g, "")
    .slice(0, 8)
    .toUpperCase();

  return {
    slug: product.slug,
    title_ar: product.heroHeadline,
    hero_image: product.images.pdpHero || product.images.main,
    rating: 4.9,
    review_count: 165,
    products: product.offers.map((offer) => ({
      id: newLpProductId(),
      name_ar: `${product.shortNameAr} — ${offer.labelAr}`,
      price_mad: offer.priceMad,
      compare_at_price_mad: offer.savingsMad ? offer.priceMad + offer.savingsMad : null,
      image: product.images.main,
      sku: `${skuBase}-${offer.id.toUpperCase()}`,
    })),
    gallery_images: galleryFromProduct(product.images),
    is_active: false,
  };
}
