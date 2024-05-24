import { colors, fontSize } from "../../../theme";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProductAttribute = ({
  label,
  value,
  labelStyle,
  textStyle,
  styleAttribute,
}: any) => (
  <View style={[styles.attributeContainer, styleAttribute]}>
    <Text style={[styles.labelText, labelStyle]}>{label}</Text>
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
