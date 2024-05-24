import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, FlatList, TextInput, Platform, Alert, ScrollView } from 'react-native';
import { stylesItem } from '../styles';
import { Images } from '../../../../assets/index';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import Modal from 'react-native-modal'
import { Button, Text, TextField } from '../../../components';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { TxKeyPath, translate } from '../../../i18n';
import { useStores } from '../../../models';
import { el } from 'date-fns/locale';
import { showDialog, showToast } from '../../../utils/toast';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

interface UnitModalProps {
    isVisible: boolean;
    setIsVisible: () => void;
    title?: string;
    titleTx?: TxKeyPath | {};
    onSave: (value: any) => void
    onSaveAndChange: (value: any) => void
}

const UnitModal = (props: UnitModalProps) => {
    const { isVisible, setIsVisible, title, titleTx, onSave, onSaveAndChange } = props;
    const actualTitle = titleTx
        ? translate(titleTx)
        : title;

    const { control, reset, setValue , handleSubmit, watch , formState: { errors }, } = useForm();
    const { unitStore } = useStores()
    const [name, setName] = useState("");
    const [textError, setTextError] = useState('')

    const createUnitName = async (name: string, onclickSave: boolean) => {
         const unitResult = await unitStore.createUnitName(name)
        if (unitResult && unitResult.kind === 'ok') {
            const data = unitResult.result.data;
            const dataModified = {
                id: data.id,
                label: data.name
            };
            if(onclickSave) {
                console.log('--------onSave---111----', dataModified),
                onSave(dataModified)
            }else {
                console.log('--------onSaveAndChange---111----', dataModified),
                onSaveAndChange(dataModified)
            }
        } else {
            showDialog(translate("txtDialog.txt_title_dialog"),'danger', unitResult.result.errorCodes[0].message, translate("common.ok"),'', () => {
                //navigation.goBack()
            })
            //setTextError(unitResult.result.message)
            console.error('Failed to fetch list unit:', unitResult);
        }
    }

    const saveData = async () => {
        createUnitName(name, true)
    }

    const saveAndChange = async () => {
        createUnitName(name, false)
    }    

    useFocusEffect(
        useCallback(() => {
            setName('');
        }, [isVisible])
    )

    return (
        <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            isVisible={isVisible}
            onBackdropPress={setIsVisible}
        >
            <View style={{
                maxHeight: Dimensions.get('screen').height * 0.6,
                width: Dimensions.get('screen').width - scaleWidth(32), backgroundColor: colors.palette.neutral100,
                borderRadius: 8, position: 'absolute', bottom: scaleHeight(20)
            }}>
                <Text style={{
                    fontWeight: '700', fontSize: fontSize.size14,
                    lineHeight: scaleHeight(24),
                    color: colors.palette.nero,
                    marginLeft: scaleWidth(margin.margin_24),
                    marginVertical: scaleHeight(margin.margin_16)
                }} tx={actualTitle} />
                <View style={{
                    flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: scaleWidth(16),
                }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                                keyboardType={'default'}
                                placeholder={'Nhập tên đơn vị tính'}
                                style={{
                                    width: (Dimensions.get('screen').width - scaleWidth(64)),
                                    marginBottom: scaleHeight(10),
                                }}
                                inputStyle={{ marginBottom: Platform.OS === 'ios' ? scaleHeight(padding.padding_8) : 0 }}
                                value={name}
                                onBlur={onBlur}
                                onChangeText={(value) => {
                                    setName(value)
                                    onChange(value)
                                    setTextError('')
                                }}
                                // onClearText={() => onChange('')}
                                // RightIconClear={Images.icon_delete2}
                                showRightIcon={false}
                                multiline={true}
                                error={errors?.Describe?.message}
                            />)}
                        defaultValue={''}
                        name='Describe'
                        rules={{
                            required: "Vui lòng nhập thông tin",
                        }}
                    />
                </View>
                <View style={{
                    marginHorizontal: scaleWidth(margin.margin_16), flexDirection: 'row',
                    justifyContent: 'space-between', marginBottom: scaleHeight(margin.margin_10)
                }}>
                    <Button
                        onPress={handleSubmit(saveData)}
                        tx={'productScreen.save'} style={{
                            height: scaleHeight(48), backgroundColor: colors.palette.neutral100,
                            borderWidth: 1, borderColor: colors.palette.veryLightGrey,
                            width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.48,
                            borderRadius: 8
                        }} textStyle={{
                            color: colors.palette.dolphin, fontWeight: '700',
                            fontSize: fontSize.size14, lineHeight: scaleHeight(24)
                        }} />
                    <Button tx={'productScreen.saveAndChange'} style={{
                        height: scaleHeight(48),
                        backgroundColor: colors.palette.navyBlue,
                        width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.48,
                        borderRadius: 8
                    }}
                        textStyle={{
                            color: colors.palette.neutral100, fontWeight: '700',
                            fontSize: fontSize.size14, lineHeight: scaleHeight(24)
                        }}
                        onPress={handleSubmit(saveAndChange)}
                    />

                </View>
            </View>
        </Modal>
    );
};

export default UnitModal;