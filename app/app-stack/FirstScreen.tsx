import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import images from "../global-styles/Global.styles";
import firstScreenStyles from "./app-stack-styles/FirstScreen.styles";
import { FirstScreenprops } from "./screenparams/ScreenParams";

export default function WelcomeScreen({ navigation }: FirstScreenprops) {
  return (
    <SafeAreaView style={firstScreenStyles.container}>
      <View style={firstScreenStyles.logoContainer}>
        <Image
          source={images["quizball-logo"]} // Replace with your actual logo path
          style={firstScreenStyles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={firstScreenStyles.title}>Welcome to Quiz Ball!</Text>
      <Text style={firstScreenStyles.subtitle}>
        Test your football knowledge!
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.push("app-stack/quizes/FirstQuiz");
        }}
        style={firstScreenStyles.button}
      >
        <Text style={firstScreenStyles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
