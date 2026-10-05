"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./AppShell";
import { PickaxeScene } from "./PickaxeScene";
import { PickaxeSprite } from "./PickaxeSprite";
import { PICKAXES, PICKAXE_KINDS, PICKAXE_MODES, PRIORITY_LABELS } from "@/games/falling-pickaxe/config";
import type { PickaxeKind, PickaxeMode, PickaxeSignalData } from "@/games/falling-pickaxe/types";
import type { PickaxeSpriteName } from "@/games/falling-pickaxe/atlas";
import type { GameSignal } from "@/lib/signals/types";
import { saveSignalHistory } from "@/lib/signals/history";

export function PickaxeClient() {
  const [pickaxe, setPickaxe] = useState<PickaxeKind>("iron");
  const [mode, setMode] = useState<PickaxeMode>("balanced");
  const [signal, setSignal] = useState<GameSignal<PickaxeSignalData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [sound, setSound] = useState(false);
  const [error, setError] = useState("");
  const controller = useRef<AbortController | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    try { setSound(localStorage.getItem("ai-signal-pickaxe-sound") === "1"); } catch { /* optional preference */ }
    return () => { controller.current?.abort(); audio.current?.pause(); };
  }, []);
  useEffect(() => {
    if (!cooldown) return;
    const timer = window.setTimeout(() => setCooldown(value => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  function toggleSound() {
    const next = !sound;
    setSound(next);
    if (!next) audio.current?.pause();
    try { localStorage.setItem("ai-signal-pickaxe-sound", next ? "1" : "0"); } catch { /* optional preference */ }
  }
  function clearResult() { setSignal(null); setError(""); }
  async function generate() {
    if (busy.current || cooldown) return;
    busy.current = true;
    const request = new AbortController();
    controller.current = request;
    setLoading(true); clearResult();
    if (sound) {
      audio.current ??= new Audio("/games/falling-pickaxe/ore-hit.mp3");
      audio.current.volume = .3;
      audio.current.currentTime = 0;
      void audio.current.play().catch(() => { /* Browser may block sound. */ });
    }
    try {
      const response = await fetch("/api/signal", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ game: "falling-pickaxe", options: { pickaxe, mode } }), signal: request.signal });
      const json = await response.json() as { success?: boolean; signal?: GameSignal<PickaxeSignalData> };
      if (!response.ok || !json.success || !json.signal) throw new Error("Не удалось создать сигнал. Попробуйте ещё раз.");
      if (request.signal.aborted) return;
      setSignal(json.signal); saveSignalHistory(json.signal); setCooldown(5);
    } catch (e) {
      if (!request.signal.aborted) setError(e instanceof Error ? e.message : "Не удалось создать сигнал.");
    } finally {
      busy.current = false;
      if (!request.signal.aborted) setLoading(false);
    }
  }

  const data = signal?.data;
  return <div className="signal-game game-pickaxe">
    <div className="game-stage" aria-busy={loading}>
      <PickaxeScene signal={signal} pickaxe={pickaxe} />
      <button className="pickaxe-sound" type="button" aria-label={sound ? "Выключить звук" : "Включить звук"} aria-pressed={sound} onClick={toggleSound}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4V9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />{sound ? <path d="M16 8c2 2 2 6 0 8m3-11c4 4 4 10 0 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /> : <path d="m17 9 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />}</svg></button>
      {loading && <div className="scene-loading" role="status"><span className="loading-spinner" />Собираем план раунда…</div>}
    </div>
    <div className="game-controls">
      <div className="result-line" role="status" aria-live="polite"><span className={`status-dot ${signal ? "ready" : ""}`} />{loading ? "Создаём симуляцию" : data ? `План готов · кирок: ${data.pickaxeCount} · выход: ${data.exitLevel}` : "Настройте свою стратегию"}</div>
      <fieldset className="game-settings pickaxe-settings" disabled={loading}>
        <legend>Тип кирки</legend>
        <div className="pickaxe-options">{PICKAXE_KINDS.map(kind => <button type="button" key={kind} aria-label={`${PICKAXES[kind].label} кирка`} aria-pressed={pickaxe === kind} onClick={() => { setPickaxe(kind); clearResult(); }}><PickaxeSprite name={PICKAXES[kind].sprite as PickaxeSpriteName} /><span>{PICKAXES[kind].shortLabel}</span><small>{PICKAXES[kind].hp} HP</small></button>)}</div>
      </fieldset>
      <fieldset className="game-settings pickaxe-mode-settings" disabled={loading}><legend>Режим риска</legend><div className="option-group">{(Object.keys(PICKAXE_MODES) as PickaxeMode[]).map(value => <button type="button" key={value} aria-pressed={mode === value} onClick={() => { setMode(value); clearResult(); }}>{PICKAXE_MODES[value].label}</button>)}</div></fieldset>
      {error && <p className="signal-error" role="alert">{error}</p>}
      <button className="generate-button" type="button" onClick={generate} disabled={loading || cooldown > 0}><span>{loading ? "Создаём сигнал…" : cooldown ? `Новый сигнал через ${cooldown} с` : "Получить сигнал"}</span><ArrowIcon className="generate-arrow" /></button>
      {data && <section className="pickaxe-strategy" aria-label="Стратегия раунда" key={signal?.id}>
        <div className="pickaxe-strategy-heading"><h2>Ваш план раунда</h2><span>Демо</span></div>
        <div className="pickaxe-priorities">{data.priorities.map((priority, i) => <div key={priority} data-priority={priority}><b>{i+1}</b><PickaxeSprite name={priority} /><span>{PRIORITY_LABELS[priority]}</span></div>)}</div>
        <div className="pickaxe-actions"><div><PickaxeSprite name="crafting_table" /><span>Верстак<b>{data.upgrade ? "Улучшить кирку" : "Восстановить HP"}</b></span></div><div><PickaxeSprite name="tnt" /><span>TNT<b>{data.useTnt ? "Использовать" : "Пропустить"}</b></span></div></div>
        <p>Схема иллюстрирует стратегию, а не расположение блоков в реальном раунде.</p>
      </section>}
      <p className="simulation-note">Симуляция. Не предсказывает результат игры.</p>
    </div>
  </div>;
}
