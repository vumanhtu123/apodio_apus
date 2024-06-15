import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors, scaleHeight } from '../../../theme'


const itemListMustPay: FC = () => {
    return (
        <LinearGradient
            start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
            colors={[colors.palette.navyBlue, colors.palette.malibu]}
            style={{ height: scaleHeight(50) }}
        >


        </LinearGradient>
    )
}

export default itemListMustPay
