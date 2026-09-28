import Link from "next/link";

export function Header({ back = false }: { back?: boolean }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#070b0d]/85 px-4 pb-3 pt-[max(14px,env(safe-area-inset-top))] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-md items-center justify-between">
        <div className="flex items-center gap-3">
          {back ? <Link href="/" className="grid h-9 w-9 place-items-center rounded-full bg-white/5 text-lg">‹</Link> : null}
          <div>
            <div className="text-[10px] font-semibold tracking-[.28em] text-emerald-400">AI SIGNAL</div>
            <div className="text-sm font-bold">Game Signal Lab</div>
          </div>
        </div>
        <Link href="/history" className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-white/75">История</Link>
      </div>
    </header>
  );
}
