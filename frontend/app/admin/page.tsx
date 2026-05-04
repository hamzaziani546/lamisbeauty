"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Eye,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  ShieldAlert,
  Users,
  Package,
  CheckCircle2,
} from "lucide-react";
import { adminFetch, type MetricsResponse } from "@/lib/admin-api";
import { DateRangePicker, presetRange, type Range } from "@/components/admin/DateRangePicker";
import { MetricCard } from "@/components/admin/MetricCard";
import { TimeseriesBars } from "@/components/admin/TimeseriesBars";

const SAR = (n: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n) + " SAR";
const PCT = (n: number) => `${n.toFixed(2)}%`;

export default function AdminDashboardPage() {
  const [range, setRange] = useState<Range>(() => presetRange("30d"));
  const [data, setData] = useState<MetricsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await adminFetch<MetricsResponse>(
        `/admin/metrics?start=${range.start}&end=${range.end}`
      );
      setData(res);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    load();
  }, [load]);

  const summary = data?.summary;

  const cards = useMemo(
    () =>
      summary
        ? [
            {
              label: "Valid clicks (KSA)",
              value: summary.total_clicks.toLocaleString(),
              hint: `${summary.unique_visitors.toLocaleString()} unique visitors`,
              icon: Eye,
              color: "bg-sky-50 text-sky-700",
            },
            {
              label: "Orders",
              value: summary.total_orders.toLocaleString(),
              hint: `${summary.confirmed_orders} confirmed`,
              icon: ShoppingCart,
              color: "bg-emerald-50 text-emerald-700",
            },
            {
              label: "Conversion rate",
              value: PCT(summary.conversion_rate),
              hint: "orders / valid clicks",
              icon: TrendingUp,
              color: "bg-violet-50 text-violet-700",
            },
            {
              label: "Revenue",
              value: SAR(summary.revenue_sar),
              hint: `AOV ${SAR(summary.aov_sar)}`,
              icon: DollarSign,
              color: "bg-amber-50 text-amber-700",
            },
            {
              label: "Confirm rate",
              value: PCT(summary.confirm_rate),
              hint: `${summary.confirmed_orders} / ${summary.total_orders}`,
              icon: CheckCircle2,
              color: "bg-teal-50 text-teal-700",
            },
            {
              label: "Delivery rate",
              value: PCT(summary.delivery_rate),
              hint: `${summary.delivered_orders} delivered`,
              icon: Package,
              color: "bg-indigo-50 text-indigo-700",
            },
            {
              label: "Cancelled / no-answer",
              value: summary.cancelled_orders.toLocaleString(),
              hint: "blocked from KPIs",
              icon: ShieldAlert,
              color: "bg-rose-50 text-rose-700",
            },
            {
              label: "Blocked clicks",
              value: summary.blocked_clicks.toLocaleString(),
              hint: "non-KSA / VPN / proxy",
              icon: Users,
              color: "bg-slate-100 text-slate-700",
            },
          ]
        : [],
    [summary]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">
            Saudi-only traffic & COD orders. VPN/proxy clicks are excluded.
          </p>
        </div>
        <DateRangePicker value={range} onChange={setRange} />
      </div>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-2">
          {error}
        </div>
      )}

      {loading && !data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-24 rounded-xl bg-white border border-slate-200 animate-pulse"
            />
          ))}
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((c) => (
              <MetricCard key={c.label} {...c} />
            ))}
          </div>

          <section className="bg-white border border-slate-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">
              Daily clicks & orders
            </h2>
            <TimeseriesBars data={data.timeseries} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <section className="bg-white border border-slate-200 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">
                Order status breakdown
              </h2>
              <table className="w-full text-sm">
                <tbody>
                  {data.status_breakdown.length === 0 && (
                    <tr>
                      <td className="text-slate-400 py-2">No orders.</td>
                    </tr>
                  )}
                  {data.status_breakdown.map((s) => (
                    <tr key={s.status} className="border-b last:border-0">
                      <td className="py-2 font-medium text-slate-700">
                        {s.status}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {s.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="bg-white border border-slate-200 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">
                Top traffic sources
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase text-slate-400">
                    <th className="text-left py-2">Source</th>
                    <th className="text-right py-2">Clicks</th>
                    <th className="text-right py-2">Orders</th>
                    <th className="text-right py-2">CVR</th>
                    <th className="text-right py-2">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.utm_breakdown.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-slate-400 py-2">
                        No traffic.
                      </td>
                    </tr>
                  )}
                  {data.utm_breakdown.map((u) => (
                    <tr key={u.source} className="border-b last:border-0">
                      <td className="py-2 font-medium text-slate-700">
                        {u.source}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {u.clicks}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {u.orders}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {PCT(u.cvr)}
                      </td>
                      <td className="py-2 text-right tabular-nums">
                        {SAR(u.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </>
      ) : null}
    </div>
  );
}
