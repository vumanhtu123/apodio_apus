import { StyleSheet } from "react-native";
import { colors, padding, scaleHeight, scaleWidth } from "../../../theme";

export const Styles = StyleSheet.create({
    item:{ 
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10,
        width:scaleWidth(107), 
        height: scaleHeight(100), 
        marginBottom:scaleHeight(padding.padding_12), 
        flexGrow:1,
    },

    btnContinue: {
        width:scaleWidth(343),
        height:scaleHeight(48),
        backgroundColor:colors.palette.navyBlue,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'
    },
    txtBtn:{
        color:'#FFFF'
    }
})