import React, { FC, useEffect, useRef, useState } from "react";
import { styles } from "../styles/styles";
import { Header, Text } from "../../../components";
import { Images } from "../../../../assets";
import { AppStackScreenProps, navigationRef } from "../../../navigators";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export const OrderDetailsScreen: FC<
  AppStackScreenProps<"orderDetailsSupplier">
> = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.ROOT}>
      <View>
        <Header
          type={"AntDesign"}
          LeftIcon={Images.back}
          onLeftPress={() => navigation.goBack()}
          // colorIcon={colors.text}
          headerText={`Chi tiết đơn hàng`}
          // RightIcon={Images.icon_funnel}
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
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginVertical: 15,
          }}>
          <View style={{ flexDirection: "column" }}>
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                borderRadius: 8,
                alignItems: "center",
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginHorizontal: 16,
              }}>
              <Image
                source={require("../../../../assets/Images/Avatar.png")}
                style={{
                  width: 48,
                  height: 48,
                  marginRight: 10,
                }}
              />
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: "#242424" }}>
                Công ty TNHH Một thành viên Apodio
              </Text>
            </View>
          </View>
          <AddressOrder />
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginHorizontal: 16,
            }}>
            <View
              style={{
                borderColor: "#0078D4",
                borderWidth: 1,
                borderRadius: 8,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 102,
                  paddingVertical: 7,
                }}>
                <Images.icon_plus_blue
                  width={scaleWidth(16)}
                  height={scaleHeight(16)}
                  style={{ marginRight: 6, marginTop: 2, color: "#0078D4" }}
                />
                <Text
                  style={{ fontSize: 14, fontWeight: "600", color: "#0078D4" }}>
                  Chọn sản phẩm
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: 8,
              paddingHorizontal: 16,
              paddingVertical: 12,
              marginHorizontal: 16,
              marginTop: 15,
            }}>
            <Text style={{ color: "#000000", fontSize: 14, fontWeight: "600" }}>
              Thông tin thêm
            </Text>
            <View
              style={{
                flexDirection: "row",
                paddingTop: 15,
                alignItems: "center",
              }}>
              <Images.icon_gear />
              <View
                style={{
                  borderRadius: 4,
                  borderColor: "#0078D4",
                  borderWidth: 1,
                  marginHorizontal: 8,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: "#0078D4",
                    paddingVertical: 6,
                    paddingHorizontal: 8,
                  }}>
                  Ghi chú
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
          paddingVertical: 12,
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 16,
            paddingVertical: 12,
          }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#242424" }}>
            Tổng cộng
          </Text>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#242424" }}>
            0đ
          </Text>
        </View>
        <View
          style={{
            borderRadius: 8,
            backgroundColor: "#0078D4",
            alignItems: "center",
            marginHorizontal: 16,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#FFFFFF",
              marginVertical: 12,
            }}>
            Đặt hàng
          </Text>
        </View>
      </View>
    </View>
  );
};

const AddressOrder = () => {
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: 16,
        marginVertical: 15,
      }}>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: "#242424",
        }}>
        Địa chỉ nhận hàng
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
        }}>
        <View
          style={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#DFE0EB",
            alignSelf: "center",
            padding: 2,
          }}>
          <View
            style={{
              borderRadius: 50,
              width: 16,
              height: 16,
              backgroundColor: "#0078D4",
              alignSelf: "center",
            }}></View>
        </View>
        <Text
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: "#242424",
            paddingHorizontal: 8,
          }}>
          Nhận hàng tại kho nhà máy
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <View
          style={{
            borderRadius: 50,
            borderWidth: 1,
            borderColor: "#DFE0EB",
            alignSelf: "flex-start",
            padding: 2,
          }}>
          <View
            style={{
              borderRadius: 50,
              width: 16,
              height: 16,
              backgroundColor: "#0078D4",
            }}></View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#242424",
              paddingHorizontal: 8,
            }}>
            Nhận hàng tại địa chỉ cụ thể
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#242424",
              paddingHorizontal: 8,
              paddingVertical: 8,
            }}>
            02466876656
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#242424",
              paddingHorizontal: 8,
            }}>
            85 Hàng Bài, Hoàn Kiếm, Hà Nội
          </Text>
        </View>
      </View>
    </View>
  );
};