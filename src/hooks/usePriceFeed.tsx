import { useEffect, useRef, useState } from "react";
import { createMockPriceStream } from "../api/PriceStream";
import type { PriceStream, PriceTick } from "../types/PriceStream";
import type { TickerSymbol } from "../types/TickerSymbols";

const HISTORY_WINDOW = 240;

export function usePriceFeed(symbol: TickerSymbol) {
  const streamRef = useRef<PriceStream | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [history, setHistory] = useState<PriceTick[]>([]);
  const [isPaused, setPaused] = useState(false);

  useEffect(() => {
    streamRef.current = createMockPriceStream();

    const unsubscribeFromStream = streamRef.current.subscribe((priceTick) => {
      setPrice(priceTick.price);
      setHistory((previousHistory) => [...previousHistory.slice(-HISTORY_WINDOW), priceTick]);
    });

    return () => {
      unsubscribeFromStream();
      streamRef.current?.close();
    };
  }, [symbol]);

  const togglePause = () => {
    setPaused((wasPaused) => {
      const shouldPause = !wasPaused;

      if (shouldPause) {
        streamRef.current?.pause();
      } else {
        streamRef.current?.resume();
      }

      return shouldPause;
    });
  };

  return { price, history, isPaused, togglePause };
}
