import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ShieldCheck } from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ReviewCard, SAMPLE_REVIEWS } from "@/components/product/ReviewCard";
import { TrustChips } from "@/components/product/TrustChips";

export const metadata: Metadata = {
  title: "لاميس للجمال | روتينات جمال سعودية",
  description:
    "روتينات جمال وعناية مختارة للمرأة السعودية. كولاجين، عناية بالشعر، وانتعاش يومي. الدفع عند الاستلام وشحن داخل السعودية.",
};

const problems = [
  {
    emoji: "✨",
    title: "بشرة تبدو أكثر نضارة",
    desc: "كولاجين بحري لدعم روتين يومي خفيف من الداخل، يواجه جفاف الأجواء.",
    href: "/products/marine-collagen-latte",
  },
  {
    emoji: "🌿",
    title: "شعر يبان أقوى وأرتب",
    desc: "إكليل وبيوتين في خطوة سهلة لفروة الرأس، مصمم لروتينك بعد الاستحمام.",
    href: "/products/rosemary-biotin-spray",
  },
  {
    emoji: "💚",
    title: "انتعاش يومي من الداخل",
    desc: "علكات كلوروفيل بدون سكر لأيام الدوام الطويلة والمشاوير في الحر.",
    href: "/products/chlorophyll-gummies",
  },
];

const ingredients = [
  {
    name: "الكولاجين البحري",
    desc: "مكوّن شائع في روتينات العناية بالبشرة يُستخدم لدعم مظهر المرونة والنضارة.",
  },
  {
    name: "إكليل الجبل (روزماري)",
    desc: "عشبة شائعة في منتجات العناية بالشعر وفروة الرأس.",
  },
  {
    name: "البيوتين",
    desc: "فيتامين يُستخدم في منتجات العناية بالشعر والأظافر.",
  },
  {
    name: "الكلوروفيل",
    desc: "مكوّن نباتي طبيعي يُضاف لمنتجات الانتعاش اليومي.",
  },
];

const faqs = [
  {
    q: "هل الدفع عند الاستلام؟",
    a: "نعم، جميع الطلبات بالدفع عند الاستلام داخل المملكة العربية السعودية.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "التوصيل داخل السعودية، وسيتواصل معك فريقنا لتأكيد الطلب والموعد قبل الشحن.",
  },
  {
    q: "متى أرى نتائج المنتجات؟",
    a: "النتائج تختلف من شخص لآخر. نحن نؤمن بالروتين المنتظم وليس الحل الفوري.",
  },
  {
    q: "هل المنتجات آمنة ومصرحة؟",
    a: "نعم، جميع منتجاتنا مصرحة من هيئة الغذاء والدواء السعودية (SFDA) ومكوناتها مدروسة بعناية.",
  },
  {
    q: "كيف أتواصل مع الدعم؟",
    a: "يمكنك التواصل معنا عبر واتساب بالعربي في صفحة تواصل معنا.",
  },
];

export default function HomePage() {
  return (
    <div dir="rtl">
      {/* Hero */}
      <section className="bg-gradient-to-bl from-[#FFF8F1] to-[#F7E8E6] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container-padded relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#E8DAD6] mb-6 shadow-sm">
                <span className="text-[#8F3F55] font-bold text-sm">
                  روتين جمال سعودي مختار بعناية
                </span>
                <span className="bg-[#8F3F55] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  جديد
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#251F20] leading-tight mb-6">
                روتين صغير يغيّر{" "}
                <span className="text-[#8F3F55] relative">
                  إحساسك
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#F7E8E6] -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>{" "}
                بنفسك
              </h1>
              <p className="text-[#6F6262] text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                لاميس تجمع لك منتجات جمال وعناية مختارة بعناية لتناسب أجواءنا وطبيعتنا في السعودية. بتجربة شراء
                واضحة، دفع عند الاستلام، وضمان ذهبي 30 يوم.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center gap-2 bg-[#8F3F55] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#7a3549] transition-all shadow-xl shadow-[#8F3F55]/20 hover:shadow-[#8F3F55]/30 hover:-translate-y-0.5 w-full sm:w-auto"
                >
                  تسوقي روتين لاميس
                </Link>
                <div className="flex items-center gap-2 text-sm font-medium text-[#7B9277] bg-white/60 px-4 py-3 rounded-full border border-[#E8DAD6]">
                  <CheckCircle size={18} />
                  الدفع عند الاستلام
                </div>
              </div>
              <TrustChips />
            </div>

            {/* Image placeholder */}
            <div className="order-1 md:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#8F3F55]/10 to-transparent rounded-3xl transform rotate-3 scale-105 -z-10"></div>
              <div className="relative h-80 md:h-[500px] bg-gradient-to-br from-white via-[#FFF8F1] to-[#F7E8E6] rounded-3xl flex items-center justify-center shadow-2xl border border-white">
                <div className="text-center">
                  <p className="text-7xl mb-4 drop-shadow-sm">✨🌿💚</p>
                  <p className="text-[#8F3F55] font-bold text-xl bg-white px-6 py-2 rounded-full shadow-sm inline-block">
                    صور المنتجات
                  </p>
                  <p className="text-[#6F6262] text-sm mt-3 font-medium">
                    تُضاف قريباً
                  </p>
                </div>
                {/* Floating trust badges */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 text-sm font-bold text-[#7B9277] flex items-center gap-2 border border-[#E8DAD6]">
                  <ShieldCheck size={18} />
                  ضمان 30 يوم
                </div>
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-4 py-3 text-sm font-bold text-[#8F3F55] flex items-center gap-2 border border-[#E8DAD6]">
                  <CheckCircle size={18} />
                  مصرح من SFDA
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem to routine */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-padded">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#8F3F55] font-bold text-sm mb-3 block">مصممة لاحتياجك</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-4">
              اختاري الروتين الأقرب لك
            </h2>
            <p className="text-[#6F6262] text-lg leading-relaxed">
              كل منتج مصمم ليكون جزء من يومك، يواجه تحديات الأجواء والروتين السريع في السعودية، مو عشر خطوات معقدة.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-gradient-to-b from-[#FFF8F1] to-white border border-[#E8DAD6] rounded-[2rem] p-8 text-right hover:border-[#8F3F55] hover:shadow-xl transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7E8E6] rounded-bl-full -z-10 opacity-50 group-hover:scale-110 transition-transform"></div>
                <div className="text-5xl mb-6 bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm">{item.emoji}</div>
                <h3 className="text-xl font-bold text-[#251F20] mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[#6F6262] leading-relaxed mb-6">{item.desc}</p>
                <span className="inline-flex items-center gap-2 text-[15px] font-bold text-[#8F3F55] group-hover:gap-3 transition-all">
                  اكتشفي المنتج ←
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Science & Authority section */}
      <section className="py-20 md:py-24 bg-[#FFF8F1]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="order-1 md:order-1">
              <div className="aspect-square max-h-[400px] mx-auto bg-gradient-to-br from-white to-[#F7E8E6] rounded-[2rem] flex items-center justify-center shadow-lg border border-white relative">
                <div className="absolute inset-0 border-2 border-[#8F3F55]/10 rounded-[2rem] transform rotate-3"></div>
                <div className="text-center z-10">
                  <p className="text-6xl mb-4">🔬</p>
                  <p className="text-[#8F3F55] text-lg font-bold bg-white px-6 py-2 rounded-full shadow-sm">
                    صورة التصريح / المختبر
                  </p>
                </div>
              </div>
            </div>
            {/* Text */}
            <div className="order-2 md:order-2">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#E8DAD6] mb-6 shadow-sm">
                <span className="text-[#7B9277]">🛡️</span>
                <span className="text-sm font-bold text-[#6F6262]">موثوقية وأمان</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-6 leading-tight">
                جودة تثقين فيها،<br/>مصرحة من الغذاء والدواء
              </h2>
              <p className="text-[#6F6262] text-lg leading-relaxed mb-8">
                صحتك وجمالك أمانة. لذلك نحرص على أن تكون منتجاتنا مصرحة من هيئة الغذاء والدواء السعودية (SFDA)، ومكوناتها مدروسة بعناية لتناسب طبيعة واحتياج المرأة في السعودية.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#E8DAD6] shadow-sm">
                  <span className="text-white bg-[#7B9277] rounded-full p-1.5">
                    <CheckCircle size={18} />
                  </span>
                  <span className="font-medium text-[#251F20]">مصرحة من هيئة الغذاء والدواء (SFDA)</span>
                </li>
                <li className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#E8DAD6] shadow-sm">
                  <span className="text-white bg-[#7B9277] rounded-full p-1.5">
                    <CheckCircle size={18} />
                  </span>
                  <span className="font-medium text-[#251F20]">مكونات آمنة ومدروسة بعناية</span>
                </li>
                <li className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#E8DAD6] shadow-sm">
                  <span className="text-white bg-[#7B9277] rounded-full p-1.5">
                    <CheckCircle size={18} />
                  </span>
                  <span className="font-medium text-[#251F20]">تركيبة تناسب بيئة وأجواء المملكة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-padded max-w-4xl text-center">
          <div className="bg-gradient-to-b from-[#FFF8F1] to-white rounded-[2rem] p-10 md:p-14 shadow-sm border border-[#E8DAD6] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#8F3F55]/20 via-[#8F3F55] to-[#8F3F55]/20"></div>
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-[#E8DAD6]">
              <span className="text-5xl">🛡️</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-5">
              ضمان لاميس الذهبي - 30 يوم
            </h2>
            <p className="text-[#6F6262] text-xl leading-relaxed max-w-2xl mx-auto">
              واثقين من جودة منتجاتنا وتأثيرها على روتينك. إذا ما حسيتي بالفرق اللي تتمنينه خلال 30 يوم، نرجع لك فلوسك بدون أي أسئلة معقدة. جربي الروتين وأنتِ مرتاحة البال.
            </p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 md:py-24 bg-[#FFF8F1]">
        <div className="container-padded">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-4">
              روتين لاميس
            </h2>
            <p className="text-[#6F6262] text-lg">
              ثلاثة منتجات، كل واحدة لجانب مختلف من جمالك اليومي.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-padded">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-[#8F3F55] flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#8F3F55]/20">
              <span className="text-white font-bold text-3xl">ل</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-6">
              لماذا لاميس للجمال؟
            </h2>
            <p className="text-[#6F6262] leading-relaxed text-xl mb-6">
              اخترنا لك منتجات بعناية لأن السوق مليء بخيارات كثيرة ومربكة.
              لاميس للجمال تقدم لك روتيناً واضحاً، بمكونات مفهومة، وتجربة شراء
              سعودية محلية: دفع عند الاستلام، شحن داخل المملكة، ودعم عربي بالواتساب.
            </p>
            <p className="text-[#6F6262] leading-relaxed text-xl bg-[#FFF8F1] p-6 rounded-2xl border border-[#E8DAD6]">
              نؤمن أن العناية بنفسك لا تحتاج مبالغة أو ادعاءات كبيرة. ما
              نعرضه: منتجات منتقاة، صادقية كاملة، وخدمة تعرف احتياجك.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 md:py-24 bg-[#FFF8F1]">
        <div className="container-padded">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-4">
              ماذا تقول عميلاتنا
            </h2>
            <p className="text-[#6F6262] text-lg">
              تجارب حقيقية من عميلاتنا في السعودية
            </p>
            <p className="text-xs text-[#6F6262] mt-2 opacity-60">
              ⚠️ التقييمات التالية بيانات تجريبية وستُستبدل بتقييمات حقيقية عند الإطلاق.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_REVIEWS.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-padded">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-4">
              مكونات واضحة لا غموض
            </h2>
            <p className="text-[#6F6262] text-lg">
              كل مكوّن موضح بشكل مفهوم. لا ادعاءات طبية.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className="bg-[#FFF8F1] border border-[#E8DAD6] rounded-[2rem] p-8 text-right hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-xl">🌿</div>
                <h3 className="text-xl font-bold text-[#251F20] mb-3">{ing.name}</h3>
                <p className="text-[15px] text-[#6F6262] leading-relaxed">
                  {ing.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UGC placeholder */}
      <section className="py-20 md:py-24 bg-[#251F20]">
        <div className="container-padded text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            تجارب حقيقية من عميلاتنا
          </h2>
          <p className="text-[#6F6262] text-lg mb-12">
            محتوى UGC وفيديوهات حقيقية تُضاف قريباً.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-3xl bg-[#6F6262]/20 flex items-center justify-center text-[#6F6262] text-2xl hover:bg-[#6F6262]/30 transition-colors cursor-pointer"
                aria-label="مكان فيديو UGC"
              >
                ▶
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 bg-[#FFF8F1]">
        <div className="container-padded max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#251F20] mb-4">
              أسئلة شائعة
            </h2>
            <p className="text-[#6F6262] text-lg">
              كل ما تحتاجين معرفته عن منتجاتنا
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-white border border-[#E8DAD6] rounded-2xl p-6 group text-right shadow-sm"
              >
                <summary className="font-bold text-lg text-[#251F20] cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-[#8F3F55] text-2xl leading-none group-open:rotate-45 transition-transform inline-block bg-[#F7E8E6] w-8 h-8 rounded-full flex items-center justify-center">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[#6F6262] text-[15px] leading-relaxed border-t border-[#E8DAD6] pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-24 bg-[#8F3F55] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="container-padded text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            اختاري روتينك اليوم
          </h2>
          <p className="text-[#F7E8E6] text-xl mb-10 max-w-2xl mx-auto">
            روتين يستاهل، مو تجربة عشوائية. مع ضمان ذهبي 30 يوم ودفع عند الاستلام.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#8F3F55] font-bold px-10 py-5 rounded-full text-xl hover:bg-[#FFF8F1] transition-all shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
          >
            تسوقي الآن والدفع عند الاستلام
          </Link>
          <p className="text-[#F7E8E6]/80 text-[15px] mt-6">
            اختاري العرض اللي يناسب استخدامك، وكل الطلبات بالدفع عند الاستلام.
          </p>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "لاميس للجمال",
            alternateName: "Lamis Beauty",
            url: "https://lamisbeauty.site",
            description:
              "روتينات جمال وعناية مختارة للمرأة السعودية.",
          }),
        }}
      />
    </div>
  );
}
