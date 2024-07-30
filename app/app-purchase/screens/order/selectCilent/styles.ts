import { Platform, StyleSheet } from "react-native";
import { colors, padding, scaleHeight, scaleWidth } from "../../../theme";
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

    },
    itemClient: {
        flexDirection: "row",
        alignItems: "center",
        width: scaleWidth(375),
        height: scaleHeight(56),
        paddingHorizontal: padding.padding_16,
        marginBottom: 1.5,
        justifyContent: "space-between",
    },
    icCodeItem: {
        width: 40,
        height: 40,
        backgroundColor: "#EFF8FF",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    dots :{
        borderRadius: scaleHeight(8),
        borderWidth: 1,
        borderColor: colors.palette.lightGrey,
        width: scaleHeight(16),
        height: scaleHeight(16),
    },
    btnAddClient:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        position: "absolute",
        paddingHorizontal: scaleWidth(18),
        paddingVertical: scaleHeight(8),
        backgroundColor: colors.palette.navyBlue,
        bottom: Platform.OS === "ios" ? scaleHeight(20) : scaleHeight(5),
        right: scaleWidth(16),
      },

})