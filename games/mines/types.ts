import type { SignalOptions } from "@/lib/signals/types";

export type MinesCount = 1 | 3 | 5 | 7;
export type MinesSignalOptions = SignalOptions & { mines: MinesCount };
export type MinesSignalData = {
  mines: MinesCount;
  gridSize: 25;
  recommendedCells: number[];
  recommendedCount: number;
};
