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
import { ALERT_TYPE, Toast } from '../../../components/dialog-notification';
import { useStores } from '../../../models';

export const NewDelivery: FC = observer(
    function NewDelivery() {
        const navigation = useNavigation()
        const {orderStore} = useStores()
        const [dataCity, setDataCity] = useState([])
        const [dataDistrict, setDataDistrict] = useState([])
        const [dataWards, setDataWards] = useState([])
        const [city, setCity] = useState({ id: '', label: '' })
        const [district, setDistrict] = useState({ id: '', label: '' })
        const [wards, setWards] = useState({ id: '', label: '' })
        const [valueSwitch, setValueSwitch] = useState(false)
        const [page, setPage] = useState(0)
        const [pageDistrict, setPageDistrict] = useState(0)
        const [pageWards, setPageWards] = useState(0)
        const [size, setSize] = useState(20)
        const [searchCity, setSearchCity] = useState('')
        const [searchDistrict, setSearchDistrict] = useState('')
        const [searchWards, setSearchWards] = useState('')

        const { control, reset, handleSubmit, formState: { errors } } = useForm();

        useEffect(()=>{
            getListCity()
        }, [])

        const getListCity = async ()=>{
            try {
                const response: any = await orderStore.getListCity(
                    page,
                    size,
                    searchCity,
                    366,
                    undefined,
                );
                // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
                if (response && response.kind === "ok") {
                    if (page === 0) {
                        console.log(
                            "getListAttribute---------------------",
                            JSON.stringify(response.response.data)
                        );
                        const newArr = response.response.data.content;
                        const formatArr = newArr.map((item: any) => ({
                            text: item.name,
                            value: item.id,
                        }));
                        setDataCity(formatArr);
                    } else {
                        console.log(
                            "getListAttribute---------------------",
                            JSON.stringify(response.response.data)
                        );
                        const newArr = response.response.data.content;
                        const formatArr = newArr.map((item: any) => ({
                            text: item.name,
                            value: item.id,
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

        const handleSelectCity = (data: any)=>{
            setCity(data)
            //call api lấy data quận/huyện
        }

        const handleSelectDistrict = (data: any)=>{
            setDistrict(data)
            //call api lấy data phường xã
        }

        const handleSelectWards = (data: any)=>{
            setWards(data)
        }
        const handleSelectDistrict1 = ()=>{
            Toast.show({type: ALERT_TYPE.DANGER,
                textBody: 'Vui lòng chọn Tỉnh/Thành phố'
            })
        }

        const handleSelectWards1 = ()=>{
            if(city.label === ''){
                Toast.show({type: ALERT_TYPE.DANGER,
                    textBody: 'Vui lòng chọn Tỉnh/Thành phố'
                })
            }else{
                Toast.show({type: ALERT_TYPE.DANGER,
                    textBody: 'Vui lòng chọn Quận/Huyện'
                })
            }
        }

        const submitAdd = (data: any)=>{
            console.log(city, district,wards, valueSwitch)
            console.log(data)
        }

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
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header
                    LeftIcon={Images.back}
                    onLeftPress={() => navigation.goBack()}
                    headerTx={'order.newDelivery'}
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
                        defaultValue={''}
                        name="phone"
                        rules={{ required: "Phone is required" }}
                    />
                    <InputSelect
                        titleTx={'order.city'}
                        hintTx={'order.chooseCity'}
                        required={true}
                        arrData={dataCity}
                        dataDefault={city.label}
                        onPressChoice={(item) => handleSelectCity(item)}
                        styleView={{ marginVertical: scaleHeight(margin.margin_8) }}
                        onLoadMore={()=> setPage(page+1)}
                    />
                    <InputSelect
                        titleTx={'order.district'}
                        hintTx={'order.chooseDistrict'}
                        required={true}
                        arrData={arrCity}
                        dataDefault={district.label}
                        onPressChoice={(item) => handleSelectDistrict(item)}
                        styleView={{ marginVertical: scaleHeight(margin.margin_8)}}
                        onPressNotUse={()=> handleSelectDistrict1()}
                        checkUse={city.label !== ''? false: true}
                    />
                    <InputSelect
                        titleTx={'order.ward'}
                        hintTx={'order.chooseWard'}
                        required={true}
                        arrData={arrCity}
                        dataDefault={wards.label}
                        onPressChoice={(item) => handleSelectWards(item)}
                        styleView={{ marginVertical: scaleHeight(margin.margin_8)}}
                        onPressNotUse={()=> handleSelectWards1()}
                        checkUse={city.label !== '' && district.label !== '' ? false: true}
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
                        defaultValue={''}
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
                          onPress={handleSubmit(submitAdd)}
                        style={styles.viewBtnConfirm}>
                        <Text tx={"common.saveChange"} style={styles.textBtnConfirm} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    })