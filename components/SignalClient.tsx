"use client";

import { useEffect, useRef, useState } from "react";
import { SignalResult } from "./SignalResult";
import type { GameSignal } from "@/lib/signals/types";

const HISTORY_KEY = "ai-signal-history-v1";
function saveHistory(signal: GameSignal) {
  try {
    const current: unknown = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    localStorage.setItem(HISTORY_KEY, JSON.stringify([signal, ...(Array.isArray(current) ? current : [])].slice(0, 50)));
  } catch { /* The result remains available when local storage is disabled. */ }
}

export function SignalClient({ game }: { game: string }) {
  const [mines, setMines] = useState(3);
  const [mode, setMode] = useState("balanced");
  const [signal, setSignal] = useState<GameSignal | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  const busy = useRef(false);
  const isMines = game === "mines";

  useEffect(() => () => controller.current?.abort(), []);
  useEffect(() => {
    if (!cooldown) return;
    const timer = window.setTimeout(() => setCooldown(value => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  async function generate() {
    if (busy.current || cooldown > 0) return;
    busy.current = true;
    const request = new AbortController();
    controller.current = request;
    setError(""); setSignal(null); setLoading(true);
    try {
      const response = await fetch("/api/signal", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ game, options: isMines ? { mines } : { mode } }), signal: request.signal,
      });
      const json = await response.json() as { success?: boolean; error?: string; signal?: GameSignal };
      if (!response.ok || !json.success || !json.signal) throw new Error("Не удалось создать сигнал. Попробуйте ещё раз.");
      if (request.signal.aborted) return;
      setSignal(json.signal); saveHistory(json.signal); setCooldown(5);
    } catch (e) {
      if (!request.signal.aborted) setError(e instanceof Error ? e.message : "Не удалось создать сигнал.");
    } finally {
      busy.current = false;
      if (!request.signal.aborted) setLoading(false);
    }
  }

  return <div className={`signal-game ${isMines ? "game-mines" : "game-tower"}`}>
    <div className="game-stage" aria-busy={loading}>
      <SignalResult game={game} signal={signal} mines={mines} loading={loading} />
      {loading && <div className="scene-loading" role="status"><span className="loading-spinner" />Создаём симуляцию…</div>}
    </div>
    <div className="game-controls">
      <div className="result-line" role="status" aria-live="polite">
        <span className={`status-dot ${signal ? "ready" : ""}`} />
        {loading ? "Генерация сигнала" : signal ? isMines ? `Отмечено клеток: ${(signal.data as { recommendedCount: number }).recommendedCount}` : `Остановка после ${(signal.data as { stopAfter: number }).stopAfter} этажа` : "Выберите настройки и получите сигнал"}
      </div>
      <fieldset disabled={loading} className="game-settings">
        <legend>{isMines ? "Количество мин" : "Режим риска"}</legend>
        <div className={`option-group ${isMines ? "four-options" : ""}`}>
          {(isMines ? [["1", "1"], ["3", "3"], ["5", "5"], ["7", "7"]] : [["safe", "Низкий"], ["balanced", "Средний"], ["aggressive", "Высокий"]]).map(([value, label]) => <button type="button" key={value} aria-pressed={isMines ? mines === Number(value) : mode === value} onClick={() => { if (isMines) setMines(Number(value)); else setMode(value); setSignal(null); setError(""); }}>{isMines && <img src="/games/mines/bomb.svg" alt="" />}{label}</button>)}
        </div>
      </fieldset>
      {error && <p className="signal-error" role="alert">{error}</p>}
      <button className="generate-button" type="button" onClick={generate} disabled={loading || cooldown > 0}>
        {!isMines && <img className="button-bolt bolt-left" src="/games/tower-rush/bolt.webp" alt="" />}
        <span>{loading ? "Создаём сигнал…" : cooldown > 0 ? `Новый сигнал через ${cooldown} с` : signal ? "Новый сигнал" : "Получить сигнал"}</span>
        {!isMines && <img className="button-bolt bolt-right" src="/games/tower-rush/bolt.webp" alt="" />}
      </button>
      <p className="simulation-note">Демонстрационная симуляция. Не предсказывает результат игры.</p>
    </div>
  </div>;
}
