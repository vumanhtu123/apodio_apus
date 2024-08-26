import { StyleSheet } from "react-native";
import { colors, scaleHeight, scaleWidth } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(20),
  },
  TextTabbar: {
    fontSize: 12,
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(12),
    backgroundColor: colors.palette.white,
    borderRadius: scaleWidth(8),
  },
  styleNumber: {
    fontSize: scaleWidth(12),
    fontWeight: "600",
  },
  styleTextgray: {
    fontSize: scaleWidth(12),
    color: colors.palette.dolphin,
  },
  line: {
    marginVertical: scaleWidth(8),
    borderWidth: 1,
    borderColor: colors.ghostWhite,
  },
  lineModal: {
    marginTop: scaleWidth(18),
    marginBottom: scaleHeight(25),
    borderWidth: 1,
    borderColor: colors.ghostWhite,
  },
  textTime: {
    fontSize: scaleWidth(14),
    fontWeight: "600",
  },
  groupContainer: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: 'red',
    borderRadius: 5,
  },
  dateText: {
    fontSize: scaleWidth(12),
    marginBottom: 5,
    textAlign: "center",
    color: colors.palette.dolphin,
  },
  productContainer: {
    // backgroundColor: "yellow",
    paddingHorizontal: scaleWidth(10),
  },
  productName: {
    fontSize: scaleWidth(12),
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
  },
  productCode: {
    fontSize: 14,
    color: "gray",
  },
  productQuantity: {
    fontSize: 14,
  },
  productDay: {
    fontSize: 14,
    fontStyle: "italic",
  },
  styleBTNBottom: {
    padding: scaleWidth(16),
    backgroundColor: colors.white,
  },
  StyleTextBtn: {
    paddingHorizontal: scaleWidth(19),
    paddingVertical: scaleHeight(12),
    borderRadius: scaleWidth(8),
  },
  modalText: {
    textAlign: "center",
    width: scaleWidth(68),
    height: scaleHeight(5),
    backgroundColor: colors.veryLightGrey1,
    borderRadius: 8,
    alignSelf: "center",
  },
  bodyModal: {
    marginTop: scaleHeight(25),
    paddingHorizontal: scaleWidth(15),
    paddingBottom: scaleWidth(15),
  },
  lineHeaderModal: {
    height: scaleHeight(5),
    backgroundColor: colors.veryLightGrey1,
    width: scaleWidth(68),
    borderRadius: 100,
    alignSelf: "center",
    marginTop: scaleHeight(8),
  },
  textFilter: {
    fontSize: scaleWidth(14),
    fontWeight: "700",
  },
  textCancel: {
    fontSize: scaleWidth(14),
    fontWeight: "700",
    color: colors.palette.textExCancle,
  },
  styleIemTime: {
    padding: scaleWidth(11),
    alignItems: "center",
    borderRadius: scaleWidth(8),

    marginHorizontal: scaleHeight(6),
    marginVertical: scaleWidth(6),
  },
  textTiemItem: {},
  bodyClender: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    // height: "auto",
    // height: 330,
    // maxHeight:350,
    // paddingTop: scaleHeight(13),
    marginVertical: scaleHeight(15),
  },
  stytleTitle: {
    color: colors.dolphin,
    fontSize: scaleWidth(14),
    fontWeight: "600",
    marginTop: scaleHeight(20),
  },
  styleBtnReport: {
    width: scaleWidth(165),
    height: scaleHeight(60),
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
