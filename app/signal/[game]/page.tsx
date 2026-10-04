import { notFound } from "next/navigation";
import Script from "next/script";
import { Header } from "@/components/Header";
import { SignalClient } from "@/components/SignalClient";
import { TelegramBridge } from "@/components/TelegramBridge";
import { getGame } from "@/lib/signals/registry";

export default async function SignalPage({ params }: { params: Promise<{ game: string }> }) {
  const { game: gameId } = await params;
  const game = getGame(gameId);
  if (!game?.enabled || !game.provider) notFound();
  return <main className={`game-page page-${game.id} safe-bottom`}><Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" /><TelegramBridge /><Header back /><section className="play-shell"><h1 className="sr-only">{game.title} — генератор сигналов</h1><SignalClient key={game.id} game={game.id} /></section></main>;
}
