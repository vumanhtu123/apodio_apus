import { Observer, observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import React, { Dimensions, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { Button, Header, Switch, Text, TextField } from '../../../components';
import { Images } from '../../../../assets';
import { useNavigation } from '@react-navigation/native';
import { InputSelect } from '../../../components/input-select/inputSelect';
import { Controller, useForm } from 'react-hook-form';
import { styles } from './styles';
import { colors, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import { translate } from '../../../i18n';

export const DeliveryAddress: FC = observer(
    function DeliveryAddress() {
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

        const handleChangeAddress = (data: any) => {
            console.log(control)
            let arrText = data.item.address.split(",")
            console.log(arrText)
            setShowAddAddress(true)
            setCity({ label: arrText[3] })
            setDistrict({ label: arrText[2] })
            setWards({ label: arrText[1] })
            setPhone(data.item.phone)
            setAddressChange(arrText[0])
            setValueSwitch(data.item.default)
            console.log(data.item.phone)
            reset()
        }

        const userAddress = [
            {
                id: 1,
                phone: '02468876656',
                address: "85 Hàng Bài, Hoàn Kiếm, Hà Nội",
                default: false,
            },
            {
                id: 2,
                phone: '02468876658',
                address: "Số 945 đường Nguyễn Công Trứ, phố Phúc Thịnh, Phường Bích Đào, Thành phố Ninh Bình, Ninh Bình",
                default: true,
            },
            {
                id: 3,
                phone: '02468876657',
                default: false,
                address: "87 Hàng Bài, Hoàn Kiếm, Hà Nội"
            },
            {
                id: 5,
                phone: '02468876656',
                default: false,
                address: "Số 945 đường Nguyễn Công Trứ, phố Phúc Thịnh, Phường Bích Đào, Thành phố Ninh Bình, Ninh Bình"
            },
            {
                id: 6,
                phone: '02468876656',
                address: "87 Hàng Bài, Hoàn Kiếm, Hà Nội",
                default: false,
            },
            {
                id: 46,
                phone: '02468876656',
                address: "88 Hàng Bài, Hoàn Kiếm, Hà Nội",
                default: false,
            },
            {
                id: 45,
                phone: '02468876656',
                address: "88 Hàng Bài, Hoàn Kiếm, Hà Nội",
                default: false,
            },
            {
                id: 42,
                phone: '02468876656',
                address: "88 Hàng Bài, Hoàn Kiếm, Hà Nội",
                default: false,
            },
            {
                id: 43,
                phone: '02468876656',
                address: "88 Hàng Bài, Hoàn Kiếm, Hà Nội",
                default: false,
            },
        ]
        const addressChoice = {
            name: 'Công ty TNHH Mặt Trời Hồng',
            phone: '02468876656',
            address: "85 Hàng Bài, Hoàn Kiếm, Hà Nội",
            default: false,
            id: 1
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

        const addNewAddress = () => {
            setShowAddAddress(true)
            setCity({ label: '' })
            setDistrict({ label: '' })
            setWards({ label: '' })
            setPhone('')
            setAddressChange('')
            setValueSwitch(false)
            reset()
        }

        return (
            <View>
                <Header
                    LeftIcon={Images.back}
                    onLeftPress={() => navigation.goBack()}
                    headerTx={'order.deliveryAddress'}
                    style={{ height: scaleHeight(54) }}
                />
                <View style={[styles.viewModal]}>
                    <View>
                        <FlatList
                            data={userAddress}
                            style={{ height: '90%' }}
                            showsVerticalScrollIndicator={false}
                            renderItem={(item) => {
                                return (
                                    <View>
                                        <View style={{
                                            flexDirection: 'row', flex: 1,
                                            marginTop: scaleHeight(margin.margin_15),
                                        }}>
                                            <View style={{ flex: 1, }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={styles.textListProduct}>
                                                        {translate("order.phone") + ': '}
                                                    </Text>
                                                    <Text text={item.item.phone} style={styles.textMoney2} />
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('editDelivery' as never, {dataEdit: item})}>
                                                        <Images.icon_edit style={{ marginLeft: scaleWidth(margin.margin_4) }} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    marginVertical: scaleHeight(margin.margin_6)
                                                }}>
                                                    <Text style={styles.textListProduct} >
                                                        {translate("order.address") + ': '}
                                                        <Text style={styles.textMoney2} >{item.item.address}</Text>
                                                    </Text>
                                                </View>
                                            </View>
                                            <View>
                                                {addressChoice.id === item.item.id ?
                                                    <Images.icon_checkGreen width={17} height={13} /> : null}
                                            </View>
                                        </View>
                                        {item.item.default === true ? <View >
                                            <Text tx={'order.deFault'} style={[styles.textMoney2, {
                                                color: colors.palette.radicalRed
                                            }]} />
                                        </View> : null}
                                        <View style={{
                                            height: 1, backgroundColor: '#E7EFFF',
                                            marginTop: scaleHeight(margin.margin_15)
                                        }}></View>
                                    </View>
                                )
                            }}
                        />
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            marginTop: scaleHeight(margin.margin_15),
                        }}
                            onPress={() => navigation.navigate('newDelivery' as never)}
                        >
                            <Images.icon_add width={14} height={14} />
                            <Text tx={'order.addAddress'} style={styles.textAddAddress} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    })