export type OfferId = "one" | "two" | "three" | "upsell";

export type ProductOffer = {
  id: OfferId;
  quantity: number;
  labelAr: string;
  priceSar: number;
  badgeAr?: string;
  reasonAr?: string;
  durationAr?: string;
  perBoxSar?: number;
  savingsSar?: number;
  perDaySar?: number;
};

export const GUMMIES_PER_BOX = 60;
export const DAYS_PER_BOX = 30;

export type Product = {
  id: string;
  slug: string;
  nameAr: string;
  shortNameAr: string;
  heroHeadline: string;
  subheadline: string;
  benefits: string[];
  emotionalCopy: string;
  ingredientNotes: string[];
  disclaimer: string;
  usage: string;
  warnings: string[];
  images: {
    main: string;
    routine: string;
    lifestyle?: string;
    ugc?: string;
    pdpHero?: string;
    pdpIngredients?: string;
    pdpRoutine?: string;
    pdpScience?: string;
  };
  offers: ProductOffer[];
  crossSellPriority: string[];
  faq: { q: string; a: string }[];
  upsellHeadline: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "lutein-eye-glow-gummies",
    slug: "lutein-eye-glow-gummies",
    nameAr: "علكات شوت العين باللوتين والزياكسانثين لإشراقة بدون هالات",
    shortNameAr: "علكات شوت العين",
    heroHeadline: "ودّعي الهالات السوداء وتعب العينين.. نظرة منتعشة ومشرقة كل صباح",
    subheadline:
      "علكات لذيذة بتركيبة قوية من اللوتين والزياكسانثين وأوميغا، تعمل من الداخل لتفتيح محيط العين، تقليل الإرهاق، وإعطاء نظرة حيوية حتى بعد ليلة قصيرة من النوم.",
    benefits: [
      "تخفف مظهر الهالات السوداء والانتفاخ تحت العين",
      "تحمي العين من إجهاد الشاشات والضوء الأزرق",
      "تمنحك نظرة منعشة ومشرقة بدون كونسيلر",
    ],
    emotionalCopy:
      "كل صباح تطلين على المرآة وأول شي تشوفينه الهالات وتعب العين، مهما حطيتي مكياج. هالعلكات صممناها عشان ترجع لعينك الإشراقة الطبيعية، وتحسين فعلاً إنك مرتاحة وحلوة بدون فلاتر.",
    ingredientNotes: [
      "لوتين 20 ملغ + زياكسانثين 4 ملغ: مضادات أكسدة قوية تتراكم في شبكية العين والجلد المحيط بها لحماية وتفتيح المنطقة.",
      "أوميغا EPA/DHA: تدعم الدورة الدموية الدقيقة وتقلل ركود الدم المسبب للهالات الزرقاء.",
      "خالية من السكر، طعم لذيذ، مناسبة للاستخدام اليومي.",
    ],
    disclaimer: "",
    usage: "تناولي علكتين يومياً مع أو بعد الإفطار لأفضل امتصاص.",
    warnings: [],
    images: {
      main: "/images/products/lutein-eye-glow-gummies.webp",
      routine: "/images/placeholders/lutein-routine.webp",
      pdpHero: "/images/product-pages/lutein-pdp-hero.webp",
      pdpIngredients: "/images/product-pages/lutein-pdp-ingredients.webp",
      pdpRoutine: "/images/product-pages/lutein-pdp-routine.webp",
      pdpScience: "/images/product-pages/lutein-pdp-science.webp",
    },
    offers: [
      {
        id: "one",
        quantity: 1,
        labelAr: "علبة واحدة",
        durationAr: "شهر كامل · 60 علكة",
        priceSar: 199,
        perBoxSar: 199,
        perDaySar: 7,
        badgeAr: "ابدئي التجربة",
        reasonAr: "تجربة أولى لمدة شهر",
      },
      {
        id: "two",
        quantity: 2,
        labelAr: "علبتين",
        durationAr: "شهرين · 120 علكة",
        priceSar: 349,
        perBoxSar: 175,
        savingsSar: 49,
        perDaySar: 6,
        badgeAr: "وفّري 49 ريال",
        reasonAr: "نتائج مستقرة لشهرين كاملين",
      },
      {
        id: "three",
        quantity: 3,
        labelAr: "3 علب",
        durationAr: "3 شهور · 180 علكة",
        priceSar: 449,
        perBoxSar: 150,
        savingsSar: 148,
        perDaySar: 5,
        badgeAr: "الأكثر مبيعاً · وفّري 148 ريال",
        reasonAr: "روتين 3 شهور للنتائج الكاملة",
      },
    ],
    crossSellPriority: ["collagen-glow-gummies", "chlorophyll-gummies"],
    faq: [
      {
        q: "متى تظهر النتائج على الهالات؟",
        a: "أغلب العميلات يلاحظن خفّة في مظهر الهالات والانتفاخ خلال 3 إلى 6 أسابيع من الاستخدام اليومي المنتظم.",
      },
      {
        q: "هل تنفع لمن يجلس طويلاً أمام الشاشة؟",
        a: "نعم، اللوتين والزياكسانثين معروفين بحماية العين من إجهاد الضوء الأزرق وجفاف الشاشات.",
      },
      {
        q: "هل خالية من السكر؟",
        a: "نعم 100%، تركيبتها بدون سكر مضاف ومناسبة للروتين الصحي اليومي.",
      },
      {
        q: "هل الدفع عند الاستلام؟",
        a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل السعودية.",
      },
    ],
    upsellHeadline: "أضيفي علكات الكولاجين لإشراقة كاملة بسعر خاص",
  },
  {
    id: "collagen-glow-gummies",
    slug: "collagen-glow-gummies",
    nameAr: "علكات الكولاجين بفيتامين C والزنك لإشراقة البشرة وقوة الشعر والأظافر",
    shortNameAr: "علكات كولاجين الإشراقة",
    heroHeadline: "بشرة متوهجة، شعر أقوى، وأظافر ما تتكسر.. كل ذلك بعلكتين يومياً",
    subheadline:
      "تركيبة فاخرة من الكولاجين البحري الحلال + فيتامين C + الزنك، تدعم إنتاج الكولاجين الطبيعي في جسمك، تشد البشرة، وتعطيك إشراقة من الداخل بدون لاتيه ولا حبوب.",
    benefits: [
      "تشد البشرة وتعطي إشراقة طبيعية من الداخل",
      "تقوي الشعر والأظافر وتقلل من تكسرها",
      "حماية مضادة للأكسدة من فيتامين C والزنك",
    ],
    emotionalCopy:
      "تحسين بشرتك فقدت لمعتها وشعرك ما عاد له نفس الكثافة؟ الكولاجين هو لبنة البناء اللي يفقدها الجسم مع الوقت. علكات لاميس ترجع لك التوهج اللي كنتي تحبينه، بطعم لذيذ مكان الحبوب الكبيرة المملة.",
    ingredientNotes: [
      "كولاجين بحري متحلل (Halal): سريع الامتصاص، يعيد بناء مرونة البشرة ويدعم الشعر والأظافر.",
      "فيتامين C: شريك أساسي لتصنيع الكولاجين داخل الجسم وتفتيح لون البشرة.",
      "الزنك: يدعم التئام الجلد، يقلل البقع، ويقوي الأظافر.",
    ],
    disclaimer: "",
    usage: "تناولي علكتين يومياً، يفضل بعد الإفطار للحصول على أفضل امتصاص.",
    warnings: [],
    images: {
      main: "/images/products/collagen-glow-gummies.webp",
      routine: "/images/placeholders/collagen-glow-routine.webp",
      pdpHero: "/images/product-pages/collagen-pdp-hero.webp",
      pdpIngredients: "/images/product-pages/collagen-pdp-ingredients.webp",
      pdpRoutine: "/images/product-pages/collagen-pdp-routine.webp",
      pdpScience: "/images/product-pages/collagen-pdp-science.webp",
    },
    offers: [
      {
        id: "one",
        quantity: 1,
        labelAr: "علبة واحدة",
        durationAr: "شهر كامل · 60 علكة",
        priceSar: 199,
        perBoxSar: 199,
        perDaySar: 7,
        badgeAr: "ابدئي التجربة",
        reasonAr: "تجربة أولى لمدة شهر",
      },
      {
        id: "two",
        quantity: 2,
        labelAr: "علبتين",
        durationAr: "شهرين · 120 علكة",
        priceSar: 349,
        perBoxSar: 175,
        savingsSar: 49,
        perDaySar: 6,
        badgeAr: "وفّري 49 ريال",
        reasonAr: "نتائج مستقرة لشهرين كاملين",
      },
      {
        id: "three",
        quantity: 3,
        labelAr: "3 علب",
        durationAr: "3 شهور · 180 علكة",
        priceSar: 449,
        perBoxSar: 150,
        savingsSar: 148,
        perDaySar: 5,
        badgeAr: "الأكثر مبيعاً · وفّري 148 ريال",
        reasonAr: "روتين 3 شهور للنتائج الكاملة",
      },
    ],
    crossSellPriority: ["lutein-eye-glow-gummies", "chlorophyll-gummies"],
    faq: [
      {
        q: "هل الكولاجين حلال؟",
        a: "نعم، نستخدم كولاجين بحري حلال (من الأسماك) وليس بقري، يناسب احتياجك ومعتقدك.",
      },
      {
        q: "متى تظهر النتائج على البشرة والشعر؟",
        a: "تبدأ النضارة بالظهور خلال 3 إلى 4 أسابيع، ونتائج الشعر والأظافر تحتاج عادةً 6 إلى 8 أسابيع من الاستخدام اليومي.",
      },
      {
        q: "هل أحتاج فيتامين C إضافي؟",
        a: "لا، التركيبة تحتوي على فيتامين C كافٍ لتحفيز إنتاج الكولاجين، فلا داعي لمكمل إضافي.",
      },
      {
        q: "هل الدفع عند الاستلام؟",
        a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل السعودية.",
      },
    ],
    upsellHeadline: "أضيفي علكات شوت العين لتفتيح الهالات بسعر خاص",
  },
  {
    id: "chlorophyll-gummies",
    slug: "chlorophyll-gummies",
    nameAr: "علكات الكلوروفيل بتركيبة المناعة العضوية لانتعاش وتنقية يومية",
    shortNameAr: "علكات الكلوروفيل",
    heroHeadline: "انتعاش يدوم 24 ساعة.. تخلصي من روائح الجسم وادعمي مناعتك من الداخل",
    subheadline:
      "تركيبة قوية 100 ملغ من الكلوروفيل النقي مع خليط داعم للمناعة وفيتامينات C وD وE وB12. علكات نباتية لذيذة تنقي الجسم، تنعش النفس، وتعطي بشرتك حيوية من الداخل.",
    benefits: [
      "تقضي على رائحة العرق والنفس الكريهة كمزيل عرق داخلي",
      "تجدد البشرة وتدعم المناعة بفيتامينات قوية",
      "تساعد على تنظيم الوزن وتنقية الجسم من السموم",
    ],
    emotionalCopy:
      "في الحر السعودي والدوام الطويل، الإحساس إنك منتعشة من الداخل ما يعوّضه أي عطر. علكات الكلوروفيل تخلّيك ترفعين يدك بكل ثقة، وتحسّين فرق فعلي في رائحة جسمك ونضارة بشرتك خلال أسابيع.",
    ingredientNotes: [
      "كلوروفيل نقي 100 ملغ: مزيل عرق داخلي قوي يمتص السموم والروائح.",
      "خليط المناعة العضوي: كرز، توت بري، أوريغانو، بقدونس، خل التفاح.",
      "فيتامين C + D + E + B12 + نحاس: لدعم المناعة، الطاقة، والبشرة.",
      "علكات نباتية (Vegan)، خالية من السكر.",
    ],
    disclaimer: "",
    usage: "تناولي علكتين يومياً في أي وقت من اليوم، واستمتعي بانتعاش وثقة تدوم.",
    warnings: [],
    images: {
      main: "/images/products/chlorophyll-gummies.webp",
      routine: "/images/placeholders/chlorophyll-routine.webp",
      pdpHero: "/images/product-pages/chlorophyll-pdp-hero.webp",
      pdpIngredients: "/images/product-pages/chlorophyll-pdp-ingredients.webp",
      pdpRoutine: "/images/product-pages/chlorophyll-pdp-routine.webp",
      pdpScience: "/images/product-pages/chlorophyll-pdp-lifestyle.webp",
    },
    offers: [
      {
        id: "one",
        quantity: 1,
        labelAr: "علبة واحدة",
        durationAr: "شهر كامل · 60 علكة",
        priceSar: 199,
        perBoxSar: 199,
        perDaySar: 7,
        badgeAr: "ابدئي التجربة",
        reasonAr: "تجربة أولى لمدة شهر",
      },
      {
        id: "two",
        quantity: 2,
        labelAr: "علبتين",
        durationAr: "شهرين · 120 علكة",
        priceSar: 349,
        perBoxSar: 175,
        savingsSar: 49,
        perDaySar: 6,
        badgeAr: "وفّري 49 ريال",
        reasonAr: "نتائج مستقرة لشهرين كاملين",
      },
      {
        id: "three",
        quantity: 3,
        labelAr: "3 علب",
        durationAr: "3 شهور · 180 علكة",
        priceSar: 449,
        perBoxSar: 150,
        savingsSar: 148,
        perDaySar: 5,
        badgeAr: "الأكثر مبيعاً · وفّري 148 ريال",
        reasonAr: "روتين 3 شهور للنتائج الكاملة",
      },
    ],
    crossSellPriority: ["collagen-glow-gummies", "lutein-eye-glow-gummies"],
    faq: [
      {
        q: "هل هي نباتية وخالية من السكر؟",
        a: "نعم 100%، علكات نباتية (Vegan) وخالية من السكر المضاف.",
      },
      {
        q: "كيف تقضي على الروائح؟",
        a: "الكلوروفيل ينقي الدم والجهاز الهضمي من السموم المسببة للروائح، ويعمل كمزيل عرق طبيعي من الداخل.",
      },
      {
        q: "متى ألاحظ الفرق في الانتعاش؟",
        a: "أغلب العميلات يلاحظن فرقاً واضحاً خلال 7 إلى 14 يوماً من الاستخدام اليومي.",
      },
      {
        q: "هل الدفع عند الاستلام؟",
        a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل السعودية.",
      },
    ],
    upsellHeadline: "أضيفي علكات الكولاجين لإشراقة كاملة بسعر خاص",
  },
];

export const PRODUCT_MAP = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCrossSells(productIds: string[]): Product[] {
  const allProducts = PRODUCTS.filter((p) => !productIds.includes(p.id));
  if (productIds.length === 0) return PRODUCTS.slice(0, 2);
  if (allProducts.length === 0) return [];
  return allProducts.slice(0, 2);
}

export function getUpsellProduct(cartProductIds: string[]): Product | null {
  const missing = PRODUCTS.filter((p) => !cartProductIds.includes(p.id));
  if (missing.length > 0) return missing[0];
  return PRODUCTS.find((p) => p.id === "collagen-glow-gummies") || null;
}

export const OFFER_UPSELL_PRICE = 149;

export const FULL_ROUTINE_BUNDLE = {
  id: "full-routine",
  labelAr: "الروتين الكامل · 3 منتجات",
  durationAr: "شهر كامل لكل احتياج · 180 علكة",
  priceSar: 499,
  regularPriceSar: 597,
  savingsSar: 98,
  perDaySar: 5,
  badgeAr: "روتين متكامل · وفّري 98 ريال",
} as const;

