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
    backgroundColor: "#F2F2F2",
    flex: 1,
  },
  rowBtnTab: {
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButtonCategory: {
    backgroundColor: "#fff",
    shadowColor: "#000",
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
    color: "#747475",
    textAlign: "center",
  },
  activeButtonText: {
    color: "black",
    fontSize: 13,
    fontWeight: "700",
  },
  discount: {
    backgroundColor: "#FF0000",
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
});
