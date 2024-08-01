/* eslint-disable react-native/sort-styles */
import { StyleSheet } from "react-native";
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
    // backgroundColor: colors.text,
    backgroundColor: colors.palette.aliceBlue,
    flex: 1,
  },
  header: {
    height: scaleHeight(52),
  },
  textHeader: {
    color: colors.palette.neutral100,
    fontWeight: "700",
    fontSize: fontSize.size16,
    alignSelf: "flex-start",
    // fontFamily: typography.primary.bold,
  },
  textSelect: {
    fontWeight: "700",
    fontSize: fontSize.size12,
    alignItems: "center",
    lineHeight: 16,
    // padding: scaleHeight(padding.padding_8),
    paddingHorizontal : scaleWidth(8),
    paddingVertical : scaleHeight(8)
  },
  viewItemSelect: {
    marginRight: scaleWidth(margin.margin_8),
    borderRadius: 8,
    marginVertical: scaleHeight(margin.margin_4),
    justifyContent: "center",
    alignItems: "center",
    height: scaleHeight(32),
  },
  viewSelect: {
    height: scaleHeight(48),
    backgroundColor: colors.palette.neutral100,
    paddingTop: scaleHeight(padding.padding_4),
  },
  boxTimeSelect: {
    height: scaleHeight(48),
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scaleHeight(13),
    marginBottom: scaleHeight(10),
  },
  textTime: {
    fontSize: fontSize.size14,
    color: colors.aluminium1,
    marginRight: scaleWidth(16),
    alignSelf: "center",
  },
  styleFlatlist: {
    marginBottom: scaleHeight(margin.margin_10),
    marginHorizontal: scaleWidth(margin.margin_16),
  },
  btnShowModal: {
    width: scaleWidth(40),
    height: scaleHeight(40),
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: scaleWidth(16),
    bottom: scaleHeight(11),
  },
});
