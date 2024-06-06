import {
    useFocusEffect,
    useNavigation,
    useRoute,
  } from "@react-navigation/native";
  import React, { FC, useEffect, useState } from "react";
  import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Header, Text } from "../../../components";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { Images } from "../../../../assets";
import { useStores } from "../../../models";
  // import { styles } from "./styles";
  
  export const FilterOrderScreen: FC = (item) => {
    const navigation = useNavigation();
    const {orderStore}= useStores()
    const [typeNoti, setTypeNoti] = useState([
      { label: "filterScreen.new", sort: "createdAt,desc" },
      { label: "filterScreen.older", sort: "createdAt,asc" },
    ]);
    const [typeAZ, setTypeAZ] = useState([
      { label: "filterScreen.aToZ", sort: "name,asc" },
      { label: "filterScreen.zToA", sort: "name,desc" },
    ]);
    const { productStore } = useStores();
    const [dataTag, setData] = useState([]);
    useEffect(() => {
      initData();
    }, []);
    const initData = async () => {
      const data = await productStore.getListTagProduct();
      setData(data.result.data.content);
    };
    const [selectedNameFilter, setSelectedNameFilter] = useState(orderStore.sort[0]);
    const [selectedTimeFilter, setSelectedTimeFilter] = useState(orderStore.sort[1]);
    const [selectedTagFilter, setSelectedTagFilter] = useState(0);
    const handleNamePress = (item: any) => {
      if (selectedNameFilter === item) {
        setSelectedNameFilter(null);
      } else {
        setSelectedNameFilter(item);
      }
    };
    const handleTimePress = (item: any) => {
      if (selectedTimeFilter === item) {
        setSelectedTimeFilter(null);
      } else {
        setSelectedTimeFilter(item);
      }
    };
    const [indexItemTag, setIndexItemTag] = useState<any>();
    const route = useRoute();
    const getFilterData = () => {
      const sortCreatedAt = selectedTimeFilter || "";
      const sortName = selectedNameFilter || "";
      return {
        sortCreatedAt,
        sortName,
      };
    };
    useFocusEffect(
      React.useCallback(() => {
        setSelectedNameFilter(orderStore.sort[1]);
        setSelectedTimeFilter(orderStore.sort[0]);
        setSelectedTagFilter(productStore.tagId);
      }, [])
    );
    
    const handleSort = () => {
      const filterData = getFilterData();
      orderStore.setSort(Object.values(filterData));
      console.log(orderStore.sort)
      productStore.setTagId(indexItemTag);
      console.log(productStore.tagId)
      navigation.navigate("addProductOrder" as never);
    }
    useEffect(() => {
      console.log("first ", indexItemTag);
    }, [indexItemTag]);
    const renderItemTag = ({ item }: any) => {
      const isSelected = selectedTagFilter === item.id;
      const handleTagPress = (idTag: number) => {
        if (isSelected) {
          setSelectedTagFilter(null);
          setIndexItemTag(0);
        } else {
          setSelectedTagFilter(item.id);
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
            <Text tx="filterScreen.filterTime" style={{ fontSize: fontSize.size14, fontWeight: "500" }}/>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginTop: scaleHeight(12),
              }}>
              {typeNoti.map((item, index) => {
                const isSelected = selectedTimeFilter === item.sort;
                return (
                  <TouchableOpacity
                    onPress={() => handleTimePress(item.sort)}
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
                      tx={item.label}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
  
          <View style={{ marginTop: scaleHeight(20) }}>
            <Text tx="filterScreen.filterName" style={{ fontSize: fontSize.size14, fontWeight: "500" }}/>
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                marginTop: scaleHeight(12),
                justifyContent: "space-between",
              }}>
              {typeAZ.map((item, index) => {
                const isSelected = selectedNameFilter === item.sort;
                return (
                  <TouchableOpacity
                    onPress={() => handleNamePress(item.sort)}
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
                      tx={item.label}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
            <View>
              <View
                style={{
                  marginTop: scaleHeight(20),
                  marginBottom: scaleHeight(12),
                }}>
                <Text tx="detailScreen.tag" style={{ fontSize: fontSize.size14, fontWeight: "500" }}/>
                <View style={{ marginTop: scaleWidth(12) }}>
                  <FlatList
                    data={dataTag}
                    keyExtractor={(item : any) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ gap: 10 }}
                    renderItem={renderItemTag}
                  />
                </View>
              </View>
            </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: scaleWidth(20),
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: scaleWidth(165),
              height: scaleHeight(48),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#c8c8c8",
            }}>
            <Text tx="common.cancel" style={{ fontSize: fontSize.size14 }}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSort}
            style={{
              width: scaleWidth(150),
              height: scaleHeight(48),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: "#0078d4",
            }}>
            <Text tx="common.confirm" style={{ fontSize: fontSize.size14, color: "white" }}/>
          </TouchableOpacity>
        </View>
      </View>
      // </View>
    );
  };
  const styles = StyleSheet.create({
    ROOT: {
      backgroundColor: "#Ffffff",
      flex: 1,
    },
  })