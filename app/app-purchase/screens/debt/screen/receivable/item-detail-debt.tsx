import { View } from 'react-native'
import React, { FC } from 'react'
import { Styles } from '../styles';
import { colors, fontSize, scaleWidth } from '../../../../theme';
import { commasToDots, formatCurrency, formatVND } from '../../../../utils/validate';
import { Text } from '../../../../../components';


interface PropsItem {
    id: number,
    day: string,
    debtAccordingToOrder: number,
    phoneNumber: string,
    statusDebt: boolean,
    payDebt: number
}

interface ItemDetail {
    item: PropsItem
}


const ItemDetailDebt: FC<ItemDetail> = ({ item }) => {
    return (
        <View style={{ backgroundColor: '#FFF' }}>
            <Text style={Styles.fontSize10}>
                {item.day}
            </Text>
            {item.statusDebt ? (
                <View>
                    <View style={Styles.flexRow}>
                        <Text style={{ fontSize: fontSize.size12 }} tx='debtScreen.payDebt'></Text>
                        <Text style={{
                            fontSize: fontSize.size12,
                            color: colors.palette.malachite,
                            fontWeight: '700'
                        }}
                            text={formatVND(formatCurrency(commasToDots(item?.payDebt)))}
                        />


                    </View>
                </View>
            ) : (
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            marginRight: scaleWidth(8),
                            fontSize: fontSize.size12
                        }} tx="debtScreen.generateDebtForOrders"></Text>
                        <Text
                            style={{ fontSize: fontSize.size12, fontWeight: '700', color: colors.palette.radicalRed }}
                        >{formatVND(formatCurrency(commasToDots(item?.debtAccordingToOrder)))}</Text>
                    </View>
                    <View >
                        <Text
                            style={{ fontSize: fontSize.size12 }}
                        >{item.phoneNumber}</Text>
                    </View>
                </View>
            )}
            <View style={[Styles.styleLine, { marginVertical: scaleWidth(15) }]} />
        </View>
    );
}

export default ItemDetailDebt;