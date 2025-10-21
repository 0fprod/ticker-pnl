import type { Side } from "./Side";
import type { TickerSymbol } from "./TickerSymbols";

export interface UserPosition {
  symbol: TickerSymbol;
  side: Side;
  entryPrice: number;
  size: number;
}
