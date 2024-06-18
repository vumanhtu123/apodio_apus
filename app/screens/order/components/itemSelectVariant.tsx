import { Observer, observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import React, { Dimensions, FlatList, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useStores } from '../../../models';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../theme';
import FastImage from 'react-native-fast-image';
import { Text } from '../../../components';
import { Images } from '../../../../assets';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import Modal from 'react-native-modal'
import { formatCurrency, formatNumber, removeNonNumeric } from '../../../utils/validate';

interface ItemSelectVariant {
    item: any,
    handleMinusPrice: ({ }) => void,
    handleMinus: ({ }) => void,
    handlePlusPrice: ({ }) => void,
    handlePlus: ({ }) => void,
    handleAddToCart?: ({ }: any) => void,
    uomGroupLine?: {},
    selectUomPrice?: ({ }, { }) => void,
    selectUom?: ({ }, { }) => void,
    changeText?: ({ }, { }) => void,
}

export function ItemSelectVariant(props: ItemSelectVariant) {
    const { item, handleMinus, handleMinusPrice, handlePlusPrice, selectUomPrice, handlePlus, handleAddToCart, selectUom, changeText } = props
    const { orderStore } = useStores()
    const [check, setCheck] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [uomId, setUomId] = useState(item?.saleUom?.id)

    const { control, reset, handleSubmit, watch, register, setValue, formState: { errors }, } = useForm({
        defaultValues: {
            price: [{ price: '' }]
        }
    });
    const { append, fields, remove } = useFieldArray({
        control,
        name: `price`
    })

    if (orderStore.checkPriceList === true) {
        return (
            <TouchableOpacity onPress={() => handleAddToCart(item)}
                disabled={item.quantityInventory < item.minQuantity ? true : false}
                style={[styles.ROOT, {
                    borderColor: item.isSelect === true ? colors.palette.navyBlue : colors.palette.aliceBlue
                }]}>
                <ImageBackground
                    style={styles.viewImageBackground}
                    imageStyle={{
                        borderRadius: 4
                    }}
                    source={require("../../../../assets/Images/no_images.png")}
                >
                    <FastImage
                        style={styles.viewFastImage}
                        source={{
                            uri: item?.item?.productImage !== null && item?.item?.productImage?.length !== 0 ? item?.item?.productImage[0] : '',
                            cache: FastImage.cacheControl.immutable,
                        }}
                        defaultSource={require("../../../../assets/Images/no_images.png")}
                    />
                </ImageBackground>
                <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text text={item.name}
                            style={[styles.textName, { color: item.isSelect === true ? colors.palette.navyBlue : colors.nero }]} />
                        {item.isSelect === true ? <Images.icon_checkCircleBlue /> : null}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: scaleHeight(3) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%' }}>
                            <Text style={styles.text400Nero12} tx={'order.price2'} />
                            <Text style={[styles.text400Nero12, { color: colors.palette.radicalRed, fontStyle: 'italic' }]} text={formatNumber(item.price)} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                            <Text style={styles.text400Nero12} tx={'order.miniumQuanlity'} />
                            <Text style={[styles.text400Nero12, { color: colors.palette.radicalRed, fontStyle: 'italic' }]}
                                text={item?.minQuantity?.toString()} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', opacity: item.quantityInventory < item.minQuantity ? 0.5 : 1 }}>
                        <Text style={[styles.text400Nero10, { marginRight: scaleWidth(6) }]} tx={'order.quanlity'} />
                        <View style={styles.viewAmount}>
                            <TouchableOpacity disabled={item.amount === item.minQuantity || item.amount === Math.ceil(item.minQuantity / item.conversionRate) ? true : false}
                                onPress={() => handleMinusPrice(item)}
                                style={{ width: '25%', alignItems: 'center', opacity: item.amount === item.minQuantity ? 0.5 : 1 }}
                            >
                                <Images.icon_minus />
                            </TouchableOpacity>
                            <Text style={{ width: '50%', textAlign: 'center', }} >{item.amount}</Text>
                            <TouchableOpacity disabled={item.amount === item.quantityInventory || item.amount === Math.floor(item.quantityInventory / item.conversionRate) ? true : false} onPress={() => handlePlusPrice(item)}
                                style={{ width: '25%', alignItems: 'center', opacity: item.amount === item.quantityInventory ? 0.5 : 1 }}
                            >
                                <Images.icon_plusGreen />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity disabled={item.uomGroup === null ? true : false}
                            onPress={() => setIsModal(true)}
                            style={{ marginHorizontal: scaleWidth(6), flexDirection: 'row', alignItems: 'center', width: '12%' }}>
                            <Text style={styles.text400Nero10} text={item.saleUom?.name} />
                            <Images.icon_caretRightDown />
                        </TouchableOpacity>
                        {item.uomId === item.saleUom?.id ? null :
                            <View style={{ width: '28%' }} >
                                <Text style={[styles.text400Nero10, { color: colors.dolphin, fontStyle: 'italic' }]}
                                    text={item.saleUom?.name + ' = ' + item?.conversionRate + ' ' + item.uomName} />
                            </View>}
                    </View>
                </View>
                <Modal style={styles.viewModal} isVisible={isModal} onBackdropPress={()=> setIsModal(false)}>
                    <FlatList
                        data={item?.uomGroup?.uomGroupLineItems}
                        keyExtractor={items => items.uomId.toString()}
                        style={{ marginVertical: scaleHeight(20), marginHorizontal: scaleWidth(16) }}
                        renderItem={(items) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    if (uomId === items.item.uomId) {
                                        setIsModal(false)
                                    } else {
                                        selectUomPrice(item, items.item)
                                        setIsModal(false)
                                    }
                                }}>
                                    <Text text={items?.item?.uomName} />
                                    <View style={styles.viewLine} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </Modal>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity disabled={item.quantityInventory < item.minQuantity ? true : false}
                onPress={() => handleAddToCart(item)}
                style={[styles.ROOT, {
                    borderColor: item.isSelect === true ? colors.palette.navyBlue : colors.palette.aliceBlue
                }]}>
                <ImageBackground
                    style={styles.viewImageBackground}
                    imageStyle={{
                        borderRadius: 4
                    }}
                    source={require("../../../../assets/Images/no_images.png")}
                >
                    <FastImage
                        style={styles.viewFastImage}
                        source={{
                            uri: item?.item?.productImage !== null && item?.item?.productImage?.length !== 0 ? item?.item?.productImage[0] : '',
                            cache: FastImage.cacheControl.immutable,
                        }}
                        defaultSource={require("../../../../assets/Images/no_images.png")}
                    />
                </ImageBackground>
                <View style={{ width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text text={item.name}
                            style={[styles.textName, { color: item.isSelect === true ? colors.palette.navyBlue : colors.nero }]} />
                        {item.isSelect === true ? <Images.icon_checkCircleBlue /> : null}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', opacity: item.quantityInventory < item.minQuantity ? 0.5 : 1 }}>
                        <Text style={[styles.text400Nero10, { marginRight: scaleWidth(6) }]} tx={'order.quanlity'} />
                        <View style={styles.viewAmount}>
                            <TouchableOpacity disabled={item.amount === 0 ? true : false}
                                onPress={() => handleMinus(item)}
                                style={{ width: '25%', alignItems: 'center', opacity: item.amount === item.minQuantity ? 0.5 : 1 }}
                            >
                                <Images.icon_minus />
                            </TouchableOpacity>
                            <Text style={{ width: '50%', textAlign: 'center', }} >{item.amount}</Text>
                            <TouchableOpacity disabled={item.amount === item.quantityInventory ? true : false}
                                onPress={() => handlePlus(item)}
                                style={{ width: '25%', alignItems: 'center', opacity: item.amount === item.quantityInventory ? 0.5 : 1 }}
                            >
                                <Images.icon_plusGreen />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity disabled={item.uomGroup === null ? true : false}
                            onPress={() => setIsModal(true)}
                            style={{ marginHorizontal: scaleWidth(6), flexDirection: 'row', alignItems: 'center', width: '12%', }}>
                            <Text numberOfLines={1} style={styles.text400Nero10} text={item.saleUom?.name} />
                            <Images.icon_caretRightDown />
                        </TouchableOpacity>
                        {item.uomId === item.saleUom?.id ? null :
                            <View style={{ width: '28%' }} >
                                <Text style={[styles.text400Nero10, {
                                    color: colors.dolphin, fontStyle: 'italic'
                                }]} text={item.saleUom?.name + ' = ' + item?.conversionRate + ' ' + item.uomName} />
                            </View>}
                    </View>
                    {item.isSelect === true ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', height: scaleHeight(14.52), marginTop: scaleHeight(3) }}>
                            {item.price !== undefined && check === false ? <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%' }}>
                                <Text style={styles.text400Nero10} tx={'order.price2'} />
                                <Text style={styles.textPriceInput} text={formatNumber(item.price)} />
                                <TouchableOpacity onPress={() => {
                                    setValue(`price.${item.id}.price`, formatCurrency(removeNonNumeric(item.price)).toString())
                                    setCheck(true)
                                }}>
                                    <Images.icon_edit />
                                </TouchableOpacity>
                            </View> : <Controller
                                control={control}
                                name={`price.${item.id}.price`}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        keyboardType={'numeric'}
                                        placeholder="Nhập giá"
                                        placeholderTextColor={colors.navyBlue}
                                        style={styles.viewTextInput}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(formatCurrency(removeNonNumeric(value)))}
                                        onSubmitEditing={() => {
                                            changeText(item, value.split('.').join(''))
                                            reset()
                                            setCheck(false)
                                        }}
                                        maxLength={50}
                                    />)}
                            />}
                        </View> : <View style={{ flexDirection: 'row', alignItems: 'center', height: scaleHeight(17.52), marginTop: scaleHeight(3) }}></View>}
                </View>
                <Modal style={styles.viewModal} isVisible={isModal} onBackdropPress={()=> setIsModal(false)} >
                    <FlatList
                        data={item?.uomGroup?.uomGroupLineItems}
                        keyExtractor={items => items.uomId.toString()}
                        style={{ marginVertical: scaleHeight(20), marginHorizontal: scaleWidth(16) }}
                        renderItem={(items) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    if (uomId === items.item.uomId) {
                                        setIsModal(false)
                                    } else {
                                        selectUom(item, items.item)
                                        setIsModal(false)
                                    }
                                }}>
                                    <Text text={items?.item?.uomName} />
                                    <View style={styles.viewLine} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </Modal>
            </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
    ROOT: {
        alignItems: "center",
        backgroundColor: colors.palette.aliceBlue,
        paddingHorizontal: scaleWidth(6),
        flexDirection: "row",
        paddingVertical: scaleHeight(10),
        borderRadius: 8,
        marginBottom: scaleHeight(15),
        borderWidth: scaleHeight(1),
    },
    viewImageBackground: {
        width: scaleWidth(50),
        height: scaleHeight(50),
        marginRight: scaleWidth(6),
    },
    viewFastImage: {
        width: scaleWidth(107),
        height: scaleHeight(50),
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    viewModal: {
        backgroundColor: colors.textWhite,
        maxHeight: Dimensions.get("screen").height * 0.4,
        minHeight: Dimensions.get("screen").height * 0.1,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        margin: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    viewAmount: {
        // marginLeft: scaleWidth(margin.margin_12),
        marginTop: scaleHeight(2),
        flexDirection: "row",
        backgroundColor: colors.palette.white,
        alignItems: "center",
        paddingVertical: scaleHeight(3),
        borderRadius: 8,
        width: "25%",
    },
    viewLine: {
        height: scaleHeight(1),
        backgroundColor: colors.palette.ghostWhite2,
        marginTop: scaleHeight(10),
    },
    viewTextInput: {
        width: (Dimensions.get("screen").width - scaleWidth(64)) * 0.5,
        padding: 0,
        fontSize: fontSize.size10,
    },
    text400Nero12: {
        fontWeight: "400",
        fontSize: fontSize.size12,
        lineHeight: scaleHeight(14.52),
        color: colors.nero,
    },
    text400Nero10: {
        fontWeight: "400",
        fontSize: fontSize.size10,
        lineHeight: scaleHeight(12.1),
        color: colors.nero,
    },
    textName: {
        fontWeight: "500",
        fontSize: fontSize.size12,
        lineHeight: scaleHeight(14.52),
        width: "76%",
    },
    textPriceInput: {
        fontWeight: "600",
        fontSize: fontSize.size10,
        lineHeight: scaleHeight(12.1),
        color: colors.palette.radicalRed,
    },
});
