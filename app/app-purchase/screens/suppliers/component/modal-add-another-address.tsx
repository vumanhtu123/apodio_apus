import React, { useState } from "react";
import { View, Text as TextRN, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./modal-create-supplier";
import { Text, TextField } from "../../../components";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import { Controller, useForm } from "react-hook-form";
import { InputSelect } from "../../../components/input-select/inputSelect";



interface propsModal {
    isVisible: boolean,
    setIsVisible: (value: boolean) => void,
}
export const ModalAddAnotherAddrest = (props: propsModal) => {
    const { isVisible, setIsVisible } = props
    const { control, formState: { errors } } = useForm()
    const arrTest = [
        {
            name: "An Giang",
            slug: "an-giang",
            type: "tinh",
            name_with_type: "Tỉnh An Giang",
            code: "89",
            region: "Miền Bắc",
        },
        {
            name: "Kon Tum",
            slug: "kon-tum",
            type: "tinh",
            name_with_type: "Tỉnh Kon Tum",
            code: "62",
            region: "Miền Nam",
        },
        {
            name: "Đắk Nông",
            slug: "dak-nong",
            type: "tinh",
            name_with_type: "Tỉnh Đắk Nông",
            code: "67",
            region: "Miền Nam",
        },
        {
            name: "Sóc Trăng",
            slug: "soc-trang",
            type: "tinh",
            name_with_type: "Tỉnh Sóc Trăng",
            code: "94",
            region: "Miền Nam",
        },
        {
            name: "Bình Phước",
            slug: "binh-phuoc",
            type: "tinh",
            name_with_type: "Tỉnh Bình Phước",
            code: "70",
            region: "Miền Bắc",
        },
        {
            name: "Hưng Yên",
            slug: "hung-yen",
            type: "tinh",
            name_with_type: "Tỉnh Hưng Yên",
            code: "33",
            region: "Miền Bắc",
        },
        {
            name: "Thanh Hóa",
            slug: "thanh-hoa",
            type: "Huyện",
            name_with_type: "Tỉnh Thanh Hóa",
            code: "38",
            region: "Miền Bắc",
        },
        {
            name: "Quảng Trị",
            slug: "quang-tri",
            type: "Thị Trấn",
            name_with_type: "Tỉnh Quảng Trị",
            code: "45",
            region: "Miền Trung",
        },
    ];
    const arrCity = arrTest.map((item) => {
        return { label: item.name, id: item.code };
    });

    const arrTypeSupplier = arrTest.map((item) => {
        return { label: item.type, id: item.code };
    });

    const arrGroupSupplier = arrTest.map((item) => {
        return { label: item.slug, id: item.code };
    });

    const arrRegion = arrTest.map((item) => {
        return { label: item.region, id: item.code };
    });
    const [city, setCity] = useState({ label: "" });
    const [type, setType] = useState({ label: "" });
    const [group, setGroup] = useState({ label: "" });
    const [region, setregion] = useState({ label: "" });
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
                    <Text style={styles.headerTitle}>Tạo mới nhà cung cấp</Text>
                    <TouchableOpacity onPress={() => setIsVisible(false)}>
                        <Text style={styles.headerButton}>Hủy</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.horizontalLine} />
                <View
                    style={{
                        marginTop: scaleHeight(15),
                        marginBottom: scaleHeight(15),
                        // backgroundColor:'red'
                    }}
                >
                    <InputSelect
                        titleTx="NCCScreen.selectedAddress"
                        hintText="supplier.deliveryAddress"
                        isSearch
                        required
                        arrData={arrRegion}
                        dataDefault={region.label}
                        onPressChoice={(item: any) => {
                            setregion(item)
                        }}
                        styleView={{ marginBottom: scaleHeight(15) }}
                    />
                    <InputSelect
                        titleTx="NCCScreen.region"
                        hintTx="NCCScreen.selectRegion"
                        isSearch
                        arrData={arrRegion}
                        dataDefault={region.label}
                        onPressChoice={(item: any) => {
                            setregion(item);
                        }}
                        styleView={{
                            marginBottom: scaleHeight(15),
                        }}
                    />
                    <InputSelect
                        titleText="Tỉnh/Thành phố"
                        hintText="Chọn tỉnh/thành phố"
                        isSearch
                        required={true}
                        arrData={arrCity}
                        dataDefault={city.label}
                        onPressChoice={(item: any) => {
                            setCity(item);
                        }}
                        styleView={{ marginBottom: scaleHeight(15) }}
                    />
                    <InputSelect
                        titleText="Quận/Huyện"
                        hintText="Chọn quận/huyện"
                        isSearch
                        required={true}
                        arrData={arrCity}
                        dataDefault={city.label}
                        onPressChoice={(item: any) => {
                            setCity(item);
                        }}
                        styleView={{ marginBottom: scaleHeight(15) }}
                    />
                    <InputSelect
                        titleText="Phường/Xã"
                        hintText="Chọn phường/xã"
                        isSearch
                        required={true}
                        arrData={arrCity}
                        dataDefault={city.label}
                        onPressChoice={(item: any) => {
                            setCity(item);
                        }}
                        styleView={{ marginBottom: scaleHeight(15) }}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                                // maxLength={maxLenngthPhoneNumber}
                                keyboardType={null}
                                labelTx={"NCCScreen.address"}
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
                                RightIconClear={Svgs.icon_delete2}
                                error={errors?.nameSuppliers?.message}
                                onClearText={() => onChange("")}
                                onChangeText={(value) => onChange(value)}
                                placeholderTx={"NCCScreen.placeholderAddress"}
                            />
                        )}
                        // defaultValue={''}
                        name="nameSuppliers"
                        rules={{
                            required: "Please input data",
                        }}
                    />


                </View>

                {/* btnBottom */}
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
                            borderColor: colors.veryLightGrey,
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
                            backgroundColor: colors.navyBlue,
                        }}
                    >
                        <Text style={{ fontSize: fontSize.size14, color: "white" }}>
                            Tiếp tục
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>
    )
}