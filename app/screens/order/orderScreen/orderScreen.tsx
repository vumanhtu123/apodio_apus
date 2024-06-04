/* eslint-disable react-native/no-inline-styles */
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { observer, useLocalStore } from 'mobx-react-lite';
import {
  Dimensions,
  Image,
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { styles } from './styles';

import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomParamList,
  TabScreenProps,
} from '../../../navigators/bottom-navigation';
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
    const [isShow, setIsShow] = useState(false);
    const [markedDatesS, setMarkedDatesS] = useState("")
    const [markedDatesE, setMarkedDatesE] = useState("")
    const [selectedStatus, setSelectedStatus] = useState(0)
    const [isSortByDate, setIsSortByDate] = useState<boolean>(false)
    const today = new Date()
    const sevenDaysBefore = new Date(today)
    const [isReset, setIReset] = useState<boolean>(false)
    const markedDatesSRef = useRef('');
    const markedDatesERef = useRef('');
    markedDatesSRef.current = markedDatesS ? markedDatesS : sevenDaysBefore.toString();
    markedDatesERef.current = markedDatesE ? markedDatesE : today.toString();

    // const [activeSlide, setactiveSlide] = useState(0)
    // const { accountStore, promotionStore, notifitionStoreModel } = useStores()
    // const { userId } = accountStore
    // const [arrPromotions, setarrPromotions] = useState(null)
    // const [arrBanner, setarrBanner] = useState(null)
    // const [showImagePicker, setShowImagePicker] = useState(false)
    // const [countNoti, setCountNoti] = useState(0)
    // const [imageAVT, setImageAVT] = useState(undefined)
    const navigation = useNavigation()
    const paddingTop = useSafeAreaInsets().top;
    // let bankAccount
    // let amount
    useEffect(() => {
      store.onLoad()
    }, [])

    const selectStatus = [{ status: 'Tất cả', textStatus: 'Tất cả' },
    { status: 'Đã gửi YC', textStatus: 'Chờ xác nhận' },
    { status: 'Đang xử lý', textStatus: 'Đang xử lý' },
    { status: 'Đang vận chuyển', textStatus: 'Đang vận chuyển' },
    { status: 'Đã giao', textStatus: 'Hoàn thành' },
    { status: 'Hủy đơn', textStatus: 'Hủy đơn' },
    ]
    useEffect(() => {
      getListOrder()
    }, [])
    const getListOrder = async () => {
      try {
        const response = await orderStore.getListOrder(
          0,
          50,
        );
        if (response && response.kind === "ok") {
          // console.log('orderLisst', data[0].code)
          setArrData(response.response.data.content)
        } else {
          console.error("Failed to fetch order:", response);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    const arrPromotions: Array<{}> = [
      {
        id: 1,
        name: 'Nguyen Ha Dung',
        time: '13:56 01/03',
        code: 'Dh_21090930',
        status: 'Đã gửi YC',
        money: '89.000.000',
        discount: '5.000.000',
        totalAmount: '84.000.000',
        weight: '37kg',
        payStatus: 'Thanh toán một phần ',
        amount: "7",
        totalTax: "5000000",
      },
      {
        id: 2,
        name: 'Nguyen Ha Dung',
        time: '13:56 01/03',
        code: 'Dh_21090930',
        status: 'Đang xử lý',
        money: '89.000.000',
        discount: '5.000.000',
        totalAmount: '84.000.000',
        weight: '37kg',
        payStatus: 'Chưa thanh toán',
        amount: "7",
        totalTax: "5000000",
      },
      {
        id: 3,
        name: 'Nguyen Ha Dung',
        time: '13:56 01/03',
        code: 'Dh_21090930',
        status: 'Hủy đơn',
        money: '89.000.000',
        discount: '5.000.000',
        totalAmount: '84.000.000',
        weight: '37kg',
        payStatus: 'Đã thanh toán',
        amount: "7",
        totalTax: "5000000",
      },
      {
        id: 4,
        name: 'Nguyen Ha Dung',
        time: '13:56 01/03',
        code: 'Dh_21090930',
        status: 'Chờ lấy hàng',
        money: '89.000.000',
        discount: '5.000.000',
        totalAmount: '84.000.000',
        weight: '37kg',
        payStatus: 'Chưa thanh toán',
        amount: "7",
        totalTax: "5000000",
      },
      {
        id: 5,
        name: 'Nguyen Ha Dung',
        time: '13:56 01/03',
        code: 'Dh_21090930',
        status: 'Đã giao',
        money: '89.000.000',
        discount: '5.000.000',
        totalAmount: '84.000.000',
        weight: '37kg',
        payStatus: 'Đã thanh toán',
        amount: "7",
        totalTax: "5000000",
      },
      {
        id: 6,
        name: 'Nguyen Ha Dung 6',
        time: '13:56 01/03',
        code: 'Dh_21090930',
        status: 'Đang vận chuyển',
        money: '89.000.000',
        discount: '5.000.000',
        totalAmount: '84.000.000',
        weight: '37kg',
        payStatus: 'Chưa thanh toán',
        amount: "7",
        totalTax: "5000000",
      },
      {
        id: 7,
        name: 'Nguyen Ha Dung 7',
        time: '13:56 01/03',
        code: 'Dh_21090930',
        status: 'Đang xử lý',
        money: '89.000.000',
        discount: '5.000.000',
        totalAmount: '84.000.000',
        weight: '37kg',
        payStatus: 'Đã thanh toán',
        amount: "7",
        totalTax: "5000000",
      },
      {
        id: 8,
        name: 'Nguyen Ha Dung 8',
        time: '13:56 01/03',
        code: 'Dh_21090930',
        status: 'Chờ lấy hàng',
        money: '89.000.000',
        discount: '5.000.000',
        totalAmount: '84.000.000',
        weight: '37kg',
        payStatus: 'Đã thanh toán',
        amount: "7",
        totalTax: "5000000",
      },
      {
        id: 9,
        name: 'Nguyen Ha Dung 9',
        time: '13:56 01/03',
        code: 'Dh_21090930',
        status: 'Đã giao',
        money: '89.000.000',
        discount: '5.000.000',
        totalAmount: '84.000.000',
        weight: '37kg',
        payStatus: 'Đã thanh toán',
        amount: "7",
        totalTax: "5000000",
      },
    ]

    // const { newOderStore } = useStores()

    const handleOrderMerchant = async () => {
      // const res = await newOderStore.getOrderMerchant(
      //   moment(markedDatesS ? markedDatesS : sevenDaysBefore).format("YYYY-MM-DD"),
      //   moment(markedDatesE ? markedDatesE : today).format("YYYY-MM-DD"),
      // )
      // setData(res.response.data.content)

    }
    const store = useLocalStore(() => ({
      selectedStatus: 0,
      arrData: arrData,
      selectStatus: [{ status: 'Tất cả', textStatus: 'Tất cả' },
      { status: 'Đã gửi YC', textStatus: 'Chờ xác nhận' },
      { status: 'Đang xử lý', textStatus: 'Đang xử lý' },
      { status: 'Đang vận chuyển', textStatus: 'Đang vận chuyển' },
      { status: 'Đã giao', textStatus: 'Hoàn thành' },
      { status: 'Hủy đơn', textStatus: 'Hủy đơn' },
      ],

      onLoad() {
        store.arrData = arrData
        // console.log('first', arrData)
      },
      onSelectStatus(index: any) {
        store.selectedStatus = index;
        var t = store.selectStatus[store.selectedStatus].status
        console.log(t)
        if (store.selectedStatus === 0) {
          store.arrData = arrPromotions
          console.log(8)
        } else {
          store.arrData = arrPromotions.filter((item) => {
            return item.status === t
          })
        }
      },
    }))

    const toggleModalDate = () => {
      setIsSortByDate(!isSortByDate)
    }
    

    return (
      <View style={styles.ROOT}>
        <Header headerTx={'dashboard.orders'}
          type={"AntDesign"}
          style={styles.header}
          titleStyle={styles.textHeader}
          RightIcon={Images.ic_calender_white}
          RightIcon1={Images.search}
          onRightPress={toggleModalDate}
          rightText1={moment(markedDatesS === "" ? sevenDaysBefore : markedDatesS).format("DD/MM/YYYY") + "- " + moment(markedDatesE === "" ? new Date() : markedDatesE).format("DD/MM/YYYY")}
        />
        <View style={styles.viewSelect}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
            {selectStatus.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => {
                  store.onSelectStatus(index)
                  console.log(index)
                  console.log(store.selectedStatus)
                  console.log(store.arrData)
                }}
                  key={index}
                  style={[styles.viewItemSelect, {
                    backgroundColor: store.selectedStatus === index ? colors.palette.aliceBlue2 : colors.palette.whiteSmoke,
                  }]}>
                  <Text text={item.textStatus} style={[styles.textSelect, {
                    color: store.selectedStatus === index ? colors.palette.navyBlue : colors.palette.nero,
                  }]}
                  />
                </TouchableOpacity>
              )
            })}
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
          renderItem={({ item }) => (
            <ItemOrder
              onPress={() => navigation.navigate('orderDetails', { data: item })}
              name={item.partner.name}
              time={formatDateTime(item.quoteCreationDate)}
              code={item.code}
              status={item.status}
              amount={item.amount}
              discount={item.discount}
              payStatus={item.payStatus}
              weight={item.weight}
              totalAmount={formatCurrency(item.totalPrice)}
              totalTax={item.totalTax}
              money={item.money}
              styleViewStatus={{
                backgroundColor: item.status === 'Đã xử lý' ? colors.palette.solitude
                  : item.status === 'Chờ xử lý' ? colors.palette.floralWhite : colors.palette.amour,
                justifyContent: 'center'
              }}
              styleTextStatus={{
                color: item.status === 'Đã xử lý' ? colors.palette.metallicBlue
                  : item.status === 'Chờ xử lý' ? colors.palette.yellow : colors.palette.radicalRed,
              }}
              styleTextPayStatus={{ color: item.payStatus === 'Đã thanh toán' ? colors.palette.malachite : colors.palette.darkTangerine }}
            />
          )}
        />
        {/* ) : <Text> Ko co don hoan thanh</Text>} */}
        <CustomCalendar
          isReset={isReset}
          handleReset={() => setIReset(!isReset)}
          handleShort={() => {
            handleOrderMerchant()
            toggleModalDate()
          }}
          onMarkedDatesChangeS={(markedDatesS) => {
            setMarkedDatesS(markedDatesS)
          }}
          onMarkedDatesChangeE={(markedDatesE) => {
            setMarkedDatesE(markedDatesE)
          }}
          isShowTabs={true}
          isSortByDate={isSortByDate}
          isOneDate={false}
          toggleModalDate={toggleModalDate}
        />
        <TouchableOpacity onPress={() => { navigation.navigate('newOrder' as any) }} style={styles.btnShowModal}>
          <Images.icon_addOrder />
        </TouchableOpacity>
      </View>
    );
  },
);
