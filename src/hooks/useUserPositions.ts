import { useState, useEffect } from "react";
import type { UserPosition } from "../types/UserPosition";
import { fetchUserPositions, type UserPositionResponse } from "../api/fetchUserPositions";
import { isTickerSymbol } from "../types/TickerSymbols";

interface UseUserPositionsReturn {
  positions: UserPosition[];
  isLoading: boolean;
  error: string | null;
}

export const useUserPositions = (): UseUserPositionsReturn => {
  const [positions, setPositions] = useState<UserPosition[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPositions = async () => {
    setIsLoading(true);
    try {
      const responses = await fetchUserPositions();
      setPositions(mapUserPositionsResponseToUserPositions(responses));
    } catch (error) {
      setPositions([]);
      setError(error instanceof Error ? error.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPositions();
  }, []);

  return {
    positions,
    isLoading,
    error,
  };
};

const mapUserPositionsResponseToUserPositions = (responses: UserPositionResponse[]): UserPosition[] => {
  return responses
    .map((response) => {
      if (!isTickerSymbol(response.symbol)) {
        console.warn(`Invalid ticker symbol: ${response.symbol}`);
        return null;
      }

      return {
        symbol: response.symbol,
        side: response.side,
        entryPrice: response.entryPriceInUSD,
        size: response.sizeInUSD,
      };
    })
    .filter((position): position is UserPosition => position !== null);
};
