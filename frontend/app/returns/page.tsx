import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "سياسة الاستبدال والإرجاع",
  description: "سياسة الاستبدال والإرجاع في لاميس.",
};

export default function ReturnsPage() {
  return (
    <div dir="rtl" className="bg-[#F7FAF9] min-h-screen py-16">
      <div className="container-padded max-w-3xl">
        <h1 className="text-3xl font-bold text-[#1A2332] mb-2">
          سياسة الاستبدال والإرجاع
        </h1>
        <p className="text-sm text-[#5A6A72] mb-8">آخر تحديث: 2026</p>

        <div className="bg-white rounded-3xl p-8 border border-[#D5E0DC] shadow-sm space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">ضماننا</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              نهتم برضاك. إذا وصل منتجك تالفاً أو مختلفاً عن ما طلبتِه، تواصلي
              معنا خلال 48 ساعة من الاستلام وسنعالج الأمر فوراً.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">
              حالات الاستبدال أو الاسترجاع
            </h2>
            <ul className="text-[#5A6A72] text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>المنتج وصل تالفاً أو مكسوراً.</li>
              <li>المنتج المرسل مختلف عن المطلوب.</li>
              <li>طلب لم يُسلَّم خلال المدة المتوقعة.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">
              حالات لا يُقبل فيها الإرجاع
            </h2>
            <ul className="text-[#5A6A72] text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>المنتج تم فتحه واستخدامه دون عيب من جانبنا.</li>
              <li>عدم الرغبة في المنتج بعد الاستخدام (لأسباب ذوق شخصي).</li>
              <li>عدم ظهور النتائج المتوقعة (إذ تختلف النتائج من شخص لآخر).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">
              كيفية التواصل
            </h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed mb-4">
              تواصلي معنا عبر صفحة التواصل مع ذكر رقم طلبك وصورة المنتج إن كان
              هناك تلف. سنرد في أقرب وقت ممكن.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0B6B5C] text-white font-bold px-6 py-3 rounded-full hover:bg-[#095A4C] transition-colors text-sm"
            >
              تواصلي معنا
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
