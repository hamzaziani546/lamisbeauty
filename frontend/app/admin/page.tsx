"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  adminFetch,
  adminLogin,
  clearAdminSession,
  getAdminToken,
  getAdminUser,
  type MetricsResponse,
  type OrderSummary,
  type OrdersListResponse,
} from "@/lib/admin-api";

const SAR = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n) + " SAR";
const PCT = (n: number) => `${n.toFixed(2)}%`;

const STATUSES = [
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

function today(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [start, setStart] = useState(() => today(-30));
  const [end, setEnd] = useState(() => today());
  const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingOrder, setSavingOrder] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      const params = new URLSearchParams({ start, end });
      const [metricsRes, ordersRes] = await Promise.all([
        adminFetch<MetricsResponse>(`/admin/metrics?${params.toString()}`),
        adminFetch<OrdersListResponse>(
          `/admin/orders?${new URLSearchParams({
            start,
            end,
            status: "all",
            page: "1",
            page_size: "50",
          }).toString()}`
        ),
      ]);
      setMetrics(metricsRes);
      setOrders(ordersRes.items);
    } catch (err) {
      setError((err as Error).message);
      if (!getAdminToken()) {
        setAuthed(false);
        setCurrentUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, [start, end]);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  const summary = metrics?.summary;

  const cards = useMemo(
    () =>
      summary
        ? [
            ["Orders", summary.total_orders.toLocaleString(), `${summary.confirmed_orders} confirmed`],
            ["Revenue", SAR(summary.revenue_sar), `AOV ${SAR(summary.aov_sar)}`],
            ["Conversion", PCT(summary.conversion_rate), "orders / clicks"],
            ["Delivery", PCT(summary.delivery_rate), `${summary.delivered_orders} delivered`],
            ["Valid clicks", summary.total_clicks.toLocaleString(), `${summary.unique_visitors} visitors`],
            ["Cancelled", summary.cancelled_orders.toLocaleString(), "cancelled / returned / no answer"],
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
  };

  const updateStatus = async (order: OrderSummary, status: string) => {
    setSavingOrder(order.order_number);
    setError(null);
    try {
      await adminFetch(`/admin/orders/${order.order_number}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setOrders((items) =>
        items.map((item) =>
          item.order_number === order.order_number ? { ...item, status } : item
        )
      );
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
      <main className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">
            Lamis Beauty
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">New admin</h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to manage COD orders.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Username</span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
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
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                required
              />
            </label>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 rounded-2xl bg-slate-950 p-5 text-white sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
            New admin
          </p>
          <h1 className="mt-2 text-3xl font-semibold">Orders dashboard</h1>
          <p className="mt-1 text-sm text-slate-300">
            Signed in as {currentUser || "admin"}
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-xs text-slate-300">
            Start
            <input
              type="date"
              value={start}
              onChange={(event) => setStart(event.target.value)}
              className="mt-1 block rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="text-xs text-slate-300">
            End
            <input
              type="date"
              value={end}
              onChange={(event) => setEnd(event.target.value)}
              className="mt-1 block rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            />
          </label>
          <button
            onClick={load}
            disabled={loading}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100 disabled:opacity-60"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button
            onClick={logout}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-900"
          >
            Logout
          </button>
        </div>
      </header>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(([label, value, hint]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-slate-950">
              {value}
            </p>
            <p className="mt-1 text-xs text-slate-400">{hint}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div>
            <h2 className="font-semibold text-slate-950">Latest orders</h2>
            <p className="text-xs text-slate-500">Showing latest 50 orders in range.</p>
          </div>
          {loading && <span className="text-xs text-slate-400">Refreshing...</span>}
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
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    {loading ? "Loading orders..." : "No orders found."}
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-t border-slate-100">
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
                      {SAR(order.total_sar)}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {order.utm_source || "direct"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        disabled={savingOrder === order.order_number}
                        onChange={(event) => updateStatus(order, event.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium"
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
