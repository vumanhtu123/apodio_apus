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
import { list } from "./list-revenue-screen";

export const SearchScreen: FC<
  StackScreenProps<NavigatorParamList, "SearchScreen">
> = observer(function SearchScreen(props) {
  const [searchText, setSearchText] = useState("");

  const onBack = () => {
    props.navigation.goBack();
  };

  const handleSearch = (text: any) => {
    // const processedText = text.trim().toLowerCase();
    setSearchText(text);
  };

  const handleOnSubmitSearch = (
    value: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    console.log("value search", value.nativeEvent.text);
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
        <ScrollView>
          <FlatList
            scrollEnabled={false}
            data={list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }: any) => {
              return (
                <ItemRevenue
                  id={item.id}
                  expenditureValue={item.expenditureValue}
                  monthDay={item.monthDay}
                  revenueValue={item.revenueValue}
                  status={item.status}
                  toDay={item.toDay}
                  detail={item.detail}
                />
              );
            }}></FlatList>
        </ScrollView>
      ) : null}
    </View>
  );
});
