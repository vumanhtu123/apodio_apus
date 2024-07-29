import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

import React from "react";
import { Styles } from "./style";
import { Header, Text } from "../../components";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    RefreshControl,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { Images } from "../../../assets";
import { styles } from "../account_security/styles";
import { da, id } from "date-fns/locale";
import en from "../../i18n/en";
import { Style } from "../check-inventory/add-check-inventory/add-check-inventory";
import Modal_Infor_wareHouse from "./modal/modal_Infor_wareHouse";
import Modal_Plus from "./modal/modal_plus";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../navigators";
import { useStores } from "../../models";
import { number } from "mobx-state-tree/dist/internal";
import ItemListWareHouse from "./component/item-list-warehouse";
import { ItemTabar } from "./component/item-tabbar-warehouse";

export const wareHouseScreen: FC<StackScreenProps<NavigatorParamList, 'wareHouse'>> = observer(
    function WareHouseScreen(props) {
        const route = useRoute();
        const reload = route?.params?.reset;
        // console.log('doandev value', reload);


        const [indexTabbar, setIndexTabbar] = useState<string | undefined>(undefined)
        const [openInforWareHouse, setOpneInforWareHouse] = useState(false)
        const [openDialogPlus, setOpenDialogPlus] = useState(false)
        const [refreshing, setRefreshing] = useState(false);
        const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
        const [valueSearch, setValueSearch] = useState("");
        const [myData, setMyData] = useState<{}[]>([]);
        const [lengthAll, setLengthAll] = useState<number>()
        const [lengthIsActive, setLengthIsActive] = useState<number>()
        const [lengthSave, setLengthSave] = useState<number>()
        const [isShowSearch, setIsShowSearch] = useState(false)
        const page = useRef(0)
        const totalPages2 = useRef<any>()
        const totalElement = useRef<any>()
        const getAPI = useStores()
        const size = useRef(13);
        const statusLoadMore = getAPI.warehouseStore.isLoadMoreWarehouse;
        console.log('value load more', isLoadingMore);


        const dataListTabar = useMemo(() => [
            {
                id: "1",
                img: require("../../../assets/Images/ic_WareBook.png"),
                name: en.wareHouse.wareBook,
                onPress: () => {
                    props.navigation.navigate("warehouseBook");
                },
            },
            {
                id: "2",
                img: require("../../../assets/Images/ic_Home.png"),
                name: en.wareHouse.checkWare,
                onPress: () => {
                    props.navigation.navigate("inventoryManagenment");
                },
            },
            {
                id: "3",
                img: require("../../../assets/Images/ic_importBook.png"),
                name: en.wareHouse.importBook,
                onPress: () => {
                    props.navigation.navigate("importGoodsBook");
                },
            },
            {
                id: "4",
                img: require("../../../assets/Images/ic_outputBook.png"),
                name: en.wareHouse.outputBook,
                onPress: () => {
                    props.navigation.navigate("GoodsDeliveryBook");
                },
            },
            {
                id: "5",
                img: require("../../../assets/Images/in_In.png"),
                name: en.wareHouse.inTem,
                onPress: () => {
                    Alert.alert("ok 5");
                },
            },
        ], []);

        const titleTabbar = useMemo(() => [
            { name: en.wareHouse.all, length: lengthAll, state: undefined },
            { name: en.wareHouse.isActive, length: lengthIsActive, state: 'APPROVED' },
            { name: en.wareHouse.save, length: lengthSave, state: 'ARCHIVED' }
        ], [lengthAll, lengthIsActive, lengthSave]);
        //     {
        //         name: en.wareHouse.all,
        //         length: lengthAll,
        //     },
        //     {
        //         name: en.wareHouse.isActive,
        //         length: lengthIsActive,
        //     },
        //     {
        //         name: en.wareHouse.save,
        //         length: lengthSave,
        //     },
        // ];


        const getListWarehouse = useCallback(async () => {
            console.log("chay lan", page.current);
            try {
                const data = await getAPI.warehouseStore.getListWareHouse(size.current, page.current, indexTabbar, valueSearch, statusLoadMore);
                if (data?.content != null) {
                    const dataWarehouse = data.content
                    if (page.current == 0) {
                        setMyData(dataWarehouse)
                    } else {
                        setMyData((item: any) => [...item, ...dataWarehouse])
                    }
                    totalElement.current = data?.totalElements
                    totalPages2.current = data?.totalPages
                }
            } catch (error) {
                console.error('Error loadMore', error);
            }
        }, [getAPI, size, page, valueSearch, statusLoadMore, indexTabbar]);



        const getNumberState = useCallback(async () => {
            try {
                const data = await getAPI.warehouseStore.getNumberState(valueSearch);
                setLengthAll(data?.data.allQty)
                setLengthIsActive(data?.data.approvedQty)
                setLengthSave(data?.data.archiveQty)
            } catch (error) {
                console.error('Error getNumberState', error);
            }
        }, [getAPI, valueSearch]);


        const handleRefresh = async () => {
            try {
                // getAPI.warehouseStore.setIsLoadMoreWarehouse(false);

                setRefreshing(true);
                // getAPI.warehouseStore.reset
                // Gọi API hoặc thực hiện các tác vụ cần thiết để lấy dữ liệu mới
                page.current = 0
                await getListWarehouse();
                // Cập nhật state của danh sách dữ liệu
                // setmyDataSlectClient(newData);
            } catch (error) {
                console.error(error);
            } finally {
                setRefreshing(false);
            }
        };


        const handleLoadMore = async () => {
            console.log('doan load more');
            setIsLoadingMore(true)


            console.log('pageCurrent1', page.current);
            console.log('totalPageData', totalPages2.current);
            console.log('value loadMore', isLoadingMore);
            try {

                if (
                    page.current < totalPages2.current - 1
                ) {

                    console.log("page so lan", page.current);
                    page.current = page.current + 1;
                    console.log('pageDoan', page.current);
                    await getListWarehouse();

                    // setIsLoadingMore(false);
                    console.log('is value loadMore');

                }

            } catch (error) {
                console.log('====================================');
                console.log('Error loadMore', error);
                console.log('====================================');
            } finally {
                setIsLoadingMore(false)
            }
        };
        console.log('====================================');
        console.log('value doan', isLoadingMore);
        console.log('====================================');


        useEffect(() => {
            console.log("---------useEffect---------reload------------------");
            const unsubscribe = props.navigation.addListener("focus", () => {
                if (reload === true) {
                    console.log("---------useEffect---------reload2------------------");
                    page.current = 0
                    getListWarehouse()
                    getNumberState()
                }
            });

            return unsubscribe;
        }, [props.navigation, reload]);

        useEffect(() => {
            page.current = 0

            getListWarehouse()
            getNumberState()
        }, [indexTabbar]);

        return (
            <View
                style={Styles.main}
            >
                <Header
                    LeftIcon={Images.back}
                    style={{ height: scaleHeight(52) }}
                    leftText="wareHouse.wareHouse"
                    RightIcon2={Images.icon_search}
                    headerInput={isShowSearch}
                    handleOnSubmitSearch={() => {
                        page.current = 0

                        getNumberState()
                        getListWarehouse();
                    }}
                    onSearchValueChange={(txt: string) => {
                        console.log('value search', txt);
                        setValueSearch(txt)
                    }}
                    onRightPress2={() => setIsShowSearch(!isShowSearch)}
                    btnRightStyle={{ width: scaleWidth(30), height: scaleHeight(30), marginRight: -10, }}
                    onLeftPress={() => {
                        setMyData([])
                        props.navigation.goBack()
                    }}
                />
                <View>

                </View>
                <View style={Styles.body}>
                    <FlatList
                        data={dataListTabar}
                        renderItem={({ item }) => <ItemTabar item={item} />}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}

                    />
                </View>

                <View style={Styles.bodyContainer}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: scaleHeight(12),
                        }}>
                        <View style={{ marginRight: scaleWidth(8) }}>
                            <Images.squaresFour />
                        </View>
                        {titleTabbar.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={
                                        indexTabbar === item.state
                                            ? Styles.styleItemTabarIsclick
                                            : Styles.styleItemTabar
                                    }
                                    key={item.name}
                                    onPress={() => {
                                        console.log("type tabbar", item.name);
                                        setIndexTabbar(item?.state);
                                    }}>
                                    <Text
                                        style={{
                                            color:
                                                indexTabbar === item.state
                                                    ? colors.palette.navyBlue
                                                    : colors.palette.dolphin,
                                            fontSize: fontSize.size10,
                                        }}>
                                        {item?.name} ({item?.length})
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <FlatList
                        style={{ paddingBottom: 50 }}
                        data={myData}
                        renderItem={({ item, index }) => <ItemListWareHouse item={item} />}
                        keyExtractor={(item: any, index) => item?.id.toString() + index}
                        showsVerticalScrollIndicator={false}

                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                        }
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={() => {
                            return (

                                <View>
                                    {
                                        myData.length !== 1
                                            ? isLoadingMore
                                                ? <ActivityIndicator />
                                                : null
                                            : null
                                    }
                                </View>
                            );
                        }}
                        initialNumToRender={13}
                        maxToRenderPerBatch={13}
                        windowSize={5}
                    />
                    <TouchableOpacity
                        style={Styles.btnPlus}
                        onPress={() => props.navigation.navigate("warehouse", { status: "CREATE" })}>
                        <Images.icon_plus style={{ opacity: openDialogPlus ? 0 : 1 }} />
                    </TouchableOpacity>

                    <Modal_Infor_wareHouse
                        isVisible={openInforWareHouse}
                        setIsVisible={() => setOpneInforWareHouse(!openInforWareHouse)}
                    />

                    <Modal_Plus
                        // isVisible={openDialogPlus}
                        setIsVisible={() => navigation.navigate("warehouse" as never)}
                    />
                </View>
            </View >
        );
    });
