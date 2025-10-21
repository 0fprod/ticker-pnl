import { SIDES, type Side } from "../types/Side";
import { TICKER_SYMBOLS, type TickerSymbol } from "../types/TickerSymbols";

export type UserPositionResponse = {
  symbol: TickerSymbol;
  side: Side;
  entryPriceInUSD: number;
  sizeInUSD: number;
};

export const fetchUserPositions = async (): Promise<Array<UserPositionResponse>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return [
    {
      symbol: TICKER_SYMBOLS.BTC_PERP,
      side: SIDES.LONG,
      entryPriceInUSD: 50000,
      sizeInUSD: 1000,
    },
    {
      symbol: TICKER_SYMBOLS.BTC_PERP,
      side: SIDES.SHORT,
      entryPriceInUSD: 65000,
      sizeInUSD: 500,
    },
  ];
};
