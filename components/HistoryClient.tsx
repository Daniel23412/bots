"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { GameSignal } from "@/lib/signals/types";

type HistoryData = { recommendedCount?: number; stopAfter?: number };
const riskLabels = { low: "Низкий риск", medium: "Средний риск", high: "Высокий риск" };
export function HistoryClient() {
  const [items, setItems] = useState<GameSignal[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem("ai-signal-history-v1") || "[]");
      if (Array.isArray(parsed)) setItems(parsed.filter(item => item && typeof item.id === "string" && item.data && ["mines", "tower-rush"].includes(item.game)));
    } catch { /* A missing history should not block navigation. */ }
    setLoaded(true);
  }, []);
  if (!loaded) return <p className="empty-history" role="status">Загружаем историю…</p>;
  if (!items.length) return <div className="empty-history"><h2>Пока нет сигналов</h2><p>Результаты появятся здесь после первой симуляции.</p><Link href="/">Выбрать игру →</Link></div>;
  return <div className="history-list">{items.map(signal => {
    const mines = signal.game === "mines";
    const data = signal.data as HistoryData;
    return <div className="history-row" key={signal.id}><div className={`history-art ${mines ? "" : "history-tower"}`}><img src={mines ? "/games/mines/crystal.svg" : "/games/tower-rush/logo.webp"} alt="" /></div><div className="history-name"><b>{mines ? "Mines" : "Tower Rush"}</b><time dateTime={new Date(signal.createdAt).toISOString()}>{new Date(signal.createdAt).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</time></div><div className="history-value"><b>{mines ? `${data.recommendedCount ?? 0} клеток` : `${data.stopAfter ?? 0} этажей`}</b><span>{riskLabels[signal.risk] ?? "Симуляция"}</span></div></div>;
  })}</div>;
}
