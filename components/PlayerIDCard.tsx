import { PlayerIDQuestion } from "@/types/question.type";
import { Text, View } from "react-native";
import playerIDCardStyles from "./component-styles/PlayerIDCard.styles";

type PlayerIDCardProps = {
  playerIDquestion: PlayerIDQuestion;
};

export default function PlayerIDCard({ playerIDquestion }: PlayerIDCardProps) {
  return (
    <View style={playerIDCardStyles.view}>
      <Text style={playerIDCardStyles.titleText}>Player ID</Text>

      {playerIDquestion?.question.map((playerId, index) => (
        <View key={index} style={playerIDCardStyles.question}>
          <Text style={playerIDCardStyles.infoText}>{playerId.team}</Text>
          <Text style={playerIDCardStyles.infoText}>{playerId.period}</Text>
        </View>
      ))}
    </View>
  );
}
