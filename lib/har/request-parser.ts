const SECRET_HEADERS = new Set(["authorization", "cookie", "set-cookie", "x-api-key"]);
const SECRET_KEYS = /token|secret|session|authorization|cookie|password|jwt/i;

export function sanitizeObject(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sanitizeObject);
  if (!value || typeof value !== "object") return value;
  const out: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    out[key] = SECRET_KEYS.test(key) ? "[REDACTED]" : sanitizeObject(child);
  }
  return out;
}

export function parseHeaders(headers: Array<{ name?: string; value?: string }> = []) {
  const out: Record<string, string> = {};
  for (const header of headers) {
    const name = String(header.name ?? "").trim();
    if (!name || SECRET_HEADERS.has(name.toLowerCase())) continue;
    out[name] = String(header.value ?? "");
  }
  return out;
}

export function parsePayload(postData: unknown) {
  if (!postData || typeof postData !== "object") return null;
  const source = postData as { params?: unknown; text?: unknown };
  if (source.params) return sanitizeObject(source.params);
  if (typeof source.text !== "string") return null;
  try { return sanitizeObject(JSON.parse(source.text)); } catch { return source.text.slice(0, 20_000); }
}
