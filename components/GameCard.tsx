import Link from "next/link";
import type { GameDefinition } from "@/lib/signals/types";
import { MinesScene, TowerScene } from "./GameScenes";

export function GameCard({ game }: { game: Omit<GameDefinition, "provider"> }) {
  if (!game.enabled) return <div className="upcoming-game"><span>{game.title}</span><span>Скоро</span></div>;
  return <Link href={`/signal/${game.id}`} className={`game-card card-${game.id}`} aria-label={`Открыть ${game.title}`}>
    <div className="card-art" aria-hidden="true">{game.id === "mines" ? <MinesScene preview /> : <TowerScene preview />}</div>
    <div className="card-content"><div><span className="card-category">{game.id === "mines" ? "НАЙДИ КРИСТАЛЛЫ" : "ПОСТРОЙ БАШНЮ"}</span><h2>{game.title}</h2><p>{game.id === "mines" ? "Поле 5 × 5 · четыре режима" : "Три режима · до 7 этажей"}</p></div><span className="card-arrow" aria-hidden="true">↗</span></div>
  </Link>;
}
