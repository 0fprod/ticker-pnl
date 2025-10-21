import { clsx } from "clsx";
import { SIDES, type Side } from "../types/Side";

export const SideChip = ({ side }: { side: Side }) => {
  return (
    <span
      className={clsx(
        "text-xs font-medium capitalize px-2 py-1 rounded-md cursor-default",
        side === SIDES.LONG ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
      )}
    >
      {side}
    </span>
  );
};
