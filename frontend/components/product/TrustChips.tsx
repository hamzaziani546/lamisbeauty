import { ShieldCheck, Truck, CreditCard, MessageCircle, BadgeCheck } from "lucide-react";
import { MARKET } from "@/config/market";

const chips = [
  { icon: BadgeCheck, text: MARKET.onssa.badgeShortAr },
  { icon: CreditCard, text: MARKET.trust.codAr },
  { icon: ShieldCheck, text: MARKET.trust.guaranteeAr },
  { icon: Truck, text: MARKET.shipping.shortAr },
  { icon: MessageCircle, text: MARKET.trust.whatsappAr },
];

export function TrustChips({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "gap-1.5" : ""}`}>
      {chips.map(({ icon: Icon, text }) => (
        <span
          key={text}
          className={`inline-flex items-center gap-1.5 bg-[#F7FAF9] border border-[#D5E0DC] text-[#1A2332] font-bold rounded-full ${
            compact ? "text-[10px] px-2 py-1" : "text-xs px-3 py-1.5"
          }`}
        >
          <Icon size={13} className="text-[#0B6B5C]" aria-hidden />
          {text}
        </span>
      ))}
    </div>
  );
}
