import { Observer, observer } from 'mobx-react-lite';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import React, { KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { Button, Header, Switch, Text, TextField } from '../../../components';
import { styles } from './styles';
import { Images } from '../../../../assets';
import { InputSelect } from '../../../components/input-select/inputSelect';
import { colors, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ALERT_TYPE, Dialog, Toast } from '../../../components/dialog-notification';
import { Root1 } from '../../../models/order-store/order-address-model';
import { useStores } from '../../../models';
import { phoneNumberPattern } from '../../../utils/validate';
import { translate } from '../../../i18n';
export const EditDelivery: FC = observer(
    function EditDelivery() {
        const navigation = useNavigation()
        const route = useRoute()
        const {orderStore} = useStores()
        const [dataCity, setDataCity] = useState<{}[]>([])
        const [dataDistrict, setDataDistrict] = useState<{}[]>([])
        const [dataWards, setDataWards] = useState<{}[]>([])
        const [city, setCity] = useState({ id: 0, label: '' })
        const [district, setDistrict] = useState({ id: 0, label: '' })
        const [wards, setWards] = useState({ id: 0, label: '' })
        const [valueSwitch, setValueSwitch] = useState(false)
        const [page, setPage] = useState(0)
        const [pageDistrict, setPageDistrict] = useState(0)
        const [pageWards, setPageWards] = useState(0)
        const [size, setSize] = useState(100)
        const [searchCity, setSearchCity] = useState('')
        const [searchDistrict, setSearchDistrict] = useState('')
        const [searchWards, setSearchWards] = useState('')
        const dataEdit: Root1 = route?.params?.dataEdit

        const { control, reset, handleSubmit,formState: { errors }, setError } = useForm({
            defaultValues: {phone: dataEdit.phoneNumber, address: dataEdit.address}
        });

        useEffect(() => {
            console.log(dataEdit)
            setCity({ label: dataEdit.city.name, id: dataEdit.city.id })
            setDistrict({ label: dataEdit.district.name, id: dataEdit.district.id })
            setWards({ label: dataEdit.ward.name, id: dataEdit.ward.id })
            setValueSwitch(dataEdit.isDefault)
            getListCity()
            getListDistrict(dataEdit.city.id)
            getListWard(dataEdit.district.id)
        }, [])

        const getListCity = async () => {
            try {
                const response = await orderStore.getListCity(
                    page,
                    size,
                    searchCity,
                    366,
                    // undefined,
                );
                if (response && response.kind === "ok") {
                    if (page === 0) {
                        console.log(
                            "getListCity---------------------",
                            JSON.stringify(response.response.data.content)
                        );
                        const newArr = response.response.data.content;
                        const formatArr = newArr.map((item: any) => ({
                            label: item.name,
                            id: item.id,
                        }));
                        setDataCity(formatArr);
                    } else {
                        console.log(
                            "getListCity---------------------",
                            JSON.stringify(response.response.data)
                        );
                        const newArr = response.response.data.content;
                        const formatArr = newArr.map((item: any) => ({
                            label: item.name,
                            id: item.id,
                        }));
                        const endArr = dataCity.concat(formatArr);
                        setDataCity(endArr);
                    }
                } else {
                    console.error("Failed to fetch categories:", response);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        const getListDistrict = async (value: any) => {
            try {
                const response = await orderStore.getListDistrict(
                    page,
                    size,
                    searchDistrict,
                    value,
                );
                // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
                if (response && response.kind === "ok") {
                    if (page === 0) {
                        console.log(
                            "getListDistrict---------------------",
                            JSON.stringify(response.response.data.content)
                        );
                        const newArr = response.response.data.content;
                        const formatArr = newArr.map((item: any) => ({
                            label: item.name,
                            id: item.id,
                        }));
                        setDataDistrict(formatArr);
                    } else {
                        console.log(
                            "getListDistrict---------------------",
                            JSON.stringify(response.response.data)
                        );
                        const newArr = response.response.data.content;
                        const formatArr = newArr.map((item: any) => ({
                            label: item.name,
                            id: item.id,
                        }));
                        const endArr = dataDistrict.concat(formatArr);
                        setDataDistrict(endArr);
                    }
                } else {
                    console.error("Failed to fetch categories:", response);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }
        const getListWard = async (value: any) => {
            try {
                const response = await orderStore.getListWard(
                    page,
                    size,
                    searchWards,
                    value,
                );
                if (response && response.kind === "ok") {
                    if (page === 0) {
                        console.log(
                            "getListWard---------------------",
                            JSON.stringify(response.response.data.content)
                        );
                        const newArr = response.response.data.content;
                        const formatArr = newArr.map((item: any) => ({
                            label: item.name,
                            id: item.id,
                        }));
                        setDataWards(formatArr);
                    } else {
                        console.log(
                            "getListWard---------------------",
                            JSON.stringify(response.response.data)
                        );
                        const newArr = response.response.data.content;
                        const formatArr = newArr.map((item: any) => ({
                            label: item.name,
                            id: item.id,
                        }));
                        const endArr = dataWards.concat(formatArr);
                        setDataWards(endArr);
                    }
                } else {
                    console.error("Failed to fetch categories:", response);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        }

        const handleSelectCity = (data: any) => {
            setCity(data)
            setDistrict({ id: 0, label: '' })
            setWards({ id: 0, label: '' })
            getListDistrict(data.id)
        }

        const handleSelectDistrict = (data: any) => {
            setDistrict(data)
            setWards({ id: 0, label: '' })
            getListWard(data.id)
        }

        const handleSelectWards = (data: any) => {
            setWards(data)
        }

        const handleSelectDistrict1 = () => {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                textBody: 'Vui lòng chọn Tỉnh/Thành phố'
            })
        }

        const handleSelectWards1 = () => {
            if (city.label === '') {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    textBody: 'Vui lòng chọn Tỉnh/Thành phố'
                })
            } else {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    textBody: 'Vui lòng chọn Quận/Huyện'
                })
            }
        }

        const submitEdit = async (data: any) => { 
            if (data.address === '' || data.phone === '' || city.id === 0 || district.id === 0 || wards.id === 0) {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    textBody: 'Vui lòng nhập đủ thông tin'
                })
            } else {
                const newCountry = { id: 366, name: 'Việt Nam' }
                const newCity = { id: city.id, name: city.label }
                const newDistrict = { id: district.id, name: district.label }
                const newWard = { id: wards.id, name: wards.label }
                const dataCreate = {
                    id: dataEdit.id,
                    partnerId: 953,
                    phoneNumber: data.phone,
                    addressType: "DELIVERY_ADDRESS",
                    country: newCountry,
                    city: newCity,
                    district: newDistrict,
                    ward: newWard,
                    address: data.address,
                    isDefault: valueSwitch,
                }
                try {
                    const response = await orderStore.createAddress(dataCreate)

                    if (response && response.kind === "ok") {
                        Dialog.show({
                            type: ALERT_TYPE.INFO,
                            title: translate("productScreen.Notification"),
                            textBody: translate("order.editAddressDialog"),
                            button2: translate("productScreen.BtnNotificationAccept"),
                            closeOnOverlayTap: false,
                            onPressButton: () => {
                                navigation.goBack()
                                orderStore.setReloadAddressScreen(true)
                                Dialog.hide();
                            }
                        })
                    } else {
                        Dialog.show({
                            type: ALERT_TYPE.DANGER,
                            title: translate("txtDialog.txt_title_dialog"),
                            textBody: response.response.errorCodes[0].message,
                            button: translate("common.ok"),
                            closeOnOverlayTap: false
                        })
                        console.error("Failed to fetch categories:", response.response.message);
                    }
                } catch (error) {
                    console.error("Error fetching categories:", error);
                }
            }
        }

        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header
                    LeftIcon={Images.back}
                    onLeftPress={() => navigation.goBack()}
                    headerTx={'order.editDelivery'}
                    style={{ height: scaleHeight(54) }}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                    style={{ marginHorizontal: scaleWidth(16), marginTop: scaleHeight(10) }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                                keyboardType='numeric'
                                maxLength={10}
                                labelTx={"order.phone"}
                                style={styles.viewTextField}
                                inputStyle={{ marginBottom: Platform.OS === 'ios' ? scaleHeight(padding.padding_8) : 0 }}
                                value={value}
                                onBlur={onBlur}
                                onChangeText={(value) => {
                                    onChange(value)
                                    if (phoneNumberPattern.test(value) === false) {
                                        setError('phone', { type: 'validate', message: 'Số điện thoại gồm 10 chữ số bắt đầu bằng số 0' })
                                    }else{
                                        setError('phone', null)
                                    }
                                }}
                                onClearText={() => onChange('')}
                                RightIconClear={Images.icon_delete2}
                                isImportant={true}
                                error={errors?.phone?.message}
                                // defaultValue={dataEdit.phoneNumber}
                            />)}
                        name="phone"
                        rules={{ required: "Số điện thoại là bắt buộc" }}
                    />
                    <InputSelect
                        titleTx={'order.city'}
                        hintTx={'order.chooseCity'}
                        required={true}
                        arrData={dataCity}
                        dataDefault={city.label}
                        onPressChoice={(item) => handleSelectCity(item)}
                        styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
                        isSearch={true}
                        onSearch={(text: any) => setSearchCity(text)}
                    />
                    <InputSelect
                        titleTx={'order.district'}
                        hintTx={'order.chooseDistrict'}
                        required={true}
                        arrData={dataDistrict}
                        dataDefault={district.label}
                        onPressChoice={(item) => handleSelectDistrict(item)}
                        styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
                        onPressNotUse={() => handleSelectDistrict1()}
                        checkUse={city.label !== '' ? false : true}
                        isSearch={true}
                        onSearch={(text: any) => setSearchDistrict(text)}
                    />
                    <InputSelect
                        titleTx={'order.ward'}
                        hintTx={'order.chooseWard'}
                        required={true}
                        arrData={dataWards}
                        dataDefault={wards.label}
                        onPressChoice={(item) => handleSelectWards}
                        styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
                        onPressNotUse={() => handleSelectWards1()}
                        checkUse={city.label !== '' && district.label !== '' ? false : true}
                        isSearch={true}
                        onSearch={(text: any) => setSearchWards(text)}
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
                                error={errors?.address?.message}
                                // defaultValue={dataEdit.address}
                            />)}
                        name="address"
                        rules={{ required: "Địa chỉ là bắt buộc" }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ flex: 1 }} tx={'order.addressDefault'} />
                        <Switch
                            value={valueSwitch}
                            onToggle={() => { setValueSwitch(!valueSwitch) }}
                        />
                    </View>
                </KeyboardAvoidingView>
                <View
                    style={styles.viewGroupBtn}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack()
                        }}
                        style={styles.viewBtnCancel}>
                        <Text tx={"common.cancel"} style={styles.textBtnCancel} />
                    </TouchableOpacity>
                    <TouchableOpacity
                          onPress={handleSubmit(submitEdit)}
                        style={styles.viewBtnConfirm}>
                        <Text tx={"common.saveChange"} style={styles.textBtnConfirm} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    })