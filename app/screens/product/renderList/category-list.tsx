// CategoryList.tsx
import React, { memo, useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button, Text } from '../../../components';
import { Images } from '../../../../assets';
import { fontSize, scaleHeight, scaleWidth } from '../../../theme';
import { styles } from '../styles';
import RenderCategoryItem from './renderItemCategory';
import Dialog from '../../../components/dialog/dialog';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../../../models';
import CreateDirectoryModal from '../component/modal-createDirectory';

// interface CategoryListProps {
//   openDirectoryModal: () => void;
//   navigation: any;
//   activeTab: string;
//   dataCategory: any[];
//   isRefreshingCategory: boolean;
//   refreshCategory: () => void;
//   handleEndReachedCategory: () => void;
//   handleOpenDeleteModal: (item: any) => void;
//   handleEditCategory: (item: any) => void;
//   isDeleteModalVisible : boolean,
//   setIsDeleteModalVisible : any,
//   handleDeleteItem : () => void;
// }
const CategoryListComponent = ({ activeTab }: any
  //   {
  //   openDirectoryModal,
  //   navigation,

  //   dataCategory,
  //   isRefreshingCategory,
  //   refreshCategory,
  //   handleEndReachedCategory,
  //   handleOpenDeleteModal,
  //   handleEditCategory,
  //   isDeleteModalVisible, // Thêm prop isDeleteModalVisible
  //   setIsDeleteModalVisible, // Thêm prop setIsDeleteModalVisible
  //   handleDeleteItem,
  // } : any
) => {
  const navigation = useNavigation();
  // const [isRefreshing, setIsRefreshing] = useState(false);
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
  const [searchCategory, setSearchCategory] = useState("");
  // const handleSearchCategoryChange = (text: string) => {
  //   const newValue = text !== null ? text.toString() : "";
  //   setSearchCategory(newValue);
  // };
  // const handleSubmitSearchCategory = () => {
  //   // const processedText = searchValue.trim().toLowerCase();
  //   setPageCategories(0);
  //   setDataCategory([]);
  //   handleGetCategory(searchCategory);
  // };
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
    handleGetCategory(searchCategory);
  }, [pageCategories]);
  const handleEndReachedCategory = () => {
    if (!isRefreshingCategory && pageCategories <= totalPages - 1) {
      categoryStore.setIsLoadMore(true)
      setPageCategories((prevPage) => prevPage + 1);
    }
  };
  const openDirectoryModal = () => {
    setIsDirectoryModalVisible(true);
  };
  const refreshCategory = async () => {
    categoryStore.setIsLoadMore(true)
    setIsRefreshingCategory(true);
    setDataCategory([]);
    setSearchCategory("");
    setPageCategories(0);
    productStore.setSortCategory([]);
    await handleGetCategory();
    setIsRefreshingCategory(false);
  };
  const renderFooter = () => {
    if (isRefreshingCategory || pageCategories >= totalPages - 1 || dataCategory.length < 1) return null;
    return (
      <View>
        <ActivityIndicator size="large" color="#F6961C" />
      </View>
    );
  };
  const handleModalDirectory = (errorMessage: any, checkReload: any) => {
    // console.log('đâsdasdadassa', errorMessage)
    if (checkReload === 'ok') {
      handleGetCategory()
    }
    setErrorMessage(errorMessage)
    setIsDeleteFailModalVisible(true);
  }
  return (
    <View style={{ flex: 1 }}>
      <Button onPress={openDirectoryModal} style={styles.btnCreateCategory}>
        <Images.icon_plus width={scaleWidth(24)} height={scaleHeight(24)} style={{ margin: 8 }} />
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
          onPress={() => navigation.navigate('filterScreen' as never, { activeTab })}
          style={{ backgroundColor: 'none', flexDirection: 'row' }}
        >
          <Text
            tx="productScreen.filter"
            style={{
              color: '#000000',
              textAlign: 'center',
              fontWeight: '400',
              fontSize: fontSize.size12,
              marginRight: scaleWidth(6),
            }}
          />
          <Images.slider_black width={scaleWidth(16)} height={scaleHeight(16)} />
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
        styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8 }}
      />
      <Dialog
        isVisible={isDeleteFailModalVisible}
        title={"productScreen.Notification"}
        errorMessage={errorMessage}
        titleBTN2="productScreen.BtnNotificationAccept"
        styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8 }}
        onPressAccept={() => setIsDeleteFailModalVisible(false)}
      />
      <CreateDirectoryModal
        isVisible={isDirectoryModalVisible}
        setIsVisible={setIsDirectoryModalVisible}
        onCreateDirectory={handleModalDirectory}
      />
    </View>
  );
};
export const CategoryList = memo(CategoryListComponent)
