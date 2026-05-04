"use client";

type Point = { date: string; clicks: number; orders: number; revenue: number };

export function TimeseriesBars({ data }: { data: Point[] }) {
  if (!data.length) {
    return <p className="text-sm text-slate-400">No data in range.</p>;
  }
  const maxClicks = Math.max(...data.map((d) => d.clicks), 1);
  const maxOrders = Math.max(...data.map((d) => d.orders), 1);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-sky-400" /> Clicks
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-emerald-500" /> Orders
        </span>
      </div>
      <div className="overflow-x-auto">
        <div
          className="grid items-end gap-1 min-w-full"
          style={{
            gridTemplateColumns: `repeat(${data.length}, minmax(20px, 1fr))`,
            height: 180,
          }}
        >
          {data.map((d) => (
            <div
              key={d.date}
              className="flex items-end gap-0.5 group relative"
              title={`${d.date}\nClicks: ${d.clicks}\nOrders: ${d.orders}\nRevenue: ${d.revenue.toFixed(0)} SAR`}
            >
              <div
                className="flex-1 bg-sky-400/80 rounded-t-sm group-hover:bg-sky-500 transition-colors"
                style={{ height: `${(d.clicks / maxClicks) * 160}px` }}
              />
              <div
                className="flex-1 bg-emerald-500/90 rounded-t-sm group-hover:bg-emerald-600 transition-colors"
                style={{ height: `${(d.orders / maxOrders) * 160}px` }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{data[0].date}</span>
        {data.length > 2 && <span>{data[Math.floor(data.length / 2)].date}</span>}
        <span>{data[data.length - 1].date}</span>
      </div>
    </div>
  );
}
