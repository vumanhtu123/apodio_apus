import React, { useState } from "react";
import {
  FlatList,
  Platform,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Text, TextField } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../theme";
import { Images } from "../../../assets";
import Modal from "react-native-modal";

interface Input {
  onVisible?: any;
  onClose?: any;
}

export const ClassifyModal = (props: Input) => {
  const list = ["100.000", "200.000", "300.000"];
  const line1 = [
    "C",
    <Images.ic_divide />,
    "X",
    <Images.ic_delete_calculator />,
  ];
  const line2 = ["1", "2", "3", "+"];
  const line3 = ["4", "5", "6", "-"];
  const line4 = ["7", "8", "9", "="];
  const line5 = ["0", "00", "000", "OK"];
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

  console.log("tuvm acb", selectedValue);

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
            backgroundColor: "#C7C7C7",
            borderRadius: 100,
            marginHorizontal: 154,
            marginTop: 8,
          }}></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 18,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Images.ic_pen />
            <Text
              tx="analysis.refactorMoney"
              style={{
                color: "#0078D4",
                fontSize: 12,
                fontWeight: "400",
              }}></Text>
          </View>
          <Text
            tx={"analysis.classify"}
            style={{
              color: "#242424",
              fontSize: 14,
              fontWeight: "700",
              marginHorizontal: scaleWidth(120),
              marginLeft: scaleWidth(85),
            }}></Text>
          <TouchableOpacity
            onPress={() => {
              props.onClose();
            }}>
            <Text
              tx={"analysis.cancel"}
              style={{
                color: "#FF4956",
                fontSize: 14,
                fontWeight: "700",
              }}></Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 16,
            backgroundColor: "#E7EFFF",
            borderWidth: 0.19,
          }}></View>
        <View style={{ flexDirection: "row", marginHorizontal: 16 }}>
          <Controller
            control={control}
            defaultValue={""}
            name="nameMoney"
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                // isImportant
                // autoFocus
                iconRight={
                  <View
                    style={{
                      left: scaleWidth(Platform.OS === "android" ? 10 : 15),
                      top: scaleHeight(19),
                    }}>
                    <Images.ic_search />
                  </View>
                }
                keyboardType={null}
                labelTx={"analysis.nameMoney"}
                txColor="#747475"
                style={{
                  width: "90%",
                  marginVertical: 20,
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
          <View
            style={{
              backgroundColor: "#0078D4",
              borderRadius: 8,
              padding: 10,
              alignSelf: "center",
            }}>
            <Images.icon_plus />
          </View>
        </View>
        <Text
          tx="analysis.listClassify"
          style={{
            fontWeight: "400",
            fontSize: 14,
            color: "#747475",
            marginHorizontal: 16,
          }}></Text>
        <FlatList
          numColumns={3}
          data={[
            { id: 0, value: "Đơn hàng" },
            { id: 1, value: "Đơn hàng 1" },
            { id: 2, value: "Đơn hàng 2" },
            { id: 3, value: "Đơn hàng 3" },
            { id: 4, value: "Đơn hàng 4" },
            { id: 5, value: "Đơn hàng 5" },
            { id: 6, value: "Đơn hàng 6" },
          ]}
          style={{
            // flex: 1,
            marginTop: scaleHeight(margin.margin_10),
            marginBottom: scaleHeight(margin.margin_15),
          }}
          onEndReached={null}
          keyExtractor={(item) => item.id.toString()}
          onEndReachedThreshold={0.5}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "space-around",
            marginHorizontal: 16,
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => {}}>
                <View
                  style={{
                    width: 115,
                    borderRadius: 8,
                    borderColor: "#C8C8C8",
                    backgroundColor: "#F6F7F9",
                    borderWidth: 0.5,
                    alignItems: "center",
                    margin: 5,
                    marginHorizontal: 16,
                  }}>
                  <Text
                    text={item.value}
                    style={{
                      fontSize: 10,
                      fontWeight: "400",
                      color: "#747475",
                      marginVertical: 13,
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </Modal>
  );
};
