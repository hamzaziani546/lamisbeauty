const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.lamisbeauty.site";



export type LpProduct = {

  id: string;

  name_ar: string;

  price_mad: number;

  compare_at_price_mad: number | null;

  image: string;

  sku: string;

};



export type LandingPagePublic = {

  slug: string;

  title_ar: string;

  hero_image: string;

  rating: number;

  review_count: number;

  gallery_images: string[];

  products: LpProduct[];

};



export type LandingPageAdmin = LandingPagePublic & {

  id: string;

  is_active: boolean;

  url_path: string;

  created_at: string;

  updated_at: string;

};



export type LpProductInput = {

  id?: string;

  name_ar: string;

  price_mad: number;

  compare_at_price_mad?: number | null;

  image: string;

  sku: string;

};



export type LandingPageInput = {

  slug: string;

  title_ar: string;

  hero_image: string;

  rating: number;

  review_count: number;

  products: LpProductInput[];

  gallery_images: string[];

  is_active: boolean;

};



export function newLpProductId() {

  return `p${Math.random().toString(36).slice(2, 10)}`;

}



export async function getLandingPage(slug: string): Promise<LandingPagePublic> {

  const res = await fetch(`${API_URL}/landing-pages/${encodeURIComponent(slug)}`, {

    next: { revalidate: 60 },

  });

  if (!res.ok) throw new Error("صفحة الهبوط غير موجودة");

  return res.json();

}

