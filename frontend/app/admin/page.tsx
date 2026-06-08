"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  adminFetch,
  adminLogin,
  clearAdminSession,
  getAdminToken,
  getAdminUser,
  type CapiLog,
  type CapiLogsResponse,
  type MetricsResponse,
  type OrderDetail,
  type OrderSummary,
  type OrdersListResponse,
} from "@/lib/admin-api";
import { MARKET } from "@/config/market";
import { LandingPagesPanel } from "@/components/admin/LandingPagesPanel";
import { WhatsAppPanel } from "@/components/admin/WhatsAppPanel";

const asNumber = (n: number | null | undefined) =>
  Number.isFinite(n) ? Number(n) : 0;
const MAD = (n: number | null | undefined) =>
  `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(asNumber(n))} ${MARKET.currency}`;
const PCT = (n: number | null | undefined) => `${asNumber(n).toFixed(2)}%`;

const STATUSES = [
  "new",
  "sent_to_sheet",
  "confirmation_sent",
  "contacted",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
  "no_answer",
  "returned",
  "sheet_failed",
];

type Tab = "dashboard" | "orders" | "whatsapp" | "capi-logs" | "landing-pages";
type TrafficMode = "clean" | "all";

function today(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusClass(status: string) {
  if (["confirmed", "shipped", "delivered"].includes(status)) {
    return "bg-emerald-50 text-emerald-700 ring-emerald-200";
  }
  if (["cancelled", "returned", "no_answer", "sheet_failed"].includes(status)) {
    return "bg-red-50 text-red-700 ring-red-200";
  }
  if (status === "contacted") return "bg-amber-50 text-amber-700 ring-amber-200";
  return "bg-slate-100 text-slate-700 ring-slate-200";
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
      {label}
    </div>
  );
}

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, setCurrentUser] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [start, setStart] = useState(() => today(-30));
  const [end, setEnd] = useState(() => today());
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [traffic, setTraffic] = useState<TrafficMode>("clean");
  const [page, setPage] = useState(1);
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [ordersTotal, setOrdersTotal] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [notesDraft, setNotesDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [savingOrder, setSavingOrder] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capiLogs, setCapiLogs] = useState<CapiLog[]>([]);
  const [capiTotal, setCapiTotal] = useState(0);
  const [capiSuccessCount, setCapiSuccessCount] = useState(0);
  const [capiFailCount, setCapiFailCount] = useState(0);
  const [capiPage, setCapiPage] = useState(1);
  const [capiPlatform, setCapiPlatform] = useState("all");
  const [capiSuccess, setCapiSuccess] = useState("all");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const pageSize = 25;

  useEffect(() => {
    const hasToken = !!getAdminToken();
    setAuthed(hasToken);
    setCurrentUser(getAdminUser());
    setReady(true);
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const metricsParams = new URLSearchParams({ start, end });
      const ordersParams = new URLSearchParams({
        start,
        end,
        status,
        search,
        traffic,
        page: String(page),
        page_size: String(pageSize),
      });
      const [metricsRes, ordersRes] = await Promise.all([
        adminFetch<MetricsResponse>(`/admin/metrics?${metricsParams.toString()}`),
        adminFetch<OrdersListResponse>(`/admin/orders?${ordersParams.toString()}`),
      ]);
      setMetrics(metricsRes);
      setOrders(ordersRes.items);
      setOrdersTotal(ordersRes.total);
    } catch (err) {
      setError((err as Error).message);
      if (!getAdminToken()) {
        setAuthed(false);
        setCurrentUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [end, page, search, start, status, traffic]);

  const loadCapiLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ start, end, page: String(capiPage), page_size: "50" });
      if (capiPlatform !== "all") params.set("platform", capiPlatform);
      if (capiSuccess !== "all") params.set("success", capiSuccess);
      const res = await adminFetch<CapiLogsResponse>(`/admin/capi-logs?${params.toString()}`);
      setCapiLogs(res.items);
      setCapiTotal(res.total);
      setCapiSuccessCount(res.success_count);
      setCapiFailCount(res.fail_count);
    } catch (err) {
      setError((err as Error).message);
      if (!getAdminToken()) {
        setAuthed(false);
        setCurrentUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [start, end, capiPage, capiPlatform, capiSuccess]);

  useEffect(() => {
    if (authed && tab !== "capi-logs" && tab !== "landing-pages" && tab !== "whatsapp") load();
  }, [authed, load, tab]);

  useEffect(() => {
    if (authed && tab === "capi-logs") loadCapiLogs();
  }, [authed, tab, loadCapiLogs]);

  const summary = metrics?.summary;
  const maxDaily = Math.max(
    1,
    ...(metrics?.timeseries || []).map((d) => Math.max(d.clicks, d.orders))
  );
  const totalPages = Math.max(1, Math.ceil(ordersTotal / pageSize));

  const cards = useMemo(
    () =>
      summary
        ? [
            {
              label: "Revenue",
              value: MAD(summary.revenue_mad),
              hint: `AOV ${MAD(summary.aov_mad)} · RPV ${MAD(summary.revenue_per_visitor_mad)}`,
            },
            {
              label: "Orders",
              value: summary.total_orders.toLocaleString(),
              hint: `${summary.confirmed_orders} confirmed · ${summary.delivered_orders} delivered`,
            },
            {
              label: "Conversion",
              value: PCT(summary.conversion_rate),
              hint: "clean Morocco orders / clean Morocco clicks",
            },
            {
              label: "Clean clicks",
              value: summary.total_clicks.toLocaleString(),
              hint: `${summary.unique_visitors} visitors · ${summary.blocked_clicks} blocked`,
            },
            {
              label: "Delivery rate",
              value: PCT(summary.delivery_rate),
              hint: `${PCT(summary.confirm_rate)} confirmed rate`,
            },
            {
              label: "Bad outcomes",
              value: summary.cancelled_orders.toLocaleString(),
              hint: "cancelled, returned, or no answer",
            },
          ]
        : [],
    [summary]
  );

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const session = await adminLogin(username.trim(), password);
      setAuthed(true);
      setCurrentUser(session.username);
      setPassword("");
    } catch (err) {
      setError((err as Error).message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAdminSession();
    setAuthed(false);
    setCurrentUser(null);
    setMetrics(null);
    setOrders([]);
    setSelectedOrder(null);
  };

  const applyPreset = (days: number) => {
    setStart(today(-days));
    setEnd(today());
    setPage(1);
  };

  const openOrder = async (orderNumber: string) => {
    setDetailLoading(true);
    setError(null);
    try {
      const detail = await adminFetch<OrderDetail>(`/admin/orders/${orderNumber}`);
      setSelectedOrder(detail);
      setNotesDraft(detail.admin_notes || "");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setDetailLoading(false);
    }
  };

  const updateStatus = async (
    orderNumber: string,
    nextStatus: string,
    adminNotes?: string
  ) => {
    setSavingOrder(orderNumber);
    setError(null);
    try {
      await adminFetch(`/admin/orders/${orderNumber}`, {
        method: "PATCH",
        body: JSON.stringify({ status: nextStatus, admin_notes: adminNotes }),
      });
      setOrders((items) =>
        items.map((item) =>
          item.order_number === orderNumber ? { ...item, status: nextStatus } : item
        )
      );
      if (selectedOrder?.order_number === orderNumber) {
        setSelectedOrder({
          ...selectedOrder,
          status: nextStatus,
          admin_notes: adminNotes ?? selectedOrder.admin_notes,
        });
      }
      await load();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSavingOrder(null);
    }
  };

  if (!ready) {
    return <main className="p-6 text-sm text-slate-500">Loading admin...</main>;
  }

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl border border-white/10 bg-white p-7 shadow-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
            Lamis Beauty
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-slate-950">Admin dashboard</h1>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to review COD performance, clean Morocco traffic, and orders.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Username</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                required
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                required
              />
            </label>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <header className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
          <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold sm:text-4xl">
                Lamis Beauty admin
              </h1>
            </div>
            <div className="flex flex-wrap items-end gap-3">
              {[7, 30, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => applyPreset(days)}
                  className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10"
                >
                  {days}D
                </button>
              ))}
              <label className="text-xs text-slate-300">
                Start
                <input
                  type="date"
                  value={start}
                  onChange={(event) => {
                    setStart(event.target.value);
                    setPage(1);
                  }}
                  className="mt-1 block rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
                />
              </label>
              <label className="text-xs text-slate-300">
                End
                <input
                  type="date"
                  value={end}
                  onChange={(event) => {
                    setEnd(event.target.value);
                    setPage(1);
                  }}
                  className="mt-1 block rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
                />
              </label>
              <button
                onClick={load}
                disabled={loading}
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-100 disabled:opacity-60"
              >
                {loading ? "Loading..." : "Refresh"}
              </button>
              <button
                onClick={logout}
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-900"
              >
                Logout
              </button>
            </div>
          </div>
          <nav className="flex border-t border-white/10 bg-white/5 px-3">
            {(["dashboard", "orders", "whatsapp", "landing-pages"] as Tab[]).map((item) => (
              <button
                key={item}
                onClick={() => setTab(item)}
                className={`px-4 py-3 text-sm font-semibold capitalize ${
                  tab === item
                    ? "border-b-2 border-emerald-300 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </header>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {tab === "dashboard" && (
          <>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {cards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-semibold tabular-nums text-slate-950">
                    {card.value}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">{card.hint}</p>
                </div>
              ))}
            </section>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-950">Daily performance</h2>
                    <p className="text-xs text-slate-500">Clicks, orders, revenue, and CVR.</p>
                  </div>
                  {loading && <span className="text-xs text-slate-400">Refreshing...</span>}
                </div>
                <div className="mt-5 space-y-3">
                  {metrics?.timeseries.length ? (
                    metrics.timeseries.map((day) => (
                      <div key={day.date} className="grid grid-cols-12 items-center gap-3">
                        <div className="col-span-3 text-xs font-medium text-slate-500">
                          {day.date.slice(5)}
                        </div>
                        <div className="col-span-6 h-3 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{ width: `${Math.max(4, (day.clicks / maxDaily) * 100)}%` }}
                          />
                        </div>
                        <div className="col-span-3 text-right text-xs tabular-nums text-slate-600">
                          {day.orders} orders · {PCT(day.conversion_rate)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <EmptyState label="No performance data for this range." />
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-slate-950">Order statuses</h2>
                <div className="mt-4 space-y-3">
                  {metrics?.status_breakdown.length ? (
                    metrics.status_breakdown.map((row) => (
                      <div key={row.status} className="flex items-center justify-between">
                        <span className={`rounded-full px-2.5 py-1 text-xs ring-1 ${statusClass(row.status)}`}>
                          {row.status}
                        </span>
                        <span className="text-sm font-semibold tabular-nums">{row.count}</span>
                      </div>
                    ))
                  ) : (
                    <EmptyState label="No orders yet." />
                  )}
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              <BreakdownCard
                title="Traffic sources"
                subtitle="Clean clicks and orders by source."
                rows={(metrics?.utm_breakdown || []).map((row) => ({
                  key: row.source,
                  label: row.source || "direct",
                  value: `${row.clicks} clicks`,
                  hint: `${row.orders} orders · ${MAD(row.revenue)} · ${PCT(row.cvr)}`,
                }))}
              />
              <BreakdownCard
                title="Top products"
                subtitle="Revenue from clean Morocco orders."
                rows={(metrics?.product_breakdown || []).map((row) => ({
                  key: row.product_id,
                  label: row.product_name_ar,
                  value: MAD(row.revenue),
                  hint: `${row.orders} orders · ${row.units_sold} units`,
                }))}
              />
              <BreakdownCard
                title="Blocked traffic"
                subtitle="Invalid, non-Morocco, VPN, or proxy clicks."
                rows={(metrics?.invalid_reasons || []).map((row) => ({
                  key: row.reason,
                  label: row.reason,
                  value: row.count.toLocaleString(),
                  hint: "blocked clicks",
                }))}
              />
            </section>
          </>
        )}

        {tab === "orders" && (
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="space-y-4 border-b border-slate-100 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">Orders</h2>
                  <p className="text-xs text-slate-500">
                    Showing {orders.length} of {ordersTotal} orders in range.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <input
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    placeholder="Search order, name, phone..."
                    className="w-64 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                  />
                  <select
                    value={status}
                    onChange={(event) => {
                      setStatus(event.target.value);
                      setPage(1);
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="all">All statuses</option>
                    {STATUSES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  <select
                    value={traffic}
                    onChange={(event) => {
                      setTraffic(event.target.value as TrafficMode);
                      setPage(1);
                    }}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="clean">Clean Morocco only</option>
                    <option value="all">All orders</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3 text-left">Order</th>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Phone</th>
                    <th className="px-4 py-3 text-right">Total</th>
                    <th className="px-4 py-3 text-left">Source</th>
                    <th className="px-4 py-3 text-left">Geo</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-right">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-12 text-center text-slate-400">
                        {loading ? "Loading orders..." : "No orders found."}
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-t border-slate-100 hover:bg-slate-50/70">
                        <td className="px-4 py-3 font-semibold tabular-nums text-emerald-700">
                          {order.order_number}
                        </td>
                        <td className="px-4 py-3 text-slate-700" dir="auto">
                          {order.customer_name}
                        </td>
                        <td className="px-4 py-3 tabular-nums text-slate-600">
                          {order.phone_e164 || order.phone_digits}
                        </td>
                        <td className="px-4 py-3 text-right font-medium tabular-nums">
                          {MAD(order.total_mad)}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          <div>{order.utm_source || "direct"}</div>
                          {order.utm_campaign && (
                            <div className="text-xs text-slate-400">{order.utm_campaign}</div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
                              order.geo_is_valid
                                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                                : "bg-slate-100 text-slate-600 ring-slate-200"
                            }`}
                          >
                            {order.country_code || "unknown"}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-slate-500">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={order.status}
                            disabled={savingOrder === order.order_number}
                            onChange={(event) =>
                              updateStatus(order.order_number, event.target.value)
                            }
                            className={`rounded-lg px-2 py-1.5 text-xs font-medium ring-1 ${statusClass(order.status)}`}
                          >
                            {STATUSES.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => openOrder(order.order_number)}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-slate-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="rounded-lg border border-slate-200 px-3 py-1.5 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </section>
        )}

        {tab === "whatsapp" && <WhatsAppPanel />}

        {tab === "landing-pages" && <LandingPagesPanel />}
      </div>

      {(selectedOrder || detailLoading) && (
        <OrderDrawer
          order={selectedOrder}
          loading={detailLoading}
          notesDraft={notesDraft}
          setNotesDraft={setNotesDraft}
          saving={savingOrder === selectedOrder?.order_number}
          onClose={() => setSelectedOrder(null)}
          onStatus={(nextStatus) =>
            selectedOrder && updateStatus(selectedOrder.order_number, nextStatus, notesDraft)
          }
        />
      )}
    </main>
  );
}

function BreakdownCard({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: { key: string; label: string; value: string; hint: string }[];
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-950">{title}</h2>
      <p className="text-xs text-slate-500">{subtitle}</p>
      <div className="mt-4 space-y-3">
        {rows.length ? (
          rows.map((row) => (
            <div key={row.key} className="rounded-2xl bg-slate-50 p-3">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-slate-800" dir="auto">
                  {row.label}
                </p>
                <p className="whitespace-nowrap text-sm font-semibold tabular-nums text-slate-950">
                  {row.value}
                </p>
              </div>
              <p className="mt-1 text-xs text-slate-500">{row.hint}</p>
            </div>
          ))
        ) : (
          <EmptyState label="No data for this range." />
        )}
      </div>
    </div>
  );
}

function OrderDrawer({
  order,
  loading,
  notesDraft,
  setNotesDraft,
  saving,
  onClose,
  onStatus,
}: {
  order: OrderDetail | null;
  loading: boolean;
  notesDraft: string;
  setNotesDraft: (value: string) => void;
  saving: boolean;
  onClose: () => void;
  onStatus: (status: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 p-2 sm:p-4">
      <aside className="h-full w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 p-5 backdrop-blur">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Order preview
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">
              {order?.order_number || "Loading..."}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold"
          >
            Close
          </button>
        </div>

        {loading || !order ? (
          <div className="p-6 text-sm text-slate-500">Loading order details...</div>
        ) : (
          <div className="space-y-5 p-5">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <InfoTile label="Customer" value={order.customer.name} />
              <InfoTile
                label="Phone"
                value={order.customer.phone_e164 || order.customer.phone_digits}
              />
              <InfoTile label="Total" value={MAD(order.totals.total_mad)} />
            </div>

            <div className="rounded-3xl border border-slate-200 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-950">Fulfillment</h3>
                  <p className="text-xs text-slate-500">
                    Created {formatDate(order.created_at)} · Updated {formatDate(order.updated_at)}
                  </p>
                </div>
                <select
                  value={order.status}
                  disabled={saving}
                  onChange={(event) => onStatus(event.target.value)}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold ring-1 ${statusClass(order.status)}`}
                >
                  {STATUSES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <label className="mt-4 block">
                <span className="text-sm font-medium text-slate-700">Admin notes</span>
                <textarea
                  value={notesDraft}
                  onChange={(event) => setNotesDraft(event.target.value)}
                  rows={4}
                  className="mt-1 w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                  placeholder="Call result, delivery note, customer request..."
                />
              </label>
              <button
                onClick={() => onStatus(order.status)}
                disabled={saving}
                className="mt-3 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save notes"}
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-950">Items</h3>
              <div className="mt-3 space-y-3">
                {order.items.map((item) => (
                  <div
                    key={`${item.product_id}-${item.offer_id}-${item.source}`}
                    className="rounded-2xl bg-slate-50 p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900" dir="auto">
                          {item.product_name_ar}
                        </p>
                        <p className="text-xs text-slate-500">
                          Offer {item.offer_id} · Qty {item.quantity} · Units {item.unit_count}
                        </p>
                      </div>
                      <p className="font-semibold tabular-nums">{MAD(item.price_mad)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <DetailBlock
                title="Attribution"
                rows={[
                  ["Source", order.attribution.utm_source || "direct"],
                  ["Campaign", order.attribution.utm_campaign || "-"],
                  ["Medium", order.attribution.utm_medium || "-"],
                  ["Landing page", order.attribution.landing_page || "-"],
                  ["TTCLID", order.attribution.ttclid || "-"],
                  ["FBC", order.attribution.fbc || "-"],
                ]}
              />
              <DetailBlock
                title="Geo and fraud"
                rows={[
                  ["Country", order.geo.country_code || "unknown"],
                  ["Clean Morocco", order.geo.is_valid ? "yes" : "no"],
                  ["VPN", order.geo.is_vpn ? "yes" : "no"],
                  ["Proxy", order.geo.is_proxy ? "yes" : "no"],
                  ["Reason", order.geo.block_reason || "-"],
                  ["Client IP", order.client_ip || "-"],
                ]}
              />
            </div>

            <div className="rounded-3xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-950">Tracking events</h3>
              <div className="mt-3 space-y-2">
                {order.tracking_events.length ? (
                  order.tracking_events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {event.platform} · {event.event_name}
                        </p>
                        <p className="text-xs text-slate-500">{formatDate(event.created_at)}</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ring-1 ${
                          event.success
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                            : "bg-red-50 text-red-700 ring-red-200"
                        }`}
                      >
                        {event.status_code || "-"}
                      </span>
                    </div>
                  ))
                ) : (
                  <EmptyState label="No tracking events logged." />
                )}
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 font-semibold text-slate-950" dir="auto">
        {value}
      </p>
    </div>
  );
}

function DetailBlock({
  title,
  rows,
}: {
  title: string;
  rows: [string, string][];
}) {
  return (
    <div className="rounded-3xl border border-slate-200 p-4">
      <h3 className="font-semibold text-slate-950">{title}</h3>
      <div className="mt-3 space-y-2">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-3 text-sm">
            <span className="w-28 shrink-0 text-slate-500">{label}</span>
            <span className="min-w-0 break-words font-medium text-slate-800" dir="auto">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
