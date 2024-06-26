import 'numeral/locales/vi';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Dimensions, KeyboardAvoidingView, Platform, View, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { Button, Text, TextField } from '../../../components';
import Dialog from '../../../components/dialog/dialog';
import { TxKeyPath, translate } from '../../../i18n';
import { useStores } from '../../../models';
import { colors, fontSize, margin, scaleHeight, scaleWidth } from '../../../theme';
import { addCommas, formatCurrency, formatNumberByString, removeNonNumeric } from '../../../utils/validate';
import { TextFieldCurrency } from '../../../components/text-field-currency/text-field-currency';
const { width, height } = Dimensions.get('screen');

interface PriceModalProps {
    isVisible: boolean;
    setIsVisible: () => void;
    title?: string;
    titleTx?: TxKeyPath | {};
    onCancel: () => void
    onConfirm: (value: any) => void
    id?: number;
}

const VIEWMODAL: ViewStyle = {
    justifyContent: 'flex-end',
    margin: 0,
}

const PriceModal = (props: PriceModalProps) => {
    const { isVisible, setIsVisible, title, titleTx, onCancel, onConfirm, id } = props;
    const { vendorStore } = useStores();
    const { control, reset, handleSubmit, watch } = useForm({
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
    
    return (
        <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            isVisible={isVisible}
            style={VIEWMODAL}
            avoidKeyboard={true}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
                style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}
            >
                <View style={{
                    maxHeight: Dimensions.get('screen').height * 0.6,
                    width: '100%',
                    backgroundColor: colors.palette.neutral100,
                    borderTopRightRadius: 8,
                    borderTopLeftRadius: 8,
                    position: 'absolute',
                    bottom: 0
                }}>
                    <Text style={{
                        fontWeight: '700', fontSize: fontSize.size14,
                        lineHeight: scaleHeight(24),
                        color: colors.palette.nero,
                        marginLeft: scaleWidth(margin.margin_24),
                        marginVertical: scaleHeight(margin.margin_16)
                    }} tx={'selectPriceListApply.inputPrice'} />
                    <View style={{ height: scaleHeight(1), backgroundColor: colors.palette.ghostWhite }} />
                    <View style={{
                        paddingHorizontal: scaleWidth(16), marginVertical: scaleHeight(margin.margin_16),
                    }}>
                        <Controller
                            control={control}
                            name={`price.${id}.price`}
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextField
                                    // keyboardType={'numeric'}
                                    labelTx={'productScreen.priceProduct'}
                                    style={{
                                        width: '100%'
                                    }}
                                    inputStyle={{
                                        // marginTop: scaleHeight(4)
                                    }}
                                    value={value}
                                    onBlur={onBlur}
                                    // onChangeText={(value) => {
                                    //     onChange(value)
                                    //     setValueCheck(value)
                                    // }}
                                    onChangeText={(value) => {
                                        onChange(vendorStore.companyInfo.thousandSeparator === 'DOTS' ? formatCurrency(value) : formatCurrency(removeNonNumeric(value)))
                                        setValueCheck(formatCurrency(value))
                                    }}
                                    // isImportant={true}
                                    showRightIcon={false}
                                    maxLength={15}
                                    placeholder='Nhập giá'
                                />)}
                            rules={{ required: "Nhập giá sản phẩm" }}
                            
                        />
                    </View>
                    <View style={{
                        marginHorizontal: scaleWidth(margin.margin_16), flexDirection: 'row',
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
                <Dialog
                    onPressCancel={() => setModalClose(false)}
                    onPressAccept={() => {
                        onCancel()
                        setModalClose(false)
                    }}
                    isVisible={modalClose}
                    title={"productScreen.Notification"}
                    content={"productScreen.NotifyCloseModal"}
                    titleBTN1="productScreen.cancel"
                    titleBTN2="productScreen.BtnNotificationAccept"
                    styleBTN1={{
                        backgroundColor: "white",
                        borderWidth: 1,
                        borderColor: "#d5d5d5",
                        borderRadius: 8,
                    }}
                    styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8 }}
                />
                <Dialog
                    isVisible={modalNotify}
                    title={"productScreen.Notification"}
                    content={"productScreen.NotifyModal"}
                    titleBTN2="productScreen.BtnNotificationAccept"
                    styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8 }}
                    onPressAccept={() => setModalNotify(false)}
                />
                <Dialog
                    isVisible={modalError}
                    title={"productScreen.Notification"}
                    content={"productScreen.validateMin"}
                    titleBTN2="productScreen.BtnNotificationAccept"
                    styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8 }}
                    onPressAccept={() => setModalError(false)}
                />
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default PriceModal;