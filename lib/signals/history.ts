import type { GameSignal } from "./types";

export const HISTORY_KEY = "ai-signal-history-v1";
export function saveSignalHistory(signal: GameSignal) {
  try {
    const current: unknown = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    localStorage.setItem(HISTORY_KEY, JSON.stringify([signal, ...(Array.isArray(current) ? current : [])].slice(0, 50)));
  } catch { /* Storage may be disabled; the visible result still works. */ }
}
