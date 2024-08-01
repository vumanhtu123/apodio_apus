import { StyleSheet } from "react-native"
import { colors, padding, scaleHeight, scaleWidth } from "../../../theme"

const Styles = StyleSheet.create({
    bodyItem: {
        backgroundColor: colors.white,
        borderRadius: 8,
        // paddingVertical: scaleHeight(10),
        // paddingHorizontal: scaleWidth(16),
        marginBottom: scaleWidth(15),

    },
    stylesTextTime: {
        fontSize: 10
    },
    flexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    line: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.ghostWhite,
        marginVertical: scaleHeight(12)

    },
    styleBtn: {
        borderWidth: 1,
        padding: scaleWidth(8),
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: scaleWidth(149)
    },
    colorTextDate: {
        color: colors.palette.dolphin
    },
    txtGray: {
        color: colors.palette.dolphin,
        fontSize: (scaleWidth(10))
    },
    StyleTabar: {
        flexDirection: 'row',
        backgroundColor: colors.solitude1,
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
    styleGroup2: {
        borderRadius: 8,
        backgroundColor: colors.white,
        paddingVertical: scaleHeight(12),
        paddingHorizontal: scaleWidth(16),
        marginTop: scaleHeight(20),
    },
    txtGroup2: {
        fontSize: scaleWidth(10),
        color: colors.palette.dolphin,
    },
    btnConfirm: {
        width: scaleWidth(166),
        // flex: 1,
        borderWidth: 1,
        borderRadius: 7,
        padding: scaleWidth(12),
        backgroundColor: colors.palette.navyBlue,
        alignItems: 'center',
        borderColor: colors.palette.navyBlue,
        // marginRight:scaleWidth(12)

    },
    btnConfirm2: {
        width: scaleWidth(152),
        // flex: 1,
        borderWidth: 1,
        borderRadius: 7,
        padding: scaleWidth(12),
        backgroundColor: colors.palette.navyBlue,
        alignItems: 'center',
        borderColor: colors.palette.navyBlue,
        // marginRight:scaleWidth(12)

    },
    btnBack: {
        // flex: 1,
        borderWidth: 1,
        borderRadius: 7,
        padding: scaleWidth(12),
        backgroundColor: colors.white,
        alignItems: 'center',
        borderColor: colors.palette.veryLightGrey,
        width: scaleWidth(166)

    },
    btnBack2: {
        // flex: 1,
        borderWidth: 1,
        borderRadius: 7,
        padding: scaleWidth(12),
        backgroundColor: colors.white,
        alignItems: 'center',
        borderColor: colors.palette.veryLightGrey,
        width: scaleWidth(152)

    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        paddingHorizontal: scaleWidth(16),
        paddingBottom:scaleWidth(16),
    },
    modalView: {

        // alignItems:'center',
        borderRadius: 8,
        backgroundColor: colors.white,
        padding: scaleWidth(padding.padding_16),
        
    },
    modalText: {
        textAlign: 'center',
        width: scaleWidth(68),
        height: scaleHeight(5),
        backgroundColor: colors.veryLightGrey1,
        borderRadius: 8,
        alignSelf: 'center',
    },
    header: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        // backgroundColor:'red'

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        marginLeft: 8
    },
    headerButton: {
        fontSize: 16,
        color: 'red',
    },
    horizontalLine: {
        height: 1,
        backgroundColor: colors.solitude2,
        marginTop: scaleHeight(18),
        marginBottom: 18,
    },
    body: {
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    styleTextInPut: {
        width: scaleWidth(256),
        height: scaleHeight(56),
        borderRadius: 8,
        backgroundColor: colors.aliceBlue,
        padding: scaleWidth(16)
    },
    btnCreate: {
        backgroundColor: colors.palette.navyBlue,
        width: scaleWidth(78),
        height: scaleHeight(56),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    styleTxT: {
        fontFamily: 'Inter',
        fontWeight: '600',
        color: colors.white
    }


})
export default Styles