import { Dimensions, Platform, StyleSheet } from "react-native";
import {
  scaleWidth,
  scaleHeight,
  colors,
  padding,
  fontSize,
  margin,
} from "../../theme";

export const Styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  body: {
    marginTop: scaleHeight(20),
    marginLeft: scaleWidth(16),
  },
  bodyContainer: {
    flex: 1,
    // backgroundColor:'#FFF' ,
    marginTop: scaleHeight(12),
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(20),
  },

  bodyItemTabar: {
    width: scaleWidth(70),
    height: scaleHeight(70),
    paddingHorizontal: scaleWidth(10),
    paddingTop: scaleWidth(10),
    paddingBottom: scaleWidth(19),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleWidth(8),
    marginRight: scaleWidth(8),
  },
  styleItemTabarIsclick: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
    marginRight: 8,
  },
  styleItemTabar: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.palette.veryLightGrey,
    marginRight: 8,
  },
  section: {
    marginTop: scaleHeight(12),
    marginBottom: scaleHeight(12),
    padding: scaleWidth(15),
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  line: {
    marginVertical: scaleHeight(16),
    borderWidth: 1,
    width: "100%",
    borderColor: "#E7EFFF",
  },
  headerSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  survivalValue: {
    width: "23%",
    // backgroundColor:'blue',
    textAlign: "center",
    fontSize: scaleWidth(12),
    color: colors.palette.dolphin,
  },
  bottomTxt: {
    fontSize: scaleWidth(12),
    color: colors.palette.dolphin,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomSectionLeft: {
    flex: 1,
    // backgroundColor:'red',
    alignItems: "center",
  },
  flexrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txtItemWareHouse: {
    fontSize: scaleWidth(10),
    color: colors.palette.dolphin,
  },
  btnPlus: {
    position: "absolute",
    bottom: 0,
    end: 0,
    borderRadius: scaleWidth(40),
    height: scaleWidth(40),
    width: scaleWidth(40),
    backgroundColor: colors.palette.navyBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTurnOnInvetory: {
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(7),
  },
  itemList: {
    flex: 1,
    flexDirection: "row",
    padding: scaleHeight(6),
    borderRadius: scaleWidth(8),
    backgroundColor: "#FFFFFF",
    marginBottom: scaleHeight(12),
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export const stylesWareHouse = StyleSheet.create({
  containerView: {
    // backgroundColor: "white",
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(20),
    justifyContent: "space-between",
    flex: 1,
  },
  inputPass:
    Platform.OS === "ios"
      ? {
          fontSize: 16,
        }
      : {
          fontSize: 16,
        },
  selected: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: scaleWidth(9),
    paddingVertical: scaleHeight(10),
    marginRight: scaleWidth(5),
  },
  textConfig: {
    fontSize: fontSize.size14,
    fontWeight: "400",
    color: "#747475",
    marginHorizontal: scaleWidth(5),
  },
  modalContainer: {
    height: "50%",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    paddingVertical: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_16),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // marginHorizontal : 15
  },
  textTitleModal: {
    marginVertical: scaleHeight(18),
    marginLeft: scaleWidth(9),
    fontWeight: "700",
    fontSize: fontSize.size14,
    color: colors.palette.nero,
  },
  viewModalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(margin.margin_15),
    marginTop: scaleHeight(10),
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
  item: {
    paddingVertical: scaleHeight(10),
    flexDirection: "row",
    paddingHorizontal: scaleWidth(3),
    alignItems: "center",
  },
  itemText: {
    fontSize: fontSize.size14,
  },
});
