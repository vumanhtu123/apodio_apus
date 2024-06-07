import React, { useState } from "react";
import { Alert, View } from "react-native";
import Modal from "react-native-modal";
import { scaleHeight } from "../../../theme";
import { Text } from "../../../components";
import { InputSelect } from "../../../components/input-select/inputSelect";
import DropdownModal from "../../product/component/multiSelect";

interface InputSelect {
  isVisible: boolean;
  closeDialog: () => void;
}

export const ModalTaxes = (data: InputSelect) => {
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
        // paddingTop: showMore ? scaleHeight(160) : null,
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
          tx="order.taxes_apply"
          style={{
            color: "#242424",
            fontWeight: "700",
            fontSize: 14,
            marginHorizontal: 24,
            marginTop: 25,
          }}></Text>
        <View
          style={{
            height: 1,
            backgroundColor: "#E7EFFF",
            marginVertical: 18,
            marginHorizontal: 15,
          }}
        />
        <DropdownModal
          required={true}
          arrData={[]}
          onPressChoice={(item: any) => {
            const items = item.map((item: { value: any }) => item.value);
            // handleSelect(items);
          }}
          // dataEdit={}
          titleTx={"order.taxes"}
          hintTx={"order.selectTaxes"}
          styleView={{
            backgroundColor: "#F6F7F9",
            paddingHorizontal: 15,
            paddingVertical: 8,
            marginVertical: 15,
            marginHorizontal: 15,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            justifyContent: "space-between",
            marginBottom: 15,
            marginTop: 5,
          }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#747475",
            }}>
            <Text
              tx="order.back"
              style={{
                color: "#747475",
                fontSize: 14,
                fontWeight: "600",
                marginHorizontal: 50,
                marginVertical: 12,
              }}></Text>
          </View>
          <View
            style={{
              backgroundColor: "#0078D4",
              borderRadius: 8,
            }}>
            <Text
              tx="order.back"
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "600",
                marginHorizontal: 50,
                marginVertical: 12,
              }}></Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
