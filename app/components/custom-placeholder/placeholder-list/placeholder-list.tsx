import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { scaleHeight, scaleWidth } from "../../theme"

export const PlaceholderList = () => {

    return (
        <SkeletonPlaceholder borderRadius={4} speed={600}   >
            <ScrollView style={{ padding: scaleWidth(15), backgroundColor: '#343434' }}>
                <View style={Styles.item}>

                </View>
                <View style={Styles.item}>

                </View>
                <View style={Styles.item}>

                </View>
                <View style={Styles.item}>

                </View>
                <View style={Styles.item}>

                </View>
            </ScrollView>
        </SkeletonPlaceholder>
    )
}

const Styles = StyleSheet.create({
    item: {
        width: '100%',
        height: scaleHeight(189),
        marginBottom: scaleHeight(15),
        borderRadius: scaleWidth(8)
    }
})