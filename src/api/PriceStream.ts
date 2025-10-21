import type { PriceStreamOptions, PriceStreamSubscriber, PriceTick } from "../types/PriceStream";

const DEFAULT_PRICE_FEED_INTERVAL = 2_000;

export function createMockPriceStream(options: PriceStreamOptions = {}) {
  let currentPrice = options.startPrice ?? 67_000;
  let isStreamActive = true;
  const subscribers = new Set<PriceStreamSubscriber>();

  const generatePriceTick = (): PriceTick => {
    const drift = (Math.random() - 0.5) * 30; // random walk
    currentPrice = Math.max(100, currentPrice + drift);
    return { timestamp: Date.now(), price: currentPrice };
  };

  const notifySubscribers = (priceTick: PriceTick) => {
    subscribers.forEach((subscriber) => subscriber(priceTick));
  };

  const tick = () => {
    if (!isStreamActive) return;

    const priceTick = generatePriceTick();
    notifySubscribers(priceTick);
  };

  const tickIntervalId = setInterval(tick, DEFAULT_PRICE_FEED_INTERVAL);

  const subscribe = (subscriber: PriceStreamSubscriber) => {
    subscribers.add(subscriber);
    subscriber({ timestamp: Date.now(), price: currentPrice });

    return () => subscribers.delete(subscriber);
  };

  const pause = () => {
    isStreamActive = false;
  };

  const resume = () => {
    isStreamActive = true;
  };

  const close = () => {
    clearInterval(tickIntervalId);
    subscribers.clear();
  };

  return { subscribe, pause, resume, close };
}
