import React, { useEffect, useRef, useState } from "react";
import { Alert, Platform, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../components";
import { InputSelect } from "../../../components/input-select/inputSelect";

interface InputSelect {
  isVisible: boolean;
  closeDialog: () => void;
  arrName: (name: any) => void;
  arrTaxes?: {}[];
  arrEditName: any;
}

export const ModalTaxes = (data: InputSelect) => {
  const [name, setName] = useState({ label: "", value: "" });

  useEffect(() => {
    setName({ label: "", value: "" });
  }, [data.isVisible]);

  return (
    <Modal
      onBackdropPress={() => data.closeDialog()}
      isVisible={data.isVisible}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      style={{
        backgroundColor: "rgba(0,0,0,0.1)s",
        margin: 0,
        justifyContent: "flex-end",
        // paddingTop: showMore ? scaleHeight(160) : null,
      }}>
      <View
        style={{
          backgroundColor: "white",
          borderTopLeftRadius: margin.border_top_left_radius,
          borderTopRightRadius: margin.border_top_right_radius,
        }}>
        <View
          style={{
            height: scaleHeight(5),
            backgroundColor: colors.veryLightGrey1,
            marginTop: scaleHeight(8),
            marginHorizontal: scaleWidth(137),
            borderRadius: 100,
          }}
        />
        <Text
          tx="order.taxes_apply"
          style={{
            color: colors.nero,
            fontWeight: "700",
            fontSize: fontSize.size14,
            marginHorizontal: scaleWidth(24),
            marginTop: scaleHeight(25),
          }}></Text>
        <View
          style={{
            height: 1,
            backgroundColor: colors.solitude2,
            marginTop: scaleHeight(18),
            marginHorizontal: scaleWidth(15),
          }}
        />
        <InputSelect
          titleTx={"order.taxes"}
          hintTx={"order.selectTaxes"}
          isSearch={false}
          required={true}
          arrData={data.arrTaxes ?? []}
          dataDefault={name.label ?? ""}
          onPressChoice={(item: any) => {
            setName(item);
            console.log("name", name);
          }}
          styleView={{
            backgroundColor: colors.aliceBlue,
            paddingHorizontal: scaleWidth(15),
            paddingVertical: scaleHeight(8),
            marginVertical: scaleHeight(22),
            marginHorizontal: scaleWidth(15),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            justifyContent: "space-between",
            marginBottom: Platform.OS === "ios" ? scaleHeight(50) : scaleHeight(15),
            marginTop: scaleHeight(5),
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.veryLightGrey,
              alignItems: 'center',
              paddingHorizontal: scaleWidth(55),
              paddingVertical: scaleWidth(12),
              // width: scaleWidth(150)
            }}
            onPress={() => {
              data.closeDialog();
            }}>
            <Text
              tx="order.back"
              style={{
                color: colors.dolphin,
                fontSize: fontSize.size14,
                fontWeight: "600",
                textAlign : 'center',
                width : scaleWidth(55)
              }} />
          </TouchableOpacity>
          <View style={{width:scaleWidth(12)}}></View>
          <TouchableOpacity
            onPress={() => {
              data.arrName(name);
              console.log("item b", name);
            }}
            style={{
              backgroundColor: colors.navyBlue,
              borderRadius: 8,
              alignItems :'center',
              paddingHorizontal: scaleWidth(55),
              paddingVertical: scaleWidth(12),
              // width: scaleWidth(150)
            }}
          >
            <Text
              tx="order.select"
              style={{
                color: "white",
                fontSize: fontSize.size14,
                fontWeight: "600",
                textAlign : 'center',
                width : scaleWidth(55)
              }}/>
          </TouchableOpacity>
        </View>
      </View >
    </Modal >
  );
};
