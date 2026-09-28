import type { MinesCount } from "./types";

export const MINES_GRID_SIZE = 25;
export const MINES_COUNTS: MinesCount[] = [1, 3, 5, 7];

export const MINES_RECOMMENDATION_RANGE: Record<MinesCount, readonly [number, number]> = {
  1: [5, 8],
  3: [4, 6],
  5: [3, 5],
  7: [2, 4],
};
