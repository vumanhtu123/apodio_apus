import { Dimensions, StyleSheet } from "react-native";
import { colors, scaleHeight, scaleWidth } from "../../theme";

const {width} = Dimensions.get('screen')
export const Styles = StyleSheet.create({
    main: {
        flex:1,
    },
    body: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'    
    },
    body2: {
        padding:scaleWidth(14), 
        justifyContent:'space-between', 
        flexDirection:'row',
         backgroundColor:colors.white
    },
    ItemList:{
        
       
      
        flexDirection:'row',
        justifyContent:'space-between'
    },
    flexRowNoJustyfy: {
        marginTop:scaleHeight(16),
        width:width,
        paddingHorizontal: scaleWidth(31),
        flexDirection:'row',
        // backgroundColor:'yellow'
    },
    flexRow: {
        flexDirection:'row',
        justifyContent:'space-between'
    },
    line: {
        // marginTop: scaleHeight(15) ,
        borderWidth:scaleHeight(1),
        borderColor: colors.palette.aliceBlue

    },
    BodyItem: { 
        padding: scaleWidth(15),
        // backgroundColor:'blue'        
    },
    textDate: {
        color: colors.aluminium1,
        fontSize: scaleWidth(14),
        fontWeight: "400",
    },
    container: {
     
        padding:scaleWidth(15),
        position: 'absolute',
        top: scaleHeight(65),
        // right:scaleWidth(1),
        left: scaleWidth(8),
        width: scaleWidth(350),
        height: scaleHeight(491),
        borderRadius:30,
        // backgroundColor:colors.white
       

    
    },
    
    viewData:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaleHeight(4),
    },
    textTitle:{
        paddingLeft: 16,
        paddingTop: 12,
        fontSize: scaleWidth(14),
        color: colors.aluminium,
    },
    rowStaff:{
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    textResult:{
        paddingRight: scaleWidth(16),
        paddingTop: scaleHeight(12),
        fontSize: scaleWidth(14),
        color: colors.nightRider1,
        maxWidth: '70%',
        fontWeight: '700',
    },


})