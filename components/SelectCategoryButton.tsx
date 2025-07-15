import { Text, TouchableOpacity, View } from "react-native";
import selectCategoryButtonStyles from "./component-styles/SelectCategoryButton.styles";

type SelectCategoryButtonProps = {
  color: string;
  text: string;
  icon: any;
};

export default function SelectCategoryButton({
  color,
  text,
  icon,
}: SelectCategoryButtonProps) {
  return (
    <TouchableOpacity
      style={[selectCategoryButtonStyles.button, { backgroundColor: color }]}
    >
      <Text style={selectCategoryButtonStyles.text}>{text}</Text>
      <View>{icon}</View>
    </TouchableOpacity>
  );
}
