import Link from "next/link";
import { Header } from "./Header";

export function ArrowIcon({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function GamesIcon() {
  return <svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M8.4 5.4c3.6-1.3 7.6-1.3 11.2 0 2.1.8 3 3.5 3.7 6.4l1.8 7.3c.9 4-2.5 5.8-4.8 2.8l-2.4-3.1h-7.8l-2.4 3.1c-2.3 3-5.7 1.2-4.8-2.8l1.8-7.3c.7-2.9 1.6-5.6 3.7-6.4Z" stroke="currentColor" strokeWidth="2" /><path d="M8.5 9v6m-3-3h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="18" cy="10" r="1.5" fill="currentColor" /><circle cx="21" cy="13.5" r="1.5" fill="currentColor" /></svg>;
}

function HistoryIcon() {
  return <svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M4.5 11A10 10 0 1 1 5 19M4 5v6h6m4-4v7l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function AppShell({ children, back = false, active = "games" }: { children: React.ReactNode; back?: boolean; active?: "games" | "history" }) {
  return <div className={`app-frame ${active === "history" ? "history-frame" : ""}`}>
    <Header back={back} />
    {children}
    <nav className="bottom-nav" aria-label="Основное меню">
      <Link href="/" aria-current={active === "games" ? "page" : undefined}><GamesIcon /><span>Игры</span></Link>
      <Link href="/history" aria-current={active === "history" ? "page" : undefined}><HistoryIcon /><span>История</span></Link>
    </nav>
  </div>;
}
