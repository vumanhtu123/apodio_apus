import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Images } from '../../../../../assets';
import { Button, Text } from '../../../../components';
import { fontSize, scaleHeight, scaleWidth } from '../../../../theme';
import { styles } from '../../styles';
import CategoryModalFilter from '../../component/modal-category';
import RenderProductItem from './renderItemProduct';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useStores } from '../../../../models';

const ProductListComponent = ({ searchValue, onClearSearch, isGridView }: any) => {
    const navigation = useNavigation();
    const [tabTypes, setTabTypes] = useState(["Sản phẩm", "Phân loại"]);
    const [showCategory, setShowCategory] = useState(false);
    const [indexItem, setIndexItem] = useState(0);
    const [page, setPage] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshingCategory, setIsRefreshingCategory] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>();
    const [totalPagesProduct, setTotalPagesProduct] = useState<any>(0);
    const [totalElementsProduct, setTotalElementsProduct] = useState<any>(0);
    const [dataCategoryFilter, setDataCategoryFilter] = useState<any>([]);
    const [dataProduct, setDataProduct] = useState<any>([]);
    const { categoryStore, productStore } = useStores();
    const [size, setSize] = useState(20);
    const [nameDirectory, setNameDirectory] = useState("");
    const [viewProduct, setViewProduct] = useState(productStore.viewProductType);
    const [index, setIndex] = useState<any>();
    const [valueSearchCategory, setValueSearchCategory] = useState("");
    const isFirstRender = useRef(true);

    useFocusEffect(
        useCallback(() => {
            setIndexItem(productStore.viewProductType === "VIEW_PRODUCT" ? 0 : 1);
        }, [productStore.viewProductType])
    );
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            if (productStore.reloadProductScreen === true) {
                handleGetProduct().then(() => {
                    productStore.setReloadProductScreen(false);
                });
            }
        });
        return unsubscribe;
    }, [navigation]);
    const handleGetCategoryFilter = async () => {
        try {
            const response = await categoryStore.getListCategoriesFilter(
                0,
                100,
                valueSearchCategory
            );
            if (response && response.kind === "ok") {
                const data = response.response.data.content;
                const newElement = { name: "Tất cả danh mục" };
                data.unshift(newElement);
                setDataCategoryFilter(data);
            } else {
                console.error("Failed to fetch categories:", response);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };
    const handleSubmitSearch = async () => {
        setIsLoading(true)
        setPage(0);
        setDataProduct([]);
        await handleGetProduct(searchValue);
        setIsLoading(false)
    };
    useEffect(() => {
        if (!isFirstRender.current) {
            console.log('--------------useEffect--------searchValue---------')
            handleSubmitSearch()
        }

    }, [searchValue])

    const handleGetProduct = async (searchValue?: any) => {
        var parseSort = "";
        try {
            if (productStore.sort.length > 0) {
                parseSort =
                    "?sort=" +
                    productStore.sort[0] +
                    (productStore.sort.length > 1 ? "&sort=" + productStore.sort[1] : "");
            }
            // console.log('mmmmmmmzzz', page)
            const response: any = await productStore.getListProduct(
                page,
                size,
                productStore.viewProductType,
                selectedCategory,
                searchValue,
                productStore.tagId,
                parseSort,
                productStore.isLoadMore
            );
            if (response && response.kind === "ok") {
                setTotalPagesProduct(response.response.data.totalPages)
                setTotalElementsProduct(response.response.data.totalElements)
                if (page === 0) {
                    setDataProduct(response.response.data.content);
                } else {
                    setDataProduct((prevProducts: any) => [
                        ...prevProducts,
                        ...response.response.data.content,
                    ]);
                }
                productStore.setIsLoadMore(false);
            } else {
                console.error(
                    "Failed to fetch product:",
                    response.response.errorCodes[0].message
                );
            }
        } catch (error) {
            console.error("Error fetching product:", error);
        }
    };
    const handlePressViewProduct = (type: any) => {
        viewProductType(type);
        setPage(0);
    };
    const viewProductType = useCallback(async (type: any) => {
        const viewType = type === "Sản phẩm" ? "VIEW_PRODUCT" : "VIEW_VARIANT";
        setViewProduct(viewType);
        productStore.setViewProductType(viewType);
        setDataProduct([]);
        await handleGetProduct(searchValue);
    }, [dataProduct]);
    const getValueSearchCategoryFilter = (value: any) => {
        // console.log('first------------', value)
        setValueSearchCategory(value);
    };
    useEffect(() => {
        handleGetCategoryFilter();
    }, [valueSearchCategory]);

    useEffect(() => {
        //if (!isFirstRender.current) {
            console.log('--------------useEffect--------selectedCategory---------')
            const fetchData = async () => {
                setPage(0);
                setDataProduct([]);
                await handleGetProduct(searchValue);
            };
            fetchData();
        //}

    }, [selectedCategory]);

    useEffect(() => {
        if (!isFirstRender.current) {
            console.log('--------------useEffect--------page---------')
            if (!isRefreshing) {
                handleGetProduct(searchValue); // Load more
            }
        }

    }, [page]);
    const handleEndReached = () => {
        if (!isRefreshing && page <= totalPagesProduct - 1 && !isLoading) {
            productStore.setIsLoadMore(true);
            setPage((prevPage) => prevPage + 1);
        }
    };
    useEffect(() => {
        if (index == 0) {
            refreshProduct();
        }
    }, [index]);
    const refreshProduct = useCallback(async () => {
        productStore.setIsLoadMore(true)
        setIsRefreshing(true);
        setDataProduct([]);
        setSelectedCategory(undefined);
        setPage(0);
        onClearSearch();
        setOpenSearch(false);
        setNameDirectory("");
        productStore.setTagId(0);
        productStore.setSort([]);
        await handleGetProduct();
        setIsRefreshing(false);
    }, [onClearSearch, handleGetProduct]);
    const refreshCategoryFilter = async () => {
        setIsRefreshingCategory(true);
        setDataCategoryFilter([]);
        setValueSearchCategory("");
        await handleGetCategoryFilter();
        setIsRefreshingCategory(false);
    };
    const renderFooter = () => {
        if (isRefreshing || page >= totalPagesProduct - 1 || dataProduct.length < 1) return null;
        return (
            <View>
                <ActivityIndicator size="large" color="#F6961C" />
            </View>
        );
    };

    useEffect(() => {
        productStore.setViewGrid(isGridView);
    }, [isGridView]);
    // const toggleView = () => {
    //     setIsGridView(!isGridView);
    // };
    const handleProductDetail = (idProduct: number, hasVariant: boolean) => {
        productStore.setSelectedProductId(idProduct);
        navigation.navigate({ name: "productDetailScreen", params: { hasVariant: hasVariant } } as never);
    };
    const handleClassifyDetail = (idProduct: number, hasVariant: boolean) => {
        productStore.setSelectedProductId(idProduct);
        navigation.navigate({ name: "classifyDetailScreen", params: { hasVariant: hasVariant } } as never);
    };
    const [openSearch, setOpenSearch] = useState(false);
    const flatListRef = useRef<FlatList>(null);
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
    }, [viewProduct]);


    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
    }, []);

    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate("ProductCreateScreen" as never)}
                style={styles.btnCreateProduct}>
                <Images.ic_addProduct
                    width={scaleWidth(50)}
                    height={scaleHeight(50)}
                />
            </TouchableOpacity>
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
                    <Button
                        onPress={() =>
                            navigation.navigate({ name: "filterScreen", params: { activeTab: "product" } } as never)
                        }
                        style={{ backgroundColor: "none", width: scaleWidth(30), height: scaleHeight(30) }}>
                        <Images.slider_black
                            width={scaleWidth(16)}
                            height={scaleHeight(16)}
                        />
                    </Button>
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
                onSearchChange={getValueSearchCategoryFilter}
                isRefreshing={isRefreshingCategory}
                onRefresh={refreshCategoryFilter}
            />
            <View style={{ alignItems: 'flex-end', paddingHorizontal: scaleWidth(16) }}>
                <Text style={{ fontSize: fontSize.size12 }}>Tổng số sản phẩm: {Math.min(size * (page + 1), totalElementsProduct)}/{totalElementsProduct}</Text>
            </View>
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
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.5}
                    key={isGridView ? "grid" : "list"}
                    numColumns={isGridView ? 3 : 1}
                    columnWrapperStyle={isGridView ? null : null}
                    renderItem={({ item, index }) => (
                        <RenderProductItem
                            item={item}
                            index={index}
                            isGridView={isGridView}
                            viewProduct={viewProduct}
                            handleProductDetail={handleProductDetail}
                            handleClassifyDetail={handleClassifyDetail}
                        />
                    )}
                />
            </View>
        </>
    );
};
export const ProductList = ProductListComponent