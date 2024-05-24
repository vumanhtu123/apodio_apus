import { useNavigation, useRoute } from "@react-navigation/native"
import React, { FC, useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { FlatList, ImageBackground, Platform, RefreshControl, StyleSheet, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import { Images } from "../../../assets/index"
import { Header } from '../../components/header/header'
import { TextField } from "../../components/text-field/text-field"
import { Text } from "../../components/text/text"
import { useStores } from "../../models"
import { colors, fontSize, palette, scaleHeight, scaleWidth } from "../../theme"
// import SelectFilterModal from "./modal-select-filter"

export const ChooseVendorScreen: FC = () => {
    const navigation = useNavigation()
    const [arrVendor, setArrVendor] = useState<any>([]);
    const [searchText, setSearchText] = useState('');
    const { vendorStore } = useStores()
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const route = useRoute();
    const { listIds, mode }: any = route?.params || {};
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const {
        control,
        formState: { errors },
    } = useForm({
        mode: 'all',
    });

    useEffect(() => {
        getListVendor(true);
    }, [page]);
    const getListVendor = async (vendorActivated: boolean, search?: any) => {
        const vendorResult = await vendorStore.getListVendor(page, 20, vendorActivated, search)
        console.log('vendorResult----------------' , vendorResult.result.data.totalPages)
        setTotalPages(vendorResult.result.data.totalPages)
        if (vendorResult && vendorResult.kind === 'ok') {
            if (page === 0) {
                setArrVendor(vendorResult.result.data.content)
            } else {
                setArrVendor((prevProducts: any) => [
                    ...prevProducts, ...vendorResult.result.data.content
                ]);
            }
            // setArrVendor(data.content)
            if (!isRefreshing) {
                setSelectedIds(listIds || []);
            }
        } else {
            console.error('Failed to fetch list unit:', unitResult);
        }
    }
    const handleEndReachedCategory = () => {
        if (page <= totalPages - 1 && searchText == '') {
            setPage(prevPage => prevPage + 1);
            getListVendor(true);
        }
    };
    // useEffect(() => {
    //     // console.log('check', listIds)
    //     console.log('first', selectedIds)
    // }, [selectedIds])
    const RadioButton = ({ selected, onPress }: any) => (
        <TouchableOpacity onPress={onPress}>
            {selected ? (
                <Images.icon_checkCircle
                    width={scaleWidth(30)}
                    height={scaleHeight(30)}
                />
            ) : (
                <Images.ic_plusCircle
                    width={scaleWidth(30)}
                    height={scaleHeight(30)}
                />
            )}
        </TouchableOpacity>
    );
    useEffect(() => {
        console.log('page', page)
    }, [page])
    const refreshVendor = async () => {
        console.log('okok')
        setIsRefreshing(true)
        setArrVendor([])
        setPage(0)
        setSearchText('')
        await getListVendor(true);
        setIsRefreshing(false)
    }

    const handleSearch = (value: string) => {
        const newValue = value !== null ? value.toString() : '';
        setSearchText(newValue);
    };
    const handleSubmitSearch = () => {
        setPage(0)
        setArrVendor([])
        getListVendor(true, searchText)
    };
    const handleBtn = () => {
        navigation.navigate('ProductCreateScreen', { selectedIds })
    }
    const handleBtnEditing = () => {
        navigation.navigate('ProductEditScreen', { selectedIds })
    }
    const handleSelectOption = (groupIndex: number, id: number) => {
        const isSelected = selectedIds.includes(id);
        if (isSelected) {
            setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };
    const selectedCount = selectedIds ? selectedIds.length : 0;

    const renderNCCItem = ({ item, index }: any) => {
        const key = item.id ? item.id.toString() : `index-${index}`;
        return (
            <View key={key} style={{ flexDirection: 'row', alignItems: 'center', width: scaleWidth(375), height: scaleHeight(56), paddingHorizontal: 16, backgroundColor: 'white', marginBottom: 1.5, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <ImageBackground
                        style={{ width: scaleWidth(40), height: scaleHeight(40) }}
                        imageStyle={{
                            borderRadius: 20
                        }}
                        source={require("../../../assets/Images/no_images.png")}>
                        <FastImage
                            style={{
                                width: scaleWidth(40),
                                height: scaleHeight(40),
                                borderRadius: 20
                            }}
                            source={{
                                uri: `${item.imageUrls}`,
                                cache: FastImage.cacheControl.immutable,
                            }}
                            defaultSource={require("../../../assets/Images/no_images.png")}
                        />
                    </ImageBackground>
                    {/* </View> */}
                    <View style={{ marginHorizontal: 6 }}>
                        <Text style={{ fontSize: fontSize.size10 }}>{item.code} - {item.name}</Text>
                        <Text style={{ fontSize: fontSize.size10, color: '#747475' }}>{item.phoneNumber}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        handleSelectOption(1, item.id);
                    }
                    }
                    key={item.id}
                >
                    <RadioButton
                        selected={selectedIds.includes(item.id)}
                        onPress={() => {
                            handleSelectOption(1, item.id)
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={styles.ROOT}>
            <Header
                type={"AntDesign"}
                LeftIcon={Images.back}
                onLeftPress={() => navigation.goBack()}
                colorIcon={colors.text}
                headerText={`Chọn nhà cung cấp`}
                style={{ height: scaleHeight(54) }}
                titleMiddleStyle={{ paddingLeft: 5, flexDirection: 'row', alignItems: 'center' }}
                titleStyle={{ fontSize: fontSize.size16, fontWeight: '700' }}
            />
            <View style={styles.ROOT}>
                <View style={{ marginHorizontal: scaleWidth(16), marginTop: scaleHeight(20) }}>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextField
                                keyboardType={null}
                                style={{
                                    // marginBottom: scaleHeight(5),
                                    justifyContent: 'center',
                                    height: scaleHeight(40)
                                }}
                                inputStyle={{ fontSize: fontSize.size12, fontWeight: '500', }}
                                value={searchText}
                                onBlur={onBlur}
                                RightIconClear={Images.icon_delete2}
                                error={errors?.productName?.message}
                                onClearText={async () => {
                                    setSearchText('')
                                    await getListVendor(true, '');
                                }}
                                onChangeText={handleSearch}
                                enterKeyHint="search"
                                onSubmitEditing={handleSubmitSearch}
                                enablesReturnKeyAutomatically
                                placeholderTx='chooseSupplierScreen.placeholderSearch'
                                RightIcon={Images.ic_searchBlue}
                            // isImportant
                            />
                        )}
                        // defaultValue={''}
                        name="Search"
                    // rules={{
                    //     required: 'Please input data',
                    // }}
                    />


                </View>
                <View style={{ flex: 1, marginBottom: scaleHeight(10) }}>
                    <FlatList
                        data={arrVendor}
                        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshVendor} title="ok" />}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item.id ? item.id.toString() : `index-${index}`}
                        onEndReached={handleEndReachedCategory}
                        onEndReachedThreshold={0.5}
                        numColumns={1}
                        columnWrapperStyle={null}
                        renderItem={renderNCCItem}
                    />
                </View>
                <TouchableOpacity
                    onPress={mode === 'edit' ? handleBtnEditing : handleBtn}
                    style={{
                        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 8,
                        paddingHorizontal: scaleWidth(16),
                        paddingVertical: scaleHeight(11),
                        backgroundColor: colors.palette.navyBlue,
                        bottom: Platform.OS === 'ios' ? scaleHeight(20) : scaleHeight(5),
                        marginHorizontal: scaleWidth(16)
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ marginRight: scaleWidth(10) }}>
                            <View style={{
                                backgroundColor: 'red',
                                alignItems: 'center',
                                width: scaleWidth(14),
                                height: scaleHeight(14),
                                borderRadius: 30,
                                position: 'absolute',
                                zIndex: 1,
                                right: scaleWidth(1),
                                top: 0
                            }}>
                                <Text style={{ fontSize: fontSize.size9, fontWeight: '500', color: '#ffffff' }}>{selectedCount}</Text>
                            </View>
                            <Images.ic_shopping width={scaleWidth(20)} height={scaleHeight(20)} style={{ marginRight: 6, marginTop: 2 }} />
                        </View>
                        <Text style={{ color: 'white', fontSize: fontSize.size14, }}>{selectedCount} nhà cung cấp</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white', fontSize: fontSize.size14 }}>Tiếp tục</Text>
                    </View>
                </TouchableOpacity>
            </View>

        </View >
    )
}
export const styles = StyleSheet.create({
    ROOT: {
        backgroundColor: '#FfFfFf',
        flex: 1,
    },
    rowBtnTab: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 12,
    },
    rowNotiType: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: scaleWidth(16),
        marginBottom: scaleHeight(12)
    },

    buttonProduct: {
        width: scaleWidth(169),
        paddingVertical: 8,
        borderRadius: 8
    },
    activeButton: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    activeButtonCategory: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: -2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#747475',
        textAlign: 'center',
    },
    activeButtonText: {
        color: '#0078D4',
    },
    discount: {
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',
        width: scaleWidth(32),
        height: scaleHeight(16),
        position: 'absolute',
        zIndex: 10,
        // borderBottomEndRadius: 5,
        borderBottomLeftRadius: 12,
        borderTopRightRadius: 12,
        // top : 10,
        right: scaleHeight(0)
    },
    btnBottom: {
        // bottom: scaleHeight(40),
        // left: scaleWidth(16),
        // // position: "absolute",
        // right: scaleWidth(16),
        borderRadius: 8,
        marginHorizontal: scaleWidth(16),
        marginBottom: Platform.OS == 'ios' ? scaleHeight(45) : scaleHeight(40),
        backgroundColor: 'white',
        borderWidth: 0
    },
    textButton: {
        color: palette.white,
        fontSize: fontSize.size14,
        fontWeight: "700",
        lineHeight: 24,
        // paddingLeft: scaleWidth(15),
        textAlign: "center",
        display: 'flex',
        // flexWrap: 'wrap', 
    },
    radioButton: {
        width: scaleWidth(18),
        height: scaleHeight(18),
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    radioButtonSelected: {
        backgroundColor: colors.palette.navyBlue,
        borderWidth: 0
    },
    radioButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: fontSize.size10
    },
})