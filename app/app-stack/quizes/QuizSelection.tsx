import React, { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectCategoryButton from "@/components/SelectCategoryButton";
import quizSelectionStyles from "../app-stack-styles/QuizSelection.styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function QuizSelection() {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.stagger(150, [
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
          text="Γεωγραφία"
          color="#00BCD4"
          icon={<FontAwesome6 name="earth-americas" size={24} color="white" />}
        />
      </Animated.View>
    </SafeAreaView>
  );
}
