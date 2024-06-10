import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, FlatList, TextInput, Platform, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import Modal from 'react-native-modal'
import { Button, Text, TextField } from '../../../components';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { TxKeyPath, translate } from '../../../i18n';
import { useStores } from '../../../models';
import { useFocusEffect } from '@react-navigation/native';
import { Loading } from '../../../components/dialog-notification';

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

    const { control, reset, setValue, handleSubmit, watch, formState: { errors }, clearErrors } = useForm();
    const { unitStore } = useStores()
    const [name, setName] = useState("");
    const [textError, setTextError] = useState('');

    const createUnitName = async (name: string, onclickSave: boolean) => {
        Loading.show({});
        const unitResult = await unitStore.createUnitName(name)
        if (unitResult && unitResult.kind === 'ok') {
            const data = unitResult.result.data;
            const dataModified = {
                id: data.id,
                label: data.name
            };
            if (onclickSave) {
                console.log('--------onSave---111----', dataModified),
                    onSave(dataModified)
            } else {
                console.log('--------onSaveAndChange---111----', dataModified),
                    onSaveAndChange(dataModified)
            }
            Loading.hide();
        } else {
            Loading.hide();
            setTextError(unitResult.result.errorCodes[0].message)
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
            reset();
            clearErrors();
        }, [isVisible])
    )

    return (
        <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            isVisible={isVisible}
            avoidKeyboard={true}
            onBackdropPress={setIsVisible}
            onBackButtonPress={setIsVisible}
            style={{margin: 0}}
        >
            <TouchableWithoutFeedback onPress={setIsVisible}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <TouchableWithoutFeedback onPress={() => {}}>

                
                <View style={{
                    maxHeight: Dimensions.get('screen').height * 0.6,
                    width: '100%', backgroundColor: colors.palette.neutral100,
                    borderTopLeftRadius: margin.border_top_left_radius, 
                    borderTopRightRadius: margin.border_top_right_radius,
                    position: 'absolute', bottom: 0,
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
                                        width: (Dimensions.get('screen').width - scaleWidth(32)),
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
                                    error={textError}
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
                        justifyContent: 'space-between', marginBottom: scaleHeight(margin.margin_15)
                    }}>
                        <Button
                            onPress={handleSubmit(saveData)}
                            tx={'productScreen.save'} style={{
                                height: scaleHeight(48), backgroundColor: colors.palette.neutral100,
                                borderWidth: 1, borderColor: colors.palette.veryLightGrey,
                                width: (Dimensions.get('screen').width - scaleWidth(32)) * 0.48,
                                borderRadius: 8
                            }} textStyle={{
                                color: colors.palette.dolphin, fontWeight: '700',
                                fontSize: fontSize.size14, lineHeight: scaleHeight(24)
                            }} />
                        <Button tx={'productScreen.saveAndChange'} style={{
                            height: scaleHeight(48),
                            backgroundColor: colors.palette.navyBlue,
                            width: (Dimensions.get('screen').width - scaleWidth(32)) * 0.48,
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
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default UnitModal;