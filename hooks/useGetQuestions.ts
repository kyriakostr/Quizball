import { Category } from "@/types/category.enum";
import { Difficulty } from "@/types/difficulty.enum";
import { Question } from "@/types/question.type";
import questions from "../assets/questions/questions.json";
import { usePlayerContext } from "./usePlayerContext";

export const useGetQuestions = () => {
  const { answeredQuestions } = usePlayerContext();
  const getQuestion = (
    category: Category,
    difficulty: Difficulty
  ): Question | undefined => {
    const matchingCategory = questions[category as keyof typeof questions];
    let difficulties;
    let image;
    if (difficulty in matchingCategory) {
      difficulties =
        matchingCategory[difficulty as keyof typeof matchingCategory];
    }
    let randomQuestion =
      difficulties?.[Math.floor(Math.random() * difficulties.length)];

    while (
      answeredQuestions.some((question) => question.id === randomQuestion?.id)
    ) {
      randomQuestion =
        difficulties?.[Math.floor(Math.random() * difficulties.length)];
    }
    if (randomQuestion && "image" in randomQuestion) {
      image = randomQuestion.image as string;
    }
    if (randomQuestion) {
      return {
        id: randomQuestion.id,
        question: randomQuestion.question,
        answer: randomQuestion.answer,
        points: randomQuestion.points,
        answer_type: randomQuestion.answer_type
          ? randomQuestion.answer_type
          : undefined,
        fiftyFifty: randomQuestion.fifty_fifty,
        image: image,
      };
    }
  };

  return {
    getQuestion,
  };
};
