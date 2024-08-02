import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Header, Text } from "../../../../app-purchase/components";
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import { useStores } from "../../../models";

export const FilterOrderScreen: FC = (item) => {
  const navigation = useNavigation();
  const { orderStore } = useStores()
  const [typeNoti, setTypeNoti] = useState([
    { label: "filterScreen.new", sort: "createdAt,desc" },
    { label: "filterScreen.older", sort: "createdAt,asc" },
  ]);
  const [typeAZ, setTypeAZ] = useState([
    { label: "filterScreen.aToZ", sort: "name,asc" },
    { label: "filterScreen.zToA", sort: "name,desc" },
  ]);
  const { productStore } = useStores();
  const [dataTag, setDataTag] = useState([]);
  const [sort, setSort] = useState('')
  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    const data = await productStore.getListTagProduct();
    const newArr = data.result.data.content.map((items: any) => {
      return { ...items, isSelect: false }
    })
    const newArr2 = newArr.map((items: any) => {
      const check = orderStore.tagId.some(item => item === items.id)
      if (check === true) {
        return { ...items, isSelect: true }
      } else {
        return { ...items, isSelect: false }
      }
    })
    setDataTag(newArr2);
  };
  useFocusEffect(
    React.useCallback(() => {
      setSort(orderStore.sort);
    }, [])
  );

  const handleSort = () => {
    orderStore.setSort(sort)
    const newArr = dataTag.filter((items: any) => items.isSelect === true)
    const newArr1 = newArr.map((items: any) => { return items.id })
    orderStore.setTagId(newArr1);
    navigation.navigate("addProductOrder" as never);
  }
  const renderItemTag = ({ item }: any) => {
    const handleTagPress = (idTag: number) => {
      const newArr = dataTag.map((items: any) => {
        if (items.id === idTag) {
          return { ...items, isSelect: !items.isSelect }
        } else {
          return items
        }
      })
      setDataTag(newArr)
    };
    return (
      <TouchableOpacity
        onPress={() => handleTagPress(item.id)}
        key={item.id}
        style={{
          backgroundColor: item.isSelect === true ? colors.aliceBlue2 : colors.aliceBlue,
          borderRadius: 10,
          borderWidth: item.isSelect === true ? 1 : 0,
          borderColor: item.isSelect === true ? colors.navyBlue : colors.veryLightGrey,
          flex: 1 / 3,
          marginBottom: 10,
          width: scaleWidth(109),
          height: scaleHeight(38),
          alignItems: "center",
          justifyContent: "center",
        }}>
        <Text
          style={{
            color: item.isSelect === true ? colors.navyBlue : colors.dolphin,
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
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Bộ lọc`}
        style={{ height: scaleHeight(54) }}
      />
      <View style={{ marginHorizontal: scaleWidth(16), flex: 1 }}>
        <View style={{ marginTop: scaleHeight(20) }}>
          <Text tx="filterScreen.filterTime" style={{ fontSize: fontSize.size14, fontWeight: "500" }} />
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginTop: scaleHeight(12),
            }}>
            {typeNoti.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setSort(item.sort)}
                  key={index}
                  style={{
                    backgroundColor: item.sort === sort ? colors.aliceBlue2 : colors.aliceBlue,
                    borderRadius: 10,
                    borderWidth: item.sort === sort ? 1 : 0,
                    borderColor: item.sort === sort ? colors.navyBlue : colors.veryLightGrey,
                    marginRight: scaleWidth(12),
                    width: scaleWidth(165),
                    height: scaleHeight(38),
                    justifyContent: "center",
                  }}>
                  <Text
                    style={{
                      color: item.sort === sort ? colors.navyBlue : colors.dolphin,
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
          <Text tx="filterScreen.filterName" style={{ fontSize: fontSize.size14, fontWeight: "500" }} />
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginTop: scaleHeight(12),
              justifyContent: "space-between",
            }}>
            {typeAZ.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setSort(item.sort)}
                  key={index}
                  style={{
                    backgroundColor: item.sort === sort ? colors.aliceBlue2 : colors.aliceBlue,
                    borderRadius: scaleWidth(margin.margin_10),
                    borderWidth: item.sort === sort ? 1 : 0,
                    borderColor: item.sort === sort ? colors.navyBlue : colors.veryLightGrey,
                    marginRight: scaleWidth(12),
                    width: scaleWidth(165),
                    height: scaleHeight(38),
                    justifyContent: "center",
                  }}>
                  <Text
                    style={{
                      color: item.sort === sort ? colors.navyBlue : colors.dolphin,
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
            <Text tx="detailScreen.tag" style={{ fontSize: fontSize.size14, fontWeight: "500" }} />
            <View style={{ marginTop: scaleWidth(12) }}>
              <FlatList
                data={dataTag}
                keyExtractor={(item: any) => item?.id?.toString()}
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
            borderColor: colors.veryLightGrey,
          }}>
          <Text tx="common.cancel" style={{ fontSize: fontSize.size14 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSort}
          style={{
            width: scaleWidth(150),
            height: scaleHeight(48),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: colors.navyBlue,
          }}>
          <Text tx="common.confirm" style={{ fontSize: fontSize.size14, color: "white" }} />
        </TouchableOpacity>
      </View>
    </View>
    // </View>
  );
};
const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.white,
    flex: 1,
  },
})