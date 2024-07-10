import { TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Images } from "../../../../assets";
import { scaleWidth } from "../../../theme";
import { Text } from "../../../components";

interface InputNumpad {
  addItem: (value: string) => void;
  deleteItem: () => void;
  selectedOK: () => void;
}
export const Numpad = (props: InputNumpad) => {
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
  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 16,
          justifyContent: "space-between",
          marginVertical: 7,
        }}>
        {line1.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (index == 3) {
                  props.deleteItem();
                } else {
                  props.addItem(
                    item !== item.toString() ? "÷" : item.toString()
                  );
                }
                console.log("tuvm", item.toString());
              }}>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: "#E7EAED",
                  width: scaleWidth(80),
                  // height: scaleHeight(42),
                  paddingVertical: 12,
                  alignItems: "center",
                }}>
                {item.toString() ? (
                  <Text
                    style={{
                      // paddingHorizontal: scaleWidth(34),
                      // paddingVertical: scaleHeight(12),
                      color: "#242424",
                      textAlign: "center",
                    }}>
                    {item}
                  </Text>
                ) : (
                  item
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 16,
          justifyContent: "space-between",
        }}>
        {line2.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (index == 3) {
                  props.deleteItem();
                } else {
                  props.addItem(
                    item !== item.toString() ? "÷" : item.toString()
                  );
                }
                console.log("tuvm", item.toString());
              }}>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: item == "+" ? "#E7EAED" : "#FFFFFF",
                  width: scaleWidth(80),
                  // height: scaleHeight(42),
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: item == "+" ? 0 : 0.2,
                }}>
                {item.toString() ? (
                  <Text
                    style={{
                      color: "#242424",
                    }}>
                    {item}
                  </Text>
                ) : (
                  item
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 16,
          justifyContent: "space-between",
          marginVertical: 10,
        }}>
        {line3.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (index == 3) {
                  props.deleteItem();
                } else {
                  props.addItem(
                    item !== item.toString() ? "÷" : item.toString()
                  );
                }
                console.log("tuvm", item.toString());
              }}>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: item == "-" ? "#E7EAED" : "#FFFFFF",
                  width: scaleWidth(80),
                  // height: scaleHeight(42),
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: item == "-" ? 0 : 0.2,
                }}>
                {item.toString() ? (
                  <Text
                    style={{
                      color: "#242424",
                    }}>
                    {item}
                  </Text>
                ) : (
                  item
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 16,
          justifyContent: "space-between",
        }}>
        {line4.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (index == 3) {
                  props.deleteItem();
                } else {
                  props.addItem(
                    item !== item.toString() ? "÷" : item.toString()
                  );
                }
                console.log("tuvm", item.toString());
              }}>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: item == "=" ? "#E7EAED" : "#FFFFFF",
                  width: scaleWidth(80),
                  // height: scaleHeight(42),
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: item == "=" ? 0 : 0.2,
                }}>
                {item.toString() ? (
                  <Text
                    style={{
                      color: "#242424",
                    }}>
                    {item}
                  </Text>
                ) : (
                  item
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 16,
          justifyContent: "space-between",
          marginVertical: 10,
        }}>
        {line5.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.toString() == "OK") {
                  console.log("ok");
                  props.selectedOK();
                } else {
                  props.addItem(
                    item !== item.toString() ? "÷" : item.toString()
                  );
                }
                console.log("tuvm", item.toString());
              }}>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: item == "OK" ? "#0078D4" : "#FFFFFF",
                  width: scaleWidth(80),
                  // height: scaleHeight(42),
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: item == "+" ? 0 : 0.2,
                }}>
                {item.toString() ? (
                  <Text
                    style={{
                      color: item == "OK" ? "white" : "#242424",
                    }}>
                    {item}
                  </Text>
                ) : (
                  item
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
