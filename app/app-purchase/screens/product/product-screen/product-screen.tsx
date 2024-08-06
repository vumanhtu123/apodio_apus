import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Svgs } from "../../../../../assets/svgs";
import Dialog from "../../../../components/dialog/dialog";
import { Header } from "../../../../components/header/header";
import { Text } from "../../../../components/text/text";
import { useStores } from "../../../models";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { CategoryList } from "./renderList/category-list";
import { ProductList } from "./renderList/product-list";
import { styles } from "../styles";
import { translate } from "../../../../i18n";
export const ProductScreen: FC = () => {
  const navigation = useNavigation();
  const [btnTab, setBtnTab] = useState(["Sản phẩm", "Danh mục"]);
  const { productStore } = useStores();
  const [searchCategory, setSearchCategory] = useState("");
  const [activeTab, setActiveTab] = useState(productStore.statusTab);
  const [isGridView, setIsGridView] = useState(productStore.viewGrid);
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [submittedCategorySearch, setSubmittedCategorySearch] = useState('');
  const [searchValue, setSearchValue] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const [company, setCompany] = useState(productStore.company);
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
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={translate("productScreen.productTittle")}
        RightIcon2={
          activeTab === "product"
            ? isGridView
              ? Svgs.ic_squareFour
              : Svgs.ic_grid
            : null
        }
        onRightPress={handleOpenSearch}
        onRightPress2={toggleView}
        RightIcon={openSearch ? Svgs.icon_close : Svgs.search}
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
      <View style={{ flex: 1, backgroundColor: colors.aliceBlue }}>
        {activeTab === "product" && company.id !== null ? (
          <View style={{ paddingHorizontal: scaleWidth(16), paddingVertical: scaleHeight(8), flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white }}>
            <Svgs.avatar width={scaleWidth(40)} height={scaleHeight(40)} />
            <View style={{ marginHorizontal: scaleWidth(6) }}>
              <Text style={{ fontSize: fontSize.size10 }}>{company.code} - {company.name}</Text>
              <Text style={{ fontSize: fontSize.size10, color: colors.dolphin }}>{company.phoneNumber}</Text>
            </View>
          </View>
        ) : null}
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
            vendorId={company.id}
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
