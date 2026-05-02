import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, MessageCircle, Package, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "تم استلام طلبك",
  description: "شكراً لطلبك من لاميس للجمال. سيتواصل معك فريقنا قريباً.",
  robots: { index: false },
};

interface Props {
  params: Promise<{ orderId: string }>;
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default async function ThankYouPage({ params }: Props) {
  const { orderId } = await params;

  return (
    <div dir="rtl" className="min-h-[70vh] bg-[#FFF8F1]">
      <div className="container-padded py-16">
        <div className="max-w-lg mx-auto">
          {/* Success icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-[#7B9277] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={40} className="text-white" aria-hidden />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#251F20] mb-2">
              تم استلام طلبك
            </h1>
            <p className="text-[#6F6262]">
              شكراً لثقتك في لاميس للجمال
            </p>
          </div>

          {/* Order info */}
          <div className="bg-white border border-[#E8DAD6] rounded-3xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#6F6262] text-sm">رقم الطلب</span>
              <span className="font-bold text-[#251F20] font-mono">
                {orderId}
              </span>
            </div>
            <div className="border-t border-[#E8DAD6] pt-4">
              <p className="text-sm text-[#6F6262] leading-relaxed">
                الدفع عند الاستلام — لا يلزمك الدفع الآن.
              </p>
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-white border border-[#E8DAD6] rounded-3xl p-6 mb-6 shadow-sm">
            <h2 className="font-bold text-[#251F20] mb-4">الخطوات التالية</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F7E8E6] rounded-full flex items-center justify-center shrink-0">
                  <Phone size={14} className="text-[#8F3F55]" aria-hidden />
                </div>
                <div>
                  <p className="font-medium text-[#251F20] text-sm">
                    تأكيد الطلب
                  </p>
                  <p className="text-xs text-[#6F6262] mt-0.5">
                    سيتواصل معك فريق التأكيد قريباً على رقم جوالك قبل الشحن.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F7E8E6] rounded-full flex items-center justify-center shrink-0">
                  <Package size={14} className="text-[#8F3F55]" aria-hidden />
                </div>
                <div>
                  <p className="font-medium text-[#251F20] text-sm">الشحن</p>
                  <p className="text-xs text-[#6F6262] mt-0.5">
                    نشحن داخل المملكة العربية السعودية وسيُبلغك الفريق بموعد
                    التوصيل.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-[#F7E8E6] rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle size={14} className="text-[#8F3F55]" aria-hidden />
                </div>
                <div>
                  <p className="font-medium text-[#251F20] text-sm">الاستلام</p>
                  <p className="text-xs text-[#6F6262] mt-0.5">
                    تستلمين طلبك وتدفعين عند الاستلام — بدون أي دفع مسبق.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp support */}
          {WHATSAPP && (
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`مرحبا، لدي استفسار عن طلبي رقم ${orderId}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl mb-4 hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle size={18} aria-hidden />
              تواصلي معنا عبر واتساب
            </a>
          )}

          <div className="flex gap-3">
            <Link
              href="/collections"
              className="flex-1 text-center bg-[#F7E8E6] text-[#8F3F55] font-bold py-3 rounded-2xl hover:bg-[#f0dbd7] transition-colors text-sm"
            >
              تسوقي المزيد
            </Link>
            <Link
              href="/"
              className="flex-1 text-center bg-white border border-[#E8DAD6] text-[#251F20] font-medium py-3 rounded-2xl hover:bg-[#FFF8F1] transition-colors text-sm"
            >
              الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
