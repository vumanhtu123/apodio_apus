import { View, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Styles } from "../money-management/styles";
import { Svgs } from "../../../../../assets/svgs";
import {
  colors,
  fontSize,
  margin,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import {
  commasToDots,
  formatCurrency,
  formatVND,
} from "../../../utils/validate";

interface PropsItem {
  id: number;
  kind: string;
  money: number;
}

interface Item {
  item: PropsItem;
  index: number;
  data: any;
  onClickItemPen: () => void;
  onClickItemArrowsOutCardinal: () => void;
}

const ItemListMoneyManagement: FC<Item> = ({
  item,
  index,
  data,
  onClickItemPen,
  onClickItemArrowsOutCardinal,
}) => {
  console.log("dataItem", item);

  return (
    <View style={Styles.ItemMoneyManagement}>
      {index === data.length - 1 ? (
        <Svgs.ic_MinusCircleRed style={{ marginRight: margin.margin_6 }} />
      ) : (
        <Svgs.ic_MinusCircleGray style={{ marginRight: margin.margin_6 }} />
      )}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <View style={{}}>
          <Text style={{ fontSize: fontSize.size12, fontWeight: "400" }}>
            {item?.kind}
          </Text>
          <Text
            style={[
              Styles.textSize12,
              {
                color:
                  item?.money < 0
                    ? colors.palette.radicalRed
                    : colors.palette.malachite,
              },
            ]}>
            {formatVND(formatCurrency(commasToDots(item?.money)))}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={onClickItemPen}>
            <Svgs.ic_pen
              style={{ marginRight: margin.margin_6 }}
              width={scaleWidth(15)}
              height={scaleHeight(15)}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={onClickItemArrowsOutCardinal}>
            <Svgs.arrowsOutCardinal />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ItemListMoneyManagement;
