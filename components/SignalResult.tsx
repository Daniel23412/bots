"use client";

import type { GameSignal } from "@/lib/signals/types";

type MinesData = { mines: number; gridSize: number; recommendedCells: number[]; recommendedCount: number };
type TowerData = { mode: string; floors: number; stopAfter: number; path: Array<{ floor: number; action: string }> };

export function SignalResult({ signal }: { signal: GameSignal }) {
  if (signal.game === "mines") {
    const data = signal.data as MinesData;
    const selected = new Set(data.recommendedCells);
    return (
      <div className="rounded-3xl border border-emerald-400/20 bg-white/[.04] p-5 shadow-neon">
        <div className="flex items-center justify-between"><b className="text-emerald-300">SIGNAL READY</b><span className="text-[10px] text-white/30">{signal.id}</span></div>
        <div className="mx-auto mt-5 grid max-w-[310px] grid-cols-5 gap-2">
          {Array.from({ length: 25 }, (_, index) => (
            <div key={index} className={`aspect-square rounded-xl border ${selected.has(index) ? "border-emerald-300/45 bg-emerald-400 text-[#04110a] shadow-neon" : "border-white/10 bg-white/[.05]"} grid place-items-center text-sm font-black`}>
              {selected.has(index) ? "✓" : ""}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center text-sm text-white/55">Рекомендуемых клеток: <b className="text-white">{data.recommendedCount}</b> · Мин: <b className="text-white">{data.mines}</b></div>
      </div>
    );
  }

  if (signal.game === "tower-rush") {
    const data = signal.data as TowerData;
    return (
      <div className="rounded-3xl border border-emerald-400/20 bg-white/[.04] p-5 shadow-neon">
        <div className="flex items-center justify-between"><b className="text-emerald-300">SIGNAL READY</b><span className="text-[10px] text-white/30">{signal.id}</span></div>
        <div className="mt-5 space-y-2">
          {data.path.map((step) => <div key={step.floor} className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${step.action === "stop" ? "border-amber-300/20 bg-amber-300/[.07]" : "border-emerald-300/10 bg-emerald-300/[.04]"}`}><span className="font-bold">Этаж {step.floor}</span><span className={step.action === "stop" ? "text-amber-300" : "text-emerald-300"}>{step.action === "stop" ? "STOP" : "✓"}</span></div>)}
        </div>
        <div className="mt-5 rounded-2xl bg-white/[.04] p-4 text-center"><div className="text-xs text-white/35">Рекомендуемая остановка</div><div className="mt-1 text-2xl font-black">После {data.stopAfter} уровня</div></div>
      </div>
    );
  }

  return null;
}
