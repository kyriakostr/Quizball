import { Difficulty } from "./difficulty.enum";

export const pointSystemMap: Record<Difficulty, number> = {
  [Difficulty.AMATEUR]: 1,
  [Difficulty.MID]: 2,
  [Difficulty.PRO]: 3,
};
