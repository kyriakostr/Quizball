import SelectCategoryButton from "@/components/SelectCategoryButton";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import { Difficulty } from "@/types/difficulty.enum";
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
  const {
    disableDifficulty,
    doublePointsRound,
    setAnsweredQuestions,
    setCurrentPlayersHelps,
  } = usePlayerContext();
  const { getQuestion } = useGetQuestions();
  const animationsRefs = useRef(
    difficultyArray.map(() => new Animated.Value(0))
  ).current;
  const animationArray: { difficulty: Difficulty; animatedValue: any }[] =
  difficultyArray.map((difficulty, index) => ({
      difficulty,
      animatedValue: animationsRefs[index],
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
              if (doublePointsRound) {
                setCurrentPlayersHelps(false);
              }
              const question = getQuestion(category, value.difficulty);
              question
                ? setAnsweredQuestions((prev) => [...prev, question])
                : "";
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
