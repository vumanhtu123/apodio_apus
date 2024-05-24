import { StyleSheet } from "react-native";
import { colors } from "../../../theme";



export const styles = StyleSheet.create({
    bodyIconTabar: {
        backgroundColor:'#F4F4F4',
        padding:8,
        borderRadius:8,
        marginRight:10,
     
    },
    
    ClickbodyIconTabar: {
        backgroundColor:'#EFF8FF',
        padding:8,
        borderRadius:8,
        marginRight:10
    },
    textTabbar: {
        fontFamily:'Inter-ExtraBold',
        fontWeight:'700',
        fontSize:16,
        color: '#263238'
    },
    ClickTextTabbar: {
        fontFamily:'Inter-ExtraBold',
        fontWeight:'700',
        fontSize:16,
        // color: colors.palette.navyBlue
        color: colors.palette.navyBlue
    },
    bodyCalendar: {
        flexDirection:'row',
        justifyContent: 'space-between',
        padding:16,
    },



})