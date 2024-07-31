import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text } from "../../../../components";
import { fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import { translate } from "i18n-js";

export const InfoDetails = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "column",
        paddingHorizontal: 16,
        paddingVertical: 15,
      }}>
      <Text
        tx="suppliers.infoDetails"
        style={{
          paddingBottom: 10,
          fontSize: 12,
          fontWeight: "600",
          color: "#242424",
        }}></Text>
      <View style={{ flexDirection: "row" }}>
        <Text
          tx={"suppliers.type"}
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: "#242424",
          }}></Text>
        <Text
          style={{ fontSize: 12, fontWeight: "400", color: "#242424" }}
          text=" Tổ chức"></Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text
          tx="suppliers.group"
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: "#242424",
          }}></Text>
        <Text
          style={{ fontSize: 12, fontWeight: "400", color: "#242424" }}
          text=" Đồng bằng sông hồng"></Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text
          tx="suppliers.email"
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: "#242424",
          }}></Text>
        <Text
          style={{ fontSize: 12, fontWeight: "400", color: "#242424" }}
          text=" Contact@gmail.com"></Text>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Text
          tx="suppliers.numberIdentification"
          style={{
            fontSize: 12,
            fontWeight: "400",
            color: "#242424",
          }}></Text>
        <Text
          style={{ fontSize: 12, fontWeight: "400", color: "#242424" }}
          text=" 0344911322"></Text>
      </View>
    </View>
  );
};

export const InfoAddress = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "column",
        paddingHorizontal: 16,
        paddingVertical: 15,
        marginVertical: 15,
      }}>
      <Text
        tx="suppliers.infoAddress"
        style={{
          paddingBottom: 10,
          fontSize: 12,
          fontWeight: "600",
          color: "#242424",
        }}></Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Svgs.ic_location width={14} height={14} />
        <Text
          style={{ fontWeight: "400", fontSize: 12, marginLeft: 5 }}
          text="24 Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam"></Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 15,
        }}>
        <Svgs.ic_oto width={30} height={30} />
        <View style={{ flexDirection: "column", marginLeft: 8 }}>
          <Text
            tx="suppliers.deliveryAddress"
            style={{
              paddingBottom: 10,
              fontSize: 12,
              fontWeight: "600",
              color: "#242424",
            }}></Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Svgs.ic_location width={14} height={14} />
            <Text
              style={{ fontWeight: "400", fontSize: 12 }}
              text="24 Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam"></Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 15,
        }}>
        <Svgs.ic_oto width={30} height={30} />
        <View style={{ flexDirection: "column", marginLeft: 8 }}>
          <Text
            tx="suppliers.storageAddress"
            style={{
              paddingBottom: 10,
              fontSize: 12,
              fontWeight: "600",
              color: "#242424",
            }}></Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Svgs.ic_location width={14} height={14} />
            <Text
              style={{ fontWeight: "400", fontSize: 12 }}
              text="24 Dịch Vọng Hậu, Cầu Giấy, Hà Nội, Việt Nam"></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const InfoBank = () => {
  return (
    <View
      style={{
        backgroundColor: "white",
        flexDirection: "column",
        paddingHorizontal: 16,
        paddingVertical: 15,
      }}>
      <Text
        tx="suppliers.infoBank"
        style={{
          paddingBottom: 10,
          fontSize: 12,
          fontWeight: "600",
          color: "#242424",
        }}></Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{ width: 42, height: 42 }}
          source={require("../../../../../assets/icons/logo_default.png")}></Image>
        <View style={{ flexDirection: "column", marginLeft: 8 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              tx="suppliers.bankName"
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#242424",
              }}></Text>
            <Text
              style={{ fontSize: 12, fontWeight: "400", color: "#242424" }}
              text=" BIDV"></Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              tx="suppliers.bankNumber"
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#242424",
              }}></Text>
            <Text
              style={{ fontSize: 12, fontWeight: "400", color: "#242424" }}
              text=" 102875087567"></Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              tx="suppliers.bankAccount"
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "#242424",
              }}></Text>
            <Text
              style={{ fontSize: 12, fontWeight: "400", color: "#242424" }}
              text=" Vu Manh Tu"></Text>
          </View>
        </View>
      </View>
    </View>
  );
};
