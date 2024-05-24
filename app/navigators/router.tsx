import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useAuth } from "../screens/contexts/auth";
import { AppStack } from "./app-navigator";
import { AuthStack } from "./auth-navigator";
import { useColorScheme } from "react-native";
import { navigate, navigationRef } from "./navigation-utilities";
import { OpenAppStack } from "./open-app-navigator";
import { ButtonProvider } from "../screens/contexts/button_context";
import { FloatingButton } from "../components/float-button/FloattingButton";
import { hideLoading, showLoading } from "../utils/toast";

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const Router = (props: NavigationProps) => {
  const colorScheme = useColorScheme();
  const { redirect, loading } = useAuth();

  const getStack = () => {
    if (redirect === 1) {
      hideLoading();
      return <AuthStack />;
    } else if (redirect === 2) {
      hideLoading();
      return <AppStack />;
    }
    hideLoading();
    return <OpenAppStack />;
  };

  if (loading) {
    return showLoading();
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}>
      <ButtonProvider>
        {getStack()}
        <FloatingButton />
      </ButtonProvider>
    </NavigationContainer>
  );
};
