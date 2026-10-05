import { PICKAXE_ATLAS, type PickaxeSpriteName } from "@/games/falling-pickaxe/atlas";

export function PickaxeSprite({ name, className = "" }: { name: PickaxeSpriteName; className?: string }) {
  const frame = PICKAXE_ATLAS[name];
  return <svg className={`pickaxe-sprite ${className}`} viewBox={`0 0 ${frame.w} ${frame.h}`} aria-hidden="true" focusable="false">
    <image href="/games/falling-pickaxe/atlas.png" x={-frame.x} y={-frame.y} width="366" height="346" />
  </svg>;
}
