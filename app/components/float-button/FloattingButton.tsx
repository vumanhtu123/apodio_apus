import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { Text, StyleSheet, PanResponder, Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const FloatingButton: FC = observer(function FloatingButton() {
  {
    const [pan] = useState(new Animated.ValueXY());
    const navigation = useNavigation();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: -100, y: -100 },
          useNativeDriver: false,
        }).start();
      },
    });

    return (
      <TouchableOpacity
        onPress={() => {
          console.log(
            "FloatingButton---------------------------------------------"
          );
          navigation.navigate("TestDebug" as never);
        }}>
        <Animated.View
          style={[
            styles.button,
            { transform: [{ translateX: pan.x }, { translateY: pan.y }] },
          ]}
          {...panResponder.panHandlers}>
          <Text>Button</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.1,
  },
});
