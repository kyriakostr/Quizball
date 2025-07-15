import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectCategoryButton from "@/components/SelectCategoryButton";

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
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        paddingVertical: 30,
        backgroundColor: "#d0f0f2",
        gap: 20,
      }}
    >
      <Text style={styles.title}>Select a category</Text>

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
        <SelectCategoryButton text="Ιστορία" color="#A2653C" />
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
        <SelectCategoryButton text="Γεωγραφία" color="#00BCD4" />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#f7a600",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
});
