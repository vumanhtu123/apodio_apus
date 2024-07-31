import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "../../../../components";
import { fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";

export const HeaderInfo = (item: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 15,
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
          marginRight: 10,
        }}>
        <Text style={{ fontSize: fontSize.size10, color: "#0078D4" }}>
          {item.code ?? "ABC"}
        </Text>
      </View>
      <View style={{ flexDirection: "column", width: "80%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text style={{ fontSize: fontSize.size10, color: "#747475" }}>
            {item.id ?? "NCC0000001"}
          </Text>
          <TouchableOpacity>
            <Svgs.icon_edit width={scaleWidth(14)} height={scaleHeight(14)} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: fontSize.size12,
            fontWeight: "600",
            paddingVertical: 5,
          }}>
          {item.name ?? "Công ty TNHH MTV Mặt Trời Hồng"}
        </Text>
        <Text style={{ fontSize: fontSize.size12, color: "#242424" }}>
          {item.phone ?? "0344911322"}
        </Text>
      </View>
    </View>
  );
};
