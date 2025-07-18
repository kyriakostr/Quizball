import { Difficulty } from "./difficulty.enum";

export interface GameDetails {
  [key: string]: Difficulty[];
}
