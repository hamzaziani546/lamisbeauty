export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lamisbeauty.site",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.lamisbeauty.site",
  metaTitle: "لاميس | مكملات جمال مصرحة من ONSSA",
  metaDescription:
    "مكملات جمال مغربية مصرحة من ONSSA: علكات اللوتين للهالات، الكولاجين البحري للبشرة، والكلوروفيل للانتعاش. الدفع عند الاستلام · توصيل سريع لكل المغرب.",
  ogImage: "/images/placeholders/hero-lamis-beauty.webp",
} as const;
