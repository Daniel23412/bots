export type PickaxeKind = "wood" | "stone" | "iron" | "diamond";
export type PickaxeMode = "safe" | "balanced" | "aggressive";
export type PickaxePriority = "gold" | "diamond" | "emerald" | "tnt";
export type PickaxeSignalOptions = { pickaxe?: PickaxeKind; mode?: PickaxeMode };
export type PickaxeSignalData = {
  pickaxe: PickaxeKind;
  mode: PickaxeMode;
  attemptCount: number;
  durability: number;
  targetDepth: number;
  priorities: PickaxePriority[];
  upgrade: boolean;
  useTnt: boolean;
  route: { row: number; column: number; level: number; target: PickaxePriority | "crafting_table" }[];
};
