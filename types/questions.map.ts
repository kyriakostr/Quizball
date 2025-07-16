import { Category } from "./category.enum";
import { Difficulty } from "./difficulty.enum";
import { Question } from "./question.type";

const questionsMap: Record<
  Category,
  {
    difficulty: Difficulty;
    questions: Question[];
  }[]
> = {
  [Category.HISTORY]: [
    {
      difficulty: Difficulty.AMATEUR,
      questions: [
        {
          question: "How many ballon dors has Lionel Messi won?",
          answer: 8,
        },
      ],
    },
  ],
  [Category.GEOGRAPHY]: [
    {
      difficulty: Difficulty.AMATEUR,
      questions: [
        {
          question: "From which country is Real Madrid?",
          answer: "Spain",
        },
      ],
    },
  ],
};

export default questionsMap;
