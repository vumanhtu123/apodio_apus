import { StyleSheet } from "react-native";
import { colors, fontSize, margin, padding, palette, scaleHeight, scaleWidth } from "../../../../theme";

export const styles = StyleSheet.create({
    ROOT: {
        backgroundColor: "#Ffffff",
        flex: 1,
    },
    titleHeader: {
        justifyContent: "flex-start",
        paddingLeft: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    textNameClassification: {
        fontWeight: "400",
        fontSize: fontSize.size10,
        lineHeight: scaleHeight(12.1),
        color: colors.palette.dolphin,
    },
    textDolphin12: {
        fontWeight: "400",
        fontSize: fontSize.size12,
        color: colors.palette.dolphin,
    },
    viewNameClassification: {
        width: scaleWidth(125),
        height: scaleHeight(56),
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: colors.palette.aliceBlue,
        marginRight: scaleWidth(margin.margin_10),
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: scaleHeight(padding.padding_8),
        paddingHorizontal: scaleWidth(padding.padding_8),
    },
    viewImage: {
        width: scaleWidth(72),
        height: scaleHeight(72),
        borderRadius: 10,
        marginRight: 12,
    },
    viewCaret: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: scaleHeight(margin.margin_10),
    },
    viewDescribe: {
        marginHorizontal: scaleWidth(margin.margin_16),
        backgroundColor: colors.palette.neutral100,
        paddingVertical: scaleHeight(padding.padding_20),
    },
    textTitle: {
        fontWeight: "700",
        fontSize: fontSize.size12,
        lineHeight: scaleHeight(14.52),
        color: colors.palette.neutral900,
        marginBottom: scaleHeight(margin.margin_12),
    },
    textNameNCC: {
        marginBottom: scaleHeight(2),
        fontWeight: "500",
        fontSize: fontSize.size10,
        color: colors.palette.nero,
    },
    viewLine: { height: scaleHeight(12), backgroundColor: "#F3F4F9" },
    viewDetails: {
        borderWidth: scaleHeight(1),
        marginVertical: scaleHeight(margin.margin_10),
        marginHorizontal: scaleWidth(margin.margin_16),
        borderRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: "#3A43E5",
        shadowOpacity: 0.25,
        backgroundColor: colors.palette.neutral100,
        borderColor: colors.palette.ghostWhite,
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
    viewWeight: {
        flexDirection: "row",
        alignItems: "center",
    },
    fontSizeWeight: {
        color: palette.dolphin,
        fontSize: fontSize.size12,
    },
});