// CategoryList.tsx
import React from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Button, Text } from '../../../components';
import { Images } from '../../../../assets';
import { fontSize, scaleHeight, scaleWidth } from '../../../theme';
import { styles } from '../styles';
import RenderCategoryItem from './renderItemCategory';
import Dialog from '../../../components/dialog/dialog';

interface CategoryListProps {
  openDirectoryModal: () => void;
  navigation: any;
  activeTab: string;
  dataCategory: any[];
  isRefreshingCategory: boolean;
  refreshCategory: () => void;
  handleEndReachedCategory: () => void;
  handleOpenDeleteModal: (item: any) => void;
  handleEditCategory: (item: any) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  openDirectoryModal,
  navigation,
  activeTab,
  dataCategory,
  isRefreshingCategory,
  refreshCategory,
  handleEndReachedCategory,
  handleOpenDeleteModal,
  handleEditCategory,
  isDeleteModalVisible, // Thêm prop isDeleteModalVisible
  setIsDeleteModalVisible, // Thêm prop setIsDeleteModalVisible
  handleDeleteItem, // Thêm prop handleDeleteItem
}) => {
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
        }}
      >
        <Button
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
        </Button>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          onEndReached={handleEndReachedCategory}
          data={dataCategory}
          refreshControl={
            <RefreshControl refreshing={isRefreshingCategory} onRefresh={refreshCategory} title="ok" />
          }
          keyExtractor={(item: any) => item.id.toString()}
          scrollEnabled={true}
          renderItem={({ item, isActive }: any) => (
            <RenderCategoryItem
              item={item}
              isActive={isActive}
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
    </View>
  );
};