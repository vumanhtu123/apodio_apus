import React, { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text } from "../../../../app-purchase/components";
import { Svgs } from "../../../../../assets/svgs";
import { colors, scaleHeight, scaleWidth } from "../../../theme";

export const OrderSupplier = (item: any) => {
  const [onclick, setOnclick] = useState(0);
  const onTap = (id: any) => {
    if (id == 1) {
      setOnclick(1);
    } else {
      setOnclick(0);
    }
  };
  return (
    <View style={{ flexDirection: "column", marginHorizontal: 16 }}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          alignSelf: "flex-end",
        }}>
        <TouchableOpacity onPress={() => onTap(0)}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: onclick == 0 ? colors.navyBlue : colors.nero,
            }}>
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onTap(1);
          }}
          style={{
            marginLeft: 12,
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              color: onclick == 1 ? colors.navyBlue : colors.nero,
            }}>
            Tháng này
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: "white",
          flexDirection: "column",
          paddingHorizontal: 16,
          paddingVertical: 16,
          borderRadius: 8,
          elevation: 0.5,
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Svgs.ClipboardText />
          <Text
            style={{
              color: colors.dolphin,
              fontSize: 12,
              fontWeight: "400",
              paddingHorizontal: 6,
            }}>
            Đã mua:
          </Text>
          <Text
            style={{
              color: colors.nero,
              fontSize: 12,
              fontWeight: "400",
            }}>
            {item.bought ?? "7 đơn"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            alignItems: "center",
          }}>
          <Svgs.ClipboardText />
          <Text
            style={{
              color: colors.dolphin,
              fontSize: 12,
              fontWeight: "400",
              paddingHorizontal: 6,
            }}>
            Đang xử lý:
          </Text>
          <Text
            style={{
              color: colors.nero,
              fontSize: 12,
              fontWeight: "400",
            }}>
            {item.processing ?? "3 đơn"}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Svgs.icon_chart />
          <Text
            style={{
              color: colors.dolphin,
              fontSize: 12,
              fontWeight: "400",
              paddingHorizontal: 6,
            }}>
            Tổng tiền:
          </Text>
          <Text
            style={{
              color: colors.nero,
              fontSize: 12,
              fontWeight: "400",
            }}>
            {item.amount ?? "1.700.000.000đ"}
          </Text>
        </View>
        {item.amount == 0 ? (
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: colors.dolphin,
              paddingVertical: 8,
            }}>
            Chưa có đơn hàng cho NCC này
          </Text>
        ) : null}
      </View>
      <View
        style={{
          backgroundColor: colors.navyBlue,
          borderRadius: 4,
          width: 77,
          height: 24,
          alignSelf: "flex-end",
          marginVertical: 15,
        }}>
        <Text
          style={{
            fontSize: 10,
            fontWeight: "400",
            textAlign: "center",
            color: "white",
            paddingHorizontal: scaleWidth(8),
            paddingVertical: scaleHeight(6),
          }}>
          Tạo đơn
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={item}
          showsVerticalScrollIndicator={false}
          // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshNotifications} title="ok" />}
          keyExtractor={(item) => item.id.toString()}
          // onEndReached={handleEndReached}
          onEndReachedThreshold={0.8}
          // ListFooterComponent={renderFooter}
          numColumns={2}
          columnWrapperStyle={null}
          renderItem={ItemOrder}
        />
      </View>
      <ItemOrder />
    </View>
  );
};

const ItemOrder = (item: any) => {
  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: colors.white,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <View style={{ flexDirection: "column", alignSelf: "flex-end" }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: colors.nero }}>
            {item.name ?? "Nguyễn Hà Dung"}
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "400", color: colors.dolphin }}>
            {item.date ?? "ĐH_21090930 - 13:56 01/03/2024 "}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#A55EEA1A",
            borderRadius: 2,
            paddingHorizontal: 8,
            paddingVertical: 2,
            alignSelf: "flex-start",
          }}>
          <Text
            style={{
              fontSize: 8,
              fontWeight: "400",
              color: "#A55EEA",
            }}>
            Chờ xác nhận
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: colors.ghostWhite,
          height: 1,
          marginVertical: 12,
        }}></View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ color: colors.dolphin, fontSize: 10, fontWeight: "400" }}>
            Số lượng sản phẩm:
          </Text>
          <Text
            style={{
              color: colors.dolphin,
              fontSize: 10,
              fontWeight: "400",
              marginVertical: 8,
            }}>
            Tổng tiền hàng:
          </Text>
          <Text style={{ color: colors.dolphin, fontSize: 10, fontWeight: "400" }}>
            Chiết khấu:
          </Text>
          <Text
            style={{
              color: colors.dolphin,
              fontSize: 10,
              fontWeight: "400",
              marginVertical: 8,
            }}>
            Tổng thuế
          </Text>
          <Text style={{ color: colors.dolphin, fontSize: 10, fontWeight: "400" }}>
            Tổng tiền cần thanh toán:
          </Text>
          <Text
            style={{
              color: "#FF4956",
              fontSize: 10,
              fontWeight: "700",
              marginVertical: 8,
            }}>
            Chưa thanh toán
          </Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
          <Text style={{ color: colors.nero, fontSize: 10, fontWeight: "400" }}>
            {item.size ?? "7"}
          </Text>
          <Text
            style={{
              color: "#242425",
              fontSize: 10,
              fontWeight: "400",
              marginVertical: 8,
            }}>
            {item.sumAmount ?? "80.000.000"}
          </Text>
          <Text style={{ color: "#242425", fontSize: 10, fontWeight: "400" }}>
            {item.discount ?? "5.000.000"}
          </Text>
          <Text
            style={{
              color: "#242425",
              fontSize: 10,
              fontWeight: "400",
              marginVertical: 8,
            }}>
            {item.tax ?? "5.000.000"}
          </Text>
          <Text style={{ color: "#FF4956", fontSize: 12, fontWeight: "600" }}>
            {item.totalPayment ?? "80.000.000"}
          </Text>
        </View>
      </View>
    </View>
  );
};
