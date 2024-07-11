import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, RefreshControl, Text as TextRN, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import { Text } from '../../../components';
import { colors, fontSize, padding, scaleHeight, scaleWidth } from '../../../theme';
import { Images } from '../../../../assets';
import { CustomModal } from '../../../components/custom-modal';

const CategoryModalFilter = ({ showCategory, setShowCategory, dataCategory, selectedCategory, setSelectedCategory, setNameDirectory, isSearchBarVisible, setIndex, setPage, onSearchChange, isRefreshing, onRefresh }: any) => {

    const inputRef = useRef<TextInput | null>(null);
    const [search, setSearch] = useState("");
    const [showLoading, setShowLoading] = useState(false)
    const handleSearch = (text) => {
        setSearch(text);
        // onSearchChange(text); // Gọi hàm callback để cập nhật state ở component cha
    };
    const handleOnSubmitSearch = async () => {
        setShowLoading(true);
        if (onSearchChange) {
            await onSearchChange(search)
            setTimeout(() => {
                setShowLoading(false);
            }, 1000);
        }
        // setShowLoading(false);
    };
    const refresh = async () => {
        setShowLoading(true);
        setSearch('')
        // setShowLoading(true)
        await onRefresh()
        setTimeout(() => {
            setShowLoading(false);
        }, 1000);
    }
    useEffect(() => {
        console.log('czcsadsad', showLoading)
    }, [showLoading])
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
        // <Modal
        <CustomModal
            isVisible={showCategory}
            setIsVisible={setShowCategory}
            isHideKeyBoards={showCategory}
            isVisibleLoading={showLoading}
        // style={{ height: '40%' }}
        >
            <View
                style={{
                    borderColor: colors.palette.veryLightGrey,
                    // backgroundColor: colors.palette.neutral100,
                    height: scaleHeight(350)
                }}
            >
                <TextRN style={{
                    textAlign: 'center',
                    width: scaleWidth(68),
                    height: scaleHeight(5),
                    backgroundColor: '#C7C7C7',
                    borderRadius: 8,
                    // marginTop: scaleHeight(8),
                    alignSelf: 'center',
                }} />
                <View style={{ paddingVertical: scaleHeight(12), paddingHorizontal: scaleWidth(16) }}>
                    <Text tx={'inforMerchant.Category'} style={{
                        fontWeight: '700', fontSize: fontSize.size14,
                        // lineHeight: scaleHeight(24),
                        color: colors.palette.nero,
                    }} />
                </View>
                <View style={{ height: scaleHeight(1), backgroundColor: '#E7EFFF' }}></View>
                <View>
                    <View style={{ position: 'absolute', bottom: scaleHeight(20), left: scaleWidth(20) }}>
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
                <View
                // style={{ height: '40%' }}
                >
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
            </View>
        </CustomModal>
    )
};

export default CategoryModalFilter;
