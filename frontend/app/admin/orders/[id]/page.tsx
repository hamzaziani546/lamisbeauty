"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Globe,
  Clock,
  Save,
  Loader2,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { adminFetch, type OrderDetail } from "@/lib/admin-api";
import { StatusBadge } from "@/components/admin/StatusBadge";

const SAR = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(n) + " SAR";

const STATUS_OPTIONS = [
  "new",
  "sent_to_sheet",
  "contacted",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "no_answer",
  "returned",
  "sheet_failed",
];

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await adminFetch<OrderDetail>(`/admin/orders/${id}`);
      setOrder(data);
      setStatus(data.status);
      setNotes(data.admin_notes || "");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!order) return;
    setSaving(true);
    setError(null);
    try {
      await adminFetch(`/admin/orders/${order.order_number}`, {
        method: "PATCH",
        body: JSON.stringify({ status, admin_notes: notes }),
      });
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1500);
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  if (loading && !order) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-400">
        <Loader2 size={18} className="animate-spin mr-2" /> Loading order…
      </div>
    );
  }
  if (!order) {
    return (
      <div className="text-slate-500">
        Order not found.{" "}
        <Link className="text-emerald-700 underline" href="/admin/orders">
          Back to orders
        </Link>
      </div>
    );
  }

  const phoneIntl = order.customer.phone_e164.replace("+", "");
  const waLink = `https://wa.me/${phoneIntl}`;
  const telLink = `tel:${order.customer.phone_e164}`;

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => router.push("/admin/orders")}
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft size={16} /> All orders
        </button>
        <p className="text-xs text-slate-400">
          Last updated {new Date(order.updated_at).toLocaleString()}
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2">
          {error}
        </div>
      )}

      {/* Header card */}
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Order
            </p>
            <h1 className="text-2xl font-semibold text-slate-900 tabular-nums">
              {order.order_number}
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <Clock size={12} />
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge status={order.status} />
            <p className="text-3xl font-semibold text-slate-900 tabular-nums">
              {SAR(order.totals.total_sar)}
            </p>
            <p className="text-xs text-slate-500 uppercase">
              {order.payment_method.toUpperCase()}
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">
              Customer
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-lg font-medium text-slate-900" dir="auto">
                  {order.customer.name}
                </p>
                <p className="text-sm text-slate-500 tabular-nums mt-1">
                  {order.customer.phone_e164}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={telLink}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-md text-sm hover:bg-slate-800"
                >
                  <Phone size={14} /> Call
                </a>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700"
                >
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* Items */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">
              Items ({order.items.length})
            </h2>
            <div className="divide-y divide-slate-100">
              {order.items.map((it, idx) => (
                <div
                  key={idx}
                  className="py-3 flex items-start justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800" dir="auto">
                      {it.product_name_ar}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      <span className="font-mono">{it.product_id}</span> · offer{" "}
                      <span className="font-mono">{it.offer_id}</span> · qty{" "}
                      {it.quantity} × {it.unit_count} units · src {it.source}
                    </p>
                  </div>
                  <p className="font-medium text-slate-900 tabular-nums whitespace-nowrap">
                    {SAR(it.price_sar)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 mt-4 pt-4 space-y-1.5 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="tabular-nums">
                  {SAR(order.totals.subtotal_sar)}
                </span>
              </div>
              {order.totals.discount_sar > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Discount</span>
                  <span className="tabular-nums text-emerald-700">
                    -{SAR(order.totals.discount_sar)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-semibold text-slate-900 pt-2 border-t border-slate-100">
                <span>Total</span>
                <span className="tabular-nums">
                  {SAR(order.totals.total_sar)}
                </span>
              </div>
            </div>
          </section>

          {/* Tracking events */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">
              Server-side tracking
            </h2>
            {order.tracking_events.length === 0 ? (
              <p className="text-sm text-slate-400">
                No tracking events recorded.
              </p>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-slate-400">
                  <tr>
                    <th className="text-left py-1">Platform</th>
                    <th className="text-left py-1">Event</th>
                    <th className="text-right py-1">Status</th>
                    <th className="text-left py-1">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {order.tracking_events.map((t) => (
                    <tr key={t.id} className="border-t border-slate-100">
                      <td className="py-2 capitalize">{t.platform}</td>
                      <td className="py-2 font-mono text-xs">{t.event_name}</td>
                      <td className="py-2 text-right tabular-nums">
                        {t.status_code ?? "-"}
                      </td>
                      <td
                        className={`py-2 ${
                          t.success ? "text-emerald-700" : "text-rose-700"
                        }`}
                      >
                        {t.success ? "ok" : "failed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>

        {/* Side */}
        <div className="space-y-6">
          {/* Update */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 sticky top-4">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">
              Update order
            </h2>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-white mb-4"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Internal notes
            </label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes from confirmation call, address details, etc."
              className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm mb-4"
            />
            <button
              onClick={save}
              disabled={saving}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-medium py-2 rounded-md flex items-center justify-center gap-2 text-sm"
            >
              {saving ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              Save changes
            </button>
            {savedFlash && (
              <p className="text-xs text-emerald-600 text-center mt-2">
                Saved.
              </p>
            )}
          </section>

          {/* Risk / IP */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">
              Risk & origin
            </h2>
            <div className="space-y-2 text-sm">
              <Row label="Country" value={order.country_code || "—"} />
              <Row label="Client IP" value={order.client_ip || "—"} mono />
              <Row label="Event ID" value={order.event_id} mono />
              <div className="flex items-center gap-2 pt-1">
                {order.country_code === "SA" ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <ShieldCheck size={12} /> KSA verified
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    <ShieldAlert size={12} /> Non-KSA / unknown
                  </span>
                )}
              </div>
              <details className="text-xs text-slate-500 pt-2">
                <summary className="cursor-pointer hover:text-slate-700">
                  User agent
                </summary>
                <p className="mt-1 break-all">{order.user_agent || "—"}</p>
              </details>
            </div>
          </section>

          {/* Attribution */}
          <section className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">
              Attribution
            </h2>
            <div className="space-y-2 text-sm">
              <Row
                label="Landing"
                value={order.attribution.landing_page || "—"}
                icon={<Globe size={12} />}
              />
              <Row
                label="utm_source"
                value={order.attribution.utm_source || "direct"}
              />
              <Row
                label="utm_medium"
                value={order.attribution.utm_medium || "—"}
              />
              <Row
                label="utm_campaign"
                value={order.attribution.utm_campaign || "—"}
              />
              <Row
                label="utm_content"
                value={order.attribution.utm_content || "—"}
              />
              <Row label="fbp" value={order.attribution.fbp || "—"} mono />
              <Row label="fbc" value={order.attribution.fbc || "—"} mono />
              <Row label="ttclid" value={order.attribution.ttclid || "—"} mono />
              <Row
                label="sc_click_id"
                value={order.attribution.sc_click_id || "—"}
                mono
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
  icon,
}: {
  label: string;
  value: string;
  mono?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-xs uppercase tracking-wide text-slate-400 flex items-center gap-1 shrink-0">
        {icon}
        {label}
      </span>
      <span
        className={`text-right text-slate-700 break-all ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}
