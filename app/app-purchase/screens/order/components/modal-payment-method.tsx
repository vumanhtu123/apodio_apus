import React, { useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { margin, scaleHeight, scaleWidth, fontSize, colors } from "../../../theme";
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
            backgroundColor: colors.veryLightGrey1,
            marginTop: scaleHeight(8),
            marginHorizontal: scaleWidth(137),
            borderRadius: 100,
          }}
        />
        <Text
          tx={data.isPayment === true ? "order.payment_method" : "order.advance_payment_method"}
          style={{
            color: colors.nero,
            fontWeight: "700",
            fontSize: fontSize.size14,
            marginHorizontal: scaleWidth(24),
            marginTop: scaleHeight(25),
            marginBottom : scaleHeight(15)
          }}></Text>
        <View style={{ marginBottom: scaleHeight(20) }}>
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
        </View>
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
              borderColor: colors.veryLightGrey,
              alignItems: 'center',
              paddingHorizontal: scaleWidth(55),
              paddingVertical: scaleWidth(12),
              // marginRight : scaleWidth(12)
              // width: scaleWidth(150)
            }}>
            <Text
              tx="order.cancel"
              style={{
                color: colors.dolphin,
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
              backgroundColor: colors.navyBlue,
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
        marginHorizontal: scaleWidth(15),
      }}>
      <View
        style={{
          height: 1,
          backgroundColor: colors.solitude2,
          marginVertical: scaleHeight(16),
        }}
      />
      <TouchableOpacity
        onPress={() => {
          {
            data.index === data.length - 1 && data.debt.isHaveDebtLimit === false
              ? null : data.index === data.length - 1 && data.debt.debtAmount === 0 ? null
                : data.setData(data.index, data.name);
          }
          console.log("0", data.name);
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: scaleWidth(10),
          }}>
          <View
            style={{
              borderRadius: 50,
              borderWidth: 1,
              borderColor: colors.quartz,
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
                    ? "white" : data.index === data.length - 1 && data.debt.debtAmount === 0 ? "white"
                      : data.id == data.index
                        ? colors.navyBlue
                        : "white",
                alignSelf: "center",
              }}></View>
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'center', paddingHorizontal: scaleWidth(8) }}>
            <Text
              text={data.name}
              style={{
                fontSize: fontSize.size14,
                fontWeight: "500",
                color:
                  data.index === data.length - 1 && data.debt.isHaveDebtLimit === false
                    ? colors.quartz : data.index === data.length - 1 && data.debt.debtAmount === 0 ? colors.quartz
                      : data.index !== data.length - 1 && data.debt.isHaveDebtLimit === true
                        ? colors.nero
                        : colors.nero,
              }}></Text>
            {data.index === data.length - 1 && data.debt.isHaveDebtLimit === true && data.debt.debtAmount !== 0 ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  tx="order.available_limit"
                  style={{
                    fontWeight: "400",
                    fontSize: fontSize.size12,
                    color: colors.dolphin,
                    alignContent: "center",
                  }}></Text>
                <Text
                  style={{
                    fontSize: fontSize.size12,
                    fontWeight: "400",
                    color: colors.red,
                  }}>
                  {formatVND(formatCurrency(commasToDots(data.debt.debtAmount))) ?? 0}
                  <Text
                    text=")"
                    style={{
                      fontWeight: "400",
                      fontSize: fontSize.size12,
                      color: colors.dolphin,
                      alignContent: "center",
                    }}>
                  </Text>
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
