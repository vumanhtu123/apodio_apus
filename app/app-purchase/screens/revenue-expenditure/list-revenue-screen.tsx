import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { FilterAppBarComponent } from "./component/filter-appbar";
import { Text } from "../../../components";
import { translate } from "../../../i18n";
import { Svgs } from "../../../../assets/svgs";
import { colors, scaleHeight, scaleWidth } from "../../theme";
import { ItemRevenue } from "./component/item-list-renvenue";
import { ClassifyModal } from "./classify-modal";
import { FundsModal } from "./funds-modal";
import CustomCalendar from "../../../components/calendar";
import ViewInfo from "../dashboard/component/view-info";
import { LinearGradient } from "react-native-linear-gradient";
import { NavigatorParamList } from "../../navigators";
import { useNavigation } from "@react-navigation/native";
import { useStores } from "../../models";

export const list = [
  {
    id: 0,
    status: "05",
    toDay: "Thứ tư",
    monthDay: "Tháng 3/05",
    expenditureValue: "0",
    revenueValue: "40.000",
    detail: [
      {
        name: "Nhập hàng",
        value: "30.000",
        paymentMethod: "ATM",
      },
      {
        name: "Bán hàng",
        value: "50.000",
        paymentMethod: "ATM",
      },
    ],
  },
  {
    id: 1,
    status: "25",
    toDay: "Thứ tư",
    monthDay: "Tháng 4/07",
    expenditureValue: "40.000",
    revenueValue: "0",
    paymentMethod: "ATM",
    detail: [
      {
        name: "Nhập hàng",
        value: "30.000",
        paymentMethod: "ATM",
      },
      {
        name: "Bán hàng",
        value: "50.000",
        paymentMethod: "ATM",
      },
    ],
  },
  {
    id: 2,
    status: "09",
    toDay: "Thứ tư",
    monthDay: "Tháng 3/12",
    expenditureValue: "10.000",
    revenueValue: "5.000",
    detail: [
      {
        name: "Nhập hàng",
        value: "30.000",
        paymentMethod: "ATM",
      },
      {
        name: "Bán hàng",
        value: "50.000",
        paymentMethod: "ATM",
      },
    ],
  },
  {
    id: 3,
    status: "10",
    toDay: "Thứ tư",
    monthDay: "Tháng 3/05",
    expenditureValue: "0",
    revenueValue: "40.000",
    detail: [
      {
        name: "Nhập hàng",
        value: "30.000",
        paymentMethod: "ATM",
      },
      {
        name: "Bán hàng",
        value: "50.000",
        paymentMethod: "ATM",
      },
    ],
  },
  {
    id: 4,
    status: "31",
    toDay: "Thứ tư",
    monthDay: "Tháng 3/05",
    expenditureValue: "40.000",
    revenueValue: "40.000",
    detail: [
      {
        name: "Nhập hàng",
        value: "30.000",
        paymentMethod: "ATM",
      },
      {
        name: "Bán hàng",
        value: "50.000",
        paymentMethod: "ATM",
      },
    ],
  },
];

export const ListRevenueScreen: FC<
  StackScreenProps<NavigatorParamList, "RevenueScreen">
> = observer(function ListRevenueScreen(props) {
  const navigation = useNavigation()
  const [makeDateE, setMakeDateE] = useState<any>();
  const [makeDateS, setMakeDateS] = useState<any>();
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isShortByDate, setIsShortByDate] = useState(false);
  const [IsReset, setIsReset] = useState<boolean>();

  const { paymentStore } = useStores();

  const getListPayment = async () => {
    const result: any = await paymentStore.getListPayment();

    console.log(
      "result payment list: ",
      JSON.stringify(result.result.data.content)
    );
  };

  useEffect(() => {
    getListPayment();
  }, []);

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
        // justifyContent: "space-between",
        // flexDirection: "column",
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
          <Svgs.icon_logoHome />
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
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate({ name: "SearchScreen" } as never);
            }}>
            <Svgs.icon_search />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "white" }}>
          <FilterAppBarComponent
            date={timeStart == "" ? null : timeStart + timeEnd}
            onShowCalender={() => {
              navigation.navigate({name: "filterRevenueScreen"} as never)
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
            <Text
              style={{ fontSize: 10, fontWeight: "400", color: colors.nero }}>
              {translate("analysis.balance")}
              <Text
                style={{
                  color: colors.radicalRed,
                  fontSize: 14,
                  fontWeight: "600",
                }}>
                10.000
              </Text>
            </Text>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => props.navigation.navigate("moneyManagement")}>
              <Svgs.ic_Chartbar />
              <Text
                style={{
                  color: colors.navyBlue,
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
                  color: colors.nero,
                  flex: 1,
                }}></Text>
              <Text
                tx={"analysis.revenue"}
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: colors.nero,
                  // flex: 1,
                  marginRight: scaleWidth(30),
                }}></Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView>
        <FlatList
          scrollEnabled={false}
          data={list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }: any) => {
            return (
              <ItemRevenue
                id={item.id}
                expenditureValue={item.expenditureValue}
                monthDay={item.monthDay}
                revenueValue={item.revenueValue}
                status={item.status}
                toDay={item.toDay}
                detail={item.detail}
              />
            );
          }}></FlatList>

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
          selected={(data: any) => {
            // field1.current = data.value;
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
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
          marginVertical: 15,
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("expenseScreen")}
          style={{
            backgroundColor: colors.radicalRed,
            flexDirection: "row",
            // paddingHorizontal: 36,
            paddingVertical: 12,
            alignContent: "center",
            borderRadius: 8,
            flex: 1,
            justifyContent: "center",
            marginRight: scaleWidth(13),
          }}>
          <Svgs.ic_arrow_up />
          <Text
            tx={"analysis.amountExpenditure"}
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.white,
              marginLeft: 5,
            }}></Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.malachite,
            flexDirection: "row",
            // paddingHorizontal: 36,
            justifyContent: "center",
            paddingVertical: 12,
            alignContent: "center",
            borderRadius: 8,
            flex: 1,
          }}
          onPress={() => props.navigation.navigate("addRevenueScreen")}>
          <Svgs.ic_arrow_down />
          <Text
            tx={"analysis.amountRevenue"}
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.white,
              marginLeft: 5,
            }}></Text>
        </TouchableOpacity>
      </View>
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
          backgroundColor: colors.aliceBlue,
          borderRadius: 6,
          flexDirection: "row",
        }}>
        <Svgs.ic_money_down style={{ marginLeft: scaleWidth(5) }} />

        <View style={{ flexDirection: "column", marginLeft: scaleWidth(5) }}>
          <Text
            tx={"analysis.totalExpenditure"}
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: colors.nero,
            }}></Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.radicalRed,
            }}>
            100.000
          </Text>
        </View>
      </View>
      <View
        style={{
          marginLeft: scaleWidth(15),
          paddingVertical: 15,
          backgroundColor: colors.aliceBlue,
          flex: 1,
          borderRadius: 6,
          flexDirection: "row",
        }}>
        <Svgs.ic_money_up style={{ marginLeft: scaleWidth(5) }} />
        <View style={{ flexDirection: "column", marginLeft: scaleWidth(5) }}>
          <Text
            tx={"analysis.totalRevenue"}
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: colors.nero,
            }}></Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.malachite,
            }}>
            900.000
          </Text>
        </View>
      </View>
    </View>
  );
};
//test conflict
