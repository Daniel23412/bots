import type { CSSProperties } from "react";
import type { GameSignal } from "@/lib/signals/types";
import type { PickaxeKind, PickaxeSignalData } from "@/games/falling-pickaxe/types";
import type { PickaxeSpriteName } from "@/games/falling-pickaxe/atlas";
import { PICKAXES } from "@/games/falling-pickaxe/config";
import { PickaxeSprite } from "./PickaxeSprite";

function decorativeBlock(index: number): PickaxeSpriteName {
  // Deterministic decoration: identical during server render and hydration.
  let hash = Math.imul(index + 17, 0x45d9f3b);
  hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b);
  const value = (hash >>> 0) % 100;
  return value < 55 ? "stone" : value < 78 ? "cobblestone" : value < 88 ? "copper" : value < 95 ? "redstone" : "gold";
}

export function PickaxeScene({ signal, pickaxe = "iron", preview = false }: { signal?: GameSignal<PickaxeSignalData> | null; pickaxe?: PickaxeKind; preview?: boolean }) {
  const data = signal?.data;
  const selected = PICKAXES[data?.pickaxe ?? (preview ? "diamond" : pickaxe)];
  const route = data?.route ?? [];
  const points = [{ column: 4, row: -1 }, ...route];
  const path = points.map((p, index) => `${index ? "L" : "M"}${(p.column + .5) * 10} ${(p.row + .5) * 10}`).join(" ");
  return <div className={`pickaxe-scene ${preview ? "pickaxe-preview" : ""} ${data ? "has-plan" : ""}`}>
    <div className="pickaxe-landscape" />
    <div className="pickaxe-shade" />
    {!preview && <div className="pickaxe-scene-heading"><strong>FALLING PICKAXE</strong><span>План раунда · версия с порталом</span></div>}
    <div key={signal?.id ?? "idle"} className="pickaxe-map" role="img" aria-label={data ? `Схема стратегии. ${selected.label} кирка, ${data.pickaxeCount} шт. Выход в портал на уровне ${data.exitLevel}.` : "Шахта Falling Pickaxe с оригинальными блоками игры"}>
      <div className="pickaxe-blocks" aria-hidden="true">{Array.from({ length: 120 }, (_, index) => {
        const row = Math.floor(index / 10), column = index % 10;
        const step = route.find(item => item.row === row && item.column === column);
        const isTarget = step && step.target !== "portal";
        const name: PickaxeSpriteName = isTarget ? step.target as PickaxeSpriteName : row === 0 ? "grass" : decorativeBlock(index);
        return <span key={index} className={`pickaxe-block ${isTarget ? "is-target" : ""}`} data-target={isTarget ? step.target : undefined} style={{ "--step-delay": `${route.indexOf(step!) * 220}ms` } as CSSProperties}><PickaxeSprite name={name} /></span>;
      })}</div>
      {data && <svg className="pickaxe-route" viewBox="0 0 100 120" preserveAspectRatio="none" aria-hidden="true"><path d={path} fill="none" stroke="#b075ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><path className="pickaxe-route-flow" d={path} fill="none" stroke="#f5e9ff" strokeWidth=".65" strokeDasharray="1 5" />{route.slice(0,-1).map((step,i) => <circle key={i} cx={(step.column+.5)*10} cy={(step.row+.5)*10} r="3.5" fill="#9c52ff" stroke="#fff" strokeWidth=".6" />)}</svg>}
      <div className="pickaxe-hero" aria-hidden="true"><PickaxeSprite name={selected.sprite as PickaxeSpriteName} /></div>
      <div className={`pickaxe-portal ${data ? "portal-ready" : ""}`} aria-hidden="true"><span /><i /><b /></div>
    </div>
    {!preview && <>
      <div className="pickaxe-hp"><PickaxeSprite name="heart" /><b>{selected.hp}</b><span>HP</span></div>
      {data && <div className="pickaxe-party" aria-label={`Количество кирок: ${data.pickaxeCount}`}><span>КИРКИ</span><b>×{data.pickaxeCount}</b>{Array.from({ length: data.pickaxeCount }, (_, i) => <PickaxeSprite key={i} name={selected.sprite as PickaxeSpriteName} />)}</div>}
      <div className="pickaxe-exit" data-exit-level={data?.exitLevel}><span className={data ? "status-dot ready" : "status-dot"} />{data ? <>Портал · уровень <b>{data.exitLevel}</b></> : "Выберите кирку и режим"}</div>
    </>}
  </div>;
}
