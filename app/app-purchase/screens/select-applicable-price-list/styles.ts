import { StyleSheet } from "react-native";
import { colors, scaleHeight, scaleWidth } from "../../theme";

export const Styles = StyleSheet.create({
    stylesBtnBottom: {
        // position: 'absolute',
        // bottom:0,
        backgroundColor: colors.white,
        padding: scaleWidth(16),
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    btnSave: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 7,
        padding: scaleWidth(12),
        backgroundColor: colors.white,
        alignItems: 'center',

        borderColor: colors.palette.navyBlue,
        width: scaleWidth(165)

    },
    btnSuccessfully: {
        width: scaleWidth(160),
        flex: 1,
        borderWidth: 1,
        borderRadius: 7,
        padding: scaleWidth(12),
        backgroundColor: colors.palette.navyBlue,
        alignItems: 'center',
        borderColor: colors.palette.navyBlue,

    },
    flexRow: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    stylesBTNSelect: {
        backgroundColor: colors.palette.aliceBlue2,
        borderWidth:1,
        borderColor: colors.palette.navyBlue,
        padding: 11,
        borderRadius:8,
        flex:1, 
        // marginRight:12,
        alignItems:'center' 

    },
    stylesBTNUnSelect: {
        flex:1,  
        backgroundColor: colors.palette.aliceBlue,
        borderWidth:1,
        borderColor: colors.palette.veryLightGrey,
        padding: 11,
        borderRadius:8,
        alignItems:'center' 

    },
    stylesTitle: {
        fontSize:scaleWidth(14),
        fontWeight: "600",
        marginBottom: scaleHeight(12)

    },
    itemPriceList: {
        flexDirection: "row",
        alignItems: "center",
        width: scaleWidth(375),
        height: scaleHeight(56),
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },
    dotsPriceList: {
        borderRadius: scaleHeight(8),
        borderWidth: 1,
        borderColor: colors.palette.lightGrey,
        width: scaleHeight(16),
        height: scaleHeight(16),
    }
})