import { Observer, observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import React, { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { Button, Header, Switch, Text, TextField } from '../../../components';
import { styles } from './styles';
import { Images } from '../../../../assets';
import { InputSelect } from '../../../components/input-select/inputSelect';
import { colors, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import { useNavigation } from '@react-navigation/native';
export const EditDelivery: FC = observer(
    function EditDelivery() {
        const navigation = useNavigation()
        const [reason, setReason] = useState({ label: '' })
        const [city, setCity] = useState({})
        const [district, setDistrict] = useState({})
        const [wards, setWards] = useState({})
        const [phone, setPhone] = useState('')
        const [addressChange, setAddressChange] = useState('')
        const [valueSwitch, setValueSwitch] = useState(false)
        const [showAddAddress, setShowAddAddress] = useState(false)

        const { control, reset, handleSubmit, formState: { errors } } = useForm();

        useEffect(()=>{
            
        },[])
        const arrTest = [
            {
                "name": "An Giang",
                "slug": "an-giang",
                "type": "tinh",
                "name_with_type": "Tỉnh An Giang",
                "code": "89",
            },
            {
                "name": "Kon Tum",
                "slug": "kon-tum",
                "type": "tinh",
                "name_with_type": "Tỉnh Kon Tum",
                "code": "62",
            },
            {
                "name": "Đắk Nông",
                "slug": "dak-nong",
                "type": "tinh",
                "name_with_type": "Tỉnh Đắk Nông",
                "code": "67",
            },
            {
                "name": "Sóc Trăng",
                "slug": "soc-trang",
                "type": "tinh",
                "name_with_type": "Tỉnh Sóc Trăng",
                "code": "94",
            },
            {
                "name": "Bình Phước",
                "slug": "binh-phuoc",
                "type": "tinh",
                "name_with_type": "Tỉnh Bình Phước",
                "code": "70",
            },
            {
                "name": "Hưng Yên",
                "slug": "hung-yen",
                "type": "tinh",
                "name_with_type": "Tỉnh Hưng Yên",
                "code": "33",
            },
            {
                "name": "Thanh Hóa",
                "slug": "thanh-hoa",
                "type": "tinh",
                "name_with_type": "Tỉnh Thanh Hóa",
                "code": "38",
            },
            {
                "name": "Quảng Trị",
                "slug": "quang-tri",
                "type": "tinh",
                "name_with_type": "Tỉnh Quảng Trị",
                "code": "45",
            },
        ]
        const arrCity = arrTest.map((item) => {
            return { label: item.name, id: item.code }
        })

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header
                LeftIcon={Images.back}
                onLeftPress={()=> navigation.goBack()}
                headerTx={'order.editDelivery'}
                style={{height: scaleHeight(54)}}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                    style={{ marginHorizontal: scaleWidth(16), marginTop: scaleHeight(10)}}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                                keyboardType={null}
                                labelTx={"order.phone"}
                                style={styles.viewTextField}
                                inputStyle={{ marginBottom: Platform.OS === 'ios' ? scaleHeight(padding.padding_8) : 0 }}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                onClearText={() => onChange('')}
                                RightIconClear={Images.icon_delete2}
                                isImportant={true}
                                error={errors?.phone?.message}
                            />)}
                        defaultValue={phone}
                        name="phone"
                        rules={{ required: "Phone is required" }}
                    />
                    <InputSelect
                        titleTx={'order.city'}
                        hintTx={'order.chooseCity'}
                        required={true}
                        arrData={arrCity}
                        dataDefault={city.label}
                        onPressChoice={(item) => {
                            setCity(item)
                        }}
                        styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
                    />
                    <InputSelect
                        titleTx={'order.district'}
                        hintTx={'order.chooseDistrict'}
                        required={true}
                        arrData={arrCity}
                        dataDefault={district.label}
                        onPressChoice={(item) => {
                            setDistrict(item)
                        }}
                        styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
                    />
                    <InputSelect
                        titleTx={'order.ward'}
                        hintTx={'order.chooseWard'}
                        required={true}
                        arrData={arrCity}
                        dataDefault={wards.label}
                        onPressChoice={(item) => {
                            setWards(item)
                        }}
                        styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                                keyboardType={null}
                                labelTx={"order.address"}
                                style={styles.viewTextField}
                                inputStyle={{ marginBottom: Platform.OS === 'ios' ? scaleHeight(padding.padding_8) : 0 }}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={(value) => onChange(value)}
                                onClearText={() => onChange('')}
                                RightIconClear={Images.icon_delete2}
                                isImportant={true}
                                error={errors?.phone?.message}
                            />)}
                        defaultValue={addressChange}
                        name="address"
                        rules={{ required: "Address is required" }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 1 }} tx={'order.addressDefault'} />
                        <Switch

                            value={valueSwitch}
                            onToggle={() => { setValueSwitch(!valueSwitch) }}
                        />
                    </View>
                </KeyboardAvoidingView>
                {/* <View style={{
                    flexDirection: 'row',
                    marginTop: scaleHeight(margin.margin_10),
                    justifyContent: 'space-between'
                }}>
                    <Button style={styles.buttonCancelModal}
                        tx={'common.cancel'}
                        textStyle={{ color: colors.palette.navyBlue }}
                        onPress={() => setShowAddAddress(false)}
                    />
                    <Button
                        onPress={handleSubmit(handleChangeAddress)}
                        style={styles.buttonConfirmModal}
                        tx={'order.confirm'}
                    />
                </View> */}
                <View
        style={styles.viewGroupBtn}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}
          style={styles.viewBtnCancel}>
          <Text tx={"common.cancel"} style={styles.textBtnCancel}/>
        </TouchableOpacity>
        <TouchableOpacity
        //   onPress={handleSubmit(submitAdd)}
          style={styles.viewBtnConfirm}>
          <Text tx={"createProductScreen.done"} style={styles.textBtnConfirm}/>
        </TouchableOpacity>
      </View>
            </View>
        )
    })