import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Images } from '../../../../assets';
import { Button, Text } from '../../../components';
import { scaleHeight, scaleWidth } from '../../../theme';
import { styles } from '../styles';
import CategoryModalFilter from '../component/modal-category';
import RenderProductItem from './renderItemProduct';


interface ProductListProps {
    navigation: any;
    tabTypes: string[];
    indexItem: number;
    handlePressViewProduct: (item: string) => void;
    setIndexItem: (index: number) => void;
    setShowCategory: (show: boolean) => void;
    showCategory: boolean;
    dataCategoryFilter: any[];
    selectedCategory: any;
    setSelectedCategory: (category: any) => void;
    setNameDirectory: (name: string) => void;
    openSearch: boolean;
    setIndex: (index: number) => void;
    dataProduct: any[];
    isRefreshing: boolean;
    refreshProduct: () => void;
    flatListRef: any;
    handleEndReached: () => void;
    isGridView: boolean;
    viewProduct: string;
    handleProductDetail: (item: any) => void;
    handleClassifyDetail: (item: any) => void;
    nameDirectory: string;
    isLoadingMore: boolean;
    renderFooter: any;
}

export const ProductList: React.FC<ProductListProps> = ({
    navigation,
    tabTypes,
    indexItem,
    handlePressViewProduct,
    setIndexItem,
    setShowCategory,
    showCategory,
    dataCategoryFilter,
    selectedCategory,
    setSelectedCategory,
    setNameDirectory,
    openSearch,
    setIndex,
    dataProduct,
    isRefreshing,
    refreshProduct,
    flatListRef,
    handleEndReached,
    isGridView,
    viewProduct,
    handleProductDetail,
    handleClassifyDetail,
    nameDirectory,
    isLoadingMore,
    renderFooter
}) => {
    const Loading = () => (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate("ProductCreateScreen")}
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
                            navigation.navigate("filterScreen", { activeTab: "product" })
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
                    ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.5}
                    key={isGridView ? "grid" : "list"}
                    numColumns={isGridView ? 3 : 1}
                    columnWrapperStyle={isGridView ? null : null}
                    // ListEmptyComponent={isRefreshing ? <Loading/> : null}
                    renderItem={({ item, index }) => (
                        <RenderProductItem
                            item={item}
                            index={index}
                            isGridView={isGridView}
                            viewProduct={viewProduct}
                            handleProductDetail={handleProductDetail}
                            handleClassifyDetail={handleClassifyDetail}
                        />
                        // <View></View>
                    )}
                />
            </View>
        </>
    );
};
