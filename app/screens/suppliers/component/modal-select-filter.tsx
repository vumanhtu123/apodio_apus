import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Images } from "../../../../assets/index";
import { Header } from "../../../components/header/header";
import { Text } from "../../../components/text/text";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { styles } from "../styles/styles";
import { useStores } from "../../../models";

export const FilterSupplierScreen: FC = (item) => {
  const navigation = useNavigation();
  const [typeNoti, setTypeNoti] = useState([
    "filterScreen.new",
    "filterScreen.older",
  ]);
  const [typeAZ, setTypeAZ] = useState([
    "filterScreen.aToZ",
    "filterScreen.zToA",
  ]);
  // const [typePrice, setTypePrice] = useState([
  //   "filterScreen.priceHighToLow",
  //   "filterScreen.priceLowToHigh",
  // ]);
  const { productStore } = useStores();
  const [dataTag, setData] = useState([]);
  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const data = await productStore.getListTagProduct();
    setData(data.result.data.content);
    console.log("tuvmmmmmm", dataTag);
  };
  const [selectedNameFilter, setSelectedNameFilter] = useState(null);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState(null);
  const [selectedTagFilter, setSelectedTagFilter] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

  const handleNamePress = (item: any, index: any) => {
    if (selectedNameFilter === item) {
      setSelectedNameFilter(null);
    } else {
      setSelectedNameFilter(item);
    }
  };
  const handleTimePress = (item: any, index: any) => {
    if (selectedTimeFilter === item) {
      setSelectedTimeFilter(null);
    } else {
      setSelectedTimeFilter(item);
    }
  };

  const [indexItemTag, setIndexItemTag] = useState<any>();
  const route = useRoute();
  const { activeTab }: any = route?.params || {};
  const getFilterData = () => {
    const sortCreatedAt =
      selectedTimeFilter === "filterScreen.new"
        ? "createdAt,asc"
        : selectedTimeFilter === "filterScreen.older"
        ? "createdAt,desc"
        : "";
    const sortName =
      selectedNameFilter === "filterScreen.aToZ"
        ? "name,asc"
        : selectedNameFilter === "filterScreen.zToA"
        ? "name,desc"
        : "";

    return {
      sortCreatedAt,
      sortName,
    };
  };
  useFocusEffect(
    React.useCallback(() => {
      setSelectedNameFilter(null);
      setSelectedTimeFilter(null);
      setSelectedTagFilter(null);
    }, [])
  );
  const handleSort = () => {
    const filterData = getFilterData();
    productStore.setSort(Object.values(filterData));
    productStore.setTagId(indexItemTag);
    navigation.navigate("productScreen" as never);
  };
  const handleSortCategory = () => {
    const filterData = getFilterData();
    productStore.setSortCategory(Object.values(filterData));
    navigation.navigate("productScreen" as never);
  };
  useEffect(() => {
    console.log("first ", indexItemTag);
  }, [indexItemTag]);
  const renderItemTag = ({ item, index }: any) => {
    const isSelected = selectedTagFilter === item;
    const handleTagPress = (idTag: number) => {
      if (isSelected) {
        setSelectedTagFilter(null);
      } else {
        setSelectedTagFilter(item);
        setIndexItemTag(idTag);
      }
    };

    return (
      <TouchableOpacity
        onPress={() => handleTagPress(item.id)}
        key={item.id}
        style={{
          backgroundColor: isSelected ? "#eff8ff" : "#F6F7F9",
          borderRadius: 10,
          borderWidth: isSelected ? 1 : 0,
          borderColor: isSelected ? "#0078D4" : "#c8c8c8",
          flex: 1 / 3,
          marginBottom: 10,
          width: scaleWidth(109),
          height: scaleHeight(38),
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text
          style={{
            color: isSelected ? "#0078D4" : "#747475",
            textAlign: "center",
            fontWeight: "400",
            fontSize: fontSize.size10,
          }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Bộ lọc`}
        style={{ height: scaleHeight(54) }}
      />
      <View style={{ marginHorizontal: scaleWidth(16), flex: 1 }}>
        <View style={{ marginTop: scaleHeight(20) }}>
          <Text style={{ fontSize: fontSize.size14, fontWeight: "500" }}>
            Thời gian tạo
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginTop: scaleHeight(12),
            }}>
            {typeNoti.map((item, index) => {
              const isSelected = selectedTimeFilter === item;
              return (
                <TouchableOpacity
                  onPress={() => handleTimePress(item, index)}
                  key={index}
                  style={{
                    backgroundColor: isSelected ? "#eff8ff" : "#F6F7F9",
                    borderRadius: 10,
                    borderWidth: isSelected ? 1 : 0,
                    borderColor: isSelected ? "#0078D4" : "#c8c8c8",
                    marginRight: scaleWidth(12),
                    width: scaleWidth(165),
                    height: scaleHeight(38),
                    justifyContent: "center",
                  }}>
                  <Text
                    style={{
                      color: isSelected ? "#0078D4" : "#747475",
                      textAlign: "center",
                      fontWeight: "400",
                      fontSize: fontSize.size14,
                    }}
                    tx={item}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={{ marginTop: scaleHeight(20) }}>
          <Text style={{ fontSize: fontSize.size14, fontWeight: "500" }}>
            Theo tên
          </Text>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginTop: scaleHeight(12),
              justifyContent: "space-between",
            }}>
            {typeAZ.map((item, index) => {
              const isSelected = selectedNameFilter === item;
              return (
                <TouchableOpacity
                  onPress={() => handleNamePress(item, index)}
                  key={index}
                  style={{
                    backgroundColor: isSelected ? "#eff8ff" : "#F6F7F9",
                    borderRadius: 10,
                    borderWidth: isSelected ? 1 : 0,
                    borderColor: isSelected ? "#0078D4" : "#c8c8c8",
                    marginRight: scaleWidth(12),
                    width: scaleWidth(165),
                    height: scaleHeight(38),
                    justifyContent: "center",
                  }}>
                  <Text
                    style={{
                      color: isSelected ? "#0078D4" : "#747475",
                      textAlign: "center",
                      fontWeight: "400",
                      fontSize: fontSize.size14,
                    }}
                    tx={item}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {activeTab === "product" && (
          <View>
            <View
              style={{
                marginTop: scaleHeight(20),
                marginBottom: scaleHeight(12),
              }}>
              <Text style={{ fontSize: fontSize.size14, fontWeight: "500" }}>
                Tag
              </Text>
              <View style={{ marginTop: scaleWidth(12) }}>
                <FlatList
                  data={dataTag}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{ gap: 10 }}
                  renderItem={renderItemTag}
                />
              </View>
            </View>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginBottom: scaleWidth(20),
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("productScreen" as never)}
          style={{
            width: scaleWidth(165),
            height: scaleHeight(48),
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "#c8c8c8",
          }}>
          <Text style={{ fontSize: fontSize.size14 }}>Huỷ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={activeTab === "product" ? handleSort : handleSortCategory}
          style={{
            width: scaleWidth(150),
            height: scaleHeight(48),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#0078d4",
          }}>
          <Text style={{ fontSize: fontSize.size14, color: "white" }}>
            Xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};
