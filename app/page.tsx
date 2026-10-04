import Script from "next/script";
import { GameGrid } from "@/components/GameGrid";
import { AppShell } from "@/components/AppShell";
import { TelegramBridge } from "@/components/TelegramBridge";

export default function HomePage() {
  return <main className="site-page"><Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" /><TelegramBridge /><AppShell><section className="catalog-shell"><div className="catalog-heading"><h1>Выберите игру</h1><p>Знакомые игры. Наглядные сигналы.</p></div><GameGrid /></section></AppShell></main>;
}
