import { observer } from "mobx-react-lite";
import { FC, useState } from "react";
import { TabScreenProps } from "../../../../navigators/bottom-navigation";
import { NavigatorParamList } from "../../../../navigators";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Header, Text } from "../../../../components";
import { colors, scaleHeight, scaleWidth } from "../../../../theme";
import { Images } from "../../../../../assets";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Styles } from "../styles";
import { ItemListMustPay } from "../../component/itemListMustPay";
import en from "../../../../i18n/en";
import { ModalFilter } from "../../component/modalFilter";

export const MustPayScreen: FC<
  StackScreenProps<NavigatorParamList, "mustPay">
> = observer(function mustPayScreen(props) {
  const [valueItemSelect, setValueItemSelect] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const fakeData: any = [
    {
      id: "1",
      name: "Công ty TNHH một thành viên APODIO",
      totalLiabilities: "2.000.000",
      paid: "1.000.000",
      musPay: "1.000.000",
    },
    {
      id: "2",
      name: "Công ty TNHH một thành viên APODIO",
      totalLiabilities: "2.000.000",
      paid: "1.000.000",
      musPay: "1.000.000",
    },
    {
      id: "3",
      name: "Công ty TNHH một thành viên APODIO",
      totalLiabilities: "2.000.000",
      paid: "1.000.000",
      musPay: "1.000.000",
    },
    {
      id: "4",
      name: "Công ty TNHH một thành viên APODIO",
      totalLiabilities: "2.000.000",
      paid: "1.000.000",
      musPay: "1.000.000",
    },
    {
      id: "5",
      name: "Công ty TNHH một thành viên APODIO",
      totalLiabilities: "2.000.000",
      paid: "1.000.000",
      musPay: "1.000.000",
    },
  ];

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

  console.log("data fake", fakeData);

  return (
    <View style={{ flex: 1 }}>
      <Header
        style={{ height: scaleHeight(52) }}
        LeftIcon={Images.back}
        headerTx="debtScreen.toPaydebt"
        onLeftPress={() => {
          props.navigation.goBack();
        }}
        RightIcon={Images.ic_calender_white}
        RightIcon1={Images.ic_slider}
        btnRightStyle={{}}
        headerInput={true}
        searchText={en.NCCScreen.nameSuppliers}
        onRightPress1={() => setIsVisible(true)}
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
              style={[Styles.styleNumber, { color: colors.palette.navyBlue }]}>
              10
            </Text>
            <Text
              style={{ fontSize: 12, textAlign: "center" }}
              tx="debtScreen.totalNumberOfSuppliersIncurringDebt"></Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ alignItems: "center", flex: 1 }]}>
            <Text
              style={[
                Styles.styleNumber,
                { color: colors.palette.textExCancle },
              ]}>{`10 ${"đ"}`}</Text>
            <Text
              style={{ fontSize: 12 }}
              tx="debtScreen.totalDebtMustPay"></Text>
          </TouchableOpacity>
        </View>
      </View>

      {fakeData && fakeData.length > 0 ? (
        <FlatList
          data={fakeData}
          renderItem={({ item }) => (
            <ItemListMustPay
              item={item}
              onClick={() => {
                // console.log(item.id)
                setValueItemSelect(item.id);
                props.navigation.navigate("detailDebt");
              }}
              idSelect={valueItemSelect}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.2}
          ListFooterComponent={() => (
            <View>{isLoadingMore == true ? <ActivityIndicator /> : null}</View>
          )}
          style={{ marginTop: scaleHeight(60) }}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Images.img_not_init />
          <Text tx="debtScreen.notThing" style={{ color: "#848688" }} />
        </View>
      )}

      <ModalFilter
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(!isVisible)}
      />
    </View>
  );
});
