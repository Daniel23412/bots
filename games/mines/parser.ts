import type { NormalizedHar } from "@/lib/har/schemas";

export function summarizeMinesHar(har: NormalizedHar) {
  const roundLike = har.requests.filter((entry) => /round|bet|play|state|mine/i.test(entry.url));
  return {
    game: "mines",
    requests: har.requests.length,
    roundLikeRequests: roundLike.length,
    websockets: har.websockets.length,
    notes: ["Existing panel replay uses a 5×5 Mines layout and local HAR replay mode."],
  };
}
