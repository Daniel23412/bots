import { z } from "zod";
import type { SignalProvider } from "@/lib/signals/types";
import { pickInt, signalId } from "@/lib/signals/random";
import { PICKAXES, PICKAXE_MODES } from "./config";
import type { PickaxeSignalData, PickaxeSignalOptions } from "./types";

const optionsSchema = z.object({
  pickaxe: z.enum(["wood", "stone", "iron", "diamond"]).default("iron"),
  mode: z.enum(["safe", "balanced", "aggressive"]).default("balanced"),
});

// Illustrative strategy ranges, not a live game predictor or replay of a round.
export const FallingPickaxeEngine: SignalProvider<PickaxeSignalOptions, PickaxeSignalData> = {
  async generateSignal(rawOptions) {
    const { pickaxe, mode } = optionsSchema.parse(rawOptions);
    const config = PICKAXE_MODES[mode];
    const exitLevel = pickInt(...config.exitRange);
    const useTnt = mode !== "safe";
    const priorities: PickaxeSignalData["priorities"] = mode === "safe" ? ["gold", "diamond"] : mode === "balanced" ? ["diamond", "emerald", "tnt"] : ["emerald", "diamond", "tnt"];
    const firstOre = mode === "safe" ? "gold" : "diamond";
    const secondOre = mode === "safe" ? "diamond" : "emerald";
    return {
      id: signalId(), game: "falling-pickaxe", createdAt: Date.now(),
      risk: mode === "safe" ? "low" : mode === "balanced" ? "medium" : "high",
      simulation: true,
      data: {
        pickaxe, mode, exitLevel, pickaxeCount: pickInt(...config.countRange),
        durability: PICKAXES[pickaxe].hp, priorities, upgrade: pickaxe !== "diamond", useTnt,
        route: [
          { row: 1, column: pickInt(3, 5), level: 8, target: "crafting_table" },
          { row: 4, column: pickInt(2, 6), level: mode === "safe" ? 20 : 30, target: firstOre },
          { row: 7, column: pickInt(3, 7), level: mode === "safe" ? 30 : 40, target: secondOre },
          { row: 10, column: 4, level: exitLevel, target: "portal" },
        ],
      },
    };
  },
};
