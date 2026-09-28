import { NextResponse } from "next/server";
import { publicGames } from "@/lib/signals/registry";

export async function GET() {
  return NextResponse.json({ games: publicGames() }, { headers: { "cache-control": "public, max-age=60" } });
}
