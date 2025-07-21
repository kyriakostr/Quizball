import CategoryRow from "@/components/CaterogryRow";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import { useQuestionOptions } from "@/hooks/useQuestionOptions";
import categoryPlaysMap from "@/types/category-plays.map";
import { Category } from "@/types/category.enum";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Alert, Animated, BackHandler, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import quizSelectionStyles from "../app-stack-styles/QuizSelection.styles";
import { QuizSelectionprops } from "../screenparams/ScreenParams";
import DoublePointsHelp from "../shared/DoublePointsHelp";

export default function QuizSelection({ navigation }: QuizSelectionprops) {
  const { currentPlayer, disableCategory } = usePlayerContext();

  const animationsRefs = useRef(
    Object.keys(categoryPlaysMap).map(() => new Animated.Value(0))
  ).current;

  const animationArray: { category: Category; animatedValue: any }[] =
    Object.keys(categoryPlaysMap).map((category, index) => ({
      category: category as Category,
      animatedValue: animationsRefs[index],
    }));

  const { getQuestionOptions, getGroupedQuestions } = useQuestionOptions();
  const groupedQuestions = getGroupedQuestions();
  const { getQuestion } = useGetQuestions();

  useEffect(() => {
    // const questionOptions = getQuestionOptions();
    const groupedQuestions = getGroupedQuestions();
    console.log("QuizSelection - groupedQuestions updated:", groupedQuestions);
  }, [getQuestionOptions, getGroupedQuestions]);

  useFocusEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to go back?You are going to end the game",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => navigation.popToTop() },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  });

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
  }, [animationArray]);

  return (
    <SafeAreaView style={quizSelectionStyles.view}>
      <Text style={quizSelectionStyles.title}>Select a category</Text>
      <Text style={quizSelectionStyles.playerTitle}>
        {currentPlayer.playerId.toUpperCase()} Plays
      </Text>
      <Text style={quizSelectionStyles.playerTitle}>
        {currentPlayer.points} Points
      </Text>
      {Object.keys(groupedQuestions).map((categoryKey, index) => {
        const category = categoryKey as Category;
        const categoryQuestions = groupedQuestions[category];
        return (
          <Animated.View
            style={{
              transform: [
                {
                  scale: animationArray[index]?.animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.6, 1],
                  }),
                },
              ],
              opacity: animationArray[index]?.animatedValue || 1,
            }}
            key={category}
          >
            <CategoryRow
              category={category}
              questions={categoryQuestions}
              onPointSelect={(difficulty) => {
                const availableQuestions = categoryQuestions.filter(
                  (question) =>
                    question.difficulty === difficulty && question.isAvailable
                );

                if (availableQuestions.length > 0) {
                  const question = getQuestion(category, difficulty);

                  if (question) {
                    navigation.push("app-stack/quizes/QuestionScreen", {
                      question: question,
                      category: category,
                      difficulty: difficulty,
                    });
                  }
                }
              }}
              disabled={disableCategory(category)}
            />
          </Animated.View>
        );
      })}

      <DoublePointsHelp />
    </SafeAreaView>
  );
}
