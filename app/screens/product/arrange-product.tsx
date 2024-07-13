import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { AutoImage } from "../../../app/components/auto-image/auto-image";
import { Button } from "../../../app/components/button/button";
import { Screen } from "../../../app/components/screen/screen";
import { Images } from "../../../assets/index";
import { Header } from "../../components/header/header";
import { Text } from "../../components/text/text";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { styles, stylesItem } from "./styles";
import { products } from "./data";

export const ArrangeProduct: FC = () => {
  const navigation = useNavigation();
  const [typeNoti, setTypeNoti] = useState(["Tất cả", "Apodio"]);
  const [btnTab, setBtnTab] = useState(["Sản phẩm", "Danh mục"]);
  const [indexItem, setIndexItem] = useState(0);
  const [indexItemBtn, setIndexItemBtn] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const route = useRoute();
  const { selectedType }: any = route.params;
  const [sortedProducts, setSortedProducts] = useState(products);
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const toggleTileSelection = (tileId: number) => {
    if (selectedTiles.includes(tileId)) {
      setSelectedTiles(selectedTiles.filter((id) => id !== tileId));
    } else {
      setSelectedTiles([...selectedTiles, tileId]);
    }
  };
  const pageSize = 5;
  const handleEndReached = () => {
    if (!isLoading && page * pageSize < products.length) {
      setIsLoading(true);
      setTimeout(() => {
        setPage(page + 1);
        setIsLoading(false);
      }, 2000);
    }
  };
  const openCategoryModal = () => {
    setIsCategoryModalVisible(true);
  };

  const refreshNotifications = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPage(1);
      setIsRefreshing(false);
    }, 1000);
  };
  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View>
        <ActivityIndicator size="large" color="#F6961C" />
      </View>
    );
  };
  const renderProductItem = ({ item }: any) => {
    return (
      <TouchableOpacity
        onPress={() => toggleTileSelection(item.id)}
        style={[
          stylesItem.item,
          { width: scaleWidth(343), height: scaleHeight(82) },
        ]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
          }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: scaleWidth(12),
            }}>
            <TouchableOpacity
              style={[
                styles.radioButton,
                selectedTiles.includes(item.id) && styles.radioButtonSelected,
              ]}
              onPress={() => toggleTileSelection(item.id)}>
              {selectedTiles.includes(item.id) && (
                <Text style={styles.radioButtonText}>
                  {selectedTiles.indexOf(item.id) + 1}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ margin: 6, borderRadius: 10 }}>
            <AutoImage
              style={{
                width: scaleWidth(70),
                height: scaleHeight(70),
                borderRadius: 8,
              }}
              source={{
                uri: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g",
              }}
            />
          </View>
          <View
            style={[
              stylesItem.titleView,
              { marginTop: scaleHeight(10), marginHorizontal: scaleWidth(6) },
            ]}>
            <Text style={stylesItem.title}>{item.name}</Text>
            {item.description && (
              <Text style={stylesItem.description}>{item.description}</Text>
            )}
            <Text style={stylesItem.content} numberOfLines={1}>
              {item.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    const sortProducts = () => {
      let sorted = [...products];
      switch (selectedType) {
        case "new":
          sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "bestSeller":
          sorted.sort((a, b) => b.salesCount - a.salesCount);
          break;
        case "hightToLow":
          sorted.sort((a, b) => b.quantity - a.quantity);
          break;
        case "lowToHight":
          sorted.sort((a, b) => a.quantity - b.quantity);
          break;
        case "aToZ":
          sorted.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "zToA":
          sorted.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "highPriceToLow":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "lowPriceToHigh":
          sorted.sort((a, b) => a.price - b.price);
          break;
        default:
          break;
      }
      setSortedProducts(sorted);
      // console.log('hhhhhh' , products.length)
    };

    sortProducts();
  }, [selectedType]);
  const sortProductsByButtonClick = () => {
    let sorted = [...sortedProducts];
    const sortedBySelection = sortProductsBySelection(sorted, selectedTiles);
    setSortedProducts(sortedBySelection);
  };

  const handleSortClick = () => {
    sortProductsByButtonClick();
    setSelectedTiles([]);
  };
  const sortProductsBySelection = (products: any, selectedTiles: any) => {
    const sortedProducts = [...products];
    const selectedProducts = sortedProducts.filter((product) =>
      selectedTiles.includes(product.id)
    );
    const unselectedProducts = sortedProducts.filter(
      (product) => !selectedTiles.includes(product.id)
    );

    const sortedSelectedProducts = selectedProducts.sort(
      (a, b) => selectedTiles.indexOf(a.id) - selectedTiles.indexOf(b.id)
    );
    return [...sortedSelectedProducts, ...unselectedProducts];
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Sắp xếp sản phẩm `}
        widthRightIcon={20}
        heightRightIcon={20}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={{
          justifyContent: "flex-start",
          paddingLeft: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
      />
      <Screen style={styles.ROOT} preset="fixed">
        <View style={styles.rowBtnTab}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#E6E7EA",
              borderRadius: 8,
              padding: 2,
            }}>
            {btnTab.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setIndexItemBtn(index);
                  }}
                  key={index}
                  style={[
                    styles.buttonProduct,
                    index === indexItemBtn && styles.activeButton,
                  ]}>
                  <Text
                    style={[
                      styles.buttonText,
                      index === indexItemBtn && styles.activeButtonText,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={styles.rowNotiType}>
          <TouchableOpacity
            onPress={openCategoryModal}
            style={{ marginRight: scaleWidth(8) }}>
            <Images.squaresFour width={20} height={20} />
          </TouchableOpacity>
          {typeNoti.map((item, index) => {
            return (
              // <TouchableOpacity source={item.imageSource} style={{}}} ></TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIndexItem(index);
                }}
                key={index}
                style={{
                  backgroundColor: index == indexItem ? "#FFFfff" : "#F4F4F4",
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  marginRight: 10,
                  borderWidth: 1,
                  borderColor: index == indexItem ? "#0078D4" : "#c8c8c8",
                }}>
                <Text
                  style={{
                    color: index == indexItem ? "#0078D4" : "#747475",
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: fontSize.size10,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ alignItems: "center", marginVertical: 12 }}>
          <Text
            style={{
              fontWeight: "400",
              color: "#747475",
              fontSize: fontSize.size12,
            }}>
            Chọn sản phẩm đưa lên đầu
          </Text>
        </View>
        <View style={{ flex: 0.95, marginHorizontal: 16 }}>
          <FlatList
            data={sortedProducts}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshNotifications}
                title="ok"
              />
            }
            keyExtractor={(item) => item.id}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.8}
            ListFooterComponent={renderFooter}
            numColumns={1}
            renderItem={renderProductItem}
            columnWrapperStyle={null}
          />
        </View>
        <View style={{ backgroundColor: "white", paddingTop: scaleHeight(20) }}>
          <Button
            tx={"demoPodcastListScreen.forgotPasswordMerchant.continue"}
            // onPress={(handleSubmit(onGetOtp))}
            onPress={handleSortClick}
            style={[
              styles.btnBottom,
              { backgroundColor: colors.palette.navyBlue },
              {
                backgroundColor:
                  selectedTiles.length === 0
                    ? "rgb(153,201,238)"
                    : colors.palette.navyBlue,
              },
            ]}
            textStyle={[
              styles.textButton,
              {
                fontWeight: "700",
                fontSize: fontSize.size14,
                paddingVertical: scaleHeight(5),
              },
            ]}
          />
        </View>
      </Screen>
    </View>
  );
};
