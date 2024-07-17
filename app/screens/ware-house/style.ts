import { StyleSheet } from "react-native";
import { scaleWidth, scaleHeight, colors } from "../../theme";


export const Styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    body: {
        marginTop: scaleHeight(20),
        marginLeft: scaleWidth(16)
    },
    bodyContainer: {
        flex: 1,
        // backgroundColor:'#FFF' ,
        marginTop: scaleHeight(12),
        marginHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(20)

    },

    bodyItemTabar: {
        width: scaleWidth(70),
        height: scaleHeight(70),
        paddingHorizontal: scaleWidth(10),
        paddingTop: scaleWidth(10),
        paddingBottom: scaleWidth(19),
        backgroundColor: '#FFFFFF',
        borderRadius: scaleWidth(8),
        marginRight: scaleWidth(8),
    },
    styleItemTabarIsclick: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.palette.navyBlue,
        marginRight: 8,

    },
    styleItemTabar: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.palette.veryLightGrey,
        marginRight: 8,
    },
    section: {
        marginTop: scaleHeight(12),
        marginBottom: scaleHeight(12),
        padding: scaleWidth(15),
        backgroundColor: '#FFFFFF',
        borderRadius: (8)
    },
    line: {
        marginVertical: scaleHeight(16),
        borderWidth: 1,
        width: '100%',
        borderColor: '#E7EFFF'
    },
    headerSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    survivalValue: {
        width: '23%',
        // backgroundColor:'blue', 
        textAlign: 'center',
        fontSize: scaleWidth(12),
        color: colors.palette.dolphin
    },
    bottomTxt: {
        fontSize: scaleWidth(12),
        color: colors.palette.dolphin
    },
    bottomSection: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bottomSectionLeft: {
        flex: 1,
        // backgroundColor:'red', 
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtItemWareHouse: {
        fontSize: scaleWidth(8),
        color: colors.palette.dolphin
    },
    btnPlus: {
        position: 'absolute',
        bottom: 0,
        end: 0,
        borderRadius: scaleWidth(40),
        height: scaleWidth(40),
        width: scaleWidth(40),
        backgroundColor: colors.palette.navyBlue,
        alignItems: 'center',
        justifyContent: 'center'

    },
    btnTurnOnInvetory:{
        borderWidth:1, 
        borderColor: colors.palette.navyBlue, 
        borderRadius:scaleWidth(8),
        paddingHorizontal:scaleWidth(12), 
        paddingVertical:scaleHeight(7)

    },
    itemList: { 
        flex: 1, 
        flexDirection: 'row', 
        padding: scaleHeight(6), 
        borderRadius: scaleWidth(8), 
        backgroundColor: '#FFFFFF',
        marginBottom: scaleHeight(12), 
        alignItems: 'center',
         
    },



})