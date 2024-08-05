import { colors } from '../../app-purchase/theme';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export const styles = StyleSheet.create({
    startDateStyle: {
        backgroundColor: colors.palette.navyBlue,
        width: '100%',
        // borderTopLeftRadius: 5,
        // borderBottomLeftRadius: 5,
        // borderWidth:1
    },
    endDateStyle: {
        backgroundColor: colors.palette.navyBlue,
        width: '100%',
        // borderTopRightRadius: 5,
        // borderBottomRightRadius: 5,
        // borderWidth: 1
    },
    middleDateStyle: {
        backgroundColor: colors.palette.solitude,
        width: '100%',
    },
    textStyle: {
        fontSize: 15,
        color: 'white',
    },
    textMiddleStyle: {
        fontSize: 15,
        color: 'white',
    },
    disableDateStyle: {
        backgroundColor: 'transparent',
    },
    selectType: {
        marginHorizontal: 14,
        marginBottom: 12,
    },
    errorMessage: {},
    container: {},
    main: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flexDirection: 'column-reverse',
        width: width,
        // height: height,
        flex: 1,
    },
    content: {
        width: width - 32,
        alignSelf: 'center',
        flex: 0,
        backgroundColor: 'white',
        borderRadius: 8,
        position: 'absolute',
        bottom: 42,
    },
    centeredView: {
        width: width - 16,
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
    modalView: {
        // width: width - 16,
        // backgroundColor: 'red',
        height: 440,
        borderRadius: 20,
    },
    button: {
        marginHorizontal: 14,
        marginBottom: 23,
        height: 44,
        paddingHorizontal: '15%',
        borderRadius: 8,
        backgroundColor: colors.palette.navyBlue,
        justifyContent: 'center',
    },
    button2: {
        marginHorizontal: 14,
        marginBottom: 23,
        height: 44,
        // width: 160,
        borderRadius: 8,
        backgroundColor: colors.palette.solitude,
        justifyContent: 'center',
        paddingHorizontal: '15%',
    },
    textButton: {
        fontSize: 14,
        color: 'white',
        paddingVertical: 12,
        alignSelf: 'center',
    },
    buttonClose: {
        backgroundColor: colors.dodgerBlue1,
    },
    modalText: {
        marginBottom: 15,
        marginTop: 10,
        textAlign: 'center',
        width: 68, // Kích thước chiều rộng 68dp
        height: 5, // Kích thước chiều cao 5dp
        backgroundColor: colors.veryLightGrey1,
        borderRadius: 8,
        alignSelf: 'center',
    },
    buttonSelect: {
        width: 100,
        height: 28,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 7,
        marginLeft: 25,
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        position: 'absolute',
        // marginLeft: 6.5,
        bottom: 37,
        
       
    },
});
