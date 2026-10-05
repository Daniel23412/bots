import assert from "node:assert/strict";
import { test } from "node:test";
import { FallingPickaxeEngine } from "../games/falling-pickaxe/engine";
import { PICKAXES, PICKAXE_KINDS, PICKAXE_MODES } from "../games/falling-pickaxe/config";
import type { PickaxeMode } from "../games/falling-pickaxe/types";
import { getGame, publicGames } from "../lib/signals/registry";

test("all 12 pickaxe/mode combinations produce coherent, unique simulation plans", async () => {
  const ids = new Set<string>();
  for (const pickaxe of PICKAXE_KINDS) for (const mode of Object.keys(PICKAXE_MODES) as PickaxeMode[]) for (let iteration = 0; iteration < 50; iteration++) {
    const result = await FallingPickaxeEngine.generateSignal({ pickaxe, mode });
    const data = result.data, config = PICKAXE_MODES[mode];
    assert.equal(result.simulation, true);
    assert.equal(result.game, "falling-pickaxe");
    assert(!ids.has(result.id)); ids.add(result.id);
    assert.equal(data.pickaxe, pickaxe); assert.equal(data.mode, mode);
    assert.equal(data.durability, PICKAXES[pickaxe].hp);
    assert(data.exitLevel >= config.exitRange[0] && data.exitLevel <= config.exitRange[1]);
    assert(data.pickaxeCount >= config.countRange[0] && data.pickaxeCount <= config.countRange[1]);
    assert.equal(data.upgrade, pickaxe !== "diamond");
    assert.equal(data.useTnt, mode !== "safe");
    assert.equal(data.priorities.includes("tnt"), data.useTnt);
    assert.equal(result.risk, mode === "safe" ? "low" : mode === "balanced" ? "medium" : "high");
    assert.equal(data.route.at(-1)?.level, data.exitLevel);
    assert.equal(data.route.at(-1)?.target, "portal");
    for (const step of data.route) {
      assert(step.row >= 0 && step.row < 12 && step.column >= 0 && step.column < 10);
      assert(step.level <= data.exitLevel);
      if (step.target === "diamond") assert(step.level >= 30);
      if (step.target === "emerald") assert(step.level >= 40);
    }
  }
  assert.equal(ids.size, 600);
});

test("defaults and invalid settings", async () => {
  const { data } = await FallingPickaxeEngine.generateSignal({});
  assert.equal(data.pickaxe, "iron"); assert.equal(data.mode, "balanced");
  for (const invalid of [{ pickaxe: "gold" }, { pickaxe: 3 }, { mode: "guaranteed" }, { mode: null }]) {
    await assert.rejects(FallingPickaxeEngine.generateSignal(invalid as never));
  }
});

test("registry adds Pickaxe without changing the other available games", () => {
  assert.equal(getGame("falling-pickaxe")?.provider, FallingPickaxeEngine);
  assert.deepEqual(publicGames().filter(game => game.enabled).map(game => game.id), ["mines", "tower-rush", "falling-pickaxe"]);
  assert.equal(getGame("viper-royale")?.enabled, false);
});
