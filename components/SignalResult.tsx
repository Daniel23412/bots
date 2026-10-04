import type { GameSignal } from "@/lib/signals/types";
import { MinesScene, TowerScene } from "./GameScenes";

export function SignalResult({ game, signal, mines, loading }: { game: string; signal: GameSignal | null; mines: number; loading: boolean }) {
  return game === "mines" ? <MinesScene signal={signal} mines={mines} loading={loading} /> : <TowerScene signal={signal} loading={loading} />;
}
