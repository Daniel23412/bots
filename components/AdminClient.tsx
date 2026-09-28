"use client";
import { useState } from "react";

type AdminStatus = {
  ok: boolean;
  parser: string;
  api: string;
  telegram: string;
  database: string;
  cooldownSeconds: number;
  games: Array<{ id: string; enabled: boolean; status: string }>;
};

export function AdminClient() {
  const [secret, setSecret] = useState("");
  const [data, setData] = useState<AdminStatus | null>(null);
  const [error, setError] = useState("");
  async function load() {
    setError("");
    const response = await fetch("/api/admin/status", { headers: { "x-admin-secret": secret } });
    const json = await response.json() as AdminStatus & { error?: string };
    if (!response.ok) { setError(json.error || "Error"); return; }
    setData(json);
  }
  return <div className="space-y-4"><div className="rounded-3xl border border-white/10 bg-white/[.03] p-4"><label className="text-xs text-white/40">ADMIN_SECRET</label><input value={secret} onChange={(e)=>setSecret(e.target.value)} type="password" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-emerald-400/40" /><button onClick={load} className="mt-3 w-full rounded-2xl bg-emerald-400 py-3 font-black text-[#04110a]">OPEN DEBUG</button></div>{error ? <div className="text-sm text-red-300">{error}</div> : null}{data ? <pre className="overflow-auto rounded-3xl border border-white/10 bg-black/35 p-4 text-xs leading-6 text-emerald-200">{JSON.stringify(data,null,2)}</pre> : null}</div>;
}
