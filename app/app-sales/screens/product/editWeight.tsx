import { Observer, observer } from 'mobx-react-lite';
import { FC, useEffect } from 'react';
import React, { TouchableOpacity, View } from 'react-native';
import ItemWeight from './component/weight-component';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FormProvider, useForm } from 'react-hook-form';
import { Header, Text } from '../../../components';
import { Svgs } from '../../../../assets/svgs';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../theme';
import { commasToDots, formatCurrency, formatNumberFloat } from '../../utils/validate';
import { ALERT_TYPE, Toast } from '../../../components/dialog-notification';
import { translate } from '../../i18n';
export const EditWeight: FC = observer(
    function EditWeight() {
        const route = useRoute()
        const navigation = useNavigation()
        const { data, check, unitData, unitOrigin, index, dataCreateProduct, screen }: any = route.params
        const methods = useForm()

        useEffect(() => {
            console.log(data?.weight) 
            methods.setValue(`weight`, data?.weight ?? [])
            methods.setValue(`weightOriginal`, data?.weightOriginal ?? '')
            methods.setValue(`volumeOriginal`, data?.volumeOriginal ?? '')
        }, [])

        const submitAdd = (data: any) => {
            let hasError = false

            const unit = data.weight?.flatMap((items: any)=> items.unit)
            const weight1 = data.weight?.flatMap((items: any)=> items.weight1)
            const volume = data.weight?.flatMap((items: any)=> items.volume)
            const checkUnit = unit?.some((item: any) => Object.keys(item).length===0 )
            const checkWeight1 = weight1?.some((item: any) => item?.trim() === "" )
            const checkVolume = volume?.some((item: any) => item?.trim() === "" )
            if(checkUnit == true || checkWeight1 == true || checkVolume == true || data.weightOriginal.trim() ==="" || data.volumeOriginal.trim() === ""){
                hasError = true
            }else{
                hasError = false
            }

            if(hasError == true){
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "",
                    textBody: translate("txtToats.input_weight"),
                  });
            }else{
                dataCreateProduct[index].weight.volumeOriginal = data.volumeOriginal
                dataCreateProduct[index].weight.weightOriginal = data.weightOriginal
                dataCreateProduct[index].weight.weight = data.weight
                console.log(dataCreateProduct[0].weight)
                if (screen === 'edit') {
                    navigation.navigate({name: 'ProductEditScreen', params: {newDataCreateProduct: dataCreateProduct}} as never)
                } else {
                    navigation.navigate({name: 'ProductCreateScreen', params: {newDataCreateProduct: dataCreateProduct}} as never)
                }
            }
        }

        return (
            <FormProvider {...methods}>
                <View style={{ backgroundColor: colors.white, flex: 1 }}>
                    <Header
                        LeftIcon={Svgs.back}
                        onLeftPress={() => navigation.goBack()}
                        headerTx='productScreen.editWeight'
                        style={{ height: scaleHeight(54) }}
                    />
                    <View style={{ paddingHorizontal: scaleWidth(16) }}>
                        <TouchableOpacity style={{ marginTop: scaleHeight(20) }} onPress={() => {
                            methods.setValue(`weight`, data.weight)
                            methods.setValue(`weightOriginal`, data.weightOriginal)
                            methods.setValue(`volumeOriginal`, data.volumeOriginal)
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
                            setAdd={methods.getValues(`weight`)}
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