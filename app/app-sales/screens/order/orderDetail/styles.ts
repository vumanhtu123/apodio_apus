import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../../app-purchase/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  viewScrollView: {
    backgroundColor: colors.palette.aliceBlue,
    flex: 1,
    paddingHorizontal: scaleWidth(padding.padding_16),
  },
  textListProduct: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    color: colors.palette.nero,
  },
  priceOriginal: {
    textDecorationLine: 'line-through',
    marginTop: scaleHeight(8),
    color: colors.palette.dolphin,
    fontSize: fontSize.size12,
  },
  logoHeader: {
    pointerEvents: "none",
    position: "absolute",
    right: -20,
  },
  viewHeader: {
    flexDirection: "row",
    height: scaleHeight(52),
    alignItems: "center",
  },
  textHeader: {
    color: colors.palette.neutral100,
    fontWeight: "700",
    fontSize: fontSize.size16,
    lineHeight: 24,
    alignContent: "center",
  },
  textButtonHeader: {
    fontWeight: "400",
    fontSize: fontSize.size9,
    lineHeight: 11,
    color: colors.palette.neutral100,
  },
  viewCode: {
    marginTop: scaleHeight(margin.margin_20),
    borderRadius: 8,
    backgroundColor: colors.palette.neutral100,
    height: scaleHeight(115),
  },
  viewStatus: {
    paddingHorizontal: padding.padding_8,
    // paddingVertical: padding.padding_2,
    justifyContent: "center",
    borderRadius: 2,
  },
  textStatus: {
    fontWeight: "400",
    fontSize: fontSize.size8,
    // lineHeight: 9.68,
  },
  buttonSend: {
    backgroundColor: colors.palette.navyBlue,
    borderRadius: 4,
    paddingVertical: scaleHeight(padding.padding_6),
    paddingHorizontal: scaleWidth(padding.padding_8),
  },
  viewContentCode: {
    paddingHorizontal: scaleWidth(padding.padding_16),
    paddingTop: scaleHeight(padding.padding_10),
    paddingBottom: scaleHeight(padding.padding_12),
    // backgroundColor : 'red'
  },
  textPayStatus: {
    fontWeight: "400",
    fontSize: fontSize.size10,
    color: colors.palette.malachite,
  },
  viewLine: {
    height: 1,
    backgroundColor: colors.palette.ghostWhite,
    marginHorizontal: scaleWidth(margin.margin_16),
  },
  viewAddress: {
    marginBottom: scaleHeight(margin.margin_15),
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    paddingHorizontal: scaleWidth(padding.padding_16),
    paddingVertical: scaleHeight(padding.padding_12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewPay: {
    marginVertical: scaleHeight(margin.margin_15),
    paddingVertical: scaleHeight(padding.padding_10),
    paddingHorizontal: scaleWidth(padding.padding_16),
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
  },
  viewName: {
    height: scaleHeight(55),
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: colors.palette.neutral100,
    marginVertical: scaleHeight(margin.margin_15),
    alignItems: "center",
  },
  viewImageName: {
    marginLeft: scaleWidth(margin.margin_16),
    marginRight: scaleWidth(margin.margin_8),
  },
  viewItemListProduct: {
    marginVertical: scaleHeight(margin.margin_12),
    marginHorizontal: scaleWidth(margin.margin_16),
    flexDirection: "row",
    alignItems: "center",
  },
  viewImageListProduct: {
    borderRadius: 16,
    marginRight: scaleWidth(margin.margin_10),
  },
  viewDetailOrder: {
    backgroundColor: colors.palette.neutral100,
    marginTop: scaleHeight(margin.margin_15),
    paddingVertical: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_16),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textPayStatus2: {
    fontWeight: "700",
    fontSize: fontSize.size10,
    color: colors.palette.malachite,
  },
  viewDateMoney: {
    paddingHorizontal: scaleWidth(padding.padding_16),
    paddingVertical: scaleHeight(padding.padding_9),
    flexDirection: "row",
  },
  textDateMoney: {
    fontWeight: "500",
    fontSize: fontSize.size10,
    color: colors.palette.dolphin,
  },
  viewCash: {
    paddingHorizontal: scaleWidth(padding.padding_16),
    backgroundColor: colors.palette.neutral100,
    paddingVertical: scaleHeight(padding.padding_12),
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: scaleHeight(margin.margin_20),
  },
  viewPayStatus: {
    paddingVertical: scaleHeight(padding.padding_2),
    paddingHorizontal: scaleWidth(padding.padding_10),
    backgroundColor: colors.palette.mintCream,
    borderRadius: 2,
  },
  textPayStatus3: {
    fontWeight: "400",
    lineHeight: 9.68,
    fontSize: fontSize.size8,
    color: colors.palette.malachite,
  },
  viewLineCash: {
    width: 1,
    marginHorizontal: scaleWidth(margin.margin_16),
    backgroundColor: colors.palette.ghostWhite,
    alignItems: "center",
    justifyContent: "center",
    height: scaleHeight(30),
  },
  viewTextCash: {
    borderRadius: 8,
    backgroundColor: colors.palette.aliceBlue,
    paddingVertical: scaleHeight(padding.padding_9),
    paddingHorizontal: scaleWidth(padding.padding_8),
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  viewCheckStatus: {
    marginTop: scaleHeight(margin.margin_16),
    marginBottom: scaleHeight(margin.margin_32),
    backgroundColor: colors.palette.neutral100,
    paddingHorizontal: scaleWidth(padding.padding_16),
    paddingVertical: scaleHeight(padding.padding_12),
    borderRadius: 8,
  },
  viewIconCheck: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: scaleHeight(margin.margin_8),
  },
  textContent: {
    fontWeight: "400",
    fontSize: fontSize.size10,
    color: colors.palette.dolphin,
  },
  textMoney: {
    color: colors.palette.nero,
    fontWeight: "400",
    fontSize: fontSize.size10,
  },
  textMoney2: {
    color: colors.palette.nero,
    fontWeight: "400",
    fontSize: fontSize.size12,
  },
  textTotalAmount: {
    color: colors.palette.radicalRed,
    fontWeight: "600",
    fontSize: fontSize.size12,
  },
  textTitleModal: {
    fontWeight: "500",
    fontSize: fontSize.size14,
    color: colors.palette.dolphin,
    textAlign: "center",
  },
  viewButtonCancel: {
    backgroundColor: colors.palette.neutral100,
    paddingHorizontal: scaleWidth(padding.padding_16),
    paddingVertical: scaleHeight(padding.padding_20),
  },
  textButtonCancel: {
    fontSize: fontSize.size14,
    fontWeight: "600",
    lineHeight: scaleHeight(24),
    color: colors.palette.neutral100,
  },
  buttonCancel: {
    // marginVertical: scaleHeight(margin.margin_12),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.palette.navyBlue,
    height: scaleHeight(52),
  },
  viewModal: {
    paddingVertical: scaleHeight(margin.margin_14),
    paddingHorizontal: scaleWidth(margin.margin_14),
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    position: "absolute",
    bottom: scaleWidth(15),
    right: 0,
    left: 0,
  },
  buttonCancelModal: {
    paddingVertical: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_48),
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.navyBlue,
    borderWidth: 1,
    flex: 1,
    marginRight: scaleWidth(margin.margin_12),
  },
  buttonConfirmModal: {
    paddingVertical: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_48),
    backgroundColor: colors.palette.navyBlue,
    flex: 1,
  },
  textAddressModal: {
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.palette.nero,
    flex: 1,
  },
  textCancelModal: {
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(16),
    color: colors.palette.radicalRed,
  },
  textAddAddress: {
    fontWeight: "400",
    fontSize: fontSize.size12,
    color: colors.palette.navyBlue,
    marginLeft: scaleWidth(margin.margin_4),
  },
  viewTextField: {
    marginBottom: scaleHeight(0),
    marginTop: scaleHeight(margin.margin_10),
    paddingBottom: scaleHeight(padding.padding_8),
  },
  circleStyle: {
    width: 40, // Adjust for desired circle size
    height: 40, // Adjust for desired circle size
    // borderRadius: '50%',
    backgroundColor: colors.gainsboro, // Adjust background color
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, // Add border for completed steps
    borderColor: colors.gainsboro, // Adjust border color
  },
  stepText: {
    fontSize: fontSize.size16,
    fontWeight: 'bold',
    color: colors.nightRider, // Adjust text color
  },
  labelText: {
    fontSize: fontSize.size14, // Adjust label text size
    color: colors.nightRider, // Adjust label text color
    marginTop: 5, // Adjust spacing between circle and label
  },
  rightBar: {
    position: 'absolute',
    top: '40%', // Center the bar vertically
    right: 0, // Align to the right edge
    width: scaleWidth(48), // Stretch the bar across the entire width
    height: 1, // Set the bar height to 1 pixel
    backgroundColor: colors.malachite,
    left: scaleWidth(45)
  },
  titleHeader: {
    justifyContent: "flex-start",
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  viewButton: {
    backgroundColor: colors.navyBlue,
    borderRadius: 8,
    height: scaleHeight(48),
    // marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(12),
    // marginTop: scaleHeight(15)
  },
  textButton: {
    fontWeight: "600",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.textWhite,
  },
});
