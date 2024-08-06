import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { products, suppliers } from "./data";
import { styles } from "./styles";
import LinearGradient from "react-native-linear-gradient";
import { AutoImage, Button, Header, Screen, Text } from "../../../components";
import { Svgs } from "../../../../assets/svgs";
import { NavigatorParamList } from "../../navigators";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { translate } from "../../../i18n";
import { useStores } from "../../models";


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

  const getListVendor = (search: string) => {
    productStore.getListVendor(page, search).then((item: any) => {
      if (item.response.data.content != null) {
        setTotalPage(item.response.data.totalPages);
        const data = item.response.data.content;
        setList((prev: any) => [...prev, ...data]);
      }
      console.log("vendor screen", JSON.stringify(item.response.data));
    });
  };

  const handleEndReached = () => {
    if (!isLoading && page + 1 < totalPage) {
      setIsLoading(true);
      setPage(page + 1);
      setIsLoading(false);
      getListVendor("");
    }
  };

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

  useEffect(() => {
    getListVendor(searchValue);
  }, []);
  const handleAllProduct = () => {
    navigation.navigate({
      name: "productScreen",
    } as never);
    productStore.setSort([])
    productStore.setCompany({
      id: null,
      name: '',
      code: '',
      phoneNumber: '',
      avatarUrl: ""
    })
  };
  const renderProductItem = ({ item, index }: any) => {
    const handlePress = () => {
      navigation.navigate({
        name: "productScreen",
      } as never);
      productStore.setCompany(item)
      productStore.setSort([])
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
      <Screen style={styles.ROOT} preset="fixed">
        <View
          style={{
            marginHorizontal: 16,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text
            tx={"productScreen.select_vendor"}
            style={{
              fontSize: fontSize.size10,
              fontWeight: "500",
              marginVertical: 10,
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
        <View style={{ flex: 0.95, marginHorizontal: 16 }}>
          <FlatList
            data={getList}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshNotifications}
                title="ok"
              />
            }
            keyExtractor={(item) => item.id.toString()}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.8}
            ListFooterComponent={renderFooter}
            numColumns={2}
            // columnWrapperStyle={isGridView ? null : null}
            renderItem={renderProductItem}
          />
        </View>
      </Screen>
    </View>
  );
});
