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
  const [btnTab, setBtnTab] = useState(["Sản phẩm", "Danh mục"]);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDirectoryModalVisible, setIsDirectoryModalVisible] = useState(false);
  const [selectedEditCategory, setSelectedEditCategory] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteFailModalVisible, setIsDeleteFailModalVisible] =
    useState(false);
  const [dataCategory, setDataCategory] = useState<any>([]);
  const { categoryStore, productStore } = useStores();
  const [errorMessage, setErrorMessage] = useState("");
  const [pageCategories, setPageCategories] = useState(0);
  const [viewProduct, setViewProduct] = useState(productStore.viewProductType);
  const [searchCategory, setSearchCategory] = useState("");
  const [activeTab, setActiveTab] = useState(productStore.statusTab);
  const [isGridView, setIsGridView] = useState(productStore.viewGrid);
  const handleSearchCategoryChange = (text: string) => {
    const newValue = text !== null ? text.toString() : "";
    setSearchCategory(newValue);
  };
  const handleSubmitSearchCategory = () => {
    // const processedText = searchValue.trim().toLowerCase();
    setPageCategories(0);
    setDataCategory([]);
    // handleGetCategory(searchCategory);
  };

  const [searchValue, setSearchValue] = useState("");
  const handleSearchValueChange = (text: string) => {
    const newValue = text !== null ? text.toString() : "";
    setSearchValue(newValue);
  };
  const [submittedSearch, setSubmittedSearch] = useState('');
  const handleSubmitSearch = () => {
    setSubmittedSearch(searchValue);
  };
  const handleClearSearch = () => {
    setSearchValue('');
    setSubmittedSearch('');
    setOpenSearch(false);
  };
  // const handleCreateDirectory = async (name: any, imageUrl: any) => {
  //   const result = await categoryStore.getCreateCategories(name, imageUrl);
  //   if (result.kind === "ok") {
  //     console.log("Tạo danh mục thành công", result.response);
  //     setErrorMessage(result.response.message);
  //     // handleGetCategory();
  //     setIsDeleteFailModalVisible(true);
  //     setIsDirectoryModalVisible(false);
  //   } else {
  //     console.log(
  //       "Tạo danh mục thất bại",
  //       result.response.errorCodes[0].message
  //     );
  //     setErrorMessage(result.response.errorCodes[0].message);
  //     setIsDeleteFailModalVisible(true);
  //   }
  // };
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
      // handleGetCategory();
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

  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
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
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
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
            searchValue={submittedSearch}
            onClearSearch={handleClearSearch}
            isGridView={isGridView}
          />
        ) : (
          <CategoryList
            // openDirectoryModal={openDirectoryModal}
            // navigation={navigation}
            activeTab={activeTab}
          // dataCategory={dataCategory}
          // isRefreshingCategory={isRefreshingCategory}
          // refreshCategory={refreshCategory}
          // handleEndReachedCategory={handleEndReachedCategory}
          // handleOpenDeleteModal={handleOpenDeleteModal}
          // handleEditCategory={handleEditCategory}
          // isDeleteModalVisible={isDeleteModalVisible}
          // setIsDeleteModalVisible={setIsDeleteModalVisible}
          // handleDeleteItem={handleDeleteItem}
          />
        )}
      </View>
     
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
