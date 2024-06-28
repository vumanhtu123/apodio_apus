import React from "react";
import { View } from "react-native";
import { Text } from "../../../components";

export default function ImagesGroup(props: any) {
  return (
    <View style={{ flexDirection: "column" }}>
      <Text
        tx="productScreen.weight"
        style={{
          color: "#242424",
          fontWeight: "700",
          fontSize: 14,
        }}></Text>
      <Text
        tx="productScreen.weightOriginal"
        style={{
          fontSize: 14,
          fontWeight: "400",
          color: "#242424",
          marginVertical: 15,
        }}></Text>
    </View>
  );
}
