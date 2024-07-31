
import { View, TouchableOpacity } from 'react-native'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Styles } from '../screen/styles'
import { colors, fontSize, scaleWidth } from '../../../theme'
import { Svgs } from '../../../../../assets/svgs'
import { Text } from '../../../../components'
import { commasToDots, formatCurrency, formatVND } from '../../../utils/validate'

interface Props {
    id: number
    nameCompany: string,
    pay: number,
    day: string
}

interface ItemNCC {
    item: Props,
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

const ItemListNCC: FC<ItemNCC> = ({ item, isVisible, setIsVisible }) => {


    return (
        <View
            style={Styles.bodyItemNCC}
        >
            <View
                style={{
                    paddingHorizontal: scaleWidth(16),
                }}
            >
                <View
                    style={[{ flexDirection: 'row', alignItems: 'center', }]}
                >
                    <Svgs.ic_avatar />
                    <Text style={{
                        fontSize: fontSize.size12,
                        fontWeight: '600'
                    }}>{item?.nameCompany}</Text>
                </View>
            </View>
            <View style={[Styles.styleLine, {}]} />
            <View
                style={[Styles.flexRow, { marginHorizontal: scaleWidth(15) }]}
            >
                <Text
                    style={{ fontSize: fontSize.size16, fontWeight: '600', color: colors.palette.radicalRed }}
                >
                    {formatVND(formatCurrency(commasToDots(item?.pay)))}
                </Text>
                <TouchableOpacity style={Styles.styleBtnPay}
                    onPress={() => setIsVisible(!isVisible)}
                >
                    <Text style={{ fontSize: fontSize.size12, color: '#FFF' }}
                        tx="debtScreen.pay2"
                    ></Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export default ItemListNCC