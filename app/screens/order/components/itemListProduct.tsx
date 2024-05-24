import React, { useEffect, useState } from "react"
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../components/text/text";
import { FlatList, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { Button } from "../../../components";
import { Images } from "../../../../assets";
import { scheduleFlushOperations } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon";
import AutoHeightImage from "react-native-auto-height-image";

interface AddProduct {
    onPress?: ({}) => void,
    onPressPlus?: ({ }) => void,
    onPressMinus?: ({ }) => void,
    arrData?: {}[],
    images?: string,
    name?: string,
    unit?: string,
    cost?: string,
    qty?: string,
}

export default function ItemListProduct(props: AddProduct) {
    const { arrData, onPress, onPressMinus, onPressPlus, images,
        name, unit, cost, qty } = props

    return (
        <View>
            <TouchableOpacity onPress={(item) => onPress(item)}
                style={{ position: 'absolute', left: 0, top: scaleHeight(8), zIndex: 1 }} >
                <Images.icon_delete2 height={scaleHeight(18)}
                    width={scaleHeight(18)} />
            </TouchableOpacity>
            <View style={{
                flexDirection: 'row',
                marginTop: scaleHeight(margin.margin_12),
                marginBottom: scaleHeight(margin.margin_12),
                marginLeft: scaleWidth(margin.margin_8),
                alignItems: 'center'
            }}>
                <View style={{ marginRight: scaleWidth(margin.margin_10) }}>
                    <AutoHeightImage source={{ uri: images }}
                        height={scaleHeight(48)} width={scaleHeight(48)}
                        style={{ borderRadius: 16 }} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text text={name} style={{
                        fontWeight: '600', fontSize: fontSize.size12,
                        lineHeight: scaleHeight(14.52), color: colors.palette.nero
                    }} />
                    <View style={{ flexDirection: 'row' }}>
                        <Text text={unit} style={{
                            fontWeight: '400', fontSize: fontSize.size12,
                            lineHeight: scaleHeight(14.52), color: colors.palette.dolphin,
                            marginRight: scaleWidth(margin.margin_4)
                        }} />
                        <Images.icon_edit />
                    </View>
                    <Text text={cost} style={{
                        fontWeight: '400', fontSize: fontSize.size12,
                        lineHeight: scaleHeight(14.52), color: colors.palette.navyBlue
                    }} />
                </View>
                <View style={{
                    marginLeft: scaleWidth(margin.margin_12),
                    flexDirection: 'row',
                    borderWidth: 1, borderColor: colors.palette.whiteSmoke,
                    alignItems: "center",
                    paddingVertical: scaleHeight(padding.padding_8),
                    borderRadius: 8,
                }}>
                    <TouchableOpacity onPress={(item) => onPressMinus(item)}
                        style={{ marginHorizontal: scaleWidth(margin.margin_6) }}
                    >
                        <Images.icon_minus />
                    </TouchableOpacity>
                    <Text style={{
                        width: scaleWidth(34),
                        textAlign: 'center',
                    }} >{qty}</Text>
                    <TouchableOpacity onPress={(item) => onPressPlus(item)}
                        style={{ marginHorizontal: scaleWidth(margin.margin_6) }}
                    >
                        <Images.icon_plusGreen />
                    </TouchableOpacity>
                </View>
            </View>

        </View>

    )
};
