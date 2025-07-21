import { Category } from "./category.enum";
import { Difficulty } from "./difficulty.enum";

export type QuestionOption = {
  category: Category;
  difficulty: Difficulty;
  questionId: string;
  points: number;
  isAvailable: boolean;
};
