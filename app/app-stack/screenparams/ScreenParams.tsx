import { Category } from "@/types/category.enum";
import { Difficulty } from "@/types/difficulty.enum";
import { Question, Top5Question } from "@/types/question.type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootParamsList = {
  "app-stack/FirstScreen": undefined;
  "app-stack/WinScreen": undefined;
  "app-stack/quizes/QuizSelection": undefined;
  "app-stack/quizes/QuizDifficulty": {
    difficultyArray: Difficulty[];
    category: Category;
    color: string;
  };
  "app-stack/quizes/QuestionScreen": {
    question?: Question;
    category: Category;
    difficulty: Difficulty;
  };
  "app-stack/quizes/Top5Screen": {
    top5question?: Top5Question;
    category: Category;
    difficulty: Difficulty;
  };
};

export type FirstScreenprops = NativeStackScreenProps<
  RootParamsList,
  "app-stack/FirstScreen"
>;

export type QuizSelectionprops = NativeStackScreenProps<
  RootParamsList,
  "app-stack/quizes/QuizSelection"
>;
export type QuizDifficultyprops = NativeStackScreenProps<
  RootParamsList,
  "app-stack/quizes/QuizDifficulty"
>;
export type QuestionScreenprops = NativeStackScreenProps<
  RootParamsList,
  "app-stack/quizes/QuestionScreen"
>;
export type WinScreenprops = NativeStackScreenProps<
  RootParamsList,
  "app-stack/WinScreen"
>;

export type Top5ScreenProps = NativeStackScreenProps<
  RootParamsList,
  "app-stack/quizes/Top5Screen"
>;
