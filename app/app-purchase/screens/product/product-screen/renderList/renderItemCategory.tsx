import React from "react";
import {
  TouchableOpacity,
  View,
  ImageBackground,
  Animated,
  StyleSheet,
} from "react-native";
import FastImage from "react-native-fast-image";
import { scaleHeight, scaleWidth } from "../../../../theme";
import { Svgs } from "../../../../../../assets/svgs";
import { stylesItem } from "../../styles";
import { Text } from "../../../../components";
import { Swipeable } from "react-native-gesture-handler";
import Images from "../../../../../../assets/index";

const RenderCategoryItem = ({
  item,
  isActive,
  handleOpenDeleteModal,
  handleEditCategory,
  index,
}: any) => {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-50, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <View style={styles.swipedRow}>
        <Animated.View style={[styles.deleteButton, { opacity }]}>
          <TouchableOpacity
            onPress={() => {
              handleOpenDeleteModal(item.id);
            }}
            style={{ alignItems: "center", justifyContent: "center" }}>
            <Svgs.icon_trashWhite
              width={scaleWidth(16)}
              height={scaleHeight(16)}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        key={index}
        disabled={isActive}
        style={{
          backgroundColor: "white",
          marginBottom: scaleHeight(1),
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginHorizontal: scaleWidth(16),
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
            <View style={{}}>
              <Svgs.arrowsOutCardinal
                width={scaleWidth(16)}
                height={scaleHeight(16)}
              />
            </View>
            <View
              style={{
                marginVertical: scaleHeight(8),
                marginHorizontal: scaleWidth(6),
              }}>
              <ImageBackground
                style={{
                  width: scaleWidth(40),
                  height: scaleHeight(40),
                }}
                imageStyle={{ borderRadius: 8 }}
                source={Images.noImages}>
                <FastImage
                  style={{
                    width: scaleWidth(40),
                    height: scaleHeight(40),
                    borderRadius: 8,
                  }}
                  source={{
                    uri: item.imageUrl,
                    cache: FastImage.cacheControl.immutable,
                  }}
                />
              </ImageBackground>
            </View>
            <View
              style={[
                stylesItem.titleView,
                { justifyContent: "center", maxWidth: scaleWidth(230) },
              ]}>
              <Text numberOfLines={2} style={stylesItem.title}>
                {item.name}
              </Text>
              <Text style={stylesItem.description}>
                {item.productCount}{" "}
                <Text
                  style={stylesItem.description}
                  tx="productScreen.product"></Text>
              </Text>
            </View>
          </View>
          <View>
            {/* <TouchableOpacity onPress={() => {
              handleOpenDeleteModal(item.id)
            }} style={{ alignItems: 'center', justifyContent: 'center', width: scaleWidth(30), height: scaleHeight(30) }}>
              <Images.icon_trash
                width={scaleWidth(16)}
                height={scaleHeight(16)}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => handleEditCategory(item)}
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: scaleWidth(30),
                height: scaleHeight(30),
              }}>
              <Svgs.icon_edit width={scaleWidth(16)} height={scaleHeight(16)} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
const styles = StyleSheet.create({
  swipedRow: {
    alignItems: "center",
    backgroundColor: "red",
    marginBottom: scaleHeight(1),
  },
  deleteButton: {
    // backgroundColor: '#b60000',
    // flexDirection: 'column',
    justifyContent: "center",
    height: "100%",
    width: scaleWidth(50),
  },
});
export default React.memo(RenderCategoryItem);
