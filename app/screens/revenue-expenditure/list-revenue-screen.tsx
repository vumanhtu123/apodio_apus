import { StackScreenProps } from "@react-navigation/stack";
import { AppStackParamList } from "../../navigators/app-navigator";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Button, FlatList, TouchableOpacity, View } from "react-native";
import React from "react";
import { FilterAppBarComponent } from "./component/filter-appbar";
import { Text } from "../../components";
import { translate } from "../../i18n";
import { Images } from "../../../assets";
import { scaleWidth } from "../../theme";
import { ItemRevenue } from "./component/item-list-renvenue";
import { RefactorMoneyModal } from "./refactor-money-modal";
import { ClassifyModal } from "./classify-modal";

export const ListRevenueScreen: FC<
  StackScreenProps<AppStackParamList, "RevenueScreen">
> = observer(function ListRevenueScreen(props) {
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      status: "05",
      toDay: "Thứ tư",
      monthDay: "Tháng 3/05",
      expenditureValue: "40.000",
      revenueValue: "40.000",
      paymentMethod: "",
    },
    {
      status: "25",
      toDay: "Thứ tư",
      monthDay: "Tháng 4/07",
      expenditureValue: "40.000",
      revenueValue: "40.000",
      paymentMethod: "ATM",
    },
    {
      status: "09",
      toDay: "Thứ tư",
      monthDay: "Tháng 3/12",
      expenditureValue: "40.000",
      revenueValue: "40.000",
      paymentMethod: "",
    },
    {
      status: "",
      toDay: "Thứ tư",
      monthDay: "Tháng 3/05",
      expenditureValue: "0",
      revenueValue: "40.000",
      paymentMethod: "Tiền mặt",
    },
    {
      status: "05",
      toDay: "Thứ tư",
      monthDay: "Tháng 3/05",
      expenditureValue: "40.000",
      revenueValue: "40.000",
      paymentMethod: "",
    },
  ];

  const onModal = () => {
    setIsVisible(!isVisible);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "column",
      }}>
      <View style={{ backgroundColor: "white" }}>
        <FilterAppBarComponent />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 16,
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 10, fontWeight: "400", color: "#242424" }}>
            {translate("analysis.balance")}
            <Text
              style={{
                color: "#FF4956",
                fontSize: 14,
                fontWeight: "600",
              }}>
              10.000
            </Text>
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Images.ic_Chartbar />
            <Text
              style={{
                color: "#0078D4",
                fontSize: 12,
                fontWeight: "400",
              }}>
              {translate("analysis.report")}
            </Text>
          </View>
        </View>
        <ItemSum />
        <View style={{ backgroundColor: "#7676801F" }}>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "flex-end",
              marginVertical: 10,
            }}>
            <Text
              tx={"analysis.expenditure"}
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "#242424",
                marginHorizontal: 60,
              }}></Text>
            <Text
              tx={"analysis.revenue"}
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "#242424",
                marginHorizontal: 40,
              }}></Text>
          </View>
        </View>
        <FlatList
          data={list}
          renderItem={({ item, index }: any) => {
            return (
              <ItemRevenue
                expenditureValue={item.expenditureValue}
                monthDay={item.monthDay}
                paymentMethod={item.paymentMethod}
                revenueValue={item.revenueValue}
                status={item.status}
                toDay={item.toDay}
              />
            );
          }}></FlatList>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginVertical: 15,
        }}>
        <TouchableOpacity onPress={() => onModal()}>
          <View
            style={{
              backgroundColor: "#FF4956",
              flexDirection: "row",
              paddingHorizontal: 36,
              paddingVertical: 12,
              alignContent: "center",
              borderRadius: 8,
            }}>
            <Images.ic_arrow_up />
            <Text
              tx={"analysis.amountExpenditure"}
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: "#FFFFFF",
                marginLeft: 5,
              }}></Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "#00CC6A",
            flexDirection: "row",
            paddingHorizontal: 36,
            paddingVertical: 12,
            alignContent: "center",
            borderRadius: 8,
          }}>
          <Images.ic_arrow_down />
          <Text
            tx={"analysis.amountRevenue"}
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#FFFFFF",
              marginLeft: 5,
            }}></Text>
        </View>
      </View>
      {/* <RefactorMoneyModal
        onVisible={isVisible}
        onClose={(item: any) => {
          setIsVisible(false);
        }}
      /> */}
      <ClassifyModal
        onVisible={isVisible}
        onClose={(item: any) => {
          setIsVisible(false);
        }}
      />
    </View>
  );
});

const ItemSum = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 16,
        marginVertical: 15,
      }}>
      <View
        style={{
          paddingVertical: 15,
          backgroundColor: "#F6F7F9",
          paddingRight: scaleWidth(75),
          paddingLeft: scaleWidth(10),
          borderRadius: 6,
        }}>
        <View
          style={{
            alignItems: "flex-start",
            flexDirection: "row",
          }}>
          <Images.ic_money_down />
          <Text
            tx={"analysis.totalExpenditure"}
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "#242424",
              paddingLeft: 10,
            }}></Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#FF4956",
            marginLeft: 20,
          }}>
          100.000
        </Text>
      </View>
      <View style={{ marginHorizontal: 15 }}></View>
      <View
        style={{
          paddingVertical: 15,
          backgroundColor: "#F6F7F9",
          paddingRight: scaleWidth(75),
          paddingLeft: scaleWidth(10),
          borderRadius: 6,
        }}>
        <View
          style={{
            flexDirection: "row",
          }}>
          <Images.ic_money_up />
          <Text
            tx={"analysis.totalRevenue"}
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "#242424",
              paddingLeft: 10,
            }}></Text>
        </View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: "#00CC6A",
            marginLeft: 20,
          }}>
          900.000
        </Text>
      </View>
    </View>
  );
};
