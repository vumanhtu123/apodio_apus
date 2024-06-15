import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Images } from "../../../../assets";
import { Text } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { OnProgressEvent } from "react-native-fast-image";
interface InputData {
  openDialog: () => void;
  data: any;
}
interface AddressData {
  onPressAddress: () => void;
  data: any;
}
export const HeaderOrder = (data: InputData) => {
  console.log(data);
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
          {data.data.name !== "" ? (
            <Text
              text={data.data.name}
              style={{
                marginLeft: 8,
                color: "#242424",
                fontSize: 12,
                fontWeight: "600",
              }}></Text>
          ) : (
            <Text
              tx="order.choose_customer"
              style={{
                marginLeft: 8,
                color: "#747475",
                fontSize: 12,
                fontWeight: "400",
              }}></Text>
          )}
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
      onPress={() => navigation.navigate("selectApplicablePriceList" as never)}>
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
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("deliveryAddress" as never)}>
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
          {data.data !== undefined ? (
            <View>
              {/* <Text
                style={{
                  fontSize: 12,
                  color: "#242424",
                  fontWeight: "400",
                }}></Text> */}
              {data.data.phoneNumber != null ? (
                <Text
                  text={data.data?.phoneNumber ?? ""}
                  style={{
                    marginVertical: 8,
                    fontSize: 12,
                    color: "#242424",
                    fontWeight: "400",
                  }}></Text>
              ) : null}

              <Text
                text={`${data.data.address}${", "}${data.data.ward.name}`}
                style={{
                  fontSize: 12,
                  color: "#242424",
                  fontWeight: "400",
                }}></Text>
            </View>
          ) : (
            <Text
              tx="order.no_address_order"
              style={{
                fontSize: 10,
                color: "#747475",
                fontWeight: "400",
              }}></Text>
          )}
        </View>
        <Images.icon_caretRight2 />
      </View>
    </TouchableOpacity>
  );
};
