"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { clearAdminSession, getAdminToken, getAdminUser } from "@/lib/admin-api";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const t = getAdminToken();
    setAuthed(!!t);
    setUser(getAdminUser());
    if (!t && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [pathname, isLoginPage, router]);

  const logout = () => {
    clearAdminSession();
    router.replace("/admin/login");
  };

  if (isLoginPage) return <>{children}</>;
  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading…
      </div>
    );
  }
  if (!authed) return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-slate-900 text-slate-100">
        <div className="px-6 py-5 border-b border-slate-800">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Lamis Beauty
          </p>
          <p className="text-lg font-semibold">Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
          <div className="mb-2 truncate">Signed in as <span className="text-slate-200">{user}</span></div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-slate-300 hover:text-white"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="flex-1 flex flex-col">
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 rounded hover:bg-slate-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <p className="font-semibold">Lamis Admin</p>
          <button
            onClick={logout}
            className="p-2 rounded hover:bg-slate-100"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </header>

        {mobileOpen && (
          <nav className="lg:hidden bg-slate-900 text-slate-100 px-4 py-3 space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-slate-800"
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
