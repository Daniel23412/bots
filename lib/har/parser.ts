import path from "node:path";
import { parseHeaders, parsePayload, sanitizeObject } from "./request-parser";
import { parseResponse } from "./response-parser";
import type { NormalizedHar } from "./schemas";

const GAME_HINTS: Array<[string, RegExp]> = [
  ["mines", /cavemines|stake[-_ ]?mines|\/mines\b/i],
  ["tower-rush", /tower[-_ ]?rush|towerrush|galaxsys/i],
  ["falling-pickaxe", /falling[-_ ]?pickaxe|pickaxe/i],
  ["viper-royale", /viper[-_ ]?royale|slither|snake/i],
  ["wheel-out", /wheel[-_ ]?out|inout/i],
  ["aviamasters", /avia[-_ ]?masters|aviamasters/i],
];

function collectKeyValues(value: unknown, matcher: RegExp, output: string[]) {
  if (!value || output.length > 200) return;
  if (Array.isArray(value)) {
    value.forEach((item) => collectKeyValues(item, matcher, output));
    return;
  }
  if (typeof value !== "object") return;
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (matcher.test(key) && ["string", "number"].includes(typeof child)) output.push(String(child));
    collectKeyValues(child, matcher, output);
  }
}

function collectNumbers(value: unknown, matcher: RegExp, output: number[]) {
  if (!value || output.length > 300) return;
  if (Array.isArray(value)) {
    value.forEach((item) => collectNumbers(item, matcher, output));
    return;
  }
  if (typeof value !== "object") return;
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (matcher.test(key) && typeof child === "number" && Number.isFinite(child)) output.push(child);
    collectNumbers(child, matcher, output);
  }
}

export function detectGame(raw: unknown, sourceName = "") {
  const text = `${sourceName}\n${JSON.stringify(raw).slice(0, 2_000_000)}`;
  let best = { game: "unknown", score: 0 };
  for (const [game, matcher] of GAME_HINTS) {
    const flags = matcher.flags.includes("g") ? matcher.flags : `${matcher.flags}g`;
    const matches = text.match(new RegExp(matcher.source, flags));
    const score = matches?.length ?? 0;
    if (score > best.score) best = { game, score };
  }
  return { game: best.game, confidence: best.score === 0 ? 0 : Math.min(0.99, 0.55 + best.score * 0.04) };
}

export function parseHar(raw: unknown, source = "input.har"): NormalizedHar {
  const root = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
  const log = root.log && typeof root.log === "object" ? root.log as Record<string, unknown> : {};
  const entries = Array.isArray(log.entries) ? log.entries as Array<Record<string, unknown>> : [];
  const requests = entries.map((entry) => {
    const request = entry.request && typeof entry.request === "object" ? entry.request as Record<string, unknown> : {};
    const response = entry.response && typeof entry.response === "object" ? entry.response as Record<string, unknown> : {};
    let parsedUrl: URL;
    try { parsedUrl = new URL(String(request.url ?? "http://invalid.local/")); }
    catch { parsedUrl = new URL("http://invalid.local/"); }
    const query = Object.fromEntries(parsedUrl.searchParams.entries());
    const responseContent = response.content && typeof response.content === "object" ? response.content as Record<string, unknown> : {};
    return {
      url: parsedUrl.toString(),
      method: String(request.method ?? "GET"),
      host: parsedUrl.host,
      pathname: parsedUrl.pathname,
      query,
      headers: parseHeaders(Array.isArray(request.headers) ? request.headers as Array<{name?:string;value?:string}> : []),
      payload: parsePayload(request.postData),
      response: parseResponse(responseContent),
      status: typeof response.status === "number" ? response.status : null,
      mimeType: typeof responseContent.mimeType === "string" ? responseContent.mimeType : null,
    };
  });

  const websockets = entries
    .filter((entry) => Array.isArray(entry._webSocketMessages))
    .map((entry) => {
      const request = entry.request && typeof entry.request === "object" ? entry.request as Record<string, unknown> : {};
      const messages = entry._webSocketMessages as Array<Record<string, unknown>>;
      return {
        url: String(request.url ?? ""),
        messages: messages.map((message) => ({
          type: String(message.type ?? message.opcode ?? "message"),
          data: sanitizeObject(message.data ?? message.payload ?? null),
        })),
      };
    });

  const assetRe = /\.(?:png|jpe?g|webp|svg|gif|mp3|ogg|wav|woff2?|ttf|json)(?:\?|$)/i;
  const assets = [...new Set(requests.map((request) => request.url).filter((url) => assetRe.test(url)))];
  const detect = detectGame(raw, path.basename(source));

  const safeRaw = sanitizeObject(raw);
  const gameIds: string[] = [];
  const roundIds: string[] = [];
  const multipliers: number[] = [];
  collectKeyValues(safeRaw, /^(game_?id|gameId)$/i, gameIds);
  collectKeyValues(safeRaw, /^(round_?id|roundId|ticketId)$/i, roundIds);
  collectNumbers(safeRaw, /multiplier|coefficient|coef|cashout/i, multipliers);

  return {
    source: path.basename(source),
    game: detect.game,
    confidence: detect.confidence,
    requests,
    websockets,
    assets,
    discovered: {
      gameIds: [...new Set(gameIds)].slice(0, 100),
      roundIds: [...new Set(roundIds)].slice(0, 100),
      multipliers: [...new Set(multipliers)].slice(0, 200),
    },
  };
}
