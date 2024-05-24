import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, Platform, View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import { colors, padding, scaleHeight, scaleWidth } from '../../../theme';
import { Text } from '../../../components';

const CategoryModalFilter = ({ showCategory, setShowCategory, dataCategory, selectedCategory, setSelectedCategory, setNameDirectory , isSearchBarVisible , setIndex  }: any) => {
   
    return (
        <Modal
            isVisible={showCategory}
            onBackdropPress={() => setShowCategory(false)}
            backdropColor=""
            animationIn={"fadeIn"}
            animationOut={"fadeOut"}
            style={{
                position: "absolute",
                right: 0,
                top: isSearchBarVisible ? Platform.OS === "ios" ? scaleHeight(235) : scaleHeight(180) : Platform.OS === "ios" ? scaleHeight(185) : scaleHeight(135),
            }}>
            <View
                style={{
                    // borderRadius: 10,
                    borderWidth: 1,
                    borderColor: colors.palette.veryLightGrey,
                    height: scaleHeight(144),
                    width: scaleWidth(170),
                    backgroundColor: colors.palette.neutral100,
                }}
            >
                <ScrollView>
                    {dataCategory.map((item: any , index : any) => {
                        return (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    setSelectedCategory(item.id);
                                    setNameDirectory(item.name);
                                    setShowCategory(false);
                                    setIndex(index)
                                }}
                                style={{
                                    paddingVertical: scaleHeight(padding.padding_12),
                                    paddingHorizontal: scaleWidth(padding.padding_12),
                                    backgroundColor:
                                        selectedCategory === item.id
                                            ? colors.palette.navyBlue
                                            : colors.palette.neutral100,
                                }}>
                                <Text
                                    style={{
                                        fontWeight: "500",
                                        fontSize: 10, // Adjust font size accordingly
                                        color:
                                            selectedCategory === item.id
                                                ? colors.palette.neutral100
                                                : colors.palette.nero,
                                    }}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </Modal>
    );
};

export default CategoryModalFilter;
