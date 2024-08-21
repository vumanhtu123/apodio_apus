
import { View, TouchableOpacity } from 'react-native'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Styles } from '../screen/styles'
import { colors, fontSize, scaleWidth } from '../../../theme'
import { Svgs } from '../../../../../assets/svgs'
import { Text } from '../../../../components'
import { commasToDots, formatCurrency, formatVND } from '../../../utils/validate'
import { useNavigation } from '@react-navigation/native'

interface Props {
    id: number
    name: string,
    remainingDebt: number,
    day: string
}

interface ItemNCC {
    item: Props,
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

const ItemListNCC: FC<ItemNCC> = ({ item, isVisible, setIsVisible }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
            style={Styles.bodyItemNCC}
            onPress={() =>
                navigation.navigate("detailReceivable" as never)

            }
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
                        fontWeight: '600',
                        flex: 1,

                    }}
                        numberOfLines={1}
                    >{item?.name}</Text>
                </View>
            </View>
            <View style={[Styles.styleLine, {}]} />
            <View
                style={[Styles.flexRow, { marginHorizontal: scaleWidth(15) }]}
            >
                <Text
                    style={{ fontSize: fontSize.size16, fontWeight: '600', color: colors.palette.radicalRed }}
                >
                    {formatVND(formatCurrency(commasToDots(item?.remainingDebt)))}
                </Text>
                <TouchableOpacity style={Styles.styleBtnPay}
                    onPress={() => setIsVisible(!isVisible)}
                >
                    <Text style={{ fontSize: fontSize.size12, color: colors.white }}
                        tx="debtScreen.pay2"
                    ></Text>
                </TouchableOpacity>
            </View>


        </TouchableOpacity>
    )
}

export default ItemListNCC