import React from "react";
import { fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../../components";

const renderItemSupplier = ({ item }: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: scaleWidth(375),
        height: scaleHeight(56),
        paddingHorizontal: 16,
        backgroundColor: "white",
        marginBottom: 5,
        justifyContent: "space-between",
      }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#EFF8FF",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={{ fontSize: fontSize.size10, color: "#0078D4" }}>
            {item.code}
          </Text>
        </View>
        <View style={{ marginHorizontal: 6 }}>
          <Text style={{ fontSize: fontSize.size10 }}>{item.name}</Text>
          <Text style={{ fontSize: fontSize.size10, color: "#747475" }}>
            {item.phone}
          </Text>
        </View>
      </View>
      {/* <TouchableOpacity>
          <Images.icon_edit width={scaleWidth(14)} height={scaleHeight(14)} />
        </TouchableOpacity> */}
    </TouchableOpacity>
  );
};
export const renderItemSupplier2 = ({ item }: any) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "column",
        alignItems: "center",
        width: scaleWidth(165),
        backgroundColor: "white",
        marginLeft: scaleWidth(15),
        marginVertical: 15,
        paddingVertical: 10,
        justifyContent: "space-between",
        borderRadius: 8,
      }}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
        }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: "#EFF8FF",
            borderRadius: 50,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: scaleHeight(6),
          }}>
          <Text
            text={item.code}
            style={{
              fontSize: fontSize.size10,
              color: "#0078D4",
              textAlign: "center",
              alignSelf: "center",
            }}></Text>
        </View>
        <View style={{ marginHorizontal: 6 }}>
          <Text
            text={item.name}
            style={{
              fontSize: fontSize.size10,
              textAlign: "center",
              alignSelf: "center",
            }}></Text>
          <Text
            text={item.phone}
            style={{
              fontSize: fontSize.size10,
              color: "#747475",
              textAlign: "center",
              alignSelf: "center",
            }}></Text>
        </View>
      </View>
      {/* <TouchableOpacity>
          <Images.icon_edit width={scaleWidth(14)} height={scaleHeight(14)} />
        </TouchableOpacity> */}
    </TouchableOpacity>
  );
};
