import { StyleSheet } from "react-native";
import { colors, fontSize, padding, scaleHeight, scaleWidth } from "../../../theme";


export const StylesClient = StyleSheet.create({
    body: {
        paddingHorizontal: scaleWidth(padding.padding_16),
       
    },
    bodyInfor: {
        height: scaleHeight(146),
        width: scaleWidth(343),
        backgroundColor: colors.palette.white,
        position: 'absolute',
        top: 66,
        zIndex: 1,
        marginHorizontal: scaleWidth(padding.padding_16),
        borderRadius: scaleWidth(8),
        
        paddingVertical: scaleWidth(padding.padding_16),
        // flexDirection:'row',
        // justifyContent:'space-between'
    },
    btnWriteTT: {
        width: scaleWidth(112), 
        height: scaleHeight(24),
        backgroundColor: colors.palette.navyBlue, 
        alignItems:'center',
        justifyContent:'center', 
        borderRadius:8,
        marginTop:scaleHeight(8)
    },
    txMoney: { 
        color: 'red', 
        fontWeight: '600', 
        fontSize:fontSize.size16
    }, 
    styleInforTop: {
        flexDirection:'row', 
        justifyContent:'space-between',
        paddingHorizontal: scaleWidth(padding.padding_16),
    }, 


})