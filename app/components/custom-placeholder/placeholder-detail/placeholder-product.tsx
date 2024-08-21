import React from 'react'
import { ScrollView, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { scaleHeight } from '../../theme'

export const PlaceholderProduct = () => {
    return (
        <SkeletonPlaceholder speed={600}   >
            <ScrollView style={{ width: '100%' }}>
                <View style={{ width: '100%', height: scaleHeight(500) }}>
                </View>
                <View style={{ width: '100%', height: scaleHeight(100), marginVertical: scaleHeight(15) }}>
                </View>
                <View style={{ width: '100%', height: scaleHeight(115) }}>
                </View>
                <View style={{ width: '100%', height: scaleHeight(75), marginVertical: scaleHeight(15) }}>
                </View>
            </ScrollView>
        </SkeletonPlaceholder>
    )
}