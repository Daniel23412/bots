import { AppShell } from "@/components/AppShell";
import { HistoryClient } from "@/components/HistoryClient";

export default function HistoryPage() {
  return <main className="site-page"><AppShell back active="history"><section className="history-shell"><div className="catalog-heading"><h1>История сигналов</h1><p>Последние результаты на этом устройстве.</p></div><HistoryClient /></section></AppShell></main>;
}
