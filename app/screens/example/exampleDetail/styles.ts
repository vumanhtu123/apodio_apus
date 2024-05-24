
import { StyleSheet } from "react-native";
import { colors, padding, scaleHeight, scaleWidth } from "../../../theme";


export const styles = StyleSheet.create({
    ROOT : {
        flex:1 ,
        backgroundColor: colors.palette.aliceBlue
    },
    body: {
        
        paddingHorizontal:scaleWidth(padding.padding_16),
        paddingVertical:scaleHeight(padding.padding_20)
    },
    btn1: {
        backgroundColor:'#FFFFFF',
        borderRadius:8,
       
        marginBottom: scaleHeight(padding.padding_16), 
        paddingHorizontal:scaleHeight(padding.padding_16),
        paddingVertical:scaleHeight(padding.padding_10),
    
    },
    tetxTitle:{
        fontWeight:'600',
        marginTop: scaleHeight(padding.padding_32),
        marginBottom: scaleHeight(padding.padding_16)
    },
    ListProduct:{
        borderRadius:8,
        paddingVertical:scaleHeight(padding.padding_12),
        paddingHorizontal:scaleHeight(padding.padding_16),
        backgroundColor:'#FFF',
        elevation: 5, // Elevation for shadow on Android
        shadowColor: '#0000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25, // Shadow opacity
        shadowRadius: 3.84, // Shadow radius
    },
    line:{
        borderWidth:2, borderColor:'#F6F7FB'
    },
})