/** Old plans counted pickaxes, not attempts: never relabel them as new results. */
export function formatAttemptCount(count: unknown): string {
  if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 1) return "Старый план";
  const lastTwo = count % 100;
  const last = count % 10;
  const unit = lastTwo >= 11 && lastTwo <= 14 ? "попыток" : last === 1 ? "попытка" : last >= 2 && last <= 4 ? "попытки" : "попыток";
  return `${count} ${unit}`;
}
