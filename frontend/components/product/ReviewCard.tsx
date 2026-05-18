import { Star, CheckCircle } from "lucide-react";

export type Review = {
  name: string;
  city: string;
  product: string;
  text: string;
  date?: string;
};

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="bg-white rounded-2xl border border-[#D5E0DC] p-5 shadow-sm hover:shadow-md hover:border-[#0B6B5C]/30 transition-all duration-300 flex flex-col gap-3"
      dir="rtl"
    >
      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={15}
            className="fill-[#C9A45C] text-[#C9A45C]"
            aria-hidden
          />
        ))}
      </div>

      {/* Review text */}
      <p className="text-[#1A2332] text-[15px] leading-relaxed font-medium flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F0F4F3]">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-sm text-[#1A2332]">{review.name}</p>
            <CheckCircle size={13} className="text-[#2D8B6F]" aria-hidden />
          </div>
          <p className="text-xs text-[#5A6A72] mt-0.5">
            {review.city} · {review.product}
          </p>
        </div>
        {review.date && (
          <span className="text-[11px] text-[#5A6A72] bg-[#F7FAF9] px-2 py-0.5 rounded-full border border-[#D5E0DC]">
            {review.date}
          </span>
        )}
      </div>
    </div>
  );
}

export const SAMPLE_REVIEWS: Review[] = [
  {
    name: "سارة",
    city: "الرياض",
    product: "روتين كولاجين 3 شهور",
    text: "بعد شهر من علكات الكولاجين، حسيت بشرتي أنضر وأظافري ما تتكسر مثل قبل. التغليف مرتب والطلب وصلني بسرعة.",
    date: "منذ أسبوع",
  },
  {
    name: "نورة",
    city: "جدة",
    product: "علكات شوت العين",
    text: "كنت دايماً ألبس كونسيلر للهالات، بعد 6 أسابيع من علكات اللوتين صرت أطلع بدون مكياج وأنا واثقة.",
    date: "منذ أسبوعين",
  },
  {
    name: "هند",
    city: "الخبر",
    product: "علكات الكلوروفيل",
    text: "حبيتها للدوام لأنها سهلة وأحسها جزء من روتيني اليومي للانتعاش. دعم واتساب كان رقيق جداً.",
    date: "منذ ٣ أيام",
  },
];

export const PRODUCT_REVIEWS: Record<string, Review[]> = {
  "lutein-eye-glow-gummies": [
    {
      name: "فاطمة م.",
      city: "جدة",
      product: "٣ علب · الأكثر مبيعاً",
      text: "بعد ٦ أسابيع ما صرت أضع كونسيلر. الهالات خفّت بشكل واضح والكل يسألني عن سري الجديد. ما أتصور روتيني بدونها!",
      date: "منذ ٤ أيام",
    },
    {
      name: "منى خ.",
      city: "الرياض",
      product: "علبتين · شهرين",
      text: "كنت أعاني من إرهاق الشاشة ساعات طويلة. الآن عيوني أريح في آخر اليوم والتعب خف كثيراً. الطلب وصل ثاني يوم.",
      date: "منذ أسبوع",
    },
    {
      name: "ريم س.",
      city: "الخبر",
      product: "٣ علب · الأكثر مبيعاً",
      text: "أول ما جاء الطلب قلت جربيها. من الشهر الثاني هالاتي تقريباً اختفت وعيوني تبدو أكبر وأكثر استراحة. طلبت علبة ثانية فوراً.",
      date: "منذ أسبوعين",
    },
  ],
  "collagen-glow-gummies": [
    {
      name: "سارة أ.",
      city: "الرياض",
      product: "روتين ٣ شهور",
      text: "بعد شهر من علكات الكولاجين حسيت بشرتي أنضر وأظافري ما تتكسر مثل قبل. الكل يسألني عن روتيني الجديد.",
      date: "منذ ٣ أيام",
    },
    {
      name: "نور ع.",
      city: "الدمام",
      product: "علبتين · شهرين",
      text: "كنت أعاني من تساقط الشعر. بعد شهرين شعري أكثف بشكل ملحوظ والمشط ما يخيفني. أنصح كل بنت تجربها.",
      date: "منذ ٥ أيام",
    },
    {
      name: "هدى ق.",
      city: "مكة",
      product: "٣ علب · الأكثر مبيعاً",
      text: "طعمها لذيذ جداً وسهل أخذها يومياً. بشرتي بعد شهر صار فيها إشراقة مختلفة وأهلي يسألونني عيش سوّيتي.",
      date: "منذ أسبوع",
    },
  ],
  "chlorophyll-gummies": [
    {
      name: "هند ع.",
      city: "الخبر",
      product: "علكات الكلوروفيل",
      text: "حسيت بفرق في الانتعاش من الأسبوع الأول. الآن لا أتصور يومي بدونها حتى في الدوام الطويل. ثقتي في نفسي ارتفعت.",
      date: "منذ ٣ أيام",
    },
    {
      name: "لمى ط.",
      city: "الرياض",
      product: "٣ أشهر متواصلة",
      text: "مزيل العرق الداخلي فعلاً يشتغل! شيء ما كنت أصدقه قبل ما جربت. الآن أطلع بكل ثقة بدون قلق من الرائحة.",
      date: "منذ ٦ أيام",
    },
    {
      name: "أسماء ب.",
      city: "جدة",
      product: "علبتين",
      text: "الوزن بدأ ينزل تدريجياً مع الرياضة والبشرة نظفت. أفضل استثمار في صحتي هذه السنة. شكراً لاميس!",
      date: "منذ أسبوعين",
    },
  ],
};
