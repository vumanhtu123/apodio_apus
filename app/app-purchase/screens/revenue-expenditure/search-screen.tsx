import { FC, useEffect, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "react-native-linear-gradient";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { Svgs } from "../../../../assets/svgs";
import { Button, Header, Text } from "../../../components";
import { observer } from "mobx-react-lite";
import { NavigatorParamList } from "../../navigators";
import { StackScreenProps } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";
import { BTNLEFT, LOGO, ROOT } from "./Styles";
import { ItemRevenue } from "./component/item-list-renvenue";
import { formatDatePayment } from "../../utils/formatDate";
import { useStores } from "../../models";

export const SearchScreen: FC<
  StackScreenProps<NavigatorParamList, "SearchScreen">
> = observer(function SearchScreen(props) {
  const [searchText, setSearchText] = useState("");
  const [listPayment, setListPayment] = useState<any>();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const { paymentStore } = useStores();

  const onBack = () => {
    props.navigation.goBack();
  };

  const getListPayment = async (text: string) => {
    const result: any = await paymentStore.getListPayment({
      search: text,
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

  const handleSearch = (text: any) => {
    // const processedText = text.trim().toLowerCase();
    setSearchText(text);
  };

  const handleOnSubmitSearch = (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    console.log("value search", value.nativeEvent.text);
    getListPayment(value.nativeEvent.text);
    // setValueSearch(value.nativeEvent.text)
    // setPage(0)
    // setMyData([])
    // getDataDebt(makeDateS, makeDateE)
  };

  return (
    <View>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.palette.navyBlue, colors.palette.malibu]}
        style={[ROOT]}></LinearGradient>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.palette.navyBlue, colors.palette.malibu]}
        style={{ height: scaleHeight(55) }}>
        <View style={LOGO}>
          <Svgs.icon_logoHome />
        </View>
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={[colors.palette.navyBlue, colors.palette.malibu]}
          style={{
            height: scaleHeight(45),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <TouchableOpacity
            style={BTNLEFT}
            onPress={() => {
              onBack();
            }}>
            <Svgs.back width={scaleWidth(20)} height={scaleHeight(20)} />
          </TouchableOpacity>

          <View
            style={{
              position: "absolute",
              zIndex: 100,
              left: scaleWidth(55),
            }}>
            <Svgs.icon_searchBlack
              width={scaleWidth(16)}
              height={scaleHeight(16)}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setSearchText("");
            }}
            style={{
              position: "absolute",
              zIndex: 100,
              right: scaleWidth(25),
            }}>
            {searchText != "" ? (
              <Svgs.ic_x width={scaleWidth(16)} height={scaleHeight(16)} />
            ) : null}
          </TouchableOpacity>
          <TextInput
            style={{
              backgroundColor: "white",
              borderRadius: 4,
              paddingHorizontal: scaleWidth(32),
              paddingVertical: scaleHeight(7),
              // marginVertical: 8,
              width: scaleWidth(320),
              height: scaleHeight(30),
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              fontSize: fontSize.size12,
              // paddingLeft: 40,
            }}
            value={searchText}
            onChangeText={handleSearch}
            enterKeyHint="search"
            onSubmitEditing={handleOnSubmitSearch}
            enablesReturnKeyAutomatically
            placeholder={"Tìm tên danh mục, ghi chú, giá tiền"}

            // placeholder="Tìm kiếm..."
          />
        </LinearGradient>
      </LinearGradient>
      <View style={{ backgroundColor: "#7676801F" }}>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginVertical: 10,
          }}>
          <View style={{ flex: 1, marginHorizontal: 40 }} />
          <Text
            tx={"analysis.totalExpenditure"}
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: colors.nero,
              flex: 1,
            }}></Text>
          <Text
            tx={"analysis.totalRevenue"}
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: colors.nero,
              // flex: 1,
              marginRight: scaleWidth(30),
            }}></Text>
        </View>
      </View>
      {searchText != "" ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          data={listPayment}
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
      ) : null}
    </View>
  );
});
