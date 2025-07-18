import { Text, TouchableOpacity, View } from "react-native";
import selectCategoryButtonStyles from "./component-styles/SelectCategoryButton.styles";

type SelectCategoryButtonProps = {
  color: string;
  text: string;
  icon?: any;
  disabled?: boolean;
  onPress: () => void;
};

export default function SelectCategoryButton({
  color,
  text,
  icon,
  disabled = false,
  onPress,
}: SelectCategoryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        selectCategoryButtonStyles.button,
        { backgroundColor: !disabled ? color : "grey" },
      ]}
    >
      <Text style={selectCategoryButtonStyles.text}>{text}</Text>
      {icon && <View>{icon}</View>}
    </TouchableOpacity>
  );
}
