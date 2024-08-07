import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { FC, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../../navigators";
import {
  colors,
  fontSize,
  margin,
  padding,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Header, Text } from "../../../components";
import { Color } from "../../../components/dialog-notification/service";
import { InputSelect } from "../../../components/input-select/inputSelect";
import { Svgs } from "../../../../../assets/svgs";
import { observer } from "mobx-react-lite";
import en from "../../../i18n/en";
import { CustomModal } from "../../../components/custom-modal";
import { PlaceholderOrder } from "../../../components/custom-placeholder/placeholder-detail/placeholder-order";
import { PlaceholderList } from "../../../components/custom-placeholder/placeholder-list/placeholder-list";
import { PlaceholderListGrid } from "../../../components/custom-placeholder/placeholder-list/placeholder-list-grid";
import { translate } from "../../../i18n";

export const TransferMoneyScreen: FC<
  StackScreenProps<NavigatorParamList, "transferMoneyScreen">
> = observer(function transferMoneyScreen(props) {
  const [selectCustomerType, setSelectCustomerType] = useState({ label: "" });
  const [isVisible, setIsVisible] = useState(false);

  const dataDepositSource = [
    { id: 1, title: translate("revenueAndExpenditure.electronicWallet") },
    { id: 2, title: translate("revenueAndExpenditure.cash") },
    { id: 3, title: translate("revenueAndExpenditure.bank") },
  ];
  const dataListOfFundingSources = [
    { id: 1, name: translate("revenueAndExpenditure.cash") },
    { id: 2, name: translate("revenueAndExpenditure.electronicWallet") },
    { id: 3, name: translate("revenueAndExpenditure.bank") },
    { id: 4, name: translate("revenueAndExpenditure.storeWallet") },
  ];
  const arrDepositSource = dataDepositSource.map((item) => {
    return {
      id: item.id,
      label: item.title,
    };
  });
  const [isSelect, setIsSelect] = useState("update");

  return (
    <View style={Styles.Root}>
      <Header
        LeftIcon={Svgs.back}
        headerTx="revenueAndExpenditure.transferMoney"
        style={{ height: scaleHeight(52) }}
        onLeftPress={() => props.navigation.goBack()}
      />

      <View style={Styles.Main}>
        <InputSelect
          titleTx="revenueAndExpenditure.depositSource"
          hintTx="revenueAndExpenditure.selectDepositSource"
          arrData={arrDepositSource}
          required
          dataDefault={selectCustomerType.label}
          onPressChoice={(item: any) => {
            setSelectCustomerType(item);
          }}
          styleView={{
            backgroundColor: colors.palette.aliceBlue,
            marginBottom: margin.margin_6,
          }}
        />
        <View style={{ flexDirection: "row", marginBottom: margin.margin_20 }}>
          <TouchableOpacity style={Styles.btnSelect}>
            <Text tx="revenueAndExpenditure.cash" style={Styles.textSize14} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.btnSelect, { marginHorizontal: scaleHeight(6) }]}>
            <Text
              tx="revenueAndExpenditure.electronicWallet"
              style={Styles.textSize14}
            />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.btnSelect}>
            <Text tx="revenueAndExpenditure.bank" style={Styles.textSize14} />
          </TouchableOpacity>
        </View>

        {/* <InputSelect
                        titleTx="revenueAndExpenditure.sourceOfMoneyReceived"
                        hintTx="revenueAndExpenditure.selectSourceOfMoneyReceived"
                        arrData={arrDepositSource}
                        required
                        dataDefault={selectCustomerType.label}
                        onPressChoice={(item: any) => {
                            setSelectCustomerType(item)
                        }}
                        styleView={{ backgroundColor: colors.palette.aliceBlue, marginBottom: margin.margin_6 }}
                    /> */}

        <TouchableOpacity
          style={Styles.btnNTN}
          onPress={() => setIsVisible(!isVisible)}>
          <View>
            <Text
              tx="revenueAndExpenditure.sourceOfMoneyReceived"
              style={{ fontSize: fontSize.size12 }}
            />
            <Text
              tx="revenueAndExpenditure.selectSourceOfMoneyReceived"
              style={Styles.txtBtnNTN}
            />
          </View>
          <Svgs.dropDown />
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginBottom: margin.margin_20 }}>
          <TouchableOpacity style={Styles.btnSelect}>
            <Text tx="revenueAndExpenditure.cash" style={Styles.textSize14} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[Styles.btnSelect, { marginHorizontal: scaleHeight(6) }]}>
            <Text
              tx="revenueAndExpenditure.electronicWallet"
              style={Styles.textSize14}
            />
          </TouchableOpacity>
          <TouchableOpacity style={Styles.btnSelect}>
            <Text tx="revenueAndExpenditure.bank" style={Styles.textSize14} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.Bottom}>
        <TouchableOpacity
          style={[
            Styles.BtnBottom,
            {
              marginRight: scaleWidth(12),
              borderColor:
                isSelect === "back"
                  ? colors.palette.navyBlue
                  : colors.palette.veryLightGrey,
              backgroundColor:
                isSelect === "back" ? colors.palette.navyBlue : colors.white,
            },
          ]}
          onPress={() => {
            setIsSelect("back");
          }}>
          <Text
            tx="ImprotGoodsBook.back"
            style={isSelect === "back" ? Styles.styleText : Styles.textSize14}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            Styles.BtnBottom,
            {
              backgroundColor:
                isSelect === "update" ? colors.palette.navyBlue : colors.white,
              borderColor:
                isSelect === "update"
                  ? colors.palette.navyBlue
                  : colors.palette.veryLightGrey,
            },
          ]}
          onPress={() => {
            setIsSelect("update");
          }}>
          <Text
            tx="suppliers.update"
            style={isSelect === "update" ? Styles.styleText : Styles.textSize14}
          />
        </TouchableOpacity>
      </View>

      <CustomModal
        isVisible={isVisible}
        setIsVisible={() => setIsVisible(!isVisible)}>
        <View
          style={{
            width: scaleWidth(68),
            height: scaleHeight(5),
            backgroundColor: colors.veryLightGrey1,
            borderRadius: margin.margin_8,
            marginBottom: scaleWidth(25),
            alignSelf: "center",
          }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{ fontWeight: "700", fontSize: fontSize.size14 }}
            tx="revenueAndExpenditure.chooseTheSourceOfMoney">
            {" "}
          </Text>

          <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
            <Text
              tx="common.cancel"
              style={{
                fontWeight: "700",
                fontSize: fontSize.size14,
                color: colors.palette.radicalRed,
              }}></Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.horizontalLine} />

        <Text tx="revenueAndExpenditure.listOfFundingSources" />

        <FlatList
          style={{ width: "100%" }}
          data={dataListOfFundingSources}
          renderItem={({ item }) => {
            return (
              <View style={Styles.itemList}>
                <Text style={{ fontSize: fontSize.size14 }}>{item.name}</Text>
              </View>
            );
          }}
          numColumns={3}
          keyExtractor={(item) => item?.id.toString()}
        />

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[
              Styles.BtnBottom,
              {
                marginRight: scaleWidth(12),
                borderColor:
                  isSelect === "back"
                    ? colors.palette.navyBlue
                    : colors.palette.veryLightGrey,
                backgroundColor:
                  isSelect === "back" ? colors.palette.navyBlue : colors.white,
              },
            ]}
            onPress={() => {
              setIsSelect("back");
            }}>
            <Text
              tx="ImprotGoodsBook.back"
              style={isSelect === "back" ? Styles.styleText : Styles.textSize14}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Styles.BtnBottom,
              {
                backgroundColor:
                  isSelect === "update" ? colors.palette.navyBlue : colors.white,
                borderColor:
                  isSelect === "update"
                    ? colors.palette.navyBlue
                    : colors.palette.veryLightGrey,
              },
            ]}
            onPress={() => {
              setIsSelect("update");
            }}>
            <Text
              tx="common.confirm"
              style={
                isSelect === "update" ? Styles.styleText : Styles.textSize14
              }
            />
          </TouchableOpacity>
        </View>
      </CustomModal>
    </View>
  );
});

const Styles = StyleSheet.create({
  Root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  Main: {
    flex: 1,
    padding: padding.padding_16,
  },
  Bottom: {
    padding: padding.padding_16,
    flexDirection: "row",
  },
  BtnBottom: {
    flex: 1,
    padding: padding.padding_12,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: scaleWidth(8),
  },
  styleText: {
    fontSize: fontSize.size14,
    fontWeight: "600",
    color: colors.white,
  },
  textSize14: {
    color: colors.dolphin,
    fontWeight: "400",
    fontSize: fontSize.size14,
  },
  btnSelect: {
    borderRadius: scaleWidth(8),
    backgroundColor: colors.palette.aliceBlue,
    paddingVertical: padding.padding_8,
    paddingHorizontal: padding.padding_12,
  },
  btnNTN: {
    paddingVertical: scaleHeight(margin.margin_8),
    paddingHorizontal: scaleWidth(margin.margin_16),
    borderRadius: scaleWidth(8),
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.palette.aliceBlue,
    alignItems: "center",
    marginBottom: margin.margin_6,
  },
  txtBtnNTN: {
    marginTop: margin.margin_2,
    fontSize: fontSize.size16,
    fontWeight: "500",
    color: colors.palette.dolphin,
  },
  horizontalLine: {
    width: "100%",
    height: 1,
    backgroundColor: colors.solitude2,
    marginTop: scaleHeight(18),
    marginBottom: 18,
  },
  itemList: {
    paddingHorizontal: scaleWidth(padding.padding_12),
    paddingVertical: scaleHeight(padding.padding_8),
    marginRight: scaleHeight(6),
    marginBottom: scaleWidth(margin.margin_8),
    borderRadius: scaleWidth(margin.margin_8),
    backgroundColor: colors.palette.aliceBlue,
  },
});
