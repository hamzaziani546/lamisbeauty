import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "من نحن",
  description: "تعرفي على لاميس للجمال، روتينات جمال وعناية مختارة للمرأة السعودية.",
};

export default function AboutPage() {
  return (
    <div dir="rtl" className="bg-[#FFF8F1] min-h-screen">
      <section className="py-16 md:py-20">
        <div className="container-padded max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[#8F3F55] flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">ل</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-4">
              من نحن
            </h1>
            <p className="text-[#6F6262] text-lg leading-relaxed">
              لاميس للجمال — روتينات جمال وعناية مختارة للمرأة السعودية.
            </p>
          </div>

          {/* Story */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8DAD6] mb-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#251F20] mb-4">قصتنا</h2>
            <p className="text-[#6F6262] leading-relaxed mb-4">
              لاميس للجمال وُلدت من فكرة بسيطة: السوق مليء بخيارات كثيرة ومربكة،
              والمرأة السعودية تستحق تجربة شراء واضحة وصادقة.
            </p>
            <p className="text-[#6F6262] leading-relaxed mb-4">
              نختار منتجاتنا بعناية ونشرح مكوناتها بلغة مفهومة، بدون ادعاءات
              مبالغ فيها أو وعود طبية غير مثبتة. ما تجدينه عندنا هو ما نؤمن به
              فعلاً.
            </p>
            <p className="text-[#6F6262] leading-relaxed">
              نخدم المرأة السعودية في جميع مدن المملكة بالدفع عند الاستلام
              والشحن المحلي ودعم عربي عبر واتساب.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {[
              { title: "الصدق أولاً", desc: "لا ندّعي ما لا نملك. لا شهادات مزيفة ولا نتائج مضمونة." },
              { title: "المنتجات بعناية", desc: "نختار لك من السوق ما رأينا فيه قيمة حقيقية لروتينك." },
              { title: "تجربة سعودية", desc: "دفع عند الاستلام، شحن محلي، ودعم بالعربي — هذا ما نفتخر به." },
              { title: "لا ادعاءات طبية", desc: "منتجاتنا للعناية الشخصية، وليست علاجاً لأي حالة طبية." },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-5 border border-[#E8DAD6] shadow-sm"
              >
                <h3 className="font-bold text-[#251F20] mb-2">{v.title}</h3>
                <p className="text-sm text-[#6F6262] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-[#8F3F55] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#7a3549] transition-colors"
            >
              تسوقي روتين لاميس
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
