import fs from "node:fs";
import path from "node:path";
import { parseHar } from "../lib/har/parser";

const input = process.argv[2];
if (!input) {
  console.error("Usage: npm run parse:har -- ./har/game.har");
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), input);
const raw = JSON.parse(fs.readFileSync(fullPath, "utf8"));
const normalized = parseHar(raw, fullPath);
const slug = normalized.game === "unknown" ? path.basename(input, path.extname(input)).replace(/[^a-z0-9-]+/gi, "-").toLowerCase() : normalized.game;
const outDir = path.resolve(process.cwd(), "data/extracted");
fs.mkdirSync(outDir, { recursive: true });
const output = path.join(outDir, `${slug}.json`);
fs.writeFileSync(output, JSON.stringify(normalized, null, 2));

const apiRequests = normalized.requests.filter((item) => /json|api|round|state|game|play|bet/i.test(`${item.mimeType} ${item.pathname}`));
console.log(`Game detected: ${normalized.game} (${normalized.confidence.toFixed(2)})`);
console.log(`Requests: ${normalized.requests.length}`);
console.log(`Game API requests: ${apiRequests.length}`);
console.log(`WebSocket connections: ${normalized.websockets.length}`);
console.log(`Assets: ${normalized.assets.length}`);
console.log(`Output: ${path.relative(process.cwd(), output)}`);
