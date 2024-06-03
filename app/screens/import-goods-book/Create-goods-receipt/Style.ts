import { StyleSheet } from "react-native"
import { colors, scaleHeight, scaleWidth } from "../../../theme"


const Style = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(20)
    },
    styleItemTabar: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.palette.veryLightGrey,
        marginRight: 8,
    },
    styleItemTabarIsclick: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.palette.navyBlue,
        marginRight: 8,

    },
    styleGroup1: {
        paddingVertical: scaleHeight(10),
        paddingHorizontal: scaleWidth(16),
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: scaleHeight(15)
    },
    styleGroup2: {
        borderRadius: 8,
        backgroundColor: '#FFF',
        paddingVertical: scaleHeight(12),
        paddingHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(15),
    },
    styleBtnAddProduct: {
        borderWidth: 1,
        borderColor: colors.palette.navyBlue,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
        borderRadius: 8,
    },
    StyleBTNplusAndMinus: {
        width: 91,
        height: 30,
        flexDirection: 'row',
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#F4F4F4',
        alignItems: 'center',
        justifyContent: 'space-evenly'

    },
    txtBtnAddProduct: {
        color: colors.palette.navyBlue,
        fontSize: 14,
        fontWeight: "600",

    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    txtColorDolphin: {
        color: colors.palette.dolphin,
    },
    txtGroup2: {
        fontSize: scaleWidth(10),
        color: colors.palette.dolphin,
    },
    stylesNumber: {
        fontWeight: '500',
        fontSize: scaleWidth(12),


    },
    stylesBtnBottom: {
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

    notification: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        top: scaleWidth(45),
        backgroundColor: '#FFFFFF',
        paddingVertical: scaleHeight(7),
        paddingHorizontal: scaleWidth(16)
    },
    StyleTabar: {
        flexDirection: 'row',
        backgroundColor: '#E6E7EA',
        height: 32,
        // justifyContent:'space-between',
        borderRadius: 8,
        marginBottom: 20
    },
    StyleTextTabar: {
        fontSize: 13,
        fontWeight: "700",

    },
    StyleTextTabarUnSelect: {
        fontSize: 13,
        fontWeight: "500",

    },
    


})

export default Style