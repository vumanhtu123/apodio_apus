import { StyleSheet } from "react-native"
import { fontSize, padding, scaleWidth } from "../../../theme"

export  const Styles = StyleSheet.create({
    bodyCard :{
        width:'92%',
        backgroundColor:'#FFF',
        padding: padding.padding_16,
        borderRadius: scaleWidth(8),
        // marginHorizontal: scaleWidth(16),
        marginRight:scaleWidth(16),
        marginLeft: scaleWidth(16),
        top: scaleWidth(55),
        position: 'absolute',
        
    },
    bodyCardMusPay : {
        width:'92%',
        backgroundColor:'#FFF',
        padding: padding.padding_16,
        borderRadius: scaleWidth(8),
        // marginHorizontal: scaleWidth(16),
        marginRight:scaleWidth(16),
        marginLeft: scaleWidth(16),
        top: scaleWidth(90),
        position: 'absolute',
    },
    bodyItem: {
        // backgroundColor:'blue',
        flex:1,
        alignItems:'center',
        justifyContent:'space-around'
    },
    upcase: {
        textTransform:"uppercase",
        fontSize: fontSize.size16,
        marginVertical:6
    },
    styleNumber: {
        fontSize: fontSize.size16,
        marginVertical:6
    },
    weightText: {
        fontWeight: "600",
        fontSize: fontSize.size16
    }
})
