import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./FirstScreen";
import QuestionScreen from "./quizes/QuestionScreen";
import QuizDifficulty from "./quizes/QuizDifficulty";
import QuizSelection from "./quizes/QuizSelection";
import { RootParamsList } from "./screenparams/ScreenParams";
import WinScreen from "./WinScreen";

export default function AppStack() {
  const Stack = createNativeStackNavigator<RootParamsList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="app-stack/FirstScreen" component={WelcomeScreen} />
      <Stack.Screen
        name="app-stack/WinScreen"
        component={WinScreen}
        options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen
        name="app-stack/quizes/QuizSelection"
        component={QuizSelection}
        options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen
        name="app-stack/quizes/QuizDifficulty"
        component={QuizDifficulty}
        options={{ animation: "fade_from_bottom" }}
      />
      <Stack.Screen
        name="app-stack/quizes/QuestionScreen"
        component={QuestionScreen}
        options={{ animation: "fade_from_bottom" }}
      />
    </Stack.Navigator>
  );
}
