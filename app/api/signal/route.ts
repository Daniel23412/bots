import { NextResponse } from "next/server";
import { getGame } from "@/lib/signals/registry";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const gameId = typeof body?.game === "string" ? body.game : "";
    const game = getGame(gameId);
    if (!game?.enabled || !game.provider) return NextResponse.json({ success: false, error: "Game is not available" }, { status: 404 });
    const signal = await game.provider.generateSignal(body?.options ?? {});
    return NextResponse.json({ success: true, signal }, { headers: { "cache-control": "no-store" } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
