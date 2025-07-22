import missingPlayerImages from "@/app/missing-player-images/missing-player.images";
import { useBackHandler } from "@/hooks/useBackHandler";
import { useGetInfo } from "@/hooks/useGetInfo";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import { CommonActions } from "@react-navigation/native";
import { useState } from "react";
import {
  Animated,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import FiftyFiftyHelp from "../../../components/shared/FiftyFiftyHelp";
import { questionScreenStyles } from "../app-stack-styles/QuestionScreen.styles";
import { QuestionScreenprops } from "../screenparams/ScreenParams";

export default function QuestionScreen({
  navigation,
  route,
}: QuestionScreenprops) {
  const [answer, setAnswer] = useState<string | number>("");
  const [error, setError] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const {
    setGameDetailsInfo,
    setNewCurrentPlayer,
    addPointsToPlayer,
    endTheGame,
  } = usePlayerContext();
  const { question, category, difficulty } = route.params;
  useBackHandler();
  const { setSuggestionsArray, suggestions } = useGetInfo(question);
  const [help, setHelp] = useState<boolean>(false);

  return (
    <SafeAreaView style={questionScreenStyles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={questionScreenStyles.container}
      >
        <Text style={questionScreenStyles.titleText}>
          🎯 {question?.question}
        </Text>
        {question?.image && (
          <Image
            source={missingPlayerImages[question.image]}
            style={{ width: 250, height: 250 }}
          />
        )}
        <TextInput
          style={questionScreenStyles.input}
          keyboardType={
            typeof question?.answer === "number" ? "numeric" : "default"
          }
          value={answer?.toString()}
          placeholder="Your Answer"
          placeholderTextColor="#aaa"
          onChangeText={(text) => {
            setAnswer(text);
            setSuggestionsArray(text);
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
            setGameDetailsInfo(category, difficulty);

            if (!answer) {
              setError("🚫 Not the correct answer.");
              addPointsToPlayer(false, help, question?.points || 0);
            }
            if (
              !question?.answer
                .toString()
                .includes(answer?.toString().trim()) &&
              answer
            ) {
              setCorrectAnswer("");
              setError("🚫 Not the correct answer.");
              addPointsToPlayer(false, help, question?.points || 0);
            }
            if (
              question?.answer.toString().includes(answer?.toString().trim()) &&
              answer
            ) {
              setError("");
              setCorrectAnswer("✅ Correct Answer! 🎊");
              addPointsToPlayer(true, help, question?.points || 0);
            }
          }}
        >
          <Text style={questionScreenStyles.buttonText}>🎉 Submit</Text>
        </TouchableOpacity>

        <FiftyFiftyHelp
          error={error}
          correctAnswer={correctAnswer}
          help={help}
          setHelp={setHelp}
          setAnswer={setAnswer}
          question={question}
        />

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
