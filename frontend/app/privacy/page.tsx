import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية لموقع لاميس.",
};

export default function PrivacyPage() {
  return (
    <div dir="rtl" className="bg-[#F7FAF9] min-h-screen py-16">
      <div className="container-padded max-w-3xl">
        <h1 className="text-3xl font-bold text-[#1A2332] mb-2">سياسة الخصوصية</h1>
        <p className="text-sm text-[#5A6A72] mb-8">آخر تحديث: 2026</p>

        <div className="bg-white rounded-3xl p-8 border border-[#D5E0DC] shadow-sm space-y-6">
          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">ما المعلومات التي نجمعها؟</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              عند إتمام الطلب، نجمع اسمك ورقم جوالك لتأكيد الطلب والتواصل معك
              بشأن الشحن والتوصيل. لا نطلب بيانات بطاقة بنكية لأن الدفع عند
              الاستلام.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">البكسلات الإعلانية وCAPI</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              نستخدم بكسلات Meta وTikTok وSnapchat لقياس فعالية الإعلانات.
              هذه البكسلات تجمع بيانات مجهولة الهوية عن سلوك التصفح. بيانات
              العملاء (رقم الجوال) لا تُرسل مباشرة لمنصات الإعلان — يتم
              تشفيرها أولاً بخوارزمية SHA-256 قبل الإرسال.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">كيف نستخدم معلوماتك؟</h2>
            <ul className="text-[#5A6A72] text-sm leading-relaxed space-y-2 list-disc list-inside">
              <li>تأكيد طلبك والتواصل معك قبل الشحن.</li>
              <li>تحسين تجربتك على الموقع.</li>
              <li>قياس نتائج الحملات الإعلانية (بصورة مشفرة).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">مشاركة البيانات</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              لا نبيع أو نؤجر بياناتك لأطراف خارجية. قد نشارك معلومات التوصيل
              مع شركاء الشحن لأغراض التوصيل فقط.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#1A2332] mb-3">حقوقك</h2>
            <p className="text-[#5A6A72] text-sm leading-relaxed">
              يمكنك التواصل معنا لطلب حذف بياناتك أو الاستفسار عن استخدامها
              عبر صفحة التواصل.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
