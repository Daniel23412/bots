import type { NormalizedHar } from "@/lib/har/schemas";

export function summarizeTowerRushHar(har: NormalizedHar) {
  const stateLike = har.requests.filter((entry) => /state|floor|tower|ticket|game/i.test(entry.url));
  return {
    game: "tower-rush",
    requests: har.requests.length,
    stateLikeRequests: stateLike.length,
    websockets: har.websockets.length,
    notes: ["Existing panel runtime exposes gameInfo, floorsInfo, nextFloorType, bet and result-related state."],
  };
}
