/* eslint-disable react-native/no-color-literals */
import { Dimensions, Platform, StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  margin,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../theme";

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.gray,
    flex: 1,
  },
  animatedButton: {
    padding: 10, // Add padding if needed, adjust as necessary
  },
  btnTab: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
    marginTop: scaleHeight(20),
  },
  rowBtnTab: {
    flexDirection: "row",
    backgroundColor: colors.solitude1,
    borderRadius: 8,
    padding: scaleWidth(2),
  },
  rowTabType: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: scaleWidth(16),
  },
  buttonProduct: {
    borderRadius: 8,
    paddingHorizontal: scaleWidth(28),
    paddingVertical: scaleHeight(4),
  },
  activeButton: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButtonCategory: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: fontSize.size13,
    // lineHeight: 20,
    fontWeight: "700",
    color: colors.dolphin,
    textAlign: "center",
  },
  activeButtonText: {
    color: colors.navyBlue,
  },
  discount: {
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    width: scaleWidth(32),
    height: scaleHeight(16),
    position: "absolute",
    zIndex: 10,
    // borderBottomEndRadius: 5,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    // top : 10,
    right: scaleHeight(0),
  },
  btnBottom: {
    borderRadius: 8,
    marginHorizontal: scaleWidth(16),
    marginBottom: Platform.OS == "ios" ? scaleHeight(45) : scaleHeight(40),
    backgroundColor: "white",
    borderWidth: 0,
  },
  textButton: {
    color: palette.white,
    fontSize: fontSize.size14,
    fontWeight: "700",
    lineHeight: 24,
    textAlign: "center",
    display: "flex",
  },
  radioButton: {
    width: scaleWidth(18),
    height: scaleHeight(18),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioButtonSelected: {
    backgroundColor: colors.palette.navyBlue,
    borderWidth: 0,
  },
  radioButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: fontSize.size10,
  },
  titleHeader: {
    justifyContent: "flex-start",
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  btnCreateProduct: {
    position: "absolute",
    bottom: scaleHeight(40),
    zIndex: 1,
    right: scaleWidth(16),
  },
  tabButton: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
  },
  tabButtonActive: {
    backgroundColor: colors.white,
    borderColor: colors.navyBlue,
  },
  tabButtonInactive: {
    backgroundColor: colors.whiteSmoke,
    borderColor: colors.veryLightGrey,
  },
  tabText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: fontSize.size10,
  },
  tabTextActive: {
    color: colors.navyBlue,
  },
  tabTextInactive: {
    color: colors.dolphin,
  },
  containerFilter: {
    marginRight: scaleHeight(16),
    flexDirection: "row",
    alignItems: "center",
  },
  btnFilterByCategory: {
    borderRadius: 4,
    paddingVertical: scaleHeight(8),
    marginLeft: scaleWidth(5),
    borderWidth: 1,
    borderColor: colors.navyBlue,
    flexDirection: "row",
    width: scaleWidth(110),
    justifyContent: "space-between",
  },
  textBtnFilter: {
    color: colors.navyBlue,
    textAlign: "center",
    fontWeight: "400",
    fontSize: fontSize.size10,
    marginLeft: scaleWidth(8),
    marginRight: scaleWidth(10),
    maxWidth: scaleWidth(80),
    flex: 1,
  },
  containerProduct: {
    flex: 1,
    marginTop: scaleHeight(16),
    marginHorizontal: scaleWidth(16),
  },
  btnCreateCategory: {
    position: "absolute",
    bottom: scaleHeight(40),
    zIndex: 1,
    right: scaleWidth(16),
    borderRadius: 40,
    backgroundColor: colors.navyBlue,
  },
});

export const stylesItem = StyleSheet.create({
  content: {
    color: colors.palette.navyBlue,
    fontSize: fontSize.size10,
  },

  icon: {
    marginTop: 0,
    marginBottom: 5,
    // backgroundColor : 'red'
  },
  item: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: scaleHeight(10),
  },
  title: {
    color: colors.jaguar,
    fontSize: fontSize.size10,
    fontWeight: "700",
  },
  titleView: {
    alignItems: "flex-start",
  },
  description: {
    fontSize: fontSize.size9,
    color: "#888",
    fontStyle: "italic",
    // marginBottom: 4,
  },
  columnWrapper: {
    // justifyContent: 'space-between',
    // marginBottom: scaleHeight(16),
  },
});

export const stylesWeight = StyleSheet.create({
  viewParent: {
    flexDirection: "column",
    backgroundColor: colors.white,
  },
  textTittle: {
    color: colors.nero,
    fontWeight: "700",
    fontSize: 14,
  },
  textOriginal: {
    fontSize: fontSize.size12,
    fontWeight: "400",
    color: colors.nero,
    marginVertical: scaleHeight(15),
  },
  viewCheckList: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: scaleHeight(10),
  },
  textWeightConversion: {
    color: colors.nero,
    fontSize: 12,
    fontWeight: "400",
  },
  textAddLine: {
    color: colors.navyBlue,
    fontSize: fontSize.size12,
    fontWeight: "400",
  },
  viewItemOriginal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: scaleWidth(6),
  },
  textItemOriginal: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "400",
    width: scaleWidth(80),
  },
  textFieldOriginal: {
    color: colors.dolphin,
    fontSize: 12,
    fontWeight: "500",
    marginTop: scaleHeight(20),
  },
  textFieldVolumeOriginal: {
    color: colors.dolphin,
    fontSize: 12,
    fontWeight: "500",
    marginTop: scaleHeight(20),
  },
  viewItemConversion: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    // marginHorizontal: 6,
  },
  viewItemConversion2: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "25%",
    marginRight: scaleWidth(2),
  },
  viewInputSelect: {
    backgroundColor: "transparent",
    width: scaleHeight(60),
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  viewDropdown: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: scaleHeight(25),
  },
  viewLine: {
    height: 1,
    backgroundColor: colors.quartz,
    marginBottom: 3,
  },
  textConversion: {
    color: "#747475A6",
    fontSize: 10,
    fontWeight: "500",
    width: "90%",
  },
  textFieldWeight: {
    color: colors.dolphin,
    fontSize: 12,
    fontWeight: "500",
    marginTop: scaleHeight(20),
  },
  textFieldVolume: {
    color: colors.dolphin,
    fontSize: 12,
    fontWeight: "500",
    marginTop: scaleHeight(20),
  },
});

export const stylesCategory = StyleSheet.create({
  textRN: {
    textAlign: "center",
    width: scaleWidth(68),
    height: scaleHeight(5),
    backgroundColor: colors.veryLightGrey1,
    borderRadius: 8,
    // marginTop: scaleHeight(8),
    alignSelf: "center",
  },
  viewTextCategory: {
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(16),
  },
  textCategory: {
    fontWeight: "700",
    fontSize: fontSize.size14,
    // lineHeight: scaleHeight(24),
    color: colors.palette.nero,
  },
  viewIconSearch: {
    position: "absolute",
    bottom: scaleHeight(20),
    left: scaleWidth(20),
  },
  textInput: {
    fontSize: fontSize.size14,
    fontWeight: "400",
    paddingVertical: scaleHeight(3),
    marginVertical: scaleHeight(10),
    marginHorizontal: scaleWidth(10),
    borderWidth: 0.3,
    borderRadius: 5,
    paddingLeft: scaleWidth(30),
  },
});

export const stylesCreateDirectory = StyleSheet.create({
  handleLib: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(7),
    marginBottom: scaleHeight(10),
  },
  handleCamera: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(7),
  },
  autoImage: {
    width: scaleWidth(107),
    height: scaleHeight(70),
    borderRadius: 8,
  },
  viewClose: {
    position: "absolute",
    right: scaleWidth(5),
    top: scaleHeight(5),
  },
  handleLib2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    marginRight: scaleWidth(10),
    borderRadius: 8,
  },
  viewAddImage: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(7),
  },
  handleCamera2: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    borderRadius: 8,
  },
  viewIcCamera: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(7),
  },
  viewButton1: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: scaleHeight(15),
  },
  handleOnClickClose: {
    width: scaleWidth(166),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginRight: scaleWidth(12),
    borderRadius: 10,
    borderColor: colors.veryLightGrey,
  },
  handleSubmit: {
    width: scaleWidth(166),
    height: scaleHeight(48),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.navyBlue,
  },
});

export const stylesDescribe = StyleSheet.create({
  keyboardView: { flex: 1, justifyContent: "center", alignItems: "center" },
  viewTittle: {
    maxHeight: Dimensions.get("screen").height * 0.6,
    width: "100%",
    backgroundColor: colors.palette.neutral100,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    position: "absolute",
    bottom: scaleHeight(0),
  },
  textTittle: {
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.palette.nero,
    marginLeft: scaleWidth(margin.margin_24),
    marginVertical: scaleHeight(margin.margin_16),
  },
  viewTextField: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleWidth(16),
  },
  styleTextField: {
    width: Dimensions.get("screen").width - scaleWidth(32),
    height: Dimensions.get("screen").height * 0.3,
    marginBottom: scaleHeight(10),
  },
  viewButton: {
    marginHorizontal: scaleWidth(margin.margin_16),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(margin.margin_15),
  },
  styleButtonCancel: {
    height: scaleHeight(48),
    backgroundColor: colors.palette.neutral100,
    borderWidth: 1,
    borderColor: colors.palette.veryLightGrey,
    width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
    borderRadius: 8,
  },
  textButtonCancel: {
    color: colors.palette.dolphin,
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
  buttonConfirm: {
    height: scaleHeight(48),
    backgroundColor: colors.palette.navyBlue,
    width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
    borderRadius: 8,
  },
  textButtonConfirm: {
    color: colors.palette.neutral100,
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
});

export const stylesModalPrice = StyleSheet.create({
  keyboardView: { flex: 1, justifyContent: "flex-end", alignItems: "flex-end" },
  viewModal: {
    maxHeight: Dimensions.get("screen").height * 0.6,
    width: "100%",
    backgroundColor: colors.palette.neutral100,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    position: "absolute",
    bottom: 0,
  },
  viewTextTittle: {
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.palette.nero,
    marginLeft: scaleWidth(margin.margin_24),
    marginVertical: scaleHeight(margin.margin_16),
  },
  line: {
    height: scaleHeight(1),
    backgroundColor: colors.palette.ghostWhite,
  },
  viewItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scaleWidth(16),
    marginTop: scaleHeight(margin.margin_16),
  },
  buttonAdd: {
    height: scaleHeight(38),
    borderWidth: 1,
    flexDirection: "row",
    borderColor: colors.palette.navyBlue,
    backgroundColor: colors.palette.neutral100,
    marginHorizontal: scaleWidth(margin.margin_16),
    alignItems: "center",
    borderRadius: 8,
    marginTop: scaleHeight(margin.margin_20),
    marginBottom: scaleHeight(margin.margin_15),
  },
  textAdd: {
    color: colors.palette.navyBlue,
    fontWeight: "600",
    fontSize: fontSize.size14,
    marginLeft: scaleWidth(6),
  },
  viewCancel: {
    marginHorizontal: scaleWidth(margin.margin_16),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(margin.margin_15),
  },
  buttonCancel: {
    height: scaleHeight(48),
    backgroundColor: colors.palette.neutral100,
    borderWidth: 1,
    borderColor: colors.palette.veryLightGrey,
    width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
    borderRadius: 8,
  },
  textCancel: {
    color: colors.palette.dolphin,
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
  buttonAccept: {
    height: scaleHeight(48),
    backgroundColor: colors.palette.navyBlue,
    width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
    borderRadius: 8,
  },
  textAccept: {
    color: colors.palette.neutral100,
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
  styleBTN1: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 8,
  },
});

export const stylesModalInit = StyleSheet.create({
  textInit: {
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.palette.nero,
    marginVertical: scaleHeight(margin.margin_16),
  },
  viewButton: {
    marginTop: scaleWidth(margin.margin_10),
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(margin.margin_15),
  },
  viewButtonSave: {
    marginRight: scaleHeight(8),
    height: scaleHeight(48),
    backgroundColor: colors.palette.neutral100,
    borderWidth: 1,
    borderColor: colors.palette.veryLightGrey,
    width: (Dimensions.get("screen").width - scaleWidth(44)) * 0.48,
    borderRadius: 8,
  },
  textButtonSave: {
    color: colors.palette.dolphin,
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
  buttonSaveChange: {
    marginLeft: scaleHeight(8),
    height: scaleHeight(48),
    backgroundColor: colors.palette.navyBlue,
    width: (Dimensions.get("screen").width - scaleWidth(44)) * 0.48,
    borderRadius: 8,
  },
  textButtonSaveChange: {
    color: colors.palette.neutral100,
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
});
