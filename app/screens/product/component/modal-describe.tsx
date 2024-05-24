import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View, FlatList, TextInput, Platform, Alert, ScrollView } from 'react-native';
import { stylesItem } from '../styles';
import { Images } from '../../../../assets/index';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import Modal from 'react-native-modal'
import { Button, Text, TextField } from '../../../components';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { TxKeyPath, translate } from '../../../i18n';

const { width, height } = Dimensions.get('screen');

interface DescribeModalProps {
    isVisible: boolean;
    setIsVisible: () => void;
    title?: string;
    titleTx?: TxKeyPath | {};
    onCancel: () => void
    onConfirm: (value: any) => void
    dataDescribe: string 
}

const DescribeModal = (props: DescribeModalProps) => {
    const { isVisible, setIsVisible, title,titleTx, onCancel, onConfirm, dataDescribe } = props;

    const actualTitle = titleTx
    ? translate(titleTx)
    : title;

    const { control, reset, handleSubmit, watch } = useForm();      

    const onSubmit = (data: any) => {
        onConfirm(data)
        console.log(data);
        // reset();
    };

    return (
        <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            isVisible={isVisible}
            // onBackdropPress={setIsVisible}
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
                                            placeholder={'Nhập mô tả'}
                                            style={{ width: (Dimensions.get('screen').width - scaleWidth(64)),
                                                height: Dimensions.get('screen').height *0.3,
                                                marginBottom: scaleHeight(10)
                                             }}
                                            inputStyle={{ marginBottom: Platform.OS === 'ios' ? scaleHeight(padding.padding_8) : 0 }}
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={(value) => onChange(value)}
                                            // onClearText={() => onChange('')}
                                            // RightIconClear={Images.icon_delete2}
                                            showRightIcon={false}
                                            multiline={true}
                                        // error={errors?.phone?.message}
                                        />)}
                                defaultValue={dataDescribe}
                                name='Describe'
                                />
                            </View>
                    <View style={{
                        marginHorizontal: scaleWidth(margin.margin_16), flexDirection: 'row',
                        justifyContent: 'space-between', marginBottom: scaleHeight(margin.margin_10)
                    }}>
                        <Button onPress={() => onCancel()}
                            tx={'common.cancel'} style={{
                                height: scaleHeight(48), backgroundColor: colors.palette.neutral100,
                                borderWidth: 1, borderColor: colors.palette.veryLightGrey,
                                width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.48,
                                borderRadius: 8
                            }} textStyle={{
                                color: colors.palette.dolphin, fontWeight: '700',
                                fontSize: fontSize.size14, lineHeight: scaleHeight(24)
                            }} />
                        <Button tx={'order.confirm'} style={{
                            height: scaleHeight(48),
                            backgroundColor: colors.palette.navyBlue,
                            width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.48,
                            borderRadius: 8
                        }}
                            textStyle={{
                                color: colors.palette.neutral100, fontWeight: '700',
                                fontSize: fontSize.size14, lineHeight: scaleHeight(24)
                            }}
                            onPress={handleSubmit(onSubmit)}
                        />

                    </View>
            </View>
        </Modal>
    );
};

export default DescribeModal;