import type { TowerMode } from "./types";

export const TOWER_FLOOR_RANGE: Record<TowerMode, readonly [number, number]> = {
  safe: [2, 3],
  balanced: [3, 5],
  aggressive: [5, 7],
};
