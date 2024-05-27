import React from "react";
import { View } from "react-native";
import { Text } from "../../../components";

export const HeaderOrderDetails = (props: any) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 16,
        borderRadius: 8,
      }}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#242424" }}>
            ĐH_21090930
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "#747475",
              lineHeight: 2,
            }}>
            Thời gian đặt hàng: 13:56 - 01/03/2023
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#A55EEA1A",
            borderRadius: 2,
            paddingHorizontal: 8,
            paddingVertical: 2,
          }}>
          <Text style={{ fontSize: 8, fontWeight: "400", color: "#A55EEA" }}>
            Chờ xác nhận
          </Text>
        </View>
      </View>
    </View>
  );
};
