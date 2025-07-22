import { Category } from "./category.enum";
import { Difficulty } from "./difficulty.enum";

const categoryPlaysMap: Record<Category, Difficulty[]> = {
  [Category.HISTORY]: [Difficulty.AMATEUR, Difficulty.MID, Difficulty.PRO],
  [Category.GEOGRAPHY]: [Difficulty.AMATEUR, Difficulty.MID, Difficulty.PRO],
  [Category.TOP5]: [Difficulty.PRO, Difficulty.PRO],
  [Category.PLAYERMISSING]: [Difficulty.PRO, Difficulty.PRO],
  [Category.PLAYERID]: [Difficulty.MID, Difficulty.MID],
};

export default categoryPlaysMap;
