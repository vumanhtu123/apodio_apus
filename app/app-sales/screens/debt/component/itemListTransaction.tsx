import { View, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { colors, margin, scaleWidth } from '../../../theme'
import { Styles } from '../screen/styles'
import { Text } from '../../../../app-purchase/components'

interface Props {
    id: number,
    name: string,
    order: string,
    valueOrder: string,
    paid: string,
    dateOfPayment: string,
    remainingDebt: string,
    paymentTerm: string
}
interface ItemTransaction {
    item: Props,
    onPress: () => void
}
const ItemListTransaction: FC<ItemTransaction> = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            key={item.id}
            style={{ backgroundColor: colors.white, marginBottom: 10, borderRadius: margin.margin_8, padding: scaleWidth(15) }}
            onPress={() => {
                onPress()
            }}
        >
            <View style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                <Text tx="debtScreen.nameClient" style={Styles.label} />
                <Text style={Styles.styleOrder} >{item?.name}</Text>

            </View>
            <View style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                <Text tx="debtScreen.order" style={Styles.label} />
                <Text style={Styles.styleOrder} >{item?.order}</Text>
            </View>
            <View style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                <Text tx="debtScreen.valueOrder" style={Styles.label} />
                <Text style={[Styles.styleOrder, { color: colors.palette.malachite }]} >{item?.valueOrder}</Text>
            </View>
            <View style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                <Text tx="debtScreen.paid" style={Styles.label} />
                <Text style={[Styles.styleOrder, { color: colors.palette.malachite }]} >{item?.paid}</Text>
            </View>
            <View style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                <Text tx="debtScreen.dateOfPayment" style={Styles.label} />
                <Text style={[Styles.styleOrder,]} >{item?.dateOfPayment}</Text>
            </View>
            <View style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                <Text tx="debtScreen.remainingDebt" style={Styles.label} />
                <Text style={[Styles.styleOrder, { color: colors.palette.radicalRed }]} >{item?.remainingDebt}</Text>
            </View>
            <View style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                <Text tx="debtScreen.paymentTerm2" style={Styles.label} />
                <Text style={[Styles.styleOrder,]} >{item?.paymentTerm}</Text>
            </View>


        </TouchableOpacity>
    )
}

export default ItemListTransaction