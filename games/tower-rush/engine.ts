import { z } from "zod";
import type { SignalProvider } from "@/lib/signals/types";
import { pickInt, signalId } from "@/lib/signals/random";
import { TOWER_FLOOR_RANGE } from "./config";
import type { TowerMode, TowerSignalData, TowerSignalOptions } from "./types";

const schema = z.object({ mode: z.enum(["safe", "balanced", "aggressive"]).optional().default("balanced") });

export const TowerRushEngine: SignalProvider<TowerSignalOptions, TowerSignalData> = {
  async generateSignal(rawOptions) {
    const { mode } = schema.parse(rawOptions) as { mode: TowerMode };
    const [min, max] = TOWER_FLOOR_RANGE[mode];
    const floors = pickInt(min, max);
    const path = Array.from({ length: floors + 1 }, (_, index) => ({
      floor: index + 1,
      action: index === floors ? ("stop" as const) : ("continue" as const),
    }));

    return {
      id: signalId(),
      game: "tower-rush",
      createdAt: Date.now(),
      risk: mode === "safe" ? "low" : mode === "balanced" ? "medium" : "high",
      simulation: true,
      data: { mode, floors, stopAfter: floors, path },
    };
  },
};
