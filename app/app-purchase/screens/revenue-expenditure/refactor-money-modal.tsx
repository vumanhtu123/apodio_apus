import React, { useState } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import { Text, TextField } from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { colors, scaleHeight, scaleWidth } from "../../theme";
import Modal from "react-native-modal";
import { Numpad } from "./component/num-pad-component";

interface Input {
  onVisible?: any;
  onClose?: any;
}

export const RefactorMoneyModal = (props: Input) => {
  const list = ["100.000", "200.000", "300.000"];
  const [selectedValue, setSelectedValue] = useState<any>([]);
  const [closeValue, setCloseValue] = useState<any>(props.onVisible);
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  // console.log("tuvm acb", selectedValue);

  const addItem = (item: any) => {
    setSelectedValue([...selectedValue, item]);
  };

  const deleteItem = () => {
    const updatedItems = selectedValue.slice(0, selectedValue.length - 1);
    setSelectedValue(updatedItems);
  };

  const closeModal = () => {
    setCloseValue(!props.onVisible);
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={750}
      isVisible={props.onVisible}
      style={{ margin: 0 }}
      avoidKeyboard={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          width: "100%",
          bottom: 0,
          position: "absolute",
        }}>
        <View
          style={{
            height: 5,
            backgroundColor: colors.veryLightGrey1,
            borderRadius: 100,
            marginHorizontal: 154,
            marginTop: 8,
          }}></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 16,
            marginVertical: 18,
          }}>
          <Text
            tx={"analysis.refactorMoney"}
            style={{
              color: colors.nero,
              fontSize: 14,
              fontWeight: "700",
            }}></Text>
          <TouchableOpacity
            onPress={() => {
              props.onClose();
            }}>
            <Text
              tx={"analysis.cancel"}
              style={{
                color: colors.radicalRed,
                fontSize: 14,
                fontWeight: "700",
              }}></Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            backgroundColor: colors.solitude2,
            borderWidth: 0.19,
          }}></View>
        <Controller
          control={control}
          defaultValue={""}
          name="nameMoney"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              isImportant
              // autoFocus
              keyboardType={null}
              labelTx={"analysis.nameMoney"}
              txColor="black"
              style={{
                marginVertical: 20,
                marginHorizontal: scaleWidth(14),
                // borderWidth: 1.5,
                borderColor: colors.palette.navyBlue,
              }}
              RightIconClear={null}
              value={value}
              onBlur={() => onBlur()}
              error={""}
              onClearText={() => onChange("")}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}></Controller>
        <Controller
          control={control}
          defaultValue={""}
          name="nameMoney"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              // autoFocus
              keyboardType={null}
              labelTx={"analysis.initBalance"}
              txColor="black"
              style={{
                marginHorizontal: scaleWidth(14),
                // borderWidth: 1.5,
                borderColor: colors.palette.navyBlue,
              }}
              RightIconClear={null}
              value={selectedValue.join("")}
              onBlur={() => onBlur()}
              error={""}
              onClearText={() => onChange("")}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}></Controller>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 16,
            marginVertical: 15,
          }}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 48,
              paddingVertical: 12,
              alignContent: "center",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.dolphin,
            }}>
            <Text
              tx={"analysis.back"}
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.dolphin,
                marginLeft: 5,
              }}></Text>
          </View>
          <View
            style={{
              backgroundColor: colors.navyBlue,
              flexDirection: "row",
              paddingHorizontal: 48,
              paddingVertical: 12,
              alignContent: "center",
              borderRadius: 8,
            }}>
            <Text
              tx={"analysis.confirm"}
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.white,
                marginLeft: 5,
              }}></Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 16,
            justifyContent: "space-between",
          }}>
          {list.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: colors.aliceBlue,
                  }}>
                  <Text style={{ paddingHorizontal: 23, paddingVertical: 11 }}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <Numpad
          addItem={(item: any) => {
            addItem(item);
          }}
          deleteItem={() => {
            deleteItem();
          }}
          selectedOK={() => {
            console.log("OKK");
          }}
        />
      </View>
    </Modal>
  );
};
