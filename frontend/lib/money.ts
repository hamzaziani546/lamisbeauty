import { MARKET } from "@/config/market";

export function formatMad(amount: number): string {
  return `${amount.toLocaleString("ar-MA")} ${MARKET.currencyLabelAr}`;
}

export function formatMadShort(amount: number): string {
  return `${amount} ${MARKET.currencyLabelAr}`;
}
