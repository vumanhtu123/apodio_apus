import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { scaleHeight, scaleWidth } from '../../../theme'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export const PlaceholderListGrid = () => {
  return (
    <SkeletonPlaceholder borderRadius={4} speed={600}   >
      <ScrollView style={{ padding: scaleWidth(15), backgroundColor: '#343434' }}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
        >
          <View style={Styles.item} />

          <View style={Styles.item} />

          <View style={Styles.item} />
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
        >
          <View style={Styles.item} />

          <View style={Styles.item} />

          <View style={Styles.item} />
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
        >
          <View style={Styles.item} />

          <View style={Styles.item} />

          <View style={Styles.item} />
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
        >
          <View style={Styles.item} />

          <View style={Styles.item} />

          <View style={Styles.item} />
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
        >
          <View style={Styles.item} />

          <View style={Styles.item} />

          <View style={Styles.item} />
        </View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
        >
          <View style={Styles.item} />

          <View style={Styles.item} />

          <View style={Styles.item} />
        </View>
      </ScrollView>
    </SkeletonPlaceholder>
  )
}


const Styles = StyleSheet.create({
  item: {
    width: scaleWidth(107),
    height: scaleHeight(124),
    marginBottom: scaleHeight(15),
    borderRadius: scaleWidth(8)
  }
})