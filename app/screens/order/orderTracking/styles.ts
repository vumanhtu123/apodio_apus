import { StyleSheet } from "react-native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";

export const styles = StyleSheet.create({
  ROOT: { backgroundColor: colors.palette.neutral100, flex: 1 },
  viewTitle: {
    marginTop: scaleHeight(20),
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(15),
    flexDirection: "row",
  },
  viewButton: {
    backgroundColor: colors.navyBlue,
    borderRadius: 8,
    height: scaleHeight(48),
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(12),
  },
  viewItemRender: {
    flexDirection: "row",
    marginHorizontal: scaleWidth(16),
    flex: 1,
  },
  viewModal: { backgroundColor: colors.textWhite, borderRadius: 10 },
  viewTitleModal: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(20),
  },
  viewIconDelete: {
    height: scaleHeight(20),
    width: scaleWidth(20),
  },
  viewBtnCancel: {
    width: scaleWidth(146),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.palette.veryLightGrey,
  },
  viewBtnConfirm: {
    width: scaleWidth(146),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.palette.navyBlue,
  },
  viewGroupBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingVertical: scaleHeight(15),
    marginHorizontal: scaleWidth(16),
    borderRadius: 10,
  },

  textTitle: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.nero,
  },
  textButton: {
    fontWeight: "600",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.textWhite,
  },
  textInformation: {
    fontWeight: "400",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.dolphin,
  },
  textInformationBlue: {
    fontWeight: "400",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.navyBlue,
  },
  textDate: {
    fontWeight: "400",
    fontSize: fontSize.size10,
    lineHeight: scaleHeight(12.1),
    color: colors.dolphin,
  },
  textStatus: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.dolphin,
  },
  textStatusBlue: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.navyBlue,
  },
  textTitleModal: {
    fontWeight: "600",
    fontSize: fontSize.size16,
    lineHeight: scaleHeight(19.36),
    color: colors.nero,
    flex: 1,
  },
  textBtnConfirm: {
    fontSize: fontSize.size14,
    color: colors.palette.neutral100,
    lineHeight: scaleHeight(24),
    fontWeight: "600",
  },
  textBtnCancel: {
    fontSize: fontSize.size14,
    color: colors.palette.dolphin,
    lineHeight: scaleHeight(24),
    fontWeight: "600",
  },
});
