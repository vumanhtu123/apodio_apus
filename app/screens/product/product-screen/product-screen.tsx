import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Images } from "../../../../assets/index";
import Dialog from "../../../components/dialog/dialog";
import { Header } from "../../../components/header/header";
import { Text } from "../../../components/text/text";
import { useStores } from "../../../models";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import CreateDirectoryModal from "./component/modal-createDirectory";
import EditDirectoryModal from "./component/modal-editDirectory";
import { CategoryList } from "./renderList/category-list";
import { ProductList } from "./renderList/product-list";
import { styles } from "../styles";
import { translate } from "../../../i18n";
export const ProductScreen: FC = () => {
  const [btnTab, setBtnTab] = useState(["Sản phẩm", "Danh mục"]);
  const { productStore } = useStores();
  const [searchCategory, setSearchCategory] = useState("");
  const [activeTab, setActiveTab] = useState(productStore.statusTab);
  const [isGridView, setIsGridView] = useState(productStore.viewGrid);
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [submittedCategorySearch, setSubmittedCategorySearch] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  // Xử lý tìm kiếm danh mục
  const handleSearchCategoryChange = (text: string) => {
    const newValue = text !== null ? text.toString() : "";
    setSearchCategory(newValue);
  };
  const handleSubmitSearchCategory = () => {
    setSubmittedCategorySearch(searchCategory)
  };
  const handleClearCategorySearch = () => {
    setSearchCategory('');
    setSubmittedCategorySearch('');
    setOpenSearch(false);
  };
  // Xử lý tìm kiếm sản phẩm
  const handleSearchValueChange = (text: string) => {
    const newValue = text !== null ? text.toString() : "";
    setSearchValue(newValue);
  };
  const handleSubmitSearch = () => {
    setSubmittedSearch(searchValue);
  };
  const handleClearSearch = () => {
    setSearchValue('');
    setSubmittedSearch('');
    setOpenSearch(false);
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
            activeTab={activeTab}
            searchCategory={submittedCategorySearch}
            onClearSearch={handleClearCategorySearch}
          />
        )}
      </View>
    </View>
  );
};
