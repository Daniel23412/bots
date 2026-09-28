"use client";

import { useEffect, useState } from "react";
import type { GameSignal } from "@/lib/signals/types";

const KEY = "ai-signal-history-v1";

type HistoryData = { recommendedCount?: number; stopAfter?: number };

function summary(signal: GameSignal) {
  const data = signal.data as HistoryData;
  if (signal.game === "mines") return `${data.recommendedCount ?? 0} safe cells`;
  if (signal.game === "tower-rush") return `${data.stopAfter ?? 0} floors`;
  return signal.risk;
}

export function HistoryClient() {
  const [items, setItems] = useState<GameSignal[]>([]);
  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(parsed)) setItems(parsed as GameSignal[]);
    } catch {}
  }, []);
  if (!items.length) return <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 text-center text-sm text-white/35">История пока пустая.</div>;
  return <div className="space-y-2">{items.map((signal) => <div key={signal.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.03] p-4"><div><div className="font-black capitalize">{signal.game.replaceAll("-", " ")}</div><div className="mt-1 text-xs text-white/35">{new Date(signal.createdAt).toLocaleString()}</div></div><div className="text-right"><div className="text-sm font-bold text-emerald-300">{summary(signal)}</div><div className="mt-1 text-[10px] uppercase tracking-widest text-white/25">{signal.risk}</div></div></div>)}</div>;
}
