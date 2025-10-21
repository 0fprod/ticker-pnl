import type { Side } from "../types/Side";
import type { TickerSymbol } from "../types/TickerSymbols";
import { SideChip } from "./Side";
import { usePriceFeed } from "../hooks/usePriceFeed";
import { pnlAbsoluteFromPercentage, pnlPercentage } from "../utils/pnl";
import { clsx } from "clsx";
import { format } from "@0fprod/smart-amount";
import { TogglePriceFeed } from "./TogglePriceFeed";

interface TickerPnLCardProps {
  symbol: TickerSymbol;
  side: Side;
  entryPrice: number;
  size: number;
}

export const TickerPnLCard = ({ symbol, side, entryPrice, size }: TickerPnLCardProps) => {
  const { price, isPaused, togglePause } = usePriceFeed(symbol);

  const pnlPercentageValue = pnlPercentage(side, entryPrice, price);
  const pnlAbsoluteValue = pnlAbsoluteFromPercentage(pnlPercentageValue, size);

  return (
    <div
      className={clsx("border border-gray-300 rounded-md p-4 min-w-120 flex flex-col gap-4", isPaused && "opacity-50")}
      role="region"
      aria-label={`${symbol} position - ${side} - Current PnL: ${format(pnlAbsoluteValue)}`}
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 items-start justify-between">
          <p className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">{symbol}</span> <SideChip side={side} />
          </p>
          <p className="text-black text-2xl font-bold">{format(price)}</p>
          <p className="text-gray-400 text-sm">
            Opened at: {format(entryPrice)} with {format(size)}{" "}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-end justify-between">
          <p
            className={clsx({
              "text-green-500": pnlPercentageValue > 0,
              "text-red-500": pnlPercentageValue < 0,
            })}
          >
            {format(pnlPercentageValue, { type: "percentage", showSign: true })}
          </p>
          <p
            className={clsx("text-lg", {
              "text-green-500": pnlPercentageValue > 0,
              "text-red-500": pnlPercentageValue < 0,
            })}
          >
            {format(pnlAbsoluteValue, { showSign: true })}
          </p>
          <p className="text-gray-400 text-sm">Balance: {format(pnlAbsoluteValue + size)}</p>
        </div>
      </div>

      <div className="flex justify-center">
        <TogglePriceFeed isPaused={isPaused} togglePause={togglePause} />
      </div>
    </div>
  );
};
