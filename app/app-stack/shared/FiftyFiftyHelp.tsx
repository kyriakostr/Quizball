import { usePlayerContext } from "@/hooks/usePlayerContext";
import { Question } from "@/types/question.type";
import { Text, TouchableOpacity, View } from "react-native";
import { questionScreenStyles } from "../app-stack-styles/QuestionScreen.styles";

type FiftyFiftyHelpProps = {
  error: string;
  correctAnswer: string;
  help: boolean;
  setHelp: (help: boolean) => void;
  setAnswer: (text: string | number) => void;
  question?: Question;
};

export default function FiftyFiftyHelp({
  error,
  correctAnswer,
  help,
  setHelp,
  setAnswer,
  question,
}: FiftyFiftyHelpProps) {
  const { currentPlayer, setCurrentPlayersHelps } = usePlayerContext();
  return (
    <View>
      {currentPlayer.help.fiftyFifty &&
        help &&
        question?.fiftyFifty.map((help, index) => (
          <TouchableOpacity
            style={[
              questionScreenStyles.fiftyFiftyButton,
              (error !== "" || correctAnswer !== "") &&
                questionScreenStyles.buttonDisabled,
            ]}
            activeOpacity={0.7}
            disabled={error !== "" || correctAnswer !== ""}
            onPress={() => {
              setAnswer(help);
            }}
            key={index}
          >
            <Text style={questionScreenStyles.fiftyFiftyText}>{help}</Text>
          </TouchableOpacity>
        ))}

      {!currentPlayer.help.fiftyFifty && (
        <TouchableOpacity
          style={[
            questionScreenStyles.fiftyFiftyHelpButton,
            (error !== "" || correctAnswer !== "") &&
              questionScreenStyles.buttonDisabled,
          ]}
          activeOpacity={0.7}
          disabled={error !== "" || correctAnswer !== ""}
          onPress={() => {
            setHelp(true);
            setCurrentPlayersHelps(true);
          }}
        >
          <Text style={questionScreenStyles.fiftyFiftyHelpText}>50-50</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
