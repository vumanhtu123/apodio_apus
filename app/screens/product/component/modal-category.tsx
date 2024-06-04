import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import { Text } from '../../../components';
import { colors, padding, scaleHeight, scaleWidth } from '../../../theme';

const CategoryModalFilter = ({ showCategory, setShowCategory, dataCategory, selectedCategory, setSelectedCategory, setNameDirectory, isSearchBarVisible, setIndex }: any) => (
    <Modal
        isVisible={showCategory}
        onBackdropPress={() => setShowCategory(false)}
        backdropColor=""
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={750}
        style={{
            // flex : 1,
            justifyContent: 'flex-end',
            margin: 16,
        }}>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: colors.palette.veryLightGrey,
                    height: scaleHeight(300),
                    width: '100%',
                    backgroundColor: colors.palette.neutral100,
                }}
            >
                <ScrollView>
                    {dataCategory.map((item: any, index: any) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    setSelectedCategory(item.id);
                                    setNameDirectory(item.name);
                                    setShowCategory(false);
                                    setIndex(index);
                                } }
                                style={{
                                    paddingVertical: scaleHeight(padding.padding_12),
                                    paddingHorizontal: scaleWidth(padding.padding_12),
                                    backgroundColor: selectedCategory === item.id
                                        ? colors.palette.navyBlue
                                        : colors.palette.neutral100,
                                }}>
                                <Text
                                    style={{
                                        fontWeight: "500",
                                        fontSize: 10, // Adjust font size accordingly
                                        color: selectedCategory === item.id
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

export default CategoryModalFilter;
