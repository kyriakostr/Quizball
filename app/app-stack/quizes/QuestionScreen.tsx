import { useBackHandler } from "@/hooks/useBackHandler";
import { useGetInfo } from "@/hooks/useGetInfo";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { questionScreenStyles } from "../app-stack-styles/QuestionScreen.styles";
import { QuestionScreenprops } from "../screenparams/ScreenParams";

export default function QuestionScreen({
  navigation,
  route,
}: QuestionScreenprops) {
  const [answer, setAnswer] = useState<string | number>();
  const [error, setError] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  const {
    setGameDetailsInfo,
    setNewCurrentPlayer,
    addPointsToPlayer,
    endTheGame,
  } = usePlayerContext();
  const { question, category, difficulty } = route.params;
  useBackHandler(error, correctAnswer);
  const { info, setSuggestionsArray, suggestions } = useGetInfo(question);

  return (
    <SafeAreaView style={questionScreenStyles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={questionScreenStyles.container}
      >
        <Text style={questionScreenStyles.titleText}>
          🎯 {question?.question ?? "Ready for a Challenge?"}
        </Text>

        <TextInput
          style={questionScreenStyles.input}
          keyboardType={
            typeof question?.answer === "number" ? "numeric" : "default"
          }
          value={answer?.toString()}
          placeholder="Your Answer"
          placeholderTextColor="#aaa"
          onChangeText={(text) => {
            setAnswer(text.trim());
            setSuggestionsArray(text.trim());
          }}
        />
        {answer !== "" &&
          typeof answer === "string" &&
          suggestions.length > 0 &&
          !suggestions.includes(answer) && (
            <Animated.View style={questionScreenStyles.suggestionList}>
              {suggestions.map((s, i) => (
                <TouchableOpacity
                  key={`${s}-${i}`}
                  style={questionScreenStyles.suggestionItem}
                  activeOpacity={0.7}
                  onPress={() => setAnswer(s.trim())}
                >
                  <Text style={questionScreenStyles.suggestionText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}

        <TouchableOpacity
          style={[
            questionScreenStyles.button,
            (error !== "" || correctAnswer !== "") &&
              questionScreenStyles.buttonDisabled,
          ]}
          activeOpacity={0.7}
          disabled={error !== "" || correctAnswer !== ""}
          onPress={() => {
            if (answer != question?.answer) {
              setCorrectAnswer("");
              setError("🚫 Not the correct answer.");
              setGameDetailsInfo(category, difficulty);
              addPointsToPlayer(false, difficulty);
            } else {
              setError("");
              setCorrectAnswer("✅ Correct Answer! 🎊");
              setGameDetailsInfo(category, difficulty);
              addPointsToPlayer(true, difficulty);
            }
          }}
        >
          <Text style={questionScreenStyles.buttonText}>🎉 Submit</Text>
        </TouchableOpacity>

        {error !== "" && (
          <Text style={questionScreenStyles.errorText}>{error}</Text>
        )}
        {correctAnswer !== "" && (
          <Text style={questionScreenStyles.correctText}>{correctAnswer}</Text>
        )}

        {!endTheGame() && (
          <TouchableOpacity
            style={[
              questionScreenStyles.nextButton,
              error === "" &&
                correctAnswer === "" &&
                questionScreenStyles.buttonDisabled,
            ]}
            activeOpacity={0.7}
            disabled={error === "" && correctAnswer === ""}
            onPress={() => {
              navigation.popTo("app-stack/quizes/QuizSelection");
              setNewCurrentPlayer();
            }}
          >
            <Text style={questionScreenStyles.buttonText}>➡️ Next Player</Text>
          </TouchableOpacity>
        )}
        {endTheGame() && (
          <TouchableOpacity
            style={[questionScreenStyles.nextButton]}
            activeOpacity={0.7}
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: "app-stack/FirstScreen" },
                    { name: "app-stack/WinScreen" }, // the target screen
                  ],
                })
              );
            }}
          >
            <Text style={questionScreenStyles.buttonText}>
              ✅ End of the game
            </Text>
          </TouchableOpacity>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
