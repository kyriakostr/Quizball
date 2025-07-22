import categoryPlaysMap from "@/types/category-plays.map";
import { Category } from "@/types/category.enum";
import { Text, View } from "react-native";
import selectCategoryButtonStyles from "./component-styles/SelectCategoryButton.styles";
import QuizDifficultyComponent from "./QuizDifficultyComponent";

type SelectCategoryButtonProps = {
  category: Category;
  color: string;
  text: string;
  icon?: any;
  disabled?: boolean;
};

export default function SelectCategoryButton({
  category,
  color,
  text,
  icon,
  disabled = false,
}: SelectCategoryButtonProps) {
  return (
    <View
      style={[
        selectCategoryButtonStyles.button,
        { backgroundColor: !disabled ? color : "grey" },
      ]}
    >
      <Text style={selectCategoryButtonStyles.text}>{text}</Text>
      <QuizDifficultyComponent
        color={color}
        category={category}
        difficultyArray={categoryPlaysMap[category]}
      />
      {icon && <View>{icon}</View>}
    </View>
  );
}
