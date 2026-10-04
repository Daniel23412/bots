import { publicGames } from "@/lib/signals/registry";
import { GameCard } from "./GameCard";

export function GameGrid() {
  const games = publicGames();
  return <><div className="games-grid">{games.filter(game => game.enabled).map(game => <GameCard key={game.id} game={game} />)}</div><div className="upcoming-section"><h2>Следующие игры</h2><div className="upcoming-list">{games.filter(game => !game.enabled).map(game => <GameCard key={game.id} game={game} />)}</div></div></>;
}
