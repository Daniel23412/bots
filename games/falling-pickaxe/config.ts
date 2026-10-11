import type { PickaxeKind, PickaxeMode } from "./types";

export const PICKAXES: Record<PickaxeKind, { label: string; shortLabel: string; hp: number; sprite: string }> = {
  wood: { label: "Деревянная", shortLabel: "Дерево", hp: 100, sprite: "pickaxe_0" },
  stone: { label: "Каменная", shortLabel: "Камень", hp: 150, sprite: "pickaxe_1" },
  iron: { label: "Железная", shortLabel: "Железо", hp: 200, sprite: "pickaxe_2" },
  diamond: { label: "Алмазная", shortLabel: "Алмаз", hp: 400, sprite: "pickaxe_3" },
};
export const PICKAXE_KINDS = Object.keys(PICKAXES) as PickaxeKind[];
// Product-defined demo ranges; neither value predicts a live round.
export const PICKAXE_MODES: Record<PickaxeMode, { label: string; depthRange: readonly [number, number]; attemptRange: readonly [number, number] }> = {
  safe: { label: "Низкий", depthRange: [30, 36], attemptRange: [3, 4] },
  balanced: { label: "Средний", depthRange: [44, 52], attemptRange: [4, 5] },
  aggressive: { label: "Высокий", depthRange: [58, 72], attemptRange: [5, 6] },
};
export const PRIORITY_LABELS = { gold: "Золото", diamond: "Алмаз", emerald: "Изумруд", tnt: "TNT" } as const;
