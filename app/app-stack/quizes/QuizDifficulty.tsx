import SelectCategoryButton from "@/components/SelectCategoryButton";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import { Difficulty } from "@/types/difficulty.enum";
import questionsMap from "@/types/questions.map";
import { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { quizDifficultyStyles } from "../app-stack-styles/QuizDifficulty.styles";
import { QuizDifficultyprops } from "../screenparams/ScreenParams";

export default function QuizDifficulty({
  navigation,
  route,
}: QuizDifficultyprops) {
  const { difficultyArray, category, color } = route.params;
  const { disableDifficulty } = usePlayerContext();
  const animationArray: { difficulty: Difficulty; animatedValue: any }[] = [];
  difficultyArray.map((p) =>
    animationArray.push({
      difficulty: p,
      animatedValue: useRef(new Animated.Value(0)).current,
    })
  );
  useEffect(() => {
    Animated.stagger(
      250,
      animationArray.map((value) =>
        Animated.spring(value.animatedValue, {
          toValue: 1,
          useNativeDriver: true,
          friction: 5,
        })
      )
    ).start();
  }, []);

  const getQuestion = (difficulty: Difficulty) => {
    const matchingCategory = questionsMap[category].find(
      (question) => question.difficulty === difficulty
    );
    const randomQuestion =
      matchingCategory?.questions[
        Math.floor(Math.random() * matchingCategory.questions.length)
      ];
    return randomQuestion;
  };
  return (
    <SafeAreaView style={quizDifficultyStyles.view}>
      <Text style={quizDifficultyStyles.title}>Select difficulty</Text>
      {animationArray.map((value, index) => (
        <Animated.View
          style={{
            transform: [
              {
                scale: value.animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 1],
                }),
              },
            ],
            opacity: value.animatedValue,
          }}
          key={index}
        >
          <SelectCategoryButton
            text={value.difficulty}
            color={color}
            disabled={disableDifficulty(category, value.difficulty)}
            onPress={() => {
              const question = getQuestion(value.difficulty);
              navigation.push("app-stack/quizes/QuestionScreen", {
                question,
                category,
                difficulty: value.difficulty,
              });
            }}
          />
        </Animated.View>
      ))}
    </SafeAreaView>
  );
}
