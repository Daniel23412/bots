export type NormalizedHarRequest = {
  url: string;
  method: string;
  host: string;
  pathname: string;
  query: Record<string, string>;
  headers: Record<string, string>;
  payload: unknown;
  response: unknown;
  status: number | null;
  mimeType: string | null;
};

export type NormalizedHarWebSocket = {
  url: string;
  messages: Array<{ type: string; data: unknown }>;
};

export type NormalizedHar = {
  source: string;
  game: string;
  confidence: number;
  requests: NormalizedHarRequest[];
  websockets: NormalizedHarWebSocket[];
  assets: string[];
  discovered: {
    gameIds: string[];
    roundIds: string[];
    multipliers: number[];
  };
};
