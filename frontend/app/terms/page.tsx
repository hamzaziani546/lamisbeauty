import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
  description: "شروط وأحكام استخدام موقع لاميس.",
};

export default function TermsPage() {
  return (
    <div dir="rtl" className="bg-[#F7FAF9] min-h-screen py-16">
      <div className="container-padded max-w-3xl">
        <h1 className="text-3xl font-bold text-[#1A2332] mb-2">الشروط والأحكام</h1>
        <p className="text-sm text-[#5A6A72] mb-8">آخر تحديث: 2026</p>

        <div className="bg-white rounded-3xl p-8 border border-[#D5E0DC] shadow-sm space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">قبول الشروط</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              باستخدامك لموقع لاميس أو إتمامك لطلب، توافقين على هذه
              الشروط والأحكام.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">المنتجات والأسعار</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              الأسعار المعروضة بالدرهم المغربي (MAD) وقد تتغير دون إشعار مسبق. يُعتمد
              السعر المُؤكَّد عند إتمام الطلب.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">إخلاء المسؤولية</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              منتجاتنا للعناية الشخصية ولا تستهدف تشخيص أو علاج أي حالة طبية.
              النتائج تختلف من شخص لآخر. في حال وجود أي حالة صحية، يُنصح
              باستشارة متخصصة قبل الاستخدام.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">الملكية الفكرية</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              جميع محتويات الموقع من نصوص وصور وتصميم هي ملك لاميس ولا
              يجوز نسخها أو استخدامها دون إذن كتابي.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">القانون المطبَّق</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              تخضع هذه الشروط للقانون المغربي وأي نزاع يُحسم وفقاً للأنظمة المعمول بها في المغرب.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
