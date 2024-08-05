import { StackScreenProps } from "@react-navigation/stack";
import { FC, useState } from "react";
import { NavigatorParamList } from "../../../navigators";
import { observer } from "mobx-react-lite";

import React from "react";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Svgs } from "../../../../../assets/svgs";
import { Header, Text } from "../../../components";
import en from "../../../i18n/en";

export const CreateImportGoods: FC<
  StackScreenProps<NavigatorParamList, "createImportGoods">
> = observer(function createImportGoods(props) {
  const [titleTabar, setTitleTabar] = useState(["Tất cả", "Apodio", "Marvel"]);
  const [indexTabbar, setIndexTabbar] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [sellectTab, setSellectTab] = useState("product");

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
  const ItemListExprortGoods = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          padding: scaleHeight(6),
          borderRadius: scaleWidth(8),
          backgroundColor: colors.white,
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
          {/* để cho item đầu tiên giống design */}
          {item.id === "SP001" ? (
            <View style={{ justifyContent: "space-between", height: "100%" }}>
              <Text
                style={{ fontSize: scaleWidth(10), fontFamily: "Inter-Bold" }}>
                {item.name}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={Styles.txtItemWareHouse}>{item.id}</Text>
                <Text
                  style={{
                    fontSize: scaleWidth(8),
                    marginHorizontal: scaleWidth(6),
                    color: colors.solitude2,
                  }}>
                  |
                </Text>
                <Text style={[Styles.txtItemWareHouse, { textAlign: "right" }]}>
                  {en.ImprotGoodsBook.still}: {item.quantity}{" "}
                </Text>
              </View>
            </View>
          ) : (
            <View style={{}}>
              <Text
                style={{ fontSize: scaleWidth(10), fontFamily: "Inter-Bold" }}>
                {item.name}
              </Text>
              <Text style={Styles.txtItemWareHouse}>{item.id}</Text>
            </View>
          )}

          {item.id !== "SP001" ? (
            <TouchableOpacity
              style={Styles.btnTurnOnInvetory}
              // onPress={() => setOpneInforWareHouse(!openInforWareHouse)}
              onPress={() => {
                console.log("====================================");
                console.log(index);
                console.log("====================================");
              }}>
              <Text
                style={{
                  fontSize: scaleWidth(12),
                  color: colors.palette.navyBlue,
                  fontWeight: "600",
                }}
                tx="wareHouse.turnOnInventory"
              />
            </TouchableOpacity>
          ) : quantity === 0 ? (
            <TouchableOpacity
              style={{ position: "absolute", bottom: 0, end: 0 }}
              onPress={() => setQuantity(1)}>
              <Svgs.ic_btnAddSquare />
            </TouchableOpacity>
          ) : (
            <View style={Styles.viewQuantity}>
              <TouchableOpacity
                style={Styles.btnMinus}
                onPress={() => setQuantity(quantity - 1)}>
                <Svgs.ic_minus />
              </TouchableOpacity>
              <Text style={{ flex: 1, textAlign: "center" }}>{quantity}</Text>
              <TouchableOpacity
                style={Styles.btnMinus}
                onPress={() => setQuantity(quantity + 1)}>
                <Svgs.icon_plusGreen />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        LeftIcon={Svgs.back}
        leftText="ImprotGoodsBook.ImportGoods"
        RightIcon={Svgs.ic_QR}
        RightIcon1={Svgs.icon_search}
        style={{ height: scaleHeight(52) }}
        btnRightStyle={{ width: 30, height: 30 }}
        onLeftPress={() => props.navigation.goBack()}
      />
      <View
        style={{
          flex: 1,
          paddingTop: scaleHeight(20),
          paddingHorizontal: scaleWidth(16),
        }}>
        <View style={Styles.StyleTabar}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor:
                sellectTab === "product" ? colors.white : colors.solitude1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 7,
              margin: 2,
            }}
            onPress={() => setSellectTab("product")}>
            <Text
              style={
                sellectTab === "product"
                  ? Styles.StyleTextTabar
                  : Styles.StyleTextTabarUnSelect
              }
              tx="ImprotGoodsBook.product"></Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor:
                sellectTab === "material" ? colors.white : colors.solitude1,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 7,
              margin: 2,
            }}
            onPress={() => setSellectTab("material")}>
            <Text
              style={
                sellectTab === "material"
                  ? Styles.StyleTextTabar
                  : Styles.StyleTextTabarUnSelect
              }
              tx="ImprotGoodsBook.materials"></Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ marginRight: scaleWidth(8) }}>
            <Svgs.squaresFour />
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
                  // console.log(index)

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

        <FlatList
          style={{ marginTop: scaleHeight(12) }}
          data={dataListWareHouse}
          renderItem={({ item, index }) => (
            <ItemListExprortGoods item={item} index={index} />
          )}
        />
      </View>

      {quantity === 1 && (
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: scaleHeight(16),
            paddingTop: scaleHeight(20),
            paddingBottom: scaleHeight(12),
          }}>
          <TouchableOpacity
            style={Styles.btnBottom}
            onPress={() => props.navigation.navigate("createGoodsReceipt")}>
            <View style={{ flexDirection: "row" }}>
              <Svgs.ic_ShoopingCar />
              <View
                style={{
                  position: "absolute",
                  start: scaleWidth(7),
                  top: scaleWidth(-5),
                }}>
                <View
                  style={{
                    width: scaleWidth(15),
                    height: scaleHeight(15),
                    backgroundColor: "red",
                    borderRadius: scaleWidth(14),
                    borderWidth: 1,
                    borderColor: colors.white,
                  }}>
                  <Text
                    style={{
                      alignSelf: "center",
                      fontSize: 9,
                      color: colors.white,
                    }}>
                    1
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", marginLeft: scaleWidth(10) }}>
                <Text style={Styles.TextWhite}>1</Text>
                <Text tx="GoodsExportBook.product" style={Styles.TextWhite} />
              </View>
            </View>
            <View>
              <Text style={Styles.TextWhite} tx="GoodsExportBook.contenue" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
});
export const Styles = StyleSheet.create({
  styleItemTabarIsclick: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
    marginRight: 8,
  },
  styleItemTabar: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.palette.veryLightGrey,
    marginRight: 8,
  },
  flexrow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txtItemWareHouse: {
    fontSize: scaleWidth(10),
    color: colors.palette.dolphin,
  },
  btnTurnOnInvetory: {
    marginVertical: scaleWidth(6),
    borderWidth: 1,
    borderColor: colors.palette.navyBlue,
    borderRadius: scaleWidth(8),
    paddingHorizontal: scaleWidth(12),
    paddingVertical: scaleHeight(7),
  },
  viewQuantity: {
    position: "absolute",
    bottom: 0,
    end: 0,
    borderWidth: 1,
    flexDirection: "row",
    width: scaleWidth(91),
    height: scaleHeight(30),
    borderRadius: scaleWidth(4),
    borderColor: colors.whiteSmoke,
    justifyContent: "space-around",
    alignItems: "center",
  },
  btnMinus: {
    flex: 2,
    alignItems: "center",
  },

  TextWhite: {
    color: colors.white,
    fontWeight: "600",
  },
  btnBottom: {
    backgroundColor: colors.palette.navyBlue,
    borderRadius: scaleWidth(8),
    padding: scaleHeight(12),
    justifyContent: "space-between",
    flexDirection: "row",
  },
  StyleTabar: {
    flexDirection: "row",
    backgroundColor: colors.solitude1,
    height: 32,
    // justifyContent:'space-between',
    borderRadius: 8,
    marginBottom: 20,
  },
  StyleTextTabar: {
    fontSize: 13,
    fontWeight: "700",
  },
  StyleTextTabarUnSelect: {
    fontSize: 13,
    fontWeight: "500",
  },
});
