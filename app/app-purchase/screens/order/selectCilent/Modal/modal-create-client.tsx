import React, { FC, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../../../theme";
import { Svgs } from "../../../../../../assets/svgs";
import { Text, TextField } from "../../../../../components";
import { Controller, UseFormWatch, useForm, useWatch } from "react-hook-form";
import { InputSelect } from "../../../../../components/input-select/inputSelect";
import { useStores } from "../../../../models";
import { Dialog, Loading } from "../../../../../components/dialog-notification";
import { translate } from "../../../../../i18n/translate";
import { checkPhoneNumber } from "../../../../utils/validate";
import { CustomModal } from "../../../../../components/custom-modal";
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
    const [showLoading, setShowLoading] = useState(false)

    const { control, handleSubmit, setError, formState: { errors }, reset, clearErrors, trigger } = useForm({
        defaultValues: {
            phoneNumber: '',
            NameClient: ''
        },
        mode: "onSubmit"
        // mode: "onChange"
    })
    console.log('====================================');
    console.log("eeeeee", errors);
    console.log('====================================');
    const getAPIcreateClient = useStores();

    const checkStatusCompany = (): boolean => {
        if (selectCustomerType.label == translate("ClientScreen.individual")) {
            return true
        } else {
            return false
        }
    }

    const onSubmit = async (data: any) => {

        const nameClient = data.NameClient
        const phoneNumber = data.phoneNumber

        let hasError = false
        if (checkPhoneNumber(phoneNumber) !== true) {
            setError("phoneNumber", {
                type: "validate",
                message: checkPhoneNumber(phoneNumber).toString(),
            });
            hasError = true
        }

        if (hasError) {

        } else {
            setCheckHind(true)
            setShowLoading(true)

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
                    textBody: translate("ClientScreen.createClientSuccess"),
                    closeOnOverlayTap: false,
                    onPressButton: () => {
                        setShowLoading(false)
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

    }


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
        { id: 1, title: translate("ClientScreen.individual") },
        { id: 2, title: translate("ClientScreen.organization") },

    ]

    interface CheckErrorClientProps {
        checkValue: boolean;
    }

    const CheckErrorClient: React.FC<CheckErrorClientProps> = ({ checkValue }) => {
        if (checkValue) {
            return (
                <>
                    {selectCustomerType.label === "" && (
                        <Text style={{ fontSize: 12, color: colors.ecstasy }} tx="ClientScreen.pleaseSelectTypeClient" />
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
        <CustomModal
            isVisible={props.isVisible}
            setIsVisible={() => props.setIsVisible}
            isVisibleLoading={showLoading}
        >
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
            <View style={{ marginVertical: margin.margin_5 }}>
                <CheckErrorClient checkValue={checkHind} />
            </View>

            <Controller

                control={control}
                name="phoneNumber"

                render={({ field: { onBlur, onChange, value } }) => (

                    <TextField
                        keyboardType="numeric"
                        labelTx={"NCCScreen.enterPhone"}
                        maxLength={11}
                        style={{
                            marginBottom: margin.margin_10,
                            justifyContent: "center",
                        }}
                        inputStyle={{
                            fontSize: fontSize.size16,
                            fontWeight: "500",
                        }}
                        value={value}
                        onBlur={onBlur}
                        onClearText={() => {
                            onChange("");

                            clearErrors("phoneNumber")

                            console.log('Clear Errors called', errors.phoneNumber);
                        }}
                        onChangeText={(value) => {
                            const filteredValue = value.replace(/\s/g, '').replace(/[^0-9]/g, '');

                            onChange(filteredValue)

                        }}
                        isImportant
                        placeholder="VD 01231254"
                        RightIconClear={Svgs.icon_delete2}
                        error={errors?.phoneNumber?.message} // Thay đổi chỗ này
                    />
                )}
                rules={{
                    required: translate("ClientScreen.pleaseInputPhoneNumber")
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
                            onChange("")
                        }}
                        onChangeText={(txt) => {

                            onChange(txt)
                            // setNameClient(txt)

                        }}
                        isImportant
                        placeholder={translate("ClientScreen.example")}
                        RightIconClear={Svgs.icon_delete2}
                        error={errors?.NameClient?.message}
                    />
                )}
                rules={{
                    required: translate("ClientScreen.pleaseInputName")
                }}
            />

            <View style={styles.viewBottom}>
                <TouchableOpacity style={styles.btnCancel}
                    onPress={() => resetForm()}
                >
                    <Text style={{ fontSize: fontSize.size14 }} tx="common.cancel" ></Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAdd}
                    onPress={() => {
                        setCheckHind(true)
                        handleSubmit(onSubmit)()
                    }
                    }
                >
                    <Text style={{ fontSize: fontSize.size14, color: 'white' }} tx="selectClient.add"></Text>
                </TouchableOpacity>
            </View>
        </CustomModal>
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
    viewBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: scaleHeight(15)
    },
    btnCancel: {
        width: scaleWidth(166),
        height: scaleHeight(48),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        marginRight: scaleWidth(12),
        borderRadius: 10,
        borderColor: colors.veryLightGrey
    },
    btnAdd: {
        width: scaleWidth(166),
        height: scaleHeight(48),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.navyBlue
    },
    // ... (other styles)
});

export default ModalCreateClient;