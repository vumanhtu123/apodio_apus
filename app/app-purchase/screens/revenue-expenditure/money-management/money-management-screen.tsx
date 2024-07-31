import { View, TouchableOpacity, FlatList } from "react-native";
import React, { FC, useState } from "react";
import { NavigatorParamList } from "../../../navigators";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { Header, Text } from "../../../../components";
import {
  colors,
  fontSize,
  margin,
  padding,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import { Styles } from "./styles";
import {
  commasToDots,
  formatCurrency,
  formatVND,
} from "../../../utils/validate";
import ItemListManagement from "../component/item-list-money-management";
import ItemListMoneyManagement from "../component/item-list-money-management";
import { RefactorMoneyModal } from "../refactor-money-modal";
import { CreateFunds } from "../create-funds-modal";

export const MoneyManagementScreen: FC<
  StackScreenProps<NavigatorParamList, "moneyManagement">
> = observer(function moneyManagementScreen(props) {
  const [editFunds, setEditFunds] = useState(false);
  const [isVisibleCreateFunds, setIsVisibleCreateFunds] = useState(false);

  const OpenModalCreateFunds = () => {
    setIsVisibleCreateFunds(!isVisibleCreateFunds);
  };
  const OpenEditFunds = () => {
    setEditFunds(!editFunds);
  };
  const dataFake = [
    {
      id: 1,
      kind: "Tiền mặt",
      money: -100000,
    },
    {
      id: 2,
      kind: "Ví điện tử",
      money: 0,
    },
    {
      id: 3,
      kind: "Ngân hàng",
      money: 0,
    },
    {
      id: 4,
      kind: "Ví của hàng",
      money: 0,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <Header
        LeftIcon={Svgs.back}
        headerTx="revenueAndExpenditure.moneyManagement"
        style={{ height: scaleHeight(52) }}
        onLeftPress={() => props.navigation.goBack()}
      />
      <View style={Styles.boxHeader}>
        <TouchableOpacity
          style={Styles.btnTransferMoney}
          onPress={() => props.navigation.navigate("transferMoneyScreen")}>
          <Svgs.ic_ArrowsLeftRight />
          <Text
            tx="revenueAndExpenditure.transferMoney"
            style={{ marginLeft: scaleWidth(6) }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataFake}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ItemListMoneyManagement
            data={dataFake}
            index={index}
            item={item}
            onClickItemPen={() => OpenEditFunds()}
            onClickItemArrowsOutCardinal={() => OpenEditFunds()}
          />
        )}
      />
      <View style={{ alignItems: "flex-end", margin: scaleWidth(16) }}>
        <TouchableOpacity
          style={Styles.btnAddFunds}
          onPress={() => OpenModalCreateFunds()}>
          <Svgs.icon_plus width={scaleWidth(16)} height={scaleHeight(16)} />
          <Text
            tx="revenueAndExpenditure.addFunds"
            style={{ fontSize: fontSize.size14, color: colors.palette.white }}
          />
        </TouchableOpacity>
      </View>

      <RefactorMoneyModal
        onVisible={editFunds}
        onClose={() => OpenEditFunds()}
      />
      <CreateFunds
        onVisible={isVisibleCreateFunds}
        onClose={() => OpenModalCreateFunds()}
      />
    </View>
  );
});
