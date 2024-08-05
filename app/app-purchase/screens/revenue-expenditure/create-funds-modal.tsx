import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Text, TextField } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { colors, scaleHeight, scaleWidth } from "../../theme";
import { Svgs } from "../../../../assets/svgs";
import Modal from "react-native-modal";
import { Numpad } from "./component/num-pad-component";

interface Input {
  onVisible?: any;
  onClose?: any;
}

export const CreateFunds = (props: Input) => {
  const list = ["100.000", "200.000", "300.000"];
  const [selectedValue, setSelectedValue] = useState<any>([]);
  const [closeValue, setCloseValue] = useState<any>(props.onVisible);
  const [isFocused, setIsFocused] = useState(false);
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  console.log("doan acb", isFocused);

  const addItem = (item: any) => {
    setSelectedValue([...selectedValue, item]);
  };

  const deleteItem = () => {
    const updatedItems = selectedValue.slice(0, selectedValue.length - 1);
    setSelectedValue(updatedItems);
  };

  const handlerFocus = () => {
    setIsFocused(!isFocused);
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
      <View style={styles.containerModal}>
        <View style={styles.viewLine}></View>
        <View style={styles.viewButton}>
          <Text tx={"analysis.createFunds"} style={styles.textFunds}></Text>
          <TouchableOpacity
            onPress={() => {
              props.onClose();
            }}>
            <Text tx={"analysis.cancel"} style={styles.textCancel}></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.viewTittleFormField}></View>
        <Controller
          control={control}
          defaultValue={""}
          name="nameMoney"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              onFocus={handlerFocus}
              isImportant
              // autoFocus
              keyboardType={null}
              labelTx={"analysis.nameMoney"}
              txColor="black"
              style={styles.styleTextField}
              RightIconClear={null}
              value={value}
              onBlur={() => {
                handlerFocus;
                onBlur();
              }}
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
        <View style={styles.viewBottom}>
          <View style={styles.viewBack}>
            <Text tx={"analysis.back"} style={styles.textBack}></Text>
          </View>
          <View style={styles.viewConfirm}>
            <Text tx={"analysis.confirm"} style={styles.textConfirm}></Text>
          </View>
        </View>
        <View style={styles.viewList}>
          {list.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <View style={{ borderRadius: 10, backgroundColor: colors.aliceBlue }}>
                  <Text style={{ paddingHorizontal: 23, paddingVertical: 11 }}>
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        {!isFocused && (
          <Numpad
            addItem={(item: any) => {
              addItem(item);
            }}
            deleteItem={() => {
              deleteItem();
            }}
            selectedOK={() => {
              props.onClose();
            }}
          />
        )}
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    bottom: 0,
    position: "absolute",
  },
  viewLine: {
    height: 5,
    backgroundColor: colors.veryLightGrey1,
    borderRadius: 100,
    marginHorizontal: 154,
    marginTop: 8,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 18,
  },
  textFunds: {
    color: colors.nero,
    fontSize: 14,
    fontWeight: "700",
  },
  textCancel: {
    color: "#FF4956",
    fontSize: 14,
    fontWeight: "700",
  },
  viewTittleFormField: {
    marginHorizontal: 16,
    backgroundColor: colors.solitude2,
    borderWidth: 0.19,
  },
  styleTextField: {
    marginVertical: 20,
    marginHorizontal: scaleWidth(14),
    // borderWidth: 1.5,
    borderColor: colors.palette.navyBlue,
  },
  viewBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 15,
  },
  viewBack: {
    flexDirection: "row",
    paddingHorizontal: 48,
    paddingVertical: 12,
    alignContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.dolphin,
  },
  textBack: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.dolphin,
    marginLeft: 5,
  },
  viewConfirm: {
    backgroundColor: colors.navyBlue,
    flexDirection: "row",
    paddingHorizontal: 48,
    paddingVertical: 12,
    alignContent: "center",
    borderRadius: 8,
  },
  textConfirm: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginLeft: 5,
  },
  viewList: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
});
