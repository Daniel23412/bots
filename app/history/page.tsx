import { Header } from "@/components/Header";
import { HistoryClient } from "@/components/HistoryClient";
export default function HistoryPage() {
  return <main className="safe-bottom"><Header back /><section className="history-shell"><div className="catalog-heading"><div><span className="eyebrow">ВАШИ СИМУЛЯЦИИ</span><h1>История сигналов</h1><p>Последние 50 результатов на этом устройстве.</p></div></div><HistoryClient /></section></main>;
}
