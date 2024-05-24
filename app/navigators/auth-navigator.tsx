/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  LoginScreen,
  AccountSecurity,
  ForgotPasswordMerchant,
  ForgotPasswordStaff,
  SplashScreen1,
} from "../screens";

export type AuthParamList = {
  login: undefined;
  forgotPasswordMerchant: undefined;
  forgotPasswordStaff: undefined;
  accountSecurity: undefined;
  // SplashScreen: undefined;
};

const Stack = createNativeStackNavigator<AuthParamList>();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"login"}>
      <Stack.Screen
        name="forgotPasswordMerchant"
        options={{ gestureEnabled: false }}
        component={ForgotPasswordMerchant}
      />
      <Stack.Screen
        name="forgotPasswordStaff"
        options={{ gestureEnabled: false }}
        component={ForgotPasswordStaff}
      />
      <Stack.Screen
        name="accountSecurity"
        options={{ gestureEnabled: false }}
        component={AccountSecurity}
      />
      <Stack.Screen
        name="login"
        options={{ gestureEnabled: false }}
        component={LoginScreen}
      />
      {/* <Stack.Screen
        name="SplashScreen"
        options={{ gestureEnabled: false }}
        component={SplashScreen1}
      /> */}
    </Stack.Navigator>
  );
};
