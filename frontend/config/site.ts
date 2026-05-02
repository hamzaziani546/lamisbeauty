export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lamisbeauty.site",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.lamisbeauty.site",
  metaTitle: "لاميس للجمال | Lamis Beauty",
  metaDescription:
    "روتينات جمال وعناية مختارة للمرأة السعودية. منتجات الكولاجين، العناية بالشعر، والانتعاش اليومي بالدفع عند الاستلام وشحن داخل السعودية.",
  ogImage: "/images/placeholders/hero-lamis-beauty.webp",
} as const;
