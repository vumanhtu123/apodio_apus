import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, scaleHeight, scaleWidth } from '../../../theme'
import { Text } from '../../../../components'
import { Styles } from '../screen/styles'
import { id } from 'date-fns/locale'
import { commasToDots, formatCurrency, formatVND } from '../../../utils/validate'

interface itemData {
    partner: { id?: string, name?: string },
    totalLiabilities?: string,
    paid?: string,
    musPay?: string,
    amountTotal: number,
    debtAmount: number,
    amountPayment: number,

}

interface ItemProps {
    item?: itemData;
    onClick?: () => void;
    idSelect?: string
}

export const ItemListMustPay: FC<ItemProps> = ({ item, onClick, idSelect }) => {
    // console.log('====================================');
    // console.log("id select ", idSelect, item.id);
    // console.log('====================================');
    return (


        <TouchableOpacity
            onPress={onClick}
        >
            <LinearGradient
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
                colors={
                    [
                        idSelect == item?.partner?.id ? colors.palette.navyBlue : colors.white,
                        idSelect == item?.partner?.id ? colors.palette.malibu : colors.white
                    ]
                }
                style={{
                    // height: scaleHeight(50),
                    padding: scaleWidth(15),
                    marginVertical: scaleWidth(10),
                    marginHorizontal: scaleHeight(20),
                    borderRadius: 8,
                    flex: 1,

                }}

            >

                <View style={{ width: '100%', flexDirection: 'row', }} >
                    <View style={{ width: '50%' }}>
                        <Text style={[idSelect == item?.partner?.id ? Styles.sizeTitle : Styles.sizeTitleUnSelect]} tx='debtScreen.nameProviders' />
                        <Text style={[idSelect == item?.partner?.id ? Styles.sizeContent : Styles.sizeContentUnSelect]}>{item?.partner?.name}</Text>
                    </View>
                    <View>
                        <Text style={[idSelect == item?.partner?.id ? Styles.sizeTitle : Styles.sizeTitleUnSelect]} tx='debtScreen.totalLiabilities' />
                        <Text style={[idSelect == item?.partner?.id ? Styles.sizeContent : Styles.numberInItemUnSelect]}>
                            {formatVND(formatCurrency(commasToDots(item?.amountTotal)))}
                        </Text>
                    </View>

                </View>
                <View style={{ width: '100%', marginTop: scaleHeight(15), flexDirection: 'row' }} >
                    <View style={{ width: '50%' }}>
                        <Text
                            style={[idSelect == item?.partner?.id ? Styles.sizeTitle : Styles.sizeTitleUnSelect,]}
                            tx='debtScreen.paid'
                        />

                        <Text style={[idSelect == item?.partner?.id ? Styles.sizeContent : Styles.numberInItemUnSelect]}>{formatVND(formatCurrency(commasToDots(item?.amountPayment)))}</Text>
                    </View>
                    <View>
                        <Text
                            style={[idSelect == item?.partner?.id ? Styles.sizeTitle : Styles.sizeTitleUnSelect,]}
                            tx='debtScreen.mustPay'
                        />
                        <Text style={[Styles.sizeContent, { color: idSelect == item?.partner?.id ? 'yellow' : "#FF4956" }]}>
                            {formatVND(formatCurrency(commasToDots(item?.debtAmount)))}
                        </Text>
                    </View>

                </View>

            </LinearGradient >
        </TouchableOpacity>

    )
}

