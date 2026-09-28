"use client";

import { useMemo, useState } from "react";
import { AnalysisLoader } from "./AnalysisLoader";
import { SignalResult } from "./SignalResult";
import type { GameSignal } from "@/lib/signals/types";

const COOLDOWN = 5;
const HISTORY_KEY = "ai-signal-history-v1";

function saveHistory(signal: GameSignal) {
  try {
    const current: unknown = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    const list = Array.isArray(current) ? current : [];
    const next = [signal, ...list].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {}
}

export function SignalClient({ game }: { game: string }) {
  const [mines, setMines] = useState(3);
  const [mode, setMode] = useState("balanced");
  const [signal, setSignal] = useState<GameSignal | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");

  const options = useMemo(() => game === "mines" ? { mines } : { mode }, [game, mines, mode]);

  async function generate() {
    if (loading || cooldown > 0) return;
    setError(""); setSignal(null); setLoading(true); setProgress(4);
    const checkpoints = [10, 35, 68, 92];
    let i = 0;
    const timer = window.setInterval(() => { setProgress(checkpoints[Math.min(i, checkpoints.length - 1)]); i += 1; }, 360);
    try {
      const response = await fetch("/api/signal", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ game, options }) });
      const json = await response.json() as { success?: boolean; error?: string; signal?: GameSignal };
      if (!response.ok || !json.success || !json.signal) throw new Error(json.error || "Signal generation failed");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.clearInterval(timer); setProgress(100); await new Promise((resolve) => setTimeout(resolve, 240));
      setSignal(json.signal); saveHistory(json.signal);
      setCooldown(COOLDOWN);
      let left = COOLDOWN;
      const cd = window.setInterval(() => { left -= 1; setCooldown(left); if (left <= 0) window.clearInterval(cd); }, 1000);
    } catch (e) {
      window.clearInterval(timer); setError(e instanceof Error ? e.message : "Ошибка");
    } finally { setLoading(false); }
  }

  return (
    <div className="space-y-4">
      {game === "mines" ? (
        <div className="rounded-3xl border border-white/10 bg-white/[.035] p-5"><div className="text-xs font-bold text-white/40">Количество мин</div><div className="mt-3 grid grid-cols-4 gap-2">{[1,3,5,7].map((value) => <button key={value} onClick={() => setMines(value)} className={`rounded-2xl py-3 text-sm font-black ${mines === value ? "bg-emerald-400 text-[#04110a]" : "bg-white/[.06] text-white/55"}`}>{value}</button>)}</div></div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[.035] p-5"><div className="text-xs font-bold text-white/40">Режим риска</div><div className="mt-3 grid grid-cols-3 gap-2">{[["safe","SAFE"],["balanced","MEDIUM"],["aggressive","HIGH"]].map(([value,label]) => <button key={value} onClick={() => setMode(value)} className={`rounded-2xl py-3 text-[11px] font-black ${mode === value ? "bg-emerald-400 text-[#04110a]" : "bg-white/[.06] text-white/55"}`}>{label}</button>)}</div></div>
      )}
      {loading ? <AnalysisLoader progress={progress} /> : null}
      {signal && !loading ? <SignalResult signal={signal} /> : null}
      {error ? <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-300">{error}</div> : null}
      <button onClick={generate} disabled={loading || cooldown > 0} className="w-full rounded-2xl bg-emerald-400 py-4 text-sm font-black tracking-[.12em] text-[#04110a] shadow-neon disabled:cursor-not-allowed disabled:opacity-45">
        {loading ? "AI ANALYSIS..." : cooldown > 0 ? `СЛЕДУЮЩИЙ СИГНАЛ ЧЕРЕЗ ${cooldown} СЕК` : signal ? "ПОЛУЧИТЬ НОВЫЙ СИГНАЛ" : "ПОЛУЧИТЬ СИГНАЛ"}
      </button>
      <p className="px-2 text-center text-[10px] leading-4 text-white/25">Simulation mode. Сигнал не является гарантированным предсказанием стороннего RNG и не подтверждает будущий результат ставки.</p>
    </div>
  );
}
