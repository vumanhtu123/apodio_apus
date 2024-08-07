import { observer } from "mobx-react-lite";
import {
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import React from "react";
import { Styles } from "./style";
import { Header, Text } from "../../../components";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    View,
} from "react-native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { Svgs } from "../../../../assets/svgs";
import en from "../../../i18n/en";
import Modal_Infor_wareHouse from "./modal/modal_Infor_wareHouse";
import Modal_Plus from "./modal/modal_plus";
import { useRoute } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../navigators";
import { useStores } from "../../models";
import ItemListWareHouse from "./component/item-list-warehouse";
import { ItemTabar } from "./component/item-tabbar-warehouse";
import Images from "../../../../assets/index";
import { translate } from "../../i18n";

export const wareHouseScreen: FC<
    StackScreenProps<NavigatorParamList, "wareHouse">
> = observer(function WareHouseScreen(props) {
    const route = useRoute();
    const reload = route?.params?.reset;

    const [indexTabbar, setIndexTabbar] = useState<string | undefined>(undefined);
    const [openInforWareHouse, setOpneInforWareHouse] = useState(false);
    const [openDialogPlus, setOpenDialogPlus] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [valueSearch, setValueSearch] = useState("");
    const [myData, setMyData] = useState<{}[]>([]);
    const [lengthAll, setLengthAll] = useState<number>();
    const [lengthIsActive, setLengthIsActive] = useState<number>();
    const [lengthSave, setLengthSave] = useState<number>();
    const [isShowSearch, setIsShowSearch] = useState(false);
    const page = useRef(0);
    const totalPages2 = useRef<any>();
    const totalElement = useRef<any>();
    const getAPI = useStores();
    const size = useRef(20);
    const a = useRef(0);
    console.log("re-render", a.current++);

    console.log("value index tabar", indexTabbar);

    const dataListTabar = useMemo(
        () => [
            {
                id: "1",
                img: Images.iconWareBook,
                name: translate("wareHouse.wareBook"),
                onPress: () => {
                    props.navigation.navigate("warehouseBook");
                },
            },
            {
                id: "2",
                img: Images.iconHome,
                name: translate("wareHouse.checkWare"),
                onPress: () => {
                    props.navigation.navigate("inventoryManagement");
                },
            },
            {
                id: "3",
                img: Images.iconImportBook,
                name: translate("wareHouse.importBook"),
                onPress: () => {
                    props.navigation.navigate("importGoodsBook");
                },
            },
            {
                id: "4",
                img: Images.iconOutBook,
                name: translate("wareHouse.outputBook"),
                onPress: () => {
                    props.navigation.navigate("GoodsDeliveryBook");
                },
            },
            {
                id: "5",
                img: Images.iconInBook,
                name: translate("wareHouse.inTem"),
                onPress: () => {
                    Alert.alert("ok 5");
                },
            },
        ],
        []
    );

    const titleTabbar = useMemo(
        () => [
            { name: translate("wareHouse.all"), length: lengthAll, state: undefined },
            {
                name: translate("wareHouse.isActive"),
                length: lengthIsActive,
                state: "APPROVED",
            },
            { name: translate("wareHouse.save"), length: lengthSave, state: "ARCHIVED" },
        ],
        [lengthAll, lengthIsActive, lengthSave]
    );

    const getListWarehouse = async () => {
        console.log("chay lan a", page.current);
        console.log("index trong get list", indexTabbar);

        try {
            const data = await getAPI.warehouseStore.getListWareHouse(
                size.current,
                page.current,
                indexTabbar,
                valueSearch,
                getAPI.warehouseStore.isLoadMoreWarehouse
            );
            if (data?.content != null) {
                const dataWarehouse = data.content;
                if (page.current == 0) {
                    setMyData(dataWarehouse);
                } else {
                    setMyData((item: any) => [...item, ...dataWarehouse]);
                }
                totalElement.current = data?.totalElements;
                totalPages2.current = data?.totalPages;
            }
        } catch (error) {
            console.error("Error loadMore", error);
        }
    };

    const getNumberState = useCallback(async () => {
        try {
            const data = await getAPI.warehouseStore.getNumberState(valueSearch);
            setLengthAll(data?.data.allQty);
            setLengthIsActive(data?.data.approvedQty);
            setLengthSave(data?.data.archiveQty);
        } catch (error) {
            console.error("Error getNumberState", error);
        }
    }, [valueSearch]);

    const handleRefresh = async () => {
        try {
            // getAPI.warehouseStore.setIsLoadMoreWarehouse(false);
            setRefreshing(true);
            // getAPI.warehouseStore.reset
            // Gọi API hoặc thực hiện các tác vụ cần thiết để lấy dữ liệu mới
            page.current = 0;
            await getListWarehouse();
            // Cập nhật state của danh sách dữ liệu
            // setmyDataSlectClient(newData);
        } catch (error) {
            console.error(error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleLoadMore = useCallback(async () => {
        console.log("doan load more");
        console.log(indexTabbar);
        setIsLoadingMore(true);
        getAPI.warehouseStore.setIsLoadMoreWarehouse(true);
        try {
            if (page.current < totalPages2.current - 1) {
                page.current = page.current + 1;
                await getListWarehouse();
            }
        } catch (error) {
            // Handle the error if necessary
        } finally {
            setIsLoadingMore(false);
        }
    }, [indexTabbar]);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener("focus", () => {
            if (reload === true) {
                console.log("---------useEffect---------reload2------------------");
                page.current = 0;
                getListWarehouse();
                getNumberState();
            }
        });

        return unsubscribe;
    }, [props.navigation, reload]);

    useEffect(() => {
        setMyData([]);
        page.current = 0;
        console.log("index thay doi ");

        getListWarehouse();
        getNumberState();
    }, [indexTabbar]);

    return (
        <View style={Styles.main}>
            <Header
                LeftIcon={Svgs.back}
                style={{ height: scaleHeight(52) }}
                leftText="wareHouse.wareHouse"
                RightIcon2={Svgs.icon_search}
                headerInput={isShowSearch}
                handleOnSubmitSearch={() => {
                    page.current = 0;

                    getNumberState();
                    getListWarehouse();
                }}
                onSearchValueChange={(txt: string) => {
                    console.log("value search", txt);
                    setValueSearch(txt);
                }}
                onRightPress2={() => setIsShowSearch(!isShowSearch)}
                btnRightStyle={{
                    width: scaleWidth(30),
                    height: scaleHeight(30),
                    marginRight: -10,
                }}
                onLeftPress={() => {
                    setMyData([]);
                    getAPI.warehouseStore.reset();
                    props.navigation.goBack();
                }}
            />
            <View></View>
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
                        <Svgs.squaresFour />
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
                                    getAPI.warehouseStore.setIsLoadMoreWarehouse(false);

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
                    onEndReached={() => {
                        handleLoadMore();
                    }}
                    // onEndReachedThreshold={0.5}
                    ListFooterComponent={() => {
                        return (
                            <View>
                                {myData.length !== 1 ? (
                                    isLoadingMore ? (
                                        <ActivityIndicator />
                                    ) : null
                                ) : null}
                            </View>
                        );
                    }}
                    initialNumToRender={20}
                    maxToRenderPerBatch={20}
                    windowSize={5}
                />
                <TouchableOpacity
                    style={Styles.btnPlus}
                    onPress={() =>
                        props.navigation.navigate("warehouse", { status: "CREATE" })
                    }>
                    <Svgs.icon_plus style={{ opacity: openDialogPlus ? 0 : 1 }} />
                </TouchableOpacity>

                <Modal_Infor_wareHouse
                    isVisible={openInforWareHouse}
                    setIsVisible={() => setOpneInforWareHouse(!openInforWareHouse)}
                />

                <Modal_Plus
                    // isVisible={openDialogPlus}
                    setIsVisible={() => props.navigation.navigate("warehouse" as never)}
                />
            </View>
        </View>
    );
});
