import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "../../../../components";
import { colors, scaleWidth } from "../../../theme";

interface InputItem {
  dayOfWeek?: any;
  day?: any;
  month?: any;
  totalInbound?: any;
  totalOutbound?: any;
  lines: [
    {
      label: any;
      inbound: any;
      outbound: any;
      paymentMethod: any;
    }
  ];
}

// const RenderItem = (props: any) => {
//   return;
//   <ItemRevenueNoDate
//     revenueValue={item.value}
//     paymentMethod={item.paymentMethod}
//     name={item.name}
//   />;
// };

export const ItemRevenue = (props: InputItem) => {
  const [isShowDetail, setIsShowDetail] = useState(false);

  return (
    <View style={{ flexDirection: "column" }}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setIsShowDetail(!isShowDetail);
          // handleOnclick(props.id);
        }}>
        <View
          style={{ flexDirection: "row", alignItems: "center", width: "40%" }}>
          <View style={styles.viewStatus}>
            <Text style={styles.textStatus}>{props.day}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 12, fontWeight: "600" }}>
              {props.dayOfWeek ?? ""}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: colors.dolphin,
              }}>
              {props.month ?? ""}
            </Text>
          </View>
        </View>
        <Text style={styles.textRevenue}>{props.totalInbound}</Text>
        <Text style={styles.textExpenditure}>{props.totalOutbound}</Text>
      </TouchableOpacity>
      {isShowDetail == true
        ? props.lines.map((item: any, index: any) => {
            return (
              <ItemRevenueNoDate
                index={index}
                label={item.label}
                inbound={item.inbound}
                outbound={item.outbound}
                paymentMethod={item.paymentMethod}
              />
            );
          })
        : null}
    </View>
  );
};

const ItemRevenueNoDate = (props: any) => {
  return (
    <View key={props.index} style={styles.containerRevenueNoDate}>
      <Text style={styles.textTittle}>{props.label}</Text>
      <View style={styles.viewPaymentMethod}>
        <Text style={styles.textRevenueNoDate}>{props.inbound}</Text>
        <Text style={styles.textPaymentMethod}>{props.paymentMethod}</Text>
      </View>
      <Text style={styles.textExpenditure2}>{props.outbound}</Text>
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
    color: colors.nero,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  textRevenue: {
    width: "15%",
    color: colors.radicalRed,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: scaleWidth(40),
  },
  textExpenditure: {
    width: "20%",
    color: colors.malachite,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    // marginLeft: props.expenditureValue !== "0" || undefined ? 10 : 15,
  },
  textExpenditure2: {
    width: "20%",
    color: colors.malachite,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    // marginLeft: props.expenditureValue !== "0" || undefined ? 10 : 15,
  },
  containerRevenueNoDate: {
    marginHorizontal: 16,
    marginVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  textTittle: {
    width: "40%",
    fontSize: 12,
    fontWeight: "400",
    color: colors.dolphin,
  },
  viewPaymentMethod: {
    flexDirection: "column",
    alignItems: "center",
  },
  textRevenueNoDate: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.radicalRed,
  },
  textPaymentMethod: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.dolphin,
  },
});
