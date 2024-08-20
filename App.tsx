import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AppPurchase from "./app/app-purchase/app";
import AppSales from "./app/app-sales/app";
import AppB from "./app/app-warehouse/App";
import React, { useEffect, useState } from "react";
import { AppContext } from "./app/app-context/AppContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppList from "./app/app-context/AppList";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getCurrentLanguage } from "./app/app-purchase/utils/storage";
import { changeLanguage } from "./app/i18n";

function IgniteApp() {
  const [currentApp, setCurrentApp] = useState<string>("appPurchase");

  useEffect(() => {
    const loadAppChoice = async () => {
      console.log('--------------currentApp-------------', currentApp)
      try {
        const savedApp = await AsyncStorage.getItem("selectedApp");
        console.log('--------------savedApp-------------', savedApp)
        if (savedApp) {
          setCurrentApp(savedApp);
        } else {
          setCurrentApp("appList");
        }
      } catch (error) {
        console.error("Failed to load the app choice from storage", error);
        setCurrentApp("appList");
      } finally {
        // setLoading(false);
      }
    };

    // const languageApp = async () => {
    //   const language = await getCurrentLanguage()
    //   // changeLanguage(language)
    //   switch (language) {
    //     case 'vi':
    //       changeLanguage("en")
    //       break;
    //     case 'en':
    //       changeLanguage("fr")
    //     default:

    //       break;
    //   }
    //   console.log(language, 'day la ngon ngu')
    // }

    // languageApp()
    loadAppChoice();
  }, []);

  const renderApp = () => {
    switch (currentApp) {
      case "appPurchase":
        return <AppPurchase />;
      case "appSales":
        return <AppSales />;
      case "appWarehouse":
        return <AppB />;
      case "appList":
      default:
        return <AppList />;
    }
  };

  return (
    <AppContext.Provider value={{ currentApp, setCurrentApp }}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>{renderApp()}</View>
      </SafeAreaProvider>
    </AppContext.Provider>
  );

  // return <App hideSplashScreen={() => Promise.resolve(true)} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IgniteApp;
