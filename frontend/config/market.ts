/** Morocco market — shipping, cities, trust copy */
export const MARKET = {
  countryCode: "MA",
  countryNameAr: "المغرب",
  currency: "MAD",
  currencyLabelAr: "درهم",
  phonePlaceholder: "06xxxxxxxx",
  phoneHintAr: "رقم مغربي يبدأ بـ 06 أو 07",

  /** Major cities for COD checkout */
  cities: [
    "الدار البيضاء",
    "الرباط",
    "مراكش",
    "طنجة",
    "فاس",
    "أكادير",
    "مكناس",
    "وجدة",
    "القنيطرة",
    "آسفي",
    "تطوان",
    "الجديدة",
    "الناظور",
    "بني ملال",
    "خريبكة",
    "تازة",
    "العيون",
    "سطات",
    "مدينة أخرى",
  ] as const,

  shipping: {
    casablancaAr: "توصيل في نفس اليوم داخل الدار البيضاء",
    otherCitiesAr: "1–2 أيام عمل لباقي المدن",
    shortAr: "توصيل سريع · الدار البيضاء نفس اليوم",
  },

  trust: {
    qualityBadgeAr: "مصرح ONSSA",
    codAr: "الدفع عند الاستلام",
    guaranteeAr: "ضمان 30 يوم",
    whatsappAr: "دعم واتساب بالعربية",
    nationwideAr: "توصيل لكل المغرب",
  },

  /** ONSSA — المكتب الوطني للسلامة الصحية للمنتجات الغذائية */
  onssa: {
    badgeShortAr: "مصرح ONSSA",
    badgeAr: "مصرح من ONSSA",
    badgeFullAr: "مصرح من ONSSA — المكتب الوطني للسلامة الصحية للمنتجات الغذائية",
    heroAr: "مصرح من ONSSA",
    statValue: "ONSSA",
    statLabelAr: "شهادة رسمية",
    scienceTitleAr: "مصرّح من ONSSA",
    scienceDescAr:
      "شهادة ONSSA رسمية — منتجاتنا مسجلة ومطابقة للمعايير المغربية قبل التسويق.",
    faqSafetyAr:
      "نعم 100%. الكولاجين بحري حلال (ماشي من البقر)، علكات الكلوروفيل نباتية (Vegan)، وجميع منتجاتنا مصرحة من ONSSA (المكتب الوطني للسلامة الصحية للمنتجات الغذائية) مع مراقبة جودة لكل دفعة.",
    metaLineAr: "مكملات جمال مصرحة من ONSSA",
    certificateAltAr: "شهادة ONSSA الرسمية — منتجات لاميس",
    /** First existing file wins (place your scan in public/images/) */
    certificatePaths: [
      "/images/onssa-certificate.webp",
      "/images/onssa-certificate.jpg",
      "/images/onssa-certificate.jpeg",
      "/images/onssa-certificate.png",
      "/images/onssa-certificate.svg",
    ] as const,
  },
} as const;

export function shippingEstimateForCity(city: string): string {
  const c = city.trim();
  if (
    c.includes("الدار البيضاء") ||
    c.includes("كازا") ||
    c.toLowerCase().includes("casa")
  ) {
    return MARKET.shipping.casablancaAr;
  }
  return MARKET.shipping.otherCitiesAr;
}
