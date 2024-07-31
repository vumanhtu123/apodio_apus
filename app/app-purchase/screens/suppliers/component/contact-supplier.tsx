import React, { useState } from "react";
import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { Text } from "../../../../components";
import { fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { Svgs } from "../../../../../assets/svgs";
import { dataContact } from "../styles/data";

export const ContactSupplier = () => {
  return (
    <View style={{ flexDirection: "column", justifyContent: "center" }}>
      <View
        style={{
          backgroundColor: "#0078D4",
          borderRadius: 4,
          width: 77,
          height: 24,
          alignSelf: "flex-end",
          marginRight: 16,
        }}>
        <Text
          tx="suppliers.addContact"
          style={{
            fontSize: 10,
            fontWeight: "400",
            textAlign: "center",
            color: "white",
            paddingHorizontal: scaleWidth(8),
            paddingVertical: scaleHeight(6),
          }}></Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataContact}
          showsVerticalScrollIndicator={false}
          // refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshNotifications} title="ok" />}
          keyExtractor={(item) => item.id.toString()}
          // onEndReached={handleEndReached}
          onEndReachedThreshold={0.8}
          // ListFooterComponent={renderFooter}
          numColumns={1}
          columnWrapperStyle={null}
          renderItem={ItemContact}
        />
      </View>
    </View>
  );
};

const ItemContact = (item: any) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 15,
        alignItems: "center",
        marginVertical: 15,
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
        <Image
          style={{ width: 42, height: 42 }}
          source={require("../../../../../assets/icons/logo_default.png")}></Image>
      </View>
      <View style={{ flexDirection: "column", width: "80%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <Text
            style={{
              fontSize: fontSize.size12,
              color: "#242424",
              fontWeight: "400",
            }}>
            {item.name ?? "Chị Nguyễn Lan Hương"}
          </Text>
          <TouchableOpacity>
            <Svgs.icon_edit width={scaleWidth(14)} height={scaleHeight(14)} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: fontSize.size12,
            fontWeight: "400",
            marginVertical: 5,
          }}>
          {item.office ?? "Trưởng phòng kinh doanh"}
        </Text>
        <Text style={{ fontSize: fontSize.size12, color: "#242424" }}>
          {item.phone ?? "0982 876 118"}
        </Text>
        <Text
          style={{
            fontSize: fontSize.size12,
            color: "#242424",
            marginVertical: 5,
          }}>
          {item.email ?? "nguyenlanhuong@gmail.com"}
        </Text>
        <Text style={{ fontSize: fontSize.size12, color: "#242424" }}>
          {item.uuid ?? "0013010274646"}
        </Text>
      </View>
    </View>
  );
};
