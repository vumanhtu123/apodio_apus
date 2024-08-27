/* eslint-disable react-native/no-inline-styles */
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { observer, useLocalObservable, useLocalStore } from "mobx-react-lite";
import {
  Dimensions,
  Image,
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
  RefreshControl,
} from "react-native";
import { styles } from "./styles";

import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BottomParamList,
  TabScreenProps,
} from "../../../navigators/bottom-navigation";
import { NavigatorParamList, navigate } from "../../../navigators";
import { Svgs } from "../../../../../assets/svgs";
import { Header } from "../../../../components/header/header";
import moment from "moment";
import { Text } from '../../../../components/text/text';
import CustomCalendar from '../../../../components/calendar';
import ItemOrder from '../components/item-order';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useStores } from '../../../models';
import { formatCurrency } from '../../../utils/validate';
import { formatDateTime } from '../../../utils/formatDate';
import { Calendar } from "react-native-calendars";

export const OrderScreen: FC<TabScreenProps<"orders">> = observer(
  function OrderScreen(props) {
    // Pull in one of our MST stores
    // const refCarousel = useRef(null)
    const route = useRoute();
    // const isReload = route?.params?.isReload
    const { orderStore } = useStores();
    const [data, setData] = useState([]);
    const [arrData, setArrData] = useState<any>([]);
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    // const [selectedStatus, setSelectedStatus] = useState(0)
    const [isSortByDate, setIsSortByDate] = useState<boolean>(false);
    const today = new Date();
    // const sevenDaysBefore = new Date(today)
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      1
    );
    const lastDayOfMonth = new Date(firstDayOfNextMonth - 1);

    const [markedDatesS, setMarkedDatesS] = useState<any>(firstDayOfMonth);
    const [markedDatesE, setMarkedDatesE] = useState<any>(lastDayOfMonth);
    // oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
    const [isReset, setIReset] = useState<boolean>(false);
    const markedDatesSRef = useRef("");
    const markedDatesERef = useRef("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const handleOpenSearch = () => {
      setOpenSearch(!openSearch);
    };
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSearchValueChange = (text: string) => {
      const newValue = text !== null ? text.toString() : "";
      setSearchValue(newValue);
    };
    markedDatesSRef.current = markedDatesS
      ? markedDatesS
      : firstDayOfMonth.toString();
    markedDatesERef.current = markedDatesE ? markedDatesE : today.toString();
    // useEffect(() => {
    //   setMarkedDatesS(oneMonthBefore);
    //   setMarkedDatesE(today);
    // }, []);
    const navigation = useNavigation();
    const paddingTop = useSafeAreaInsets().top;
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedIndexStatus, setSelectedIndexStatus] = useState(0);
    const [totalPages, setTotalPages] = useState<any>(0);
    const selectStatus = [{ status: '', textStatus: 'Tất cả' },
    // { status: 'SENT', textStatus: 'Chờ xác nhận' },
    { status: 'SALE', textStatus: 'Đang thực hiện' },
    { status: 'DONE', textStatus: 'Hoàn thành' },
    { status: 'CANCEL', textStatus: 'Hủy đơn' },
    ]
    const flatListRef = useRef<FlatList>(null);
    const [page, setPage] = useState(0);
    useEffect(() => {
      getListOrder()
    }, [])
    useEffect(() => {
      console.log("---------useEffect---------reload------------------");
      const unsubscribe = navigation.addListener('focus', () => {
        if (orderStore.isReload === true) {
          if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
          }
          console.log("---------useEffect---------reload--------------xcxcx----");
          // setArrData([])
          getListOrder()
          orderStore.setIsReload(false)
        }
      });
      return unsubscribe;
    }, [navigation]);
    useEffect(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
      }
    }, [selectedStatus, markedDatesS, navigation])
    useEffect(() => {
      getListOrder(searchValue)
    }, [selectedStatus, page, markedDatesS, markedDatesE])
    // useEffect (()=>{
    //   console.log('firstzzz' , page)
    // },[page])
    const getListOrder = async (searchValue?: any,) => {
      setIsLoading(true);
      try {
        console.log('markedDatesSsssss', markedDatesS)
        console.log('markedDatesEzzzssss', markedDatesE)
        const formattedMarkedDatesS = markedDatesS
          ? moment.utc(markedDatesS).set({ hour: 0, minute: 1, second: 0, millisecond: 0 }).toISOString()
          : null;
        const formattedMarkedDatesE = markedDatesE
          ? moment.utc(markedDatesE).set({ hour: 23, minute: 59, second: 59, millisecond: 0 }).toISOString()
          : null;
        const response = await orderStore.getListOrder(
          page,
          20,
          selectedStatus,
          searchValue,
          formattedMarkedDatesS,
          formattedMarkedDatesE
        );
        // console.log('firstxxxxxxxxxx', response)
        if (response && response.kind === "ok") {
          setTotalPages(response.response.data.totalPages)
          console.log('orderLisst', JSON.stringify(response.response.data.content))
          if (page == 0) {
            setArrData(response.response.data.content)
          } else {
            setArrData((prevProducts: any) => [
              ...prevProducts,
              ...response.response.data.content,
            ]);
          }
        } else {
          console.error("Failed to fetch order:", response);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const toggleModalDate = () => {
      setIsSortByDate(!isSortByDate);
    };
    const handleDetailOrder = (id: number) => {
      orderStore.setOrderId(id);
      console.log("first", orderStore.orderId);
      navigation.navigate("orderDetails" as never);
    };
    function getOrderStateText(state: string) {
      if (state === "SENT") {
        return "orderDetailScreen.sent";
      } else if (state === "SALE") {
        return "orderDetailScreen.sale";
      } else if (state === "DONE") {
        return "orderDetailScreen.done";
      } else if (state === "CANCEL") {
        return "orderDetailScreen.cancel";
      } else {
        return "";
      }
    }
    function getInvoiceStateText(state: string) {
      if (state === 'NOT_PAYMENT') {
        return 'orderDetailScreen.no';
      } else if (state === 'REVERSE') {
        return 'orderDetailScreen.toInvoice';
      } else if (state === 'PARTIAL_PAYMENT') {
        return 'orderDetailScreen.partialInvoice';
      } else if (state === 'PAID') {
        return 'orderDetailScreen.invoiced';
      } else {
        return '';
      }
    }
    const onSelectStatus = (index: any) => {
      setSelectedIndexStatus(index);
      const status = selectStatus[index].status;
      setSelectedStatus(status);
      setPage(0)
    };

    const handleEndReached = () => {
      if (!isRefreshing && page < totalPages - 1) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    const refreshOrder = async () => {
      setIsRefreshing(true);
      setPage(0)
      setMarkedDatesS(firstDayOfMonth);
      setMarkedDatesE(lastDayOfMonth);
      setSelectedStatus('')
      setSelectedIndexStatus(0)
      setSearchValue('')
      setOpenSearch(false)
      setArrData([])
      await getListOrder();
      setIsRefreshing(false);
    };
    const handleSubmitSearch = async () => {
      setArrData([])
      await getListOrder(searchValue);
    };
    return (
      <View style={styles.ROOT}>
        <Header
          headerTx={"detailScreen.orders"}
          type={"AntDesign"}
          style={styles.header}
          titleStyle={styles.textHeader}
          // LeftIcon={Images.back}
          // onLeftPress={() => navigation.goBack()}
          RightIcon={Svgs.ic_calender_white}
          RightIcon1={openSearch ? Svgs.icon_close : Svgs.search}
          headerInput={openSearch}
          onRightPress={toggleModalDate}
          onRightPress1={handleOpenSearch}
          searchValue={searchValue}
          handleOnSubmitSearch={handleSubmitSearch}
          onSearchValueChange={handleSearchValueChange}
          rightText1={moment(markedDatesS === "" ? firstDayOfMonth : markedDatesS).format("DD/MM/YYYY") + " - " + moment(markedDatesE === "" ? '' : markedDatesE).format("DD/MM/YYYY")}
        />
        <View style={styles.viewSelect}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{ marginLeft: scaleHeight(16), flexDirection: "row" }}>
              {selectStatus.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onSelectStatus(index)}
                    style={[
                      styles.viewItemSelect,
                      {
                        backgroundColor:
                          selectedIndexStatus === index
                            ? colors.palette.aliceBlue2
                            : colors.palette.whiteSmoke,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.textSelect,
                        {
                          color:
                            selectedIndexStatus === index
                              ? colors.palette.navyBlue
                              : colors.palette.nero,
                        },
                      ]}>
                      {item.textStatus}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View style={{ height: 1, marginVertical: 0 }}></View>

        <FlatList
          data={arrData}
          style={styles.styleFlatlist}
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          // keyExtractor={(item, index) => 'key'+index}
          // keyExtractor={(item) => item.id}
          keyExtractor={(item: any, index: any) => index.toString() + item.id}
          onEndReached={handleEndReached}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshOrder}
              title="ok"
            />
          }
          renderItem={({ item, index }) => (
            <ItemOrder
              onPress={() => handleDetailOrder(item.id)}
              name={item.partner?.name}
              time={formatDateTime(item.quoteCreationDate)}
              code={item.code}
              status={getOrderStateText(item.state)}
              amount={item.quantity}
              discount={item.amountDiscount}
              payStatus={getInvoiceStateText(item.paymentStatus)}
              // weight={item.weight}
              totalAmount={item.amountTotal}
              totalTax={item.amountTax}
              // money={formatCurrency(calculateTotalPrice(item))}
              money={item.amountTotalUnDiscount}
              styleViewStatus={{
                backgroundColor:
                  item.state === "SALE"
                    ? colors.palette.solitude
                    : item.state === "SENT"
                      ? colors.palette.floralWhite
                      : item.state === "CANCEL"
                        ? colors.palette.amour
                        : item.state === "DONE"
                          ? colors.palette.mintCream
                          : "",
                justifyContent: "center",
                
              }}
              styleTextStatus={{
                color:
                  item.state === "SALE"
                    ? colors.palette.metallicBlue
                    : item.state === "SENT"
                      ? colors.palette.yellow
                      : item.state === "CANCEL"
                        ? colors.palette.radicalRed
                        : item.state === "DONE"
                          ? colors.palette.malachite
                          : "",
              }}
              styleTextPayStatus={{
                color: item.paymentStatus === 'NOT_PAYMENT' ? colors.palette.darkTangerine :
                  item.paymentStatus === 'PARTIAL_PAYMENT' ? colors.palette.malachite :
                    item.paymentStatus === 'PAID' ? colors.palette.malachite :
                      ''
              }}
            />
          )}
        />
        {/* ) : <Text> Ko co don hoan thanh</Text>} */}
        <CustomCalendar
          isReset={isReset}
          handleReset={() => setIReset(!isReset)}
          handleShort={() => {
            // handleOrderMerchant()
            if (timeEnd == '') {
              setMarkedDatesE(timeStart);
            } else {
              setMarkedDatesE(timeEnd);
            }
            setMarkedDatesS(timeStart);
            setArrData([])
            toggleModalDate();
            // getListOrder(searchValue);
          }}
          onMarkedDatesChangeS={(
            markedDatesS: React.SetStateAction<string>
          ) => {
            console.log("markedDatesS------", markedDatesS);
            setTimeStart(markedDatesS);
          }}
          dateS={moment(markedDatesS).format('YYYY-MM-DD')}
          dateE={moment(markedDatesE).format('YYYY-MM-DD')}
          onMarkedDatesChangeE={(
            markedDatesE: React.SetStateAction<string>
          ) => {
            console.log("markedDatesE------", markedDatesE);
            console.log("markedDatesSSSS------", markedDatesS);
            // if (markedDatesE === '') {
            //   setTimeEnd(markedDatesS);
            // } else {
            setTimeEnd(markedDatesE);
            // }
          }}
          isShowTabs={true}
          isSortByDate={isSortByDate}
          isOneDate={false}
          toggleModalDate={toggleModalDate}
        />
        
        <TouchableOpacity
          onPress={() => {
            orderStore.reset();
            navigation.navigate("newOrder" as never);
          }}
          style={styles.btnShowModal}>
          <Svgs.icon_addOrder />
        </TouchableOpacity>
      </View>
    );
  }
);
