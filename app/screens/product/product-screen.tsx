import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Images } from "../../../assets/index";
import Dialog from "../../components/dialog/dialog";
import { Header } from "../../components/header/header";
import { Text } from "../../components/text/text";
import { useStores } from "../../models";
import { colors, scaleHeight, scaleWidth } from "../../theme";
import CreateDirectoryModal from "./component/modal-createDirectory";
import EditDirectoryModal from "./component/modal-editDirectory";
import { CategoryList } from "./renderList/category-list";
import { ProductList } from "./renderList/product-list";
import { styles } from "./styles";
import { translate } from "../../i18n";
export const ProductScreen: FC = () => {
  const navigation = useNavigation();
  const [tabTypes, setTabTypes] = useState(["Sản phẩm", "Phân loại"]);
  const [btnTab, setBtnTab] = useState(["Sản phẩm", "Danh mục"]);
  const [showCategory, setShowCategory] = useState(false);
  const [indexItem, setIndexItem] = useState(0);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRefreshingCategoryFilter, setIsRefreshingCategoryFilter] =
    useState(false);
  const [isRefreshingCategory, setIsRefreshingCategory] = useState(false);
  const [isDirectoryModalVisible, setIsDirectoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [selectedEditCategory, setSelectedEditCategory] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteFailModalVisible, setIsDeleteFailModalVisible] =
    useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>();
  const [totalPages, setTotalPages] = useState<any>(0);
  const [totalPagesProduct, setTotalPagesProduct] = useState<any>(0);
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [dataCategoryFilter, setDataCategoryFilter] = useState<any>([]);
  const [dataProduct, setDataProduct] = useState<any>([]);
  const { categoryStore, productStore } = useStores();
  const [errorMessage, setErrorMessage] = useState("");
  const [size, setSize] = useState(20);
  const [pageCategories, setPageCategories] = useState(0);
  const [nameDirectory, setNameDirectory] = useState("");
  const [viewProduct, setViewProduct] = useState(productStore.viewProductType);
  const [index, setIndex] = useState<any>();
  const [valueSearchCategory, setValueSearchCategory] = useState("");
  useFocusEffect(
    useCallback(() => {
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
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValueChange = (text: string) => {
    const newValue = text !== null ? text.toString() : "";
    setSearchValue(newValue);
  };
  const handleSubmitSearch = () => {
    setPage(0);
    setDataProduct([]);
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
      console.log(
        "first------------------",
        JSON.stringify(response.response.data.content)
      );
      if (response && response.kind === "ok") {
        setTotalPagesProduct(response.response.data.totalPages);
        if (page === 0) {
          setDataProduct(response.response.data.content);
        } else {
          setDataProduct((prevProducts: any) => [
            ...prevProducts,
            ...response.response.data.content,
          ]);
        }
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
  const viewProductType = (type: any) => {
    const viewType = type === "Sản phẩm" ? "VIEW_PRODUCT" : "VIEW_VARIANT";
    setViewProduct(viewType);
    productStore.setViewProductType(viewType);
  };
  const handleEditCategory = (category: any) => {
    setSelectedEditCategory(category);
    setIsVisible(true);
  };
  const getValueSearchCategoryFilter = (value: any) => {
    // console.log('first------------', value)
    setValueSearchCategory(value);
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
      setIsVisible(false);
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
  // useEffect(() => {
  //   handleGetProduct();
  //   handleGetCategory();
  //   handleGetCategoryFilter();
  // }, []);
  useEffect(() => {
    handleGetCategoryFilter();
  }, [valueSearchCategory]);
  useEffect(() => {
    const fetchData = async () => {
      setPage(0);
      setDataProduct([]);
      await handleGetProduct(searchValue);
    };
    fetchData();
  }, [viewProduct, selectedCategory]);
  useEffect(() => {
    handleGetCategory(searchCategory);
  }, [pageCategories]);
  useEffect(() => {
    handleGetProduct(searchValue); // Load more
  }, [page]);
  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
  };
  const handleEndReached = () => {
    console.log(
      "--------totalPagesProduct---------------",
      totalPagesProduct,
      "----",
      isRefreshing,
      "-----",
      page
    );
    if (!isRefreshing && page <= totalPagesProduct - 1) {
      productStore.setIsLoadMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleEndReachedCategory = () => {
    if (!isRefreshingCategory && pageCategories <= totalPages - 1) {
      setPageCategories((prevPage) => prevPage + 1);
    }
  };
  const openDirectoryModal = () => {
    setIsDirectoryModalVisible(true);
  };
  useEffect(() => {
    if (index == 0) {
      refreshProduct();
    }
  }, [index]);
  const refreshProduct = async () => {
    setIsRefreshing(true);
    setSelectedCategory(undefined);
    setPage(0);
    setSearchValue("");
    setOpenSearch(false);
    setNameDirectory("");
    setDataProduct([]);
    await handleGetProduct();
    productStore.setTagId(0);
    productStore.setSort([]);
    setIsRefreshing(false);
  };
  const refreshCategory = async () => {
    setIsRefreshingCategory(true);
    setPageCategories(0);
    setSearchCategory("");
    setOpenSearch(false);
    setDataCategory([]);
    productStore.setSortCategory([]);
    handleGetCategory();
    setIsRefreshingCategory(false);
  };
  const refreshCategoryFilter = async () => {
    setIsRefreshingCategory(true);
    // setPageCategories(0);
    setValueSearchCategory("");
    // setOpenSearch(false)
    setDataCategoryFilter([]);
    // productStore.setSortCategory([]);
    handleGetCategoryFilter();
    setIsRefreshingCategory(false);
  };
  const renderFooter = () => {
    if (isRefreshing) return null;
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
  const handleProductDetail = (idProduct: number, hasVariant: boolean) => {
    productStore.setSelectedProductId(idProduct);
    navigation.navigate("productDetailScreen", { hasVariant: hasVariant });
  };
  const handleClassifyDetail = (idProduct: number, hasVariant: boolean) => {
    productStore.setSelectedProductId(idProduct);
    navigation.navigate("classifyDetailScreen", { hasVariant: hasVariant });
  };
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };
  const flatListRef = useRef(null);
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [viewProduct]);
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={translate("productScreen.productTittle")}
        RightIcon2={
          activeTab === "product"
            ? isGridView
              ? Images.ic_squareFour
              : Images.ic_grid
            : null
        }
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
      <View style={{ flex: 1, backgroundColor: "#f6f7f9" }}>
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
          <ProductList
            navigation={navigation}
            tabTypes={tabTypes}
            indexItem={indexItem}
            handlePressViewProduct={handlePressViewProduct}
            setIndexItem={setIndexItem}
            setShowCategory={setShowCategory}
            showCategory={showCategory}
            dataCategoryFilter={dataCategoryFilter}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setNameDirectory={setNameDirectory}
            openSearch={openSearch}
            setIndex={setIndex}
            dataProduct={dataProduct}
            isRefreshing={isRefreshing}
            refreshProduct={refreshProduct}
            refreshCategory={refreshCategoryFilter}
            isRefreshingCategory={isRefreshingCategoryFilter}
            flatListRef={flatListRef}
            handleEndReached={handleEndReached}
            isGridView={isGridView}
            viewProduct={viewProduct}
            handleProductDetail={handleProductDetail}
            handleClassifyDetail={handleClassifyDetail}
            nameDirectory={nameDirectory}
            isLoadingMore={false}
            renderFooter={renderFooter}
            searchCategory={getValueSearchCategoryFilter}
          />
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
            isDeleteModalVisible={isDeleteModalVisible}
            setIsDeleteModalVisible={setIsDeleteModalVisible}
            handleDeleteItem={handleDeleteItem}
          />
        )}
      </View>
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
