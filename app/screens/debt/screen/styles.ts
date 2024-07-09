
import { Dimensions, StyleSheet } from "react-native"
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme"

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
    },
    sizeTitle: {
        fontSize: fontSize.size12,
        fontWeight: "400",
        color:"#FFFFFF"
        
    },
    sizeTitleUnSelect: {
        fontSize: fontSize.size12,
        fontWeight: "400",
        color:"#747475"
    },
    sizeContent: {
        fontSize: fontSize.size12,
        fontWeight: "600",
        color:"#FFFFFF"
    },
    sizeContentUnSelect: {
        fontSize: fontSize.size12,
        fontWeight: "600",
        color:"#242424"
    },
    numberInItemUnSelect: {
        fontSize: fontSize.size12,
        fontWeight: "600",
        color: colors.palette.navyBlue
    },
    modalView: {
        width: '100%',
        backgroundColor: '#FFF',
        paddingHorizontal: scaleWidth(15),
        paddingVertical: scaleWidth(10),
        borderRadius:margin.margin_8

    },
    horizontalLine: {
        width:'100%',
        height: 1,
        backgroundColor: '#E7EFFF',
        marginTop: scaleHeight(18),
        marginBottom: 18,
    },
    modalText: {
        textAlign: 'center',
        width: scaleWidth(68),
        height: scaleHeight(5),
        backgroundColor: '#C7C7C7',
        borderRadius: 8,
        alignSelf: 'center',
    },
    styBtnUp: {
        flex: 1, alignItems: 'center', borderRadius: 8 
    },
    styleBtnSwipe:{ 
        flexDirection: 'row', 
        flex: 1, 
        backgroundColor: '#EDEDEE', 
        borderRadius: 8, 
        padding: scaleHeight(2) 
    },
    textHeader: {
        color: colors.palette.neutral100,
        fontWeight: "700",
        fontSize: 16,
        alignSelf: "flex-start",
        // fontFamily: typography.primary.bold,
      },
    groupContainer: {
        flex: 1,
        paddingHorizontal: 10,
        // backgroundColor: 'red',
        borderRadius: 5,

    },
    dateText: {
        fontSize: scaleWidth(12),
        marginBottom: 5,
        textAlign: 'center',
        color: colors.palette.dolphin
    },
    productContainer: {
        // backgroundColor: "yellow",
        paddingHorizontal: scaleWidth(10),

    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    productName: {
        fontSize: scaleWidth(12),
        fontWeight: 'bold',
    },
    styleOrder: {
        fontWeight:"700",
        fontSize: fontSize.size12,
    },
    label: {
        fontSize: fontSize.size12,
        fontWeight:"400",
        color: colors.dolphin

    },
    btnPay:{ 
        backgroundColor: colors.palette.navyBlue, 
        padding: scaleWidth(7), 
        borderRadius: 4,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row' 
    },
    taskBar: {
        flex: 1,
        alignItems: 'center',
        borderRadius: scaleWidth(8),
        padding: scaleWidth(4),
    },
    styleBody: {
        paddingHorizontal: scaleWidth(16),
        paddingVertical:scaleHeight(20)
    },
    styleHeaderCard: {
    
        paddingHorizontal: scaleWidth(16),
        paddingVertical:scaleHeight(10),
        borderRadius: scaleWidth(8), 
        backgroundColor:'#FFF'
    }, 
    styleBtnPay: {
        paddingHorizontal: scaleWidth(8),
        paddingVertical:scaleWidth(6),
        borderRadius: scaleWidth(8),
        backgroundColor: colors.palette.navyBlue
    },
    styleLine: { 
        height: 1, 
        backgroundColor: '#F6F7FB', 
        marginVertical: scaleWidth(10) 
    }, 
    fontSize10:{ 
        fontSize: fontSize.size10, 
        color: colors.palette.dolphin 
    },
    bodyItemNCC: {
        borderRadius: scaleWidth(8),
        marginVertical: scaleWidth(5),
        backgroundColor: '#FFF',
        paddingVertical: scaleWidth(11),
    }
    
})
