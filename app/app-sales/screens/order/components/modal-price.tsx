import 'numeral/locales/vi';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Dimensions, KeyboardAvoidingView, Platform, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text, TextField } from '../../../../app-purchase/components';
import Dialog from '../../../../app-purchase/components/dialog/dialog';
import { TxKeyPath, translate } from '../../../i18n';
import { useStores } from '../../../models';
import { colors, fontSize, margin, scaleHeight, scaleWidth } from '../../../theme';
import { addCommas, formatCurrency, formatNumberByString, removeNonNumeric } from '../../../utils/validate';
import { TextFieldCurrency } from '../../../../app-purchase/components/text-field-currency/text-field-currency';
import { Svgs } from '../../../../../assets/svgs';
import { CustomModal } from '../../../../app-purchase/components/custom-modal';
const { width, height } = Dimensions.get('screen');

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
    const priceWatch = watch('price');
    // console.log(priceWatch , 'checkkkk')
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
        // <Modal
        //     animationIn={'fadeIn'}
        //     animationOut={'fadeOut'}
        //     isVisible={isVisible}
        //     style={VIEWMODAL}
        //     avoidKeyboard={true}
        // >
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
                                // RightIconClear={Images.icon_delete2}
                                // onClearText={() => onChange('')}
                                valueCurrency={rightText}
                                onChangeText={(value) => {
                                    onChange(vendorStore.companyInfo.thousandSeparator === 'DOTS' ? formatCurrency(value) : formatCurrency(value))
                                    setValueCheck(value !== '' ? formatCurrency(value) : 0)
                                }}
                                // isImportant={true}
                                showRightIcon={false}
                                maxLength={15}
                                placeholder={placeholder}
                            />)}
                        rules={{ required: "Nhập giá sản phẩm" }}
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



        // </Modal>
    );
};

export default PriceModal;