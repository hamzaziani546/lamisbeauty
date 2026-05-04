export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://lamisbeauty.site",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.lamisbeauty.site",
  metaTitle: "لاميس | مكملات جمال بمعايير صيدلانية",
  metaDescription:
    "مكملات جمال سعودية مصرحة من SFDA بمعايير صيدلانية: علكات اللوتين للهالات، علكات الكولاجين البحري للبشرة والشعر، وعلكات الكلوروفيل للانتعاش والمناعة. الدفع عند الاستلام داخل السعودية.",
  ogImage: "/images/placeholders/hero-lamis-beauty.webp",
} as const;
