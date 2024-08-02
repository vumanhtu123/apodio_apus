import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, scaleHeight, scaleWidth } from '../../../theme'
import { Text } from '../../../../app-purchase/components'
import { Styles } from '../screen/styles'
import { id } from 'date-fns/locale'

interface itemData {
    id?: string,
    name?: string,
    totalLiabilities?: string,
    paid?: string,
    musPay?: string,

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
                        idSelect == item?.id ? colors.palette.navyBlue : colors.white,
                        idSelect == item?.id ? colors.palette.malibu : colors.white
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
                        <Text style={[idSelect == item?.id ? Styles.sizeTitle : Styles.sizeTitleUnSelect]} tx='debtScreen.nameProviders' />
                        <Text style={[idSelect == item?.id ? Styles.sizeContent : Styles.sizeContentUnSelect]}>{item?.name}</Text>
                    </View>
                    <View>
                        <Text style={[idSelect == item?.id ? Styles.sizeTitle : Styles.sizeTitleUnSelect]} tx='debtScreen.totalLiabilities' />
                        <Text style={[idSelect == item?.id ? Styles.sizeContent : Styles.numberInItemUnSelect]}>
                            {`${item?.totalLiabilities}đ`}
                        </Text>
                    </View>

                </View>
                <View style={{ width: '100%', marginTop: scaleHeight(15), flexDirection: 'row' }} >
                    <View style={{ width: '50%' }}>
                        <Text
                            style={[idSelect == item?.id ? Styles.sizeTitle : Styles.sizeTitleUnSelect,]}
                            tx='debtScreen.paid'
                        />

                        <Text style={[idSelect == item?.id ? Styles.sizeContent : Styles.numberInItemUnSelect]}>{`${item?.paid}đ`}</Text>
                    </View>
                    <View>
                        <Text
                            style={[idSelect == item?.id ? Styles.sizeTitle : Styles.sizeTitleUnSelect,]}
                            tx='debtScreen.mustPay'
                        />


                        <Text style={[Styles.sizeContent, { color: idSelect == item?.id ? 'yellow' : "#FF4956" }]}>
                            {`${item?.musPay}đ`}
                        </Text>
                    </View>

                </View>

            </LinearGradient >
        </TouchableOpacity>

    )
}

