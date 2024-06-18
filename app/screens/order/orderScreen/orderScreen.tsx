/* eslint-disable react-native/no-inline-styles */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { observer, useLocalObservable, useLocalStore } from 'mobx-react-lite';
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
} from 'react-native';
import { styles } from './styles';

import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomParamList,
  TabScreenProps,
} from '../../../navigators/bottom-navigation';
import { NavigatorParamList, navigate } from "../../../navigators"
import { Images } from '../../../../assets/index';
import { Header } from '../../../components/header/header';
import moment from "moment";
import { Text } from '../../../components/text/text';
import CustomCalendar from '../../../components/calendar';
import ItemOrder from '../components/item-order';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../../../models';
import { formatCurrency } from '../../../utils/validate';
import { formatDateTime } from '../../../utils/formatDate';

export const OrderScreen: FC<TabScreenProps<'orders'>> = observer(
  function OrderScreen(props) {
    // Pull in one of our MST stores
    // const refCarousel = useRef(null)
    const { orderStore } = useStores();
    const [data, setData] = useState([])
    const [arrData, setArrData] = useState<any>([])
    const [markedDatesS, setMarkedDatesS] = useState("")
    const [timeStart, setTimeStart] = useState("")
    const [timeEnd, setTimeEnd] = useState("")
    const [markedDatesE, setMarkedDatesE] = useState("")
    // const [selectedStatus, setSelectedStatus] = useState(0)
    const [isSortByDate, setIsSortByDate] = useState<boolean>(false)
    const today = new Date()
    // const sevenDaysBefore = new Date(today)
    const oneMonthBefore = new Date();
    oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);
    const [isReset, setIReset] = useState<boolean>(false)
    const markedDatesSRef = useRef('');
    const markedDatesERef = useRef('');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const handleOpenSearch = () => {
      setOpenSearch(!openSearch);
    };
    const [searchValue, setSearchValue] = useState("");
    const handleSearchValueChange = (text: string) => {
      const newValue = text !== null ? text.toString() : "";
      setSearchValue(newValue);
    };
    markedDatesSRef.current = markedDatesS ? markedDatesS : oneMonthBefore.toString();
    markedDatesERef.current = markedDatesE ? markedDatesE : today.toString();
    useEffect(() => {
      setMarkedDatesS(markedDatesSRef.current);
      setMarkedDatesE(markedDatesERef.current);
    }, []);
    const navigation = useNavigation()
    const paddingTop = useSafeAreaInsets().top;
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedIndexStatus, setSelectedIndexStatus] = useState(0);
    const selectStatus = [{ status: '', textStatus: 'Tất cả' },
    { status: 'SENT', textStatus: 'Chờ xác nhận' },
    { status: 'SALE', textStatus: 'Đang thực hiện' },
    { status: 'DONE', textStatus: 'Hoàn thành' },
    { status: 'CANCEL', textStatus: 'Hủy đơn' },
    ]
    // useEffect(() => {
    //   getListOrder()
    // }, [])
  
    useEffect(() => {
      console.log("---------useEffect---------reload------------------");
      const unsubscribe = navigation.addListener('focus', () => {
        getListOrder()
      });
      return unsubscribe;
    }, [navigation])
    useEffect(() => {
      getListOrder()
    }, [selectedStatus])
    const getListOrder = async (searchValue?: any) => {
      try {
        const response = await orderStore.getListOrder(
          0,
          50,
          selectedStatus,
          searchValue
        );
        // console.log('firstxxxxxxxxxx', response)
        if (response && response.kind === "ok") {
          console.log('orderLisst', JSON.stringify(response.response.data.content))
          setArrData(response.response.data.content)
        } else {
          console.error("Failed to fetch order:", response);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    // const { newOderStore } = useStores()
    const handleOrderMerchant = async () => {
      // const res = await newOderStore.getOrderMerchant(
      //   moment(markedDatesS ? markedDatesS : sevenDaysBefore).format("YYYY-MM-DD"),
      //   moment(markedDatesE ? markedDatesE : today).format("YYYY-MM-DD"),
      // )
      // setData(res.response.data.content)
    }


    const toggleModalDate = () => {
      setIsSortByDate(!isSortByDate)
    }
    const handleDetailOrder = (id: number) => {
      orderStore.setOrderId(id)
      console.log('first', orderStore.orderId)
      navigation.navigate('orderDetails' as never)
    }
    function getOrderStateText(state: string) {
      if (state === 'SENT') {
        return 'orderDetailScreen.sent';
      } else if (state === 'SALE') {
        return 'orderDetailScreen.sale';
      } else if (state === 'DONE') {
        return 'orderDetailScreen.done';
      } else if (state === 'CANCEL') {
        return 'orderDetailScreen.cancel';
      } else {
        return '';
      }
    }
    function getInvoiceStateText(state: string) {
      if (state === 'NO') {
        return 'orderDetailScreen.no';
      } else if (state === 'TO_INVOICE') {
        return 'orderDetailScreen.toInvoice';
      } else if (state === 'PARTIAL_INVOICE') {
        return 'orderDetailScreen.partialInvoice';
      } else if (state === 'INVOICED') {
        return 'orderDetailScreen.invoiced';
      } else {
        return '';
      }
    }
    const onSelectStatus = (index: any) => {
      setSelectedIndexStatus(index);
      const status = selectStatus[index].status;
      setSelectedStatus(status);
    };
    const refreshOrder = async () => {
      // setIsRefreshing(true);
      setSearchValue('')
      setOpenSearch(false)
      setArrData([])
      await getListOrder();
      // setIsRefreshing(false);
    };
    const handleSubmitSearch = () => {
      // setPage(0);
      getListOrder(searchValue);
    };
    const calculateTotalPrice = (itemPrice: any) => {
      let totalPrice = 0;
      itemPrice.computeTaxInfo?.taxLines?.forEach((item: any) => {
        totalPrice += item.untaxedAmount || 0;
      });
      return totalPrice;
    };
    return (
      <View style={styles.ROOT}>
        <Header headerTx={'dashboard.orders'}
          type={"AntDesign"}
          style={styles.header}
          titleStyle={styles.textHeader}
          RightIcon={Images.ic_calender_white}
          RightIcon1={openSearch ? Images.icon_close : Images.search}
          headerInput={openSearch}
          onRightPress={toggleModalDate}
          onRightPress1={handleOpenSearch}
          searchValue={searchValue}
          handleOnSubmitSearch={handleSubmitSearch}
          onSearchValueChange={handleSearchValueChange}

          rightText1={moment(markedDatesS === "" ? oneMonthBefore : markedDatesS).format("DD/MM/YYYY") + "- " + moment(markedDatesE === "" ? new Date() : markedDatesE).format("DD/MM/YYYY")}
        />
        <View style={styles.viewSelect}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
            <View style={{ marginLeft: scaleHeight(16), flexDirection: 'row' }}>
              {selectStatus.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onSelectStatus(index)}
                    style={[
                      styles.viewItemSelect,
                      {
                        backgroundColor: selectedIndexStatus === index
                          ? colors.palette.aliceBlue2
                          : colors.palette.whiteSmoke,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textSelect,
                        {
                          color: selectedIndexStatus === index
                            ? colors.palette.navyBlue
                            : colors.palette.nero,
                        },
                      ]}
                    >
                      {item.textStatus}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </ScrollView>
        </View>
        <View style={{ height: 1, marginVertical: 0 }}></View>
        {/* <View style={styles.boxTimeSelect}>
          <Text style={styles.textTime}>
            {moment(markedDatesS === "" ? sevenDaysBefore : markedDatesS).format("MMMM DD, YYYY")} -{" "}
            {moment(markedDatesE === "" ? new Date() : markedDatesE).format("MMMM DD, YYYY")}
          </Text>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => {
              toggleModalDate()
            }}
          >
            <Images.icon_calendar />
          </TouchableOpacity>
        </View> */}
        {/* {(arrData && arrData.length > 0) ? ( */}
        <FlatList
          data={arrData}
          style={styles.styleFlatlist}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshOrder}
              title="ok"
            />
          }
          renderItem={({ item }) => (
            <ItemOrder
              onPress={() => handleDetailOrder(item.id)}
              name={item.partner?.name}
              time={formatDateTime(item.quoteCreationDate)}
              code={item.code}
              status={getOrderStateText(item.state)}
              amount={item.quantity}
              discount={formatCurrency(item.amountDiscount)}
              payStatus={getInvoiceStateText(item.invoiceStatus)}
              // weight={item.weight}
              totalAmount={formatCurrency(item.amountTotal)}
              totalTax={formatCurrency(item.amountTax)}
              money={formatCurrency(calculateTotalPrice(item))}
              styleViewStatus={{
                backgroundColor: item.state === 'SALE' ? colors.palette.solitude
                  : item.state === 'SENT' ? colors.palette.floralWhite :
                    item.state === 'CANCEL' ? colors.palette.amour :
                      item.state === 'DONE' ? colors.palette.mintCream : '',
                justifyContent: 'center'
              }}
              styleTextStatus={{
                color: item.state === 'SALE' ? colors.palette.metallicBlue
                  : item.state === 'SENT' ? colors.palette.yellow :
                    item.state === 'CANCEL' ? colors.palette.radicalRed :
                      item.state === 'DONE' ? colors.palette.malachite : ''
              }}
              styleTextPayStatus={{
                color: item.invoiceStatus === 'NO' ? colors.palette.darkTangerine :
                  item.invoiceStatus === 'PARTIAL_INVOICE' ? colors.palette.darkTangerine :
                    item.invoiceStatus === 'TO_INVOICE' ? colors.palette.darkTangerine :
                      colors.palette.malachite
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
            setMarkedDatesE(timeEnd)
            setMarkedDatesS(timeStart)
            toggleModalDate()
          }}
          onMarkedDatesChangeS={(markedDatesS: React.SetStateAction<string>) => {
            console.log('markedDatesS------', markedDatesS)
            setTimeStart(markedDatesS)
          }}
          onMarkedDatesChangeE={(markedDatesE: React.SetStateAction<string>) => {
            console.log('markedDatesE------', markedDatesE)
            setTimeEnd(markedDatesE)
          }}

          isShowTabs={true}
          isSortByDate={isSortByDate}
          isOneDate={false}
          toggleModalDate={toggleModalDate}
        />
        <TouchableOpacity onPress={() => {
          //navigate("newOrder")
          navigation.navigate('newOrder' as any)
        }}
          style={styles.btnShowModal}>
          <Images.icon_addOrder />
        </TouchableOpacity>
      </View>
    );
  },
);
