import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الشحن | لاميس",
  description: "معلومات الشحن والتوصيل لمتجر لاميس في المملكة العربية السعودية.",
};

export default function ShippingPage() {
  return (
    <div className="container-padded py-12 md:py-20" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1A2332] mb-6">
          سياسة الشحن والتوصيل
        </h1>
        
        <div className="bg-[#F7FAF9] rounded-3xl p-8 mb-10 border border-[#D5E0DC]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Truck className="text-[#0B6B5C]" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A2332] mb-2">
                شحن سريع لكل مناطق السعودية
              </h2>
              <p className="text-[#5A6A72] leading-relaxed">
                نحرص في لاميس على وصول طلبك بأسرع وقت وأفضل حالة. نتعاون مع أفضل شركات الشحن لضمان تجربة مميزة.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-8 text-[#1A2332]">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Clock className="text-[#2D8B6F]" size={24} />
              مدة التوصيل
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#D5E0DC] rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-[#0B6B5C]">المدن الرئيسية</h3>
                <p className="text-3xl font-bold mb-2">1 - 2 <span className="text-base font-normal text-[#5A6A72]">أيام عمل</span></p>
                <p className="text-sm text-[#5A6A72]">الرياض، جدة، الدمام، مكة، الخبر</p>
              </div>
              <div className="bg-white border border-[#D5E0DC] rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-[#0B6B5C]">باقي مدن المملكة</h3>
                <p className="text-3xl font-bold mb-2">2 - 5 <span className="text-base font-normal text-[#5A6A72]">أيام عمل</span></p>
                <p className="text-sm text-[#5A6A72]">جميع المحافظات والقرى الأخرى</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">آلية تأكيد وتوصيل الطلب</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-[#2D8B6F] shrink-0 mt-1" size={20} />
                <p className="leading-relaxed">
                  <strong>تأكيد الطلب:</strong> بعد إتمام الطلب، سيتواصل معك فريق خدمة العملاء عبر الواتساب لتأكيد الطلب والعنوان قبل شحنه.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-[#2D8B6F] shrink-0 mt-1" size={20} />
                <p className="leading-relaxed">
                  <strong>تتبع الشحنة:</strong> بمجرد تسليم الطلب لشركة الشحن، ستصلك رسالة تحتوي على رقم التتبع.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-[#2D8B6F] shrink-0 mt-1" size={20} />
                <p className="leading-relaxed">
                  <strong>الاستلام:</strong> سيتواصل معك مندوب التوصيل في يوم التسليم لتحديد الوقت المناسب لاستلام طلبك.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">تكلفة الشحن والدفع</h2>
            <div className="bg-white border border-[#D5E0DC] rounded-2xl p-6 shadow-sm">
              <p className="leading-relaxed mb-4">
                نوفر خدمة <strong>الدفع عند الاستلام</strong> لجميع مناطق المملكة العربية السعودية لضمان راحتك وثقتك.
              </p>
              <p className="leading-relaxed text-[#5A6A72]">
                تُضاف رسوم الشحن والدفع عند الاستلام إلى إجمالي الطلب وتكون موضحة بشكل كامل في صفحة إتمام الطلب قبل تأكيده.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">ملاحظات هامة</h2>
            <ul className="list-disc list-inside space-y-2 text-[#5A6A72] mr-5">
              <li>أيام العمل لا تشمل يوم الجمعة والعطلات الرسمية.</li>
              <li>في أوقات المواسم والعروض والتخفيضات الكبرى، قد يستغرق التوصيل وقتاً أطول قليلاً من المعتاد بسبب الضغط على شركات الشحن.</li>
              <li>يرجى التأكد من كتابة العنوان بشكل صحيح وواضح ورقم جوال فعّال لضمان سرعة التوصيل.</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#5A6A72] mb-4">هل لديك استفسار عن شحنتك؟</p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#0B6B5C] text-white font-bold px-8 py-3 rounded-full hover:bg-[#095A4C] transition-colors"
          >
            تواصل معنا
          </Link>
        </div>
      </div>
    </div>
  );
}
