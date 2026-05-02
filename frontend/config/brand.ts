export const brand = {
  nameAr: "لاميس للجمال",
  nameEn: "Lamis Beauty",
  taglineAr: "روتين جمال سعودي مختار بعناية",
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
