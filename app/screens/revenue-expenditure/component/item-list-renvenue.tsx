import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../../components";

interface InputItem {
  status?: any;
  toDay?: any;
  monthDay?: any;
  expenditureValue?: any;
  revenueValue?: any;
  paymentMethod?: any;
}

export const ItemRevenue = (props: InputItem) => {
  return props.paymentMethod != "" ? (
    <ItemRevenueNoDate
      revenueValue={props.revenueValue}
      paymentMethod={props.paymentMethod}
    />
  ) : (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#E7E9ED",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "space-between",
      }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            borderRadius: 6,
            backgroundColor: "white",
            marginHorizontal: 16,
            marginVertical: 8,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#242424",
              paddingHorizontal: 14,
              paddingVertical: 8,
            }}>
            {props.status ?? 1}
          </Text>
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 12, fontWeight: "600" }}>
            {props.toDay ?? "Thứ Ba"}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "400", color: "#747475" }}>
            {props.monthDay ?? "Tháng 3/24"}
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: "#FF4956",
          fontSize: 12,
          fontWeight: "600",
        }}>
        {props.revenueValue}
      </Text>
      <Text
        style={{
          color: "#00CC6A",
          fontSize: 12,
          fontWeight: "600",
          marginRight: 25,
        }}>
        {props.expenditureValue}
      </Text>
    </View>
  );
};

const ItemRevenueNoDate = (props: any) => {
  return (
    <View
      style={{
        marginHorizontal: 16,
        marginVertical: 12,
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
      <Text
        tx="analysis.importGoods"
        style={{ fontSize: 12, fontWeight: "400", color: "#747475" }}></Text>
      <View
        style={{
          flexDirection: "column",
          marginHorizontal: 140,
          alignItems: "center",
        }}>
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#FF4956" }}>
          {props.revenueValue}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#747475" }}>
          {props.paymentMethod}
        </Text>
      </View>
    </View>
  );
};
