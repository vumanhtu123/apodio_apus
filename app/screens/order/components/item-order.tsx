import React from "react";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Text } from "../../../components/text/text";
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { formatCurrency } from "../../../utils/validate";

interface ItemOrder {
  onPress?: () => void;
  name?: string;
  status?: string;
  time?: string;
  code?: string;
  amount?: string;
  money?: string;
  discount?: string;
  totalTax?: string;
  totalAmount?: string;
  weight?: string;
  payStatus?: string;
  styleViewStatus?: ViewStyle;
  styleTextStatus?: TextStyle;
  styleTextPayStatus?: TextStyle;
  styleViewItemOrder?: ViewStyle;
  dataTax?: any
}

export default function ItemOrder(props: ItemOrder) {
  const {
    onPress,
    name,
    time,
    code,
    status,
    amount,
    styleViewItemOrder,
    money,
    discount,
    totalAmount,
    weight,
    payStatus,
    totalTax,
    styleTextStatus,
    styleViewStatus,
    styleTextPayStatus,
    dataTax
  } = props;
  
  function groupTaxValues(dataTax: any[] | undefined) {
    if (dataTax === undefined) {
      return [];
    }
  
    const groupedTaxValues = dataTax.reduce((acc: { [x: string]: { taxName: any; taxId: any; amount: any; }; }, curr: { items: any[]; }) => {
      curr.items.forEach((item: { taxId: any; amount: any; taxName: any; }) => {
        const key = item.taxId;
        if (acc[key]) {
          acc[key].amount += item.amount;
        } else {
          acc[key] = {
            taxName: item.taxName,
            taxId: key,
            amount: item.amount
          };
        }
      });
      return acc;
    }, {});
  
    return Object.values(groupedTaxValues);
  }
  

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[ROOT, styleViewItemOrder]}
      onPress={onPress}>
      {name && code && time && amount !== "" ? (
        <View>
          <View style={{ flexDirection: "row", marginBottom: -2 }}>
            <View style={{ flex: 1 }}>
              <Text style={TEXTNAME} text={name} />
            </View>
            <View style={[VIEWSTATUS, styleViewStatus]}>
              <Text style={[TEXTSTATUS, styleTextStatus]} tx={status} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                TEXTMONEY,
                {
                  color: colors.palette.dolphin,
                },
              ]}>
              {time} - {code}
            </Text>
          </View>
          <View style={VIEWLINE}></View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={TEXTCONTENT} tx={"dashboard.amountProduct"} />
            </View>
            <Text style={TEXTMONEY} text={amount} />
          </View>
        </View>
      ) : null}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={TEXTCONTENT} tx={"dashboard.goods"} />
        </View>
        <Text style={TEXTMONEY} text={money} />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={TEXTCONTENT} tx={"dashboard.promotions"} />
        </View>
        <Text style={TEXTMONEY} text={discount} />
      </View>
      {totalTax ? (
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={TEXTCONTENT} tx={"dashboard.totalTax"} />
          </View>
          <Text style={TEXTMONEY} text={totalTax} />
        </View>
      ) : null}
      {groupTaxValues(dataTax)?.map((item: any) => (
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={TEXTCONTENT} text={item.taxName} />
            </View>
            <Text style={TEXTMONEY} text={formatCurrency(item.amount)} />
          </View>
      ))}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text style={TEXTCONTENT} tx={"dashboard.totalAmount"} />
        </View>
        <Text style={TEXTTOTALAMOUNT} text={totalAmount} />
      </View>
      {weight ? (
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={TEXTCONTENT} tx={"dashboard.estimated"} />
          </View>
          <Text style={TEXTMONEY} text={weight} />
        </View>
      ) : null}
      {payStatus ? (
        <View style={{ flex: 1 }}>
          <Text
            style={[
              {
                fontWeight: "400",
                fontSize: 10,
                color: colors.palette.malachite,
              },
              styleTextPayStatus,
            ]}
            tx={payStatus}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const ROOT: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  paddingVertical: scaleHeight(padding.padding_10),
  paddingHorizontal: scaleWidth(padding.padding_16),
  marginVertical: scaleHeight(margin.margin_10),
  borderRadius: 8,
};

const VIEWSTATUS: ViewStyle = {
  paddingHorizontal: padding.padding_8,
  paddingVertical: padding.padding_2,
};

const TEXTSTATUS: TextStyle = {
  fontWeight: "400",
  fontSize: 8,
  lineHeight: 9.68,
};

const TEXTNAME: TextStyle = {
  fontWeight: "600",
  fontSize: 12,
  color: colors.palette.nero,
  lineHeight: 14.52,
  marginBottom: scaleHeight(margin.margin_2),
};

const TEXTMONEY: TextStyle = {
  color: colors.palette.nero,
  fontWeight: "400",
  fontSize: 10,
};
// const TEXTLISTTAX: TextStyle = {
//   fontWeight: "600",
//   fontSize: fontSize.size10,
//   color: colors.palette.dolphin,
//   marginBottom: scaleHeight(margin.margin_8),
//   marginLeft: scaleWidth(5)
// }
const TEXTCONTENT: TextStyle = {
  fontWeight: "600",
  fontSize: 12,
  color: colors.palette.dolphin,
  marginBottom: scaleHeight(margin.margin_8),
};

const TEXTTOTALAMOUNT: TextStyle = {
  color: colors.palette.radicalRed,
  fontWeight: "600",
  fontSize: 12,
};

const VIEWLINE: TextStyle = {
  width: "100%",
  height: 1,
  backgroundColor: colors.palette.ghostWhite,
  marginVertical: scaleHeight(margin.margin_12),
};
