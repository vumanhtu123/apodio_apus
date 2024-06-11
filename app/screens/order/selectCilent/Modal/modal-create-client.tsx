import React, { FC, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../../theme";
import { Images } from "../../../../../assets";
import { red } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { onAction } from "mobx-state-tree";
import Modal from 'react-native-modal'
import { Text, TextField } from "../../../../components";
import { Controller, UseFormWatch, useForm, useWatch } from "react-hook-form";
import { InputSelect } from "../../../../components/input-select/inputSelect";
import { useStores } from "../../../../models";
import { boolean } from "mobx-state-tree/dist/internal";
import { RectButton } from "react-native-gesture-handler";
import { Dialog } from "../../../../components/dialog-notification";
import { translate } from "i18n-js";
interface ModalClientFromPhoneProps {
    isVisible: any;
    setIsVisible: any;
    handleRefresh: () => void;
}


const ModalCreateClient: FC<ModalClientFromPhoneProps> = ({ isVisible, setIsVisible, handleRefresh }) => {

    const [selectCustomerType, setSelectCustomerType] = useState({ label: "" })
    const [phoneNumber, setPhoneNumber] = useState<any>()
    const [nameClient, setNameClient] = useState<any>()


    const { control, formState: { errors } } = useForm({ mode: "all" })


    const getAPIcreateClient = useStores();
    const checkStatusCompany = (): boolean => {
        if (selectCustomerType.label == "Cá nhân") {
            return true
        } else {
            return false
        }
    }

    console.log('====================================');
    console.log("checkk ", checkStatusCompany());
    console.log('====================================');
    const addClient = async () => {
        const result = await getAPIcreateClient.orderStore.postClient({
            "name": nameClient,
            "phoneNumber": phoneNumber,
            "isCompany": checkStatusCompany(),
            "deleteContacts": [],
            "branches": [],
            "deleteAddress": [],
            "sharingModeB2c": "PRIVATE",
            "partnerTagIds": []
        })
        console.log('====================================');
        console.log('test', result);
        console.log('====================================');
        if (result.kind === "ok") {
            setIsVisible(!isVisible)

            handleRefresh()
            Dialog.show({
                title: translate("txtDialog.txt_title_dialog"),
                button: '',
                button2: translate("common.ok"),
                textBody: result.result.message,
                closeOnOverlayTap: false,
                onPressButton: () => {
                    Dialog.hide();
                }
            })
        } else {
            Dialog.show({
                title: translate("productScreen.Notification"),
                button: translate("common.ok"),
                textBody: result.result.errorCodes[0].message,
                closeOnOverlayTap: false
            })
        }


    }


    const dataFindClient = [
        { id: 1, title: 'Cá nhân' },
        { id: 2, title: 'Tổ chức' },

    ]

    console.log('doandev', phoneNumber, nameClient, selectCustomerType);

    const arrGroupCustomerType = dataFindClient.map((item) => {
        return { label: item.title, id: item.id }
    })

    return (
        <Modal

            isVisible={isVisible}
            style={{ margin: 0 }}
            avoidKeyboard={true}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 0 }}
            >

                <View style={styles.modalView}>
                    <Text style={styles.modalText} />
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Tạo mới khách hàng</Text>


                    </View>

                    <View style={styles.horizontalLine} />

                    <InputSelect
                        titleTx="selectClient.customerType"
                        hintTx="selectClient.selectCustomerType"
                        required
                        arrData={arrGroupCustomerType}
                        dataDefault={selectCustomerType.label}
                        onPressChoice={(item: any) => {
                            setSelectCustomerType(item)
                        }}
                        styleView={{ marginBottom: scaleHeight(15) }}

                    />


                    <Controller
                        control={control}
                        name="phoneNumber"

                        render={({ field: { onBlur, onChange, value } }) => (

                            <TextField
                                keyboardType="numeric"
                                labelTx={"NCCScreen.enterPhone"}
                                style={{
                                    // marginBottom: scaleHeight(10),
                                    marginBottom: scaleHeight(15),
                                    justifyContent: "center",
                                }}
                                inputStyle={{
                                    fontSize: fontSize.size16,
                                    fontWeight: "500",
                                }}
                                value={value}
                                onBlur={onBlur}
                                onClearText={() => onChange("")}
                                onChangeText={(txt) => {
                                    onChange(txt)
                                    setPhoneNumber(txt)
                                }}
                                isImportant
                                placeholder="VD 01231254"
                                RightIconClear={Images.icon_delete2}
                                error={errors?.phoneNumber?.message}

                            />
                        )}
                        rules={{
                            required: "Please input data"
                        }}
                    />
                    {
                        phoneNumber?.length < 10 || phoneNumber?.length > 10 ?
                            <Text style={{ fontSize: 12, color: 'red' }}>Vui lòng nhập đủ 10 số</Text> : null
                    }
                    <Controller
                        control={control}
                        name="NameClient"
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextField
                                keyboardType=""
                                labelTx={"selectClient.nameClient"}
                                style={{
                                    // marginBottom: scaleHeight(10),
                                    marginBottom: scaleHeight(15),
                                    justifyContent: "center",
                                }}
                                inputStyle={{
                                    fontSize: fontSize.size16,
                                    fontWeight: "500",
                                }}
                                value={value}
                                onBlur={onBlur}
                                onClearText={() => onChange("")}
                                onChangeText={(txt) => {
                                    onChange(txt)
                                    setNameClient(txt)
                                }}
                                isImportant
                                placeholder="VD Nguyễn Phương Linh"
                                RightIconClear={Images.icon_delete2}
                                error={errors?.NameClient?.message}
                            />
                        )}
                        rules={{
                            required: "Please input data"
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                        <TouchableOpacity style={{ width: scaleWidth(166), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginRight: scaleWidth(12), borderRadius: 10, borderColor: '#c8c8c8' }}
                            onPress={() => setIsVisible(!isVisible)}
                        >
                            <Text style={{ fontSize: fontSize.size14 }} tx="common.cancel" ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: scaleWidth(166), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#0078d4' }}
                            onPress={() => addClient()}
                        >
                            <Text style={{ fontSize: fontSize.size14, color: 'white' }} tx="selectClient.add"></Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        maxHeight: Dimensions.get('screen').height * 0.6,
        // justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalView: {
        maxHeight: Dimensions.get('screen').height * 0.6,
        width: '100%',
        backgroundColor: colors.palette.neutral100,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        position: 'absolute',
        padding: scaleHeight(15),
        bottom: 0
    },
    modalText: {
        textAlign: 'center',
        width: scaleWidth(68),
        height: scaleHeight(5),
        backgroundColor: '#C7C7C7',
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
        backgroundColor: '#E7EFFF',
        marginTop: scaleHeight(18),
        marginBottom: 18,
    },
    selectKindClient: {
        borderRadius: 8,
        backgroundColor: '#F6F7F9',
        paddingVertical: scaleHeight(8),
        paddingHorizontal: scaleWidth(18),
        marginVertical: scaleHeight(7)

    },
    // ... (other styles)
});

export default ModalCreateClient;