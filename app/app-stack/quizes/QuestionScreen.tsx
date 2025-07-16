import { usePlayerContext } from "@/hooks/usePlayerContext";
import { useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuestionScreenprops } from "../screenparams/ScreenParams";

export default function QuestionScreen({
  navigation,
  route,
}: QuestionScreenprops) {
  const [answer, setAnswer] = useState<string | number>();
  const [error, setError] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [shakeAnim] = useState(new Animated.Value(0));
  const { setCurrentPlayerInfo, setNewCurrentPlayer } = usePlayerContext();
  const { question, category, difficulty } = route.params;

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
        easing: Easing.bounce,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        🎯 {question?.question ?? "Ready for a Challenge?"}
      </Text>

      <TextInput
        style={styles.input}
        keyboardType={
          typeof question?.answer === "number" ? "numeric" : "default"
        }
        placeholder="Your Answer"
        placeholderTextColor="#aaa"
        onChangeText={(text) => {
          setAnswer(text.trimEnd());
          setError("");
          setCorrectAnswer("");
        }}
      />

      <TouchableOpacity
        style={[
          styles.button,
          (error !== "" || correctAnswer !== "") && styles.buttonDisabled,
        ]}
        activeOpacity={0.7}
        disabled={error !== "" || correctAnswer !== ""}
        onPress={() => {
          if (answer != question?.answer) {
            setCorrectAnswer("");
            setError("🚫 Not the correct answer.");
            triggerShake();
            setCurrentPlayerInfo(category, difficulty);
          } else {
            setError("");
            setCorrectAnswer("✅ Correct Answer! 🎊");
            setCurrentPlayerInfo(category, difficulty);
          }
        }}
      >
        <Text style={styles.buttonText}>🎉 Submit</Text>
      </TouchableOpacity>

      {error !== "" && <Text style={styles.errorText}>{error}</Text>}
      {correctAnswer !== "" && (
        <Text style={styles.correctText}>{correctAnswer}</Text>
      )}

      <TouchableOpacity
        style={[
          styles.nextButton,
          error === "" && correctAnswer === "" && styles.buttonDisabled,
        ]}
        activeOpacity={0.7}
        disabled={error === "" && correctAnswer === ""}
        onPress={() => {
          navigation.popTo("app-stack/quizes/QuizSelection");
          setNewCurrentPlayer();
        }}
      >
        <Text style={styles.buttonText}>➡️ Next Player</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  input: {
    height: 50,
    width: 220,
    borderColor: "#6200ea",
    borderWidth: 2,
    borderRadius: 14,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#7b1fa2",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  nextButton: {
    backgroundColor: "#009688",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  correctText: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
  },
});
