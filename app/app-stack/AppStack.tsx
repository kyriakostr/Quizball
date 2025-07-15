import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootParamsList } from "./screenparams/ScreenParams";
import WelcomeScreen from "./FirstScreen";
import QuizSelection from "./quizes/QuizSelection";

export default function AppStack() {
  const Stack = createNativeStackNavigator<RootParamsList>();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="app-stack/FirstScreen" component={WelcomeScreen} />
      <Stack.Screen
        name="app-stack/quizes/FirstQuiz"
        component={QuizSelection}
        options={{ animation: "fade_from_bottom" }}
      />
    </Stack.Navigator>
  );
}
