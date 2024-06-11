import { Observer, observer } from 'mobx-react-lite';
import { FC } from 'react';
import React, { ImageBackground, TouchableOpacity, View } from 'react-native';
import { useStores } from '../../../models';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../theme';
import FastImage from 'react-native-fast-image';
import { Text } from '../../../components';
import { Images } from '../../../../assets';

interface ItemSelectVariant {
    item: any,
    handleMinus: ({}) => void,
    handlePlus: ({})=> void,

}

export function ItemSelectVariant(props: ItemSelectVariant) {
        const {item, handleMinus, handlePlus} = props
        const { orderStore } = useStores()
        if (orderStore.checkPriceList === true) {
            return(
            <View style={{
                alignItems: 'center',
                backgroundColor: colors.palette.aliceBlue, paddingHorizontal: scaleWidth(6),
                flexDirection: 'row', paddingVertical: scaleHeight(10), borderRadius: 8, marginBottom: scaleHeight(15),
                borderWidth: scaleHeight(1),
                borderColor: item.isSelect === true ? colors.palette.navyBlue : colors.palette.aliceBlue
            }}>
                <ImageBackground
                    style={{ width: scaleWidth(50), height: scaleHeight(50), marginRight: scaleWidth(6) }}
                    imageStyle={{
                        borderRadius: 4
                    }}
                    source={require("../../../../assets/Images/no_images.png")}
                >
                    <FastImage
                        style={{
                            width: scaleWidth(107),
                            height: scaleHeight(50),
                            borderTopLeftRadius: 12,
                            borderTopRightRadius: 12,
                        }}
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
                        {item.isSelect === true ? <Images.icon_checkCircleBlue />: null}
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
                            }} text='20000' />
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
                            <TouchableOpacity onPress={() => handleMinus(item)}
                                style={{ width: '25%', alignItems: 'center' }}
                            >
                                <Images.icon_minus />
                            </TouchableOpacity>
                            <Text style={{
                                width: '50%',
                                textAlign: 'center',
                            }} >{item.amount}</Text>
                            <TouchableOpacity onPress={() => handlePlus(item)}
                                style={{ width: '25%', alignItems: 'center' }}
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
                </View>
            </View>
            )
        } else {
            return (
                <View>

                </View>
            )

        }
    }