import { StyleSheet } from "react-native";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { styles } from "../orderScreen/styles";

export const Styles = StyleSheet.create({
    stylesBtnBottom: {
        // position: 'absolute',
        // bottom:0,
        backgroundColor: '#FFF',
        padding: scaleWidth(16),
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    btnSave: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 7,
        padding: scaleWidth(12),
        backgroundColor: '#FFF',
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

    }
})