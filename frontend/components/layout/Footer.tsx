"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessageCircle, Mail, ChevronDown } from "lucide-react";
import { useState } from "react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export function Footer() {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (pathname?.startsWith("/admin")) return null;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer
      className="bg-[#1A2332] text-white mt-20"
      dir="rtl"
      aria-label="تذييل الصفحة"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {/* Brand */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/brand/lamis-logo-mark-v2.webp"
                alt="لاميس"
                width={40}
                height={40}
                sizes="40px"
                className="w-10 h-10 object-contain shrink-0"
              />
              <div>
                <p className="font-bold text-base leading-tight">لاميس</p>
                <p className="text-[#5A6A72] text-xs">مكملات جمال مصرحة من ONSSA</p>
              </div>
            </div>
            <p className="text-sm text-[#5A6A72] leading-relaxed">
              مكملات جمال مغربية مصرحة من ONSSA. جرعات بحثية واضحة، دفع عند الاستلام، توصيل سريع لكل المغرب، وضمان 30 يوم.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              {WHATSAPP && (
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-[#1ebe5d] transition-colors w-fit"
                >
                  <MessageCircle size={16} aria-hidden />
                  دعم واتساب
                </a>
              )}
            </div>
          </div>

          {/* Products */}
          <div className="border-t border-[#5A6A72]/30 md:border-none pt-4 md:pt-0">
            <button
              onClick={() => toggleSection("products")}
              className="flex items-center justify-between w-full md:cursor-default"
              aria-expanded={openSection === "products"}
            >
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#C9A45C] md:mb-4">
                منتجاتنا
              </h3>
              <ChevronDown
                size={18}
                className={`text-[#C9A45C] md:hidden transition-transform ${
                  openSection === "products" ? "rotate-180" : ""
                }`}
              />
            </button>
            <ul
              className={`space-y-3 text-sm text-[#5A6A72] mt-4 md:mt-0 md:block overflow-hidden transition-all duration-300 ${
                openSection === "products" ? "max-h-60 opacity-100" : "max-h-0 opacity-0 md:max-h-full md:opacity-100"
              }`}
            >
              <li>
                <Link
                  href="/products/lutein-eye-glow-gummies"
                  className="hover:text-white hover:-translate-x-1 transition-all duration-300 block"
                >
                  علكات شوت العين باللوتين
                </Link>
              </li>
              <li>
                <Link
                  href="/products/collagen-glow-gummies"
                  className="hover:text-white hover:-translate-x-1 transition-all duration-300 block"
                >
                  علكات الكولاجين بفيتامين C والزنك
                </Link>
              </li>
              <li>
                <Link
                  href="/products/chlorophyll-gummies"
                  className="hover:text-white hover:-translate-x-1 transition-all duration-300 block"
                >
                  علكات الكلوروفيل
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="hover:text-white hover:-translate-x-1 transition-all duration-300 block"
                >
                  جميع المنتجات
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="border-t border-[#5A6A72]/30 md:border-none pt-4 md:pt-0">
            <button
              onClick={() => toggleSection("support")}
              className="flex items-center justify-between w-full md:cursor-default"
              aria-expanded={openSection === "support"}
            >
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#C9A45C] md:mb-4">
                الدعم والمعلومات
              </h3>
              <ChevronDown
                size={18}
                className={`text-[#C9A45C] md:hidden transition-transform ${
                  openSection === "support" ? "rotate-180" : ""
                }`}
              />
            </button>
            <ul
              className={`space-y-3 text-sm text-[#5A6A72] mt-4 md:mt-0 md:block overflow-hidden transition-all duration-300 ${
                openSection === "support" ? "max-h-60 opacity-100" : "max-h-0 opacity-0 md:max-h-full md:opacity-100"
              }`}
            >
              <li>
                <Link href="/shipping" className="hover:text-white hover:-translate-x-1 transition-all duration-300 block">
                  سياسة الشحن
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white hover:-translate-x-1 transition-all duration-300 block">
                  الاستبدال والإرجاع
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white hover:-translate-x-1 transition-all duration-300 block">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:-translate-x-1 transition-all duration-300 block">
                  الشروط والأحكام
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:-translate-x-1 transition-all duration-300 block">
                  تواصل معنا
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="mailto:contact@lamisbeauty.shop"
                  className="inline-flex items-center gap-2 text-[#5A6A72] hover:text-white transition-colors text-sm w-fit"
                >
                  <Mail size={16} aria-hidden />
                  contact@lamisbeauty.shop
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#5A6A72]/30 mt-10 pt-6 text-center text-xs text-[#5A6A72]">
          <p suppressHydrationWarning>© {new Date().getFullYear()} لاميس. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
