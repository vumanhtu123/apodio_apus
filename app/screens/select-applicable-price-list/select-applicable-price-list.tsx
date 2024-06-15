import { observer } from "mobx-react-lite";
import React, { useEffect, useRef } from "react";
import { FC, useState } from "react";
import { Image, TouchableOpacity, View, FlatList, Platform, RefreshControl, ActivityIndicator, Alert } from "react-native";
import { ScreenStackProps } from "react-native-screens";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Header, Text } from "../../components";
import { Images } from "../../../assets";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { number } from "mobx-state-tree/dist/internal";
import { Styles, } from "./styles";;
import { NavigatorParamList } from "../../navigators";
import SelectFilterModal from "./Modal/modal-select-filter";
import { useStores } from "../../models";
import { id } from "date-fns/locale";


export const SelectApplicablePriceList: FC<StackScreenProps<NavigatorParamList, "selectApplicablePriceList">> = observer(
    function SelectApplicablePriceList(props) {
        const [indexSelect, setIndexSelect] = useState<any>()
        const [onClick, setOnClick] = useState('select')
        const [isVisible, setIsVisible] = useState(false);
        const [myDataSelectPriceList, setMyDataSelectPriceList] = useState([])
        const [refreshing, setRefreshing] = useState(false);
        const [isLoadingMore, setIsLoadingMore] = useState(false);
        const [size, setsize] = useState(15)
        const [page, setPage] = useState(0)
        const getAPi = useStores()
        const [valueSearch, setValueSearch] = useState('')
        const [isShowSearch, setisShowSearch] = useState(false)
        const [dataPriceListSelected, setDataPriceListSelected] = useState({})
        const [watching, setWatching] = useState<boolean>()

        const openTypeFilter = () => {
            setIsVisible(true)
        }

        // console.log("doannnnn", totalPage);

        // const dataFake = [
        //     { nameTable: "Bảng giá tháng 12/2023", container: "Bảng giá áp dụng đến khi hết số lượng hàng trong kho" },
        //     { nameTable: "Bảng giá tháng 12/2024", container: "Bảng giá áp dụng đến khi hết số lượng hàng trong kho" }
        // ]

        const sort = getAPi.orderStore.sortPriceList
        console.log("doann log sort", sort);

        // console.log('====================================');
        // console.log('valueSearch', valueSearch);
        // console.log('====================================');

        const senDataPriceListSelect = () => {
            getAPi.orderStore.setDataPriceListSelect(dataPriceListSelected)
            getAPi.orderStore.setCheckPriceList(true)
            // console.log('====================================');
            // console.log("dataSelect", dataPriceListSelected);
            // console.log('====================================');
        }
        const setPriceListNoApply = () => {
            getAPi.orderStore.setDataPriceListSelect({ id: '', name: "No Apply", priceListCategory: '' })
            getAPi.orderStore.setCheckPriceList(false)
        }


        const getListPriceListApply = () => {
            getAPi.orderStore.getListPriceList(0, size, sort, valueSearch).then((data) => {
                console.log("dataaaaaaaa", data?.content)

                const dataSlectPriceList = data?.content.map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        priceListCategory: item.priceListCategory.name
                    }
                })

                setMyDataSelectPriceList(dataSlectPriceList)
            })


        }

        useEffect(() => {
            getListPriceListApply()
        }, [getAPi.orderStore.sortCreateClient, props.navigation])





        console.log("load more", isLoadingMore)

        const handleRefresh = React.useCallback(async () => {
            setRefreshing(true);
            try {
                // Gọi API hoặc thực hiện các tác vụ cần thiết để lấy dữ liệu mới
                const newData: any = await getListPriceListApply();
                // Cập nhật state của danh sách dữ liệu
                setMyDataSelectPriceList(newData);
            } catch (error) {
                console.error(error);
            } finally {
                setRefreshing(false);
            }
        }, []);

        const handleLoadMore = () => {
            setIsLoadingMore(true)
            setsize(size + 3)
            getListPriceListApply()
            setTimeout(() => {
                setIsLoadingMore(false)
            }, 3000);
        };
        const handelSearch = () => {
            getListPriceListApply()
        }

        return (
            <View style={{ flex: 1 }}>
                <Header
                    headerTx="selectPriceListApply.selectPriceListApply"
                    LeftIcon={Images.back}
                    onLeftPress={() => props.navigation.goBack()}
                    RightIcon={Images.icon_funnel}
                    RightIcon1={Images.icon_search}
                    style={{ height: scaleWidth(52) }}
                    headerInput={isShowSearch}
                    handleOnSubmitSearch={() => {
                        handelSearch()
                    }}
                    onSearchValueChange={(txt: any) => {
                        setValueSearch(txt)
                    }}
                    onRightPress={() => {
                        // openTypeFilter
                        props.navigation.navigate("filterSelectApplicablePriceList")

                    }}
                    onRightPress1={() => {
                        setisShowSearch(!isShowSearch)
                    }}

                />
                <TouchableOpacity style={{
                    height: scaleHeight(56),
                    alignItems: 'center',
                    paddingVertical: scaleHeight(16),
                    backgroundColor: indexSelect === "noApply" ? '#DBEFFF' : 'white',
                    paddingHorizontal: scaleWidth(16),
                    flexDirection: 'row',
                    justifyContent: 'space-between',


                }}
                    onPress={() => {
                        setWatching(false)
                        setPriceListNoApply()
                        // setNoApply()
                        console.log("dataNoApply", dataPriceListSelected);

                        setIndexSelect('noApply')
                    }}
                >
                    <Text
                        style={{ fontSize: fontSize.size10, color: colors.palette.black, fontWeight: '500' }}
                        tx="selectPriceListApply.noApplyPriceList"
                    ></Text>
                    <TouchableOpacity>
                        {/* <Images.icon_edit width={scaleWidth(14)} height={scaleHeight(14)} /> */}
                        <View style={{
                            borderRadius: scaleHeight(8),
                            borderWidth: 1,
                            borderColor: colors.palette.lightGrey,
                            width: scaleHeight(16),
                            height: scaleHeight(16),
                            backgroundColor: indexSelect === 'noApply' ? colors.palette.navyBlue : colors.palette.white
                        }}>

                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={{ flex: 1, }}>
                    <FlatList
                        data={myDataSelectPriceList}
                        renderItem={({ item, index }): any => {
                            return (
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    width: scaleWidth(375),
                                    height: scaleHeight(56),
                                    paddingHorizontal: 16,
                                    backgroundColor: indexSelect === index ? '#DBEFFF' : 'white',
                                    marginBottom: 1.5,
                                    justifyContent: 'space-between',
                                }}
                                    onPress={() => {
                                        console.log("data Item :", item);
                                        setWatching(true)
                                        setDataPriceListSelected(item)
                                        setIndexSelect(index)
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        {/* <View style={{ width: 40, height: 40, backgroundColor: '#EFF8FF', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: fontSize.size10, color: '#0078D4' }}>{item.code}</Text>
                                        </View> */}
                                        <View style={{ marginHorizontal: 6 }}>
                                            <Text style={{ fontSize: fontSize.size10, fontWeight: '500' }}>{item.name}</Text>
                                            <Text style={{ fontSize: fontSize.size10, color: '#747475' }}>{item.priceListCategory}</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity>
                                        {/* <Images.icon_edit width={scaleWidth(14)} height={scaleHeight(14)} /> */}
                                        <View style={{
                                            borderRadius: scaleHeight(8),
                                            borderWidth: 1,
                                            borderColor: colors.palette.lightGrey,
                                            width: scaleHeight(16),
                                            height: scaleHeight(16),
                                            backgroundColor: indexSelect === index ? colors.palette.navyBlue : colors.palette.white
                                        }}>

                                        </View>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        }}
                        // keyExtractor={(item: any, index: any) => item.code.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                            />

                        }
                        onEndReached={() => handleLoadMore()}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={() => {
                            return (
                                <View>
                                    {isLoadingMore ? <ActivityIndicator /> : null}
                                </View>
                            )
                        }}

                    />

                </View>


                <View style={Styles.stylesBtnBottom}>
                    <TouchableOpacity
                        style={[onClick === 'cancel' ? Styles.btnSuccessfully : Styles.btnSave, { marginRight: 13 }]}
                        onPress={() => {
                            // const data = getAPi.orderStore.dataPriceListSelected
                            // console.log('====================================');
                            // console.log("dataSave", data);
                            // console.log('====================================');
                            props.navigation.goBack()
                            setOnClick('cancel')
                        }}
                    >
                        <Text
                            style={{ color: onClick === 'cancel' ? colors.palette.white : colors.palette.navyBlue }}
                            tx="common.cancel"
                        >

                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={onClick === 'select' ? Styles.btnSuccessfully : Styles.btnSave}
                        onPress={() => {
                            if (watching == true) {
                                senDataPriceListSelect()
                                props.navigation.goBack()

                            } else if (watching == false) {
                                props.navigation.goBack()
                            } else {
                                setPriceListNoApply()
                                props.navigation.goBack()

                            }
                            setOnClick('select')
                        }}
                    >
                        <Text
                            style={{ color: onClick === 'select' ? colors.palette.white : colors.palette.navyBlue }}
                            tx="selectClient.selected"
                        >
                        </Text>
                    </TouchableOpacity>

                </View>

                <SelectFilterModal
                    isVisible={isVisible}
                    setIsVisible={() => setIsVisible(!isVisible)}
                />


            </View>
        )
    }
)