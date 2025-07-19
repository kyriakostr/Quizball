import SelectCategoryButton from "@/components/SelectCategoryButton";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import categoryPlaysAnimationMap from "@/types/category-plays-animation.map";
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
  const animationArray: { category: Category; animatedValue: any }[] = [];
  Object.keys(categoryPlaysMap).map((p) =>
    animationArray.push({
      category: p as Category,
      animatedValue: useRef(new Animated.Value(0)).current,
    })
  );
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
  }, []);

  return (
    <SafeAreaView style={quizSelectionStyles.view}>
      <Text style={quizSelectionStyles.title}>Select a category</Text>
      <Text style={quizSelectionStyles.playerTitle}>
        {currentPlayer.playerId.toUpperCase()} Plays
      </Text>
      <Text style={quizSelectionStyles.playerTitle}>
        {currentPlayer.points} Points
      </Text>
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
            onPress={() => {
              navigation.push("app-stack/quizes/QuizDifficulty", {
                difficultyArray: categoryPlaysMap[value.category],
                category: value.category,
                color: categoryPlaysAnimationMap[value.category].color,
              });
            }}
            disabled={disableCategory(value.category)}
            text={categoryPlaysAnimationMap[value.category].text}
            color={categoryPlaysAnimationMap[value.category].color}
            icon={categoryPlaysAnimationMap[value.category].icon}
          />
        </Animated.View>
      ))}

      <DoublePointsHelp />
    </SafeAreaView>
  );
}
