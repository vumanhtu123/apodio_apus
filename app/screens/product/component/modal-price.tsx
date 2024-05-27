import 'numeral/locales/vi';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Dimensions, FlatList, Platform, TouchableOpacity, View , KeyboardAvoidingView} from 'react-native';
import Modal from 'react-native-modal';
import { Images } from '../../../../assets/index';
import { Button, Text, TextField } from '../../../components';
import Dialog from '../../../components/dialog/dialog';
import { TxKeyPath, translate } from '../../../i18n';
import { useStores } from '../../../models';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import { addCommas, formatCurrency, removeNonNumeric } from '../../../utils/validate';
const { width, height } = Dimensions.get('screen');

interface PriceModalProps {
    isVisible: boolean;
    setIsVisible: () => void;
    title?: string;
    titleTx?: TxKeyPath | {};
    onCancel: () => void
    onConfirm: (value: any) => void
    dataAdd?: {}[]
}

const PriceModal = (props: PriceModalProps) => {
    const { isVisible, setIsVisible, title, titleTx, onCancel, onConfirm, dataAdd } = props;
    const { vendorStore } = useStores();

    useEffect(() => {
        handleGetInfoCompany()
        console.log('infoCompany', vendorStore.checkSeparator)
    }, [isVisible]);

    const handleGetInfoCompany = async () => {
        if (vendorStore.checkSeparator === '') {
            try {
                const response = await vendorStore.getInfoCompany();
                if (response && response.kind === "ok") {
                    // console.log('response', response.result.data.thousandSeparator)
                    vendorStore.setCheckSeparator(response.result.data.thousandSeparator)
                } else {
                    console.error("Failed to fetch categories:", response);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        } else {
            console.log('Đã có key')
        }
    };
    const actualTitle = titleTx
        ? translate(titleTx)
        : title;

    const { control, reset, handleSubmit, watch, setError, clearErrors } = useForm({
        defaultValues: {
            price: dataAdd?.length !== 0 ? dataAdd : [{ min: '', price: '' }]
        }
    });
    const { append, fields, remove } = useFieldArray({
        control,
        name: `price`
    })

    useEffect(() => {
        if (dataAdd?.length !== 0) { reset({ price: dataAdd }) }
        console.log('loi roi')
    }, [dataAdd])
    const priceWatch = watch('price');
    const onSubmit = (data: any) => {
        const minValues = data.price.map(item => item.min);
        const isDuplicate = minValues.some((min, idx) => minValues.indexOf(min) !== idx);
        if (isDuplicate) {
            setModalError(true)
        } else {
            onConfirm(data);
            reset();
        }
    };
    const [modalNotify, setModalNotify] = useState(false)
    const [modalClose, setModalClose] = useState(false)
    const [modalError, setModalError] = useState(false)
    const [isError, setIsError] = useState(false);

    const validateUniqueMinQuantity = (value: any) => {
        const minValues = priceWatch.map(item => item.min); 
        const isDuplicate = minValues.filter(min => min === value).length > 1;
        setIsError(isDuplicate);
        return isDuplicate ? 'Số lượng không được trùng lặp' : true;
      };
    
    return (
        <Modal
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            isVisible={isVisible}
            avoidKeyboard={true}
        >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
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
                <View style={{ height: scaleHeight(1), backgroundColor: colors.palette.ghostWhite }} />
                <FlatList
                    data={fields}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                paddingHorizontal: scaleWidth(16), marginTop: scaleHeight(margin.margin_16)
                            }}>
                                <Controller
                                    control={control}
                                    name={`price.${index}.min`}
                                    render={({ field: { onChange, value, onBlur }, fieldState: { error } }) => (
                                        <View>
                                            <TextField
                                                keyboardType={'numeric'}
                                                labelTx={'productScreen.minimum'}
                                                style={{ width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.4 }}
                                                inputStyle={{ marginBottom: Platform.OS === 'ios' ? scaleHeight(padding.padding_8) : 0, marginTop: scaleHeight(4) }}
                                                value={value}
                                                onBlur={onBlur}
                                                onChangeText={(value) => onChange(value)}
                                                showRightIcon={false}
                                                isImportant={true}
                                                maxLength={15}
                                                placeholder='Nhập SL'
                                                styleTextError={{ maxWidth: (Dimensions.get('screen').width - scaleWidth(64)) * 0.4 }}
                                                error={isError ? error?.message : undefined}
                                                styleError = {{flex : 1}}
                                            />
                                        </View>
                                    )}
                                    rules={{
                                        required: "Nhập số lượng tối thiểu",
                                        validate: validateUniqueMinQuantity
                                    }}
                                />
                                <Controller
                                    control={control}
                                    name={`price.${index}.price`}
                                    render={({ field: { onChange, value, onBlur } }) => (
                                        <TextField
                                            keyboardType={'numeric'}
                                            labelTx={'productScreen.priceProduct'}
                                            style={{
                                                marginHorizontal: scaleWidth(margin.margin_12),
                                                width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.49,
                                            }}
                                            inputStyle={{
                                                marginTop: scaleHeight(4)
                                            }}
                                            value={value}
                                            onBlur={onBlur}
                                            onChangeText={(value) => {
                                                onChange(vendorStore.checkSeparator === 'DOTS' ? formatCurrency(removeNonNumeric(value)) : addCommas(removeNonNumeric(value)))
                                                // onChange(value)
                                            }}
                                            isImportant={true}
                                            showRightIcon={false}
                                            maxLength={15}
                                            placeholder='Nhập giá'
                                        />)}
                                    rules={{ required: "Nhập giá sản phẩm" }}
                                />
                                {fields?.length > 1 ?
                                    <TouchableOpacity onPress={() => remove(index)}>
                                        <Images.icon_delete2 style={{ marginBottom: scaleHeight(8) }} />
                                    </TouchableOpacity> :
                                    null
                                }
                            </View>
                        )
                    }
                    }
                />
                <Button onPress={() => {
                    const lastItem = priceWatch[priceWatch?.length - 1];
                    if (lastItem.min && lastItem.price) {
                        append({ min: '', price: '' });
                    } else {
                        setModalNotify(true)
                    }
                }}
                    style={{
                        height: scaleHeight(38), borderWidth: 1, flexDirection: 'row',
                        borderColor: colors.palette.navyBlue, backgroundColor: colors.palette.neutral100,
                        marginHorizontal: scaleWidth(margin.margin_16), alignItems: 'center',
                        borderRadius: 8, marginTop: scaleHeight(margin.margin_20), marginBottom: scaleHeight(margin.margin_15)
                    }}>
                    <Images.icon_add />
                    <Text text='Thêm khoảng giá' style={{
                        color: colors.palette.navyBlue,
                        fontWeight: '600', fontSize: fontSize.size14, marginLeft: scaleWidth(6)
                    }} />
                </Button>
                <View style={{
                    marginHorizontal: scaleWidth(margin.margin_16), flexDirection: 'row',
                    justifyContent: 'space-between', marginBottom: scaleHeight(margin.margin_10)
                }}>
                    <Button onPress={() => {
                        if (priceWatch?.length === 1 && priceWatch[0].min === '' && priceWatch[0].price === '') {
                            onCancel()
                        } else {
                            setModalClose(true)
                        }
                    }}
                        tx={'productScreen.cancel'} style={{
                            height: scaleHeight(48), backgroundColor: colors.palette.neutral100,
                            borderWidth: 1, borderColor: colors.palette.veryLightGrey,
                            width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.48,
                            borderRadius: 8
                        }} textStyle={{
                            color: colors.palette.dolphin, fontWeight: '700',
                            fontSize: fontSize.size14, lineHeight: scaleHeight(24)
                        }} />
                    <Button tx={'productScreen.BtnNotificationAccept'} style={{
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
                styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8  }}
                onPressAccept={() => setModalError(false)}
            />
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default PriceModal;