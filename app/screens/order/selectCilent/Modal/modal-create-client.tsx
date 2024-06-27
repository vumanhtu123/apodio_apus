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
import { Dialog, Loading } from "../../../../components/dialog-notification";
import { translate } from "../../../../i18n/translate";
import en from "../../../../i18n/en";
import { clientData } from "../../../../models/add-client-props";
import { values } from "mobx";
import { checkPhoneNumber } from "../../../../utils/validate";
interface ModalClientFromPhoneProps {
    isVisible: any;
    setIsVisible: any;
    handleRefresh: () => void;
    sendIdCreate: ({ id }: any) => void;
}


const ModalCreateClient = (props: ModalClientFromPhoneProps) => {

    const [selectCustomerType, setSelectCustomerType] = useState({ label: "" })
    // const [checkError, setCheckError] = useState(false)
    const [checkHind, setCheckHind] = useState(false)

    const { control, handleSubmit, setError, formState: { errors }, reset, clearErrors } = useForm({
        defaultValues: {
            phoneNumber: '',
            NameClient: ''
        },
        mode: "onChange"
    })

    const getAPIcreateClient = useStores();

    const checkStatusCompany = (): boolean => {
        if (selectCustomerType.label == "Cá nhân") {
            return true
        } else {
            return false
        }
    }

    const onSubmit = async (data: any) => {

        const nameClient = data.NameClient
        const phoneNumber = data.phoneNumber
        setCheckHind(true)

        // console.log('====================================');
        // console.log("value hind", checkHind);
        // console.log('====================================');
        // console.log('====================================');
        // console.log('data test', nameClient, phoneNumber, selectCustomerType);
        // console.log('====================================');

        const result = await getAPIcreateClient.orderStore.postClient({
            "name": nameClient,
            "phoneNumber": phoneNumber,
            "isCompany": checkStatusCompany(),
            "deleteContacts": [],
            "branches": [],
            "deleteAddress": [],
            "sharingModeB2c": "PRIVATE",
            "partnerTagIds": [],
            "b2cActivated": true,
        })
        // .then((value) => {

        //     console.log("value create", props.sendIdCreate(value.result.data.id));
        // })
        // console.log('====================================');
        // console.log('test', result);
        // console.log('====================================');

        if (result.kind === "ok") {
            console.log("result create ", result.result.data);
            const id = result.result.data

            props.sendIdCreate({ id })
            setCheckHind(false)
            setSelectCustomerType({ label: "" })
            reset({
                phoneNumber: '',
                NameClient: ''
            })
            props.setIsVisible(!props.isVisible)

            Dialog.show({
                title: translate("txtDialog.txt_title_dialog"),
                button: '',
                button2: translate("common.ok"),
                textBody: en.ClientScreen.createClientSuccess,
                closeOnOverlayTap: false,
                onPressButton: () => {

                    Dialog.hide();
                    props.handleRefresh()
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
    // Hàm được gọi khi người dùng nhấn nút
    const onPressHandler = () => {
        // Thực hiện các thao tác trước khi submit form (nếu cần)
        setCheckHind(true)
        console.log('Button pressed');
        // Sau đó gọi handleSubmit để xử lý submit form
        handleSubmit(onSubmit)();
    };


    // console.log('====================================');
    // console.log("checkk ", checkStatusCompany());
    // console.log('====================================');


    const resetForm = () => {
        reset({
            phoneNumber: '',
            NameClient: ''
        })
        setSelectCustomerType({ label: "" })
        setCheckHind(false)
        props.setIsVisible(!props.isVisible)
    }

    const dataFindClient = [
        { id: 1, title: 'Cá nhân' },
        { id: 2, title: 'Tổ chức' },

    ]

    // console.log('doandev', phoneNumber, nameClient, selectCustomerType);
    interface CheckErrorClientProps {
        checkValue: boolean;
    }

    const CheckErrorClient: React.FC<CheckErrorClientProps> = ({ checkValue }) => {
        if (checkValue) {
            return (
                <>
                    {selectCustomerType.label === "" && (
                        <Text style={{ fontSize: 12, color: '#C95B36' }} tx="ClientScreen.pleaseSelectTypeClient" />
                    )}
                </>
            );
        } else {
            return null; // hoặc có thể trả về một phần tử khác nếu cần thiết
        }
    };

    const arrGroupCustomerType = dataFindClient.map((item) => {
        return { label: item.title, id: item.id }
    })

    return (
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={750}
            isVisible={props.isVisible}
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
                        <Text style={styles.headerTitle} tx="selectClient.createClient"></Text>
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
                        styleView={{}}


                    />
                    <View style={{ marginVertical: 5 }}>
                        <CheckErrorClient checkValue={checkHind} />

                    </View>

                    <Controller

                        control={control}
                        name="phoneNumber"
                        render={({ field: { onBlur, onChange, value } }) => (

                            <TextField
                                keyboardType="numeric"
                                labelTx={"NCCScreen.enterPhone"}
                                style={{
                                    // marginBottom: scaleHeight(10),
                                    marginBottom: scaleHeight(5),
                                    justifyContent: "center",
                                }}
                                inputStyle={{
                                    fontSize: fontSize.size16,
                                    fontWeight: "500",
                                }}
                                value={value}
                                onBlur={onBlur}
                                onClearText={() => onChange("")}
                                onChangeText={(value) => {

                                    onChange(value)

                                }}
                                isImportant
                                placeholder="VD 01231254"
                                RightIconClear={Images.icon_delete2}
                                error={errors?.phoneNumber?.message}

                            />
                        )}
                        rules={{

                            validate: {
                                checkLength: (value) => checkPhoneNumber(value)
                            }
                            ,

                            pattern: {
                                value: /^\S+$/,
                                message: en.ClientScreen.checkSpace
                            },
                            required: en.ClientScreen.pleaseInputPhoneNumber
                        }}
                    />


                    <Controller
                        control={control}
                        name="NameClient"
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextField
                                keyboardType="ascii-capable"
                                labelTx={"selectClient.nameClient"}
                                style={{
                                    // marginBottom: scaleHeight(10),
                                    marginBottom: scaleHeight(5),
                                    justifyContent: "center",
                                }}
                                inputStyle={{
                                    fontSize: fontSize.size16,
                                    fontWeight: "500",
                                }}
                                value={value}
                                onBlur={onBlur}
                                onClearText={() => {
                                    reset({
                                        NameClient: ""
                                    })
                                }}
                                onChangeText={(txt) => {

                                    onChange(txt)
                                    // setNameClient(txt)

                                }}
                                isImportant
                                placeholder="VD Nguyễn Phương Linh"
                                RightIconClear={Images.icon_delete2}
                                error={errors?.NameClient?.message}
                            />
                        )}
                        rules={{
                            required: en.ClientScreen.pleaseInputName
                        }}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: scaleHeight(15) }}>
                        <TouchableOpacity style={{ width: scaleWidth(166), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginRight: scaleWidth(12), borderRadius: 10, borderColor: '#c8c8c8' }}
                            onPress={() => resetForm()}
                        >
                            <Text style={{ fontSize: fontSize.size14 }} tx="common.cancel" ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: scaleWidth(166), height: scaleHeight(48), justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#0078d4' }}
                            onPress={
                                onPressHandler
                            }
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