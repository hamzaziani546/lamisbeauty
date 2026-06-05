export const brand = {
  nameAr: "لاميس",
  nameEn: "Lamis",
  taglineAr: "مكملات جمال مصرحة من ONSSA",
  domain: "https://lamisbeauty.site",
  apiDomain: "https://api.lamisbeauty.site",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "",
  social: {
    tiktok: "",
    snapchat: "",
    instagram: "",
  },
} as const;
