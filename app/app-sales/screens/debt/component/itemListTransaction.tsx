import { View, TouchableOpacity } from 'react-native'
import React, { FC, useState } from 'react'
import { colors, fontSize, margin, scaleHeight, scaleWidth } from '../../../theme'
import { Styles } from '../screen/styles'
import { Text } from '../../../../components'
import { Svgs } from '../../../../../assets/svgs'
import { ModalPayReceivable } from './modalPayReceivable'
import { ModalPayReceivableTransaction } from './modalPayReceivableTransaction'

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
    onPress: () => void,
    isVisible?: boolean,
    setIsVisible?: () => void,
}
const ItemListTransaction: FC<ItemTransaction> = ({ item, onPress }) => {
    const [isVisible, setIsVisible] = useState(false)


    return (
        <TouchableOpacity
            key={item.id}
            style={{ backgroundColor: colors.white, marginBottom: 10, borderRadius: margin.margin_8, padding: scaleWidth(15) }}
            onPress={() => {
                onPress()
            }}
        >
            <View style={[Styles.flexRow, { marginVertical: scaleWidth(2) }]}>
                <Text tx="debtScreen.nameClient" style={[Styles.label, { flex: 1 }]} />
                <Text style={[Styles.styleOrder, { flex: 2, textAlign: 'right' }]}
                    numberOfLines={1} ellipsizeMode="tail"
                >{item?.name}
                </Text>
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

            <TouchableOpacity
                style={Styles.btnPay}
                onPress={() => {
                    setIsVisible(!isVisible)
                    // console.log('====================================');
                    // console.log("doandev: 1");
                    // console.log('====================================');
                }}>
                <Svgs.ic_pay_hand
                    width={scaleWidth(17)}
                    height={scaleHeight(17)}
                />
                <Text
                    tx="debtScreen.pay"
                    style={{
                        color: colors.white,
                        fontSize: fontSize.size10,
                    }}></Text>
            </TouchableOpacity>

            <ModalPayReceivableTransaction
                isVisible={isVisible}
                setIsVisible={() => setIsVisible(!isVisible)}
            />
        </TouchableOpacity>
    )
}

export default ItemListTransaction