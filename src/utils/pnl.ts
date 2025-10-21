import { SIDES, type Side } from "../types/Side";

export function pnlPercentage(side: Side, entry: number, current: number) {
  if (!entry || !current) return 0;
  const base = ((current - entry) / entry) * 100;

  return side === SIDES.LONG ? base : -base;
}

export function pnlAbsoluteFromPercentage(percentage: number, size: number) {
  return (percentage / 100) * size;
}
