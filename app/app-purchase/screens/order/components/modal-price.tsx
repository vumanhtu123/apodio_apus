import 'numeral/locales/vi';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, View, ViewStyle } from 'react-native';
import { Button, Text, TextField } from '../../../../components';
import { translate, TxKeyPath } from '../../../../i18n';
import { useStores } from '../../../models';
import { colors, fontSize, margin, scaleHeight, scaleWidth } from '../../../theme';
import { formatCurrency, formatNumberByString } from '../../../utils/validate';
import { CustomModal } from '../../../../components/custom-modal';

interface PriceModalProps {
    isVisible: boolean;
    setIsVisible: () => void;
    title?: string;
    titleTx?: TxKeyPath | {};
    placeholder?: string;
    placeholderTx?: TxKeyPath | {};
    titleInput?: string;
    titleInputTx?: TxKeyPath | {};
    onCancel: () => void
    onConfirm: (value: any) => void
    id?: number;
    rightText?: any;
}

const VIEWMODAL: ViewStyle = {
    justifyContent: 'flex-end',
    margin: 0,
}

const PriceModal = (props: PriceModalProps) => {
    const { isVisible, setIsVisible, title, titleTx, titleInputTx, titleInput, rightText, placeholderTx, placeholder, onCancel, onConfirm, id } = props;
    const { vendorStore } = useStores();
    const { control, reset, handleSubmit, watch, setValue } = useForm({
    });
    const [valueCheck, setValueCheck] = useState<any>()
    const onSubmit = () => {
        const formatValue = formatNumberByString(valueCheck)
        const formatDots = formatValue.replace(/,/g, '.');
        console.log('first', formatDots)
        onConfirm(formatDots);
        reset();
    }
    const [modalNotify, setModalNotify] = useState(false)
    const [modalClose, setModalClose] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    const titleModal = titleTx ? titleTx : title;
    const titleInputText = titleInputTx ? titleInputTx : titleInput;
    const placeholderInputText = placeholderTx ? placeholderTx : placeholder;

    return (
        <CustomModal
            isVisible={isVisible}
            setIsVisible={() => setIsVisible}
            isVisibleLoading={showLoading}
        >
            <View style={{
                // maxHeight: Dimensions.get('screen').height * 0.6,
                // width: '100%',
                backgroundColor: colors.palette.neutral100,
                bottom: 0
            }}>
                <Text style={{
                    fontWeight: '700', fontSize: fontSize.size14,
                    lineHeight: scaleHeight(24),
                    color: colors.palette.nero,
                    // marginLeft: scaleWidth(margin.margin_24),
                    marginVertical: scaleHeight(margin.margin_16)
                }} tx={titleModal} />
                <View style={{ height: scaleHeight(1), backgroundColor: colors.palette.ghostWhite }} />
                <View style={{
                    // paddingHorizontal: scaleWidth(16),
                    marginVertical: scaleHeight(margin.margin_16),
                }}>
                    <Controller
                        control={control}
                        // defaultValue={0}
                        name={`price.${id}.price`}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                                // keyboardType={'numeric'}
                                labelTx={titleInputText}
                                style={{
                                    width: '100%'
                                }}
                                value={value}
                                onBlur={onBlur}
                                valueCurrency={rightText}
                                onChangeText={(value) => {
                                    onChange(vendorStore.companyInfo.thousandSeparator === 'DOTS' ? formatCurrency(value) : formatCurrency(value))
                                    setValueCheck(value !== '' ? formatCurrency(value) : 0)
                                }}
                                showRightIcon={false}
                                maxLength={15}
                                placeholder={placeholder}
                            />)}
                        rules={{ required: translate('productScreen.enterProduct') }}
                    />
                </View>
                <View style={{
                    // marginHorizontal: scaleWidth(margin.margin_16),
                    flexDirection: 'row',
                    justifyContent: 'space-between', marginBottom: scaleHeight(margin.margin_15)
                }}>
                    <Button onPress={() => {
                        onCancel()
                        // setModalClose(true)
                    }}
                        tx={'productScreen.cancel'} style={{
                            height: scaleHeight(48), backgroundColor: colors.palette.neutral100,
                            borderWidth: 1, borderColor: colors.palette.veryLightGrey,
                            width: (Dimensions.get('screen').width - scaleWidth(32)) * 0.48,
                            borderRadius: 8
                        }} textStyle={{
                            color: colors.palette.dolphin, fontWeight: '700',
                            fontSize: fontSize.size14, lineHeight: scaleHeight(24)
                        }} />
                    <Button tx={'productScreen.BtnNotificationAccept'} style={{
                        height: scaleHeight(48),
                        backgroundColor: colors.palette.navyBlue,
                        width: (Dimensions.get('screen').width - scaleWidth(32)) * 0.48,
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
        </CustomModal>
    );
};

export default PriceModal;