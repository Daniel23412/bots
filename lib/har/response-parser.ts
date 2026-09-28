import { sanitizeObject } from "./request-parser";

export function parseResponse(content: unknown) {
  if (!content || typeof content !== "object") return null;
  const source = content as { text?: unknown; encoding?: unknown };
  if (typeof source.text !== "string") return null;
  const text = source.text;
  if (text.length > 250_000) return { truncated: true, size: text.length };
  if (source.encoding === "base64") return { encoded: "base64", size: text.length };
  try { return sanitizeObject(JSON.parse(text)); } catch { return text.slice(0, 30_000); }
}
