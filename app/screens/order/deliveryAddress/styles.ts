import { StyleSheet } from "react-native";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme";

export const styles = StyleSheet.create({
    viewModal: {
        paddingVertical: scaleHeight(margin.margin_14),
        paddingHorizontal: scaleWidth(margin.margin_14),
        backgroundColor: colors.palette.neutral100,
        borderRadius: 8,
      },
      textAddressModal: {
        fontWeight: "700",
        fontSize: fontSize.size14,
        lineHeight: scaleHeight(24),
        color: colors.palette.nero,
        flex: 1,
      },
      textMoney2: {
        color: colors.palette.nero,
        fontWeight: "400",
        fontSize: fontSize.size12,
      },
      viewTextField: {
        marginBottom: scaleHeight(10),
        marginTop: scaleHeight(margin.margin_10),
        paddingBottom: scaleHeight(padding.padding_8),
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
      textListProduct: {
        fontWeight: "600",
        fontSize: fontSize.size12,
        color: colors.palette.nero,
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
      viewGroupBtn: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        paddingVertical: scaleHeight(20),
        width: '100%',
        position: 'absolute', 
        bottom: 0,
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
})