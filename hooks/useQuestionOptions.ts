import questions from "@/assets/questions/questions.json";
import { Category } from "@/types/category.enum";
import { Difficulty } from "@/types/difficulty.enum";
import { QuestionOption } from "@/types/question-option.type";
import { useCallback } from "react";
import { usePlayerContext } from "./usePlayerContext";

export const useQuestionOptions = () => {
  const { answeredQuestions } = usePlayerContext();
  // Add this debugging
  console.log("useQuestionOptions - answeredQuestions:", answeredQuestions.length);

  const getQuestionOptions = useCallback((): QuestionOption[] => {
    const questionOptions: QuestionOption[] = [];

    Object.keys(questions).forEach((categoryKey) => {
      const category = categoryKey as Category;
      const categoryQuestions = questions[category as keyof typeof questions];

      Object.keys(categoryQuestions).forEach((difficultyKey) => {
        const difficulty = difficultyKey as Difficulty;
        const difficultyQuestions =
          categoryQuestions[difficulty as keyof typeof categoryQuestions];

        difficultyQuestions.forEach((question) => {
          const isAvailable = !answeredQuestions.some(
            (answeredQuestion) => answeredQuestion.id === question.id
          );

          questionOptions.push({
            category,
            difficulty,
            questionId: question.id,
            points: question.points,
            isAvailable,
          });
        });
      });
    });
    return questionOptions;
  }, [answeredQuestions]);

  const getGroupedQuestions = useCallback(() => {
    const allQuestions = getQuestionOptions();

    const groupedQuestions = allQuestions.reduce((acc, question) => {
      if (!acc[question.category]) {
        acc[question.category] = [];
      }
      acc[question.category].push(question);
      return acc;
    }, {} as Record<Category, QuestionOption[]>);

    return groupedQuestions;
  }, [getQuestionOptions]);

  return {
    getQuestionOptions,
    getGroupedQuestions,
  };
};
