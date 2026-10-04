import type { CSSProperties } from "react";
import type { GameSignal } from "@/lib/signals/types";

type MinesData = { recommendedCells: number[]; recommendedCount: number };
type TowerData = { stopAfter: number };
const frames = {
  "tower-1": [0, 359, 383, 323], "tower-2": [1355, 0, 299, 359],
  "tower-3": [499, 0, 281, 285], "tower-4": [1065, 0, 290, 345],
  "tower-5": [780, 0, 285, 333], sun: [383, 359, 719, 720],
  cloud: [0, 1207, 1068, 258], hook: [0, 0, 33, 72],
} as const;

export function TowerSprite({ name, className = "" }: { name: keyof typeof frames; className?: string }) {
  const [x, y, width, height] = frames[name];
  return <svg className={className} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
    <image href="/games/tower-rush/global.webp" x={-x} y={-y} width="1974" height="1741" />
  </svg>;
}

export function MinesScene({ signal, mines = 3, loading = false, preview = false }: { signal?: GameSignal | null; mines?: number; loading?: boolean; preview?: boolean }) {
  const data = signal?.data as MinesData | undefined;
  const cells = data?.recommendedCells ?? (preview ? [2, 6, 12, 18, 21] : []);
  return <div className={`mines-scene ${preview ? "scene-preview" : ""} ${loading ? "is-analyzing" : ""}`}>
    {!preview && <div className="mines-scene-top"><span className="mines-wordmark">MINES</span><span className="scene-label">СИМУЛЯЦИЯ</span></div>}
    <img className="mine-torch torch-left" src="/games/mines/torch-left.svg" alt="" />
    <img className="mine-torch torch-right" src="/games/mines/torch-right.svg" alt="" />
    <div className="mines-board" role="img" aria-label={cells.length ? `Поле Mines. Отмечены клетки: ${cells.map(c => c + 1).join(", ")}` : "Поле Mines: 25 закрытых клеток"}>
      {Array.from({ length: 25 }, (_, index) => {
        const order = cells.indexOf(index);
        return <div key={`${signal?.id ?? "idle"}-${index}`} className={`mine-cell ${order >= 0 ? "revealed" : ""}`} style={{ "--reveal-delay": `${order * 85}ms` } as CSSProperties} data-cell={index} data-revealed={order >= 0}>
          <img className="mine-tile" src={`/games/mines/tile-${index % 2 ? "b" : "a"}.svg`} alt="" />
          {order >= 0 && <img className="mine-crystal" src="/games/mines/crystal.svg" alt="" />}
        </div>;
      })}
    </div>
    {!preview && <div className="mine-counters"><span><img src="/games/mines/bomb.svg" alt="" />Мины <b>{mines}</b></span><span><img src="/games/mines/crystal.svg" alt="" />Кристаллы <b>{data?.recommendedCount ?? "—"}</b></span></div>}
  </div>;
}

export function TowerScene({ signal, loading = false, preview = false }: { signal?: GameSignal | null; loading?: boolean; preview?: boolean }) {
  const count = signal ? (signal.data as TowerData).stopAfter : preview ? 3 : 0;
  const width = preview ? 62 : count > 5 ? 40 : count > 3 ? 53 : 76;
  return <div className={`tower-scene ${preview ? "scene-preview" : ""} ${loading ? "is-analyzing" : ""}`} role="img" aria-label={count ? `Tower Rush: ${count} этажей. Остановка после ${count} этажа.` : "Tower Rush: площадка для строительства башни"}>
    <TowerSprite name="sun" className="tower-sun" />
    <TowerSprite name="cloud" className="tower-cloud cloud-one" />
    <TowerSprite name="cloud" className="tower-cloud cloud-two" />
    <img className="tower-city" src="/games/tower-rush/background-front.webp" alt="" />
    {!preview && <img className="tower-logo" src="/games/tower-rush/logo.webp" alt="Tower Rush" />}
    {!preview && <span className="scene-label tower-demo">СИМУЛЯЦИЯ</span>}
    <div className="tower-crane"><div className="tower-cable" /><TowerSprite name="hook" /></div>
    <div key={signal?.id ?? "idle"} className="tower-assembly" style={{ "--floor-width": `${width}px` } as CSSProperties}>
      <img className="tower-base" src="/games/tower-rush/base.webp" alt="" />
      <div className="tower-floors">
        {Array.from({ length: count }, (_, i) => <div className="tower-floor" key={i} data-floor={i + 1} style={{ "--reveal-delay": `${i * 220}ms` } as CSSProperties}><TowerSprite name={`tower-${(i % 5) + 1}` as keyof typeof frames} /></div>)}
      </div>
    </div>
    {!preview && <div className={`tower-outcome ${count ? "has-result" : ""}`} aria-hidden="true">{count ? <><b>{count}</b><span>этажей<span className="tower-stop">Остановка здесь</span></span></> : <span>Башня готова к старту</span>}</div>}
  </div>;
}
