import { StyleSheet, ViewStyle } from "react-native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
  spacing,
} from "../../theme";

export const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.sm,
  alignItems: "center",
  paddingTop: spacing.xxxs,
  paddingBottom: spacing.xxs,
  justifyContent: "space-between",
  height: scaleHeight(25),
};

export const LOGO: ViewStyle = {
  position: "absolute",
  opacity: 1,
  top: 0,
  right: 40,
  height: 40,
  width: 40,
  zIndex: 1,
};

export const BTNLEFT: ViewStyle = {
  width: scaleWidth(30),
  height: scaleHeight(30),
  alignItems: "center",
  paddingRight: scaleWidth(15),
  paddingTop: spacing.xxs,
  paddingBottom: spacing.xxs,
};

export const Styles = StyleSheet.create({
  calendarDay: {
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.palette.aliceBlue,
  },
  Root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    padding: scaleWidth(15),
    // backgroundColor:'red'
  },
  img: {
    borderRadius: scaleWidth(8),
    borderColor: colors.navyBlue,
    width: scaleWidth(64),
    height: scaleHeight(48),
    alignItems: "center",
    borderWidth: 1,
    justifyContent: "center",
  },
  btnCreate: {
    borderColor: colors.navyBlue,
    flex: 1,
    marginLeft: scaleWidth(12),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scaleWidth(8),
    backgroundColor: colors.palette.navyBlue,
  },
  textCreate: {
    color: colors.white,
    fontSize: fontSize.size14,
    fontWeight: "600",
  },
  taskBar: {
    flex: 1,
    alignItems: "center",
    borderRadius: scaleWidth(8),
    padding: scaleWidth(4),
  },
  taskBar2: {
    backgroundColor: colors.whisper,
    marginVertical: scaleHeight(20),
    flexDirection: "row",
    padding: scaleWidth(2),
    borderRadius: scaleWidth(8),
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
  btnSelect: {
    borderRadius: scaleWidth(8),
    backgroundColor: colors.palette.aliceBlue,
    paddingVertical: padding.padding_8,
    paddingHorizontal: padding.padding_12,
  },
  textSize14: {
    color: colors.dolphin,
    fontWeight: "400",
    fontSize: fontSize.size14,
  },
});
