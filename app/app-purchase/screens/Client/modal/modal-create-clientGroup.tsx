
import { View, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { FC } from 'react'
import { defaultCreateObservableOptions } from 'mobx/dist/internal'
import { colors, padding, scaleHeight, scaleWidth } from '../../../theme'
import { Text } from '../../../components'


interface ModalCreateGroup {
    isVisible: any,
    setIsVisible: any
}

const ModalCreateClientGroup: FC<ModalCreateGroup> = ({ isVisible, setIsVisible }) => {
    return (
        <Modal
            animationType='slide'
            visible={isVisible}
            transparent={true}

        >
            <View style={Styles.container}>
                <View style={Styles.modalView}>
                    <Text style={Styles.modalText} />
                    <View style={Styles.header}>
                        <Text style={Styles.headerTitle} tx="ClientScreen.createClientGroup"></Text>
                        <TouchableOpacity onPress={setIsVisible}>
                            <Text style={Styles.headerButton} tx="ClientScreen.cancel"></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={Styles.horizontalLine} />
                    <View style={Styles.body}>
                        <TextInput style={Styles.styleTextInPut} />
                        <TouchableOpacity
                            style={Styles.btnCreate}
                        >
                            <Text style={Styles.styleTxT} tx="ClientScreen.create"></Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        </Modal>
    )
}

export default ModalCreateClientGroup

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    modalView: {
        borderRadius: 8,
        backgroundColor: colors.white,
        padding: scaleWidth(padding.padding_16)
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,

    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
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