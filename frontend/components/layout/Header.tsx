"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
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

  if (pathname?.startsWith("/admin")) return null;

  const count = mounted ? itemCount() : 0;
  
  // Safe fallback if not mounted yet
  const CurrentIcon = mounted ? ANNOUNCEMENTS[announcementIndex].icon : ANNOUNCEMENTS[0].icon;
  const currentText = mounted ? ANNOUNCEMENTS[announcementIndex].text : ANNOUNCEMENTS[0].text;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#0B6B5C] text-white text-xs sm:text-sm font-bold py-2.5 px-4 text-center flex items-center justify-center gap-2 overflow-hidden relative">
        <div 
          key={mounted ? announcementIndex : 'initial'}
          className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <CurrentIcon size={16} />
          {currentText}
        </div>
      </div>

      <header
        className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#D5E0DC] shadow-sm"
        dir="rtl"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group"
            aria-label="لاميس - الرئيسية"
          >
            <img
              src="/brand/lamis-logo-mark.webp"
              alt=""
              aria-hidden
              width={56}
              height={56}
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain shrink-0"
            />
            <div>
              <p className="font-bold text-[#1A2332] text-base sm:text-lg leading-tight group-hover:text-[#0B6B5C] transition-colors">
                لاميس
              </p>
              <p className="text-[#5A6A72] text-xs leading-tight">مكملات جمال بمعايير صيدلانية</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="القائمة الرئيسية">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-[#1A2332] hover:text-[#0B6B5C] font-bold transition-colors text-[15px]"
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
              className="relative p-2.5 rounded-full hover:bg-[#E8F0ED] transition-colors"
            >
              <ShoppingBag size={22} className="text-[#1A2332]" aria-hidden />
              {count > 0 && (
                <span
                  className="absolute top-0 right-0 w-5 h-5 bg-[#0B6B5C] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm"
                  aria-hidden
                >
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2.5 rounded-full hover:bg-[#E8F0ED] transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={22} className="text-[#1A2332]" aria-hidden />
              ) : (
                <Menu size={22} className="text-[#1A2332]" aria-hidden />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav
            className="md:hidden bg-white border-t border-[#D5E0DC] px-4 py-3 shadow-lg absolute w-full"
            aria-label="قائمة الجوال"
          >
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 text-[#1A2332] hover:text-[#0B6B5C] font-bold border-b border-[#D5E0DC] last:border-0 text-right transition-colors text-lg"
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
