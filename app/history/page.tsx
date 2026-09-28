import { Header } from "@/components/Header";
import { HistoryClient } from "@/components/HistoryClient";

export default function HistoryPage() {
  return <main className="min-h-dvh safe-bottom"><Header back /><section className="mx-auto w-full max-w-md px-4 py-6"><div className="text-[10px] font-bold tracking-[.24em] text-emerald-300">SIGNALS</div><h1 className="mt-1 text-3xl font-black">История</h1><div className="mt-5"><HistoryClient /></div></section></main>;
}
