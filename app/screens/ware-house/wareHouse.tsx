import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";

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
import { id } from "date-fns/locale";
import en from "../../i18n/en";
import { Style } from "../check-inventory/add-check-inventory/add-check-inventory";
import Modal_Infor_wareHouse from "./modal/modal_Infor_wareHouse";
import Modal_Plus from "./modal/modal_plus";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../navigators";
import { useStores } from "../../models";
import { number } from "mobx-state-tree/dist/internal";

export const wareHouseScreen: FC<StackScreenProps<NavigatorParamList, 'wareHouse'>> = observer(
    function WareHouseScreen(props) {
        const route = useRoute();
        const reload = route?.params?.reset;
        console.log('doandev value', reload);


        const [indexTabbar, setIndexTabbar] = useState(en.wareHouse.all)
        const [openInforWareHouse, setOpneInforWareHouse] = useState(false)
        const [openDialogPlus, setOpenDialogPlus] = useState(false)
        const [refreshing, setRefreshing] = useState(false);
        const [isLoadingMore, setIsLoadingMore] = useState(false);
        const [valueSearch, setValueSearch] = useState("");
        const [myData, setMyData] = useState([]);
        const [lengthAll, setLengthAll] = useState<number>()
        const [lengthIsActive, setLengthIsActive] = useState<number>()
        const [lengthSave, setLengthSave] = useState<number>()
        const [isShowSearch, setIsShowSearch] = useState(false)
        const page = useRef(0)
        const totalPages2 = useRef<any>()
        const getAPI = useStores()
        const size = useRef(10);



        console.log('====================================');
        console.log("value search", valueSearch);
        console.log('====================================');

        const dataListTabar = [
            {
                id: "1",
                img: require("../../../assets/Images/ic_WareBook.png"),
                name: en.wareHouse.wareBook,
                onPress: () => {
                    //   Alert.alert('ok 1')
                    props.navigation.navigate("warehouseBook");
                },
            },
            {
                id: "2",
                img: require("../../../assets/Images/ic_Home.png"),
                name: en.wareHouse.checkWare,
                onPress: () => {
                    // Alert.alert('ok 2')

                    props.navigation.navigate("inventoryManagenment");
                },
            },
            {
                id: "3",
                img: require("../../../assets/Images/ic_importBook.png"),
                name: en.wareHouse.importBook,
                onPress: () => {
                    //   Alert.alert('ok 3')
                    props.navigation.navigate("importGoodsBook");
                },
            },
            {
                id: "4",
                img: require("../../../assets/Images/ic_outputBook.png"),
                name: en.wareHouse.outputBook,
                onPress: () => {
                    //   Alert.alert('ok 4')
                    props.navigation.navigate("GoodsDeliveryBook");
                },
            },
            {
                id: "5",
                img: require("../../../assets/Images/in_In.png"),
                name: en.wareHouse.inTem,
                onPress: () => {
                    Alert.alert("ok 5");
                    // props.navigation.navigate('inventoryManagenment')
                },
            },
        ];


        const statusLoadMore = getAPI.warehouseStore.isLoadMoreWarehouse;

        const checkState = () => {
            if (indexTabbar == en.wareHouse.all) {
                console.log('tab select all');
                // setMyData([])
                return undefined

            } else if (indexTabbar == en.wareHouse.isActive) {
                console.log('tab select isActive');
                // setMyData([])

                return 'APPROVED'
            } else {
                console.log('tab select save');
                // setMyData([])

                return 'ARCHIVED'
            }
        }
        console.log('====================================');
        console.log('value state', checkState());
        console.log('====================================');

        const getListWarehouse = () => {
            console.log("chay lan: 1");

            try {

                getAPI.warehouseStore.getListWareHouse(size.current, page.current, undefined, 'H', statusLoadMore).then((data) => {
                    console.log('data doan', data);
                    if (data?.content != null) {
                        // setMyData([])
                        const dataWarehouse = data?.content.map((item) => {
                            return {
                                id: item.id,
                                code: item.code,
                                name: item.name,
                                state: item.state,
                            };

                        });
                        // console.log('dataWarehouse', dataWarehouse);

                        if (myData?.length <= data?.totalElements) {

                            // setMyData({
                            // (prevProducts) => {
                            // console.log('doan123', prevProducts);

                            // // Tạo một tập hợp các id đã xuất hiện trong prevProducts
                            // const idsInPrevProducts = new Set(prevProducts.map(product => product.id));

                            // // Lọc dataWarehouse để chỉ giữ lại các đối tượng có id chưa xuất hiện trong prevProducts
                            // const filteredDataWarehouse = dataWarehouse.filter(item => !idsInPrevProducts.has(item.id));

                            // Nối hai mảng lại với nhau

                            // console.log('dataMap1', dataWarehouse);

                            // return [
                            //     ...prevProducts,
                            //     ...filteredDataWarehouse
                            // ];


                            // });
                            setMyData(item => [...item, ...dataWarehouse])
                        }



                        const lengthIsActiveData = data?.content.filter(item => item.state === 'APPROVED').length
                        const lengthSaveData = data?.content.filter(item => item.state === 'ARCHIVED').length
                        const totalElementsData = data?.totalElements
                        const totalPages = data?.totalPages

                        console.log('dang hoat dong', lengthIsActive);
                        console.log('dung hoat dong', lengthSave);
                        console.log('totalPages', totalPages);
                        console.log("totalElement", totalElementsData);


                        setLengthAll(totalElementsData)
                        setLengthIsActive(lengthIsActiveData)
                        setLengthSave(lengthSaveData)

                        console.log('value All', lengthAll);


                        totalPages2.current = (totalPages)

                    }

                });
            } catch (error) {
                console.log('====================================');
                console.log('Error loadMore', error);
                console.log('====================================');
            }


        }

        const titleTabbar = [
            {
                name: en.wareHouse.all,
                length: lengthAll,
            },
            {
                name: en.wareHouse.isActive,
                length: lengthIsActive,
            },
            {
                name: en.wareHouse.save,
                length: lengthSave,
            },
        ];

        console.log('lengthALL', lengthAll);

        console.log('doandev size', myData.length);



        const handleRefresh = () => {
            try {
                setRefreshing(true);
                // Gọi API hoặc thực hiện các tác vụ cần thiết để lấy dữ liệu mới
                getListWarehouse();
                // Cập nhật state của danh sách dữ liệu
                // setmyDataSlectClient(newData);
            } catch (error) {
                console.error(error);
            } finally {
                setRefreshing(false);
            }
        };

        const handleLoadMore = () => {
            console.log('pageCurrent1');
            try {
                setIsLoadingMore(true)
                // getAPI.warehouseStore.setIsLoadMoreWarehouse(true);
                console.log('pageCurrent2');

                if (
                    page.current < totalPages2.current - 1

                ) {
                    console.log('pageCurrent3');

                    // console.log("value loading", isLoadingMore);
                    page.current = page.current + 1;
                    console.log('pageCurrent4');

                    console.log('pageDoan', page.current);
                    getListWarehouse();
                    console.log('pageCurrent5');

                    setIsLoadingMore(false);
                    console.log('pageCurrent6');

                }
                // setIsLoadingMore(false);
                console.log('pageCurrent7');


            } catch (error) {
                console.log('====================================');
                console.log('Error loadMore', error);
                console.log('pageCurrent8');

                console.log('====================================');
            }


        };

        useEffect(() => {
            console.log("---------useEffect---------reload------------------");
            const unsubscribe = props.navigation.addListener("focus", () => {
                if (reload === true) {
                    console.log("---------useEffect---------reload2------------------");
                    // page.current = 0
                    getListWarehouse()
                }
            });

            return unsubscribe;
        }, [props.navigation, reload]);

        // useEffect(() => {
        //     getListWarehouse()
        // }, []);

        useEffect(() => {
            getListWarehouse()
        }, [indexTabbar]);

        console.log('====================================');
        console.log('check doan', props.navigation);
        console.log('====================================');
        // console.log('====================================');
        // console.log(dataListTabar[0].img);
        // console.log('====================================');
        interface ItemList {
            id: number;
            code: string;
            name: string;
            state: string;
            onClick: () => void;
        }

        const ItemListWareHouse: React.FC<{ item: ItemList, index: any }> = ({ item, index }) => {

            return (
                <TouchableOpacity style={Styles.itemList}
                    key={index}
                    onPress={() => {
                        // setIdWarehouse(item.id)
                        console.log('id select', item.id);

                        props.navigation.navigate({ name: 'detailWarehouse', params: { id: item.id, state: item.state } } as never)
                    }}
                >
                    <Images.ic_Brick
                        style={{
                            width: scaleWidth(40),
                            height: scaleWidth(40),
                            borderRadius: scaleHeight(8),
                            marginRight: scaleWidth(6)
                        }}
                    />
                    <View style={[Styles.flexRow, { flex: 2, alignItems: 'center', }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={Styles.txtItemWareHouse}>{item.code}</Text>
                            <Text style={{ fontSize: scaleWidth(10), fontWeight: '500' }}>{item?.name}</Text>

                        </View>

                        <View>
                            <Text
                                style={{
                                    fontSize: scaleWidth(8),
                                    fontWeight: "400",
                                    color: item?.state === "APPROVED" ? colors.navyBlue : "#9EA6B3",
                                }}>
                                {item?.state === "APPROVED"
                                    ? en.wareHouse.isActive
                                    : en.wareHouse.save}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        };

        interface Item {
            id: any;
            img: any;
            name: string;
            onPress: () => void;
        }
        const ItemTabar = ({ item }: { item: Item }) => {
            return (
                <TouchableOpacity
                    style={Styles.bodyItemTabar}
                    onPress={() => {
                        // console.log('====================================');
                        // console.log('doann');
                        // console.log('====================================');
                        item.onPress();
                    }}>
                    <View style={{ alignItems: "center", }}>
                        <Image
                            source={item.img}
                            style={{ width: scaleWidth(16), height: scaleHeight(16) }}
                        />
                        <Text
                            style={{
                                marginTop: scaleHeight(7),
                                fontSize: scaleWidth(10),
                                textAlign: "center",
                            }}>
                            {item.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        };

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
                                        indexTabbar === item.name
                                            ? Styles.styleItemTabarIsclick
                                            : Styles.styleItemTabar
                                    }
                                    key={item.name}
                                    onPress={() => {
                                        console.log("type tabbar", item.name);
                                        setIndexTabbar(item?.name);

                                    }}>
                                    <Text
                                        style={{
                                            color:
                                                indexTabbar === item.name
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
                        style={{}}
                        data={myData}
                        renderItem={({ item, index }) => <ItemListWareHouse item={item} index={index} />}
                        keyExtractor={(item: any, index) => item?.toString() + index}
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                        }
                        onEndReached={() => {
                            handleLoadMore()
                            // console.log('pageCurrent', page.current)
                        }}

                        onEndReachedThreshold={0.3}
                        ListFooterComponent={() => (
                            <View>

                                {/* <>{isLoadingMore ? <ActivityIndicator /> : <></>}</> */}

                            </View>
                        )}
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
            </View>
        );
    });
