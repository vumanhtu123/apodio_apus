import React from "react";
import { View } from "react-native";
import { Text } from "../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { colors } from "../../../theme";

export const HeaderOrderDetails = (props: any) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 16,
        borderRadius: 8,
        flexDirection: "column",
        paddingVertical: 10,
        marginTop: 20,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 16,
        }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: colors.nero }}>
            ĐH_21090930
          </Text>
          <Text
            style={{
              fontSize: 10,
              fontWeight: "400",
              color: colors.dolphin,
            }}>
            Thời gian đặt hàng: 13:56 - 01/03/2023
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#A55EEA1A",
            borderRadius: 2,
            paddingHorizontal: 8,
            paddingVertical: 2,
            height: 14,
          }}>
          <Text style={{ fontSize: 8, fontWeight: "400", color: "#A55EEA" }}>
            Chờ xác nhận
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: colors.ghostWhite,
          marginHorizontal: 16,
          marginVertical: 12,
        }}></View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          color: colors.nero,
          marginHorizontal: 16,
        }}>
        84.000.000
      </Text>
    </View>
  );
};

export const SubHeader = (props: any) => {
  return (
    <View
      style={{
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginVertical: 20,
        alignItems: "center",
        backgroundColor: "white",
      }}>
      <Svgs.avatar />
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: colors.nero,
          paddingLeft: 8.5,
        }}>
        Công ty TNHH Một thành viên Apodio
      </Text>
    </View>
  );
};

export const AddressOrder = (props: any) => {
  return (
    <View
      style={{
        borderRadius: 8,
        backgroundColor: "white",
        flexDirection: "column",
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginHorizontal: 16,
      }}>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 12,
          color: colors.nero,
          marginBottom: 15,
        }}>
        Địa chỉ nhận hàng
      </Text>
      <Text style={{ fontWeight: "400", fontSize: 12, color: colors.nero }}>
        Công ty TNHH Mặt Trời Hồng
      </Text>
      <Text
        style={{
          fontWeight: "400",
          fontSize: 12,
          color: colors.nero,
          marginVertical: 8,
        }}>
        02466876656
      </Text>
      <Text style={{ fontWeight: "400", fontSize: 12, color: colors.nero }}>
        85 Hàng Bài, Hoàn Kiếm, HN
      </Text>
    </View>
  );
};
