import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (expected) {
    const actual = request.headers.get("x-telegram-bot-api-secret-token");
    if (actual !== expected) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
  }

  const update = await request.json();
  const message = update?.message;
  const chatId = message?.chat?.id;
  const text = String(message?.text ?? "");

  if (chatId && text.startsWith("/start")) {
    const appUrl = new URL(request.url).origin;

    // Telegram supports calling a Bot API method directly in the webhook response.
    // This means the deployed app does not need BOT_TOKEN stored in Vercel.
    return NextResponse.json({
      method: "sendMessage",
      chat_id: chatId,
      text: "Добро пожаловать в AI SIGNAL\n\nВыберите игру и откройте Mini App. Сигналы работают как симуляция механики, а не как гарантированное предсказание RNG.",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🚀 ОТКРЫТЬ SIGNAL BOT",
              web_app: { url: appUrl },
            },
          ],
        ],
      },
    });
  }

  return NextResponse.json({ ok: true });
}
