import { StyleSheet, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, scaleHeight, scaleWidth } from '../../../theme'
import { Text } from '../../../components'

interface itemData {
    name: string,
    totalLiabilities: string,
    paid: string,
    musPay: string

}

export const ItemListMustPay: FC<{ item: itemData }> = ({ item }) => {
    return (


        <LinearGradient
            start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
            colors={[colors.palette.navyBlue, colors.palette.malibu]}
            style={{
                height: scaleHeight(50),
                padding: scaleWidth(15),
                marginVertical: scaleWidth(10),
                marginHorizontal: scaleHeight(20),
                borderRadius: 8
            }}
        >
            <View style={{
                justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row',

            }}>
                <View style={{ flex: 1 }} >
                    <Text>Tên</Text>
                    <Text>Tổng nợ</Text>
                </View>
                <View style={{ flex: 1 }} >
                    <Text>Đã trả</Text>
                    <Text>Phải trả</Text>
                </View>

            </View>
        </LinearGradient>
    )
}

