import React, { FC, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";

import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { Header, Text } from "../../../components";
import { Svgs } from "../../../../assets/svgs";
import { colors, scaleWidth } from "../../theme";
import { styles } from "./styles/styles-filter";
import CustomCalendarWarehouseBook from "../warehouse-book/calendar-warehouse-book/customCalendarWarehouseBook";
import { NavigatorParamList } from "../../navigators";
import { translate } from "../../../i18n";
import { GroupButtonBottom } from "../../../components/group-button/groupButtonBottom";
import moment from "moment";


interface ModalFielterProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const FilterRevenueScreen: FC<
  StackScreenProps<NavigatorParamList, "filterRevenueScreen">
> = observer(function name(props) {
  const [indexTime, setIndexTime] = useState(0);
  const [markedDatesS, setMarkedDatesS] = useState("");
  const [markedDatesE, setMarkedDatesE] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [viewCalendarS, setViewCalendarS] = useState(false)
  const [viewCalendarE, setViewCalendarE] = useState(false)
  const [isSortByDate, setIsSortByDate] = useState(false)

  const navigation = useNavigation();

  const dataDay = [
    {
      id: 1,
      day: "Hôm nay",
      onPress: () => {
        setMarkedDatesS(moment(new Date()).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(new Date()).format('YYYY-MM-DD'))
      },
    },
    {
      id: 2,
      day: "Hôm qua",
      onPress: () => {
        const date = new Date()
        const lastDay = date.setDate(date.getDate() - 1)
        setMarkedDatesS(moment(lastDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(lastDay).format('YYYY-MM-DD'))
      },
    },
    {
      id: 3,
      day: "Tháng này",
      onPress: () => {
        const today = new Date()
        const startDay = new Date(today.getFullYear(), today.getMonth(), 1)
        const endDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        setMarkedDatesS(moment(startDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(endDay).format('YYYY-MM-DD'))
      },
    },
    {
      id: 4,
      day: "Tháng trước",
      onPress: () => {
        const today = new Date()
        const startDay = new Date(today.getFullYear(), today.getMonth()-1, 1)
        const endDay = new Date(today.getFullYear(), today.getMonth(), 0)
        setMarkedDatesS(moment(startDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(endDay).format('YYYY-MM-DD'))
      },
    },
    {
      id: 5,
      day: "30 ngày",
      onPress: () => {
        const today = new Date()
        const endDay = new Date()
        const startDay = today.setDate(today.getDate() - 30)
        setMarkedDatesS(moment(startDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(endDay).format('YYYY-MM-DD'))
      },
    },
    {
      id: 6,
      day: "Năm nay",
      onPress: () => {
        const today = new Date()
        const startDay = new Date(today.getFullYear(), 0, 1)
        const endDay = new Date(today.getFullYear(), 12, 0)
        setMarkedDatesS(moment(startDay).format('YYYY-MM-DD'))
        setMarkedDatesE(moment(endDay).format('YYYY-MM-DD'))
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
                        setIndexTime(index);
                        setSelectedTime(item.day);
                        item.onPress();
                        setViewCalendarS(false)
                        setViewCalendarE(false)
                      }}
                      style={[
                        styles.styleIemTime,
                        {
                          backgroundColor:
                            indexTime === index ? colors.aliceBlue2 : colors.aliceBlue,
                          borderWidth: 1,
                          borderColor:
                            indexTime == index
                              ? colors.palette.navyBlue
                              : colors.aliceBlue,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            indexTime == index
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

            <TouchableOpacity onPress={()=> {setViewCalendarS(!viewCalendarS)
              setIsSortByDate(!isSortByDate)
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
                  text={markedDatesS}
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
                  setIndexTime(-1)
                }}
                dateS={markedDatesS}
                onMarkedDatesChangeE={(markeDateE: any) => {
                  console.log(markeDateE);
                  // setMarkedDatesE(markeDateE);
                }}
                maxDate={markedDatesE}
              isSortByDate={isSortByDate}
              />
            </View> : null}

            <TouchableOpacity onPress={()=> {setViewCalendarE(!viewCalendarE)
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
                  text={markedDatesE}
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
                }}
                dateS={markedDatesE}
                onMarkedDatesChangeE={(markeDateE: any) => {
                  console.log(markeDateE);
                  // setMarkedDatesE(markeDateE);
                }}
                minDate={markedDatesS}
              // maxDate={new Date()}
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
        onPressConfirm={() => console.log('asjgdf')}
      />
    </View>
  );
});
