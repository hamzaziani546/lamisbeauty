import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  ShieldCheck,
  Star,
  Truck,
  CreditCard,
  MessageCircle,
  Sparkles,
  Clock,
  Award,
  Heart,
  X,
  Check,
  FlaskConical,
  Leaf,
  TrendingUp,
} from "lucide-react";
import { PRODUCTS } from "@/config/products";
import { MARKET } from "@/config/market";
import { OnssaCertificate } from "@/components/trust/OnssaCertificate";
import { ProductCard } from "@/components/product/ProductCard";
import { ReviewCard, SAMPLE_REVIEWS } from "@/components/product/ReviewCard";

export const metadata: Metadata = {
  title: `لاميس | ${MARKET.onssa.metaLineAr}`,
  description:
    "مكملات جمال مغربية مصرحة من ONSSA: علكات اللوتين للهالات، الكولاجين البحري للبشرة، والكلوروفيل للانتعاش. الدفع عند الاستلام، توصيل سريع لكل المغرب، ضمان 30 يوم.",
};

const painPoints = [
  {
    emoji: "😩",
    title: "هالات سوداء ما كتمشي بالكونسيلر",
    desc: "كتصحى متعبة وكتشوفي فالمرايا تعب فعينيك، حتى مع الماكياج. كيبان التعب من تحت.",
  },
  {
    emoji: "😔",
    title: "بشرة بلا لمعة وشعر كيتساقط",
    desc: "الشعر ما بقاش كثيف، الأظافر كتتكسر، والبشرة بلا ذلك التوهج اللي كنتي كاعرفيه.",
  },
  {
    emoji: "🥵",
    title: "الحر والدوام الطويل = إحراج",
    desc: "كتخافي ترفعي يدك، وكتتجنبي القرب من الناس بعد الدوام، وحتى مزيل العرق ما كيكفي مع الجو.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "اختاري حاجتك",
    desc: "3 علكات، كل وحدة كتحل مشكل محدد. جربي المنتج اللي كيعجبك، أو خذي الروتين كامل لنتيجة أقوى.",
  },
  {
    step: "2",
    title: "جوج علكات فالنهار",
    desc: "بلا حبوب كبيرة ولا طعم مر. جوج علكات بنكهة زوينة من بعد الفطور، ونسي الموضوع.",
  },
  {
    step: "3",
    title: "النتيجة كتبان من الداخل",
    desc: "من بعد أسبوعين كتحسي بفرق، ومن 4 ل 8 أسابيع النتيجة كاملة كتبان فالمرايا وفي ثقتك.",
  },
];

const ingredients = [
  {
    icon: "👁️",
    name: "لوتين 20 ملغ + زياكسانثين 4 ملغ",
    desc: "مضادات أكسدة تتراكم في الجلد المحيط بالعين والشبكية. ادرسها هارفارد ومايو كلينك لتقليل مظهر الهالات الزرقاء وحماية العين من إجهاد الشاشات والضوء الأزرق.",
    tag: "أبحاث Mayo Clinic",
  },
  {
    icon: "🌊",
    name: "كولاجين بحري حلال (Type I)",
    desc: "نوع الكولاجين الأكثر دراسة لمرونة البشرة. متحلل بالإنزيمات لامتصاص أسرع 90%+، من مصدر بحري حلال 100٪، وليس بقري.",
    tag: "Type I Marine",
  },
  {
    icon: "🍋",
    name: "فيتامين C + الزنك",
    desc: "الثنائي اللي ما يقدرش الجسم يصنع كولاجين بلاها. فيتامين C كيحفّز الإنتاج الطبيعي، والزنك كيشد البشرة ويقوي الأظافر.",
    tag: "Co-Factor Essential",
  },
  {
    icon: "🌿",
    name: "كلوروفيل نقي 100 ملغ",
    desc: "مزيل عرق طبيعي من الداخل. ينقي الدم والجهاز الهضمي من المركبات المسببة للروائح، ومدعوم بفيتامينات C، D، E، B12 والنحاس.",
    tag: "Internal Deodorant",
  },
];

const comparisons = [
  {
    them: "حبوب كبيرة بطعم مر يصعب تقبلها يومياً",
    us: "علكات لذيذة بطعم فواكه طبيعي، تتمتعين فيها",
  },
  {
    them: "كولاجين من مصدر مجهول أو بقري",
    us: "كولاجين بحري حلال 100%، Type I قابل للامتصاص",
  },
  {
    them: "ادعاءات كبيرة بدون أرقام ولا تركيز",
    us: "جرعات بحثية واضحة (20mg لوتين، 100mg كلوروفيل)",
  },
  {
    them: "منتجات مستوردة بدون تصريح محلي",
    us: "مصرح من ONSSA ومناسب لأجواء المغرب",
  },
  {
    them: "تدفعين قبل، وإذا ما عجبك، خسرتي",
    us: "الدفع عند الاستلام + ضمان استرداد 30 يوم",
  },
  {
    them: "دعم بإيميل بطيء أو لغة أجنبية",
    us: "دعم مغربي عبر واتساب بالعربية",
  },
];

const timeline = [
  {
    week: "الأسبوع 1–2",
    title: "بدايات التحسن",
    desc: "كتزيد الانتعاش مع الكلوروفيل، وعينيك كترتاح من الشاشات. الجسم كيبدا يستجيب من الداخل.",
    icon: Sparkles,
  },
  {
    week: "الأسبوع 3–4",
    title: "النتيجة كتبان",
    desc: "بشرتك أنقى، الهالات كتخف، والأظافر ما كتتكسرش. أول تعليق من صاحباتك: «شنو درتي فوشك؟»",
    icon: TrendingUp,
  },
  {
    week: "الأسبوع 6–8",
    title: "النتائج الكاملة",
    desc: "شعر أكثر كثافة، إشراقة بلا ماكياج، وثقة جديدة. الروتين ولى جزء من حياتك، ماشي رفاهية.",
    icon: Award,
  },
];

const stats = [
  { value: "60", label: "علكة في كل علبة" },
  { value: "30", label: "يوم استخدام كامل" },
  { value: "30", label: "يوم ضمان استرجاع" },
  { value: MARKET.onssa.statValue, label: MARKET.onssa.statLabelAr },
];

const faqs = [
  {
    q: "هل العلكات حلال وآمنة؟",
    a: MARKET.onssa.faqSafetyAr,
  },
  {
    q: "الدفع عند الاستلام فعلاً؟ بلا فيزا؟",
    a: "نعم، الدفع عند الاستلام (COD) لكل الطلبات داخل المغرب. ما كاينش دفع مسبق. فريقنا يتواصل معك على واتساب لتأكيد الطلب والعنوان، وكتستلمي وكتخلّصي عند الباب.",
  },
  {
    q: "متى كتبدا النتيجة تبان؟",
    a: "أغلب الكليانصات كيحسّو بفرق فالانتعاش من بعد أسبوعين. البشرة والهالات من 3 ل 4 أسابيع، والشعر والأظافر كاملين من 6 ل 8 أسابيع بالاستعمال اليومي.",
  },
  {
    q: "هل تنفع لو عندي حساسية أو حامل؟",
    a: "المنتجات آمنة للبالغين فالاستعمال اليومي. إلا كنتي حاملة، مرضعة، عندك مرض، ولا كتاخدي أدوية — استشيري طبيبك قبل أي مكمل.",
  },
  {
    q: "علاش العلكات وماشي حبوب أو كريمات؟",
    a: "العلكات سهلة فالنهار، بنكهة زوينة، ومناسبة لمن ما كيعجبهمش بلع الحبوب الكبيرة. والأهم: المكونات كتخدم من الداخل، حيت البشرة كتبدا من تحت الجلد.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "نوصّل لكل المغرب. الدار البيضاء: توصيل في نفس اليوم بعد تأكيد الطلب. باقي المدن: 1 إلى 2 أيام عمل كحد أقصى. فريقنا يتواصل معك لتأكيد العنوان والموعد.",
  },
  {
    q: "كيف يتم تأكيد الطلب؟",
    a: "خلال ساعة من طلبك، كيتواصل معاك فريقنا على واتساب بالعربية للتأكد من العنوان وموعد التوصيل. الطلب ما كيتصيفطش للتوصيل إلا بعد تأكيدك. إلا ما جاوبتي، ردو على واتساب أو راسلونا.",
  },
  {
    q: "شنو غادي يوقع إلا ما عجبنيش المنتج؟",
    a: "كنرجعو ليك الفلوس خلال 30 يوم بلا أسئلة معقدة. هادا «ضمان لاميس الذهبي». الثقة على جودتنا — المخاطرة علينا، ماشي عليك.",
  },
  {
    q: "كيف أتواصل مع الدعم؟",
    a: "واتساب بالعربية، فريق مغربي كيفهم احتياجك وكيردو بسرعة. زوري صفحة تواصل معنا للرابط المباشر.",
  },
];

export default function HomePage() {
  return (
    <div dir="rtl">
      {/* Hero */}
      <section className="bg-gradient-to-bl from-[#F7FAF9] to-[#E8F0ED] py-14 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container-padded relative z-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div className="order-2 md:order-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#0B6B5C] to-[#095A4C] text-white px-3.5 py-1.5 rounded-full shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle size={14} />
                  <span className="text-[11px] sm:text-xs font-bold">{MARKET.onssa.heroAr}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-[#D5E0DC] shadow-sm text-[#1A2332] hover:border-[#0B6B5C]/30 transition-colors">
                  <Sparkles size={14} className="text-[#C9A45C]" />
                  <span className="text-[11px] sm:text-xs font-bold">60 علكة · شهر كامل من الروتين</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A2332] leading-[1.15] mb-5">
                جمالك يبدأ من{" "}
                <span className="text-[#0B6B5C] relative whitespace-nowrap">
                  الداخل
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-[#E8F0ED] -z-10"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                    />
                  </svg>
                </span>
                <br />
                ماشي من علبة الكونسيلر.
              </h1>

              <p className="text-[#2A3A45] text-lg md:text-xl mb-7 leading-relaxed max-w-lg font-medium">
                3 علكات فالنهار بمكونات مدروسة كتخدم من تحت الجلد:
                كتودّعي الهالات، كترجعي إشراقة البشرة، وانتعاش كيدوم 24 ساعة —
                بلا حبوب مرّة ولا روتين معقد.
              </p>

              {/* Star rating */}
              <div className="flex items-center gap-3 mb-7">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-[#C9A45C] text-[#C9A45C]"
                      aria-hidden
                    />
                  ))}
                </div>
                <span className="text-[#1A2332] font-bold text-sm">
                  4.9 / 5
                </span>
                <span className="text-[#5A6A72] text-sm">
                  تقييمات حقيقية من عميلاتنا في المغرب
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-7">
                <Link
                  href="/collections"
                  className="inline-flex items-center justify-center gap-2 bg-[#0B6B5C] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#095A4C] transition-all shadow-xl shadow-[#0B6B5C]/25 hover:shadow-[#0B6B5C]/40 hover:-translate-y-0.5"
                >
                  بدا روتينك بـ 199 درهم
                </Link>
                <Link
                  href="#how"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#0B6B5C] font-bold px-6 py-4 rounded-full text-base border-2 border-[#D5E0DC] hover:border-[#0B6B5C] transition-all"
                >
                  كيف تشتغل؟
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                {[
                  { icon: CreditCard, text: "دفع عند الاستلام" },
                  { icon: ShieldCheck, text: "ضمان 30 يوم" },
                  { icon: Truck, text: MARKET.trust.nationwideAr },
                  { icon: MessageCircle, text: "دعم واتساب" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-[#D5E0DC]/60 rounded-full px-3 py-2 text-[11px] sm:text-xs font-bold text-[#1A2332] hover:border-[#0B6B5C]/30 hover:shadow-sm transition-all duration-300"
                  >
                    <Icon size={14} className="shrink-0 text-[#2D8B6F]" aria-hidden />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="order-1 md:order-2 relative mb-6 md:mb-0 mt-2 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B6B5C]/15 to-transparent rounded-3xl transform rotate-3 scale-105 -z-10"></div>
              <div className="relative aspect-[4/5] max-w-[420px] mx-auto md:max-w-none bg-gradient-to-br from-white via-[#F7FAF9] to-[#E8F0ED] rounded-3xl shadow-2xl border border-white overflow-hidden">
                <Image
                  src="/images/hero/lamis-home-hero-v2.webp"
                  alt="روتين لاميس الكامل: علكات اللوتين والكولاجين والكلوروفيل"
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / social proof bar */}
      <section className="bg-white border-y border-[#D5E0DC] py-8">
        <div className="container-padded">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <p className="text-2xl md:text-4xl font-bold text-[#0B6B5C] mb-1 group-hover:scale-110 transition-transform duration-300">
                  {s.value}
                </p>
                <p className="text-[13px] md:text-sm text-[#5A6A72] font-medium group-hover:text-[#1A2332] transition-colors duration-300">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value stacking — what's in the box */}
      <section className="py-16 md:py-20 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#0B6B5C] font-bold text-sm mb-3 block">
              شنو كاين فكل علبة؟
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A2332] mb-4 leading-tight">
              العلبة الواحدة = شهر كامل من الروتين
            </h2>
            <p className="text-[#5A6A72] text-lg leading-relaxed">
              ماشي 10 علكات بـ 199 درهم. كل علبة فيها <strong className="text-[#1A2332]">60 علكة</strong> — شهر كامل (30 يوم) بلا انقطاع.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { num: "60", unit: "علكة في كل علبة", icon: "💊" },
              { num: "30", unit: "يوم استخدام كامل", icon: "📅" },
              { num: "2", unit: "علكة يومياً فقط", icon: "✨" },
              { num: "≈ 7", unit: "درهم/اليوم فقط", icon: "💰" },
            ].map((v) => (
              <div
                key={v.unit}
                className="bg-white border border-[#D5E0DC] rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-3xl mb-2">{v.icon}</p>
                <p className="text-3xl font-bold text-[#0B6B5C] leading-none mb-2">
                  {v.num}
                </p>
                <p className="text-[12px] text-[#5A6A72] font-medium leading-snug">
                  {v.unit}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-gradient-to-r from-[#0B6B5C] to-[#095A4C] rounded-3xl p-6 md:p-8 text-white text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <p className="text-lg md:text-xl font-bold mb-2">
              مقارنة بالصيدلية: كتخلّصي أقل وكتاخدي تركيبة كاملة
            </p>
            <p className="text-[#C9A45C] text-sm font-medium">
              إلا شريتي كل مكوّن بوحدو من الصيدلية، كيزيدك أكثر من 400 درهم فالشهر ·
              عندنا الروتين كامل بأقل من 199 درهم للعلبة
            </p>
          </div>
        </div>
      </section>

      {/* Pain points */}
      <section className="py-20 md:py-24 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#0B6B5C] font-bold text-sm mb-3 block">
              تكلمي معنا بصراحة
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-5 leading-tight">
              كتعرفي هاد الإحساس؟
            </h2>
            <p className="text-[#5A6A72] text-lg leading-relaxed">
              ماشي وحدك. آلاف النساء فالمغرب كيعيشو نفس التحدي، والحل ماشي فمنتج فوق الجلد — الحل من الداخل.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {painPoints.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-[#D5E0DC] rounded-[2rem] p-7 text-right relative overflow-hidden group hover:border-[#0B6B5C]/30 hover:shadow-xl transition-all duration-500"
              >
                <div className="text-5xl mb-5 bg-[#F7FAF9] w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {item.emoji}
                </div>
                <h3 className="text-xl font-bold text-[#1A2332] mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[15px] text-[#5A6A72] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#1A2332] font-bold text-lg mt-10">
            تهنئي. حنا فاهمينك، وعندنا الحل ↓
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 md:py-24 bg-white [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#0B6B5C] font-bold text-sm mb-3 block">
              3 خطوات بس
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-5 leading-tight">
              روتين بسيط، نتائج حقيقية
            </h2>
            <p className="text-[#5A6A72] text-lg leading-relaxed">
              ماشي 10 خطوات معقدة. لاميس مصايبة تولّى جزء من نهارك بلا ما تحسي بها كتقل.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {howItWorks.map((step, idx) => (
              <div
                key={step.step}
                className="relative bg-gradient-to-b from-[#F7FAF9] to-white border border-[#D5E0DC] rounded-[2rem] p-8 text-right hover:shadow-lg transition-all duration-300 group"
              >
                <div className="absolute -top-6 right-6 w-14 h-14 bg-[#0B6B5C] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#0B6B5C]/30 group-hover:scale-110 transition-transform duration-300">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-[#1A2332] mb-3 mt-4">
                  {step.title}
                </h3>
                <p className="text-[15px] text-[#5A6A72] leading-relaxed">
                  {step.desc}
                </p>
                {idx < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -left-4 text-[#0B6B5C] text-3xl font-bold opacity-30">
                    ←
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 md:py-24 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#0B6B5C] font-bold text-sm mb-3 block">
              روتين لاميس
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-5 leading-tight">
              ثلاث علكات. ثلاث نتائج. جمال كامل.
            </h2>
            <p className="text-[#5A6A72] text-lg leading-relaxed">
              كل واحدة مصممة لتحدي مختلف، وكلها تشتغل مع بعض في انسجام. خذيها واحدة
              واحدة، أو اجمعيها لروتين كامل بسعر مميز.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-[#0B6B5C] font-bold text-lg underline underline-offset-4 hover:no-underline"
            >
              شوفي الروتين الكامل ←
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison: Lamis vs Traditional */}
      <section className="py-20 md:py-24 bg-white [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#0B6B5C] font-bold text-sm mb-3 block">
              ليش لاميس؟
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-5 leading-tight">
              الفرق اللي تحسينه من أول علبة
            </h2>
            <p className="text-[#5A6A72] text-lg leading-relaxed">
              السوق مليان منتجات، لكن قليلها يستاهل. هذا الفرق بين روتين لاميس وأي
              مكمل تقليدي.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Others */}
            <div className="bg-[#EDF3F0] rounded-[2rem] p-6 md:p-8 border border-[#D5E0DC]/60 hover:border-[#D5E0DC] hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-[#5A6A72] text-lg mb-5 flex items-center gap-2">
                <X className="text-red-500" size={22} /> منتجات تقليدية
              </h3>
              <ul className="space-y-3">
                {comparisons.map((c) => (
                  <li
                    key={c.them}
                    className="flex items-start gap-3 text-[14px] text-[#5A6A72] leading-relaxed"
                  >
                    <X size={18} className="text-red-400 shrink-0 mt-0.5" />
                    <span>{c.them}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Lamis */}
            <div className="bg-gradient-to-b from-[#0B6B5C] to-[#095A4C] rounded-[2rem] p-6 md:p-8 text-white shadow-2xl shadow-[#0B6B5C]/20 hover:shadow-[#0B6B5C]/40 hover:-translate-y-1 transition-all duration-300">
              <h3 className="font-bold text-white text-lg mb-5 flex items-center gap-2">
                <Heart className="fill-white" size={22} /> روتين لاميس
              </h3>
              <ul className="space-y-3">
                {comparisons.map((c) => (
                  <li
                    key={c.us}
                    className="flex items-start gap-3 text-[14px] text-white/95 leading-relaxed font-medium"
                  >
                    <Check size={18} className="text-[#C9A45C] shrink-0 mt-0.5" />
                    <span>{c.us}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Science / Authority */}
      <section className="py-20 md:py-24 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <OnssaCertificate variant="feature" />
              <p className="text-center text-[#5A6A72] text-sm mt-4">
                شهادة ONSSA رسمية + تحاليل مختبرية لكل دفعة
              </p>
            </div>
            <div className="order-2">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#D5E0DC] mb-6 shadow-sm">
                <FlaskConical size={14} className="text-[#2D8B6F]" />
                <span className="text-sm font-bold text-[#1A2332]">
                  العلم وراء التركيبة
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-5 leading-tight">
                مكونات كتخدم،<br />
                ماشي وعود فارغة.
              </h2>
              <p className="text-[#5A6A72] text-lg leading-relaxed mb-7">
                كل علكة مبنية على دراسات حقيقية، بجرعات واضحة (ماشي أرقام ديكور على الكرتون).
                كنتعاملو مع موردين موثوقين، كنختبرو كل دفعة، والمنتج مصرح قبل ما يوصل ليك.
              </p>
              <ul className="space-y-3">
                {[
                  {
                    title: MARKET.onssa.scienceTitleAr,
                    desc: MARKET.onssa.scienceDescAr,
                  },
                  {
                    title: "جرعات بحثية، لا رمزية",
                    desc: "20mg لوتين، 100mg كلوروفيل، Type I كولاجين بحري.",
                  },
                  {
                    title: "اختبار جودة لكل دفعة",
                    desc: "تحاليل ميكروبية ومعادن ثقيلة، ضمان النقاء والسلامة.",
                  },
                  {
                    title: "صُمّمت لأجواء المغرب",
                    desc: "تركيز مدروس للحر، الجفاف، والروتين السريع.",
                  },
                ].map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-[#D5E0DC] shadow-sm hover:border-[#0B6B5C]/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <span className="text-white bg-[#2D8B6F] rounded-full p-1.5 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle size={16} />
                    </span>
                    <div>
                      <p className="font-bold text-[#1A2332] text-[15px] mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-[13px] text-[#5A6A72] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients deep dive */}
      <section className="py-20 md:py-24 bg-white [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#0B6B5C] font-bold text-sm mb-3 block">
              المكونات النجمة
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-5 leading-tight">
              كل مكوّن، له سبب علمي
            </h2>
            <p className="text-[#5A6A72] text-lg leading-relaxed">
              ماشي «فيتامينات وأعشاب» بلا تفاصيل. هادو الجرعات الحقيقية وعلاش اخترناها.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {ingredients.map((ing) => (
              <div
                key={ing.name}
                className="bg-gradient-to-b from-[#F7FAF9] to-white border border-[#D5E0DC] rounded-[2rem] p-7 text-right hover:shadow-xl hover:-translate-y-1 hover:border-[#0B6B5C]/30 transition-all duration-300 relative group"
              >
                <div className="absolute top-4 left-4 bg-[#2D8B6F] text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                  {ing.tag}
                </div>
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm text-3xl border border-[#D5E0DC] group-hover:scale-110 transition-transform duration-300">
                  {ing.icon}
                </div>
                <h3 className="text-lg font-bold text-[#1A2332] mb-3 leading-snug">
                  {ing.name}
                </h3>
                <p className="text-[14px] text-[#5A6A72] leading-relaxed">
                  {ing.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-[#5A6A72] mt-8 max-w-2xl mx-auto opacity-80">
            * المعلومات لأغراض تثقيفية فقط، ليست بديلة عن الاستشارة الطبية. النتائج
            تختلف من شخص لآخر.
          </p>
        </div>
      </section>

      {/* Results timeline */}
      <section className="py-20 md:py-24 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#0B6B5C] font-bold text-sm mb-3 block">
              متى كتبان النتيجة؟
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-5 leading-tight">
              رحلتك مع لاميس، أسبوع بأسبوع
            </h2>
            <p className="text-[#5A6A72] text-lg leading-relaxed">
              ماشي «سحر فوري» — النتيجة الحقيقية كتحتاج وقت حيت المكونات كتخدم من الداخل.
              هادا اللي تتوقعيه.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {timeline.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.week}
                  className="bg-white rounded-[2rem] p-7 border border-[#D5E0DC] shadow-sm relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0B6B5C] to-[#095A4C] rounded-2xl flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={26} />
                  </div>
                  <span className="inline-block text-[#0B6B5C] font-bold text-xs bg-[#E8F0ED] px-3 py-1 rounded-full mb-3">
                    {t.week}
                  </span>
                  <h3 className="text-xl font-bold text-[#1A2332] mb-2">
                    {t.title}
                  </h3>
                  <p className="text-[14px] text-[#5A6A72] leading-relaxed">
                    {t.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 md:py-24 bg-white [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-[#C9A45C] text-[#C9A45C]"
                  />
                ))}
              </div>
              <span className="text-[#1A2332] font-bold">4.9 / 5</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4 leading-tight">
              عميلاتنا قالوا كل شي
            </h2>
            <p className="text-[#5A6A72] text-lg">
              تجارب حقيقية من كل مدن المغرب — الدار البيضاء، الرباط، مراكش، طنجة، فاس.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_REVIEWS.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* Warranty section */}
      <section className="py-16 md:py-20 bg-[#F7FAF9]">
        <div className="container-padded max-w-4xl text-center">
          <div className="bg-gradient-to-b from-white to-[#F7FAF9] rounded-[2rem] p-10 md:p-14 shadow-lg border-2 border-[#C9A45C]/30 relative overflow-hidden hover:shadow-2xl hover:border-[#C9A45C]/50 transition-all duration-500 group">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#C9A45C]/30 via-[#C9A45C] to-[#C9A45C]/30"></div>
            <div className="w-24 h-24 bg-gradient-to-br from-[#C9A45C] to-[#a8843e] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck size={48} className="text-white" />
            </div>
            <span className="inline-block text-[#C9A45C] font-bold text-sm bg-[#C9A45C]/10 px-4 py-1.5 rounded-full mb-4">
              ضمان لاميس الذهبي
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-5 leading-tight">
              30 يوم. صفر مخاطرة. كل المسؤولية علينا.
            </h2>
            <p className="text-[#2A3A45] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6">
              جربي الروتين لـ 30 يوم كاملة. إذا ما حسيتي بفرق حقيقي في بشرتك،
              عينك، أو انتعاشك — رجعي لنا العلب (حتى الفاضية)، ونرجّع لك فلوسك
              كاملة. بدون أسئلة، بدون &#39;بس&#39;، بدون تعقيد.
            </p>
            <div className="inline-flex items-center gap-2 text-[#2D8B6F] font-bold text-sm">
              <Heart size={16} className="fill-[#2D8B6F]" />
              لأن ثقتك فينا أهم من أي طلبية
            </div>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-padded">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0B6B5C] to-[#095A4C] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[#0B6B5C]/30 hover:scale-110 transition-transform duration-500">
              <span className="text-white font-bold text-3xl">ل</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-6 leading-tight">
              علاش صايبنا لاميس؟
            </h2>
            <p className="text-[#2A3A45] leading-relaxed text-lg md:text-xl mb-6">
              حيت تعبنا من منتجات كتعد بكلشي وما كتدير والو. وتعبنا من مكملات ما كتفهمش الجو ديالنا ولا روتين ديالنا.
            </p>
            <p className="text-[#1A2332] leading-relaxed text-lg md:text-xl bg-[#F7FAF9] p-6 rounded-2xl border border-[#D5E0DC] font-medium hover:border-[#0B6B5C]/30 hover:shadow-md transition-all duration-300">
              لاميس من المغرب، للمغرب. روتين واضح، مكونات شفافة، ودعم واتساب بالدارجة والعربية.
              ما كنبيعوش وعود — كنبيعو نتائج كتبان فالمرايا كل صباح.
            </p>
          </div>
        </div>
      </section>

      {/* Order experience reassurance — boosts confirmation & delivery rate */}
      <section className="py-20 md:py-24 bg-[#1A2332] relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="container-padded relative z-10 max-w-5xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-5">
              <Leaf size={14} className="text-[#C9A45C]" />
              <span className="text-sm font-bold text-white">تجربة شراء بدون قلق</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              من اللحظة اللي كتطلبي، حنا معاك
            </h2>
            <p className="text-[#D5E0DC] text-lg max-w-2xl mx-auto">
              ما كتخلّصي حتى درهم قبل ما تستلمي الطلب وتتأكدي منو بنفسك.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: MessageCircle,
                step: "خطوة 1",
                title: "تأكيد عبر واتساب",
                desc: "من بعد الطلب، الفريق كيتواصل معاك على واتساب باش يأكد العنوان والموعد.",
              },
              {
                icon: Truck,
                step: "خطوة 2",
                title: "توصيل سريع لباب الدار",
                desc: "الدار البيضاء: نفس اليوم. باقي المدن: 1 إلى 2 أيام. كنعطيوك رقم التتبع فواتساب.",
              },
              {
                icon: ShieldCheck,
                step: "خطوة 3",
                title: "كتستلمي وكتخلّصي",
                desc: "كتشوفي العلب، كتأكدي الكمية، وكتدفعي كاش للمندوب. ما عجبكش؟ ما كتستلميش.",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 text-right hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#C9A45C] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon size={22} />
                    </div>
                    <span className="text-[#C9A45C] text-xs font-bold uppercase tracking-wider">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-white text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-[#D5E0DC]/90 text-[14px] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="mt-10 bg-[#C9A45C]/10 border border-[#C9A45C]/30 rounded-2xl p-5 text-center max-w-2xl mx-auto">
            <p className="text-white font-bold text-base mb-1">
              ضمان لاميس الذهبي يبدأ من لحظة الاستلام
            </p>
            <p className="text-[#D5E0DC] text-sm">
              30 يوم لتجربي الروتين براحتك. ما حسيتي بفرق؟ نرجّع فلوسك كاملة.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24 bg-[#F7FAF9] [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="container-padded max-w-3xl">
          <div className="text-center mb-12">
            <span className="text-[#0B6B5C] font-bold text-sm mb-3 block">
              أسئلة يسألونها كثير
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1A2332] mb-4 leading-tight">
              كل شي تبين تعرفينه
            </h2>
            <p className="text-[#5A6A72] text-lg">
              ما نخبي شي. تحت الإجابات الصريحة لكل سؤال يمكن في بالك.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-white border border-[#D5E0DC] rounded-2xl p-5 md:p-6 group text-right shadow-sm hover:shadow-md hover:border-[#0B6B5C]/30 transition-all duration-300"
              >
                <summary className="font-bold text-[16px] md:text-lg text-[#1A2332] cursor-pointer list-none flex justify-between items-center gap-4">
                  <span className="group-hover:text-[#0B6B5C] transition-colors">{faq.q}</span>
                  <span className="text-[#0B6B5C] text-2xl leading-none group-open:rotate-45 transition-transform duration-300 inline-flex bg-[#E8F0ED] w-8 h-8 rounded-full items-center justify-center shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-[#2A3A45] text-[15px] leading-relaxed border-t border-[#D5E0DC] pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
          <div className="text-center mt-10 bg-white border border-[#D5E0DC] rounded-2xl p-6 hover:shadow-md hover:border-[#0B6B5C]/30 transition-all duration-300">
            <p className="text-[#1A2332] font-bold mb-2">عندك سؤال ثاني؟</p>
            <p className="text-[#5A6A72] text-sm mb-4">
              فريقنا المغربي يرد عليك بالعربي على واتساب خلال دقائق.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2D8B6F] text-white font-bold px-6 py-3 rounded-full text-sm hover:bg-[#257A5F] hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <MessageCircle size={16} />
              تواصلي معنا واتساب
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-[#0B6B5C] via-[#095A4C] to-[#084A3E] relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:900px]">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
        <div className="absolute top-10 right-10 text-[#C9A45C]/20 text-9xl font-bold select-none">
          ل
        </div>
        <div className="container-padded text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
            <Clock size={14} className="text-[#C9A45C]" />
            <span className="text-sm font-bold text-white">
              بدا اليوم، وشوفي الفرق خلال 30 يوم
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.15]">
            جمالك يستاهل روتين
            <br />
            يشتغل من{" "}
            <span className="text-[#C9A45C]">الداخل</span>
          </h2>
          <p className="text-[#E8F0ED] text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            علكتين يومياً، 60 علكة في كل علبة، شهر كامل من الروتين بأقل من 7
            درهم في اليوم. نتائج حقيقية، ضمان ذهبي 30 يوم، ودفع عند الاستلام.
            ما عندك شي تخسرينه.
          </p>
          <Link
            href="/collections"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0B6B5C] font-bold px-10 py-5 rounded-full text-xl hover:bg-[#F7FAF9] transition-all shadow-2xl hover:shadow-white/30 hover:-translate-y-1"
          >
            بدا روتينك بـ 199 درهم فقط
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-[#E8F0ED]/90 text-sm font-medium">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle size={16} className="text-[#C9A45C]" />
              دفع عند الاستلام
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle size={16} className="text-[#C9A45C]" />
              ضمان 30 يوم
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle size={16} className="text-[#C9A45C]" />
              {MARKET.trust.nationwideAr}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle size={16} className="text-[#C9A45C]" />
              {MARKET.onssa.badgeAr}
            </span>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "لاميس",
            alternateName: "Lamis",
            url: "https://lamisbeauty.site",
            description:
              "علكات جمال مغربية مصرحة من ONSSA: علكات اللوتين للهالات، الكولاجين البحري للبشرة والشعر، وعلكات الكلوروفيل للانتعاش والمناعة.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
            },
          }),
        }}
      />
    </div>
  );
}
