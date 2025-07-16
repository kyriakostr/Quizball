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
    {
      difficulty: Difficulty.MID,
      questions: [
        {
          question: "Who won the first FIFA World Cup in 1930?",
          answer: "Uruguay",
        },
      ],
    },
    {
      difficulty: Difficulty.PRO,
      questions: [
        {
          question:
            "Which African country was the first to reach a World Cup quarter-final?",
          answer: "Cameroon",
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
    {
      difficulty: Difficulty.MID,
      questions: [
        {
          question: "In which country is the Maracanã Stadium located?",
          answer: "Brazil",
        },
      ],
    },
    {
      difficulty: Difficulty.PRO,
      questions: [
        {
          question: "Which African country hosted the 2010 FIFA World Cup?",
          answer: "South Africa",
        },
      ],
    },
  ],
};

export default questionsMap;
