import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import { Text } from '../../../components';
import { colors, fontSize, padding, scaleHeight, scaleWidth } from '../../../theme';

const CategoryModalFilter = ({ showCategory, setShowCategory, dataCategory, selectedCategory, setSelectedCategory, setNameDirectory, isSearchBarVisible, setIndex, setPage, onSearchChange }: any) => {

    const inputRef = useRef<TextInput | null>(null);
    const [search, setSearch] = useState("");
    const handleSearch = (text) => {
        setSearch(text);
        // onSearchChange(text); // Gọi hàm callback để cập nhật state ở component cha
    };
    const handleOnSubmitSearch = () => {
        if (onSearchChange) {
            onSearchChange(search); // Gọi hàm callback để cập nhật state ở component cha và gọi API
        }
    };
    return (
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
                margin: 0,
            }}>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: colors.palette.veryLightGrey,
                    maxHeight: '40%',
                    width: '100%',
                    backgroundColor: colors.palette.neutral100,
                    borderTopLeftRadius: 16, borderTopRightRadius: 16
                }}
            >
                <View style={{ paddingVertical: scaleHeight(12), paddingHorizontal: scaleWidth(16) }}>
                    <Text tx={'inforMerchant.Category'} style={{
                        fontWeight: '700', fontSize: fontSize.size14,
                        // lineHeight: scaleHeight(24),
                        color: colors.palette.nero,
                    }} />
                </View>
                <View style = {{ height : scaleHeight(1), backgroundColor :'#E7EFFF'}}></View>
                <TextInput
                    ref={inputRef}
                    style={{
                        fontSize: fontSize.size14,
                        fontWeight: "400",
                        paddingVertical: scaleHeight(3),
                        marginVertical: scaleHeight(10),
                        marginHorizontal : scaleWidth(10),
                        borderWidth : 0.3,
                        borderRadius : 5,
                        paddingHorizontal : scaleWidth(10),
                    }}
                    textAlign='left'
                    onChangeText={(text) => handleSearch(text)}
                    value={search}
                    placeholder="Tìm kiếm..."
                    enterKeyHint="search"
                    onSubmitEditing={handleOnSubmitSearch}
                    enablesReturnKeyAutomatically
                />
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
                                    // setPage(0)
                                }}
                                style={{
                                    paddingVertical: scaleHeight(padding.padding_12),
                                    paddingHorizontal: scaleWidth(padding.padding_16),
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
    )
};

export default CategoryModalFilter;
