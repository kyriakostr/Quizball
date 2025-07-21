import { Category } from "./category.enum";
import { Difficulty } from "./difficulty.enum";

const categoryPlaysMap: Record<Category, Difficulty[]> = {
  [Category.HISTORY]: [Difficulty.AMATEUR, Difficulty.MID, Difficulty.PRO],
  [Category.GEOGRAPHY]: [Difficulty.AMATEUR, Difficulty.MID, Difficulty.PRO],
  [Category.PLAYERMISSING]: [
    Difficulty.AMATEUR,
    Difficulty.MID,
    Difficulty.PRO,
  ],
};

export default categoryPlaysMap;
