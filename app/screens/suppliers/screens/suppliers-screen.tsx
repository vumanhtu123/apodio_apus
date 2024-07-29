import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Platform, RefreshControl, TouchableOpacity, View } from "react-native";
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
import { styles } from "../styles/styles";
import { dataSuppliers } from "../styles/data";
import { ScrollView } from "react-native-gesture-handler";
import SelectFilterModal from "../../product/component/modal-select-filter";
import ModalCreateSuppliers from "../component/modal-create-supplier";
import { RenderItemSupplierGrid, RenderItemSupplierList } from "../component/item-list-supplier";
import { useStores } from "../../../models";
import { UserStatus } from "../../../utils/const";
import ListSupplierScreen from "./list-supplier-screen";

export const SuppliersScreen: FC = () => {
  const navigation = useNavigation();
  const [typeNoti, setTypeNoti] = useState(["Tất cả", "Hà Nội"]);
  const [btnTab, setBtnTab] = useState(["Nhà cung cấp", "Nhóm NCC"]);
  const [activeTab, setActiveTab] = useState("product");
  const [isVisibleOpenSearch, setIsVisibleOpenSearch] = useState(false);
  const [isVisible, setIsVisible] = useState(false)
  const [isVisibleAddSupplier, setIsVisibleAddSupplier] = useState(false)
  const [statusHidden, setStatusHidden] = useState(true)
  const [valueIsLoadMore, setValueIsLoadMore] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState<boolean>()
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [showCategory, setShowCategory] = useState(false);
  const [showTextCategory, setShowTextCategory] = useState<string>(" Danh mục");
  const [valuerSearch, setValuerSearch] = useState('')
  const { supplierStore } = useStores();
  const [myDataSupplier, setMyDataSupplier] = useState<{}[]>([])
  const [myDataSupplierGroup, setMyDataSupplierGroup] = useState<{}[]>([])


  const page = useRef(0)
  const size = useRef(13)
  const totalPage = useRef<number | undefined>()
  const totalElement = useRef<number>()
  const [isRefreshing, setIsRefreshing] = useState(false)


  const pageSupplier = useRef(0)
  const sizeSupplier = useRef(13)


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

  const openTypeFilter = () => {
    setStatusHidden(!statusHidden)
  };

  const handleIsAddSupplier = () => {
    setIsVisibleAddSupplier(!isVisibleAddSupplier)
  }
  console.log("value list", statusHidden);



  console.log("33333", myDataSupplier);

  const getListSupplierGroup = async () => {
    const ListSupplierGroup = await supplierStore.getListSupplierGroup(size.current, page.current, valuerSearch, valueIsLoadMore)

    if (ListSupplierGroup?.content != null) {
      if (page.current == 0) {
        setMyDataSupplierGroup(ListSupplierGroup.content)
      } else {
        setMyDataSupplierGroup((data) =>
          [...data,
          ...ListSupplierGroup.content]
        )
      }
      totalPage.current = ListSupplierGroup.totalPages
      totalElement.current = ListSupplierGroup.totalElements
    }

  }
  const handleRefresh = () => {
    try {
      setIsRefreshing(true)
      page.current = 0
      getListSupplierGroup()
    } catch (error) {
      console.log("Refresh Error", error);
    }

  }


  const handleLoadMore = () => {
    setValueIsLoadMore(true)
    setIsLoadMore(true)
    try {
      if (page.current < Number(totalPage.current)) {

        page.current = page.current + 1

        getListSupplierGroup()
      }
    } catch (error) {
      console.log("Load more error", error);

    } finally {
      // setIsLoadMore(false)
    }
  }



  useEffect(() => {
    // console.log("length data ", myDataSupplier.length);

    if (myDataSupplierGroup.length == totalElement.current) {
      setIsLoadMore(false)

    } else {
      setIsLoadMore(false)
    }

  }, [myDataSupplierGroup.length])

  useEffect(() => {
    setIsRefreshing(false)
  }, [myDataSupplierGroup, myDataSupplier])

  useEffect(() => {
    getListSupplierGroup()

    // setDataCategory(data);
  }, []);
  console.log("value load more 1", isLoadMore);
  console.log("value search", valuerSearch);


  return (
    <View style={styles.ROOT}>
      <Header
        onRightPress={() => openTypeFilter()}
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Nhà cung cấp`}
        RightIcon={statusHidden ? Images.ic_outline_list : Images.ic_grid}
        RightIcon1={isVisible ? Images.icon_close : Images.icon_funnel}
        RightIcon2={isVisible ? Images.icon_close : Images.search}
        headerInput={isVisibleOpenSearch}
        onSearchValueChange={(txt: any) => { setValuerSearch(txt) }}
        handleOnSubmitSearch={() => {
          page.current = 0
          getListSupplierGroup()
        }}
        onRightPress1={() => navigation.navigate("filterScreen" as never)}
        onRightPress2={() => setIsVisibleOpenSearch(!isVisibleOpenSearch)}
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
            style={styles.StyleTab}>
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
          style={styles.btnDropDowCategory}>
          <Text
            // tx="productScreen.directory"
            text={showTextCategory}
            style={styles.textDropDow}
          />
          <Images.iconDownBlue
            width={scaleWidth(14)}
            height={scaleHeight(14)}
          />
        </TouchableOpacity>
        {/* modal dropDown   */}
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

        {
          activeTab == "product" ?
            <ListSupplierScreen valueSearch={valuerSearch} />
            :
            <View style={{ flex: 1 }}>
              <FlatList

                data={myDataSupplierGroup}
                showsVerticalScrollIndicator={false}
                // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshNotifications} title="ok" />}
                keyExtractor={(item, index) => item.id.toString() + index}
                // onEndReached={handleEndReached}
                // ListFooterComponent={renderFooter}
                numColumns={statusHidden ? 1 : 2}
                key={statusHidden ? 'grid' : 'list'}
                columnWrapperStyle={null}
                renderItem={({ item }) => statusHidden ? <RenderItemSupplierList item={item} /> : <RenderItemSupplierGrid item={item} />}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
                ListFooterComponent={() => {
                  return (
                    <View>
                      {
                        isLoadMore ? null
                          : <ActivityIndicator />
                      }
                    </View>
                  )
                }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}

              />
            </View>
        }

      </View>

      <TouchableOpacity
        onPress={() => {
          console.log("abc");
          navigation.navigate("orderDetailsSupplier" as never);
        }}
        style={styles.btnAdd}>
        <Images.icon_plus
          width={scaleWidth(16)}
          height={scaleHeight(16)}
          style={{ marginRight: 6, marginTop: 2 }}
        />
        <Text style={{ color: "white", fontSize: fontSize.size14 }}
          tx={"NCCScreen.addSupplier"}
        />

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
