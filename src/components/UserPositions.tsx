import { useUserPositions } from "../hooks/useUserPositions";
import { TickerPnLCard } from "./TickerPnLCard";

export const UserPositions = () => {
  const { positions, isLoading, error } = useUserPositions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h2 className="text-lg font-bold">Opened positions:</h2>
      {positions.length === 0 ? (
        <div>No positions found.</div>
      ) : (
        <ul className="flex flex-col gap-2">
          {positions.map((position, index) => {
            const key = `${position.symbol}-${position.side}-${index}`;
            return (
              <li key={key}>
                <TickerPnLCard {...position} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
