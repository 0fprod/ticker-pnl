export const SIDES = {
  LONG: "LONG",
  SHORT: "SHORT",
} as const;

export type Side = (typeof SIDES)[keyof typeof SIDES];
