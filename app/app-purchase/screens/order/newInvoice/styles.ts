import { Dimensions, Platform, StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";

export const styles = StyleSheet.create({
  textTitle: {
    // alignSelf: "flex-start",
    fontSize: fontSize.size16,
    lineHeight: scaleHeight(24),
    fontWeight: "700",
    color: colors.palette.neutral100,
  },
  textTotal: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    color: colors.palette.nero,
  },
  textContent: {
    fontWeight: "400",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(15),
    color: colors.palette.nero,
  },
  textAddressChoice: {
    fontWeight: "400",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.palette.nero,
  },
  textDate: {
    fontWeight: "400",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(24),
    color: colors.palette.navyBlue,
  },
  textButtonListProduct: {
    fontWeight: "600",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.palette.navyBlue,
    marginLeft: scaleWidth(margin.margin_6),
  },
  textVoucher: {
    fontWeight: "400",
    fontSize: fontSize.size10,
    lineHeight: scaleHeight(12),
    color: colors.palette.dolphin,
  },
  textTitleModalImage: {
    fontWeight: "400",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(22),
    color: colors.palette.nero,
    marginBottom: scaleHeight(margin.margin_16),
    alignSelf: "center",
  },
  buttonOrder: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.palette.navyBlue,
    height: scaleHeight(48),
    marginHorizontal: scaleWidth(margin.margin_16),
  },
  buttonFeature: {
    marginHorizontal: scaleWidth(margin.margin_4),
    paddingHorizontal: scaleWidth(padding.padding_8),
    paddingVertical: scaleHeight(padding.padding_6),
    borderRadius: 4,
    backgroundColor: colors.palette.neutral100,
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
  },
  textCost: {
    color: colors.palette.nero,
    fontWeight: "600",
    fontSize: fontSize.size16,
    lineHeight: scaleHeight(20),
  },
  textButtonOrder: {
    fontSize: fontSize.size14,
    fontWeight: "600",
    lineHeight: scaleHeight(24),
    color: colors.palette.neutral100,
  },
  textButtonModalImage: {
    fontWeight: "400",
    fontSize: fontSize.size17,
    lineHeight: scaleHeight(22),
    color: colors.palette.dodgerBlue,
    marginVertical: scaleHeight(margin.margin_10),
    alignSelf: "center",
  },
  viewButtonOrder: {
    // paddingHorizontal: scaleHeight(margin.margin_16),
    backgroundColor: colors.palette.neutral100,
    marginVertical : scaleHeight(12)
  },
  viewScrollVertical: {
    paddingHorizontal: scaleWidth(padding.padding_16),
    backgroundColor: colors.palette.white,
  },
  viewSupplier: {
    borderRadius: 8,
    paddingVertical: scaleHeight(padding.padding_10),
    paddingHorizontal: scaleWidth(padding.padding_16),
    backgroundColor: colors.palette.neutral100,
    marginTop: scaleHeight(margin.margin_20),
  },
  viewAddress: {
    borderRadius: 8,
    paddingVertical: scaleHeight(padding.padding_10),
    paddingHorizontal: scaleWidth(padding.padding_16),
    backgroundColor: colors.palette.neutral100,
    marginVertical: scaleHeight(margin.margin_15),
  },
  viewPaymentMethod: {
    marginTop: scaleHeight(margin.margin_15),
    marginBottom: scaleHeight(margin.margin_20),
    paddingVertical: scaleHeight(padding.padding_14),
    paddingHorizontal: scaleWidth(padding.padding_16),
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
  },
  viewVoucher: {
    marginBottom: scaleHeight(margin.margin_15),
    paddingVertical: scaleHeight(padding.padding_18),
    paddingHorizontal: scaleWidth(padding.padding_16),
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
  },
  viewBorderCircleAddressChoice: {
    borderRadius: 8,
    width: scaleWidth(16),
    height: scaleHeight(16),
    borderWidth: 1,
    borderColor: colors.quartz,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(margin.margin_6),
  },
  viewCircleAddressChoice: {
    width: scaleWidth(12),
    height: scaleHeight(12),
    borderRadius: 6,
  },
  viewAddressChoice: {
    flexDirection: "row",
    marginBottom: scaleHeight(margin.margin_12),
    alignItems: "center",
  },
  viewNameCompany: {
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    marginBottom: scaleHeight(margin.margin_15),
    paddingVertical: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_16),
    flexDirection: "row",
    alignItems: "center",
  },
  viewNote: {
    backgroundColor: colors.palette.neutral100,
    marginBottom: scaleHeight(margin.margin_15),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleWidth(padding.padding_16),
    paddingVertical: scaleHeight(padding.padding_8),
    borderRadius: 8,
  },
  viewTextfieldNote: {
    marginRight: scaleWidth(margin.margin_6),
    backgroundColor: colors.palette.neutral100,
  },
  viewMoreInformation: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? scaleHeight(20) : scaleHeight(40),
  },
  viewModalImage: {
    width: scaleWidth(269),
    backgroundColor: colors.palette.gray,
    borderRadius: 16,
    paddingTop: scaleHeight(padding.padding_20),
  },
  viewLineModal: {
    height: scaleHeight(0.3),
    backgroundColor: "#3C3C43",
  },
  viewListProduct: {
    backgroundColor: colors.palette.neutral100,
    paddingHorizontal: scaleWidth(padding.padding_16),
    borderRadius: 8,
    // paddingVertical: scaleHeight(padding.padding_10),
  },
  buttonListProduct: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
    backgroundColor: colors.palette.neutral100,
    paddingVertical: scaleHeight(padding.padding_7),
    marginBottom: scaleHeight(margin.margin_10),
    borderRadius: 8,
  },
  viewItemListProduct: {
    marginVertical: scaleHeight(margin.margin_12),
    marginHorizontal: scaleWidth(margin.margin_16),
    flexDirection: "row",
    alignItems: "center",
  },
  viewImageListProduct: {
    borderRadius: 16,
    marginRight: scaleWidth(margin.margin_10),
  },
  textListProduct: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    color: colors.palette.nero,
  },
  textUomName : {
    fontSize: fontSize.size12,
    color: colors.palette.dolphin,

  },
  priceOriginal : {
    textDecorationLine :'line-through',
    marginTop : scaleHeight(8),
    color : colors.palette.dolphin,
    fontSize: fontSize.size12,
  },
});
