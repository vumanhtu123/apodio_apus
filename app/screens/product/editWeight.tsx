import { Observer, observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import React, { TouchableOpacity, View } from 'react-native';
import ItemWeight from './component/weight-component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FormProvider, useForm } from 'react-hook-form';
import { Header, Text } from '../../components';
import { Images } from '../../../assets';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../theme';
import { formatNumberFloat } from '../../utils/validate';
export const EditWeight: FC = observer(
    function EditWeight() {
        const route = useRoute()
        const navigation = useNavigation()
        const { data, check, unitData, unitOrigin, index, dataCreateProduct }: any = route.params
        const methods = useForm()

        useEffect(() => {
            console.log(JSON.stringify(data))
            methods.setValue(`weight`, (data?.weight))
            methods.setValue(`weightOriginal`, (data?.weightOriginal))
            methods.setValue(`volumeOriginal`, (data?.volumeOriginal))
        }, [])

        const submitAdd = (data: any) => {
            console.log(data)
            console.log(dataCreateProduct)
            console.log(dataCreateProduct[0].weight)
            console.log(index)
            dataCreateProduct[index].weight.volumeOriginal = data.volumeOriginal
            dataCreateProduct[index].weight.weightOriginal = data.weightOriginal
            dataCreateProduct[index].weight.weight = data.weight
            console.log(dataCreateProduct[0].weight)
            navigation.navigate({name: 'ProductCreateScreen', params: {newDataCreateProduct: dataCreateProduct}} as never)
        }

        return (
            <FormProvider {...methods}>
                <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
                    <Header
                        LeftIcon={Images.back}
                        onLeftPress={() => navigation.goBack()}
                        headerTx='productScreen.editWeight'
                        style={{ height: scaleHeight(54) }}
                    />
                    <View style={{ paddingHorizontal: scaleWidth(16) }}>
                        <TouchableOpacity style={{ marginTop: scaleHeight(20) }} onPress={() => {
                            methods.setValue(`weight`, (data.weight))
                            methods.setValue(`weightOriginal`, (data.weightOriginal))
                            methods.setValue(`volumeOriginal`, (data.volumeOriginal))
                        }}>
                            <Text tx='productScreen.resetDefault'
                                style={{
                                    fontWeight: '400', fontSize: fontSize.size12, alignSelf: 'flex-end',
                                    color: colors.navyBlue
                                }} />
                        </TouchableOpacity>
                        <ItemWeight
                            dataDefault={data}
                            dataUnitGroup={unitOrigin}
                            checkList={check}
                            data={unitData}
                            setAdd={methods.watch(`weight`)}
                        ></ItemWeight>
                    </View>
                </View>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    backgroundColor: "white",
                    paddingVertical: scaleHeight(20),
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={{
                            width: scaleWidth(165),
                            height: scaleHeight(48),
                            justifyContent: "center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: colors.palette.veryLightGrey,
                        }}>
                        <Text tx={"common.cancel"} style={{
                            fontSize: fontSize.size14,
                            color: colors.palette.dolphin,
                            lineHeight: scaleHeight(24),
                            fontWeight: "600",
                        }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={methods.handleSubmit(submitAdd)}
                        style={{
                            width: scaleWidth(150),
                            height: scaleHeight(48),
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                            backgroundColor: colors.palette.navyBlue,
                        }}>
                        <Text tx={"productScreen.save"} style={{
                            fontSize: fontSize.size14,
                            color: colors.palette.neutral100,
                            lineHeight: scaleHeight(24),
                            fontWeight: "600",
                        }} />
                    </TouchableOpacity>
                </View>
            </FormProvider>
        )
    })