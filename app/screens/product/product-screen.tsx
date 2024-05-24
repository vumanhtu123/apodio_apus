import {
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { Images } from "../../../assets/index";
import { Button } from "../../components";
import Dialog from "../../components/dialog/dialog";
import { Header } from "../../components/header/header";
import { Text } from "../../components/text/text";
import { useStores } from "../../models";
import { colors, scaleHeight, scaleWidth } from "../../theme";
import CategoryModalFilter from "./component/modal-category";
import CreateDirectoryModal from "./component/modal-createDirectory";
import EditDirectoryModal from "./component/modal-editDirectory";
import { products } from "./data";
import { CategoryList } from "./renderList/category-list";
import RenderProductItem from "./renderList/renderItemProduct";
import { styles } from "./styles";

export const ProductScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // const reload = route?.params?.reload
  const [tabTypes, setTabTypes] = useState(["Sản phẩm", "Phân loại"]);
  const [btnTab, setBtnTab] = useState(["Sản phẩm", "Danh mục"]);
  const [showCategory, setShowCategory] = useState(false);
  const [indexItem, setIndexItem] = useState(0);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRefreshingCategory, setIsRefreshingCategory] = useState(false);
  const [isDirectoryModalVisible, setIsDirectoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [selectedEditCategory, setSelectedEditCategory] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [sortedProducts, setSortedProducts] = useState(products);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteFailModalVisible, setIsDeleteFailModalVisible] =
    useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>();
  const [totalPages, setTotalPages] = useState<any>(1);
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [dataProduct, setDataProduct] = useState<any>([]);
  const { categoryStore, productStore } = useStores();
  const [errorMessage, setErrorMessage] = useState("");
  const [size, setSize] = useState(20);
  const [pageCategories, setPageCategories] = useState(0);
  const [nameDirectory, setNameDirectory] = useState('')
  const [viewProduct, setViewProduct] = useState(productStore.viewProductType);
  const handlePressViewProduct = (type: any) => {
    viewProductType(type);
  };
  const viewProductType = (type: any) => {
    const viewType = type === "Sản phẩm" ? "VIEW_PRODUCT" : "VIEW_VARIANT";
    setViewProduct(viewType);
    productStore.setViewProductType(viewType)
  };
  useFocusEffect(
    useCallback(() => {
      // setViewProduct(productStore.viewProductType);
      setIndexItem(productStore.viewProductType === "VIEW_PRODUCT" ? 0 : 1);
    }, [viewProduct])
  );
  const [searchCategory, setSearchCategory] = useState("");
  const handleSearchCategoryChange = (text: string) => {
    const newValue = text !== null ? text.toString() : "";
    setSearchCategory(newValue);
  };
  const handleSubmitSearchCategory = () => {
    // const processedText = searchValue.trim().toLowerCase();
    setPageCategories(0);
    setDataCategory([]);
    handleGetCategory(searchCategory);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (productStore.reloadProductScreen === true) {
        handleGetProduct();
      }
    });
    return unsubscribe;
  }, [navigation]);
  const handleGetCategory = async (searchCategory?: any) => {
    var parseSortCategory = "";
    try {
      if (productStore.sortCategory.length > 0) {
        parseSortCategory =
          "?sort=" +
          productStore.sortCategory[0] +
          (productStore.sortCategory.length > 1
            ? "&sort=" + productStore.sortCategory[1]
            : "");
        console.log("checkCategory", parseSortCategory);
      }
      const response = await categoryStore.getListCategories(
        pageCategories,
        20,
        searchCategory,
        parseSortCategory
      );
      if (response && response.kind === "ok") {
        // console.log('response', response.response.data.content)
        if (pageCategories == 0) {
          setTotalPages(response.response.data.totalPages);
          setDataCategory(response.response.data.content);
        } else {
          setDataCategory((prevProducts: any) => [
            ...prevProducts,
            ...response.response.data.content,
          ]);
        }
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
      if (productStore.sort.length > 0) {
        parseSort =
          "?sort=" +
          productStore.sort[0] +
          (productStore.sort.length > 1 ? "&sort=" + productStore.sort[1] : "");
      }
      const response: any = await productStore.getListProduct(
        page,
        size,
        viewProduct,
        selectedCategory,
        searchValue,
        productStore.tagId,
        parseSort
      );
      if (response && response.kind === "ok") {
        if (page === 0) {
          setDataProduct(response.response.data.content);
        } else {
          setDataProduct((prevProducts: any) => [
            ...prevProducts,
            ...response.response.data.content,
          ]);
        }
      } else {
        console.error("Failed to fetch product:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const handleEditCategory = (category: any) => {
    setSelectedEditCategory(category);
    setIsVisible(true);
  };
  const handleDeleteItem = async () => {
    const result = await categoryStore.getDeleteCategories(selectedCategoryId);
    console.log("mmm", selectedCategoryId);
    if (result.kind === "ok") {
      console.log("Xoá danh mục thành công", result.response);
      setErrorMessage(result.response.message);
      handleGetCategory();
      setIsDeleteFailModalVisible(true);
    } else {
      console.log(
        "Xoá danh mục thất bại",
        result.response.errorCodes[0].message
      );
      setErrorMessage(result.response.errorCodes[0].message);
      setIsDeleteFailModalVisible(true);
    }
    setIsDeleteModalVisible(false);
  };

  const handleOpenDeleteModal = (categoryId: any) => {
    setSelectedCategoryId(categoryId);
    setIsDeleteModalVisible(true);
  };
  const handleCreateDirectory = async (name: any, imageUrl: any) => {
    const result = await categoryStore.getCreateCategories(name, imageUrl);
    if (result.kind === "ok") {
      console.log("Tạo danh mục thành công", result.response);
      setErrorMessage(result.response.message);
      handleGetCategory();
      setIsDeleteFailModalVisible(true);
      setIsDirectoryModalVisible(false);
    } else {
      console.log(
        "Tạo danh mục thất bại",
        result.response.errorCodes[0].message
      );
      setErrorMessage(result.response.errorCodes[0].message);
      setIsDeleteFailModalVisible(true);
    }
  };
  const handleUpdateDirectory = async (
    name: string,
    imageUrl: string,
    productCategoryId: number
  ) => {
    console.log("firstzzz", name);
    const result = await categoryStore.getUpdateCategories(
      name,
      imageUrl,
      productCategoryId
    );
    if (result.kind === "ok") {
      console.log("Chỉnh sửa danh mục thành công", result.response.message);
      setErrorMessage(result.response.message);
      handleGetCategory();
      setIsDeleteFailModalVisible(true);
    } else {
      console.log(
        "Chỉnh sửa danh mục thất bại",
        result.response.errorCodes[0].message
      );
      setErrorMessage(result.response.errorCodes[0].message);
      setIsDeleteFailModalVisible(true);
    }
  };
  const [activeTab, setActiveTab] = useState(productStore.statusTab);
  const [isGridView, setIsGridView] = useState(productStore.viewGrid);
  useEffect(() => {
    handleGetProduct();
    handleGetCategory();
  }, []);
  useEffect(() => {
    handleGetProduct();
    console.log("firstmmmm", selectedCategory);
  }, [viewProduct, selectedCategory]);
  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
  };
  const handleEndReached = () => {
    if (!isRefreshing && searchValue == "" && selectedCategory == undefined) {
      setPage((prevPage) => prevPage + 1);
      handleGetProduct();
    }
  };
  const handleEndReachedCategory = () => {
    if (
      !isRefreshingCategory &&
      searchCategory == "" &&
      pageCategories <= totalPages - 1
    ) {
      setPageCategories((prevPage) => prevPage + 1);
      handleGetCategory();
    }
  };
  const openDirectoryModal = () => {
    setIsDirectoryModalVisible(true);
  };
  const refreshProduct = async () => {
    setIsRefreshing(true);
    setSelectedCategory(undefined);
    setPage(0);
    setSearchValue("");
    setNameDirectory("");
    setDataProduct([]);
    productStore.setTagId(0);
    productStore.setSort([]);
    await handleGetProduct();
    setIsRefreshing(false);
  };
  const refreshCategory = async () => {
    setIsRefreshingCategory(true);
    setPageCategories(0);
    setSearchCategory("");
    setDataCategory([]);
    productStore.setSortCategory([]);
    await handleGetCategory();
    setIsRefreshingCategory(false);
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
    productStore.setViewGrid(isGridView);
  }, [isGridView]);
  useEffect(() => {
    productStore.setStatusTab(activeTab);
  }, [activeTab]);
  const toggleView = () => {
    setIsGridView(!isGridView);
  };
  const handleProductDetail = (idProduct: number) => {
    productStore.setSelectedProductId(idProduct);
    navigation.navigate("productDetailScreen" as never);
  };
  const handleClassifyDetail = (idProduct: number) => {
    console.log("first", idProduct);
    productStore.setSelectedProductId(idProduct);
    console.log("selectedProductId", productStore.productId);
    navigation.navigate("classifyDetailScreen" as never);
  };
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Sản phẩm`}
        RightIcon2={activeTab === "product" ? Images.ic_squareFour : null}
        onRightPress={handleOpenSearch}
        onRightPress2={toggleView}
        RightIcon={openSearch ? Images.icon_close : Images.search}
        headerInput={openSearch}
        searchValue={activeTab === "product" ? searchValue : searchCategory}
        onSearchValueChange={
          activeTab === "product"
            ? handleSearchValueChange
            : handleSearchCategoryChange
        }
        handleOnSubmitSearch={
          activeTab === "product"
            ? handleSubmitSearch
            : handleSubmitSearchCategory
        }
        widthRightIcon={20}
        heightRightIcon={20}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={styles.titleHeader}
      />
      {/* <View style={{ marginHorizontal: scaleWidth(16), marginVertical: scaleHeight(8), flexDirection: 'row', alignItems: 'center' }}>
        <Images.avatar width={scaleWidth(40)} height={scaleHeight(40)} />
        <View style={{ marginHorizontal: scaleWidth(6) }}>
          <Text style={{ fontSize: fontSize.size10 }}>NCC00001 - {company}</Text>
          <Text style={{ fontSize: fontSize.size10, color: '#747475' }}>02466989909</Text>
        </View>
      </View> */}
      <View style={styles.btnTab}>
        <View style={styles.rowBtnTab}>
          {btnTab.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  handleTabPress(index === 0 ? "product" : "category")
                }
                key={index}
                style={[
                  styles.buttonProduct,
                  activeTab === (index === 0 ? "product" : "category") &&
                    styles.activeButton,
                ]}>
                <View
                  style={{ width: scaleWidth(114), height: scaleHeight(20) }}>
                  <Text
                    style={[
                      styles.buttonText,
                      activeTab === (index === 0 ? "product" : "category") &&
                        styles.activeButtonText,
                    ]}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      {activeTab === "product" ? (
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
                  navigation.navigate("filterScreen" as never, { activeTab })
                }
                style={{ backgroundColor: "none" }}>
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
            dataCategory={dataCategory}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setNameDirectory={setNameDirectory}
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
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
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
      ) : (
        <CategoryList
          openDirectoryModal={openDirectoryModal}
          navigation={navigation}
          activeTab={activeTab}
          dataCategory={dataCategory}
          isRefreshingCategory={isRefreshingCategory}
          refreshCategory={refreshCategory}
          handleEndReachedCategory={handleEndReachedCategory}
          handleOpenDeleteModal={handleOpenDeleteModal}
          handleEditCategory={handleEditCategory}
          isDeleteModalVisible={isDeleteModalVisible} // Truyền prop isDeleteModalVisible
          setIsDeleteModalVisible={setIsDeleteModalVisible} // Truyền prop setIsDeleteModalVisible
          handleDeleteItem={handleDeleteItem} // Truyền prop handleDeleteItem
        />
      )}
      <CreateDirectoryModal
        isVisible={isDirectoryModalVisible}
        setIsVisible={setIsDirectoryModalVisible}
        onCreateDirectory={handleCreateDirectory}
      />
      <EditDirectoryModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        category={selectedEditCategory}
        onUpdateDirectory={handleUpdateDirectory}
      />

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
};
