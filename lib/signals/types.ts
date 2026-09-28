export type RiskLevel = "low" | "medium" | "high";

export type SignalOptions = Record<string, unknown>;

export type GameSignal<T = unknown> = {
  id: string;
  game: string;
  createdAt: number;
  risk: RiskLevel;
  simulation: true;
  data: T;
};

export interface SignalProvider<TOptions extends SignalOptions = SignalOptions, TData = unknown> {
  generateSignal(options: TOptions): Promise<GameSignal<TData>>;
}

export type GameDefinition = {
  id: string;
  title: string;
  icon: string;
  description: string;
  category: string;
  enabled: boolean;
  status: "ready" | "next";
  provider?: SignalProvider;
};
