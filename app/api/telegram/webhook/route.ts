import { NextResponse } from "next/server";
import { sendTelegramMessage } from "@/lib/telegram/api";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (expected) {
    const actual = request.headers.get("x-telegram-bot-api-secret-token");
    if (actual !== expected) return NextResponse.json({ ok: false }, { status: 401 });
  }
  const update = await request.json();
  const message = update?.message;
  const chatId = message?.chat?.id;
  const text = String(message?.text ?? "");
  if (chatId && text.startsWith("/start")) {
    await sendTelegramMessage(chatId, "Добро пожаловать в AI SIGNAL\n\nВыберите игру и откройте Mini App. Сигналы работают как симуляция механики, а не как гарантированное предсказание RNG.");
  }
  return NextResponse.json({ ok: true });
}
