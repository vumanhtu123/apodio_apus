import { StyleSheet } from "react-native";
import { colors, margin, padding, scaleHeight, scaleWidth } from "../../../../theme";

export const Styles = StyleSheet.create({
    btnAddFunds: { 
        backgroundColor: colors.palette.navyBlue, 
        flexDirection: 'row', 
        padding: padding.padding_8, 
        width: scaleWidth(150), 
        borderRadius: scaleWidth(400), 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    boxHeader: { 
        marginTop: scaleHeight(5), 
        backgroundColor: '#FFF', 
        paddingVertical: padding.padding_10, 
        paddingHorizontal: padding.padding_32, 
        marginBottom: margin.margin_15 
    },
    btnTransferMoney: {
        borderWidth: 1, 
        padding: padding.padding_7, 
        borderRadius: scaleWidth(8), 
        borderColor: colors.palette.navyBlue, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})