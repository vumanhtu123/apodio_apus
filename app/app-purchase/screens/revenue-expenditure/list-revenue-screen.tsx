import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FilterAppBarComponent } from "./component/filter-appbar";
import { Text } from "../../../components";
import { translate } from "../../i18n";
import { Images } from "../../../../assets";
import { colors, scaleHeight, scaleWidth } from "../../theme";
import { ItemRevenue } from "./component/item-list-renvenue";
import { RefactorMoneyModal } from "./refactor-money-modal";
import { ClassifyModal } from "./classify-modal";
import { FundsModal } from "./funds-modal";
import CustomCalendar from "../../../components/calendar";
import ViewInfo from "../dashboard/component/view-info";
import { LinearGradient } from "react-native-linear-gradient";
import { NavigatorParamList } from "../../navigators";

export const ListRevenueScreen: FC<
  StackScreenProps<NavigatorParamList, "RevenueScreen">
> = observer(function ListRevenueScreen(props) {
  const [makeDateE, setMakeDateE] = useState<any>();
  const [makeDateS, setMakeDateS] = useState<any>();
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isShortByDate, setIsShortByDate] = useState(false);
  const [IsReset, setIsReset] = useState<boolean>();
  const list = [
    {
      status: "05",
      toDay: "Thứ tư",
      monthDay: "Tháng 3/05",
      expenditureValue: "0",
      revenueValue: "40.000",
      paymentMethod: "",
    },
    {
      status: "25",
      toDay: "Thứ tư",
      monthDay: "Tháng 4/07",
      expenditureValue: "40.000",
      revenueValue: "0",
      paymentMethod: "ATM",
    },
    {
      status: "09",
      toDay: "Thứ tư",
      monthDay: "Tháng 3/12",
      expenditureValue: "10.000",
      revenueValue: "5.000",
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

  const toggleModalDate = () => {
    setIsShortByDate(!isShortByDate);
  };

  const onModal = () => {
    setIsVisible(!isVisible);
  };

  console.log("tumv check", timeStart);
  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 1,
      }}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.palette.navyBlue, colors.palette.malibu]}
        style={{
          backgroundColor: colors.palette.navyBlue,
        }}>
        <View
          style={{
            position: "absolute",
            top: Platform.OS === "ios" ? scaleHeight(44) : scaleHeight(0),
            right: 0,
          }}>
          <Images.icon_logoHome />
        </View>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: scaleWidth(18),
            // paddingVertical: scaleHeight(20),
            paddingTop: scaleHeight(30),
            paddingBottom: scaleHeight(8),
          }}>
          <ViewInfo
            // token={accountStore.authToken}
            token="asd"
            image={""}
            // name={accountStore.name}
            name="Công ty Thang Long"
            onPress={() => props.navigation.navigate("inforAccount")}
            // showInfo={}
            // kind={KIND_SCREEN.HOME}
            kind={1}
            onChangeAVT={() => {
              // navigation.dispatch(DrawerActions.openDrawer);
              // testDebug();
            }}
          />
          <TouchableOpacity onPress={() => { }}>
            <Images.icon_search />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <FilterAppBarComponent
            date={timeStart == "" ? null : timeStart + timeEnd}
            onShowCalender={() => {
              toggleModalDate();
            }}
            clear={() => {
              setTimeStart("");
              setTimeEnd("");
              console.log("onclick", timeStart);
            }}
          />
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
            <TouchableOpacity style={{ flexDirection: "row" }}
              onPress={() => props.navigation.navigate('moneyManagement')}
            >
              <Images.ic_Chartbar />
              <Text
                style={{
                  color: "#0078D4",
                  fontSize: 12,
                  fontWeight: "400",
                }}>
                {translate("analysis.report")}
              </Text>
            </TouchableOpacity>
          </View>
          <ItemSum />
          <View style={{ backgroundColor: "#7676801F" }}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "flex-end",
                marginVertical: 10,
              }}>
              <View style={{ flex: 1, marginHorizontal: 40 }} />
              <Text
                tx={"analysis.expenditure"}
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#242424",
                  flex: 1,
                }}></Text>
              <Text
                tx={"analysis.revenue"}
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#242424",
                  // flex: 1,
                  marginRight: scaleWidth(30),
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
      </LinearGradient>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginVertical: 15,
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('expenseScreen')}
          style={{
            backgroundColor: "#FF4956",
            flexDirection: "row",
            // paddingHorizontal: 36,
            paddingVertical: 12,
            alignContent: "center",
            borderRadius: 8,
            flex: 1,
            justifyContent: "center",
            marginRight: scaleWidth(13),
          }}

        >
          <Images.ic_arrow_up />
          <Text
            tx={"analysis.amountExpenditure"}
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#FFFFFF",
              marginLeft: 5,
            }}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#00CC6A",
            flexDirection: "row",
            // paddingHorizontal: 36,
            justifyContent: "center",
            paddingVertical: 12,
            alignContent: "center",
            borderRadius: 8,
            flex: 1,
          }}
          onPress={() => props.navigation.navigate('addRevenueScreen')}
        >
          <Images.ic_arrow_down />
          <Text
            tx={"analysis.amountRevenue"}
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#FFFFFF",
              marginLeft: 5,
            }}></Text>
        </TouchableOpacity>
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
      {/* <FundsModal
        onVisible={isVisible}
        onClose={(item: any) => {
          setIsVisible(false);
        }}
      /> */}
      <CustomCalendar
        button2={true}
        onClose={() => toggleModalDate()}
        handleShort={() => {
          setMakeDateS(timeStart);
          setMakeDateE(timeEnd);
          toggleModalDate();
        }}
        onMarkedDatesChangeS={(markedDateS: string) => {
          setTimeStart(markedDateS);
        }}
        onMarkedDatesChangeE={(markedDateE: string) => {
          setTimeEnd(markedDateE);
        }}
        isShowTabs={false}
        isSortByDate={isShortByDate}
        toggleModalDate={toggleModalDate}
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
          flex: 1,
          paddingVertical: 15,
          backgroundColor: "#F6F7F9",
          borderRadius: 6,
          flexDirection: "row",
        }}>
        <Images.ic_money_down style={{ marginLeft: scaleWidth(5) }} />

        <View style={{ flexDirection: "column", marginLeft: scaleWidth(5) }}>
          <Text
            tx={"analysis.totalExpenditure"}
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "#242424",
            }}></Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#FF4956",
            }}>
            100.000
          </Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: scaleWidth(15),
          paddingVertical: 15,
          backgroundColor: "#F6F7F9",
          flex: 1,
          borderRadius: 6,
          flexDirection: "row",
        }}>
        <Images.ic_money_up style={{ marginLeft: scaleWidth(5) }} />
        <View style={{ flexDirection: "column", marginLeft: scaleWidth(5) }}>
          <Text
            tx={"analysis.totalRevenue"}
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "#242424",
            }}></Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#00CC6A",
            }}>
            900.000
          </Text>
        </View>
      </View>
    </View>
  );
};
//test conflict
