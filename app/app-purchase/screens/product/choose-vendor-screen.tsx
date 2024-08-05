import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  ImageBackground,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Svgs } from "../../../../assets/svgs";
import { Header } from "../../../components/header/header";
import { TextField } from "../../../components/text-field/text-field";
import { Text } from "../../../components/text/text";
import { useStores } from "../../models";
import {
  colors,
  fontSize,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../theme";
import Images from "../../../../assets/index";

export const ChooseVendorScreen: FC = () => {
  const navigation = useNavigation();
  const [arrVendor, setArrVendor] = useState<any>([]);
  const [searchText, setSearchText] = useState("");
  const { vendorStore, productStore } = useStores();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const route = useRoute();
  const { listIds, mode, vendorId }: any = route?.params || {};
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const getListVendor = async (vendorActivated: boolean, search?: any) => {
    const vendorResult = await productStore.getListVendor(
      page,
      search
    );
    console.log("vendorResult----------------", vendorResult.response.data.content);
    setTotalPages(vendorResult.response.data.totalPages);
    if (vendorResult && vendorResult.kind === "ok") {
      if (page === 0) {
        if(vendorId === undefined){
          setArrVendor(vendorResult.response.data.content);
        }else{
          const firstItem = vendorResult.response.data.content.filter((item: {id: number}) => item.id === vendorId)
          const newArr = vendorResult.response.data.content.filter((item: {id: number}) => item.id !== vendorId)
          setArrVendor(firstItem.concat(newArr))
        }
      } else {
        setArrVendor((prevProducts: any) => [
          ...prevProducts,
          ...vendorResult.response.data.content,
        ]);
      }
      // setArrVendor(data.content)
      if (!isRefreshing) {
        if (vendorId != undefined && listIds != undefined) {
          setSelectedIds([...new Set(listIds.concat(vendorId))] as any)
        }
        if (vendorId == undefined && listIds != undefined) {
          setSelectedIds(listIds)
        }
        if (vendorId != undefined && listIds == undefined) {
          setSelectedIds([vendorId])
        }
        if (vendorId == undefined && listIds == undefined) {
          setSelectedIds([])
        }
      }
    } else {
      console.error("Failed to fetch list unit:", vendorResult);
    }
  };
  const handleEndReachedCategory = () => {
    if (page < totalPages - 1 ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    getListVendor(true, searchText);
  }, [searchText, page]);
  const RadioButton = ({ selected, onPress, id }: any) => (
    <TouchableOpacity onPress={onPress}>
      {selected ? (
        <View style={{ opacity: id === vendorId ? 0.5 : 1 }} >
          <Svgs.icon_checkCircle
            width={scaleWidth(30)}
            height={scaleHeight(30)}
          />
        </View>
      ) : (
        <Svgs.ic_plusCircle width={scaleWidth(30)} height={scaleHeight(30)} />
      )}
    </TouchableOpacity>
  );

  const refreshVendor = async () => {
    setIsRefreshing(true);
    setPage(0);
    setSearchText("");
    setIsRefreshing(false);
  };

  const handleSearch = (value: string) => {
    const newValue = value !== null ? value.toString() : "";
    setSearchText(newValue);
  };
  const handleSubmitSearch = (value: any) => {
    setPage(0);
    setSearchText(value.nativeEvent.text)
  };
  const handleBtn = () => {
    navigation.navigate({name: "ProductCreateScreen", params: { selectedIds, vendorId }} as never);
  };
  const handleBtnEditing = () => {
    navigation.navigate({name: "ProductEditScreen", params: { selectedIds }} as never);
  };
  const handleSelectOption = (groupIndex: number, id: number) => {
    const isSelected = selectedIds.includes(id);
    if (isSelected) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };
  const selectedCount = selectedIds ? selectedIds.length : 0;

  const renderNCCItem = ({ item, index }: any) => {
    const key = item.id ? item.id.toString() : `index-${index}`;
    return (
      <View
        key={key}
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: scaleWidth(375),
          paddingHorizontal: scaleWidth(16),
          paddingVertical: scaleHeight(8),
          backgroundColor: "white",
          marginBottom: 1.5,
          justifyContent: "space-between",
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ImageBackground
            style={{ width: scaleWidth(40), height: scaleHeight(45) }}
            imageStyle={{
              borderRadius: 20,
            }}
            source={Images.noImages}>
            <FastImage
              style={{
                width: scaleWidth(40),
                height: scaleHeight(45),
                borderRadius: 20,
              }}
              source={{
                uri: `${item.avatarUrl}`,
                cache: FastImage.cacheControl.immutable,
              }}
              defaultSource={Images.noImages}
            />
          </ImageBackground>
          <View style={{ marginHorizontal: 6, maxWidth: scaleWidth(230) }}>
            <Text numberOfLines={2} style={{ fontSize: fontSize.size10, color: item.id === vendorId ? colors.pigmentGreen : colors.nero }}>
              {item.code} - {item.name}
            </Text>
            <Text
              style={{
                fontSize: fontSize.size10,
                color: colors.palette.dolphin,
              }}>
              {item.phoneNumber}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (item.id !== vendorId) {
              handleSelectOption(1, item.id);
            }
          }}
          key={item.id}>
          <RadioButton
            selected={selectedIds.includes(item.id)}
            onPress={() => {
              if (item.id !== vendorId) {
                handleSelectOption(1, item.id);
              }
            }}
            id={item.id}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerTx="vendorScreen.header"
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={{
          paddingLeft: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
        titleStyle={{ fontSize: fontSize.size16, fontWeight: "700" }}
      />
      <View style={styles.ROOT}>
        <View
          style={{
            marginHorizontal: scaleWidth(16),
            marginTop: scaleHeight(10),
          }}>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                keyboardType={null}
                style={{
                  backgroundColor: colors.white,
                }}
                inputStyle={{ fontSize: fontSize.size12, fontWeight: "500" }}
                value={value}
                onBlur={onBlur}
                showRightIcon={false}
                RightIconClear={Svgs.icon_delete2}
                error={errors?.productName?.message}
                onChangeText={(text)=>onChange(text)}
                enterKeyHint="search"
                onSubmitEditing={handleSubmitSearch}
                enablesReturnKeyAutomatically
                placeholderTx="chooseSupplierScreen.placeholderSearch"
                RightIcon={Svgs.ic_searchBlue}
              />
            )}
            name="Search"
          />
        </View>
        <View style={{ flex: 1, marginBottom: scaleHeight(10) }}>
          <FlatList
            data={arrVendor}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshVendor}
                title="ok"
              />
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleEndReachedCategory}
            onEndReachedThreshold={0.5}
            numColumns={1}
            columnWrapperStyle={null}
            renderItem={renderNCCItem}
          />
        </View>
        <TouchableOpacity
          onPress={mode === "edit" ? handleBtnEditing : handleBtn}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 8,
            paddingHorizontal: scaleWidth(16),
            paddingVertical: scaleHeight(11),
            backgroundColor: colors.palette.navyBlue,
            bottom: Platform.OS === "ios" ? scaleHeight(20) : scaleHeight(5),
            marginHorizontal: scaleWidth(16),
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: scaleWidth(10) }}>
              <View
                style={{
                  backgroundColor: "red",
                  alignItems: "center",
                  width: scaleWidth(14),
                  height: scaleHeight(14),
                  borderRadius: 30,
                  position: "absolute",
                  zIndex: 1,
                  right: scaleWidth(1),
                  top: 0,
                }}>
                <Text
                  style={{
                    fontSize: fontSize.size9,
                    fontWeight: "500",
                    color: colors.white,
                  }}>
                  {selectedCount}
                </Text>
              </View>
              <Svgs.ic_shopping
                width={scaleWidth(20)}
                height={scaleHeight(20)}
                style={{ marginRight: 6, marginTop: 2 }}
              />
            </View>
            <Text style={{ color: "white", fontSize: fontSize.size14 }}>
              {selectedCount}{" "}
              <Text
                style={{ color: "white", fontSize: fontSize.size14 }}
                tx="vendorScreen.vendor"
              />
            </Text>
          </View>
          <View>
            <Text
              tx="common.continue"
              style={{ color: "white", fontSize: fontSize.size14 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: colors.white,
    flex: 1,
  },
  rowBtnTab: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 12,
  },
  rowNotiType: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(12),
  },

  buttonProduct: {
    width: scaleWidth(169),
    paddingVertical: 8,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButtonCategory: {
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: -2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.palette.dolphin,
    textAlign: "center",
  },
  activeButtonText: {
    color: colors.navyBlue,
  },
  discount: {
    backgroundColor: colors.red,
    alignItems: "center",
    justifyContent: "center",
    width: scaleWidth(32),
    height: scaleHeight(16),
    position: "absolute",
    zIndex: 10,
    // borderBottomEndRadius: 5,
    borderBottomLeftRadius: 12,
    borderTopRightRadius: 12,
    // top : 10,
    right: scaleHeight(0),
  },
  btnBottom: {
    // bottom: scaleHeight(40),
    // left: scaleWidth(16),
    // // position: "absolute",
    // right: scaleWidth(16),
    borderRadius: 8,
    marginHorizontal: scaleWidth(16),
    marginBottom: Platform.OS == "ios" ? scaleHeight(45) : scaleHeight(40),
    backgroundColor: "white",
    borderWidth: 0,
  },
  textButton: {
    color: palette.white,
    fontSize: fontSize.size14,
    fontWeight: "700",
    lineHeight: 24,
    // paddingLeft: scaleWidth(15),
    textAlign: "center",
    display: "flex",
    // flexWrap: 'wrap',
  },
  radioButton: {
    width: scaleWidth(18),
    height: scaleHeight(18),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioButtonSelected: {
    backgroundColor: colors.palette.navyBlue,
    borderWidth: 0,
  },
  radioButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: fontSize.size10,
  },
});
