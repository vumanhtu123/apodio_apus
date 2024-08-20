import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { margin, scaleHeight, scaleWidth } from '../../theme'

export const PlaceholderOrder = () => {
    return (
        <SkeletonPlaceholder borderRadius={4} speed={600}   >
            <ScrollView style={{ width: '100%', paddingVertical: scaleHeight(20) }}>
                <View style={{ width: '100%', height: scaleHeight(115), borderRadius: margin.margin_8 }}>

                </View>
                <View style={{ width: '100%', height: scaleHeight(55), borderRadius: scaleWidth(margin.margin_8), marginVertical: scaleHeight(15) }}>

                </View>
                <View style={{ width: '100%', height: scaleHeight(115), borderRadius: margin.margin_8 }}>

                </View>
                <View style={{ width: '100%', height: scaleHeight(75), borderRadius: margin.margin_8, marginVertical: scaleHeight(15) }}>

                </View>
                <View style={{ width: '100%', height: scaleHeight(95), borderRadius: margin.margin_8 }}>

                </View>

                <View style={{ width: '100%', height: scaleHeight(75), borderRadius: margin.margin_8, marginVertical: scaleHeight(15) }}>

                </View>
                <View style={{ width: '100%', height: scaleHeight(60), borderRadius: margin.margin_8, marginTop: scaleHeight(20) }}>

                </View>

            </ScrollView>

        </SkeletonPlaceholder>
    )
}
