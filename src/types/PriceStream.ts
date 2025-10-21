export interface PriceTick {
  timestamp: number;
  price: number;
}

export interface PriceStreamOptions {
  startPrice?: number;
}

export interface PriceStreamSubscriber {
  (priceTick: PriceTick): void;
}

export interface PriceStream {
  subscribe(subscriber: PriceStreamSubscriber): () => void;
  pause(): void;
  resume(): void;
  close(): void;
}
