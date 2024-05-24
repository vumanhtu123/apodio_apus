/* eslint-disable react-native/no-color-literals */
import { Dimensions, Platform, StyleSheet } from "react-native";
import {
  colors,
  fontSize,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../theme";

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: "#Ffffff",
    flex: 1,
  },
  btnTab: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
    marginTop: scaleHeight(20),
  },
  rowBtnTab : {
    flexDirection: "row",
    backgroundColor: "#E6E7EA",
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
    fontSize: fontSize.size13,
    // lineHeight: 20,
    fontWeight: "700",
    color: "#747475",
    textAlign: "center",
  },
  activeButtonText: {
    color: "#0078D4",
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
  titleHeader : {
    justifyContent: "flex-start",
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  btnCreateProduct : {
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
    backgroundColor: "#FFFFFF",
    borderColor: "#0078D4",
  },
  tabButtonInactive: {
    backgroundColor: "#F4F4F4",
    borderColor: "#c8c8c8",
  },
  tabText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: fontSize.size10,
  },
  tabTextActive: {
    color: "#0078D4",
  },
  tabTextInactive: {
    color: "#747475",
  },
  containerFilter : {
    marginRight: scaleHeight(16),
    flexDirection: "row",
    alignItems: "center",
  },
  btnFilterByCategory : {
    borderRadius: 4,
    paddingVertical: scaleHeight(8),
    marginLeft: scaleWidth(10),
    borderWidth: 1,
    borderColor: "#0078D4",
    flexDirection: "row",
    width: scaleWidth(110),
    justifyContent: 'space-between'
  },
  textBtnFilter : {
    color: "#0078D4",
    textAlign: "center",
    fontWeight: "400",
    fontSize: fontSize.size10,
    marginLeft: scaleWidth(8),
    marginRight: scaleWidth(10),
    maxWidth: scaleWidth(80),
    flex: 1,
  },
  containerProduct : {
    flex: 1,
    marginVertical: scaleHeight(16),
    marginHorizontal: scaleWidth(16),
  },
  btnCreateCategory : {
    position: "absolute",
    bottom: scaleHeight(40),
    zIndex: 1,
    right: scaleWidth(16),
    borderRadius: 40,
    backgroundColor: "#0078D4",
  }
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
    shadowColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    // marginHorizontal: 8,

    marginBottom: scaleHeight(16),
  },
  title: {
    color: "#242426",
    fontSize: fontSize.size10,
    fontWeight: "700",
    lineHeight: 16,
    
    // textAlign: 'left'
  },
  titleView: {
    alignItems: "flex-start",
    // width: scaleWidth(87),
    // height: scaleHeight(38),
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

