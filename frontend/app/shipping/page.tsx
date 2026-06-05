import type { Metadata } from "next";
import Link from "next/link";
import { Truck, Clock, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "سياسة الشحن | لاميس",
  description: "معلومات الشحن والتوصيل لمتجر لاميس في المغرب.",
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
                توصيل سريع لكل المغرب
              </h2>
              <p className="text-[#5A6A72] leading-relaxed">
                مخزوننا في المغرب. نحرص على وصول طلبك بأسرع وقت: نفس اليوم في الدار البيضاء،
                و1–2 أيام عمل كحد أقصى لباقي المدن.
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
                <h3 className="font-bold text-lg mb-2 text-[#0B6B5C]">الدار البيضاء</h3>
                <p className="text-3xl font-bold mb-2">
                  نفس اليوم{" "}
                  <span className="text-base font-normal text-[#5A6A72]">بعد التأكيد</span>
                </p>
                <p className="text-sm text-[#5A6A72]">طلبات قبل التأكيد الهاتفي/واتساب</p>
              </div>
              <div className="bg-white border border-[#D5E0DC] rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-[#0B6B5C]">باقي المدن</h3>
                <p className="text-3xl font-bold mb-2">
                  1 - 2 <span className="text-base font-normal text-[#5A6A72]">أيام عمل</span>
                </p>
                <p className="text-sm text-[#5A6A72]">الرباط، مراكش، طنجة، فاس، أكادير وغيرها</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">آلية تأكيد وتوصيل الطلب</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-[#2D8B6F] shrink-0 mt-1" size={20} />
                <p className="leading-relaxed">
                  <strong>تأكيد الطلب:</strong> بعد الطلب، يتواصل معك فريقنا عبر واتساب لتأكيد
                  المنتج والعنوان والمدينة قبل التوصيل.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-[#2D8B6F] shrink-0 mt-1" size={20} />
                <p className="leading-relaxed">
                  <strong>التوصيل:</strong> مندوب التوصيل يتصل بك في يوم التسليم لتحديد الوقت
                  المناسب.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-[#2D8B6F] shrink-0 mt-1" size={20} />
                <p className="leading-relaxed">
                  <strong>الدفع:</strong> تدفعين عند الاستلام بالدرهم — بدون بطاقة بنكية.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">تكلفة الشحن والدفع</h2>
            <div className="bg-white border border-[#D5E0DC] rounded-2xl p-6 shadow-sm">
              <p className="leading-relaxed mb-4">
                نوفر <strong>الدفع عند الاستلام (COD)</strong> لجميع مناطق المغرب.
              </p>
              <p className="leading-relaxed text-[#5A6A72]">
                الأسعار بالدرهم المغربي (MAD). أي رسوم توصيل تظهر بوضوح قبل تأكيد الطلب.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">ملاحظات هامة</h2>
            <ul className="list-disc list-inside space-y-2 text-[#5A6A72] mr-5">
              <li>تأكدي من رقم جوال فعّال (06 أو 07) وعنوان واضح.</li>
              <li>في فترات العروض قد يزيد الضغط قليلاً — نبقاو معاك على واتساب.</li>
              <li>التوصيل لا يشمل أيام العطل الرسمية إلا بترتيب مسبق.</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#5A6A72] mb-4">هل لديك استفسار عن طلبك؟</p>
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
