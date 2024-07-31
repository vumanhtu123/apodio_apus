/* eslint-disable react-native/no-color-literals */
import { Dimensions, Platform, StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../../theme";

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.gray,
    flex: 1,
    justifyContent: "space-between",
  },
  rowBtnTab: {
    justifyContent: "center",
    alignItems: "center",
  },
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
  rowNotiType: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(12),
  },

  buttonProduct: {
    width: scaleWidth(169),
    height: scaleHeight(32),
    paddingVertical: scaleHeight(5),
    // paddingHorizontal: scaleWidth(60),
    borderRadius: 8,
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
    fontSize: 13,
    fontWeight: "700",
    color: colors.dolphin,
    textAlign: "center",
  },
  activeButtonText: {
    color: "black",
    fontSize: 13,
    fontWeight: "700",
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
    // bottom: scaleHeight(40),
    // left: scaleWidth(16),
    // // position: "absolute",
    // right: scaleWidth(16),
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
    // paddingLeft: scaleWidth(15),
    textAlign: "center",
    display: "flex",
    // flexWrap: 'wrap',
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
  StyleTab: {
    flexDirection: "row",
    backgroundColor: colors.solitude1,
    borderRadius: 8,
    padding: 3,
    marginTop: scaleWidth(20),
    justifyContent: "center",
  },
  btnDropDowCategory :{
    borderRadius: 4,
    paddingHorizontal: 7,
    paddingVertical: 8,
    marginVertical: 12,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: colors.navyBlue,
    flexDirection: "row",
    marginRight: 20,

  },
  textDropDow: {
    color: colors.navyBlue,
    textAlign: "center",
    fontWeight: "400",
    fontSize: fontSize.size10,
    marginRight: scaleWidth(10),
  },

  btnAdd: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    position: "absolute",
    paddingHorizontal: scaleWidth(18),
    paddingVertical: scaleHeight(8),
    backgroundColor: colors.palette.navyBlue,
    bottom: Platform.OS === "ios" ? scaleHeight(20) : scaleHeight(5),
    right: scaleWidth(16),
  }
});
