export async function sendTelegramMessage(chatId: number | string, text: string) {
  const token = process.env.BOT_TOKEN;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!token) throw new Error("BOT_TOKEN is not configured");
  if (!appUrl) throw new Error("NEXT_PUBLIC_APP_URL is not configured");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_markup: {
        inline_keyboard: [[{ text: "🚀 ОТКРЫТЬ SIGNAL BOT", web_app: { url: appUrl } }]],
      },
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Telegram sendMessage failed: ${response.status}`);
}
