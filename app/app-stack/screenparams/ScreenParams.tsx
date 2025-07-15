import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootParamsList = {
  "app-stack/FirstScreen": undefined;
  "app-stack/quizes/FirstQuiz": undefined;
};

export type FirstScreenprops = NativeStackScreenProps<
  RootParamsList,
  "app-stack/FirstScreen"
>;
