import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigatorParamList } from "./app-navigator";
import { IntroductionScreen, SelectLanguageScreen } from "../screens";

const Stack = createNativeStackNavigator<NavigatorParamList>();

export const OpenAppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"selectLanguage"}>
      <Stack.Screen
        name="selectLanguage"
        options={{ gestureEnabled: false }}
        component={SelectLanguageScreen}
      />
      <Stack.Screen
        name="introduction"
        options={{ gestureEnabled: false }}
        component={IntroductionScreen}
      />
      {/* <Stack.Screen
        name="termsAgreements"
        options={{ gestureEnabled: false }}
        component={TermsAgreementsScreen}
      /> */}
    </Stack.Navigator>
  );
};
