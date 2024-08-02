import { colors, fontSize } from "../../../theme";
import React from "react";
import { View, StyleSheet, StyleProp, TextStyle, ViewStyle } from "react-native";
import { Text } from "../../../../app-purchase/components";
import { TxKeyPath } from "../../../i18n";


interface ProductAttributeProps {
  label?: any
  labelTx?: TxKeyPath;
  value?: any;
  labelStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  styleAttribute?: StyleProp<ViewStyle>;
}
const ProductAttribute: React.FC<ProductAttributeProps> = ({
  label,
  labelTx,
  value,
  labelStyle,
  textStyle,
  styleAttribute,
}) => (
  <View style={[styles.attributeContainer, styleAttribute]}>
    {labelTx ? <Text tx={labelTx} style={[styles.labelText, labelStyle]} /> : null}
    {label ? <Text style={[styles.labelText, labelStyle]}>{label}</Text> : null}
    <Text style={[styles.valueText, textStyle]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  attributeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  labelText: {
    fontSize: fontSize.size12,
    color: colors.palette.dolphin,
    fontWeight: "400",
    width: "40%",
  },
  valueText: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    color: colors.palette.nero,
    width: "60%",
    textAlign: "right",
  },
});

export default ProductAttribute;
