export type OfferId = "one" | "two" | "three" | "upsell";

export type ProductOffer = {
  id: OfferId;
  quantity: number;
  labelAr: string;
  priceSar: number;
  badgeAr?: string;
  reasonAr?: string;
};

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
  };
  offers: ProductOffer[];
  crossSellPriority: string[];
  faq: { q: string; a: string }[];
  upsellHeadline: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "marine-collagen-latte",
    slug: "marine-collagen-latte",
    nameAr: "لاتيه الكولاجين البحري لنضارة فورية وشباب دائم",
    shortNameAr: "لاتيه الكولاجين البحري",
    heroHeadline: "بشرة زجاجية، مشدودة، وأكثر نضارة.. روتينك الصباحي الجديد لجمال يلفت الأنظار",
    subheadline:
      "ودعي شحوب البشرة وعلامات التعب. لاتيه الكولاجين البحري اللذيذ يغذي بشرتك من الداخل ليمنحك إشراقة طبيعية ومرونة ملحوظة في أسابيع قليلة.",
    benefits: [
      "يخفي علامات التعب ويمنحك بشرة زجاجية مشرقة",
      "يشد البشرة ويقلل من مظهر الخطوط الدقيقة",
      "طعم لذيذ وسهل التحضير لتبدئي به يومك بحيوية",
    ],
    emotionalCopy:
      "تخيلي تصحين كل يوم وبشرتك فيها نضارة طبيعية بدون مكياج. الكولاجين حقنا مو مجرد مشروب، هو جرعة ثقة يومية تخليك تحبين ملامحك أكثر وتستغنين عن الفلاتر.",
    ingredientNotes: [
      "كولاجين بحري متحلل: سريع الامتصاص، يعيد بناء مرونة البشرة ويمنحها مظهراً مشدوداً وشبابياً.",
    ],
    disclaimer: "",
    usage: "أضيفي ملعقة واحدة إلى كوب من الماء الدافئ، الحليب، أو قهوتك الصباحية، واستمتعي بطعم لذيذ وفوائد عظيمة يومياً.",
    warnings: [],
    images: {
      main: "/images/placeholders/collagen-main.webp",
      routine: "/images/placeholders/collagen-routine.webp",
    },
    offers: [
      {
        id: "one",
        quantity: 1,
        labelAr: "قطعة واحدة",
        priceSar: 199,
        badgeAr: "ابدئي التجربة",
        reasonAr: "ابدئي التجربة",
      },
      {
        id: "two",
        quantity: 2,
        labelAr: "قطعتين",
        priceSar: 279,
        badgeAr: "استمري بدون انقطاع",
        reasonAr: "استمرار أو مشاركة",
      },
      {
        id: "three",
        quantity: 3,
        labelAr: "3 قطع",
        priceSar: 349,
        badgeAr: "أفضل قيمة للاستخدام اليومي",
        reasonAr: "أفضل قيمة للاستمرار",
      },
    ],
    crossSellPriority: ["rosemary-biotin-spray", "chlorophyll-gummies"],
    faq: [
      {
        q: "متى تظهر النتائج؟",
        a: "تبدأ النتائج بالظهور كإشراقة ونضارة خلال الأسابيع الأولى من الاستخدام اليومي المنتظم.",
      },
      {
        q: "متى أشربه؟",
        a: "صباحاً أو مساءً حسب روتينك، الأهم الانتظام اليومي للحصول على أفضل النتائج.",
      },
      {
        q: "هل يغني عن العناية الخارجية؟",
        a: "الكولاجين يغذي من الداخل ويعزز فعالية كريماتك الخارجية لنتائج مضاعفة ومستدامة.",
      },
      {
        q: "هل الدفع عند الاستلام؟",
        a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل السعودية لضمان راحتك وثقتك.",
      },
    ],
    upsellHeadline: "أضيفي بخاخ الإكليل لروتينك بسعر خاص",
  },
  {
    id: "rosemary-biotin-spray",
    slug: "rosemary-biotin-spray",
    nameAr: "بخاخ الإكليل والبيوتين لإيقاف التساقط وتكثيف الشعر",
    shortNameAr: "بخاخ الإكليل والبيوتين",
    heroHeadline: "ودعي تساقط الشعر والفراغات.. شعرك أكثف، أطول، وأقوى من الجذور",
    subheadline:
      "الحل النهائي لتساقط الشعر. تركيبة مركزة من إكليل الجبل والبيوتين توقف التساقط فوراً وتحفز نمو 'البيبي هير' ليعود شعرك لكثافته وحيويته.",
    benefits: [
      "يوقف تساقط الشعر بشكل ملحوظ من الأسابيع الأولى",
      "ينبت الفراغات ويحفز ظهور البيبي هير بسرعة",
      "تركيبة خفيفة لا تزيت الشعر ومناسبة للاستخدام اليومي",
    ],
    emotionalCopy:
      "شعور الفراغات أو الشعر اللي يتساقط على الفرشاة يكسر الخاطر. صممنا هالبخاخ عشان نرجع لك ثقتك بشعرك. تخيلي شعرك يرجع كثيف، حيوي، وتسوين فيه التسريحة اللي بخاطرك بدون ما تشيلين هم.",
    ingredientNotes: [
      "خلاصة إكليل الجبل (الروزماري): ينشط الدورة الدموية في الفروة ويحفز البصيلات لنمو شعر جديد وقوي.",
      "البيوتين المركز: يقوي بنية الشعرة من الجذور حتى الأطراف ويمنع تكسرها.",
    ],
    disclaimer: "",
    usage: "رشي مباشرة على فروة الرأس نظيفة وجافة أو مبللة قليلاً، دلكي بلطف بأطراف أصابعك ولا تغسليه. استخدميه يومياً لنتائج أسرع.",
    warnings: [],
    images: {
      main: "/images/placeholders/spray-main.webp",
      routine: "/images/placeholders/spray-routine.webp",
    },
    offers: [
      {
        id: "one",
        quantity: 1,
        labelAr: "قطعة واحدة",
        priceSar: 199,
        badgeAr: "ابدئي التجربة",
        reasonAr: "ابدئي التجربة",
      },
      {
        id: "two",
        quantity: 2,
        labelAr: "قطعتين",
        priceSar: 279,
        badgeAr: "استمري بدون انقطاع",
        reasonAr: "استمرار أو مشاركة",
      },
      {
        id: "three",
        quantity: 3,
        labelAr: "3 قطع",
        priceSar: 349,
        badgeAr: "أفضل قيمة للاستخدام اليومي",
        reasonAr: "أفضل قيمة للاستمرار",
      },
    ],
    crossSellPriority: ["marine-collagen-latte", "chlorophyll-gummies"],
    faq: [
      {
        q: "كم مرة أستخدمه؟",
        a: "لأفضل النتائج، استخدميه مرة واحدة يومياً، ويفضل بعد الاستحمام لتكون المسام مفتوحة.",
      },
      {
        q: "هل يزيت الشعر أو يترك أثر؟",
        a: "أبداً! تركيبته مائية خفيفة جداً، يمتصها الشعر فوراً ولا تترك أي ملمس دهني أو لزج.",
      },
      {
        q: "متى ألاحظ توقف التساقط؟",
        a: "معظم عميلاتنا يلاحظن انخفاضاً ملحوظاً في التساقط خلال أول 3 إلى 4 أسابيع من الاستخدام اليومي.",
      },
      {
        q: "هل الدفع عند الاستلام؟",
        a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل السعودية.",
      },
    ],
    upsellHeadline: "أضيفي لاتيه الكولاجين لروتينك بسعر خاص",
  },
  {
    id: "chlorophyll-gummies",
    slug: "chlorophyll-gummies",
    nameAr: "علكات الكلوروفيل لانتعاش دائم ورائحة جسم عطرة",
    shortNameAr: "علكات الكلوروفيل",
    heroHeadline: "انتعاش يدوم 24 ساعة.. تخلصي من روائح الجسم المزعجة من الداخل",
    subheadline:
      "سر الأناقة والثقة طوال اليوم. علكات الكلوروفيل اللذيذة تعمل كمزيل عرق طبيعي من الداخل، لتنقي جسمك وتمنحك رائحة منعشة حتى في أحر الأيام.",
    benefits: [
      "يقضي على رائحة العرق والنفس الكريهة من الجذور",
      "ديتوكس طبيعي ينقي الجسم ويحسن الهضم",
      "بدون سكر وطعمها لذيذ جداً كأنها حلاوة",
    ],
    emotionalCopy:
      "في عز الحر والدوام الطويل، أهم شيء تكونين واثقة من ريحتك وانتعاشك. هالعلكات بتخليك ترفعين يدك وتتحركين بكل ثقة، لأن نظافتك وانتعاشك يبدأ من الداخل.",
    ingredientNotes: [
      "الكلوروفيل النقي: يعمل كمزيل عرق داخلي قوي، يمتص السموم والروائح المزعجة من الجسم ويطردها.",
    ],
    disclaimer: "",
    usage: "تناولي حبتين يومياً في أي وقت، واستمتعي بانتعاش وثقة تدوم طوال اليوم.",
    warnings: [],
    images: {
      main: "/images/placeholders/gummies-main.webp",
      routine: "/images/placeholders/gummies-routine.webp",
    },
    offers: [
      {
        id: "one",
        quantity: 1,
        labelAr: "قطعة واحدة",
        priceSar: 199,
        badgeAr: "ابدئي التجربة",
        reasonAr: "ابدئي التجربة",
      },
      {
        id: "two",
        quantity: 2,
        labelAr: "قطعتين",
        priceSar: 279,
        badgeAr: "استمري بدون انقطاع",
        reasonAr: "استمرار أو مشاركة",
      },
      {
        id: "three",
        quantity: 3,
        labelAr: "3 قطع",
        priceSar: 349,
        badgeAr: "أفضل قيمة للاستخدام اليومي",
        reasonAr: "أفضل قيمة للاستمرار",
      },
    ],
    crossSellPriority: ["marine-collagen-latte", "rosemary-biotin-spray"],
    faq: [
      {
        q: "هل هي خالية من السكر؟",
        a: "نعم 100%! مصممة بدون سكر مضاف لتناسب روتينك الصحي بدون تأنيب ضمير.",
      },
      {
        q: "كيف تقضي على الروائح؟",
        a: "الكلوروفيل يعمل كمضاد أكسدة قوي ينقي الدم والجهاز الهضمي من السموم المسببة للروائح الكريهة.",
      },
      {
        q: "متى أستخدمها؟",
        a: "في أي وقت خلال اليوم، طعمها اللذيذ يجعلها مكافأة صحية ومنعشة لك.",
      },
      {
        q: "هل الدفع عند الاستلام؟",
        a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل السعودية.",
      },
    ],
    upsellHeadline: "أضيفي لاتيه الكولاجين لروتينك بسعر خاص",
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
  return PRODUCTS.find((p) => p.id === "marine-collagen-latte") || null;
}

export const OFFER_UPSELL_PRICE = 99;
