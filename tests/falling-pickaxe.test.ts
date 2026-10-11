import assert from "node:assert/strict";
import { test } from "node:test";
import { FallingPickaxeEngine } from "../games/falling-pickaxe/engine";
import { PICKAXES, PICKAXE_KINDS, PICKAXE_MODES } from "../games/falling-pickaxe/config";
import type { PickaxeMode } from "../games/falling-pickaxe/types";
import { formatAttemptCount } from "../games/falling-pickaxe/format";
import { POST } from "../app/api/signal/route";
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
    assert(data.targetDepth >= config.depthRange[0] && data.targetDepth <= config.depthRange[1]);
    assert(data.attemptCount >= config.attemptRange[0] && data.attemptCount <= config.attemptRange[1]);
    assert.equal(data.upgrade, pickaxe !== "diamond");
    assert.equal(data.useTnt, mode !== "safe");
    assert.equal(data.priorities.includes("tnt"), data.useTnt);
    assert.equal(result.risk, mode === "safe" ? "low" : mode === "balanced" ? "medium" : "high");
    assert.equal(data.route.at(-1)?.level, data.targetDepth);
    assert.equal(data.route.at(-1)?.target, mode === "safe" ? "diamond" : "emerald");
    assert(Number.isInteger(data.attemptCount));
    assert(!("pickaxeCount" in data));
    assert(!("exitLevel" in data));
    assert(!JSON.stringify(data).includes("portal"));
    for (const [index, step] of data.route.entries()) {
      if (index > 0) assert(step.level >= data.route[index - 1].level);
      assert(step.row >= 0 && step.row < 12 && step.column >= 0 && step.column < 10);
      assert(step.level <= data.targetDepth);
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

test("attempt labels handle Russian plurals and legacy history without inventing counts", () => {
  for (const [value, expected] of [[1, "1 попытка"], [2, "2 попытки"], [4, "4 попытки"], [5, "5 попыток"], [11, "11 попыток"], [14, "14 попыток"], [21, "21 попытка"], [22, "22 попытки"]]) {
    assert.equal(formatAttemptCount(value), expected);
  }
  const legacy = { pickaxeCount: 4, exitLevel: 48 };
  assert.equal(formatAttemptCount((legacy as { attemptCount?: number }).attemptCount), "Старый план");
  for (const value of [undefined, null, 0, -1, 2.5, "4", NaN, Infinity]) {
    assert.equal(formatAttemptCount(value), "Старый план");
  }
});

test("signal API returns the new contract for all choices and rejects invalid requests", async () => {
  for (const pickaxe of PICKAXE_KINDS) for (const mode of Object.keys(PICKAXE_MODES)) {
    const response = await POST(new Request("https://example.test/api/signal", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ game: "falling-pickaxe", options: { pickaxe, mode } }),
    }));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const body = await response.json();
    assert.equal(body.success, true);
    assert.equal(body.signal.simulation, true);
    assert.equal(body.signal.data.pickaxe, pickaxe);
    assert.equal(body.signal.data.mode, mode);
    assert(Number.isInteger(body.signal.data.attemptCount));
    assert(!JSON.stringify(body).includes("portal"));
  }
  for (const [payload, status] of [
    [{ game: "falling-pickaxe", options: { mode: "guaranteed" } }, 400],
    [{ game: "viper-royale" }, 404],
  ] as const) {
    const response = await POST(new Request("https://example.test/api/signal", { method: "POST", body: JSON.stringify(payload) }));
    assert.equal(response.status, status);
    assert.equal((await response.json()).success, false);
  }
});
