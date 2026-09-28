import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { getGame } from "@/lib/signals/registry";

export default async function DebugGamePage({params}:{params:Promise<{game:string}>}){
  const {game:id}=await params;
  const game=getGame(id);
  if(!game) notFound();
  return <main className="min-h-dvh safe-bottom"><Header back/><section className="mx-auto w-full max-w-md px-4 py-6"><div className="text-[10px] font-bold tracking-[.24em] text-emerald-300">DEBUG</div><h1 className="mt-1 text-3xl font-black">{game.title}</h1><div className="mt-5 space-y-2">{[["Game config","OK"],["Signal engine",game.provider?"OK":"PENDING"],["Frontend",game.enabled?"OK":"PENDING"],["API",game.provider?"OK":"PENDING"],["HAR parser","READY FOR INPUT"]].map(([label,value])=><div key={label} className="flex justify-between rounded-2xl border border-white/10 bg-white/[.03] p-4"><span>{label}</span><b className="text-emerald-300">{value}</b></div>)}</div></section></main>
}
