import React, { FC, useEffect, useRef, useState } from "react";
import { styles } from "../styles/styles";
import { Header, Text } from "../../../components";
import { Images } from "../../../../assets";
import { AppStackScreenProps, navigationRef } from "../../../navigators";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import RenderProductItem from "./item-product";
import { useStores } from "../../../models";

export const ProductSupplier = () => {
  const { categoryStore, productStore } = useStores();
  const [onClick, setonClick] = useState(0);
  const [dataProduct, setDataProduct] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [viewProduct, setViewProduct] = useState(productStore.viewProductType);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [totalPagesProduct, setTotalPagesProduct] = useState<any>(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    handleGetProduct();
  }, [viewProduct, selectedCategory]);
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
        20,
        viewProduct,
        selectedCategory,
        searchValue,
        productStore.tagId,
        parseSort
      );
      // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
      if (response && response.kind === "ok") {
        setTotalPagesProduct(response.response.data.totalPages);
        console.log("////////////////", response.response.data.totalPages);
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

  const flatListRef = useRef<FlatList<any>>(null);
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 }) as any;
    }
  }, [viewProduct]);

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
      console.log("--------handleEndReached---------------", page);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const refreshProduct = async () => {
    // setIsRefreshing(true);
    setSelectedCategory(undefined);
    setPage(0);
    setDataProduct([]);
    productStore.setTagId(0);
    productStore.setSort([]);
    await handleGetProduct();
    // setIsRefreshing(false);
  };

  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
        }}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 4,
              borderColor: "#C8C8C8",
              borderWidth: 1,
            }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "#747475",
                marginHorizontal: 8,
                marginVertical: 6,
              }}>
              Sản phẩm
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 4,
              borderColor: "#C8C8C8",
              borderWidth: 1,
              marginLeft: 8,
            }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "#747475",
                marginHorizontal: 8,
                marginVertical: 6,
              }}>
              Phân loại
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#0078D4",
            borderRadius: 4,
          }}>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: "white",
              marginHorizontal: 8,
              marginVertical: 6,
            }}>
            Tạo sản phẩm
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 11, marginHorizontal: 16 }}>
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
          onEndReachedThreshold={0.5}
          // ListFooterComponent={renderFooter}
          key={"grid"}
          numColumns={3}
          columnWrapperStyle={null}
          renderItem={({ item, index }) => (
            <RenderProductItem
              item={item}
              index={index}
              isGridView={true}
              viewProduct={viewProduct}
              // handleProductDetail={handleProductDetail}
              // handleClassifyDetail={handleClassifyDetail}
            />
          )}
        />
      </View>
    </View>
  );
};
