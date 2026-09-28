import { publicGames } from "@/lib/signals/registry";
import { GameCard } from "./GameCard";

export function GameGrid() {
  const list = publicGames();
  return <div className="grid grid-cols-2 gap-3">{list.map((game) => <GameCard key={game.id} game={game} />)}</div>;
}
