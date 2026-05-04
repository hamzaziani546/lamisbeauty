import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin · Lamis Beauty",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" className="min-h-screen bg-slate-50 text-slate-900 admin-root">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
