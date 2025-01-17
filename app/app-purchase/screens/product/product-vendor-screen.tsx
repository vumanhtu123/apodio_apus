import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Svgs } from "../../../../assets/svgs";
import { AutoImage, Header, Text } from "../../../components";
import { translate } from "../../../i18n";
import { useStores } from "../../models";
import { NavigatorParamList } from "../../navigators";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { styles } from "./styles";

export const ProductVendorScreen: FC<
  StackScreenProps<NavigatorParamList, "vendorScreen">
> = observer(function ProductVendorScreen(props: any) {
  const navigation = useNavigation();
  const { productStore } = useStores();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [getList, setList] = useState<any>([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const getListVendor = async (search: string) => {
    setIsLoading(true);
    try {
      await productStore.getListVendor(page, search).then((item: any) => {
        if (item.response.data.content != null) {
          setTotalPage(item.response.data.totalPages);
          const data = item.response.data.content;
          setList((prev: any) => [...prev, ...data]);
        }
        getList.forEach((item: any) => console.log("id screen", item.id)); // Kiểm tra id của các item

        console.log("vendor screen", JSON.stringify(item.response.data));
      });
    } catch (e: any) {
      console.log("error", e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndReached = () => {
    console.log("total page", totalPage);
    if (!isLoading && page < totalPage) {
      setPage((prePage) => prePage + 1);
      // getListVendor("");
    }
  };

  useEffect(() => {
    getListVendor(searchValue);
  }, [page]);

  const refreshNotifications = () => {
    setIsRefreshing(true);
    setOpenSearch(false);
    setPage(0);
    setList([]);
    setIsRefreshing(false);
    getListVendor("");
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <View>
        <ActivityIndicator size="large" color="#F6961C" />
      </View>
    );
  };

  const handleOpenSearch = () => {
    setOpenSearch(!openSearch);
  };

  const handleSearchValueChange = (text: string) => {
    const newValue = text !== null ? text.toString() : "";
    setSearchValue(newValue);
  };

  const handleSubmitSearch = () => {
    if (searchValue != "") {
      setList([]);
      getListVendor(searchValue);
    }
  };

  // useEffect(() => {
  //   getListVendor(searchValue);
  // }, []);
  const handleAllProduct = () => {
    navigation.navigate({
      name: "productScreen",
    } as never);
    productStore.setSort([]);
    productStore.setSortCategory([]);
    productStore.setStatusTab("product");
    productStore.setCompany({
      id: null,
      name: "",
      code: "",
      phoneNumber: "",
      avatarUrl: "",
    });
  };
  const renderProductItem = ({ item }: any) => {
    const handlePress = () => {
      navigation.navigate({
        name: "productScreen",
      } as never);
      productStore.setCompany(item);
      productStore.setSort([]);
      productStore.setSortCategory([]);
      productStore.setStatusTab("product");
    };
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={[colors.palette.white, colors.palette.white]}
        style={{ marginRight: 10, marginBottom: 10, borderRadius: 10 }}>
        <TouchableOpacity
          onPress={handlePress}
          style={[{ width: scaleWidth(166), height: scaleHeight(124) }]}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              paddingHorizontal: scaleHeight(15),
            }}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {item.avatarUrl == "" || null ? (
                <Svgs.logoShop
                  width={scaleWidth(27.63)}
                  height={scaleHeight(29.75)}
                />
              ) : (
                <AutoImage
                  style={{
                    width: scaleWidth(107),
                    height: scaleHeight(70),
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  source={{
                    uri:
                      item.avatarUrl ??
                      "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g",
                  }}
                />
              )}
              <View style={{ top: 10 }}>
                <Text
                  style={{
                    color: "black",
                    fontSize: fontSize.size10,
                    lineHeight: 12,
                    textAlign: "center",
                  }}
                  numberOfLines={2}>
                  {item.code + " - " + item.name}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  };
  // const displayedNotifications = suppliers.slice(0, page * pageSize);
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={translate("productScreen.productTittle")}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={{
          justifyContent: "flex-start",
          paddingLeft: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
        RightIcon2={null}
        onRightPress={handleOpenSearch}
        // onRightPress2={toggleView}
        RightIcon={Svgs.search}
        headerInput={openSearch}
        searchValue={searchValue}
        onSearchValueChange={handleSearchValueChange}
        handleOnSubmitSearch={handleSubmitSearch}
      />
      <View style={styles.ROOT}>
        <View
          style={{
            marginHorizontal: scaleWidth(16),
            marginVertical: scaleHeight(16),
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text
            tx={"productScreen.select_vendor"}
            style={{
              fontSize: fontSize.size10,
              fontWeight: "500",
              marginVertical: scaleHeight(10),
            }}></Text>
          <TouchableOpacity onPress={handleAllProduct}>
            <Text
              tx={"productScreen.display_all"}
              style={{
                fontSize: fontSize.size9,
                fontWeight: "500",
                marginVertical: 10,
                color: colors.navyBlue,
              }}></Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginHorizontal: scaleWidth(16) }}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={getList}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshNotifications}
                title="ok"
              />
            }
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.8}
            ListFooterComponent={renderFooter}
            numColumns={2}
            renderItem={renderProductItem}
          />
        </View>
      </View>
    </View>
  );
});
