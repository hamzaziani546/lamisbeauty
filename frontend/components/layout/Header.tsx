"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X, ShieldCheck, Truck, Gift } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/collections", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

const ANNOUNCEMENTS = [
  { text: "ضمان لاميس الذهبي: استرجاع خلال 30 يوم بدون أسئلة", icon: ShieldCheck },
  { text: "الدفع عند الاستلام متاح لجميع مدن المملكة", icon: Truck },
  { text: "توصيل سريع: 1-2 أيام للمدن الرئيسية", icon: Truck },
  { text: "اطلبي الآن واحصلي على خصم خاص للكميات", icon: Gift },
];

export function Header() {
  const { itemCount, openCart } = useCartStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const count = mounted ? itemCount() : 0;
  
  // Safe fallback if not mounted yet
  const CurrentIcon = mounted ? ANNOUNCEMENTS[announcementIndex].icon : ANNOUNCEMENTS[0].icon;
  const currentText = mounted ? ANNOUNCEMENTS[announcementIndex].text : ANNOUNCEMENTS[0].text;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#8F3F55] text-white text-xs sm:text-sm font-bold py-2.5 px-4 text-center flex items-center justify-center gap-2 overflow-hidden relative">
        <div 
          key={mounted ? announcementIndex : 'initial'}
          className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <CurrentIcon size={16} />
          {currentText}
        </div>
      </div>

      <header
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E8DAD6] shadow-sm"
        dir="rtl"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="لاميس للجمال - الرئيسية"
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#8F3F55] flex items-center justify-center shrink-0 group-hover:bg-[#7a3549] transition-colors shadow-sm"
              aria-hidden
            >
              <span className="text-white font-bold text-lg sm:text-xl leading-none">
                ل
              </span>
            </div>
            <div>
              <p className="font-bold text-[#251F20] text-base sm:text-lg leading-tight group-hover:text-[#8F3F55] transition-colors">
                لاميس للجمال
              </p>
              <p className="text-[#6F6262] text-xs leading-tight">Lamis Beauty</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="القائمة الرئيسية">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#251F20] hover:text-[#8F3F55] font-bold transition-colors text-[15px]"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              aria-label={`فتح سلة التسوق${count > 0 ? ` - ${count} منتج` : ""}`}
              className="relative p-2.5 rounded-full hover:bg-[#F7E8E6] transition-colors"
            >
              <ShoppingBag size={22} className="text-[#251F20]" aria-hidden />
              {count > 0 && (
                <span
                  className="absolute top-0 right-0 w-5 h-5 bg-[#8F3F55] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
                  aria-hidden
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2.5 rounded-full hover:bg-[#F7E8E6] transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={22} className="text-[#251F20]" aria-hidden />
              ) : (
                <Menu size={22} className="text-[#251F20]" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav
            className="md:hidden bg-white border-t border-[#E8DAD6] px-4 py-3 shadow-lg absolute w-full"
            aria-label="قائمة الجوال"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-[#251F20] hover:text-[#8F3F55] font-bold border-b border-[#E8DAD6] last:border-0 text-right transition-colors text-lg"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
