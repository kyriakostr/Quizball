import { Category } from "@/types/category.enum";
import { Difficulty } from "@/types/difficulty.enum";
import { Top5Question } from "@/types/question.type";
import { useState } from "react";
import { usePlayerContext } from "./usePlayerContext";

export const useSubmitAnswers = () => {
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const [firstError, setFirstError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { setGameDetailsInfo, addPointsToPlayer } = usePlayerContext();
  const submitTop5Questions = (
    category: Category,
    difficulty: Difficulty,
    top5question?: Top5Question
  ) => {
    if (
      firstError !== "" &&
      !top5question?.answer.some(
        (v) => v.split(" ").includes(answer) || v === answer
      )
    ) {
      setError("🚫 Not the correct answer.");
      setGameDetailsInfo(category, difficulty);
      addPointsToPlayer(false, false, top5question?.points || 0);
    }

    if (
      top5question?.answer.some(
        (v) => v.split(" ").includes(answer) || v === answer
      )
    ) {
      const index = top5question.answer.findIndex(
        (v) => v.split(" ").includes(answer) || v === answer
      );
      setAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers]; // create a shallow copy
        newAnswers[index] = top5question.answer[index]; // update the desired index
        const allCorrect = top5question.answer.every(
          (v, index) => v === newAnswers[index]
        );
        if (allCorrect) {
          setCorrectAnswer("✅ Correct Answer! 🎊");
          setGameDetailsInfo(category, difficulty);
          addPointsToPlayer(true, false, top5question?.points || 0);
        }
        return newAnswers;
      });
    } else {
      setFirstError(answer);
    }
  };

  return {
    firstError,
    error,
    correctAnswer,
    answer,
    answers,
    setAnswers,
    setAnswer,
    submitTop5Questions,
  };
};
