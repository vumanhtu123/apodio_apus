import React, { useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { scaleHeight } from "../../../theme";
import { Text } from "../../../components";
import { InputSelect } from "../../../components/input-select/inputSelect";

interface InputSelect {
  isVisible: boolean;
  closeDialog: () => void;
  arrData: {}[];
  method: number;
  setMethod: (item: number, name: string) => void;
  debt: { isHaveDebtLimit: any; debtAmount: any };
}

export const ModalPayment = (data: InputSelect) => {
  const check = useRef(false);
  return (
    <Modal
      onBackdropPress={() => data.closeDialog()}
      isVisible={data.isVisible}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      style={{
        backgroundColor: "rgba(0,0,0,0.1)",
        margin: 0,
        justifyContent: "flex-end",
      }}>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            height: 5,
            backgroundColor: "#C7C7C7",
            marginTop: scaleHeight(8),
            marginHorizontal: 137,
            borderRadius: 100,
          }}
        />
        <Text
          tx="order.payment_method"
          style={{
            color: "#242424",
            fontWeight: "700",
            fontSize: 14,
            marginHorizontal: 24,
            marginTop: 25,
          }}></Text>
        {data.arrData.map((payment: any, index) => {
          return (
            <Item_Payment
              setData={function (value: any, name: any): void {
                {
                  check.current === true ? data.setMethod(value, name) : null;
                }
                console.log("tuvm", check.current);
              }}
              debt={data.debt}
              name={payment.label}
              id={data.method}
              index={index}
            />
          );
        })}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            justifyContent: "space-between",
            marginBottom: 15,
            marginTop: 5,
          }}>
          <TouchableOpacity
            onPress={() => {
              check.current = false;
              data.closeDialog();
            }}>
            <View
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#747475",
              }}>
              <Text
                tx="order.cancel"
                style={{
                  color: "#747475",
                  fontSize: 14,
                  fontWeight: "600",
                  marginHorizontal: 60,
                  marginVertical: 12,
                }}></Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              check.current = true;
              console.log("clode", check.current);
              data.closeDialog();
            }}>
            <View
              style={{
                backgroundColor: "#0078D4",
                borderRadius: 8,
              }}>
              <Text
                tx="order.apply"
                style={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "600",
                  marginHorizontal: 50,
                  marginVertical: 12,
                }}></Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

interface InputItem {
  setData: (value: any, name: string) => void;
  name: string;
  id: number;
  debt: { isHaveDebtLimit: any; debtAmount: any };
  index: number;
}

const Item_Payment = (data: InputItem) => {
  console.log("tuvm log", data.debt.isHaveDebtLimit);
  return (
    <View
      style={{
        flexDirection: "column",
        marginHorizontal: 15,
        marginBottom: 20,
      }}>
      <View
        style={{
          height: 1,
          backgroundColor: "#E7EFFF",
          marginVertical: 16,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          {
            data.index === 4 && data.debt.isHaveDebtLimit === false
              ? null
              : data.setData(data.index, data.name);
          }
          console.log("0", data.name);
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 11,
          }}>
          <View
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "#DFE0EB",
              alignSelf: "center",
              padding: 2,
            }}>
            <View
              style={{
                borderRadius: 50,
                width: 16,
                height: 16,
                backgroundColor:
                  data.index === 4 && data.debt.isHaveDebtLimit === false
                    ? "white"
                    : data.id == data.index
                    ? "#0078D4"
                    : "white",
                alignSelf: "center",
              }}></View>
          </View>
          <Text
            text={data.name}
            style={{
              fontSize: 14,
              fontWeight: "500",
              color:
                data.index === 4 && data.debt.isHaveDebtLimit === false
                  ? "#DFE0EB"
                  : data.index !== 4 && data.debt.isHaveDebtLimit === true
                  ? "#242424"
                  : "#242424",
              paddingHorizontal: 8,
            }}></Text>
          {data.index === 4 && data.debt.isHaveDebtLimit === true ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                tx="order.available_limit"
                style={{
                  fontWeight: "400",
                  fontSize: 12,
                  color: "#747475",
                  alignContent: "center",
                }}></Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#FF0000",
                }}>
                {data.debt.debtAmount ?? 0}
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#747475",
                    alignContent: "center",
                  }}>
                  )
                </Text>
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};
