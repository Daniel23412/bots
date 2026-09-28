import { NextResponse } from "next/server";
import { publicGames } from "@/lib/signals/registry";

export async function GET(request: Request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || request.headers.get("x-admin-secret") !== secret) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({
    ok: true,
    parser: "OK",
    api: "OK",
    telegram: process.env.BOT_TOKEN && process.env.NEXT_PUBLIC_APP_URL ? "CONFIGURED" : "ENV REQUIRED",
    database: process.env.DATABASE_URL ? "CONFIGURED" : "OPTIONAL / NOT SET",
    cooldownSeconds: Number(process.env.SIGNAL_COOLDOWN_SECONDS || 5),
    games: publicGames().map((game) => ({ id: game.id, enabled: game.enabled, status: game.status })),
  });
}
