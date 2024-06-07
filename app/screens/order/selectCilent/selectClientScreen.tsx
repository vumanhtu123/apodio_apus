import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { FC, useState } from "react";
import { Image, TouchableOpacity, View, FlatList, Platform, RefreshControl, ActivityIndicator, Alert } from "react-native";
import { ScreenStackProps } from "react-native-screens";
import { NavigatorParamList } from "../../../navigators";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { Header, Text } from "../../../components";
import { Images } from "../../../../assets";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { number } from "mobx-state-tree/dist/internal";
import { Styles, } from "./styles";
import SelectFilterModal from "./Modal/modal-select-filter";
import { SelectClienAPI } from "../../../services/api/api_selectClient";
import { useStores } from "../../../models";
import ModalCreateClient from "./Modal/modal-create-client";
import Loading from "../../../components/loading/loading";
import { showLoading } from "../../../utils/toast";
import { useNavigation } from "@react-navigation/native";


export const SelectClientScreen: FC<StackScreenProps<NavigatorParamList, "selectClient">> = observer(
    function SelectClientScreen(props) {
        const [indexSelect, setIndexSelect] = useState<any>()
        const [onClick, setOnClick] = useState('successfully')
        const [isVisible, setIsVisible] = useState(false);
        const [myDataSlectClient, setmyDataSlectClient] = useState([])
        const [refreshing, setRefreshing] = useState(false);
        const [isLoadingMore, setIsLoadingMore] = useState(false);
        const [size, setsize] = useState(12)
        const [page, setPage] = useState(0)
        const getAPi = useStores()
        const [isVisibleCreateClient, setisVisibleCreateClient] = useState(false);
        const [valueSearch, setValueSearch] = useState('')
        const [isShowSearch, setisShowSearch] = useState(false)

        // const dataFace = [
        //     {
        //         code: "MTH",
        //         name: "Công ty TNHH MISUKO VIệt Nam",
        //         phone: "0123214155",
        //         id: "NCC00001"
        //     },
        //     {
        //         code: "TH",
        //         name: "Công ty TNHH MISUKO VIệt Nam",
        //         phone: "0123214155",
        //         id: "NCC00002"
        //     }, {
        //         code: "TH",
        //         name: "Công ty TNHH MISUKO VIệt Nam",
        //         phone: "0123214155",
        //         id: "NCC00003"
        //     }
        // ]

        const openTypeFilter = () => {
            setIsVisible(true)
        }

        // console.log("doannnnn", totalPage);


        const sort = getAPi.orderStore.sort
        console.log("doann log sort", sort);

        console.log('====================================');
        console.log('valueSearch', valueSearch);
        console.log('====================================');

        const getListClient = () => {
            getAPi.orderStore.getListSelectClient(0, size, sort, valueSearch).then((data) => {
                console.log("dataaaaaaaaa", data);

                // setTotalPage(data?.totalPages)

                const dataSelectClien = data?.content.map((item) => {
                    return {
                        name: item.name,
                        code: item.code,
                        phoneNumber: item.phoneNumber
                    }
                })
                setmyDataSlectClient(dataSelectClien)
            })
        }

        useEffect(() => {
            getListClient()
        }, [getAPi.orderStore.sort])




        console.log("load more", isLoadingMore)

        const handleRefresh = React.useCallback(async () => {
            setRefreshing(true);
            try {
                // Gọi API hoặc thực hiện các tác vụ cần thiết để lấy dữ liệu mới
                const newData: any = await getListClient();
                // Cập nhật state của danh sách dữ liệu
                setmyDataSlectClient(newData);
            } catch (error) {
                console.error(error);
            } finally {
                setRefreshing(false);
            }
        }, []);

        const handleLoadMore = () => {
            setIsLoadingMore(true)
            setsize(size + 3)
            getListClient()
            setTimeout(() => {
                setIsLoadingMore(false)
            }, 3000);
        };
        const handelSearch = () => {
            getListClient()
        }

        return (
            <View style={{ flex: 1 }}>
                <Header
                    headerTx="selectClient.selectClient"
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
                        props.navigation.navigate("filterSelectScreen")

                    }}
                    onRightPress1={() => {
                        setisShowSearch(!isShowSearch)
                    }}

                />
                <View style={{ alignItems: 'center', padding: 8 }}>
                    <Text
                        style={{ fontSize: scaleWidth(12), color: colors.palette.dolphin, }}
                        tx="selectClient.selectCustomerForSalesOrder"
                    ></Text>
                </View>
                <View style={{ flex: 1, }}>
                    <FlatList
                        data={myDataSlectClient}
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
                                    onPress={() => { setIndexSelect(index) }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <View style={{ width: 40, height: 40, backgroundColor: '#EFF8FF', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: fontSize.size10, color: '#0078D4' }}>{item.code}</Text>
                                        </View>
                                        <View style={{ marginHorizontal: 6 }}>
                                            <Text style={{ fontSize: fontSize.size10 }}>{item.name}</Text>
                                            <Text style={{ fontSize: fontSize.size10, color: '#747475' }}>{item.phoneNumber}</Text>
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

                    <TouchableOpacity style={{
                        flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 30, position: 'absolute', paddingHorizontal: scaleWidth(18),
                        paddingVertical: scaleHeight(8),
                        backgroundColor: colors.palette.navyBlue,
                        bottom: Platform.OS === 'ios' ? scaleHeight(20) : scaleHeight(5),
                        right: scaleWidth(16)
                    }}
                        onPress={() => {
                            setisVisibleCreateClient(!isVisibleCreateClient)

                        }}
                    >
                        <Images.icon_plus width={scaleWidth(16)} height={scaleHeight(16)} style={{ marginRight: 6, marginTop: 2 }} />
                        <Text style={{ color: 'white', fontSize: fontSize.size14 }} tx='dashboard.client' ></Text>
                    </TouchableOpacity>

                </View>


                <View style={Styles.stylesBtnBottom}>
                    <TouchableOpacity
                        style={[onClick === 'save' ? Styles.btnSuccessfully : Styles.btnSave, { marginRight: 13 }]}
                    // onPress={() => setOnClick('save')}
                    >
                        <Text
                            style={{ color: onClick === 'save' ? colors.palette.white : colors.palette.navyBlue }}
                            tx="common.cancel"
                        >

                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={onClick === 'successfully' ? Styles.btnSuccessfully : Styles.btnSave}
                        onPress={() => setOnClick('successfully')}
                    >
                        <Text
                            style={{ color: onClick === 'successfully' ? colors.palette.white : colors.palette.navyBlue }}
                            tx="selectClient.selected"
                        >
                        </Text>
                    </TouchableOpacity>

                </View>

                <SelectFilterModal
                    isVisible={isVisible}
                    setIsVisible={() => setIsVisible(!isVisible)}
                />
                <ModalCreateClient
                    isVisible={isVisibleCreateClient}
                    setIsVisible={setisVisibleCreateClient}
                    handleRefresh={() => getListClient()}
                />

            </View>
        )
    }
)