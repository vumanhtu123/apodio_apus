import { StackScreenProps } from "@react-navigation/stack";
import { FC, useState } from "react";
import { NavigatorParamList } from "../../../../navigators";
import { observer } from "mobx-react-lite";
import {
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Header, Text } from "../../../../../components";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../../theme";
import { Svgs } from "../../../../../../assets/svgs";
import en from "../../../../../i18n/en";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Styles } from "../styles";
import data from "../../../../../components/svg-icon/data";
import CustomCalendar from "../../../../../components/calendar";
import moment from "moment";
import { ModalPay } from "../../component/modalPay";
import { ModalExchange } from "../../component/modalExchange";
import { translate } from "../../../../i18n";

export const DetailDebtScreen: FC<
  StackScreenProps<NavigatorParamList, "detailDebt">
> = observer(function detailDebtScreen(props) {
  const [valueStatusShowOrHiddenPay, setValueStatusShowOrHiddenPay] =
    useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [keyToPass, setKeyToPass] = useState<string>();
  const [isReset, setIsReset] = useState<boolean>();
  const [makeDateS, setMakeDateS] = useState<any>();
  const [makeDateE, setMakeDateE] = useState<any>();
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [isSortByDate, setIsSortByDate] = useState<boolean>(false);
  const [isVisiblePay, setIsVisiblePay] = useState<boolean>(false);

  const toggleModalDate = () => {
    setIsSortByDate(!isSortByDate);
  };
  interface DataItem {
    id: string;
    order: string;
    valueOrder: string;
    paid: string;
    dateOfPayment: string;
    remainingDebt: string;
    latePaymentPenalty: string;
    totalRemainingDebt: string;
    paymentTerm: string;
    exchange: number;
    createDateTransaction: string;
  }

  const fakeData: DataItem[] = [
    {
      id: "1",
      order: "DH_30102511",
      valueOrder: "21.000.000 đ",
      paid: "15.500.000 đ",
      dateOfPayment: " 04/01/2022",
      remainingDebt: "5.500.000",
      latePaymentPenalty: "700.000 đ",
      totalRemainingDebt: "6.200.000 đ",
      paymentTerm: "12/01/2022",
      exchange: 5,
      createDateTransaction: "08/10/2020",
    },
    {
      id: "2",
      order: "DH_30102511",
      valueOrder: "21.000.000 đ",
      paid: "15.500.000 đ",
      dateOfPayment: " 04/01/2022",
      remainingDebt: "5.500.000",
      latePaymentPenalty: "700.000 đ",
      totalRemainingDebt: "6.200.000 đ",
      paymentTerm: "12/01/2022",
      exchange: 5,
      createDateTransaction: "08/10/2020",
    },
    {
      id: "3",
      order: "DH_30102511",
      valueOrder: "21.000.000 đ",
      paid: "15.500.000 đ",
      dateOfPayment: " 04/01/2022",
      remainingDebt: "5.500.000",
      latePaymentPenalty: "700.000 đ",
      totalRemainingDebt: "6.200.000 đ",
      paymentTerm: "13/01/2022",
      exchange: 5,
      createDateTransaction: "08/11/2020",
    },
    {
      id: "4",
      order: "DH_30102511",
      valueOrder: "21.000.000 đ",
      paid: "15.500.000 đ",
      dateOfPayment: " 04/01/2022",
      remainingDebt: "5.500.000",
      latePaymentPenalty: "700.000 đ",
      totalRemainingDebt: "6.200.000 đ",
      paymentTerm: "13/01/2022",
      exchange: 5,
      createDateTransaction: "08/11/2020",
    },
    {
      id: "5",
      order: "DH_30102511",
      valueOrder: "21.000.000 đ",
      paid: "15.500.000 đ",
      dateOfPayment: " 04/01/2022",
      remainingDebt: "5.500.000",
      latePaymentPenalty: "700.000 đ",
      totalRemainingDebt: "6.200.000 đ",
      paymentTerm: "12/01/2022",
      exchange: 5,
      createDateTransaction: "08/11/2020",
    },
  ];
  const groupBy = (data: DataItem[], key: string) => {
    return data.reduce((result: { [key: string]: DataItem[] }, item: any) => {
      const value = item[key];
      if (!result[value]) {
        result[value] = [];
      }
      result[value].push(item);
      return result;
    }, {});
  };
  const dataGroup = groupBy(fakeData, "createDateTransaction");
  console.log("====================================");
  console.log("data groupBy", groupBy(fakeData, "createDateTransaction"));
  console.log("====================================");

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    setTimeout(() => {
      setIsLoadingMore(false);
    }, 3000);
  };

  console.log(
    "data date start ,end",
    moment(makeDateE).format("DD/MM/YYYY"),
    makeDateE
  );

  return (
    <View style={{ flex: 1 }}>
      <Header
        style={{ height: scaleHeight(52) }}
        LeftIcon={Svgs.back}
        headerTx="debtScreen.detailDebtSupplier"
        onLeftPress={() => {
          props.navigation.goBack();
        }}
        titleStyle={Styles.textHeader}
        RightIcon={Svgs.ic_calender_white}
        onRightPress={() => {
          setIsSortByDate(!isSortByDate);
        }}
        rightText1={
          moment(makeDateS).format("DD/MM/YYYY") +
          "-" +
          moment(makeDateE).format("DD/MM/YYYY")
        }
        headerInput={true}
        searchText={translate("NCCScreen.nameSuppliers")}
      />
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.palette.navyBlue, colors.palette.malibu]}
        style={{ height: scaleHeight(50) }}></LinearGradient>
      <View style={Styles.bodyCardMusPay}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={[{ alignItems: "center", flex: 1 }]}>
            <Text
              style={[
                Styles.styleNumber,
                { color: colors.palette.textExCancle },
              ]}>{`100.000 ${"đ"}`}</Text>
            <Text
              style={{ fontSize: 12, textAlign: "center" }}
              tx="debtScreen.debtNeedToPaid"></Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ alignItems: "center", flex: 1 }]}>
            <Text
              style={[
                Styles.styleNumber,
                { color: colors.palette.textExCancle },
              ]}>
              12/01/2022
            </Text>
            <Text style={{ fontSize: 12 }} tx="debtScreen.paymentTerm"></Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={{ marginTop: 50 }}
        data={Object.entries(dataGroup)}
        showsVerticalScrollIndicator={false}
        keyExtractor={([createDateTransaction]) => createDateTransaction}
        renderItem={({ item: [createDateTransaction, products] }) => {
          return (
            <View style={[Styles.groupContainer]}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: scaleHeight(15),
                }}>
                <View
                  style={{
                    width: "40%",
                    height: 1,
                    backgroundColor: colors.solitude1,
                  }}
                />
                <Text style={Styles.dateText}>{createDateTransaction}</Text>
                <View
                  style={{
                    width: "40%",
                    height: 1,
                    backgroundColor: colors.solitude1,
                  }}
                />
              </View>
              {products.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={{
                    backgroundColor: colors.white,
                    marginBottom: 10,
                    borderRadius: margin.margin_8,
                    padding: scaleWidth(15),
                  }}
                  onPress={() =>
                    setValueStatusShowOrHiddenPay(!valueStatusShowOrHiddenPay)
                  }>
                  <View
                    style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                    <Text tx="debtScreen.order" style={Styles.label} />
                    <Text style={Styles.styleOrder}>{item.order}</Text>
                  </View>
                  <View
                    style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                    <Text tx="debtScreen.valueOrder" style={Styles.label} />
                    <Text
                      style={[
                        Styles.styleOrder,
                        { color: colors.palette.malachite },
                      ]}>
                      {item.valueOrder}
                    </Text>
                  </View>
                  <View
                    style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                    <Text tx="debtScreen.paid" style={Styles.label} />
                    <Text
                      style={[
                        Styles.styleOrder,
                        { color: colors.palette.malachite },
                      ]}>
                      {item.paid}
                    </Text>
                  </View>
                  <View
                    style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                    <Text tx="debtScreen.dateOfPayment" style={Styles.label} />
                    <Text style={[Styles.styleOrder]}>
                      {item.dateOfPayment}
                    </Text>
                  </View>
                  <View
                    style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                    <Text tx="debtScreen.remainingDebt" style={Styles.label} />
                    <Text
                      style={[
                        Styles.styleOrder,
                        { color: colors.palette.radicalRed },
                      ]}>
                      {item.remainingDebt}
                    </Text>
                  </View>
                  <View
                    style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                    <Text
                      tx="debtScreen.latePaymentPenalty"
                      style={Styles.label}
                    />
                    <Text
                      style={[
                        Styles.styleOrder,
                        { color: colors.palette.radicalRed },
                      ]}>
                      {item.latePaymentPenalty}
                    </Text>
                  </View>
                  <View
                    style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                    <Text
                      tx="debtScreen.totalRemainingDebt"
                      style={Styles.label}
                    />
                    <Text
                      style={[
                        Styles.styleOrder,
                        { color: colors.palette.radicalRed },
                      ]}>
                      {item.totalRemainingDebt}
                    </Text>
                  </View>
                  <View
                    style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                    <Text tx="debtScreen.paymentTerm2" style={Styles.label} />
                    <Text style={[Styles.styleOrder]}>{item.paymentTerm}</Text>
                  </View>
                  {valueStatusShowOrHiddenPay ? (
                    <TouchableOpacity
                      style={Styles.btnPay}
                      onPress={() => {
                        setKeyToPass("pay");
                        setIsVisiblePay(!isVisiblePay);
                      }}>
                      <Svgs.ic_pay_hand
                        width={scaleWidth(17)}
                        height={scaleHeight(17)}
                      />
                      <Text
                        tx="debtScreen.pay"
                        style={{
                          color: colors.white,
                          fontSize: fontSize.size10,
                        }}></Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={Styles.flexRow}
                      onPress={() => {
                        setIsVisible(!isVisible);
                      }}>
                      <Text tx="debtScreen.exChange" style={Styles.label} />
                      <View style={{ flexDirection: "row" }}>
                        <Svgs.ic_messenger />
                        <Text
                          style={[
                            Styles.styleOrder,
                            {
                              color: colors.palette.navyBlue,
                              marginHorizontal: 4,
                            },
                          ]}>
                          {item.exchange}
                        </Text>
                        <Text
                          style={[
                            Styles.styleOrder,
                            { color: colors.palette.radicalRed },
                          ]}>
                          (2 Chưa xem)
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={() => isLoadingMore && <ActivityIndicator />}
      />

      {valueStatusShowOrHiddenPay ? (
        <View
          style={{
            backgroundColor: colors.palette.white,
            paddingHorizontal: scaleWidth(16),
            paddingVertical: scaleWidth(20),
          }}>
          <TouchableOpacity
            style={[
              Styles.btnPay,
              { padding: scaleWidth(12), borderRadius: scaleWidth(8) },
            ]}
            onPress={() => {
              setKeyToPass("PayTotal");
              setIsVisiblePay(!isVisiblePay);
            }}>
            <Svgs.ic_pay_hand
              width={scaleWidth(24)}
              height={scaleHeight(24)}
            />
            <Text
              tx="debtScreen.payTotal"
              style={{ color: colors.white, fontSize: fontSize.size14 }}></Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <ModalExchange
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(!isVisible)}
      />

      <ModalPay
        isVisible={isVisiblePay}
        setIsVisible={() => setIsVisiblePay(!isVisiblePay)}
        keyToPass={keyToPass}
      />

      <CustomCalendar
        isReset={() => {
          setIsReset(!isReset);
        }}
        handleShort={() => {
          setMakeDateE(timeEnd);
          setMakeDateS(timeStart);
          toggleModalDate();
        }}
        onMarkedDatesChangeS={(markedDatesS: React.SetStateAction<string>) => {
          console.log("markedDatesS------", markedDatesS);
          setTimeStart(markedDatesS);
        }}
        onMarkedDatesChangeE={(markedDatesE: React.SetStateAction<string>) => {
          console.log("markedDatesE------", markedDatesE);
          setTimeEnd(markedDatesE);
        }}
        isShowTabs={true}
        isSortByDate={isSortByDate}
        toggleModalDate={toggleModalDate}
      />
    </View>
  );
});
