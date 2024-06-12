import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Images } from "../../../../assets";
import { Text } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { OnProgressEvent } from "react-native-fast-image";
interface InputData {
  openDialog: () => void;
}
interface AddressData {
  onPressAddress: () => void;
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
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: "space-between",
      }}
      onPress={() => navigation.navigate('selectApplicablePriceList')}
    >
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
    </TouchableOpacity>
  );
};

export const AddressOrder = (data: AddressData) => {
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
      <TouchableOpacity onPress={() => navigation.navigate('deliveryAddress' as never)} >
        <Images.icon_caretRight2 />
      </TouchableOpacity>
    </View>
  );
};
