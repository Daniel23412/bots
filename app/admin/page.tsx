import { Header } from "@/components/Header";
import { AdminClient } from "@/components/AdminClient";

export default function AdminPage(){
  return <main className="min-h-dvh safe-bottom"><Header back /><section className="mx-auto w-full max-w-md px-4 py-6"><div className="text-[10px] font-bold tracking-[.24em] text-emerald-300">ADMIN</div><h1 className="mt-1 text-3xl font-black">Debug panel</h1><p className="mt-2 text-sm text-white/40">Скрытый технический экран. Доступ только по ADMIN_SECRET.</p><div className="mt-5"><AdminClient /></div></section></main>
}
