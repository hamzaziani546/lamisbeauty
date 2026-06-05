"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertCircle,
  CheckCircle,
  MessageCircle,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { PRODUCTS, PRODUCT_MAP } from "@/config/products";
import type { CartItem } from "@/store/cart-store";

interface OrderSnapshot {
  items: CartItem[];
  total: number;
  orderNumber: string;
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const REVIEWS = [
  {
    name: "سارة أ.",
    city: "الدار البيضاء",
    product: "كولاجين · 3 شهور",
    text: "عيطولي فأقل من 5 دقائق! كانوا لطاف وأكدو كلشي. الطلب وصل فنهارين.",
    stars: 5,
    age: "منذ 3 أيام",
  },
  {
    name: "نورة م.",
    city: "طنجة",
    product: "شوت العين · شهرين",
    text: "من بعد الطلب جا اتصال بسرعة. من بعد شهر الهالات ما بقاوش بحال قبل.",
    stars: 5,
    age: "منذ 5 أيام",
  },
  {
    name: "هند ع.",
    city: "فاس",
    product: "كلوروفيل · شهر",
    text: "الفريق محترم والتوصيل أسرع من المتوقع. حسيت بفرق فالانتعاش من الأسبوع الأول!",
    stars: 5,
    age: "منذ أسبوع",
  },
];

const TIMELINE = [
  {
    icon: Phone,
    label: "تأكيد الطلب",
    desc: "فريقنا يتصل بك لتأكيد عنوانك وموعد التوصيل",
    active: true,
  },
  {
    icon: Package,
    label: "الشحن",
    desc: "الطلب كيتصيفط من بعد التأكيد",
    active: false,
  },
  {
    icon: Truck,
    label: "التوصيل",
    desc: "الدار البيضاء نفس اليوم · باقي المدن 1–2 يوم",
    active: false,
  },
  {
    icon: CheckCircle,
    label: "الاستلام والدفع",
    desc: "كتستلمي المنتج وكتخلّصي كاش عند الباب",
    active: false,
  },
];

const RESULTS = [
  { period: "الأسبوع الأول", result: "كتبدا تحسي بفرق فالانتعاش والطاقة" },
  { period: "الأسبوع 2–4", result: "إشراقة تظهر على البشرة وتخف ملامح التعب والهالات" },
  { period: "الشهر 2–3", result: "نتائج واضحة تلاحظها من حولك — بشرة، شعر، وثقة" },
];

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-[#C9A45C] text-[#C9A45C]" aria-hidden />
      ))}
    </div>
  );
}

export function ThankYouClient({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderSnapshot | null>(null);
  const [isBusinessHours, setIsBusinessHours] = useState<boolean | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsBusinessHours(hour >= 9 && hour < 21);

    try {
      const raw = sessionStorage.getItem("lamis_last_order");
      if (raw) {
        const snapshot: OrderSnapshot = JSON.parse(raw);
        if (snapshot.orderNumber === orderId) setOrder(snapshot);
      }
    } catch {
      // sessionStorage unavailable
    }
  }, [orderId]);

  const orderedIds = new Set(order?.items.map((i) => i.productId) ?? []);
  const suggestions = PRODUCTS.filter((p) => !orderedIds.has(p.id)).slice(0, 2);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F7FAF9]">

      {/* 1. TIME-AWARE BANNER */}
      {isBusinessHours !== null && (
        <div className={isBusinessHours ? "bg-gradient-to-l from-[#0B6B5C] to-[#1E7B68] text-white" : "bg-[#1A2332] text-white"}>
          <div className="container-padded py-3 flex items-center justify-center gap-2.5">
            <Phone size={15} className={isBusinessHours ? "animate-pulse shrink-0" : "shrink-0"} aria-hidden />
            {isBusinessHours ? (
              <p className="text-sm font-bold text-center leading-snug">
                الفريق غادي يعيط ليك فأقل من 10 دقائق — جاوبي على أي نمرة ما معروفة 📞
              </p>
            ) : (
              <p className="text-sm font-bold text-center leading-snug">
                الطلب ديالك آمين ✅ غادي نعيطو ليك من 9h الصباح باش نأكدو العنوان
              </p>
            )}
          </div>
        </div>
      )}

      <div className="container-padded py-10 md:py-14">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* 2. HERO */}
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center mb-5">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2D8B6F] to-[#0B6B5C] flex items-center justify-center shadow-xl shadow-[#0B6B5C]/25">
                <CheckCircle size={44} className="text-white" aria-hidden />
              </div>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#C9A45C] rounded-full flex items-center justify-center text-lg shadow-md">
                🎉
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2332] mb-2 leading-tight">
              طلبك وصلنا، روتينك في طريقه إليك!
            </h1>
            <p className="text-[#5A6A72] text-lg mb-3">شكراً لثقتك في لاميس 💚</p>
            <span className="text-xs text-[#5A6A72] font-mono bg-white border border-[#D5E0DC] px-3 py-1.5 rounded-full inline-block">
              طلب رقم: {orderId}
            </span>
          </div>

          {/* 3. CALL PREP CARD */}
          <div className="bg-white border-2 border-[#0B6B5C]/20 rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0B6B5C] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <Phone size={14} className="text-white" aria-hidden />
              </div>
              <h2 className="font-bold text-[#1A2332]">استعدي للمكالمة</h2>
            </div>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" aria-hidden />
              <p className="text-sm text-amber-800 font-medium leading-relaxed">
                ستظهر مكالمة من <span className="font-bold">رقم قد لا تعرفينه</span> — هو فريق لاميس للتأكيد.{" "}
                <span className="font-bold">ردي عليها حتماً!</span>
              </p>
            </div>
            <div className="space-y-3">
              {[
                { n: "1", body: <>سيؤكد فريقنا <span className="font-semibold text-[#1A2332]">عنوانك وموعد التوصيل</span> المناسب لك</> },
                { n: "2", body: <>المكالمة لن تأخذ أكثر من <span className="font-semibold text-[#1A2332]">دقيقتين</span> فقط</> },
                { n: "3", body: <>بعد التأكيد يُشحن طلبك <span className="font-semibold text-[#1A2332]">مباشرة</span> والدفع عند الاستلام</> },
              ].map(({ n, body }) => (
                <div key={n} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#E8F0ED] text-[#0B6B5C] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {n}
                  </div>
                  <p className="text-sm text-[#5A6A72] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. ORDER SUMMARY */}
          {order && order.items.length > 0 && (
            <div className="bg-white border border-[#D5E0DC] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h2 className="font-bold text-[#1A2332] mb-4">ملخص طلبك</h2>
              <div className="space-y-3 mb-4">
                {order.items.map((item, i) => {
                  const product = PRODUCT_MAP[item.productId];
                  const duration = item.titleAr.includes("علبتين")
                    ? "علبتين · 60 يوم"
                    : item.titleAr.includes("3 علب") || item.titleAr.includes("3 علب")
                    ? "3 علب · 90 يوم"
                    : "60 علكة · شهر كامل";
                  return (
                    <div key={i} className="flex items-center gap-4 bg-[#F7FAF9] rounded-2xl p-3">
                      {product && (
                        <div className="relative w-14 h-14 rounded-xl bg-white border border-[#D5E0DC] overflow-hidden shrink-0">
                          <Image
                            src={product.images.main}
                            alt={product.shortNameAr}
                            fill
                            sizes="56px"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#1A2332] text-sm leading-snug">
                          {product?.shortNameAr ?? item.titleAr}
                        </p>
                        <p className="text-xs text-[#5A6A72] mt-0.5">{duration}</p>
                      </div>
                      <p className="font-bold text-[#0B6B5C] shrink-0 text-sm whitespace-nowrap">
                        {item.priceMad} د.م
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-[#D5E0DC] pt-3 flex items-center justify-between">
                <span className="bg-[#E8F0ED] text-[#0B6B5C] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                  <ShieldCheck size={12} aria-hidden />
                  الدفع عند الاستلام
                </span>
                <div className="text-right">
                  <p className="text-xs text-[#5A6A72]">المجموع</p>
                  <p className="font-bold text-xl text-[#1A2332]">{order.total} د.م</p>
                </div>
              </div>
            </div>
          )}

          {/* 5. JOURNEY TIMELINE */}
          <div className="bg-white border border-[#D5E0DC] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <h2 className="font-bold text-[#1A2332] mb-5">رحلة طلبك</h2>
            <div className="relative">
              <div className="absolute right-[1.0625rem] top-9 bottom-9 w-0.5 bg-gradient-to-b from-[#0B6B5C] via-[#D5E0DC] to-[#D5E0DC]" aria-hidden />
              <div className="space-y-5">
                {TIMELINE.map(({ icon: Icon, label, desc, active }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 relative z-10 ${active ? "bg-[#0B6B5C] text-white shadow-md shadow-[#0B6B5C]/30" : "bg-white border-2 border-[#D5E0DC] text-[#5A6A72]"}`}>
                      <Icon size={15} aria-hidden />
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-bold ${active ? "text-[#0B6B5C]" : "text-[#1A2332]"}`}>
                        {label}
                        {active && (
                          <span className="mr-2 text-[10px] bg-[#0B6B5C]/10 text-[#0B6B5C] px-2 py-0.5 rounded-full font-medium">الآن</span>
                        )}
                      </p>
                      <p className="text-xs text-[#5A6A72] mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. RESULTS EXCITEMENT */}
          <div className="bg-gradient-to-br from-[#0B6B5C] to-[#1E7B68] rounded-3xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={18} aria-hidden />
              <h2 className="font-bold">ماذا ستلاحظين خلال الأسابيع القادمة؟</h2>
            </div>
            <p className="text-white/70 text-xs mb-5">جهزي نفسك — النتائج تبدأ أسرع مما تتوقعين</p>
            <div className="space-y-3">
              {RESULTS.map(({ period, result }) => (
                <div key={period} className="flex items-start gap-3">
                  <div className="bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full shrink-0 mt-0.5 whitespace-nowrap">
                    {period}
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed">{result}</p>
                </div>
              ))}
            </div>
            <p className="text-white/50 text-[11px] mt-5 text-center">
              النتائج تتفاوت بناءً على الانتظام في الاستخدام
            </p>
          </div>

          {/* 7. SOCIAL PROOF */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#1A2332]">تجارب عميلاتنا</h2>
              <div className="flex items-center gap-1.5 text-xs text-[#5A6A72]">
                <StarRow />
                <span>4.9 / 5</span>
              </div>
            </div>
            <div className="space-y-3">
              {REVIEWS.map((r, i) => (
                <div key={i} className="bg-white border border-[#D5E0DC] rounded-2xl p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-sm text-[#1A2332]">{r.name}</p>
                        <CheckCircle size={12} className="text-[#2D8B6F]" aria-hidden />
                      </div>
                      <p className="text-xs text-[#5A6A72]">{r.city} · {r.product}</p>
                    </div>
                    <div className="shrink-0 text-left">
                      <StarRow count={r.stars} />
                      <p className="text-xs text-[#5A6A72] mt-0.5 text-left">{r.age}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#5A6A72] leading-relaxed">&quot;{r.text}&quot;</p>
                </div>
              ))}
            </div>
          </div>

          {/* 8. PRODUCT SUGGESTIONS */}
          {suggestions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={15} className="text-[#C9A45C]" aria-hidden />
                <h2 className="font-bold text-[#1A2332]">أكملي روتينك لنتائج مضاعفة</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {suggestions.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="bg-white border border-[#D5E0DC] rounded-2xl overflow-hidden hover:border-[#0B6B5C]/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="relative h-40 bg-[#F7FAF9] overflow-hidden">
                      <Image
                        src={product.images.main}
                        alt={product.shortNameAr}
                        fill
                        loading="lazy"
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-sm text-[#1A2332] leading-snug mb-1">{product.shortNameAr}</p>
                      <p className="text-xs text-[#5A6A72] mb-3 line-clamp-2">{product.subheadline}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#0B6B5C] text-sm">يبدأ من {product.offers[0].priceMad} د.م</span>
                        <span className="text-xs bg-[#E8F0ED] text-[#0B6B5C] px-2.5 py-1 rounded-full font-medium">اكتشفي</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 9. WHATSAPP + NAV */}
          {WHATSAPP && (
            <a
              href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`مرحبا، لدي استفسار عن طلبي رقم ${orderId}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-bold py-4 rounded-2xl hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle size={18} aria-hidden />
              تواصلي معنا عبر واتساب
            </a>
          )}

          <div className="flex gap-3 pb-8">
            <Link href="/collections" className="flex-1 text-center bg-[#0B6B5C] text-white font-bold py-3 rounded-2xl hover:bg-[#0a5e50] transition-colors text-sm">
              اكتشفي منتجاتنا
            </Link>
            <Link href="/" className="flex-1 text-center bg-white border border-[#D5E0DC] text-[#1A2332] font-medium py-3 rounded-2xl hover:bg-[#F7FAF9] transition-colors text-sm">
              الصفحة الرئيسية
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
