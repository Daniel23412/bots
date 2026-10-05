import { publicGames } from "@/lib/signals/registry";
import { GameCard } from "./GameCard";

export function GameGrid() {
  const games = publicGames();
  // Keep the compact Pickaxe row from the approved Neon composition.
  const pickaxe = games.find(game => game.id === "falling-pickaxe");
  return <><div className="games-grid">{games.filter(game => game.enabled && game.id !== "falling-pickaxe").map(game => <GameCard key={game.id} game={game} />)}</div>{pickaxe && <div className="upcoming-section"><GameCard game={pickaxe} /></div>}</>;
}
