export const TICKER_SYMBOLS = {
  BTC_PERP: "BTC-PERP",
} as const;

export type TickerSymbol = (typeof TICKER_SYMBOLS)[keyof typeof TICKER_SYMBOLS];

export const isTickerSymbol = (symbol: string): symbol is TickerSymbol => {
  return Object.values(TICKER_SYMBOLS).includes(symbol as TickerSymbol);
};
