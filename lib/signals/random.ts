import { randomInt, randomUUID } from "node:crypto";

export function signalId() {
  return `sig_${randomUUID().replaceAll("-", "").slice(0, 12)}`;
}

export function pickInt(min: number, max: number) {
  if (max < min) throw new Error("Invalid random range");
  return randomInt(min, max + 1);
}

export function sampleUnique(count: number, maxExclusive: number) {
  if (count > maxExclusive) throw new Error("Sample size exceeds population");
  const values = Array.from({ length: maxExclusive }, (_, index) => index);
  for (let i = values.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [values[i], values[j]] = [values[j], values[i]];
  }
  return values.slice(0, count).sort((a, b) => a - b);
}
