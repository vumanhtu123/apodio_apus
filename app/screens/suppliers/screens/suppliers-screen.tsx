import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { FlatList, Platform, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Images } from "../../../../assets/index";
import { Header } from "../../../components/header/header";
import { Text } from "../../../components/text/text";
import {
  colors,
  fontSize,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { renderItemSupplier2 } from "../component/item-list-supplier";
import { styles } from "../styles/styles";
import { dataSuppliers } from "../styles/data";
import { ScrollView } from "react-native-gesture-handler";
import SelectFilterModal from "../../product/component/modal-select-filter";
import ModalCreateSuppliers from "../component/modal-create-supplier";

export const SuppliersScreen: FC = () => {
  const navigation = useNavigation();
  const [typeNoti, setTypeNoti] = useState(["Tất cả", "Hà Nội"]);
  const [indexItem, setIndexItem] = useState(0);
  const [btnTab, setBtnTab] = useState(["Nhà cung cấp", "Nhóm NCC"]);
  const [activeTab, setActiveTab] = useState("product");
  const [isVisible, setIsVisible] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [showCategory, setShowCategory] = useState(false);
  const [showTextCategory, setShowTextCategory] = useState<string>(" Danh mục");
  const handleTabPress = (tab: any) => {
    setActiveTab(tab);
  };
  //   const handleOpenSearch = () => {
  //     setOpenSearch(openSearch);
  //   };
  const data = [
    { name: "tuvm" },
    { name: "tuvm1" },
    { name: "tuvm2" },
    { name: "tuvm3" },
    { name: "tuvm4" },
  ];

  const openFilter = () => {};

  useEffect(() => {
    setDataCategory(data);
  }, []);

  const openTypeFilter = () => {
    setIsVisible(!true);
  };
  return (
    <View style={styles.ROOT}>
      <Header
        onRightPress={openTypeFilter}
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Nhà cung cấp`}
        RightIcon={Images.icon_funnel}
        RightIcon1={isVisible ? Images.icon_close : Images.search}
        RightIcon2={isVisible ? Images.icon_close : Images.search}
        headerInput={isVisible}
        onRightPress1={() => navigation.navigate("filterScreen" as never)}
        widthRightIcon={scaleWidth(16)}
        heightRightIcon={scaleHeight(16)}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={{
          paddingLeft: 5,
          flexDirection: "row",
          alignItems: "center",
        }}
        titleStyle={{ fontSize: fontSize.size16, fontWeight: "700" }}
      />
      <View style={styles.ROOT}>
        <View style={styles.rowBtnTab}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#E6E7EA",
              borderRadius: 8,
              padding: 3,
              marginTop: 20,
              justifyContent: "center",
            }}>
            {btnTab.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    handleTabPress(index === 0 ? "product" : "category")
                  }
                  key={index}
                  style={[
                    styles.buttonProduct,
                    activeTab === (index === 0 ? "product" : "category") &&
                      styles.activeButton,
                  ]}>
                  <Text
                    style={[
                      styles.buttonText,
                      activeTab === (index === 0 ? "product" : "category") &&
                        styles.activeButtonText,
                    ]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            setShowCategory(true);
          }}
          style={{
            borderRadius: 4,
            paddingHorizontal: 7,
            paddingVertical: 8,
            marginVertical: 12,
            alignSelf: "flex-end",
            borderWidth: 1,
            borderColor: "#0078D4",
            flexDirection: "row",
            marginRight: 20,
          }}>
          <Text
            // tx="productScreen.directory"
            text={showTextCategory}
            style={{
              color: "#0078D4",
              textAlign: "center",
              fontWeight: "400",
              fontSize: fontSize.size10,
              marginRight: scaleWidth(10),
            }}
          />
          <Images.iconDownBlue
            width={scaleWidth(14)}
            height={scaleHeight(14)}
          />
        </TouchableOpacity>
        <Modal
          isVisible={showCategory}
          onBackdropPress={() => setShowCategory(false)}
          backdropColor=""
          animationIn={"fadeIn"}
          animationOut={"fadeOut"}
          style={{
            position: "absolute",
            right: 0,
            top: Platform.OS === "ios" ? scaleHeight(185) : scaleHeight(135),
          }}>
          <ScrollView
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: colors.palette.veryLightGrey,
              height: scaleHeight(144),
              width: scaleWidth(170),
              backgroundColor: colors.palette.neutral100,
            }}>
            {dataCategory.map((item: any) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setShowCategory(false);
                    setShowTextCategory(item.name);
                  }}
                  style={{
                    paddingVertical: scaleHeight(padding.padding_12),
                    paddingHorizontal: scaleWidth(padding.padding_12),
                    //   backgroundColor:
                    //     selectedCategory === item.id
                    //       ? colors.palette.navyBlue
                    //       : colors.palette.neutral100,
                  }}>
                  <Text
                    text={item.name}
                    style={{
                      fontWeight: "500",
                      fontSize: fontSize.size10,
                      // color:
                      //   selectedCategory === item.id
                      //     ? colors.palette.neutral100
                      //     : colors.palette.nero,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Modal>
        <View style={{ flex: 1 }}>
          <FlatList
            data={dataSuppliers}
            showsVerticalScrollIndicator={false}
            // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshNotifications} title="ok" />}
            keyExtractor={(item) => item.id.toString()}
            // onEndReached={handleEndReached}
            onEndReachedThreshold={0.8}
            // ListFooterComponent={renderFooter}
            numColumns={2}
            columnWrapperStyle={null}
            renderItem={renderItemSupplier2}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          console.log("abc");
          navigation.navigate("orderDetailsSupplier" as never);
        }}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 30,
          position: "absolute",
          paddingHorizontal: scaleWidth(18),
          paddingVertical: scaleHeight(8),
          backgroundColor: colors.palette.navyBlue,
          bottom: Platform.OS === "ios" ? scaleHeight(20) : scaleHeight(5),
          right: scaleWidth(16),
        }}>
        <Images.icon_plus
          width={scaleWidth(16)}
          height={scaleHeight(16)}
          style={{ marginRight: 6, marginTop: 2 }}
        />
        <Text style={{ color: "white", fontSize: fontSize.size14 }}>
          Thêm nhà cung cấp
        </Text>
      </TouchableOpacity>
      {/* <SelectFilterModal
        isVisible={true}
        setIsVisible={setIsVisible}
        setType={setTypeFilter}
      /> */}
      {/* <ModalCreateSuppliers
        isVisible={true}
        setIsVisible={setIsVisible}
        setType={setTypeFilter}
      /> */}
      {/* <ModalCreateSuppliers isVisible={true} /> */}
    </View>
  );
};
