import { Observer, observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import React, { Dimensions, FlatList, ImageBackground, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useStores } from '../../../models';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../theme';
import FastImage from 'react-native-fast-image';
import { Text } from '../../../components';
import { Images } from '../../../../assets';
import { Controller } from 'react-hook-form';
import Modal from 'react-native-modal'

interface ItemSelectVariant {
    item: any,
    handleMinus: ({ }) => void,
    handlePlus: ({ }) => void,
    handleAddToCart?: ({ }) => void,
    uomGroupLine?: {},
    selectUom?: ({}, {})=>void,
}

export function ItemSelectVariant(props: ItemSelectVariant) {
    const { item, handleMinus, handlePlus, handleAddToCart, selectUom } = props
    const { orderStore } = useStores()
    const [checkPrice, setCheckPrice] = useState(false)
    const [isModal, setIsModal] = useState(false)
    const [uomName, setUomName] = useState(item.uomGroup.uomOriginName)
    const [uomId, setUomId] = useState(item.uomGroup.uomOriginId)
    const [uomGroupLine, setUomGroupLine] = useState({})
    if (orderStore.checkPriceList === true) {
        return (
            <TouchableOpacity onPress={() => handleAddToCart(item)}
                style={[styles.ROOT,{
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
                            style={{
                                fontWeight: '500', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                color: item.isSelect === true ? colors.palette.navyBlue : colors.nero, width: '76%'
                            }} />
                        {item.isSelect === true ? <Images.icon_checkCircleBlue /> : null}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: scaleHeight(3) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%' }}>
                            <Text style={{
                                fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                color: colors.nero
                            }} tx={'order.price2'} />
                            <Text style={{
                                fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                color: colors.palette.radicalRed, fontStyle: 'italic'
                            }} text={item.price} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: '60%' }}>
                            <Text style={{
                                fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                color: colors.nero
                            }} tx={'order.miniumQuanlity'} />
                            <Text style={{
                                fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                color: colors.palette.radicalRed, fontStyle: 'italic'
                            }} text={item.minQuantity.toString()} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            fontWeight: '400', fontSize: fontSize.size10, lineHeight: scaleHeight(12.1),
                            color: colors.nero, marginRight: scaleWidth(6)
                        }} tx={'order.quanlity'} />
                        <View style={{
                            // marginLeft: scaleWidth(margin.margin_12),
                            marginTop: scaleHeight(2),
                            flexDirection: 'row',
                            backgroundColor: colors.palette.white,
                            alignItems: "center",
                            paddingVertical: scaleHeight(3),
                            borderRadius: 8,
                            width: '25%'
                        }}>
                            <TouchableOpacity disabled={item.amount === item.minQuantity ? true : false}
                                onPress={() => handleMinus(item)}
                                style={{ width: '25%', alignItems: 'center', opacity: item.amount === item.minQuantity ? 0.5 : 1 }}
                            >
                                <Images.icon_minus />
                            </TouchableOpacity>
                            <Text style={{
                                width: '50%',
                                textAlign: 'center',
                            }} >{item.amount}</Text>
                            <TouchableOpacity disabled={item.amount === item.quantityInventory ? true : false} onPress={() => handlePlus(item)}
                                style={{ width: '25%', alignItems: 'center', opacity: item.amount === item.quantityInventory ? 0.5 : 1 }}
                            >
                                <Images.icon_plusGreen />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity disabled={item.uomGroup === null ? true : false}
                            onPress={() => setIsModal(true)}
                            style={{ marginHorizontal: scaleWidth(6), flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                                fontWeight: '400', fontSize: fontSize.size10, lineHeight: scaleHeight(12.1),
                                color: colors.nero
                            }} text={uomName} />
                            <Images.icon_caretRightDown />
                        </TouchableOpacity>
                        { uomGroupLine?.conversionRate === undefined && uomGroupLine?.uomName ===undefined ? null : 
                         <View>
                            <Text style={{
                                fontWeight: '400', fontSize: fontSize.size10, lineHeight: scaleHeight(12.1),
                                color: colors.nero
                            }} text={ uomName + ' = ' + uomGroupLine?.conversionRate + ' ' + uomGroupLine?.uomName} />
                        </View>}
                    </View>
                </View>
                <Modal style={{
                    backgroundColor: colors.textWhite, maxHeight: Dimensions.get('screen').height * 0.4, minHeight: Dimensions.get('screen').height * 0.1,
                    position: 'absolute', bottom: 0, left: 0, right: 0, margin: 0, borderTopLeftRadius: 16, borderTopRightRadius: 16
                }} isVisible={isModal}>
                    <FlatList
                        data={item.uomGroup.uomGroupLineItems}
                        keyExtractor={items => items.uomId.toString()}
                        style={{ marginVertical: scaleHeight(20), marginHorizontal: scaleWidth(16) }}
                        renderItem={(items) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    if (uomId === items.item.uomId) {
                                        setIsModal(false)
                                    } else {
                                        setUomName(items.item.uomName)
                                        setUomGroupLine(items.item)
                                        selectUom(item, items.item)
                                        setIsModal(false)
                                    }
                                }}>
                                    <Text text={item.item.uomName} />
                                    <View style={{ height: scaleHeight(1), backgroundColor: colors.palette.ghostWhite2, marginTop: scaleHeight(10) }} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                </Modal>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={() => handleAddToCart(item)}
                style={[styles.ROOT,{
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
                            style={{
                                fontWeight: '500', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                color: item.isSelect === true ? colors.palette.navyBlue : colors.nero, width: '76%'
                            }} />
                        {item.isSelect === true ? <Images.icon_checkCircleBlue /> : null}
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            fontWeight: '400', fontSize: fontSize.size10, lineHeight: scaleHeight(12.1),
                            color: colors.nero, marginRight: scaleWidth(6)
                        }} tx={'order.quanlity'} />
                        <View style={{
                            // marginLeft: scaleWidth(margin.margin_12),
                            marginTop: scaleHeight(2),
                            flexDirection: 'row',
                            backgroundColor: colors.palette.white,
                            alignItems: "center",
                            paddingVertical: scaleHeight(3),
                            borderRadius: 8,
                            width: '25%'
                        }}>
                            <TouchableOpacity disabled={item.amount === item.minQuantity ? true : false}
                                onPress={() => handleMinus(item)}
                                style={{ width: '25%', alignItems: 'center', opacity: item.amount === item.minQuantity ? 0.5 : 1 }}
                            >
                                <Images.icon_minus />
                            </TouchableOpacity>
                            <Text style={{
                                width: '50%',
                                textAlign: 'center',
                            }} >{item.amount}</Text>
                            <TouchableOpacity disabled={item.amount === item.quantityInventory ? true : false} onPress={() => handlePlus(item)}
                                style={{ width: '25%', alignItems: 'center', opacity: item.amount === item.quantityInventory ? 0.5 : 1 }}
                            >
                                <Images.icon_plusGreen />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: scaleWidth(6), flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                                fontWeight: '400', fontSize: fontSize.size10, lineHeight: scaleHeight(12.1),
                                color: colors.nero
                            }} text={'hop'} />
                            <Images.icon_caretRightDown />
                        </View>
                    </View>
                    {item.isSelect === true ?
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: scaleHeight(3) }}>
                            {checkPrice === true ? <View style={{ flexDirection: 'row', alignItems: 'center', width: '40%' }}>
                                <Text style={{
                                    fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                    color: colors.nero
                                }} tx={'order.price2'} />
                                <Text style={{
                                    fontWeight: '400', fontSize: fontSize.size12, lineHeight: scaleHeight(14.52),
                                    color: colors.palette.radicalRed, fontStyle: 'italic'
                                }} text={item.price} />
                            </View> : <Controller
                                control={control}
                                name={`conversion.${index}.ratio`}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextInput
                                        keyboardType={'numeric'}
                                        placeholder="nhap ty le"
                                        style={{
                                            width: (Dimensions.get('screen').width - scaleWidth(64)) * 0.2,
                                            borderBottomWidth: 1, borderBottomColor: '#DFE0EB'
                                        }}
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={(value) => onChange(value)}
                                        // onClearText={() => onChange('')}
                                        // RightIconClear={Images.icon_delete2}
                                        maxLength={50}

                                    />)}
                            // defaultValue={''}
                            // rules={{ required: "Minimum purchase is required" }}
                            />}
                        </View> : null}
                </View>
            </TouchableOpacity>
        )

    }
}
//truyên thêm item.quantityInventory < item.minQuantity để check giưã số lượng tồn và sl nhỏ nhất để làm mờ và disable phàn cộng trừ sl

const styles = StyleSheet.create({
    ROOT: {
        alignItems: 'center',
        backgroundColor: colors.palette.aliceBlue, paddingHorizontal: scaleWidth(6),
        flexDirection: 'row', paddingVertical: scaleHeight(10), borderRadius: 8, marginBottom: scaleHeight(15),
        borderWidth: scaleHeight(1),
    },
    viewImageBackground: { width: scaleWidth(50), height: scaleHeight(50), marginRight: scaleWidth(6) },
    viewFastImage: {
        width: scaleWidth(107),
        height: scaleHeight(50),
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
})