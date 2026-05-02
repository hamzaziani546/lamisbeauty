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
      className="bg-white rounded-2xl border border-[#E8DAD6] p-5 shadow-sm"
      dir="rtl"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-[#251F20]">{review.name}</p>
            <CheckCircle size={14} className="text-[#7B9277]" aria-hidden />
          </div>
          <p className="text-sm text-[#6F6262]">
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
      <p className="text-[#6F6262] text-sm leading-relaxed">&quot;{review.text}&quot;</p>
      {review.date && (
        <p className="text-xs text-[#E8DAD6] mt-2">{review.date}</p>
      )}
    </div>
  );
}

export const SAMPLE_REVIEWS: Review[] = [
  {
    name: "سارة",
    city: "الرياض",
    product: "عرض 3 قطع كولاجين",
    text: "أعجبني أن الطلب واضح والدفع عند الاستلام. التغليف مرتب وحسيت البراند مو عشوائي.",
    date: "بيانات تجريبية - يُستبدل بتقييمات حقيقية عند الإطلاق",
  },
  {
    name: "نورة",
    city: "جدة",
    product: "روتين الشعر",
    text: "البخاخ خفيف وسهل أدخله في يومي. أكثر شيء عجبني الشرح الواضح وطريقة الاستخدام.",
    date: "بيانات تجريبية - يُستبدل بتقييمات حقيقية عند الإطلاق",
  },
  {
    name: "هند",
    city: "الخبر",
    product: "علكات الكلوروفيل",
    text: "حبيتها للدوام لأنها سهلة وأحسها جزء من روتيني اليومي للانتعاش.",
    date: "بيانات تجريبية - يُستبدل بتقييمات حقيقية عند الإطلاق",
  },
];
