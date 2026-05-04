import { Star, CheckCircle } from "lucide-react";

type Review = {
  name: string;
  city: string;
  product: string;
  text: string;
  date?: string;
};

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="bg-white rounded-2xl border border-[#D5E0DC] p-5 shadow-sm"
      dir="rtl"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-[#1A2332]">{review.name}</p>
            <CheckCircle size={14} className="text-[#2D8B6F]" aria-hidden />
          </div>
          <p className="text-sm text-[#5A6A72]">
            {review.city} · {review.product}
          </p>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className="fill-[#C9A45C] text-[#C9A45C]"
              aria-hidden
            />
          ))}
        </div>
      </div>
      <p className="text-[#5A6A72] text-sm leading-relaxed">&quot;{review.text}&quot;</p>
      {review.date && (
        <p className="text-xs text-[#D5E0DC] mt-2">{review.date}</p>
      )}
    </div>
  );
}

export const SAMPLE_REVIEWS: Review[] = [
  {
    name: "سارة",
    city: "الرياض",
    product: "روتين كولاجين 3 شهور",
    text: "بعد شهر من علكات الكولاجين، حسيت بشرتي أنضر وأظافري ما تتكسر مثل قبل. التغليف مرتب والطلب وصلني بسرعة، ودفعت كاش عند الباب بدون أي تعقيد.",
  },
  {
    name: "نورة",
    city: "جدة",
    product: "علكات شوت العين",
    text: "كنت دايماً ألبس كونسيلر للهالات، بعد 6 أسابيع من علكات اللوتين صرت أطلع بدون مكياج وأنا واثقة من نظرتي. العلبة فيها 60 علكة، كفّتني شهر كامل.",
  },
  {
    name: "هند",
    city: "الخبر",
    product: "علكات الكلوروفيل",
    text: "حبيتها للدوام لأنها سهلة وأحسها جزء من روتيني اليومي للانتعاش. فريق الدعم كلمني على واتساب لتأكيد الطلب وكان رقيق جداً.",
  },
];
