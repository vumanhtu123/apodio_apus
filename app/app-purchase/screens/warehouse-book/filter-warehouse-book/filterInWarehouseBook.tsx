import React, { FC, useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { Header, Text } from "../../../components";
import CustomCalendarWarehouseBook from "../calendar-warehouse-book/customCalendarWarehouseBook";
import { StackNavigationProp } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";
import { Svgs } from "../../../../../assets/svgs";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import en from "../../../i18n/en";

interface ModalFielterProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

export const FilterWarehouseBook: FC<
  StackNavigationProp<NavigatorParamList, "filterInWarehouseBook">
> = observer(function name(props) {
  const [indexTime, setIndexTime] = useState(0);
  const [indexClassify, setIndexClassify] = useState(0);
  const [indexTypeOfGoods, setIndexTypeOfGoods] = useState(0);
  const [isSortByDate, setIsSortByDate] = useState(false);
  const [markedDatesS, setMarkedDatesS] = useState("");
  const [markedDatesE, setMarkedDatesE] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedClassify, setSelectedClassify] = useState("");
  const [selectedTypeOfGoods, setSelectedTypeOfGoods] = useState("");
  const [slectedReportDetail, setslectedReportDetail] = useState(
    en.warehouseBook.apply
  );

  const navigation = useNavigation();
  const [dateS, setdateS] = useState("");
  const [dateE, setdateE] = useState("");

  // console.log('====================================');
  // console.log("Ngay end", markedDatesE);
  // console.log('====================================');
  const dataDay = [
    {
      day: "Hôm nay",
      onPress: () => {
        console.log("Hom qua");
      },
    },
    {
      day: "Hôm qua",
      onPress: () => {
        console.log("Hom qua");
      },
    },
    {
      day: "Tháng này",
      onPress: () => {
        console.log("Hom qua2");
      },
    },
    {
      day: "Tháng trước",
      onPress: () => {
        console.log("Hom qua3");
      },
    },
    {
      day: "30 ngày",
      onPress: () => {
        console.log("Hom qua4");
      },
    },
    {
      day: "Năm nay",
      onPress: () => {
        console.log("Hom qua5");
      },
    },
    {
      day: "Tất cả",
      onPress: () => {
        console.log("Hom qua6");
      },
    },
  ];

  const dataClassify = [
    {
      classify: en.warehouseBook.sell,
    },
    {
      classify: en.warehouseBook.return,
    },
    {
      classify: en.warehouseBook.initializeWarehouse,
    },
    {
      classify: en.warehouseBook.editInventory,
    },
    {
      classify: en.warehouseBook.editCostPrice,
    },
    {
      classify: en.warehouseBook.deleteProduct,
    },
    {
      classify: en.warehouseBook.deleteRawMaterials,
    },
    {
      classify: en.warehouseBook.different,
    },
  ];

  const dataTypeOfGoods = [
    {
      typeOfGoods: en.warehouseBook.product,
    },
    {
      typeOfGoods: en.warehouseBook.typeOfGoods,
    },
  ];
  // console.log('====================================');
  // console.log("index", selectedTypeOfGoods);
  // console.log('====================================');
  const handleChangeText = (txt: any) => {
    setdateS(txt);
    const formattedDate = txt.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1");
    setMarkedDatesS(formattedDate);
  };
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
          <View style={styles.lineHeaderModal} />
          <View style={styles.bodyModal}>
            <View style={styles.flexRow}>
              <TouchableOpacity>
                <Text tx="common.filter" style={styles.textFilter} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // Alert.alert("ok")
                }}>
                <Text tx="common.cancel" style={styles.textCancel} />
              </TouchableOpacity>
            </View>

            <View style={styles.lineModal} />

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
                        item.onPress;
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
              keyExtractor={(item) => item.day}
              // numColumns={1}
              numColumns={2}
            />
            <Text
              tx="warehouseBook.orCustomizeTheTime"
              style={styles.stytleTitle}
            />

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Text
                style={{
                  marginRight: scaleWidth(16),
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
                  borderBottomColor: colors.palette.navyBlue,
                  alignItems: "center",
                }}>
                <TextInput
                  style={{ flex: 1, padding: 0 }}
                  value={markedDatesS}
                  onChangeText={handleChangeText}
                />

                <View style={{ transform: [{ rotate: "180deg" }] }}>
                  <Svgs.dropDown />
                </View>
              </View>
            </View>

            <View style={styles.bodyClender}>
              <CustomCalendarWarehouseBook
                // isOneDate ={true}

                onMarkedDatesChangeS={(markedDatesS: any) => {
                  console.log(markedDatesS);
                  setMarkedDatesS(markedDatesS);
                }}
                onMarkedDatesChangeE={(markeDateE: any) => {
                  console.log(markeDateE);
                  setMarkedDatesE(markeDateE);
                }}

                // isSortByDate={true}
              />
            </View>

            <View style={{ flexDirection: "row", marginBottom: 10 }}>
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
                  borderBottomColor: colors.palette.navyBlue,
                  alignItems: "center",
                }}>
                <TextInput
                  style={{ flex: 1, padding: 0 }}
                  value={markedDatesE}
                />

                <View style={{ transform: [{ rotate: "180deg" }] }}>
                  <Svgs.dropDown />
                </View>
              </View>
            </View>

            <Text tx="warehouseBook.classify" style={styles.stytleTitle} />

            <FlatList
              data={dataClassify}
              renderItem={({ item, index }) => {
                return (
                  <View style={{ justifyContent: "space-between", flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIndexClassify(index);

                        setSelectedClassify(item.classify);
                        // item.onPress
                      }}
                      style={[
                        styles.styleIemTime,
                        {
                          backgroundColor:
                            indexClassify === index ? colors.aliceBlue2 : colors.aliceBlue,
                          borderWidth: 1,
                          borderColor:
                            indexClassify == index
                              ? colors.palette.navyBlue
                              : colors.aliceBlue,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            indexClassify == index
                              ? colors.palette.navyBlue
                              : colors.palette.dolphin,
                        }}>
                        {item.classify}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item) => item.classify}
              // numColumns={1}
              numColumns={2}
            />

            <Text tx="warehouseBook.typeOfGoods" style={styles.stytleTitle} />

            <View style={styles.flexRow}>
              <FlatList
                data={dataTypeOfGoods}
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ justifyContent: "space-between", flex: 1 }}>
                      <TouchableOpacity
                        onPress={() => {
                          setIndexTypeOfGoods(index);

                          setSelectedTypeOfGoods(item.typeOfGoods);
                          // item.onPress
                        }}
                        style={[
                          styles.styleIemTime,
                          {
                            backgroundColor:
                              indexTypeOfGoods === index
                                ? colors.aliceBlue2
                                : colors.aliceBlue,
                            borderWidth: 1,
                            borderColor:
                              indexTypeOfGoods == index
                                ? colors.palette.navyBlue
                                : colors.aliceBlue,
                          },
                        ]}>
                        <Text
                          style={{
                            color:
                              indexTypeOfGoods == index
                                ? colors.palette.navyBlue
                                : colors.palette.dolphin,
                          }}>
                          {item.typeOfGoods}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.typeOfGoods}
                // numColumns={1}
                numColumns={2}
              />
            </View>

            <View style={[styles.flexRow, { alignItems: "center" }]}>
              <Text
                tx="warehouseBook.reportDetail"
                style={styles.stytleTitle}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Svgs.ic_downLoadBlue />

                <Text
                  tx="warehouseBook.downloadNow"
                  style={{
                    fontSize: scaleWidth(12),
                    color: colors.palette.navyBlue,
                  }}
                />
              </View>
            </View>

            <View style={styles.flexRow}>
              <TouchableOpacity
                style={[
                  styles.styleBtnReport,
                  {
                    borderColor:
                      slectedReportDetail == en.warehouseBook.reset
                        ? colors.palette.navyBlue
                        : colors.palette.veryLightGrey,
                    backgroundColor:
                      slectedReportDetail == en.warehouseBook.reset
                        ? colors.palette.navyBlue
                        : colors.white,
                  },
                ]}
                onPress={() => {
                  setslectedReportDetail(en.warehouseBook.reset);
                }}>
                <Text
                  tx="warehouseBook.reset"
                  style={{
                    fontSize: scaleWidth(14),
                    color:
                      slectedReportDetail == en.warehouseBook.reset
                        ? colors.white
                        : colors.dolphin,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.styleBtnReport,
                  {
                    borderColor:
                      slectedReportDetail == en.warehouseBook.apply
                        ? colors.palette.navyBlue
                        : colors.palette.veryLightGrey,
                    backgroundColor:
                      slectedReportDetail == en.warehouseBook.apply
                        ? colors.palette.navyBlue
                        : colors.white,
                  },
                ]}
                onPress={() => {
                  setslectedReportDetail(en.warehouseBook.apply);

                  const getData = {
                    time: selectedTime,
                    dayStart: markedDatesS,
                    dayEnd: markedDatesE,
                    classify: selectedClassify,
                    typeOfGoods: selectedClassify,
                  };
                  // console.log('====================================');
                  // console.log( "doannn",getData.time);
                  // console.log('====================================');
                }}>
                <Text
                  tx="warehouseBook.apply"
                  style={{
                    fontSize: scaleWidth(14),
                    color:
                      slectedReportDetail == en.warehouseBook.apply
                        ? colors.white
                        : colors.dolphin,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
});
