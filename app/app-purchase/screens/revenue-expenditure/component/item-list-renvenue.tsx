import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../../../../components";
import { scaleWidth } from "../../../theme";

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
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.viewStatus}>
          <Text style={styles.textStatus}>{props.status ?? 1}</Text>
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
      <Text style={styles.textRevenue}>{props.revenueValue}</Text>
      <Text style={styles.textExpenditure}>{props.expenditureValue}</Text>
    </View>
  );
};

const ItemRevenueNoDate = (props: any) => {
  return (
    <View style={styles.containerRevenueNoDate}>
      <Text tx="analysis.importGoods" style={styles.textTittle}></Text>
      <View style={styles.viewPaymentMethod}>
        <Text style={styles.textRevenueNoDate}>{props.revenueValue}</Text>
        <Text style={styles.textPaymentMethod}>{props.paymentMethod}</Text>
      </View>
      <View />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#E7E9ED",
    alignItems: "center",
  },
  viewStatus: {
    borderRadius: 6,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 8,
  },
  textStatus: {
    fontSize: 14,
    fontWeight: "400",
    color: "#242424",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  textRevenue: {
    flex: 1,
    color: "#FF4956",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: scaleWidth(40),
  },
  textExpenditure: {
    flex: 1,
    color: "#00CC6A",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    // marginLeft: props.expenditureValue !== "0" || undefined ? 10 : 15,
  },
  containerRevenueNoDate: {
    marginHorizontal: 16,
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTittle: {
    flex: 1,
    fontSize: 12,
    fontWeight: "400",
    color: "#747475",
  },
  viewPaymentMethod: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginRight: scaleWidth(80),
  },
  textRevenueNoDate: { fontSize: 12, fontWeight: "600", color: "#FF4956" },
  textPaymentMethod: {
    fontSize: 12,
    fontWeight: "600",
    color: "#747475",
  },
});
