import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  ImageBackground,
  StyleSheet,
} from "react-native";
import FastImage from "react-native-fast-image";
import { Svgs } from "../../../../../assets/svgs";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Text } from "../../../../app-purchase/components";
import { TurboModuleRegistry } from "react-native-windows";
import { useStores } from "../../../models";
import AutoHeightImage from "react-native-auto-height-image";
import { ALERT_TYPE, Dialog } from "../../../../app-purchase/components/dialog-notification";
import { translate } from "../../../i18n";
import Images from "../../../../../assets/index";

const RenderOrderItem = ({
  item,
  index,
  isGridView,
  viewProduct,
  handleProductDetail,
  handleClassifyDetail,
  handleAddProduct,
  handleMinus,
  handlePlus,
}: any) => {
  const { orderStore } = useStores();

  if (isGridView) {
    return (
      <TouchableOpacity
        key={item.id}
        disabled={
          item.quantityInventory === 0 ||
          item.quantityInventory < item.minQuantity
            ? true
            : false
        }
        onPress={() => {
          viewProduct === "VIEW_PRODUCT"
            ? handleProductDetail(item.id)
            : handleClassifyDetail(item.id);
        }}
        style={[
          stylesItem.item,
          {
            width: scaleWidth(107),
            // height: scaleHeight(124),
            marginRight: scaleWidth(11),
            opacity:
              item.quantityInventory === 0 ||
              item.quantityInventory < item.minQuantity
                ? 0.5
                : 1,
          },
        ]}>
        <View
          style={{
            position: "absolute",
            top: scaleHeight(44),
            right: scaleWidth(6),
            zIndex: 1,
          }}></View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}>
          <View style={stylesItem.icon}>
            <ImageBackground
              style={{ width: scaleWidth(107), height: scaleHeight(50) }}
              imageStyle={{
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
              source={Images.noImages}>
              {viewProduct === "VIEW_PRODUCT" ? null : (
                <FastImage
                  style={{
                    width: scaleWidth(107),
                    height: scaleHeight(50),
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                  source={{
                    uri:
                      item.productImage && item?.productImage?.length !== 0
                        ? item.productImage[0]
                        : "",
                    cache: FastImage.cacheControl.immutable,
                  }}
                  defaultSource={Images.noImages}
                />
              )}
            </ImageBackground>
          </View>
          <View
            style={{
              alignItems:
                viewProduct === "VIEW_PRODUCT" ? "flex-start" : "flex-start",
              paddingHorizontal: scaleWidth(8),
              marginBottom: scaleHeight(8),
              width: scaleWidth(107),
            }}>
            <Text numberOfLines={1} style={stylesItem.title}>
              {item.sku}
            </Text>
            <Text numberOfLines={1} style={stylesItem.textName}>
              {item.name}
            </Text>
            {viewProduct === "VIEW_PRODUCT" ? (
              <Text style={stylesItem.amount} numberOfLines={1}>
                {item.quantityInventory}{" "}
                <Text text={item?.uom?.name} style={stylesItem.amount}></Text>
              </Text>
            ) : viewProduct === "VIEW_VARIANT" &&
              orderStore.checkPriceList === true ? (
              <Text style={stylesItem.amount} numberOfLines={1}>
                {item.quantityInventory}{" "}
                <Text text={item?.uomName} style={stylesItem.amount}></Text>
              </Text>
            ) : null}
            {viewProduct === "VIEW_PRODUCT" ? (
              <Text style={stylesItem.content} numberOfLines={1}>
                {item.variantCount}{" "}
                <Text
                  tx="productScreen.productClassification"
                  style={stylesItem.content}></Text>
              </Text>
            ) : null}
            {viewProduct === "VIEW_PRODUCT" ? (
              item.quantityInventory === 0 ? (
                <Text
                  numberOfLines={1}
                  style={[stylesItem.amount, { fontStyle: "italic" }]}
                  tx="productScreen.outOfStock"
                />
              ) : (
                <Text
                  numberOfLines={1}
                  style={[
                    stylesItem.amount,
                    { color: colors.palette.malachite, fontStyle: "italic" },
                  ]}
                  tx="productScreen.stocking"
                />
              )
            ) : viewProduct === "VIEW_VARIANT" &&
              orderStore.checkPriceList === true ? (
              item.quantityInventory === 0 ? (
                <Text
                  numberOfLines={1}
                  style={[stylesItem.amount, { fontStyle: "italic" }]}
                  tx="productScreen.outOfStock"
                />
              ) : (
                <Text
                  numberOfLines={1}
                  style={[
                    stylesItem.amount,
                    { color: colors.palette.malachite, fontStyle: "italic" },
                  ]}
                  tx="productScreen.stocking"
                />
              )
            ) : null}
            {viewProduct === "VIEW_PRODUCT" ? null : item.isSelect === false ? (
              item.quantityInventory === 0 ||
              item.quantityInventory < item.minQuantity ? null : (
                <TouchableOpacity
                  style={{ marginVertical: scaleHeight(5.5) }}
                  onPress={() => handleAddProduct(item)}>
                  <Svgs.icon_plus_blue2 />
                </TouchableOpacity>
              )
            ) : (
              <View
                style={{
                  // marginLeft: scaleWidth(margin.margin_12),
                  marginTop: scaleHeight(2),
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: colors.palette.whiteSmoke,
                  alignItems: "center",
                  paddingVertical: scaleHeight(3),
                  borderRadius: 8,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (item.amount == item.minQuantity) {
                      Dialog.show({
                        type: ALERT_TYPE.INFO,
                        title: translate("productScreen.Notification"),
                        textBody:
                          "SL tối thiểu cần bán là " +
                          item.minQuantity +
                          " " +
                          item.saleUom.name +
                          ". Bạn có muốn bỏ sản phẩm khỏi giỏ hàng không?",
                        button: translate("productScreen.cancel"),
                        button2: translate(
                          "productScreen.BtnNotificationAccept"
                        ),
                        closeOnOverlayTap: false,
                        onPressButton: () => {
                          handleMinus(item);
                          Dialog.hide();
                        },
                      });
                    } else {
                      handleMinus(item);
                    }
                  }}
                  // disabled={
                  //   orderStore.checkPriceList === true
                  //     ? item.amount === item.minQuantity ||
                  //       item.amount ===
                  //         Math.ceil(item.minQuantity / item.conversionRate)
                  //       ? true
                  //       : false
                  //     : item.amount === 1
                  //     ? true
                  //     : false
                  // }
                  style={{ width: "30%", alignItems: "center" }}>
                  <Svgs.icon_minus />
                </TouchableOpacity>
                <Text
                  style={{
                    width: "40%",
                    textAlign: "center",
                  }}>
                  {item.amount}
                </Text>
                <TouchableOpacity
                  onPress={() => handlePlus(item)}
                  disabled={
                    orderStore.checkPriceList === true
                      ? item.amount === item.quantityInventory ||
                        item.amount ===
                          Math.floor(
                            item.quantityInventory / item.conversionRate
                          )
                        ? true
                        : false
                      : item.amount === item.quantityInventory
                      ? true
                      : false
                  }
                  style={{ width: "30%", alignItems: "center" }}>
                  <Svgs.icon_plusGreen />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        key={item.id}
        disabled={
          item.quantityInventory === 0 ||
          item.quantityInventory < item.minQuantity
            ? true
            : false
        }
        onPress={() =>
          viewProduct === "VIEW_PRODUCT"
            ? handleProductDetail(item.id)
            : handleClassifyDetail(item.id)
        }
        style={[
          stylesItem.item,
          {
            width: scaleWidth(343),
            opacity:
              item.quantityInventory === 0 ||
              item.quantityInventory < item.minQuantity
                ? 0.5
                : 1,
          },
        ]}>
        <View
          style={{
            position: "absolute",
            top: scaleHeight(56),
            right: scaleWidth(6),
            backgroundColor: colors.aliceBlue,
            zIndex: 1,
          }}>
          {viewProduct === "VIEW_VARIANT" && item.upc !== null ? (
            <TouchableOpacity>
              <Svgs.ic_3d width={scaleWidth(20)} height={scaleHeight(20)} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
          }}>
          <View style={{ margin: 6, borderRadius: 10 }}>
            <ImageBackground
              style={{
                width: scaleWidth(70),
                height: scaleHeight(70),
              }}
              imageStyle={{ borderRadius: 8 }}
              source={Images.noImages}>
              {viewProduct === "VIEW_PRODUCT" ? null : (
                <FastImage
                  style={{
                    width: scaleWidth(70),
                    height: scaleHeight(70),
                    borderRadius: 8,
                  }}
                  source={{
                    uri:
                      item.productImage && item?.productImage?.length !== 0
                        ? item.productImage[0]
                        : "",
                    cache: FastImage.cacheControl.immutable,
                  }}
                  defaultSource={Images.noImages}
                />
              )}
            </ImageBackground>
          </View>
          <View
            style={[
              stylesItem.titleView,
              { marginTop: scaleHeight(10), marginHorizontal: scaleWidth(6) },
            ]}>
            <Text
              numberOfLines={1}
              style={[stylesItem.title, { marginRight: scaleWidth(5) }]}>
              {item.sku}
            </Text>
            <View style={{ width: scaleWidth(200) }}>
              <Text numberOfLines={1} style={stylesItem.textName}>
                {item.name}
              </Text>
            </View>
            {viewProduct === "VIEW_PRODUCT" ? (
              <Text style={stylesItem.amount} numberOfLines={1}>
                {item.quantityInventory}{" "}
                <Text text={item?.uom?.name} style={stylesItem.amount}></Text>
              </Text>
            ) : viewProduct === "VIEW_VARIANT" &&
              orderStore.checkPriceList === true ? (
              <Text style={stylesItem.amount} numberOfLines={1}>
                {item.quantityInventory}{" "}
                <Text text={item?.uomName} style={stylesItem.amount}></Text>
              </Text>
            ) : null}
            {viewProduct === "VIEW_PRODUCT" ? (
              <Text style={stylesItem.content} numberOfLines={1}>
                {item.variantCount}{" "}
                <Text
                  tx="productScreen.productClassification"
                  style={stylesItem.content}></Text>
              </Text>
            ) : null}
            {viewProduct === "VIEW_PRODUCT" ? (
              item.quantityInventory === 0 ? (
                <Text
                  numberOfLines={1}
                  style={[stylesItem.amount, { fontStyle: "italic" }]}
                  tx="productScreen.outOfStock"
                />
              ) : (
                <Text
                  numberOfLines={1}
                  style={[
                    stylesItem.amount,
                    { color: colors.palette.malachite, fontStyle: "italic" },
                  ]}
                  tx="productScreen.stocking"
                />
              )
            ) : viewProduct === "VIEW_VARIANT" &&
              orderStore.checkPriceList === true ? (
              item.quantityInventory === 0 ? (
                <Text
                  numberOfLines={1}
                  style={[stylesItem.amount, { fontStyle: "italic" }]}
                  tx="productScreen.outOfStock"
                />
              ) : (
                <Text
                  numberOfLines={1}
                  style={[
                    stylesItem.amount,
                    { color: colors.palette.malachite, fontStyle: "italic" },
                  ]}
                  tx="productScreen.stocking"
                />
              )
            ) : null}
            {viewProduct === "VIEW_PRODUCT" ? null : item.isSelect === false ? (
              item.quantityInventory === 0 ||
              item.quantityInventory < item.minQuantity ? null : (
                <TouchableOpacity
                  style={{ marginVertical: scaleHeight(5.5) }}
                  onPress={() => handleAddProduct(item)}>
                  <Svgs.icon_plus_blue2 />
                </TouchableOpacity>
              )
            ) : (
              <View
                style={{
                  // marginLeft: scaleWidth(margin.margin_12),
                  marginTop: scaleHeight(2),
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: colors.palette.whiteSmoke,
                  alignItems: "center",
                  paddingVertical: scaleHeight(3),
                  borderRadius: 8,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (item.amount == item.minQuantity) {
                      Dialog.show({
                        type: ALERT_TYPE.INFO,
                        title: translate("productScreen.Notification"),
                        textBody:
                          "SL tối thiểu cần bán là " +
                          item.minQuantity +
                          " " +
                          item.saleUom.name +
                          ". Bạn có muốn bỏ sản phẩm khỏi giỏ hàng không?",
                        button: translate("productScreen.cancel"),
                        button2: translate(
                          "productScreen.BtnNotificationAccept"
                        ),
                        closeOnOverlayTap: false,
                        onPressButton: () => {
                          handleMinus(item);
                          Dialog.hide();
                        },
                      });
                    } else {
                      handleMinus(item);
                    }
                  }}
                  // disabled={
                  //   orderStore.checkPriceList === true
                  //     ? item.amount === item.minQuantity ||
                  //       item.amount ===
                  //         Math.ceil(item.minQuantity / item.conversionRate)
                  //       ? true
                  //       : false
                  //     : item.amount === 1
                  //     ? true
                  //     : false
                  // }
                  style={{ width: "15%", alignItems: "center" }}>
                  <Svgs.icon_minus />
                </TouchableOpacity>
                <Text
                  style={{
                    width: "25%",
                    textAlign: "center",
                  }}>
                  {item.amount}
                </Text>
                <TouchableOpacity
                  onPress={() => handlePlus(item)}
                  disabled={
                    orderStore.checkPriceList === true
                      ? item.amount === item.quantityInventory ||
                        item.amount ===
                          Math.floor(
                            item.quantityInventory / item.conversionRate
                          )
                        ? true
                        : false
                      : item.amount === item.quantityInventory
                      ? true
                      : false
                  }
                  style={{ width: "15%", alignItems: "center" }}>
                  <Svgs.icon_plusGreen />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default RenderOrderItem;

const stylesItem = StyleSheet.create({
  content: {
    color: colors.palette.navyBlue,
    fontSize: fontSize.size8,
    fontWeight: "500",
  },
  amount: {
    color: colors.palette.radicalRed,
    fontSize: fontSize.size8,
    fontWeight: "500",
  },

  icon: {
    marginTop: 0,
    marginBottom: 5,
    // backgroundColor : 'red'
  },
  item: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: scaleHeight(10),
  },
  title: {
    color: colors.jaguar,
    fontSize: fontSize.size10,
    fontWeight: "700",
  },
  textName: {
    color: colors.jaguar,
    fontSize: fontSize.size10,
    fontWeight: "400",
  },
  titleView: {
    alignItems: "flex-start",
  },
  description: {
    fontSize: fontSize.size9,
    color: "#888",
    fontStyle: "italic",
    // marginBottom: 4,
  },
  columnWrapper: {
    // justifyContent: 'space-between',
    // marginBottom: scaleHeight(16),
  },
});
