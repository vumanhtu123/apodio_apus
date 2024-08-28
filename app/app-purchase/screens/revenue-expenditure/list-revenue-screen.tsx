import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  RefreshControl,
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
import CustomCalendar from "../../../components/calendar";
import ViewInfo from "../dashboard/component/view-info";
import { LinearGradient } from "react-native-linear-gradient";
import { NavigatorParamList } from "../../navigators";
import { useNavigation } from "@react-navigation/native";
import { useStores } from "../../models";
import { formatDatePayment } from "../../utils/formatDate";
import moment from "moment";

export const ListRevenueScreen: FC<
  StackScreenProps<NavigatorParamList, "RevenueScreen">
> = observer(function ListRevenueScreen(props) {
  const navigation = useNavigation();
  const [makeDateE, setMakeDateE] = useState<any>();
  const [makeDateS, setMakeDateS] = useState<any>();
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isShortByDate, setIsShortByDate] = useState(false);
  const [listPayment, setListPayment] = useState<any>();
  const [total, setTotal] = useState<any>();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const inbound = "INBOUND, INBOUND_INTERNAL";
  const outbound = "OUTBOUND, OUTBOUND_INTERNAL";
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const { paymentStore } = useStores();

  const getListPayment = async () => {
    const result: any = await paymentStore.getListPayment({
      search: "",
      dateStart: paymentStore.filterListPayment.dateStart,
      dateEnd: paymentStore.filterListPayment.dateEnd,
      page: page,
      size: size,
    });
    setTotalPages(result.result.data.totalPages);
    if (result && result.kind === "ok") {
      if (page === 0) {
        // if (listPayment == undefined) {
        //   console.log("get list success");
        setListPayment(result.result.data.content);
        // } else {
        //   const newArr = result.result.data.content.filter(
        //     (item: { id: number }) => item.id !== listPayment?.id
        //   );
        //   setListPayment([listPayment].concat(newArr));
        // }
      } else {
        // const newArr = result.result.data.content.filter(
        //   (item: { id: number }) => item.id !== listPayment?.id
        // );
        setListPayment((prevProducts: any) => [
          ...prevProducts,
          ...result.result.data.content,
        ]);
      }
    } else {
      console.error("Failed to fetch list unit:", result);
    }
    console.log(
      "result payment list: ",
      JSON.stringify(result.result.data.page)
    );
  };

  const handlePressDate = (date: any) => {
    // console.log("press date", date);
    if (date == 2) {
      paymentStore.setFilterListPayment({
        dateStart: moment(new Date()).format("YYYY-MM-DD"),
        dateEnd: moment(new Date()).format("YYYY-MM-DD"),
        customDate: false,
        stringDate: translate("calendar.today"),
        id: 1,
      });
    } else if (date == 1) {
      const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
      const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
      paymentStore.setFilterListPayment({
        dateStart: startOfMonth,
        dateEnd: endOfMonth,
        customDate: false,
        stringDate: translate("calendar.today"),
        id: 1,
      });
    }
  };

  const handleEndReachedListPayment = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const refreshListPayment = async () => {
    setIsRefreshing(true);
    setPage(0);
    // setSearchText("");

    getListPayment();
    setIsRefreshing(false);
  };

  const getTotalPayment = async () => {
    const result: any = await paymentStore.getTotalPayment();
    setTotal(result.result.data);
    console.log("total payment: ", JSON.stringify(result.result.data));
  };

  const getListFilter = async (item: any) => {
    console.log("inbound list filter", item);
    const result: any = await paymentStore.getListPayment({
      search: "",
      dateStart: paymentStore.filterListPayment.dateStart,
      dateEnd: paymentStore.filterListPayment.dateEnd,
      page: page,
      size: size,
      paymentTypes: item == 1 ? inbound : outbound,
    });
    setListPayment(result.result.data.content);
    console.log(
      "result payment list: ",
      JSON.stringify(result.result.data.content)
    );
  };

  useEffect(() => {
    getTotalPayment();
  }, []);

  useEffect(() => {
    getListPayment();
  }, [page, paymentStore.filterListPayment, timeStart]);

  const toggleModalDate = () => {
    setIsShortByDate(!isShortByDate);
  };

  const onModal = () => {
    setIsVisible(!isVisible);
  };

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
            date={timeStart == "" ? null : timeStart + " - " + timeEnd}
            onShowCalender={() => {
              navigation.navigate({ name: "filterRevenueScreen" } as never);
            }}
            clear={() => {
              setTimeStart("");
              setTimeEnd("");
              console.log("onclick", timeStart);
            }}
            onChange={(item: any) => {
              handlePressDate(item);
              console.log("on props", item);
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
          <ItemSum
            outbound={total?.outbound}
            inbound={total?.inbound}
            inboundPress={1}
            outboundPress={2}
            onChange={(item: any) => {
              console.log("onClick 111");
              getListFilter(item);
            }}
          />
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
                  color: colors.nero,
                  width: "28%",
                }}></Text>
              <Text
                tx={"analysis.revenue"}
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: colors.nero,
                  width: "17%",
                }}></Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        data={listPayment}
        onEndReached={handleEndReachedListPayment}
        onEndReachedThreshold={1.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshListPayment}
            title="ok"
          />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }: any) => {
          const { day, monthYear } = formatDatePayment(item.date);
          return (
            <ItemRevenue
              totalOutbound={item.totalOutbound}
              day={day}
              totalInbound={item.totalInbound}
              dayOfWeek={item.dayOfWeek}
              month={monthYear}
              lines={item.lines}
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

const ItemSum = (props: any) => {
  const [showTotal, setShowTotal] = useState<number>(0);
  const handleChange = () => {
    props.onChange(showTotal);
  };

  return (
    <View>
      {showTotal == 1 ? (
        <TouchableOpacity
          onPress={() => {
            console.log("inboundPress", props.inboundPress);
            setShowTotal(props.inboundPress);
          }}
          style={{
            marginHorizontal: 16,
            marginVertical: 15,
            // flex: 1,
            width: "50%",
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
              {props.inbound}
            </Text>
          </View>
        </TouchableOpacity>
      ) : showTotal == 2 ? (
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View />
          <TouchableOpacity
            onPress={() => {
              console.log("outboundPress", props.outboundPress);
              setShowTotal(props.outboundPress);
            }}
            style={{
              marginHorizontal: 16,
              marginVertical: 15,
              marginLeft: scaleWidth(15),
              paddingVertical: 15,
              backgroundColor: colors.aliceBlue,
              width: "50%",
              borderRadius: 6,
              flexDirection: "row",
            }}>
            <Svgs.ic_money_up style={{ marginLeft: scaleWidth(5) }} />
            <View
              style={{ flexDirection: "column", marginLeft: scaleWidth(5) }}>
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
                {props.outbound}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 16,
            marginVertical: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log("inboundPress", props.inboundPress);
              setShowTotal(props.inboundPress);
              handleChange();
            }}
            style={{
              flex: 1,
              paddingVertical: 15,
              backgroundColor: colors.aliceBlue,
              borderRadius: 6,
              flexDirection: "row",
            }}>
            <Svgs.ic_money_down style={{ marginLeft: scaleWidth(5) }} />

            <View
              style={{ flexDirection: "column", marginLeft: scaleWidth(5) }}>
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
                {props.inbound}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("outboundPress", props.outboundPress);
              setShowTotal(props.outboundPress);
              handleChange();
            }}
            style={{
              marginLeft: scaleWidth(15),
              paddingVertical: 15,
              backgroundColor: colors.aliceBlue,
              flex: 1,
              borderRadius: 6,
              flexDirection: "row",
            }}>
            <Svgs.ic_money_up style={{ marginLeft: scaleWidth(5) }} />
            <View
              style={{ flexDirection: "column", marginLeft: scaleWidth(5) }}>
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
                {props.outbound}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
//test conflict
