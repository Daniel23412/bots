import Script from "next/script";
import { GameGrid } from "@/components/GameGrid";
import { Header } from "@/components/Header";
import { TelegramBridge } from "@/components/TelegramBridge";

export default function HomePage() {
  return <main className="safe-bottom"><Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" /><TelegramBridge /><Header /><section className="catalog-shell"><div className="catalog-heading"><div><span className="eyebrow">ИГРОВАЯ ПАНЕЛЬ</span><h1>Выберите игру</h1><p>Знакомые игры. Наглядные сигналы.</p></div><span className="demo-pill"><span />Демо</span></div><GameGrid /><p className="catalog-note">Сигналы создаются в режиме симуляции и не предсказывают результаты игр.</p></section></main>;
}
