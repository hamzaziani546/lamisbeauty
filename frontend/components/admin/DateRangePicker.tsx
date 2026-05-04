"use client";

import { useState } from "react";

export type Range = { start: string; end: string };

const DAY = 86400000;

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function presetRange(key: "today" | "7d" | "30d" | "90d" | "ytd"): Range {
  const now = new Date();
  const endStr = fmt(now);
  if (key === "today") return { start: endStr, end: endStr };
  if (key === "ytd") {
    return { start: `${now.getFullYear()}-01-01`, end: endStr };
  }
  const days = key === "7d" ? 7 : key === "30d" ? 30 : 90;
  return { start: fmt(new Date(now.getTime() - days * DAY)), end: endStr };
}

const PRESETS: { key: Parameters<typeof presetRange>[0]; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "7d", label: "7d" },
  { key: "30d", label: "30d" },
  { key: "90d", label: "90d" },
  { key: "ytd", label: "YTD" },
];

export function DateRangePicker({
  value,
  onChange,
}: {
  value: Range;
  onChange: (r: Range) => void;
}) {
  const [start, setStart] = useState(value.start);
  const [end, setEnd] = useState(value.end);

  const apply = () => onChange({ start, end });

  return (
    <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 rounded-lg px-2 py-1.5">
      <div className="flex gap-1">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            onClick={() => {
              const r = presetRange(p.key);
              setStart(r.start);
              setEnd(r.end);
              onChange(r);
            }}
            className="px-2.5 py-1 text-xs rounded-md text-slate-600 hover:bg-slate-100"
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block" />
      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="border border-slate-300 rounded-md px-2 py-1 text-xs"
      />
      <span className="text-slate-400 text-xs">→</span>
      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="border border-slate-300 rounded-md px-2 py-1 text-xs"
      />
      <button
        onClick={apply}
        className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md"
      >
        Apply
      </button>
    </div>
  );
}
