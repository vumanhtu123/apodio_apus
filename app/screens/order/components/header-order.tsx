import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Images } from "../../../../assets";
import { Text } from "../../../components";
import { useNavigation } from "@react-navigation/native";
interface InputData {
  openDialog: () => void;
}
export const HeaderOrder = (data: InputData) => {
  return (
    <TouchableOpacity
      onPress={() => {
        data.openDialog();
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderRadius: 8,
          justifyContent: "space-between",
          marginTop: 20,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "center",
          }}>
          <Images.ic_avatar_order />
          <Text
            tx="order.choose_customer"
            style={{
              marginLeft: 8,
              color: "#747475",
              fontSize: 12,
              fontWeight: "400",
            }}></Text>
        </View>
        <Images.icon_caretRight2 />
      </View>
    </TouchableOpacity>
  );
};

export const PriceList = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: "space-between",
      }}>
      <View
        style={{
          flexDirection: "column",
        }}>
        <Text
          tx="order.price_list"
          style={{
            fontSize: 12,
            color: "#242424",
            fontWeight: "600",
            marginBottom: 4,
          }}></Text>
        <Text
          tx="order.no_price_list"
          style={{
            fontSize: 10,
            color: "#747475",
            fontWeight: "400",
          }}></Text>
      </View>
      <Images.icon_caretRight2 />
    </View>
  );
};

export const AddressOrder = () => {
  const navigation = useNavigation()
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: "space-between",
        marginVertical: 15,
      }}>
      <View
        style={{
          flexDirection: "column",
        }}>
        <Text
          tx="order.address_order"
          style={{
            fontSize: 12,
            color: "#242424",
            fontWeight: "600",
            marginBottom: 4,
          }}></Text>
        <Text
          tx="order.no_address_order"
          style={{
            fontSize: 10,
            color: "#747475",
            fontWeight: "400",
          }}></Text>
      </View>
      <TouchableOpacity onPress={()=> navigation.navigate('deliveryAddress' as never)} >
      <Images.icon_caretRight2 />
      </TouchableOpacity>
    </View>
  );
};
