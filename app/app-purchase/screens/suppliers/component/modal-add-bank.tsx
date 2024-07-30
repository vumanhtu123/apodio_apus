
import React, { useState } from "react"
import { View, Text as TextRN, TouchableOpacity, Image } from "react-native"
import Modal from "react-native-modal"
import { styles } from "./modal-create-supplier"
import { Text, TextField } from "../../../../components"
import { Images } from "../../../../../assets"
import { fontSize, scaleHeight, scaleWidth } from "../../../theme"
import { InputSelect } from "../../../../components/input-select/inputSelect"
import { Controller, useForm } from "react-hook-form"


interface ModalAddBankProps {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void
}

export const ModalAddBank = (props: ModalAddBankProps) => {
    const { isVisible, setIsVisible } = props
    const [addRess, setAddRess] = useState({ label: "" })
    const { control, formState: { errors } } = useForm({ mode: "all" })
    const dataTest = [
        {
            addRess: "BIDV",
            code: "34"
        },
        {
            addRess: "ViettinBank",
            code: "33"
        },
        {
            addRess: "TPBank",
            code: "32"
        },
        {
            addRess: "Agribank",
            code: "31"
        }
    ]

    const arrAddress = dataTest.map((item) => {
        return ({ label: item.addRess, id: item.code })
    })

    return (
        <Modal
            isVisible={isVisible}
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            style={{
                backgroundColor: "rgba(0,0,0,0.1)",
                margin: 0,
                justifyContent: "flex-end",
                // paddingTop: showMore ? scaleHeight(160) : null,
            }}
        >
            <View style={styles.modalView}>
                <TextRN style={styles.modalText} />
                <View style={styles.header}>
                    <Text style={styles.headerTitle} tx="NCCScreen.addBank"></Text>
                    <TouchableOpacity onPress={() => setIsVisible(false)}>
                        <Text style={styles.headerButton} tx="common.cancel"></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontalLine}

                />
                <View style={styles.imageWithBorder}>
                    <Images.ic_BIDV

                    />
                </View>

                <InputSelect
                    titleTx="NCCScreen.selectedAddress"
                    hintTx="NCCScreen.selectedAddress"
                    arrData={arrAddress}
                    dataDefault={addRess.label}
                    onPressChoice={(item: any) => {
                        setAddRess(item)
                    }}
                    isSearch
                    required
                    styleView={{
                        marginBottom: scaleWidth(15)
                    }}
                />
                <Controller
                    control={control}
                    name="AcountNumber"
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextField
                            labelTx={"NCCScreen.accountNumber"}
                            placeholderTx={"NCCScreen.enterAccountNumber"}
                            isImportant
                            onBlur={onBlur}
                            value={value}
                            style={{
                                marginBottom: scaleWidth(15)
                            }}
                            inputStyle={{
                                fontSize: fontSize.size16,
                                fontWeight: "500",
                            }}
                            RightIconClear={Images.icon_delete2}
                            onChangeText={(value) => onChange(value)}
                            onClearText={() => onChange("")}
                            error={errors.AcountNumber?.message}
                        />
                    )}

                    rules={{ required: "Please Input data" }}
                />

                <Controller
                    control={control}
                    name="accountName"
                    render={({ field: { onBlur, onChange, value } }) => (
                        <TextField
                            labelTx={"NCCScreen.accountName"}
                            placeholderTx={"NCCScreen.enterAccountName"}
                            value={value}
                            onBlur={onBlur}
                            RightIconClear={Images.icon_delete2}
                            onChangeText={(txt) => onChange(txt)}
                            onClearText={() => onChange("")}
                            style={{
                                marginBottom: scaleWidth(15)
                            }}
                            inputStyle={{
                                fontSize: fontSize.size16,
                                fontWeight: "500"
                            }}
                            isImportant
                            error={errors.accountName?.message}
                        />
                    )}
                    rules={
                        { required: "Please Input data" }
                    }
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginVertical: scaleHeight(15),
                    }}
                >
                    <TouchableOpacity
                        style={{
                            width: scaleWidth(150),
                            height: scaleHeight(48),
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            marginRight: scaleWidth(12),
                            borderRadius: 10,
                            borderColor: "#c8c8c8",
                        }}
                    >
                        <Text style={{ fontSize: fontSize.size14 }}>Huỷ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: scaleWidth(150),
                            height: scaleHeight(48),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            backgroundColor: "#0078d4",
                        }}
                    >
                        <Text style={{ fontSize: fontSize.size14, color: "white" }}>
                            Lưu
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}  