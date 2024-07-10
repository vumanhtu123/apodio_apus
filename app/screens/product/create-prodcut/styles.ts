import { StyleSheet } from "react-native";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme";

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.palette.ghostWhite2,
    flex: 1,
  },
  viewLine: { height: scaleHeight(12), backgroundColor: "#F3F4F9" },
  viewDetails: {
    marginVertical: scaleHeight(margin.margin_10),
    marginHorizontal: scaleWidth(margin.margin_16),
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#3A43E5",
    shadowOpacity: 0.25,
    backgroundColor: colors.palette.neutral100,
  },
  viewTitleDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(margin.margin_12),
    marginBottom: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_12),
  },
  viewLine2: {
    borderWidth: scaleHeight(1),
    borderColor: colors.palette.ghostWhite,
  },
  btnLibrary: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(7),
    marginBottom: scaleHeight(10),
  },
  btnCamera: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(7),
  },
  btnAddProperties: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: scaleHeight(7),
    borderRadius: 8,
    borderColor: colors.palette.navyBlue,
  },
  viewBtnCamera: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
    marginRight: scaleWidth(10),
    borderRadius: 8,
  },
  btnCamera2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(7),
  },
  viewBtnLibrary: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
    borderRadius: 8,
  },
  viewLinePriceProduct: {
    flexDirection: "row",
    marginTop: scaleHeight(15),
    flex: 1,
    justifyContent: "space-between",
  },
  viewBtnPriceProduct: {
    borderRadius: 8,
    backgroundColor: colors.palette.aliceBlue,
    height: scaleHeight(56),
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
    width: "48%",
  },
  viewViewDetail: {
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(20),
  },
  viewLineSwitchUnit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scaleHeight(15),
  },
  viewBtnInMorInfo: {
    borderWidth: 1,
    alignItems: "center",
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(8),
    borderColor: "#0078d4",
    borderRadius: 4,
    marginLeft: scaleWidth(8),
  },
  viewGroupBtn: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    paddingVertical: scaleHeight(20),
  },
  viewBtnCancel: {
    width: scaleWidth(165),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.palette.veryLightGrey,
  },
  viewBtnConfirm: {
    width: scaleWidth(150),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.palette.navyBlue,
  },
  paginationDotStyle: {
    borderRadius: 8,
    height: scaleHeight(14),
    width: scaleWidth(14),
    borderColor: colors.palette.neutral100,
    borderWidth: 2,
  },
  paginationInactiveDotStyle: {
    width: scaleWidth(8),
    height: scaleHeight(8),
    borderRadius: 5,
    borderColor: "#BBB9B9",
    borderWidth: 2,
  },
  viewItemCarousel: {
    height: scaleHeight(416),
    width: scaleWidth(294),
    borderRadius: 16,
    alignSelf: "center",
  },
  viewBtnPriceVariants: {
    borderRadius: 8,
    backgroundColor: colors.palette.aliceBlue,
    height: scaleHeight(56),
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
    width: scaleWidth(180),
    marginRight: scaleWidth(10),
  },
  viewTextFieldVariants: {
    marginRight: scaleWidth(10),
    width: scaleWidth(180),
    height: scaleHeight(56),
  },

  textBtnCamera: { fontSize: fontSize.size14, color: colors.palette.navyBlue },
  textTextField: {
    fontSize: fontSize.size16,
    fontWeight: "500",
    color: colors.palette.nero,
    lineHeight: scaleHeight(24),
  },
  textTextFieldNoData: {
    fontSize: fontSize.size16,
    fontWeight: "500",
    color: colors.palette.dolphin,
    lineHeight: scaleHeight(24),
  },
  textTitleViewPrice: {
    fontWeight: "500",
    fontSize: fontSize.size12,
    color: colors.palette.dolphin,
    lineHeight: scaleHeight(14),
  },
  textTitleView: {
    fontSize: fontSize.size14,
    fontWeight: "700",
    marginBottom: scaleHeight(15),
  },
  textWeight400Black: {
    fontSize: fontSize.size13,
    fontWeight: "400",
    color: colors.palette.nero,
  },
  textWeight400Blue: {
    fontSize: fontSize.size12,
    fontWeight: "400",
    color: colors.palette.navyBlue,
    marginLeft: scaleWidth(4),
  },
  textWeight400Dolphin: {
    fontSize: fontSize.size13,
    fontWeight: "400",
    color: colors.palette.dolphin,
  },
  textWeight600: { fontSize: fontSize.size14, fontWeight: "600" },
  textBtnMorInfo: {
    color: colors.palette.navyBlue,
    fontSize: fontSize.size10,
    fontWeight: "400",
    lineHeight: scaleHeight(12.1),
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
