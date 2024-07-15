import React from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Images } from '../../../../assets';
import { scaleHeight, scaleWidth } from '../../../theme';
import { styles, stylesItem } from '../styles';
import { Text } from '../../../components';
import { MotiView } from "moti";

const RenderProductItem = ({ item, index, isGridView, viewProduct, handleProductDetail, handleClassifyDetail }: any) => {
  if (isGridView) {
    return (
      // <MotiView
      //   from={{ opacity: 0, translateY: 50 }}
      //   animate={{ opacity: 1, translateY: 0 }}
      //   transition={{ delay: 1000 + index * 200 }}>
      <TouchableOpacity
        key={index}
        onPress={() => {
          (viewProduct === 'VIEW_PRODUCT')
            ? handleProductDetail(item.id, item.hasVariant)
            : (!item.hasVariant && viewProduct !== 'VIEW_PRODUCT')
              ? handleProductDetail(item.productTemplateId, item.hasVariant)
              : handleClassifyDetail(item.id, item.hasVariant);

          // console.log('cxzzc', item.productTemplateId)
        }}
        style={[
          stylesItem.item,
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
          {viewProduct === 'VIEW_VARIANT' && item.scene?.url !== '' ?
            <TouchableOpacity >
              <Images.ic_3d width={scaleWidth(20)} height={scaleHeight(20)} />
            </TouchableOpacity> : null
          }
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}>
          <View style={stylesItem.icon}>
            <ImageBackground
              style={{ width: scaleWidth(107), height: scaleHeight(70) }}
              imageStyle={{
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              }}
              source={require("../../../../assets/Images/no_images.png")}>
              <FastImage
                style={{
                  width: scaleWidth(107),
                  height: scaleHeight(70),
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: item.imageUrls && item.imageUrls.length > 0 ? `${item.imageUrls[0]}` : '',
                  // cache: FastImage.cacheControl.immutable,
                }}
                defaultSource={require("../../../../assets/Images/no_images.png")}
              />
            </ImageBackground>
          </View>
          <View
            style={[
              stylesItem.titleView,
              {
                marginHorizontal: scaleWidth(10),
                marginBottom: scaleHeight(8)
              },
            ]}>
            <Text numberOfLines={1} style={stylesItem.title}>{item.sku}</Text>
            <Text numberOfLines={1} style={stylesItem.title}>
              {item.name}
            </Text>
            {viewProduct === "VIEW_PRODUCT" ? (
              <Text style={stylesItem.content} numberOfLines={1}>
                {item.variantCount} <Text tx="productScreen.productClassification" style={stylesItem.content}></Text>
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      // </MotiView>
    );
  } else {
    return (
      // <MotiView
      //   from={{ opacity: 0, translateY: 50 }}
      //   animate={{ opacity: 1, translateY: 0 }}
      //   transition={{ delay: 1000 + index * 200 }}>
      <TouchableOpacity
        key={index}
        onPress={() => viewProduct === 'VIEW_PRODUCT' ? handleProductDetail(item.id) : handleClassifyDetail(item.id)}
        style={[
          stylesItem.item,
          { width: scaleWidth(343) },
        ]}>
        <View
          style={{
            position: "absolute",
            top: scaleHeight(56),
            right: scaleWidth(6),
            backgroundColor: "#F6F7F9",
            zIndex: 1,
          }}>
          {viewProduct === 'VIEW_VARIANT' && item.scene?.url !== '' ?
            <TouchableOpacity >
              <Images.ic_3d width={scaleWidth(20)} height={scaleHeight(20)} />
            </TouchableOpacity> : null
          }
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
              source={require("../../../../assets/Images/no_images.png")}>
              <FastImage
                style={{
                  width: scaleWidth(70),
                  height: scaleHeight(70),
                  borderRadius: 8,
                }}
                source={{
                  uri: item.imageUrls && item.imageUrls.length > 0 ? `${item.imageUrls[0]}` : '',
                  cache: FastImage.cacheControl.immutable,
                }}
              />
            </ImageBackground>
          </View>
          <View
            style={[
              stylesItem.titleView,
              { marginTop: scaleHeight(10), marginHorizontal: scaleWidth(6) },
            ]}>
            <View style={{ flexDirection: 'row', maxWidth: scaleWidth(100) }}>
              <Text numberOfLines={1} style={[stylesItem.title, { marginRight: scaleWidth(5) }]}>{item.sku}</Text>
              <Text numberOfLines={1} style={stylesItem.title}>
                {item.name}
              </Text>
            </View>
            {viewProduct === "VIEW_PRODUCT" ? (
              <Text style={stylesItem.content} numberOfLines={1}>
                {item.variantCount} <Text tx="productScreen.productClassification" style={stylesItem.content}></Text>
              </Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
      // </MotiView>
    );
  }
};

export default React.memo(RenderProductItem);
