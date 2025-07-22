import PlayerIDCard from "@/components/PlayerIDCard";
import { useBackHandler } from "@/hooks/useBackHandler";
import { useGetInfo } from "@/hooks/useGetInfo";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import { useSubmitAnswers } from "@/hooks/useSubmitAnswers";
import { CommonActions } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import FiftyFiftyHelp from "../../../components/shared/FiftyFiftyHelp";
import { questionScreenStyles } from "../app-stack-styles/QuestionScreen.styles";
import { PlayerIDScreenProps } from "../screenparams/ScreenParams";

export default function PlayerIDScreen({
  navigation,
  route,
}: PlayerIDScreenProps) {
  const { category, difficulty, playerIDquestion } = route.params;
  const { setSuggestionsArray, suggestions } = useGetInfo(playerIDquestion);
  useBackHandler();
  const {
    answer,
    error,
    correctAnswer,
    help,
    setHelp,
    setAnswer,
    submitPlayerIDQuestions,
  } = useSubmitAnswers();

  const { setNewCurrentPlayer, endTheGame } = usePlayerContext();

  return (
    <SafeAreaView style={questionScreenStyles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={[questionScreenStyles.container, { gap: 10 }]}
      >
        {playerIDquestion && (
          <PlayerIDCard playerIDquestion={playerIDquestion} />
        )}

        <TextInput
          style={questionScreenStyles.input}
          placeholder="Your Answer"
          placeholderTextColor="#aaa"
          value={answer.toString()}
          onChangeText={(text) => {
            setAnswer(text);
            setSuggestionsArray(text);
          }}
        />
        {answer !== "" &&
          typeof answer === "string" &&
          suggestions.length > 0 &&
          !suggestions.includes(answer) && (
            <View style={questionScreenStyles.suggestionList}>
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
            </View>
          )}
        <TouchableOpacity
          style={[
            questionScreenStyles.button,
            (error !== "" || correctAnswer !== "") &&
              questionScreenStyles.buttonDisabled,
          ]}
          activeOpacity={0.7}
          onPress={() => {
            submitPlayerIDQuestions(category, difficulty, playerIDquestion);
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
          question={playerIDquestion}
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
