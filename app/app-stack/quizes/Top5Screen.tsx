import { useGetInfo } from "@/hooks/useGetInfo";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import { useSubmitAnswers } from "@/hooks/useSubmitAnswers";
import { CommonActions } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { questionScreenStyles } from "../app-stack-styles/QuestionScreen.styles";
import { Top5ScreenProps } from "../screenparams/ScreenParams";

export default function Top5Screen({ navigation, route }: Top5ScreenProps) {
  const { top5question, category, difficulty } = route.params;

  const {
    submitTop5Questions,
    answer,
    answers,
    correctAnswer,
    error,
    firstError,
    setAnswer,
  } = useSubmitAnswers();

  const { setSuggestionsArray, suggestions } = useGetInfo(top5question);

  const { setNewCurrentPlayer, endTheGame } = usePlayerContext();
  return (
    <SafeAreaView style={questionScreenStyles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={[questionScreenStyles.container, { gap: 10 }]}
      >
        <Text style={questionScreenStyles.titleText}>
          🎯{top5question?.question}
        </Text>
        <TextInput
          style={questionScreenStyles.input}
          placeholder="Your Answer"
          placeholderTextColor="#aaa"
          value={answer}
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
            submitTop5Questions(category, difficulty, top5question);
          }}
        >
          <Text style={questionScreenStyles.buttonText}>🎉 Submit</Text>
        </TouchableOpacity>
        {top5question?.answer.map((value, index) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text style={questionScreenStyles.titleText}>{index + 1}.</Text>
            <TextInput
              style={questionScreenStyles.input}
              placeholder="Your Answer"
              placeholderTextColor="#aaa"
              value={answers[index]}
            />
          </View>
        ))}
        {firstError !== "" && (
          <Text style={questionScreenStyles.errorText}>{firstError}</Text>
        )}
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
