import { observer } from "mobx-react-lite";
import { FC, useState } from "react";

import React from "react";
import { Styles } from "./style";
import { Header, Text } from "../../components";
import { Alert, FlatList, Image, TouchableOpacity, View } from "react-native";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../theme";
import { Images } from "../../../assets";
import { styles } from "../account_security/styles";
import { id } from "date-fns/locale";
import en from "../../i18n/en";
import { Style } from "../check-inventory/add-check-inventory/add-check-inventory";
import Modal_Infor_wareHouse from "./modal/modal_Infor_wareHouse";
import Modal_Plus from "./modal/modal_plus";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorParamList } from "../../navigators";

export const wareHouseScreen: FC<
  StackScreenProps<NavigatorParamList, "wareHouse">
> = observer(function WareHouseScreen(props) {
  const [titleTabar, setTitleTabar] = useState(["Tất cả", "Apodio", "Marvel"]);
  const [indexTabbar, setIndexTabbar] = useState(0);
  const [openInforWareHouse, setOpneInforWareHouse] = useState(false);
  const [openDialogPlus, setOpenDialogPlus] = useState(false);
  const navigation = useNavigation();

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

  const dataListWareHouse = [
    {
      id: "SP001",
      name: "Gạch 36815",
      quantity: "4.100",
      price: "2.300.000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1x3RY8xZF5veaCqJs3J-DNjHpxLXu9OjbHCOhDTfKQ&s",
    },
    {
      id: "SP002",
      name: "Gạch 36815",
      quantity: "4.100",
      price: "2.300.000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1x3RY8xZF5veaCqJs3J-DNjHpxLXu9OjbHCOhDTfKQ&s",
    },
    {
      id: "SP003",
      name: "Gạch 36815",
      quantity: "4.100",
      price: "2.300.000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1x3RY8xZF5veaCqJs3J-DNjHpxLXu9OjbHCOhDTfKQ&s",
    },
    {
      id: "SP004",
      name: "Gạch 36815",
      quantity: "4.100",
      price: "2.300.000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1x3RY8xZF5veaCqJs3J-DNjHpxLXu9OjbHCOhDTfKQ&s",
    },
    {
      id: "SP005",
      name: "Gạch 36815",
      quantity: "4.100",
      price: "2.300.000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1x3RY8xZF5veaCqJs3J-DNjHpxLXu9OjbHCOhDTfKQ&s",
    },
    {
      id: "SP006",
      name: "Gạch 36815",
      quantity: "4.100",
      price: "2.300.000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1x3RY8xZF5veaCqJs3J-DNjHpxLXu9OjbHCOhDTfKQ&s",
    },
    {
      id: "SP007",
      name: "Gạch 36815",
      quantity: "4.100",
      price: "2.300.000",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM1x3RY8xZF5veaCqJs3J-DNjHpxLXu9OjbHCOhDTfKQ&s",
    },
  ];

  // console.log('====================================');
  // console.log(dataListTabar[0].img);
  // console.log('====================================');

  const ItemListWareHouse = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          padding: scaleHeight(6),
          borderRadius: scaleWidth(8),
          backgroundColor: "#FFFFFF",
          marginBottom: scaleHeight(12),
          alignItems: "center",
        }}>
        <Image
          source={{ uri: item.img }}
          style={{
            width: scaleWidth(40),
            height: scaleHeight(40),
            borderRadius: scaleHeight(8),
            marginRight: scaleWidth(6),
          }}
        />
        <View style={[Styles.flexrow, { flex: 2 }]}>
          <View>
            <Text
              style={{ fontSize: scaleWidth(10), fontFamily: "Inter-Bold" }}>
              {item.name}
            </Text>
            <Text style={Styles.txtItemWareHouse}>{item.id}</Text>
          </View>
          {item.id !== "SP001" ? (
            <TouchableOpacity
              style={Styles.btnTurnOnInvetory}
              onPress={() => setOpneInforWareHouse(!openInforWareHouse)}>
              <Text
                style={{ fontSize: scaleWidth(12) }}
                tx="wareHouse.turnOnInventory"
              />
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={[Styles.txtItemWareHouse, { textAlign: "right" }]}>
                SL: {item.quantity}
              </Text>
              <Text
                style={{
                  fontSize: scaleWidth(10),
                  fontFamily: "Inter-Bold",
                  color: colors.palette.radicalRed,
                }}>
                {item.price}
              </Text>
            </View>
          )}
        </View>
      </View>
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginRight: scaleWidth(8) }}>
            <Images.squaresFour />
          </View>
          {titleTabar.map((item, index) => {
            return (
              <TouchableOpacity
                style={
                  indexTabbar === index
                    ? Styles.styleItemTabarIsclick
                    : Styles.styleItemTabar
                }
                key={item}
                onPress={() => {
                  console.log(index);

                  setIndexTabbar(index);
                }}>
                <Text
                  style={{
                    color:
                      indexTabbar === index
                        ? colors.palette.navyBlue
                        : colors.palette.dolphin,
                    fontSize: 10,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={Styles.section}>
          <View style={Styles.headerSection}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}>
              <Text style={{ width: "23%" }} />

              <Text style={Styles.survivalValue} tx="wareHouse.survivalValue" />
              <View
                style={{
                  width: "23%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}>
                <Images.ic_Chartbar />
                <Text
                  style={{
                    fontSize: scaleWidth(12),
                    color: colors.palette.navyBlue,
                  }}
                  tx="wareHouse.report"
                />
              </View>
            </View>

            <Text
              style={{ color: colors.palette.malachite, fontWeight: "600" }}>
              0
            </Text>
          </View>

          <View style={Styles.line} />

          <View style={Styles.bottomSection}>
            <View
              style={[
                Styles.bottomSectionLeft,
                {
                  borderEndWidth: 1,
                  borderEndColor: "#E7EFFF",
                },
              ]}>
              <Text style={Styles.bottomTxt} tx="wareHouse.idProduct" />

              <Text style={{ fontSize: scaleWidth(16), fontWeight: "600" }}>
                6
              </Text>
            </View>

            <View style={Styles.bottomSectionLeft}>
              <Text style={Styles.bottomTxt} tx="wareHouse.quantity" />

              <Text style={{ fontSize: scaleWidth(16), fontWeight: "600" }}>
                4.111
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          data={dataListWareHouse}
          renderItem={({ item }) => <ItemListWareHouse item={item} />}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={Styles.btnPlus}
          onPress={() => navigation.navigate("warehouse" as never)}>
          <Images.icon_plus style={{ opacity: openDialogPlus ? 0 : 1 }} />
        </TouchableOpacity>

        <Modal_Infor_wareHouse
          isVisible={openInforWareHouse}
          setIsVisible={() => setOpneInforWareHouse(!openInforWareHouse)}
        />

        <Modal_Plus
          //   isVisible={openDialogPlus}
          setIsVisible={() => navigation.navigate("warehouse" as never)}
        />
      </View>
    </View>
  );
});
