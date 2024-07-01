import React, { useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { margin, scaleHeight, scaleWidth, fontSize } from "../../../theme";
import { Text } from "../../../components";
import { InputSelect } from "../../../components/input-select/inputSelect";
import { commasToDots, formatCurrency, formatVND } from "../../../utils/validate";

interface InputSelect {
  isVisible: boolean;
  closeDialog: () => void;
  onSave?: () => void;
  arrData: {}[];
  method: number;
  setMethod: (item: number, name: string) => void;
  debt: { isHaveDebtLimit: any; debtAmount: any };
  isPayment?: boolean;
}

export const ModalPayment = (data: InputSelect) => {
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
      <View style={{
        backgroundColor: "white", borderTopLeftRadius: margin.border_top_left_radius,
        borderTopRightRadius: margin.border_top_right_radius,
      }}>
        <View
          style={{
            height: 5,
            backgroundColor: "#C7C7C7",
            marginTop: scaleHeight(8),
            marginHorizontal: scaleWidth(137),
            borderRadius: 100,
          }}
        />
        <Text
          tx={data.isPayment === true ? "order.payment_method" : "order.advance_payment_method"}
          style={{
            color: "#242424",
            fontWeight: "700",
            fontSize: fontSize.size14,
            marginHorizontal: scaleWidth(24),
            marginTop: scaleHeight(25),
          }}></Text>
        {data.arrData?.map((payment: any, index) => {
          return (
            <Item_Payment
              setData={function (value: any, name: any): void {
                data.setMethod(value, name)
              }}
              debt={data.debt}
              name={payment.label}
              id={data.method}
              index={index}
              length={data.arrData.length}
            />
          );
        })}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: scaleWidth(15),
            justifyContent: "space-between",
            marginBottom: scaleHeight(15),
            marginTop: scaleHeight(5),
          }}>
          <TouchableOpacity
            onPress={() => {
              data.closeDialog();
            }}
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#c8c8c8",
              alignItems: 'center',
              paddingHorizontal: scaleWidth(55),
              paddingVertical: scaleWidth(12),
              // marginRight : scaleWidth(12)
              // width: scaleWidth(150)
            }}>
            <Text
              tx="order.cancel"
              style={{
                color: "#747475",
                fontSize: fontSize.size14,
                fontWeight: "600",
                textAlign: 'center',
                width: scaleWidth(55)
                // marginHorizontal: scaleWidth(60),
                // marginVertical: scaleHeight(12),
              }}></Text>
          </TouchableOpacity>
          <View style={{ width: scaleWidth(12) }}></View>
          <TouchableOpacity
            onPress={() => {
              data.closeDialog();
              data.onSave();
            }}
            style={{
              backgroundColor: "#0078D4",
              borderRadius: 8,
              alignItems: 'center',
              paddingHorizontal: scaleWidth(55),
              paddingVertical: scaleWidth(12),
              // width: scaleWidth(150)
            }}
          >
            <Text
              tx="order.apply"
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "600",
                textAlign: 'center',
                width: scaleWidth(55)
                // marginHorizontal: scaleWidth(50),
                // marginVertical: scaleHeight(12),
              }}></Text>
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
  length: number;
}

const Item_Payment = (data: InputItem) => {
  console.log("tuvm log", data.debt.debtAmount);
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
            data.index === data.length - 1 && data.debt.isHaveDebtLimit === false 
              ? null : data.index === data.length - 1 && data.debt.debtAmount ===0 ? null
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
                  data.index === data.length - 1 && data.debt.isHaveDebtLimit === false
                    ? "white" : data.index === data.length - 1 && data.debt.debtAmount === 0 ?  "white"
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
                data.index === data.length - 1 && data.debt.isHaveDebtLimit === false
                  ? "#DFE0EB" : data.index === data.length - 1 && data.debt.debtAmount === 0 ?  "#DFE0EB"
                  : data.index !== data.length - 1 && data.debt.isHaveDebtLimit === true
                    ? "#242424"
                    : "#242424",
              paddingHorizontal: 8,
            }}></Text>
          {data.index === data.length - 1 && data.debt.isHaveDebtLimit === true && data.debt.debtAmount !== 0 ? (
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
                {formatVND(formatCurrency(commasToDots(data.debt.debtAmount))) ?? 0}
                <Text
                  text=")"
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    color: "#747475",
                    alignContent: "center",
                  }}>

                </Text>
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};
