import { StyleSheet } from "react-native";
import { colors, padding, scaleHeight, scaleWidth } from "../../../theme";


export const StylesClient = StyleSheet.create({
    body: {
        paddingHorizontal: scaleWidth(padding.padding_16),
       
    },
    bodyInfor: {
        height: scaleHeight(136),
        width: scaleWidth(343),
        backgroundColor: colors.palette.white,
        position: 'absolute',
        top: 66,
        zIndex: 1,
        marginHorizontal: scaleWidth(padding.padding_16),
        borderRadius: scaleWidth(8),
        
        // padding: scaleWidth(padding.padding_16),
        // flexDirection:'row',
        // justifyContent:'space-between'
    },
    btnWriteTT: {
        width: scaleWidth(112), 
        height: scaleHeight(24), 
        paddingVertical: scaleHeight(padding.padding_6), 
        paddingHorizontal: scaleWidth(8), 
        backgroundColor: colors.palette.navyBlue, 
        alignItems:'center', 
        borderRadius:8,
        marginTop:scaleHeight(8)
    },
    txMoney: { 
        color: 'red', 
        fontWeight: '600', 
        fontSize: scaleWidth(16)
    }, 
    styleInforTop: {
        flexDirection:'row', 
        justifyContent:'space-between',
        padding: scaleWidth(padding.padding_16),
    }, 


})