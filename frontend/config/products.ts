export type OfferId = "one" | "two" | "three" | "upsell";

export type ProductOffer = {
  id: OfferId;
  quantity: number;
  labelAr: string;
  priceMad: number;
  badgeAr?: string;
  reasonAr?: string;
  durationAr?: string;
  perBoxMad?: number;
  savingsMad?: number;
  perDayMad?: number;
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
  orderCountBadge: string;
  resultTimeline: Array<{ period: string; result: string }>;
  scienceCopy: string;
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
      "كل صباح كتشوفي فالمرايا وكتلاحظي تعب العين والهالات، حتى مع الماكياج. هاد العلكات صايبينها باش ترجع الإشراقة لعينيك، وغاتحسي براحة وواثقة بلا فلاتر.",
    ingredientNotes: [
      "لوتين 20 ملغ + زياكسانثين 4 ملغ: مضادات أكسدة قوية تتراكم في شبكية العين والجلد المحيط بها لحماية وتفتيح المنطقة.",
      "أوميغا EPA/DHA: تدعم الدورة الدموية الدقيقة وتقلل ركود الدم المسبب للهالات الزرقاء.",
      "خالية من السكر، طعم لذيذ، مناسبة للاستخدام اليومي.",
    ],
    disclaimer: "",
    usage: "جوج علكات فالنهار مع أو من بعد الفطور لأحسن امتصاص.",
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
        priceMad: 199,
        perBoxMad: 199,
        perDayMad: 7,
        badgeAr: "بدا التجربة",
        reasonAr: "تجربة أولى لمدة شهر",
      },
      {
        id: "two",
        quantity: 2,
        labelAr: "علبتين",
        durationAr: "شهرين · 120 علكة",
        priceMad: 349,
        perBoxMad: 175,
        savingsMad: 49,
        perDayMad: 6,
        badgeAr: "وفّري 49 درهم",
        reasonAr: "نتائج مستقرة لشهرين كاملين",
      },
      {
        id: "three",
        quantity: 3,
        labelAr: "3 علب",
        durationAr: "3 شهور · 180 علكة",
        priceMad: 449,
        perBoxMad: 150,
        savingsMad: 148,
        perDayMad: 5,
        badgeAr: "الأكثر مبيعاً · وفّري 148 درهم",
        reasonAr: "روتين 3 شهور للنتائج الكاملة",
      },
    ],
    crossSellPriority: ["collagen-glow-gummies", "chlorophyll-gummies"],
    faq: [
      {
        q: "هل المنتج مصرح رسمياً في المغرب؟",
        a: "نعم، منتجات لاميس مصرحة من ONSSA (المكتب الوطني للسلامة الصحية للمنتجات الغذائية) قبل التسويق.",
      },
      {
        q: "متى تظهر النتائج على الهالات؟",
        a: "أغلب الكليانصات كيلاحظو خفة فالهالات والانتفاخ من 3 ل 6 أسابيع بالاستعمال اليومي.",
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
        a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل المغرب.",
      },
    ],
    upsellHeadline: "زيدي علكات الكولاجين لإشراقة كاملة بسعر خاص",
    orderCountBadge: "165+ طلبت هذا الشهر",
    resultTimeline: [
      { period: "الأسبوع الأول", result: "خفّة ملحوظة في مظهر التعب والانتفاخ تحت العين" },
      { period: "الأسبوع 2–4", result: "الهالات تبدأ تخف وعيونك تبدو أكثر إشراقاً" },
      { period: "الشهر 2–3", result: "نظرة واضحة ومشرقة حتى بلا ماكياج — كيلاحظها الناس" },
    ],
    scienceCopy: "اللوتين والزياكسانثين هما الصبغتان الوحيدتان اللتان تتراكمان مباشرةً في شبكية العين والجلد المحيط بها. دراسات سريرية أثبتت دورهما في حماية خلايا العين، وتقليل تأثير الإجهاد الضوئي، وتحسين إشراقة المنطقة المحيطة بالعين.",
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
      "واش بشرتك فقدات اللمعة وشعرك ما بقاش كثيف؟ الكولاجين كينقص مع الوقت. علكات لاميس كترجع ليك التوهج اللي عزتي عليه، بطعم زوين بلا حبوب كبيرة.",
    ingredientNotes: [
      "كولاجين بحري متحلل (Halal): سريع الامتصاص، يعيد بناء مرونة البشرة ويدعم الشعر والأظافر.",
      "فيتامين C: شريك أساسي لتصنيع الكولاجين داخل الجسم وتفتيح لون البشرة.",
      "الزنك: يدعم التئام الجلد، يقلل البقع، ويقوي الأظافر.",
    ],
    disclaimer: "",
    usage: "جوج علكات فالنهار، يفضل من بعد الفطور.",
    warnings: [],
    images: {
      main: "/images/products/collagen-glow-gummies.webp",
      routine: "/images/placeholders/collagen-glow-routine.webp",
      pdpHero: "/images/product-pages/collagen-pdp-hero.webp",
      pdpIngredients: "/images/product-pages/collagen-pdp-ingredients.webp",
      pdpRoutine: "/images/product-pages/collagen-pdp-routine-user.webp",
      pdpScience: "/images/product-pages/collagen-pdp-science-user.webp",
    },
    offers: [
      {
        id: "one",
        quantity: 1,
        labelAr: "علبة واحدة",
        durationAr: "شهر كامل · 60 علكة",
        priceMad: 199,
        perBoxMad: 199,
        perDayMad: 7,
        badgeAr: "بدا التجربة",
        reasonAr: "تجربة أولى لمدة شهر",
      },
      {
        id: "two",
        quantity: 2,
        labelAr: "علبتين",
        durationAr: "شهرين · 120 علكة",
        priceMad: 349,
        perBoxMad: 175,
        savingsMad: 49,
        perDayMad: 6,
        badgeAr: "وفّري 49 درهم",
        reasonAr: "نتائج مستقرة لشهرين كاملين",
      },
      {
        id: "three",
        quantity: 3,
        labelAr: "3 علب",
        durationAr: "3 شهور · 180 علكة",
        priceMad: 449,
        perBoxMad: 150,
        savingsMad: 148,
        perDayMad: 5,
        badgeAr: "الأكثر مبيعاً · وفّري 148 درهم",
        reasonAr: "روتين 3 شهور للنتائج الكاملة",
      },
    ],
    crossSellPriority: ["lutein-eye-glow-gummies", "chlorophyll-gummies"],
    faq: [
      {
        q: "هل المنتج مصرح رسمياً في المغرب؟",
        a: "نعم، منتجات لاميس مصرحة من ONSSA (المكتب الوطني للسلامة الصحية للمنتجات الغذائية) قبل التسويق.",
      },
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
        a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل المغرب.",
      },
    ],
    upsellHeadline: "زيدي علكات شوت العين للهالات بثمن خاص",
    orderCountBadge: "210+ طلبت هذا الشهر",
    resultTimeline: [
      { period: "الأسبوع الأول", result: "بشرتك تبدأ تشعر بنعومة مختلفة وترطيب أعمق" },
      { period: "الأسبوع 2–4", result: "إشراقة تظهر من الداخل وتحسن واضح في قوة الأظافر" },
      { period: "الشهر 2–3", result: "بشرة مشدودة، شعر أكثر كثافة، وأظافر ما كتتكسرش — نتيجة كتبقى" },
    ],
    scienceCopy: "الكولاجين البحري المتحلل يمتصه الجسم بسرعة أعلى بـ1.5 مرة مقارنة بالكولاجين البقري. فيتامين C ضروري لتصنيع الكولاجين داخل الجسم ولا يعمل بدونه. الزنك يحمي خلايا الجلد من التلف ويقلل الالتهاب — ثلاثة مكونات في علكة واحدة لذيذة.",
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
      "مع الحر والدوام الطويل، الانتعاش من الداخل ما كيتعوضش بأي عطر. علكات الكلوروفيل كتخليك واثقة، وغاتلاحظي فرق فريح فالرائحة والبشرة من بعد كام أسبوع.",
    ingredientNotes: [
      "كلوروفيل نقي 100 ملغ: مزيل عرق داخلي قوي يمتص السموم والروائح.",
      "خليط المناعة العضوي: كرز، توت بري، أوريغانو، بقدونس، خل التفاح.",
      "فيتامين C + D + E + B12 + نحاس: لدعم المناعة، الطاقة، والبشرة.",
      "علكات نباتية (Vegan)، خالية من السكر.",
    ],
    disclaimer: "",
    usage: "جوج علكات فالنهار فأي وقت، واستمتعي بانتعاش وثقة.",
    warnings: [],
    images: {
      main: "/images/products/chlorophyll-gummies.webp",
      routine: "/images/placeholders/chlorophyll-routine.webp",
      pdpHero: "/images/product-pages/chlorophyll-pdp-hero.webp",
      pdpIngredients: "/images/product-pages/chlorophyll-pdp-ingredients.webp",
      pdpRoutine: "/images/product-pages/chlorophyll-pdp-routine-user.webp",
      pdpScience: "/images/product-pages/chlorophyll-pdp-science-user.webp",
    },
    offers: [
      {
        id: "one",
        quantity: 1,
        labelAr: "علبة واحدة",
        durationAr: "شهر كامل · 60 علكة",
        priceMad: 199,
        perBoxMad: 199,
        perDayMad: 7,
        badgeAr: "بدا التجربة",
        reasonAr: "تجربة أولى لمدة شهر",
      },
      {
        id: "two",
        quantity: 2,
        labelAr: "علبتين",
        durationAr: "شهرين · 120 علكة",
        priceMad: 349,
        perBoxMad: 175,
        savingsMad: 49,
        perDayMad: 6,
        badgeAr: "وفّري 49 درهم",
        reasonAr: "نتائج مستقرة لشهرين كاملين",
      },
      {
        id: "three",
        quantity: 3,
        labelAr: "3 علب",
        durationAr: "3 شهور · 180 علكة",
        priceMad: 449,
        perBoxMad: 150,
        savingsMad: 148,
        perDayMad: 5,
        badgeAr: "الأكثر مبيعاً · وفّري 148 درهم",
        reasonAr: "روتين 3 شهور للنتائج الكاملة",
      },
    ],
    crossSellPriority: ["collagen-glow-gummies", "lutein-eye-glow-gummies"],
    faq: [
      {
        q: "هل المنتج مصرح رسمياً في المغرب؟",
        a: "نعم، منتجات لاميس مصرحة من ONSSA (المكتب الوطني للسلامة الصحية للمنتجات الغذائية) قبل التسويق.",
      },
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
        a: "أغلب الكليانصات كيلاحظو فرق واضح من 7 ل 14 يوم بالاستعمال اليومي.",
      },
      {
        q: "هل الدفع عند الاستلام؟",
        a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل المغرب.",
      },
    ],
    upsellHeadline: "زيدي علكات الكولاجين لإشراقة كاملة بسعر خاص",
    orderCountBadge: "190+ طلبت هذا الشهر",
    resultTimeline: [
      { period: "الأسبوع الأول", result: "انتعاش حقيقي من الداخل تحسينه من أول أيام الاستخدام" },
      { period: "الأسبوع 2–4", result: "رائحة الجسم تتحسن بشكل واضح وطاقتك ترتفع" },
      { period: "الشهر 2–3", result: "بشرة أنقى، ثقة تامة في نظافتك من الداخل — تفرق جداً" },
    ],
    scienceCopy: "الكلوروفيل جزيئياً مشابه للهيموغلوبين في الدم، مما يساعده على ربط السموم وتسريع التخلص منها. أبحاث نُشرت في مجلة Dermatology أثبتت أن الكلوروفيل يقلل البكتيريا المسببة لروائح الجسم. المنتج يحتوي 100ملغ بالجرعة الفعّالة المثبتة.",
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

export const OFFER_UPSELL_PRICE = 99;

export const FULL_ROUTINE_BUNDLE = {
  id: "full-routine",
  labelAr: "الروتين الكامل · 3 منتجات",
  durationAr: "شهر كامل لكل احتياج · 180 علكة",
  priceMad: 499,
  regularPriceMad: 597,
  savingsMad: 98,
  perDayMad: 5,
  badgeAr: "روتين متكامل · وفّري 98 درهم",
} as const;

