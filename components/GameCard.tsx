import Link from "next/link";
import type { GameDefinition } from "@/lib/signals/types";
import { MinesScene, TowerScene } from "./GameScenes";
import { ArrowIcon } from "./AppShell";

export function GameCard({ game }: { game: Omit<GameDefinition, "provider"> }) {
  if (game.id === "falling-pickaxe" && game.enabled) return <Link href="/signal/falling-pickaxe" className="upcoming-game pickaxe-catalog-card" aria-label="Открыть Falling Pickaxe">
    <svg className="upcoming-art" viewBox="0 0 110 102" aria-hidden="true" focusable="false"><image href="/design/neon/approved-reference.webp" x="-235" y="-850" width="1448" height="1086" /></svg>
    <div className="upcoming-title"><b>{game.title}</b><span>4 кирки · 3 режима</span></div><span className="card-open">Открыть<ArrowIcon /></span>
  </Link>;
  if (!game.enabled) return <div className="upcoming-game">
    <svg className="upcoming-art" viewBox="0 0 110 102" aria-hidden="true" focusable="false"><image href="/design/neon/approved-reference.webp" x="-235" y="-850" width="1448" height="1086" /></svg>
    <div className="upcoming-title"><b>{game.title}</b><span>Новый режим</span></div><span className="soon-pill">Скоро</span>
  </div>;
  return <Link href={`/signal/${game.id}`} className={`game-card card-${game.id}`} aria-label={`Открыть ${game.title}`}>
    <div className="card-art" aria-hidden="true">{game.id === "mines" ? <MinesScene preview /> : <TowerScene preview />}</div>
    <div className="card-content"><div><h2>{game.title}</h2><p>{game.id === "mines" ? "Поле 5 × 5 · четыре режима" : "Три режима · до 7 этажей"}</p></div><span className="card-open">Открыть<ArrowIcon /></span></div>
  </Link>;
}
