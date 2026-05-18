import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "من نحن",
  description: "لاميس — مكملات جمال بمعايير صيدلانية. صيدلية جمالك الخاصة.",
};

export default function AboutPage() {
  return (
    <div dir="rtl" className="bg-[#F7FAF9] min-h-screen">
      <section className="py-16 md:py-20">
        <div className="container-padded max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[#0B6B5C] flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-3xl">ل</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A2332] mb-4">
              من نحن
            </h1>
            <p className="text-[#5A6A72] text-lg leading-relaxed">
              لاميس — مكملات جمال بمعايير صيدلانية
            </p>
          </div>

          {/* Story */}
          <div className="bg-white rounded-3xl p-8 border border-[#D5E0DC] mb-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#1A2332] mb-4">قصتنا</h2>
            <p className="text-[#5A6A72] leading-relaxed mb-4">
              وُلدت لاميس من سؤال بسيط: ليش ما فيه مكمل جمال سعودي بمعايير
              صيدلانية؟ السوق مليان منتجات مستوردة بادعاءات كبيرة وبدون تصريح
              محلي. قررنا نسوي الشي الصح: مكملات مصرحة من هيئة الغذاء والدواء، بجرعات بحثية
              واضحة (مو أرقام رمزية على الكرتون)، ونشرح كل مكوّن بلغة مفهومة.
              ما نبيع وعود — نبيع نتائج تشوفينها في المرآة.
            </p>
            <p className="text-[#5A6A72] leading-relaxed">
              نشتغل مع موردين عالميين موثوقين، نختبر كل دفعة في مختبرات
              معتمدة، ونصرّح كل منتج رسمياً قبل ما يوصل لك. هذي مو شركة تسويق
              — هذي شركة مكملات جمال بمعايير صيدلانية.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {[
              { title: "معايير صيدلانية", desc: "مصرحة من هيئة الغذاء والدواء بأرقام تسجيل رسمية. جرعات بحثية واضحة، اختبار جودة لكل دفعة." },
              { title: "شفافية مطلقة", desc: "كل مكوّن، كل جرعة، كل مصدر — موضح بوضوح. لا ادعاءات طبية ولا وعود مبالغ فيها." },
              { title: "سعودية ١٠٠٪", desc: "دفع عند الاستلام، شحن لكل المملكة، ودعم بالعربي عبر واتساب. صُممت لأجواءنا وروتيننا." },
              { title: "ضمان بدون مخاطرة", desc: "ضمان ذهبي 30 يوم. جربي الروتين، وإذا ما حسيتي بفرق، فلوسك ترجع لك كاملة." },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-5 border border-[#D5E0DC] shadow-sm hover:shadow-md hover:border-[#0B6B5C]/30 transition-all duration-300 group"
              >
                <h3 className="font-bold text-[#1A2332] mb-2 group-hover:text-[#0B6B5C] transition-colors">{v.title}</h3>
                <p className="text-sm text-[#5A6A72] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-[#0B6B5C] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#095A4C] transition-colors"
            >
              ابدئي روتينك الصيدلاني
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
