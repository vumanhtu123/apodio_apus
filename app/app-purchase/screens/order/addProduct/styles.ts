import { Platform, StyleSheet } from "react-native";
import { colors, fontSize, margin, padding, palette, scaleHeight, scaleWidth } from "../../../theme";

export const styles = StyleSheet.create({
    ROOT: {
      backgroundColor: colors.white,
      flex: 1,
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
      borderBottomLeftRadius: scaleWidth(margin.margin_12),
      borderTopRightRadius: scaleWidth(margin.margin_12),
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
      paddingHorizontal: scaleWidth(8),
      paddingVertical: scaleWidth(8),
      marginRight: scaleWidth(10),
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
      marginVertical: scaleHeight(16),
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
    viewModal: {
        // height: Dimensions.get("screen").height * 0.3,
        backgroundColor: colors.palette.neutral100,
        borderTopRightRadius: scaleWidth(margin.margin_8),
        borderTopLeftRadius: scaleWidth(margin.margin_8),
        paddingVertical: scaleHeight(padding.padding_12),
        paddingHorizontal: scaleWidth(padding.padding_16),
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      },
      textButtonCancel: {
        color: colors.palette.dolphin,
        fontWeight: "700",
        fontSize: fontSize.size14,
        lineHeight: scaleHeight(24),
      },
      viewImageSelectVariant: {
        width: scaleWidth(70),
        height: scaleHeight(70),
        borderRadius: scaleWidth(margin.margin_10),
        marginRight: scaleWidth(10),
    },
    viewBodySelectVariant: {
      flex: 1,
      marginHorizontal: scaleWidth(16),
      marginVertical: scaleHeight(20),
      justifyContent: "flex-start",
  },textDetailInfor: {
    flex: 1,
    fontWeight: "700",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.nero,
},textViewInfo: {
  fontWeight: "400",
  fontSize: fontSize.size12,
  lineHeight: scaleHeight(14.52),
  color: colors.navyBlue,
},
  });

  export const stylesVariant = StyleSheet.create({
    ROOT: {

    },
  })