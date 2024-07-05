import React, { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import { Text } from '../../../components';
import { colors, fontSize, padding, scaleHeight, scaleWidth } from '../../../theme';
import { Images } from '../../../../assets';

const CategoryModalFilter = ({ showCategory, setShowCategory, dataCategory, selectedCategory, setSelectedCategory, setNameDirectory, isSearchBarVisible, setIndex, setPage, onSearchChange, isRefreshing, onRefresh }: any) => {

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
    const refresh = () => {
        setSearch('')
        onRefresh();
    }
    const renderItem = ({ item, index }: any) => (
        <TouchableOpacity
            key={index}
            onPress={() => {
                setSelectedCategory(item.id);
                setNameDirectory(item.name);
                setShowCategory(false);
                setIndex(index);
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
                    fontSize: 10,
                    color: selectedCategory === item.id
                        ? colors.palette.neutral100
                        : colors.palette.nero,
                }}>
                {item.name}
            </Text>
        </TouchableOpacity>
    );
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
                    height: '40%',
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
                <View>
                    <View style= {{ position : 'absolute' , bottom : scaleHeight(20) , left : scaleWidth(20)}}>
                        <Images.icon_searchBlack />
                    </View>
                    <TextInput
                        ref={inputRef}
                        style={{
                            fontSize: fontSize.size14,
                            fontWeight: "400",
                            paddingVertical: scaleHeight(3),
                            marginVertical: scaleHeight(10),
                            marginHorizontal: scaleWidth(10),
                            borderWidth: 0.3,
                            borderRadius: 5,
                            paddingLeft: scaleWidth(30),
                        }}
                        textAlign='left'
                        onChangeText={(text) => handleSearch(text)}
                        value={search}
                        placeholder="Tìm kiếm danh mục"
                        enterKeyHint="search"
                        onSubmitEditing={handleOnSubmitSearch}
                        enablesReturnKeyAutomatically
                    />
                </View>
                <FlatList
                    data={dataCategory}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={refresh}
                        />
                    }
                />
            </View>
        </Modal>
    )
};

export default CategoryModalFilter;
