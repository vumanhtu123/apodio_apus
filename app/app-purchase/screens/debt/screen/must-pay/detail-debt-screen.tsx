import { StackScreenProps } from "@react-navigation/stack";
import { FC, useCallback, useEffect, useRef, useState } from "react";
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
import { translate } from "../../../../../i18n";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useStores } from "../../../../models";
import { commasToDots, formatCurrency, formatVND } from "../../../../utils/validate";
import { number } from "mobx-state-tree/dist/internal";
import { convertToOffsetDateTime } from "../../../../utils/formatDate";


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
  const [makeDateS, setMakeDateS] = useState<any>(moment().startOf('month').format('YYYY-MM-DD HH:mm:ss'));
  const [makeDateE, setMakeDateE] = useState<any>(moment().endOf('month').format('YYYY-MM-DD HH:mm:ss'));
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [isSortByDate, setIsSortByDate] = useState<boolean>(false);
  const [isVisiblePay, setIsVisiblePay] = useState<boolean>(false);
  const route = useRoute();
  const getApi = useStores();
  const [dataDebtHead, setDataDebtHead] = useState<{}[]>([])
  const [myDataListDetailDebt, setMyDataListDetailDebt] = useState<{}[]>([])
  const page = useRef(0)
  const totalPage = useRef(0)
  const totalElement = useRef(0)
  const checkStatusLoadMore = useRef<boolean>(false)
  const size = useRef(5)
  const valueDebt = useRef<number>(0)


  const idSend = route.params.idSend

  console.log("idDoandev", idSend);



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

  // const groupBy = (data: DataItem[], key: string) => {
  //   return data.reduce((result: { [key: string]: DataItem[] }, item: any) => {
  //     const value = item[key];
  //     if (!result[value]) {
  //       result[value] = [];
  //     }
  //     result[value].push(item);
  //     return result;
  //   }, {});
  // };
  // const dataGroup = groupBy(fakeData, "createDateTransaction");
  // console.log("====================================");
  // console.log("data groupBy", groupBy(fakeData, "createDateTransaction"));
  // console.log("====================================");




  console.log(
    "data date start ,end",
    moment(makeDateE).format("DD/MM/YYYY"),
    makeDateE
  );

  const getDataDebt = async (idSend: number) => {
    const DataDebt = await getApi.debtStore.getDataDebtDetail(idSend, "EXTERNAL")
    // console.log('====================================');
    // console.log("doanDev", DataDebt?.data?.data);
    // console.log('====================================');
    if (DataDebt?.data?.data != null) {
      setDataDebtHead(DataDebt?.data?.data)
    }

  }

  const getListDetailDebt = async () => {
    console.log("date doandev22222", timeStart, timeEnd);


    const dateStart = convertToOffsetDateTime(makeDateS)
    const dateEnd = convertToOffsetDateTime(makeDateE)
    console.log("date doandev", dateStart, dateEnd);


    const getData = await getApi.debtStore.getListDebtDetail(size.current, page.current, idSend, "EXTERNAL", dateStart == "Invalid date" ? null : dateStart, dateEnd == "Invalid date" ? null : dateEnd, true, null, checkStatusLoadMore.current)
    console.log('====================================');
    console.log("My data Debt", getData?.data?.data?.content);
    console.log('====================================');
    if (getData?.data != null) {
      if (page.current == 0) {
        setMyDataListDetailDebt(getData?.data?.data?.content)

      } else {
        setMyDataListDetailDebt((data) => [
          ...data,
          ...getData?.data?.data?.content
        ])
      }

      // console.log('TotalElement doandev', getData?.data?.data?.totalElements, getData?.data?.data.totalPages);
      totalPage.current = Number(getData?.data?.data?.totalPages)
      totalElement.current = Number(getData?.data?.data?.totalElements)
    }
  }


  const handleRefresh = () => {
    setRefreshing(true);
    checkStatusLoadMore.current = false
    page.current = 0
    getListDetailDebt()
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || page.current >= totalPage.current) {
      return;
    }

    checkStatusLoadMore.current = true;
    setIsLoadingMore(true);

    page.current += 1;
    getListDetailDebt()
      .then(() => {
        if (myDataListDetailDebt?.length >= totalElement.current) {
          setIsLoadingMore(false);
        }
      })
      .catch((error) => {
        console.error("Error loading more data:", error);
        setIsLoadingMore(false);
      })
      .finally(() => {
        checkStatusLoadMore.current = false;
      });
  }, [isLoadingMore, myDataListDetailDebt?.length, getListDetailDebt]);

  // const getValuePayDebt = async (orderId: number, moveType: string) => {
  //   try {

  //     const [result] = await Promise.all([
  //       getApi.debtStore.getValueDebtPay(orderId, moveType),
  //       new Promise(resolve => setTimeout(resolve, 1000))
  //     ]);
  //     console.log('doan dev get value pay', result?.data.data);
  //     valueDebt.current = result?.data?.data
  //   } catch (error) {
  //     console.error(error);
  //   }

  // }
  const getValuePayDebt = async (orderId: number, moveType: string) => {
    try {
      const result = await getApi.debtStore.getValueDebtPay(orderId, moveType);

      console.log('doan dev get value pay', result?.data?.data);

      valueDebt.current = result?.data?.data
      setIsVisiblePay(!isVisiblePay);

    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    setIsLoadingMore(false)
  }, [myDataListDetailDebt?.length])

  useEffect(() => {
    getDataDebt(idSend)
    getListDetailDebt()
  }, [])

  useEffect(() => {
    getListDetailDebt()

  }, [makeDateS, makeDateE])

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
        // headerInput={true}
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
              ]}>{formatVND(formatCurrency(commasToDots(dataDebtHead?.debtAmount)))}</Text>
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
              {dataDebtHead?.nearestDueDate}
            </Text>
            <Text style={{ fontSize: 12 }} tx="debtScreen.paymentTerm"></Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={{ marginTop: scaleHeight(60) }}
        data={
          //  Object.entries(dataGroup)
          myDataListDetailDebt
        }
        showsVerticalScrollIndicator={false}
        keyExtractor={
          //  ([createDateTransaction]) => createDateTransaction
          (item: any) => item?.code
        }
        renderItem={(
          // item: [createDateTransaction, products] 
          { item }: any
        ) => {
          return (
            <View style={[Styles.groupContainer]}>
              <TouchableOpacity
                key={item?.code}
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
                  <Text tx="debtScreen.orderDate" style={Styles.label} />
                  <Text style={Styles.styleOrder}>{moment(item?.orderDate).format("DD/MM/YYYY")}</Text>
                </View>
                <View
                  style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                  <Text tx="debtScreen.order" style={Styles.label} />
                  <Text style={Styles.styleOrder}>{item?.code}</Text>
                </View>

                <View
                  style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                  <Text tx="debtScreen.valueOrder" style={Styles.label} />
                  <Text
                    style={[
                      Styles.styleOrder,
                      { color: colors.palette.malachite },
                    ]}>
                    {item?.amountTotal}
                  </Text>
                </View>
                <View
                  style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                  <Text tx={item?.moveType == "IN_INVOICE" ? "debtScreen.valueWarehouse" : "debtScreen.exValueWarehouse"} style={Styles.label} />
                  <Text
                    style={[
                      Styles.styleOrder,
                      { color: colors.palette.malachite },
                    ]}>
                    {item?.amountWarehouse}
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
                    {item?.amountPayment}
                  </Text>
                </View>
                <View
                  style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                  <Text tx="debtScreen.dateOfPayment" style={Styles.label} />
                  <Text style={[Styles.styleOrder]}>
                    {item?.paymentDate}
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
                    {item?.debtAmount}
                  </Text>
                </View>

                <View
                  style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                  <Text tx="debtScreen.paymentTerm2" style={Styles.label} />
                  <Text style={[Styles.styleOrder]}>{item?.dueDate}</Text>
                </View>
                {valueStatusShowOrHiddenPay ? (
                  <TouchableOpacity
                    style={[Styles.btnPay]}
                    onPress={() => {
                      console.log("onClick pay");
                      setKeyToPass("pay");
                      getValuePayDebt(item?.orderId, item?.moveType)

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
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
        // initialNumToRender={5}
        // maxToRenderPerBatch={5}
        ListFooterComponent={() => <View>{isLoadingMore == true ? <ActivityIndicator /> : null}</View>}
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
        valueDebt={valueDebt.current}
      />

      <CustomCalendar
        isReset={() => {
          setIsReset(!isReset);
        }}

        handleShort={() => {
          setMakeDateE(timeEnd);
          setMakeDateS(timeStart);
          page.current = 0
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
