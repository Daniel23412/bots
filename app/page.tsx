import Script from "next/script";
import { GameGrid } from "@/components/GameGrid";
import { Header } from "@/components/Header";
import { TelegramBridge } from "@/components/TelegramBridge";

export default function HomePage() {
  return (
    <main className="min-h-dvh safe-bottom">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
      <TelegramBridge />
      <Header />
      <section className="mx-auto w-full max-w-md px-4 py-6">
        <div className="overflow-hidden rounded-[28px] border border-emerald-400/15 bg-gradient-to-br from-emerald-400/10 to-transparent p-5 shadow-neon">
          <div className="text-[11px] font-bold uppercase tracking-[.24em] text-emerald-300">AI Analysis</div>
          <h1 className="mt-2 text-3xl font-black leading-tight">Выберите игру</h1>
          <p className="mt-3 text-sm leading-6 text-white/50">Визуальные подсказки на основе реконструированной механики. Это симуляция, а не предсказание реального RNG казино.</p>
        </div>
        <div className="mb-3 mt-7 flex items-end justify-between">
          <div><div className="text-[10px] font-bold tracking-[.22em] text-white/30">GAMES</div><div className="mt-1 text-lg font-black">Доступные сигналы</div></div>
          <div className="text-xs text-emerald-300">2 активны</div>
        </div>
        <GameGrid />
      </section>
    </main>
  );
}
