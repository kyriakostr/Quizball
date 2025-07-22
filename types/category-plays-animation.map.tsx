import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ReactNode } from "react";
import { Category } from "./category.enum";

type CategoryInfo = {
  text: string;
  color: string;
  icon: ReactNode;
};
const categoryPlaysAnimationMap: Record<Category, CategoryInfo> = {
  [Category.HISTORY]: {
    text: "Ιστορία",
    color: "#A2653C",
    icon: <MaterialIcons name="temple-buddhist" size={24} color="white" />,
  },
  [Category.GEOGRAPHY]: {
    text: "Γεωγραφία",
    color: "#00BCD4",
    icon: <FontAwesome6 name="earth-americas" size={24} color="white" />,
  },
  [Category.TOP5]: {
    text: "Top5",
    color: "#00C878",
    icon: <AntDesign name="totop" size={24} color="white" />,
  },
  [Category.PLAYERMISSING]: {
    text: "Ποιος λείπει;",
    color: "#6CD3A7",
    icon: <AntDesign name="question" size={24} color="white" />,
  },

  [Category.PLAYERID]: {
    text: "PLAYER ID",
    color: "#8C42D8",
    icon: <AntDesign name="totop" size={24} color="white" />,
  },
};

export default categoryPlaysAnimationMap;
