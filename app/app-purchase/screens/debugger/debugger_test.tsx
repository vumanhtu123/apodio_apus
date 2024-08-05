import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  StyleSheet,
  Button,
  SafeAreaView,
  Platform,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import NetworkLogger, {
  ThemeName,
  getBackHandler,
  startNetworkLogging,
  stopNetworkLogging,
} from "react-native-network-logger";
import { Text } from "../../../components";

export const TestDebugger: FC = observer(function TestDebugger(props) {
  const formData = new FormData();
  const navigation = useNavigation();
  formData.append("test", "hello");

  useEffect(() => {
    start;
  }, []);
  const start = useCallback(() => {
    startNetworkLogging({
      ignoredHosts: ["127.0.0.1"],
      maxRequests: 20,
      ignoredUrls: ["https://httpstat.us/other"],
      ignoredPatterns: [/^POST http:\/\/(192|10)/, /\/logs$/, /\/symbolicate$/],
    });
  }, []);

  const [unmountNetworkLogger, setUnmountNetworkLogger] = useState(false);

  // note: Logger is a singleton so it starts on the first render
  // useLayoutEffect is used to ensure the setup runs before the component mounts (useEffect is async)
  useLayoutEffect(() => {
    start();
    return () => {
      stopNetworkLogging();
    };
  }, [start, unmountNetworkLogger]);

  const [theme, setTheme] = useState<ThemeName>("dark");
  const isDark = theme === "dark";

  const styles = themedStyles(isDark);

  const goBack = () => {
    stopNetworkLogging();
    setUnmountNetworkLogger(true);
  };

  const backHandler = getBackHandler(goBack);

  const remountButton = (
    <View>
      <Button
        title={"Re-open the network logger"}
        onPress={() => {
          setUnmountNetworkLogger(false);
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.navButton}
          testID="backButton"
          onPress={backHandler}
          hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}>
          <Text style={styles.backButtonText}>{"‹"}</Text>
        </TouchableOpacity>
        <Text style={styles.title} accessibilityRole="header">
          react-native-network-logger
        </Text>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={styles.navButton}>close</Text>
        </TouchableOpacity>
        <View style={styles.navButton} />
      </View>
      {(unmountNetworkLogger && remountButton) || (
        <NetworkLogger theme={theme} maxRows={10} />
      )}
      <View style={styles.bottomView}>
        <Button
          title="Toggle Theme"
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
        />
        {/* <Button title="Make request" onPress={} /> */}
      </View>
    </SafeAreaView>
  );
});

const themedStyles = (dark = false) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: dark ? "#2d2a28" : "white",
      paddingTop: Platform.OS === "android" ? 25 : 0,
    },
    header: {
      flexDirection: "row",
    },
    navButton: {
      alignItems: "center",
      textAlign: "center",
      color: "white",
      flex: 1,
    },
    backButtonText: {
      color: dark ? "white" : "black",
      paddingHorizontal: 20,
      fontSize: 30,
      fontWeight: "bold",
    },
    title: {
      flex: 5,
      color: dark ? "white" : "black",
      textAlign: "center",
      padding: 10,
      fontSize: 18,
      fontWeight: "bold",
    },
    bottomView: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 30,
    },
  });
