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

      <p className="text-[#1A2332] text-[15px] leading-relaxed font-medium flex-1">
        &ldquo;{review.text}&rdquo;
      </p>

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
    city: "الدار البيضاء",
    product: "روتين كولاجين 3 شهور",
    text: "من بعد شهر، بشرتي ولّات أنقى والأظافر ما كتتكسرش بحال قبل. التغليف مزيان والطلب وصلني بسرعة.",
    date: "منذ أسبوع",
  },
  {
    name: "نورة",
    city: "الرباط",
    product: "علكات شوت العين",
    text: "كنت دايماً كندير كونسيلر للهالات. من بعد 6 أسابيع باللوتين، كنخرج بلا ماكياج وواثقة.",
    date: "منذ أسبوعين",
  },
  {
    name: "هند",
    city: "مراكش",
    product: "علكات الكلوروفيل",
    text: "زوينة للدوام — سهلة وكتعطيني انتعاش. الدعم فواتساب كان مزيان بزاف.",
    date: "منذ 3 أيام",
  },
];

export const PRODUCT_REVIEWS: Record<string, Review[]> = {
  "lutein-eye-glow-gummies": [
    {
      name: "فاطمة م.",
      city: "طنجة",
      product: "3 علب · الأكثر مبيعاً",
      text: "من بعد 6 أسابيع ما بقيتش كندير كونسيلر. الهالات خفّات والناس كيسولو ليا شنو درت.",
      date: "منذ 4 أيام",
    },
    {
      name: "منى خ.",
      city: "فاس",
      product: "علبتين · شهرين",
      text: "كنت كنعاني من تعب الشاشة. دابا عينيا مرتاحين فآخر النهار. الطلب وصل فنهارين.",
      date: "منذ أسبوع",
    },
    {
      name: "ريم س.",
      city: "أكادير",
      product: "3 علب · الأكثر مبيعاً",
      text: "جربتها ومن الشهر الثاني الهالات تقريباً مشاو. طلبت علبة ثانية مباشرة.",
      date: "منذ أسبوعين",
    },
  ],
  "collagen-glow-gummies": [
    {
      name: "سارة أ.",
      city: "الدار البيضاء",
      product: "روتين 3 شهور",
      text: "من بعد شهر بشرتي ولّات أنقى والأظافر ما كتتكسرش. الكل كيسول ليا شنو درت.",
      date: "منذ 3 أيام",
    },
    {
      name: "نور ع.",
      city: "مكناس",
      product: "علبتين · شهرين",
      text: "كنت كنعاني من تساقط الشعر. من بعد شهرين الشعر ولّا أكثر كثافة.",
      date: "منذ 5 أيام",
    },
    {
      name: "هدى ق.",
      city: "القنيطرة",
      product: "3 علب · الأكثر مبيعاً",
      text: "طعمها زوين وسهلة فالنهار. من بعد شهر إشراقة مختلفة فالبشرة.",
      date: "منذ أسبوع",
    },
  ],
  "chlorophyll-gummies": [
    {
      name: "هند ع.",
      city: "وجدة",
      product: "علكات الكلوروفيل",
      text: "حسيت بفرق فالانتعاش من الأسبوع الأول. دابا ما كنتقدرش نهاري بلاها.",
      date: "منذ 3 أيام",
    },
    {
      name: "لمى ط.",
      city: "الرباط",
      product: "3 شهور متواصلة",
      text: "الانتعاش من الداخل كيبان فعلاً! ما كنت مصدقة حتى جربت.",
      date: "منذ 6 أيام",
    },
    {
      name: "أسماء ب.",
      city: "مراكش",
      product: "علبتين",
      text: "البشرة ولّات أنقى والثقة رجعات. أحسن استثمار فالصحة هاد العام.",
      date: "منذ أسبوعين",
    },
  ],
};
