import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Images } from "../../../../assets";
import { Text } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { OnProgressEvent } from "react-native-fast-image";
import { Root1 } from "../../../models/order-store/entities/order-address-model";
import { useStores } from "../../../models";
interface InputData {
  openDialog: () => void;
  data: any;
  disabled?: boolean;
}
interface AddressData {
  onPressAddress: () => void;
  data: Root1;
}
interface PriceData {
  id: number;
  name: string;
  priceListCategory: string;
  currencyId: number;
  pricelistId: number;
  disabled?: boolean;
}
export const HeaderOrder = (data: InputData) => {
  console.log(data);
  return (
    <TouchableOpacity
    disabled={data.disabled}
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
        {data.disabled === true ? null:
        <Images.icon_caretRight2 />
        }
      </View>
    </TouchableOpacity>
  );
};

export const PriceList = (data: PriceData) => {
  const navigation = useNavigation();
  console.log("price", Number(data.id));
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
      disabled={data.disabled}
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
        {Number(data.id) !== 0 || data.name !== "" ? (
          <Text
            text={data.name}
            style={{
              fontSize: 10,
              color: "#747475",
              fontWeight: "400",
            }}></Text>
        ) : (
          <Text
            tx="order.no_price_list"
            style={{
              fontSize: 10,
              color: "#747475",
              fontWeight: "400",
            }}></Text>
        )}
      </View>
     {data.disabled === true ? null : <Images.icon_caretRight2 />}
    </TouchableOpacity>
  );
};

export const AddressOrder = (data: AddressData) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => data.onPressAddress()}>
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
          {data.data.id !== 0 ? (
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
                text={`${data.data?.address}${", "}${data.data?.ward?.name}${", "}${data.data?.district?.name}${", "}${data.data?.city?.name}`}
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

interface DataSumMoney {
  arrVat: any;
  sumNoVat: number;
  sumVat: number;
  discount: number;
}

export const SumMoney = (props: DataSumMoney) => {
  const { orderStore } = useStores()

  const total = props.arrVat.reduce((accumulator: number, currentObject: { unitPrice: any; amount: any; taxesInput: any; taxValue: any; }) => {
    return accumulator + ((Number(currentObject.unitPrice ?? 0) * Number(currentObject.amount ?? 0)) - ((Number(currentObject.taxesInput ?? 0) / 100) * (Number(currentObject.unitPrice ?? 0) * Number(currentObject.amount ?? 0))) + Number(currentObject.taxValue ?? 0));
  }, 0);
  const discount = props.arrVat.reduce((accumulator: number, currentObject: { taxesInput: any; unitPrice: any; amount: any; }) => {
    return accumulator + ((Number(currentObject.taxesInput ?? 0) / 100) * (Number(currentObject.unitPrice ?? 0) * Number(currentObject.amount ?? 0)));
  }, 0);


  // Gom nhóm các item và tính tổng taxValue
  const groupedTaxValues = props.arrVat.reduce((acc: { [x: string]: { label: any; value: any; taxValue: any; }; }, product: { VAT: { value: any; label: any; }; taxValue: any; }) => {
    const vatValue = product.VAT?.value;
    if (acc[vatValue]) {
      acc[vatValue].taxValue += product.taxValue;
    } else {
      acc[vatValue] = {
        label: product.VAT?.label,
        value: vatValue,
        taxValue: product.taxValue
      };
    }
    return acc;
  }, {});
  const arrTaxValues = Object.values(groupedTaxValues);

  orderStore.setDataProductAddOrder(props.arrVat.slice());
  console.log('props.arrVat------', arrTaxValues)
  const Sum = () => {
    return Number(props.sumVat ?? 0) - Number(props.discount ?? 0);
  };
  const SumNoVAT = () => {
    return Number(props.sumNoVat ?? 0) - Number(props.discount ?? 0);
  };
  var sumValue;
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        // flexDirection: "row",
        borderRadius: 8,
        backgroundColor: "white",
        justifyContent: "space-between",
        marginVertical: 15,
      }}>


      <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          tx="order.sum_no_texas"
          style={{ fontSize: 10, fontWeight: "400", color: "#747475" }} />
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#747475", justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          {(isNaN(props.sumNoVat) ? 0 : props.sumNoVat) ?? 0}
        </Text>
      </View>

      {props.arrVat != undefined
        ? arrTaxValues?.map((data: any) => {
          return data.taxValue != undefined ? (
            <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#747475",
                  marginTop: 8,
                }}>
                {data?.label ?? null}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#747475",
                  marginTop: 8,
                }}>
                {data?.taxValue ?? null}
              </Text>
            </View>
          ) : null;
        })
        : null}

      {orderStore.checkPriceList === false ?
        (
          <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text
              tx="order.discount"
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "#747475",
                marginTop: 8,
              }} />
            <Text
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "#747475",
                marginTop: 8,
              }}>
              {discount ?? 0}
            </Text>
          </View>
        ) : null}
      <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
        <Text
          tx="order.sum_yes_texas"
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: "#747475",
            marginTop: 8,
          }} />
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: "#FF4956",
            marginTop: 8,
          }}>
          {total}
        </Text>
      </View>
    </View>
  );
};