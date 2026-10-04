import { publicGames } from "@/lib/signals/registry";
import { GameCard } from "./GameCard";

export function GameGrid() {
  const games = publicGames();
  const nextGame = games.find(game => !game.enabled);
  return <><div className="games-grid">{games.filter(game => game.enabled).map(game => <GameCard key={game.id} game={game} />)}</div>{nextGame && <div className="upcoming-section"><GameCard game={nextGame} /></div>}</>;
}
