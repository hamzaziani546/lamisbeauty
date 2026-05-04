import type { Metadata } from "next";
import { MessageCircle, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصلي مع فريق لاميس عبر واتساب أو البريد الإلكتروني.",
};

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export default function ContactPage() {
  return (
    <div dir="rtl" className="bg-[#F7FAF9] min-h-screen">
      <section className="py-16 md:py-20">
        <div className="container-padded max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A2332] mb-3">
              تواصل معنا
            </h1>
            <p className="text-[#5A6A72] text-lg">
              فريق لاميس موجود لمساعدتك بالعربي.
            </p>
          </div>

          <div className="space-y-4">
            {/* WhatsApp */}
            <div className="bg-white rounded-3xl p-6 border border-[#D5E0DC] shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#25D366] rounded-2xl flex items-center justify-center shrink-0">
                  <MessageCircle size={22} className="text-white" aria-hidden />
                </div>
                <div>
                  <h2 className="font-bold text-[#1A2332]">دعم واتساب</h2>
                  <p className="text-sm text-[#5A6A72]">الأسرع والأسهل</p>
                </div>
              </div>
              <p className="text-sm text-[#5A6A72] mb-4 leading-relaxed">
                للاستفسار عن الطلبات، الشحن، أو المنتجات — تواصلي معنا مباشرة
                عبر واتساب بالعربي.
              </p>
              {WHATSAPP ? (
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1ebe5d] transition-colors"
                >
                  <MessageCircle size={16} aria-hidden />
                  ابدئي محادثة واتساب
                </a>
              ) : (
                <p className="text-sm text-[#5A6A72] bg-[#F7FAF9] rounded-xl p-3">
                  رقم واتساب قيد الإضافة — يُنشر قريباً.
                </p>
              )}
            </div>

            {/* Email */}
            <div className="bg-white rounded-3xl p-6 border border-[#D5E0DC] shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#0B6B5C] rounded-2xl flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-white" aria-hidden />
                </div>
                <div>
                  <h2 className="font-bold text-[#1A2332]">البريد الإلكتروني</h2>
                  <p className="text-sm text-[#5A6A72]">للاستفسارات الرسمية</p>
                </div>
              </div>
              <a
                href="mailto:contact@lamisbeauty.shop"
                className="text-[#0B6B5C] font-medium hover:underline text-lg"
              >
                contact@lamisbeauty.shop
              </a>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-3xl p-6 border border-[#D5E0DC] shadow-sm">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-[#E8F0ED] rounded-2xl flex items-center justify-center shrink-0">
                  <Clock size={22} className="text-[#0B6B5C]" aria-hidden />
                </div>
                <div>
                  <h2 className="font-bold text-[#1A2332]">أوقات الدعم</h2>
                </div>
              </div>
              <p className="text-sm text-[#5A6A72] leading-relaxed">
                نستهدف الرد خلال ساعات عمل الفريق. في أوقات الذروة قد يتأخر
                الرد قليلاً ونعتذر مسبقاً.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
