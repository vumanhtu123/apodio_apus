// CategoryList.tsx
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Text } from '../../../../../components';
import { Svgs } from '../../../../../../assets/svgs';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../../theme';
import { styles } from '../../styles';
import RenderCategoryItem from './renderItemCategory';
import Dialog from '../../../../../components/dialog/dialog';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../../../../models';
import CreateDirectoryModal from '../component/modal-createDirectory';
import EditDirectoryModal from '../component/modal-editDirectory';

const CategoryListComponent = ({ activeTab, searchCategory, onClearSearch }: any
) => {
  const navigation = useNavigation();
  const [isRefreshingCategory, setIsRefreshingCategory] = useState(false);
  const [isDirectoryModalVisible, setIsDirectoryModalVisible] = useState(false);
  const [selectedEditCategory, setSelectedEditCategory] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isDeleteFailModalVisible, setIsDeleteFailModalVisible] =
    useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>();
  const [totalPages, setTotalPages] = useState<any>(0);
  const [dataCategory, setDataCategory] = useState<any>([]);
  const { categoryStore, productStore } = useStores();
  const [errorMessage, setErrorMessage] = useState("");
  const [pageCategories, setPageCategories] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmitSearchCategory = async () => {
    setIsLoading(true)
    setPageCategories(0);
    setDataCategory([]);
    await handleGetCategory(searchCategory);
    setIsLoading(false)
  };
  useEffect(() => {
    handleSubmitSearchCategory()
  }, [searchCategory])
  const handleGetCategory = async (searchCategory?: any) => {
    var parseSortCategory = "";
    console.log('check page', pageCategories)
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
        parseSortCategory,
        categoryStore.isLoadMore
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
        categoryStore.setIsLoadMore(false)
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } 
  };
  const handleEditCategory = (category: any) => {
    // console.log('czxcxzw',category)
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
      setErrorMessage(result.response.errorCodes[0].message);
      setIsDeleteFailModalVisible(true);
    }
    setIsDeleteModalVisible(false);
  };
  const handleOpenDeleteModal = (categoryId: any) => {
    setSelectedCategoryId(categoryId);
    setIsDeleteModalVisible(true);
  };
  useEffect(() => {
    if (!isRefreshingCategory) {
      handleGetCategory(searchCategory);
    }
  }, [pageCategories]);
  const handleEndReachedCategory = async () => {
    if (!isRefreshingCategory && pageCategories < totalPages - 1 && !isLoading) {
      categoryStore.setIsLoadMore(true)
      setPageCategories((prevPage) => prevPage + 1);
    }
  };
  const openDirectoryModal = () => {
    setIsDirectoryModalVisible(true);
  };
  const refreshCategory = useCallback(async () => {
    categoryStore.setIsLoadMore(true)
    setIsRefreshingCategory(true);
    setDataCategory([]);
    onClearSearch();
    setPageCategories(0);
    productStore.setSortCategory([]);
    await handleGetCategory();
    setIsRefreshingCategory(false);
  }, [onClearSearch]);
  const renderFooter = () => {
    if (isRefreshingCategory || pageCategories >= totalPages - 1 || dataCategory.length < 1) return null;
    return (
      <View>
        <ActivityIndicator size="large" color="#F6961C" />
      </View>
    );
  };
  const handleModalDirectory = async (errorMessage: any, checkReload: any) => {
    setErrorMessage(errorMessage)
    setIsDeleteFailModalVisible(true);
    if (checkReload === 'ok') {
      await handleGetCategory()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Button onPress={openDirectoryModal} style={styles.btnCreateCategory}>
        <Svgs.icon_plus width={scaleWidth(24)} height={scaleHeight(24)} style={{ margin: 8 }} />
      </Button>
      <View
        style={{
          marginRight: scaleHeight(16),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: scaleHeight(5),
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate({ name: 'filterScreen', params: { activeTab } } as never)}
          style={{ backgroundColor: 'none', flexDirection: 'row' }}
        >
          <Text
            tx="productScreen.filter"
            style={{
              color: colors.black,
              textAlign: 'center',
              fontWeight: '400',
              fontSize: fontSize.size12,
              marginRight: scaleWidth(6),
            }}
          />
          <Svgs.slider_black width={scaleWidth(16)} height={scaleHeight(16)} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          onEndReached={handleEndReachedCategory}
          data={dataCategory}
          refreshControl={
            <RefreshControl refreshing={isRefreshingCategory} onRefresh={refreshCategory} title="ok" />
          }
          keyExtractor={(item) => item.id.toString()}
          // scrollEnabled={true}
          ListFooterComponent={renderFooter}
          renderItem={({ item, isActive, index }: any) => (
            <RenderCategoryItem
              item={item}
              isActive={isActive}
              index={index}
              handleOpenDeleteModal={handleOpenDeleteModal}
              handleEditCategory={handleEditCategory}
            />
          )}
        />
      </View>
      <Dialog
        onPressCancel={() => setIsDeleteModalVisible(false)}
        onPressAccept={handleDeleteItem}
        isVisible={isDeleteModalVisible}
        title={"productScreen.Notification"}
        content={"productScreen.NotificationDelete"}
        titleBTN1="productScreen.BtnNotificationBack"
        titleBTN2="productScreen.BtnNotificationAccept"
        styleBTN1={{
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#d5d5d5",
          borderRadius: 8,
        }}
        styleBTN2={{ backgroundColor: colors.navyBlue, borderRadius: 8 }}
      />
      <Dialog
        isVisible={isDeleteFailModalVisible}
        title={"productScreen.Notification"}
        errorMessage={errorMessage}
        titleBTN2="productScreen.BtnNotificationAccept"
        styleBTN2={{ backgroundColor: colors.navyBlue, borderRadius: 8 }}
        onPressAccept={() => setIsDeleteFailModalVisible(false)}
      />
      <CreateDirectoryModal
        isVisible={isDirectoryModalVisible}
        setIsVisible={setIsDirectoryModalVisible}
        onCreateDirectory={handleModalDirectory}
      />
      <EditDirectoryModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        category={selectedEditCategory}
        onUpdateDirectory={handleModalDirectory}
      />
    </View>
  );
};
export const CategoryList = CategoryListComponent
