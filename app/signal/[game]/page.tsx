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
  return (
    <main className="min-h-dvh safe-bottom">
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="afterInteractive" />
      <TelegramBridge />
      <Header back />
      <section className="mx-auto w-full max-w-md px-4 py-6">
        <div className="mb-5"><div className="text-4xl">{game.icon}</div><div className="mt-3 text-[10px] font-bold tracking-[.24em] text-emerald-300">{game.category}</div><h1 className="mt-1 text-3xl font-black">{game.title} Signal</h1><p className="mt-2 text-sm leading-6 text-white/45">{game.description}</p></div>
        <SignalClient game={game.id} />
      </section>
    </main>
  );
}
