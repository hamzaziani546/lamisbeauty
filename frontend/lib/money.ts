export function formatSar(amount: number): string {
  return `${amount.toLocaleString("ar-SA")} ريال`;
}

export function formatSarShort(amount: number): string {
  return `${amount} ريال`;
}
