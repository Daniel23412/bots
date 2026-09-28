import type { GameDefinition } from "./types";
import { MinesEngine } from "@/games/mines/engine";
import { TowerRushEngine } from "@/games/tower-rush/engine";

export const games: Record<string, GameDefinition> = {
  mines: {
    id: "mines",
    title: "Mines",
    icon: "💎",
    description: "5×5 поле с визуальной подсветкой рекомендуемых клеток.",
    category: "STRATEGY",
    enabled: true,
    status: "ready",
    provider: MinesEngine,
  },
  "tower-rush": {
    id: "tower-rush",
    title: "Tower Rush",
    icon: "🏙️",
    description: "Симуляция рекомендуемого количества этажей и точки остановки.",
    category: "ARCADE",
    enabled: true,
    status: "ready",
    provider: TowerRushEngine,
  },
  "falling-pickaxe": { id: "falling-pickaxe", title: "Falling Pickaxe", icon: "⛏️", description: "Стратегия кирок, TNT и портала.", category: "ARCADE", enabled: false, status: "next" },
  "wheel-out": { id: "wheel-out", title: "Wheel Out", icon: "🎡", description: "Сектор, диапазон и условная точка выхода.", category: "ARCADE", enabled: false, status: "next" },
  "viper-royale": { id: "viper-royale", title: "Viper Royale", icon: "🐍", description: "Маршрут, камни и направление выхода.", category: "ARCADE", enabled: false, status: "next" },
  aviamasters: { id: "aviamasters", title: "Aviamasters", icon: "✈️", description: "Маршрут, высота и зона выхода.", category: "CRASH", enabled: false, status: "next" },
  "chicken-rush": { id: "chicken-rush", title: "Chicken Rush", icon: "🐔", description: "Пошаговая стратегия движения.", category: "ARCADE", enabled: false, status: "next" },
  "tower-dash": { id: "tower-dash", title: "Tower Dash", icon: "🗼", description: "Башня и рекомендуемая остановка.", category: "ARCADE", enabled: false, status: "next" },
  "totem-tower": { id: "totem-tower", title: "Totem Tower", icon: "🗿", description: "Уровни и условная точка остановки.", category: "ARCADE", enabled: false, status: "next" },
};

export function publicGames() {
  return Object.values(games).map((game) => ({
    id: game.id,
    title: game.title,
    icon: game.icon,
    description: game.description,
    category: game.category,
    enabled: game.enabled,
    status: game.status,
  }));
}

export function getGame(id: string) {
  return games[id] ?? null;
}
