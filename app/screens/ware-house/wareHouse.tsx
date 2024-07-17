import { observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";

import React from "react";
import { Styles } from "./style";
import { Header, Text } from "../../components";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { Images } from "../../../assets";
import { styles } from "../account_security/styles";
import { id } from "date-fns/locale";
import en from "../../i18n/en";
import { Style } from "../check-inventory/add-check-inventory/add-check-inventory";
import Modal_Infor_wareHouse from "./modal/modal_Infor_wareHouse";
import Modal_Plus from "./modal/modal_plus";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../navigators";
import { useStores } from "../../models";
import { number } from "mobx-state-tree/dist/internal";

export const wareHouseScreen: FC<
  StackScreenProps<NavigatorParamList, "wareHouse">
> = observer(function WareHouseScreen(props) {
  const [indexTabbar, setIndexTabbar] = useState(en.wareHouse.all);
  const [openInforWareHouse, setOpneInforWareHouse] = useState(false);
  const [openDialogPlus, setOpenDialogPlus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const [myData, setMyData] = useState([]);
  const [idWarehouse, setIdWarehouse] = useState<number>();
  const [lengthAll, setLengthAll] = useState<number>();
  const [lengthIsActive, setLengthIsActive] = useState<number>();
  const [lengthSave, setLengthSave] = useState<number>();
  const navigation = useNavigation();

  const getAPI = useStores();

  const size = useRef(10);

  const dataListTabar = [
    {
      id: "1",
      img: require("../../../assets/Images/ic_WareBook.png"),
      name: en.wareHouse.wareBook,
      onPress: () => {
        //   Alert.alert('ok 1')
        props.navigation.navigate("warehouseBook");
      },
    },
    {
      id: "2",
      img: require("../../../assets/Images/ic_Home.png"),
      name: en.wareHouse.checkWare,
      onPress: () => {
        // Alert.alert('ok 2')

        props.navigation.navigate("inventoryManagenment");
      },
    },
    {
      id: "3",
      img: require("../../../assets/Images/ic_importBook.png"),
      name: en.wareHouse.importBook,
      onPress: () => {
        //   Alert.alert('ok 3')
        props.navigation.navigate("importGoodsBook");
      },
    },
    {
      id: "4",
      img: require("../../../assets/Images/ic_outputBook.png"),
      name: en.wareHouse.outputBook,
      onPress: () => {
        //   Alert.alert('ok 4')
        props.navigation.navigate("GoodsDeliveryBook");
      },
    },
    {
      id: "5",
      img: require("../../../assets/Images/in_In.png"),
      name: en.wareHouse.inTem,
      onPress: () => {
        Alert.alert("ok 5");
        // props.navigation.navigate('inventoryManagenment')
      },
    },
  ];
  const titleTabbar = [
    {
      name: en.wareHouse.all,
      length: lengthAll,
    },
    {
      name: en.wareHouse.isActive,
      length: lengthIsActive,
    },
    {
      name: en.wareHouse.save,
      length: lengthSave,
    },
  ];

  const statusLoadMore = getAPI.warehouseStore.isLoadMoreWarehouse;

  const state = () => {
    if (indexTabbar == en.wareHouse.all) {
      return undefined;
    } else if (indexTabbar == en.wareHouse.isActive) {
      return "APPROVED";
    } else {
      return "ARCHIVED";
    }
  };

  const getListWarehouse = () => {
    getAPI.warehouseStore
      .getListWareHouse(0, size.current, state(), valueSearch, statusLoadMore)
      .then((data) => {
        console.log("data doan", data);
        const dataWarehouse = data?.content.map((item) => {
          return {
            id: item.id,
            code: item.code,
            name: item.name,
            state: item.state,
          };
        });
        setMyData(dataWarehouse);
      });
  };

  const getAllLength = () => {
    getAPI.warehouseStore.getListWareHouse().then((data) => {
      console.log("data length ALL", data?.content);
      setLengthAll(data?.content.length);
      const lengthIsActive = data?.content.filter(
        (item) => item.state === "APPROVED"
      ).length;
      const lengthSave = data?.content.filter(
        (item) => item.state === "ARCHIVED"
      ).length;
      setLengthSave(lengthSave);
      setLengthIsActive(lengthIsActive);
    });
  };

  const getIsActiveLength = () => {
    // getAPI.warehouseStore.getListWareHouse().then((data) => {
    //     console.log('data length isActive', data?.content.length);
    //     setLengthAll(data?.content.length)
    // })
  };

  const handleRefresh = () => {
    try {
      setRefreshing(true);

      // Gọi API hoặc thực hiện các tác vụ cần thiết để lấy dữ liệu mới
      getListWarehouse();
      // Cập nhật state của danh sách dữ liệu
      // setmyDataSlectClient(newData);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (!isLoadingMore) {
      getAPI.warehouseStore.setIsLoadMoreWarehouse(true);
      setIsLoadingMore(true);
      // console.log('====================================');
      console.log("value loading", isLoadingMore);
      // console.log('====================================');
      size.current = size.current + 2;
      getListWarehouse();
      console.log("doandev test");

      setTimeout(() => {
        setIsLoadingMore(false);
      }, 3000);
    }
  };
  const handleSearch = () => {
    getListWarehouse();
  };

  useEffect(() => {
    getAllLength();
    getIsActiveLength();
    getListWarehouse();
  }, [props.navigation, state()]);

  // console.log('====================================');
  // console.log(dataListTabar[0].img);
  // console.log('====================================');
  interface ItemList {
    id: number;
    code: string;
    name: string;
    state: string;
    onClick: () => void;
  }

  const ItemListWareHouse: React.FC<{ item: ItemList }> = ({ item }) => {
    return (
      <TouchableOpacity
        style={Styles.itemList}
        onPress={() => {
          setIdWarehouse(item.id);
        }}>
        <Images.ic_Brick
          style={{
            width: scaleWidth(40),
            height: scaleWidth(40),
            borderRadius: scaleHeight(8),
            marginRight: scaleWidth(6),
          }}
        />
        <View style={[Styles.flexRow, { flex: 2, alignItems: "center" }]}>
          <View>
            <Text style={Styles.txtItemWareHouse}>{item.code}</Text>
            <Text style={{ fontSize: scaleWidth(10), fontWeight: "500" }}>
              {item?.name}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: scaleWidth(8),
                fontWeight: "400",
                color: item?.state === "APPROVED" ? colors.navyBlue : "#9EA6B3",
              }}>
              {item?.state === "APPROVED"
                ? en.wareHouse.isActive
                : en.wareHouse.save}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  interface Item {
    id: any;
    img: any;
    name: string;
    onPress: () => void;
  }
  const ItemTabar = ({ item }: { item: Item }) => {
    return (
      <TouchableOpacity
        style={Styles.bodyItemTabar}
        onPress={() => {
          // console.log('====================================');
          // console.log('doann');
          // console.log('====================================');
          item.onPress();
        }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={item.img}
            style={{ width: scaleWidth(16), height: scaleHeight(16) }}
          />
          <Text
            style={{
              marginTop: scaleHeight(7),
              fontSize: scaleWidth(10),
              textAlign: "center",
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.main}>
      <Header
        LeftIcon={Images.back}
        style={{ height: scaleHeight(52) }}
        leftText="wareHouse.wareHouse"
        RightIcon1={Images.ic_QR}
        RightIcon2={Images.icon_search}
        RightIcon={Images.icon_funnel}
        headerInput={true}
        handleOnSubmitSearch={() => {
          handleSearch();
        }}
        onSearchValueChange={(txt: any) => setValueSearch(txt)}
        btnRightStyle={{
          width: scaleWidth(30),
          height: scaleHeight(30),
          marginRight: -10,
        }}
        onLeftPress={() => props.navigation.goBack()}
      />
      <View></View>
      <View style={Styles.body}>
        <FlatList
          data={dataListTabar}
          renderItem={({ item }) => <ItemTabar item={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={Styles.bodyContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: scaleHeight(12),
          }}>
          <View style={{ marginRight: scaleWidth(8) }}>
            <Images.squaresFour />
          </View>
          {titleTabbar.map((item, index) => {
            return (
              <TouchableOpacity
                style={
                  indexTabbar === item.name
                    ? Styles.styleItemTabarIsclick
                    : Styles.styleItemTabar
                }
                key={item.name}
                onPress={() => {
                  console.log(item.name);

                  setIndexTabbar(item?.name);
                }}>
                <Text
                  style={{
                    color:
                      indexTabbar === item.name
                        ? colors.palette.navyBlue
                        : colors.palette.dolphin,
                    fontSize: fontSize.size10,
                  }}>
                  {item?.name} ({item?.length})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FlatList
          style={{}}
          data={myData}
          renderItem={({ item }) => <ItemListWareHouse item={item} />}
          keyExtractor={(item: any) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={() => handleLoadMore()}
          onEndReachedThreshold={0.3}
          ListFooterComponent={() => (
            <View>
              {myData?.length !== 1 ? (
                <>{isLoadingMore && <ActivityIndicator />}</>
              ) : null}
            </View>
          )}
        />
        <TouchableOpacity
          style={Styles.btnPlus}
          onPress={() => setOpenDialogPlus(!openDialogPlus)}>
          <Images.icon_plus style={{ opacity: openDialogPlus ? 0 : 1 }} />
        </TouchableOpacity>

        <Modal_Infor_wareHouse
          isVisible={openInforWareHouse}
          setIsVisible={() => setOpneInforWareHouse(!openInforWareHouse)}
        />

        <Modal_Plus
          // isVisible={openDialogPlus}
          setIsVisible={() => navigation.navigate("warehouse" as never)}
        />
      </View>
    </View>
  );
});
