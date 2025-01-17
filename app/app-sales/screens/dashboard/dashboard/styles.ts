/* eslint-disable react-native/sort-styles */
import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleText,
  scaleWidth,
  statusBarHeight,
} from "../../../theme";

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.palette.navyBlue,
    flex: 1,
  },
  // eslint-disable-next-line react-native/no-color-literals
  btnNotification: {
    marginRight: margin.margin_10,
    marginLeft: margin.margin_10,
    // backgroundColor: "rgba(255,255,255,0.2)",
    // height: scaleHeight(38),
    // width: scaleWidth(38),
  },
  viewRevenue: {
    height: 97,
    width: Dimensions.get("screen").width - 32,
    left: scaleWidth(margin.margin_16),
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    borderColor: colors.palette.neutral900,
    marginBottom: scaleHeight(margin.margin_20),
    position: "absolute",
    zIndex: 1,
  },
  textRevenue: {
    fontWeight: "400",
    fontSize: 14,
    color: colors.palette.nero,
    lineHeight: 17,
    marginTop: scaleHeight(margin.margin_4),
  },
  textUnit: {
    fontWeight: "400",
    fontSize: 10,
    color: colors.palette.dolphin,
    lineHeight: 12,
    marginTop: scaleHeight(margin.margin_8),
  },
  viewLine: {
    width: 1,
    height: 30,
    backgroundColor: colors.palette.ghostWhite,
    marginHorizontal: scaleWidth(margin.margin_16),
  },
  viewLineFlatlist: {
    width: "100%",
    height: 1,
    backgroundColor: colors.palette.ghostWhite,
    marginVertical: scaleHeight(margin.margin_12),
  },
  textContent: {
    color: colors.palette.dolphin,
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 14,
  },
  textContentBanner: {
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 12,
    color: colors.palette.dolphin,
  },
  textTitleBanner: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 14,
    color: colors.palette.nero,
    paddingBottom: scaleHeight(4),
  },
  viewDateBanner: {
    backgroundColor: colors.palette.neutral100,
    height: scaleHeight(40),
    width: scaleHeight(50),
    marginTop: scaleHeight(margin.margin_12),
    marginLeft: scaleWidth(margin.margin_12),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  textMonthBanner: {
    fontWeight: "400",
    fontSize: 8,
    lineHeight: 9,
    color: colors.palette.radicalRed,
  },
  viewContentBanner: {
    backgroundColor: colors.palette.neutral100,
    height: scaleHeight(70),
    paddingHorizontal: scaleWidth(padding.padding_12),
    paddingVertical: scaleHeight(padding.padding_14),
    borderRadius: 4,
    position: "absolute",
    bottom: scaleHeight(12),
    right: scaleWidth(12),
    left: 12,
  },
  viewHeaderInfo: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaleWidth(18),
  },
  circleNoti: {
    width: scaleWidth(14),
    height: scaleHeight(14),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.palette.neutral100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.palette.redOrange,
    position: "absolute",
    top: -10,
    right: -10,
  },
  textNoti: {
    color: colors.palette.neutral100,
    fontSize: 9,
    fontWeight: "500",
    textAlign: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.palette.nero,
  },
  content: {
    backgroundColor: colors.palette.aliceBlue,
    bottom: 0,
    flex: 1,
    left: 0,
    paddingHorizontal: padding.padding_16,
    // paddingTop: scaleHeight(padding.padding_66),
    position: "absolute",
    width: "100%",
  },
  // eslint-disable-next-line react-native/no-color-literals
  styleFlatlist: {
    marginBottom: scaleWidth(80),
    // height: Dimensions.get('screen').height *0.5
  },

  // BANNER
  // eslint-disable-next-line react-native/sort-styles
  textModal: {
    fontWeight: "600",
    fontSize: 12,
    lineHeight: 14.52,
    color: colors.palette.neutral100,
    paddingRight: scaleWidth(padding.padding_10),
    paddingBottom: scaleHeight(padding.padding_8),
  },
  btnShowModal: {
    width: scaleWidth(40),
    height: scaleHeight(40),
    backgroundColor: colors.palette.navyBlue,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: scaleWidth(16),
    bottom: scaleHeight(11),
    borderRadius: scaleHeight(20),
  },
  circleModal: {
    width: scaleWidth(40),
    height: scaleHeight(40),
    backgroundColor: colors.palette.neutral100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: scaleHeight(margin.margin_12),
    borderRadius: scaleHeight(20),
  },
  viewModal: {
    position: "absolute",
    right: -4,
    bottom: scaleHeight(86),
    alignItems: "flex-end",
  },
});
