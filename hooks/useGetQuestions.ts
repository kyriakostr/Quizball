import { RootParamsList } from "@/app/app-stack/screenparams/ScreenParams";
import { Category } from "@/types/category.enum";
import { Difficulty } from "@/types/difficulty.enum";
import {
  CategoryQuestions,
  Question,
  Top5Question,
} from "@/types/question.type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import questions from "../assets/questions/questions.json";
import top5 from "../assets/questions/top5.json";
import { usePlayerContext } from "./usePlayerContext";

export const useGetQuestions = () => {
  const { answeredQuestions } = usePlayerContext();
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>();

  const getGeneralQuestion = (
    category: Category,
    difficulty: Difficulty
  ): CategoryQuestions => {
    switch (category) {
      case Category.TOP5:
        const top5question = getTop5Question(category, difficulty);
        navigation.push("app-stack/quizes/Top5Screen", {
          top5question,
          category,
          difficulty,
        });
        return top5question;

      default:
        const question = getQuestion(category, difficulty);
        navigation.push("app-stack/quizes/QuestionScreen", {
          question,
          category,
          difficulty,
        });
        return question;
    }
  };
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
  const getTop5Question = (
    category: Category,
    difficulty: Difficulty
  ): Top5Question | undefined => {
    const matchingCategory = top5[category as keyof typeof top5];
    let difficulties;
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

    if (randomQuestion) {
      return {
        id: randomQuestion.id,
        question: randomQuestion.question,
        answer: randomQuestion.answer,
        points: randomQuestion.points,
        answer_type: randomQuestion.answer_type
          ? randomQuestion.answer_type
          : undefined,
      };
    }
  };
  return {
    getQuestion,
    getGeneralQuestion,
  };
};
