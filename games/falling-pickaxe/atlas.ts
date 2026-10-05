// Original frame coordinates from the supplied HAR atlas JSON.
export const PICKAXE_ATLAS = {
  "stone": {
    "x": 65,
    "y": 54,
    "w": 16,
    "h": 16
  },
  "cobblestone": {
    "x": 41,
    "y": 20,
    "w": 16,
    "h": 16
  },
  "grass": {
    "x": 47,
    "y": 56,
    "w": 16,
    "h": 16
  },
  "wall": {
    "x": 38,
    "y": 74,
    "w": 16,
    "h": 16
  },
  "diamond": {
    "x": 59,
    "y": 20,
    "w": 16,
    "h": 16
  },
  "emerald": {
    "x": 47,
    "y": 38,
    "w": 16,
    "h": 16
  },
  "gold": {
    "x": 31,
    "y": 54,
    "w": 14,
    "h": 14
  },
  "copper": {
    "x": 31,
    "y": 38,
    "w": 14,
    "h": 14
  },
  "redstone": {
    "x": 77,
    "y": 20,
    "w": 14,
    "h": 14
  },
  "tnt": {
    "x": 20,
    "y": 74,
    "w": 16,
    "h": 16
  },
  "crafting_table": {
    "x": 59,
    "y": 2,
    "w": 16,
    "h": 16
  },
  "pickaxe_0": {
    "x": 243,
    "y": 106,
    "w": 16,
    "h": 16
  },
  "pickaxe_1": {
    "x": 242,
    "y": 326,
    "w": 16,
    "h": 16
  },
  "pickaxe_2": {
    "x": 260,
    "y": 326,
    "w": 16,
    "h": 16
  },
  "pickaxe_3": {
    "x": 278,
    "y": 2,
    "w": 16,
    "h": 16
  },
  "heart": {
    "x": 301,
    "y": 150,
    "w": 18,
    "h": 16
  },
  "slime": {
    "x": 77,
    "y": 36,
    "w": 16,
    "h": 16
  },
  "stretch": {
    "x": 2,
    "y": 83,
    "w": 16,
    "h": 16
  }
} as const;
export type PickaxeSpriteName = keyof typeof PICKAXE_ATLAS;
