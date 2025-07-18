import { RootParamsList } from "@/app/app-stack/screenparams/ScreenParams";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export const useBackHandler = (error: string, correctAnswer: string) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootParamsList>>();
  useEffect(() => {
    const backAction = () => {
      if (error !== "" || correctAnswer !== "") {
        Alert.alert(
          "Hold on!",
          "Are you sure you want to go back?You are going to end the game",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            { text: "YES", onPress: () => navigation.popToTop() },
          ]
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [error, correctAnswer]);
};
