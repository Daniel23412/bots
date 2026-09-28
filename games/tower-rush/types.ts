import type { SignalOptions } from "@/lib/signals/types";

export type TowerMode = "safe" | "balanced" | "aggressive";
export type TowerSignalOptions = SignalOptions & { mode?: TowerMode };
export type TowerSignalData = {
  mode: TowerMode;
  floors: number;
  stopAfter: number;
  path: Array<{ floor: number; action: "continue" | "stop" }>;
};
