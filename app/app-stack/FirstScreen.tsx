import { player1DeafaultInfo, PlayerContext } from "@/contexts/PlayerContext";
import React, { useContext } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import images from "../global-styles/Global.styles";
import firstScreenStyles from "./app-stack-styles/FirstScreen.styles";
import { FirstScreenprops } from "./screenparams/ScreenParams";

export default function WelcomeScreen({ navigation }: FirstScreenprops) {
  const {setCurrentPlayer} = useContext(PlayerContext)
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
          setCurrentPlayer(player1DeafaultInfo)
          navigation.push("app-stack/quizes/QuizSelection");
        }}
        style={firstScreenStyles.button}
      >
        <Text style={firstScreenStyles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
