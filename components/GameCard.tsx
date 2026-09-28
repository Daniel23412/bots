import Link from "next/link";
import type { GameDefinition } from "@/lib/signals/types";

export function GameCard({ game }: { game: Omit<GameDefinition, "provider"> }) {
  const inner = (
    <div className={`group relative overflow-hidden rounded-3xl border p-4 transition ${game.enabled ? "border-emerald-400/15 bg-white/[.045] active:scale-[.99]" : "border-white/5 bg-white/[.025] opacity-55"}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[.06] text-2xl shadow-inner">{game.icon}</div>
        <span className={`rounded-full px-2 py-1 text-[9px] font-black tracking-[.14em] ${game.enabled ? "bg-emerald-400/10 text-emerald-300" : "bg-white/5 text-white/35"}`}>
          {game.enabled ? "READY" : "NEXT"}
        </span>
      </div>
      <div className="mt-4 text-lg font-black">{game.title}</div>
      <div className="mt-1 min-h-10 text-xs leading-5 text-white/45">{game.description}</div>
      <div className={`mt-4 rounded-2xl py-3 text-center text-xs font-black tracking-[.12em] ${game.enabled ? "bg-emerald-400 text-[#04110a] shadow-neon" : "bg-white/5 text-white/25"}`}>
        {game.enabled ? "ПОЛУЧИТЬ СИГНАЛ" : "СКОРО"}
      </div>
    </div>
  );
  return game.enabled ? <Link href={`/signal/${game.id}`}>{inner}</Link> : inner;
}
