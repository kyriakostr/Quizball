import SelectCategoryButton from "@/components/SelectCategoryButton";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import categoryPlaysMap from "@/types/category-plays.map";
import { Category } from "@/types/category.enum";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { Alert, Animated, BackHandler, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import quizSelectionStyles from "../app-stack-styles/QuizSelection.styles";
import { QuizSelectionprops } from "../screenparams/ScreenParams";
export default function QuizSelection({ navigation }: QuizSelectionprops) {
  const { currentPlayer, disableCategory } = usePlayerContext();
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;

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
    Animated.stagger(250, [
      Animated.spring(anim1, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }),
      Animated.spring(anim2, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }),
      Animated.spring(anim3, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }),
    ]).start();
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
      <Animated.View
        style={{
          transform: [
            {
              scale: anim1.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 1],
              }),
            },
          ],
          opacity: anim1,
        }}
      >
        <SelectCategoryButton
          onPress={() => {
            navigation.push("app-stack/quizes/QuizDifficulty", {
              difficultyArray: categoryPlaysMap[Category.HISTORY],
              category: Category.HISTORY,
              color: "#A2653C",
            });
          }}
          disabled={disableCategory(Category.HISTORY)}
          text="Ιστορία"
          color="#A2653C"
          icon={
            <MaterialIcons name="temple-buddhist" size={24} color="white" />
          }
        />
      </Animated.View>

      <Animated.View
        style={{
          transform: [
            {
              scale: anim2.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 1],
              }),
            },
          ],
          opacity: anim2,
        }}
      >
        <SelectCategoryButton
          onPress={() => {
            navigation.push("app-stack/quizes/QuizDifficulty", {
              difficultyArray: categoryPlaysMap[Category.GEOGRAPHY],
              category: Category.GEOGRAPHY,
              color: "#00BCD4",
            });
          }}
          disabled={disableCategory(Category.GEOGRAPHY)}
          text="Γεωγραφία"
          color="#00BCD4"
          icon={<FontAwesome6 name="earth-americas" size={24} color="white" />}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
