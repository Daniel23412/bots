"use client";

const steps = [
  [10, "Подключение..."],
  [35, "Анализ игрового поля..."],
  [68, "Расчёт комбинации..."],
  [92, "Генерация стратегии..."],
  [100, "Сигнал готов"],
] as const;

export function AnalysisLoader({ progress }: { progress: number }) {
  const active = [...steps].reverse().find(([value]) => progress >= value) ?? steps[0];
  return (
    <div className="rounded-3xl border border-emerald-400/15 bg-emerald-400/[.04] p-5">
      <div className="flex items-center justify-between text-[11px] font-black tracking-[.16em] text-emerald-300">
        <span>AI ANALYSIS</span><span>{progress}%</span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[.06]"><div className="h-full rounded-full bg-emerald-400 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
      <div className="mt-4 text-sm font-bold text-white/75">{active[1]}</div>
    </div>
  );
}
