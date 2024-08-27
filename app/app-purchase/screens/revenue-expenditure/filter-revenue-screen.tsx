import React, { FC, useEffect, useRef, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { Header, Text } from "../../../components";
import { Svgs } from "../../../../assets/svgs";
import { colors, scaleWidth } from "../../theme";
import { styles } from "./styles/styles-filter";
import CustomCalendarWarehouseBook from "../warehouse-book/calendar-warehouse-book/customCalendarWarehouseBook";
import { NavigatorParamList } from "../../navigators";
import { translate } from "../../../i18n";
import { GroupButtonBottom } from "../../../components/group-button/groupButtonBottom";
import moment from "moment";
import { useStores } from "../../models";

export const FilterRevenueScreen: FC<
  StackScreenProps<NavigatorParamList, "filterRevenueScreen">
> = observer(function name(props) {
  const { paymentStore } = useStores()
  const [markedDatesS, setMarkedDatesS] = useState("");
  const [markedDatesE, setMarkedDatesE] = useState("");
  const [selectedTime, setSelectedTime] = useState<{ id: number, day: string }>({ id: 0, day: '' });
  const [viewCalendarS, setViewCalendarS] = useState(false)
  const [viewCalendarE, setViewCalendarE] = useState(false)
  const [isSortByDate, setIsSortByDate] = useState(false)
  const [valueDateS, setValueDateS] = useState('') 
  const [valueDateE, setValueDateE] = useState('')
  const customDate = useRef(false)

  const navigation = useNavigation();

  useEffect(() => {
    console.log(paymentStore.filterListPayment.customDate)
    console.log(paymentStore.filterListPayment.stringDate)
    console.log(paymentStore.filterListPayment)
    console.log(moment(new Date()).format('YYYY-MM-DD'))
    setValueDateS(paymentStore.filterListPayment.dateStart)
    setValueDateE(paymentStore.filterListPayment.dateEnd)
    setSelectedTime({ day: paymentStore.filterListPayment.stringDate, id: paymentStore.filterListPayment.id })
    setMarkedDatesS(paymentStore.filterListPayment.dateStart)
    setMarkedDatesE(paymentStore.filterListPayment.dateEnd)
  }, [])

  useEffect(()=>{
    console.log(valueDateE,'123', valueDateS)
    console.log(markedDatesE, markedDatesS)
    if(valueDateS !== markedDatesS || valueDateE !== markedDatesE){
      setSelectedTime({id: 0, day: ''})
      customDate.current = true
    }
  }, [markedDatesE, markedDatesS])

  const dataDay = [
    {
      id: 1,
      day: translate('calendar.today'),
      onPress: () => {
        setMarkedDatesS(moment(new Date()).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(new Date()).format('YYYY-MM-DD'))
        setValueDateS(moment(new Date()).format('YYYY-MM-DD'))
        setValueDateE(moment(new Date()).format('YYYY-MM-DD'))
      },
    },
    {
      id: 2,
      day: translate('calendar.yesterday'),
      onPress: () => {
        const date = new Date()
        const lastDay = date.setDate(date.getDate() - 1)
        setMarkedDatesS(moment(lastDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(lastDay).format('YYYY-MM-DD'))
        setValueDateS(moment(lastDay).format('YYYY-MM-DD'))
        setValueDateE(moment(lastDay).format('YYYY-MM-DD'))
      },
    },
    {
      id: 3,
      day: translate('calendar.thisMonth'),
      onPress: () => {
        const today = new Date()
        const startDay = new Date(today.getFullYear(), today.getMonth(), 1)
        const endDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        setMarkedDatesS(moment(startDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(endDay).format('YYYY-MM-DD'))
        setValueDateS(moment(startDay).format('YYYY-MM-DD'))
        setValueDateE(moment(endDay).format('YYYY-MM-DD'))
      },
    },
    {
      id: 4,
      day: translate('calendar.lastMonth'),
      onPress: () => {
        const today = new Date()
        const startDay = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const endDay = new Date(today.getFullYear(), today.getMonth(), 0)
        setMarkedDatesS(moment(startDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(endDay).format('YYYY-MM-DD'))
        setValueDateS(moment(startDay).format('YYYY-MM-DD'))
        setValueDateE(moment(endDay).format('YYYY-MM-DD'))
      },
    },
    {
      id: 5,
      day: translate('calendar.last30days'),
      onPress: () => {
        const today = new Date()
        const endDay = new Date()
        const startDay = today.setDate(today.getDate() - 30)
        setMarkedDatesS(moment(startDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(endDay).format('YYYY-MM-DD'))
        setValueDateS(moment(startDay).format('YYYY-MM-DD'))
        setValueDateE(moment(endDay).format('YYYY-MM-DD'))
      },
    },
    {
      id: 6,
      day: translate('calendar.thisYear'),
      onPress: () => {
        const today = new Date()
        const startDay = new Date(today.getFullYear(), 0, 1)
        const endDay = new Date(today.getFullYear(), 12, 0)
        setMarkedDatesS(moment(startDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(endDay).format('YYYY-MM-DD'))
        setValueDateS(moment(startDay).format('YYYY-MM-DD'))
        setValueDateE(moment(endDay).format('YYYY-MM-DD'))
      },
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Header
        LeftIcon={Svgs.back}
        headerTx="warehouseBook.filter"
        onLeftPress={() => {
          navigation.goBack();
        }}
        style={{ height: 52 }}
      />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.white,
            borderRadius: scaleWidth(8),
            height: "100%",
          }}>
          <View style={styles.bodyModal}>

            <Text tx="warehouseBook.time" style={styles.textTime} />

            <FlatList
              data={dataDay}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ justifyContent: "space-between", flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedTime({ day: item.day, id: item.id });
                        console.log(index)
                        item.onPress();
                        setViewCalendarS(false)
                        setViewCalendarE(false)
                        customDate.current = false
                      }}
                      style={[
                        styles.styleIemTime,
                        {
                          backgroundColor:
                            selectedTime.id - 1 === index ? colors.aliceBlue2 : colors.aliceBlue,
                          borderWidth: 1,
                          borderColor:
                            selectedTime.id - 1 == index
                              ? colors.palette.navyBlue
                              : colors.aliceBlue,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            selectedTime.id - 1 == index
                              ? colors.palette.navyBlue
                              : colors.palette.dolphin,
                        }}>
                        {item.day}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              numColumns={2}
            />
            <Text
              tx="warehouseBook.orCustomizeTheTime"
              style={styles.stytleTitle}
            />

            <TouchableOpacity onPress={() => {
              setViewCalendarS(!viewCalendarS)
              setIsSortByDate(!isSortByDate)
              console.log(selectedTime, 'ahjsdkjashdg')
            }}
              style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text
                style={{
                  marginRight: scaleWidth(24),
                  fontSize: scaleWidth(12),
                  alignSelf: "center",
                  color: colors.dolphin,
                }}
                tx="warehouseBook.from"></Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: viewCalendarS == true ? colors.palette.navyBlue : colors.ghostWhite,
                  alignItems: "center",
                }}>
                <Text
                  style={{ flex: 1, padding: 0 }}
                  text={moment(markedDatesS).format('DD/MM/YYYY')}
                />

                <View style={{ transform: [{ rotate: viewCalendarS == true ? "180deg" : "0deg" }] }}>
                  <Svgs.dropDown />
                </View>
              </View>
            </TouchableOpacity>

            {viewCalendarS == true ? <View style={styles.bodyClender}>
              <CustomCalendarWarehouseBook
                isOneDate={true}

                onMarkedDatesChangeS={(markedDatesS: any) => {
                  console.log(markedDatesS);
                  setMarkedDatesS(markedDatesS);
                  // setSelectedTime({ id: 0, day: '' })
                }}
                dateS={markedDatesS}
                onMarkedDatesChangeE={(markeDateE: any) => {
                  console.log(markeDateE);
                }}
                maxDate={markedDatesE}
                isSortByDate={isSortByDate}
              />
            </View> : null}

            <TouchableOpacity onPress={() => {
              setViewCalendarE(!viewCalendarE)
              setIsSortByDate(!isSortByDate)
            }}
              style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text
                style={{
                  marginRight: scaleWidth(16),
                  fontSize: scaleWidth(12),
                  alignSelf: "center",
                  color: colors.dolphin,
                }}
                tx="warehouseBook.to"></Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor: viewCalendarE == true ? colors.palette.navyBlue : colors.ghostWhite,
                  alignItems: "center",
                }}>
                <Text
                  style={{ flex: 1, padding: 0 }}
                  text={moment(markedDatesE).format('DD/MM/YYYY')}
                />

                <View style={{ transform: [{ rotate: viewCalendarE == true ? "180deg" : "0deg" }] }}>
                  <Svgs.dropDown />
                </View>
              </View>
            </TouchableOpacity>

            {viewCalendarE == true ? <View style={styles.bodyClender}>
              <CustomCalendarWarehouseBook
                isOneDate={true}

                onMarkedDatesChangeS={(markedDatesS: any) => {
                  console.log(markedDatesS);
                  setMarkedDatesE(markedDatesS);
                  // setSelectedTime({ id: 0, day: '' })
                }}
                dateS={markedDatesE}
                onMarkedDatesChangeE={(markedDateE: any) => {
                  console.log(markedDateE);
                }}
                isShowTabs={false}
                minDate={markedDatesS}
                isSortByDate={isSortByDate}
              />
            </View> : null}

          </View>
        </View>
      </ScrollView>
      <GroupButtonBottom
        txCancel={"warehouseBook.reset"}
        txConfirm={"warehouseBook.apply"}
        isModal={false}
        onPressCancel={() => console.log('dasd')}
        onPressConfirm={() => paymentStore.setFilterListPayment({
          dateStart: markedDatesS,
          dateEnd: markedDatesE,
          customDate: customDate.current,
          stringDate: selectedTime.day,
          id: selectedTime.id,
        })}
      />
    </View>
  );
});
