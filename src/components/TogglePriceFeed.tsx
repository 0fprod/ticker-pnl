export const TogglePriceFeed = ({ isPaused, togglePause }: { isPaused: boolean; togglePause: () => void }) => {
  return (
    <button className="py-1 bg-gray-200 text-gray-800 rounded-md cursor-pointer hover:bg-gray-300 min-w-24" onClick={togglePause}>
      {isPaused ? "▶️" : "⏸️"}
    </button>
  );
};
