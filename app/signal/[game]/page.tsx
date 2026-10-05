import { notFound } from "next/navigation";
import Script from "next/script";
import { AppShell } from "@/components/AppShell";
import { SignalClient } from "@/components/SignalClient";
import { PickaxeClient } from "@/components/PickaxeClient";
import { TelegramBridge } from "@/components/TelegramBridge";
import { getGame } from "@/lib/signals/registry";

export default async function SignalPage({ params }: { params: Promise<{ game: string }> }) {
  const { game: gameId } = await params;
  const game = getGame(gameId);
  if (!game?.enabled || !game.provider) notFound();
  return <main className={`site-page page-${game.id}`}><Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" /><TelegramBridge /><AppShell back><section className="play-shell"><h1 className="sr-only">{game.title} — генератор сигналов</h1>{game.id === "falling-pickaxe" ? <PickaxeClient /> : <SignalClient key={game.id} game={game.id} />}</section></AppShell></main>;
}
