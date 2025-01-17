import React, { FC, useState } from "react";
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { onAction } from "mobx-state-tree";
import { Text } from "../../../../components";

interface ModalClientFromPhoneProps {
    isVisible: any;
    setIsVisible: any;
}


const ModalCreateClientFromNumber: FC<ModalClientFromPhoneProps> = ({ isVisible, setIsVisible }) => {

    const [showFindClient, setShowFindClient] = useState(false)
    const [selectFindClient, setSelectFindClient] = useState(0)

    const dataFindClient = [
        { id: 'a', title: 'Khách hàng ít tiềm năng' },
        { id: 'b', title: 'Khách hàng  bình thường' },
        { id: 'c', title: 'Khách hàng tiềm năng' },
        { id: 'd', title: 'Khách hàng rất tiềm năng' },
    ]

    console.log('doandev', isVisible);

    return (
        <Modal animationType="slide" visible={isVisible} transparent={true}>
            <View style={styles.container}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText} />
                    <View style={styles.header}>
                        <Text style={styles.headerTitle} tx="ClientScreen.createNewClient"></Text>
                        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                            <Text style={styles.headerButton}>Hủy</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.horizontalLine} />
                    <View style={styles.selectKindClient}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', height: scaleHeight(56), alignItems: 'center' }}
                            onPress={() => setShowFindClient(!showFindClient)}
                        >
                            <View>
                                <Text tx="ClientScreen.typeClient"><Text style={{ color: 'red' }}>*</Text></Text>
                                <Text style={{ fontSize: scaleWidth(16) }} tx="ClientScreen.selectTypeClient"> </Text>
                            </View>
                            <View style={{ alignItems: "center", justifyContent: 'center' }}>
                                <Svgs.dropDown width={scaleWidth(14)} height={scaleHeight(14)} style={{ transform: [{ rotate: showFindClient ? '180deg' : '0deg' }] }} />
                            </View>
                        </TouchableOpacity>

                    </View>
                    {
                        showFindClient && (
                            <ScrollView style={{ marginTop: 10, padding: 10, height: scaleHeight(100) }}>
                                {dataFindClient.map((item, optionIndex) => (
                                    <TouchableOpacity
                                        key={item.id}

                                        onPress={() => setSelectFindClient(optionIndex)}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text>
                                                {item.title}
                                            </Text>
                                            {
                                                selectFindClient === optionIndex ? (
                                                    <Svgs.ic_tick />
                                                ) : null
                                            }
                                        </View>

                                        <View style={styles.horizontalLine} />
                                    </TouchableOpacity>

                                ))}

                            </ScrollView>
                        )
                    }

                    <View style={styles.selectKindClient}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                            <View style={{ height: scaleHeight(56) }}>
                                <Text tx="ClientScreen.nameClient"></Text>
                                <TextInput style={{ fontSize: scaleWidth(16) }}></TextInput>
                            </View>
                        </View>

                    </View>

                    <View style={{}}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                            <View style={{ height: scaleHeight(56) }}>
                                <Text tx="ClientScreen.phoneNumber" ></Text>
                                <TextInput style={{ fontSize: scaleWidth(16) }}></TextInput>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingTop: scaleHeight(8),
        marginHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(15),
        padding: scaleWidth(15),
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
    selectKindClient: {
        borderRadius: 8,
        backgroundColor: colors.aliceBlue,
        paddingVertical: scaleHeight(8),
        paddingHorizontal: scaleWidth(18),
        marginVertical: scaleHeight(7)

    },
    // ... (other styles)
});

export default ModalCreateClientFromNumber;