import { width } from "@/app/global-styles/Global.styles";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import { usePlayerContext } from "@/hooks/usePlayerContext";
import { Category } from "@/types/category.enum";
import { Difficulty } from "@/types/difficulty.enum";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type QuizDifficultyComponentProps = {
  category: Category;
  difficultyArray: Difficulty[];
  color: string;
};

export default function QuizDifficultyComponent({
  category,
  difficultyArray,
  color,
}: QuizDifficultyComponentProps) {
  const {
    disableDifficulty,
    doublePointsRound,
    setAnsweredQuestions,
    setCurrentPlayersHelps,
  } = usePlayerContext();
  const { getGeneralQuestion } = useGetQuestions();

  return (
    <View style={{ flexDirection: "row" }}>
      {difficultyArray.map((difficulty, index) => {
        const isDisabled = disableDifficulty(category, difficulty,index);
        return (
          <TouchableOpacity
            style={[
              styles.circularButton,
              { backgroundColor: !isDisabled ? color : "grey" },
            ]}
            disabled={isDisabled}
            onPress={() => {
              if (doublePointsRound) {
                setCurrentPlayersHelps(false);
              }
              const question = getGeneralQuestion(category, difficulty);
              question
                ? setAnsweredQuestions((prev) => [...prev, question])
                : "";
              // navigation.push("app-stack/quizes/QuestionScreen", {
              //   question,
              //   category,
              //   difficulty: difficulty,
              // });
            }}
            key={index}
          >
            <Text style={styles.buttonText}>{difficulty}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const BUTTON_SIZE = width * 0.1;
const styles = StyleSheet.create({
  circularButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: "#4A90E2", // Customize the color
    justifyContent: "center",
    alignItems: "center",
    margin: 10, // Optional spacing
    borderWidth: 2, // Border thickness
    borderColor: "#ffffff", // Border color (you can change this)
  },
  disabledButton: {
    backgroundColor: "#ccc", // greyed out
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
