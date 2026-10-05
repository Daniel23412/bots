import type { PickaxeKind, PickaxeMode } from "./types";

export const PICKAXES: Record<PickaxeKind, { label: string; shortLabel: string; hp: number; sprite: string }> = {
  wood: { label: "Деревянная", shortLabel: "Дерево", hp: 100, sprite: "pickaxe_0" },
  stone: { label: "Каменная", shortLabel: "Камень", hp: 150, sprite: "pickaxe_1" },
  iron: { label: "Железная", shortLabel: "Железо", hp: 200, sprite: "pickaxe_2" },
  diamond: { label: "Алмазная", shortLabel: "Алмаз", hp: 400, sprite: "pickaxe_3" },
};
export const PICKAXE_KINDS = Object.keys(PICKAXES) as PickaxeKind[];
export const PICKAXE_MODES: Record<PickaxeMode, { label: string; exitRange: readonly [number, number]; countRange: readonly [number, number] }> = {
  safe: { label: "Низкий", exitRange: [30, 36], countRange: [3, 4] },
  balanced: { label: "Средний", exitRange: [44, 52], countRange: [4, 5] },
  aggressive: { label: "Высокий", exitRange: [58, 72], countRange: [5, 6] },
};
export const PRIORITY_LABELS = { gold: "Золото", diamond: "Алмаз", emerald: "Изумруд", tnt: "TNT" } as const;
