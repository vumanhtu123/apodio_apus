import { Observer, observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import React, { ActivityIndicator, FlatList, Platform, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Button, Header, Text } from '../../../components';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Images } from '../../../../assets';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../theme';
import { useStores } from '../../../models';
import CategoryModalFilter from '../../product/component/modal-category';
import RenderProductItem from '../../product/renderList/renderItemProduct';
import { CategoryList } from '../../product/renderList/category-list';
import CreateDirectoryModal from '../../product/component/modal-createDirectory';
import EditDirectoryModal from '../../product/component/modal-editDirectory';
import Dialog from '../../../components/dialog/dialog';
import { styles } from './styles';
import RenderOrderItem from '../components/renderOrderItem';
import Modal from 'react-native-modal';

export const AddProductOrder: FC = observer(
    function AddProductOrder() {
        const navigation = useNavigation();
        const [tabTypes, setTabTypes] = useState(["Sản phẩm", "Phân loại"]);
        const [showCategory, setShowCategory] = useState(false);
        const [indexItem, setIndexItem] = useState(0);
        const [page, setPage] = useState(0);
        const [isRefreshing, setIsRefreshing] = useState(false);
        const [selectedCategory, setSelectedCategory] = useState<any>();
        const [isDeleteFailModalVisible, setIsDeleteFailModalVisible] = useState(false);
        const [totalPagesProduct, setTotalPagesProduct] = useState<any>(0);
        const [dataCategoryFilter, setDataCategoryFilter] = useState<any>([]);
        const [dataProduct, setDataProduct] = useState<any>([]);
        const { orderStore, categoryStore, productStore } = useStores();
        const [errorMessage, setErrorMessage] = useState("");
        const [size, setSize] = useState(20);
        const [nameDirectory, setNameDirectory] = useState('')
        const [viewProduct, setViewProduct] = useState(orderStore.viewProductType);
        const [index, setIndex] = useState()
        const { dataProductAddOrder, setDataProductAddOrder, dataProductAddOrderNew, setDataProductAddOrderNew } = orderStore

        useFocusEffect(
            useCallback(() => {
                setIndexItem(orderStore.viewProductType === "VIEW_PRODUCT" ? 0 : 1);
            }, [viewProduct])
        );
        console.log(orderStore.checkPriceList)

        const handleGetCategoryFilter = async () => {
            try {
                const response = await categoryStore.getListCategoriesFilter(
                    0,
                    100,
                );
                if (response && response.kind === "ok") {
                    const data = response.response.data.content
                    const newElement = { name: "Tất cả danh mục" };
                    data.unshift(newElement)
                    setDataCategoryFilter(data);
                } else {
                    console.error("Failed to fetch categories:", response);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        const [searchValue, setSearchValue] = useState("");
        const handleSearchValueChange = (text: string) => {
            const newValue = text !== null ? text.toString() : "";
            setSearchValue(newValue);
        };
        const handleSubmitSearch = () => {
            setPage(0);
            handleGetProduct(searchValue);
        };
        const handleGetProduct = async (searchValue?: any) => {
            var parseSort = "";
            try {
                if (orderStore.sort.length > 0) {
                    parseSort =
                        "?sort=" +
                        orderStore.sort[0] +
                        (orderStore.sort.length > 1 ? "&sort=" + orderStore.sort[1] : "");
                }
                const response: any = await orderStore.getListOrderProduct(
                    page,
                    size,
                    selectedCategory,
                    searchValue,
                    parseSort,
                    orderStore.isLoadMore,
                    undefined,
                );
                // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
                if (response && response.kind === "ok") {
                    setTotalPagesProduct(response.response.data.totalPages)
                    console.log('////////////////', response.response.data.totalPages)
                    if (page === 0) {
                        const newArr = response.response.data.content.map((items: any) => { return { ...items, amount: 0 } })
                        setDataProduct(newArr);
                    } else {
                        setDataProduct((prevProducts: any) => [
                            ...prevProducts,
                            ...response.response.data.content.map((items: any) => { return { ...items, amount: 0 } }),
                        ]);
                    }
                } else {
                    console.error("Failed to fetch product:", response);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        const handleGetVariant = async (searchValue?: any) => {
            var parseSort = "";
            try {
                if (orderStore.sort.length > 0) {
                    parseSort =
                        "?sort=" +
                        orderStore.sort[0] +
                        (orderStore.sort.length > 1 ? "&sort=" + orderStore.sort[1] : "");
                }
                const response: any = await orderStore.getListOrderVariant(
                    page,
                    size,
                    selectedCategory,
                    searchValue,
                    parseSort,
                    orderStore.isLoadMore,
                    undefined,
                    undefined
                );
                // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
                if (response && response.kind === "ok") {
                    setTotalPagesProduct(response.response.data.totalPages)
                    console.log('////////////////', response.response.data.totalPages)
                    if (page === 0) {
                        const newArr = response.response.data.content.map((items: any) => { return { ...items, amount: 0 } })
                        setDataProduct(newArr);
                    } else {
                        setDataProduct((prevProducts: any) => [
                            ...prevProducts,
                            ...response.response.data.content.map((items: any) => { return { ...items, amount: 0 } }),
                        ]);
                    }
                } else {
                    console.error("Failed to fetch product:", response);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        const handleGetProductPrice = async (searchValue?: any) => {
            var parseSort = "";
            try {
                if (orderStore.sort.length > 0) {
                    parseSort =
                        "?sort=" +
                        orderStore.sort[0] +
                        (orderStore.sort.length > 1 ? "&sort=" + orderStore.sort[1] : "");
                }
                const response: any = await orderStore.getListOrderProductPrice(
                    page,
                    size,
                    selectedCategory,
                    searchValue,
                    parseSort,
                    orderStore.isLoadMore,
                    undefined,
                    6203,
                );
                // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
                if (response && response.kind === "ok") {
                    setTotalPagesProduct(response.response.data.totalPages)
                    console.log('////////////////', response.response.data.totalPages)
                    if (page === 0) {
                        const newArr = response.response.data.content.map((items: any) => { return { ...items, amount: 0 } })
                        setDataProduct(newArr);
                    } else {
                        setDataProduct((prevProducts: any) => [
                            ...prevProducts,
                            ...response.response.data.content.map((items: any) => { return { ...items, amount: 0 } }),
                        ]);
                    }
                } else {
                    console.error("Failed to fetch product:", response);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        const handleGetVariantPrice = async (searchValue?: any) => {
            var parseSort = "";
            try {
                if (orderStore.sort.length > 0) {
                    parseSort =
                        "?sort=" +
                        orderStore.sort[0] +
                        (orderStore.sort.length > 1 ? "&sort=" + orderStore.sort[1] : "");
                }
                const response: any = await orderStore.getListOrderVariantPrice(
                    page,
                    size,
                    selectedCategory,
                    searchValue,
                    parseSort,
                    orderStore.isLoadMore,
                    undefined,
                    undefined,
                    6203,
                );
                // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
                if (response && response.kind === "ok") {
                    setTotalPagesProduct(response.response.data.totalPages)
                    console.log('////////////////', response.response.data.totalPages)
                    if (page === 0) {
                        const newArr = response.response.data.content.map((items: any) => { return { ...items, amount: 0 } })
                        setDataProduct(newArr);
                    } else {
                        setDataProduct((prevProducts: any) => [
                            ...prevProducts,
                            ...response.response.data.content.map((items: any) => { return { ...items, amount: 0 } }),
                        ]);
                    }
                } else {
                    console.error("Failed to fetch product:", response);
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        const handlePressViewProduct = (type: any) => {
            viewProductType(type);
            setPage(0)
        };
        const viewProductType = (type: any) => {
            const viewType = type === "Sản phẩm" ? "VIEW_PRODUCT" : "VIEW_VARIANT";
            setViewProduct(viewType);
            orderStore.setViewProductType(viewType)
        };
        const [isGridView, setIsGridView] = useState(orderStore.viewGrid);
        useEffect(() => {
            if (orderStore.checkPriceList === false && orderStore.viewProductType === "VIEW_PRODUCT") {
                handleGetProduct();
            }
            if (orderStore.checkPriceList === false && orderStore.viewProductType === "VIEW_VARIANT") {
                handleGetVariant();
            }
            if (orderStore.checkPriceList === true && orderStore.viewProductType === "VIEW_PRODUCT") {
                handleGetProductPrice();
            }
            if (orderStore.checkPriceList === true && orderStore.viewProductType === "VIEW_VARIANT") {
                handleGetVariantPrice();
            }
            handleGetCategoryFilter();
        }, []);
        useEffect(() => {
            if (orderStore.checkPriceList === false && orderStore.viewProductType === "VIEW_PRODUCT") {
                handleGetProduct();
            }
            if (orderStore.checkPriceList === false && orderStore.viewProductType === "VIEW_VARIANT") {
                handleGetVariant();
            }
            if (orderStore.checkPriceList === true && orderStore.viewProductType === "VIEW_PRODUCT") {
                handleGetProductPrice();
            }
            if (orderStore.checkPriceList === true && orderStore.viewProductType === "VIEW_VARIANT") {
                handleGetVariantPrice();
            }
        }, [viewProduct, selectedCategory]);

        useEffect(() => {
            const unsubscribe = navigation.addListener("focus", () => {
                if (orderStore.checkPriceList === false && orderStore.viewProductType === "VIEW_PRODUCT") {
                    handleGetProduct();
                }
                if (orderStore.checkPriceList === false && orderStore.viewProductType === "VIEW_VARIANT") {
                    handleGetVariant();
                }
                if (orderStore.checkPriceList === true && orderStore.viewProductType === "VIEW_PRODUCT") {
                    handleGetProductPrice();
                }
                if (orderStore.checkPriceList === true && orderStore.viewProductType === "VIEW_VARIANT") {
                    handleGetVariantPrice();
                }
            });
            return unsubscribe;
        }, [navigation, orderStore.sort]);

        const handleEndReached = () => {
            console.log('--------totalPagesProduct---------------', totalPagesProduct, '----', isRefreshing, '-----', page)
            if (!isRefreshing && page <= totalPagesProduct - 1) {
                orderStore.setIsLoadMore(true)
                setPage((prevPage) => prevPage + 1);
            }
        };
        useEffect(() => {
            const fetchMoreProducts = async () => {
                try {
                    if (orderStore.checkPriceList === false && orderStore.viewProductType === "VIEW_PRODUCT") {
                        handleGetProduct(searchValue);
                    }
                    if (orderStore.checkPriceList === false && orderStore.viewProductType === "VIEW_VARIANT") {
                        handleGetVariant(searchValue);
                    }
                    if (orderStore.checkPriceList === true && orderStore.viewProductType === "VIEW_PRODUCT") {
                        handleGetProductPrice(searchValue);
                    }
                    if (orderStore.checkPriceList === true && orderStore.viewProductType === "VIEW_VARIANT") {
                        handleGetVariantPrice(searchValue);
                    }
                } catch (error) {
                    console.error('Error fetching more products:', error);
                } finally {
                    orderStore.setIsLoadMore(false);
                }
            };

            if (orderStore.isLoadMore) {
                fetchMoreProducts();
            }
        }, [page]);
        useEffect(() => {
            if (index == 0) {
                refreshProduct()
            }
        }, [index])
        const refreshProduct = async () => {
            // setIsRefreshing(true);
            setSelectedCategory(undefined);
            setPage(0);
            setSearchValue("");
            setNameDirectory("");
            setDataProduct([]);
            // productStore.setTagId(0);
            orderStore.setSort([]);
            await handleGetProduct();
            // setIsRefreshing(false);
        };
        const renderFooter = () => {
            if (!isRefreshing) return null;
            return (
                <View>
                    <ActivityIndicator size="large" color="#F6961C" />
                </View>
            );
        };
        useEffect(() => {
            orderStore.setViewGrid(isGridView);
        }, [isGridView]);
        const toggleView = () => {
            setIsGridView(!isGridView);
        };
        const handleProductDetail = (idProduct: number) => {
            // productStore.setSelectedProductId(idProduct);
            navigation.navigate("selectVariant" as never);
        };
        const handleClassifyDetail = (idProduct: number) => {
            productStore.setSelectedProductId(idProduct);
            navigation.navigate("classifyDetailScreen" as never);
        };
        const [openSearch, setOpenSearch] = useState(true);

        const flatListRef = useRef(null);
        useEffect(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
            }
        }, [viewProduct])
        return (
            <View style={styles.ROOT}>
                <Header
                    type={"AntDesign"}
                    LeftIcon={Images.back}
                    onLeftPress={() => {
                        navigation.goBack()
                        setDataProductAddOrderNew(dataProductAddOrder.slice())
                        orderStore.setSort([]);
                    }}
                    colorIcon={colors.text}
                    headerTx={'order.order'}
                    RightIcon2={Images.vector}
                    onRightPress={() => navigation.navigate("filterOrderScreen" as never)}
                    onRightPress2={toggleView}
                    RightIcon={Images.slider}
                    headerInput={openSearch}
                    searchValue={searchValue}
                    onSearchValueChange={handleSearchValueChange}
                    handleOnSubmitSearch={handleSubmitSearch}
                    widthRightIcon={20}
                    heightRightIcon={20}
                    style={{ height: scaleHeight(54) }}
                    titleMiddleStyle={styles.titleHeader}
                    searchTx={'order.searchCodeName'}
                />
                <View style={{ flex: 1, backgroundColor: '#f6f7f9', paddingTop: scaleHeight(15) }}>
                    <>
                        <View
                            style={{ justifyContent: "space-between", flexDirection: "row" }}>
                            <View style={styles.rowTabType}>
                                {tabTypes.map((item, index) => {
                                    const isActive = index === indexItem;
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                handlePressViewProduct(item);
                                                setIndexItem(index);
                                            }}
                                            key={index}
                                            style={[
                                                styles.tabButton,
                                                isActive
                                                    ? styles.tabButtonActive
                                                    : styles.tabButtonInactive,
                                            ]}>
                                            <Text
                                                style={[
                                                    styles.tabText,
                                                    isActive
                                                        ? styles.tabTextActive
                                                        : styles.tabTextInactive,
                                                ]}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            <View style={styles.containerFilter}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setShowCategory(true);
                                    }}
                                    style={styles.btnFilterByCategory}>
                                    <Text
                                        tx={nameDirectory === "" ? "productScreen.directory" : null}
                                        numberOfLines={1}
                                        style={styles.textBtnFilter}>
                                        {nameDirectory}
                                    </Text>
                                    <View style={{ marginRight: scaleWidth(8) }}>
                                        <Images.iconDownBlue
                                            width={scaleWidth(14)}
                                            height={scaleHeight(14)}
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CategoryModalFilter
                            showCategory={showCategory}
                            setShowCategory={setShowCategory}
                            dataCategory={dataCategoryFilter}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            setNameDirectory={setNameDirectory}
                            isSearchBarVisible={openSearch}
                            setIndex={setIndex}
                        />
                        <View style={styles.containerProduct}>
                            <FlatList
                                data={dataProduct}
                                showsVerticalScrollIndicator={false}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={isRefreshing}
                                        onRefresh={refreshProduct}
                                        title="ok"
                                    />
                                }
                                keyExtractor={(item) => item.id.toString()}
                                ref={flatListRef}
                                onEndReached={handleEndReached}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={renderFooter}
                                key={isGridView ? "grid" : "list"}
                                numColumns={isGridView ? 3 : 1}
                                columnWrapperStyle={isGridView ? null : null}
                                renderItem={({ item, index }) => (
                                    <RenderOrderItem
                                        item={item}
                                        index={index}
                                        isGridView={isGridView}
                                        viewProduct={orderStore.viewProductType}
                                        handleProductDetail={handleProductDetail}
                                        handleClassifyDetail={handleClassifyDetail}
                                    />
                                )}
                            />
                        </View>
                    </>
                </View>
                {dataProductAddOrderNew.length !== 0 ?
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('newOrder' as never),
                            setDataProductAddOrder(dataProductAddOrderNew.slice())
                        setDataProductAddOrderNew([])
                    }}
                        style={{
                            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderRadius: 8,
                            paddingHorizontal: scaleWidth(16),
                            paddingVertical: scaleHeight(11),
                            marginBottom: scaleHeight(10),
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
                                    <Text style={{ fontSize: fontSize.size9, fontWeight: '500', color: '#ffffff' }}>{dataProductAddOrderNew.length}</Text>
                                </View>
                                <Images.ic_shopping width={scaleWidth(20)} height={scaleHeight(20)} style={{ marginRight: 6, marginTop: 2 }} />
                            </View>
                            <Text style={{ color: 'white', fontSize: fontSize.size14, fontWeight: '600' }}>
                                100000
                            </Text>
                        </View>
                        <View>
                            <Text tx="common.continue" style={{ color: 'white', fontSize: fontSize.size14, fontWeight: '600' }} />
                        </View>
                    </TouchableOpacity> : null}
                <Dialog
                    isVisible={isDeleteFailModalVisible}
                    title={"productScreen.Notification"}
                    errorMessage={errorMessage}
                    titleBTN2="productScreen.BtnNotificationAccept"
                    styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8 }}
                    onPressAccept={() => setIsDeleteFailModalVisible(false)}
                />
            </View>
        );
    })