import React from "react";
import { TouchableOpacity, View, ImageBackground } from "react-native";
import FastImage from "react-native-fast-image";
import { Svgs } from "../../../../../assets/svgs";
import { colors, scaleHeight, scaleWidth } from "../../../theme";
import { styles } from "../styles/styles";
import { Text } from "../../../../app-purchase/components";
import Images from "../../../../../assets/index";

const RenderProductItem = ({
  item,
  index,
  isGridView,
  viewProduct,
  handleProductDetail,
  handleClassifyDetail,
}: any) => {
  if (isGridView) {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          viewProduct === "VIEW_PRODUCT"
            ? handleProductDetail(item.id)
            : handleClassifyDetail(item.id);
        }}
        style={[
          styles.item,
          {
            width: scaleWidth(107),
            // height: scaleHeight(124),
            marginRight: scaleWidth(11),
          },
        ]}>
        <View
          style={{
            position: "absolute",
            top: scaleHeight(44),
            right: scaleWidth(6),
            zIndex: 1,
          }}>
          {viewProduct === "VIEW_VARIANT" && item.scene?.url !== "" ? (
            <TouchableOpacity>
              <Svgs.ic_3d width={scaleWidth(20)} height={scaleHeight(20)} />
            </TouchableOpacity>
          ) : null}
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}>
          <View style={styles.icon}>
            <ImageBackground
              style={{ width: scaleWidth(107), height: scaleHeight(70) }}
              imageStyle={{
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
              source={Images.noImages}>
              <FastImage
                style={{
                  width: scaleWidth(107),
                  height: scaleHeight(70),
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
                source={{
                  uri:
                    item.imageUrls && item.imageUrls.length > 0
                      ? `${item.imageUrls[0]}`
                      : "",
                  cache: FastImage.cacheControl.immutable,
                }}
                defaultSource={Images.noImages}
              />
            </ImageBackground>
          </View>
          <View
            style={[
              styles.titleView,
              {
                marginHorizontal: scaleWidth(10),
                marginBottom: scaleHeight(8),
              },
            ]}>
            <Text numberOfLines={1} style={styles.title}>
              {item.sku}
            </Text>
            <Text numberOfLines={1} style={styles.title}>
              {item.name}
            </Text>
            {viewProduct === "VIEW_PRODUCT" ? (
              <Text style={styles.content} numberOfLines={1}>
                {item.variantCount}{" "}
                <Text
                  tx="productScreen.productClassification"
                  style={styles.content}></Text>
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          viewProduct === "VIEW_PRODUCT"
            ? handleProductDetail(item.id)
            : handleClassifyDetail(item.id)
        }
        style={[styles.item, { width: scaleWidth(343) }]}>
        <View
          style={{
            position: "absolute",
            top: scaleHeight(56),
            right: scaleWidth(6),
            backgroundColor: colors.aliceBlue,
            zIndex: 1,
          }}>
          {viewProduct === "VIEW_VARIANT" && item.scene?.url !== "" ? (
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
              <FastImage
                style={{
                  width: scaleWidth(70),
                  height: scaleHeight(70),
                  borderRadius: 8,
                }}
                source={{
                  uri:
                    item.imageUrls && item.imageUrls.length > 0
                      ? `${item.imageUrls[0]}`
                      : "",
                  cache: FastImage.cacheControl.immutable,
                }}
              />
            </ImageBackground>
          </View>
          <View
            style={[
              styles.titleView,
              { marginTop: scaleHeight(10), marginHorizontal: scaleWidth(6) },
            ]}>
            <View style={{ flexDirection: "row", maxWidth: scaleWidth(100) }}>
              <Text
                numberOfLines={1}
                style={[styles.title, { marginRight: scaleWidth(5) }]}>
                {item.sku}
              </Text>
              <Text numberOfLines={1} style={styles.title}>
                {item.name}
              </Text>
            </View>
            {viewProduct === "VIEW_PRODUCT" ? (
              <Text style={styles.content} numberOfLines={1}>
                {item.variantCount}{" "}
                <Text
                  tx="productScreen.productClassification"
                  style={styles.content}></Text>
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default RenderProductItem;
