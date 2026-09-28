import { z } from "zod";
import type { SignalProvider } from "@/lib/signals/types";
import { pickInt, sampleUnique, signalId } from "@/lib/signals/random";
import { MINES_GRID_SIZE, MINES_RECOMMENDATION_RANGE } from "./config";
import type { MinesSignalData, MinesSignalOptions } from "./types";

const schema = z.object({ mines: z.union([z.literal(1), z.literal(3), z.literal(5), z.literal(7)]) });

export const MinesEngine: SignalProvider<MinesSignalOptions, MinesSignalData> = {
  async generateSignal(rawOptions) {
    const { mines } = schema.parse(rawOptions);
    const [min, max] = MINES_RECOMMENDATION_RANGE[mines];
    const count = pickInt(min, max);
    const recommendedCells = sampleUnique(count, MINES_GRID_SIZE);

    return {
      id: signalId(),
      game: "mines",
      createdAt: Date.now(),
      risk: mines <= 1 ? "low" : mines <= 5 ? "medium" : "high",
      simulation: true,
      data: { mines, gridSize: MINES_GRID_SIZE, recommendedCells, recommendedCount: count },
    };
  },
};
