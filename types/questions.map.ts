import { Category } from "./category.enum";
import { Difficulty } from "./difficulty.enum";
import { Flags } from "./flag.enum";
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
        {
          question: "Who is the best goalscorer of all time?",
          answer: "Cristiano Ronaldo",
          flag: Flags.PLAYER,
        },
      ],
    },
    {
      difficulty: Difficulty.MID,
      questions: [
        {
          question: "Who won the first FIFA World Cup in 1930?",
          answer: "Uruguay",
          flag: Flags.COUNTRY,
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
          flag: Flags.COUNTRY,
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
          flag: Flags.COUNTRY,
        },
      ],
    },
    {
      difficulty: Difficulty.MID,
      questions: [
        {
          question: "In which country is the Maracanã Stadium located?",
          answer: "Brazil",
          flag: Flags.COUNTRY,
        },
      ],
    },
    {
      difficulty: Difficulty.PRO,
      questions: [
        {
          question: "Which African country hosted the 2010 FIFA World Cup?",
          answer: "South Africa",
          flag: Flags.COUNTRY,
        },
      ],
    },
  ],
};

export default questionsMap;
