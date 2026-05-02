import { Truck, ShieldCheck, MessageCircle, CreditCard, CheckCircle } from "lucide-react";

const chips = [
  { icon: CreditCard, text: "الدفع عند الاستلام" },
  { icon: ShieldCheck, text: "ضمان 30 يوم" },
  { icon: CheckCircle, text: "مصرح من SFDA" },
  { icon: Truck, text: "شحن داخل السعودية" },
  { icon: MessageCircle, text: "دعم واتساب" },
];

export function TrustChips({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex flex-wrap gap-2.5 ${compact ? "justify-start" : "justify-center"}`}
      dir="rtl"
    >
      {chips.map(({ icon: Icon, text }) => (
        <div
          key={text}
          className="flex items-center gap-1.5 bg-white border border-[#E8DAD6] text-[#8F3F55] rounded-full px-3.5 py-1.5 text-xs font-bold shadow-sm hover:border-[#8F3F55]/30 transition-colors"
        >
          <Icon size={14} className="shrink-0 text-[#7B9277]" aria-hidden />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
