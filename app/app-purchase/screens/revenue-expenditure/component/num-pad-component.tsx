import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Images } from "../../../../../assets";
import { scaleHeight, scaleWidth } from "../../../theme";
import { Text } from "../../../../components";

interface InputNumpad {
  addItem: (value: string) => void;
  deleteItem: () => void;
  selectedOK: () => void;
}
export const Numpad = (props: InputNumpad) => {
  const line1 = [
    "C",
    <Images.ic_divide width={scaleWidth(20)} height={scaleHeight(20)} />,
    "X",
    <Images.ic_delete_calculator />,
  ];
  const line2 = ["1", "2", "3", "+"];
  const line3 = ["4", "5", "6", "-"];
  const line4 = ["7", "8", "9", "="];
  const line5 = ["0", "00", "000", "OK"];
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.viewLine1}>
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
              <View style={styles.viewTextItem}>
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
      <View style={styles.viewLine2}>
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
                style={[
                  styles.viewTextItem2,
                  {
                    backgroundColor: item == "+" ? "#E7EAED" : "#FFFFFF",
                    borderWidth: item == "+" ? 0 : 0.2,
                  },
                ]}>
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
      <View style={styles.viewLine3}>
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
                style={[
                  styles.viewTextItem3,
                  {
                    backgroundColor: item == "-" ? "#E7EAED" : "#FFFFFF",
                    borderWidth: item == "-" ? 0 : 0.2,
                  },
                ]}>
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
      <View style={styles.viewLine4}>
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
                style={[
                  styles.viewTextItem4,
                  {
                    backgroundColor: item == "=" ? "#E7EAED" : "#FFFFFF",
                    borderWidth: item == "=" ? 0 : 0.2,
                  },
                ]}>
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
      <View style={styles.viewLine5}>
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
                style={[
                  styles.viewTextItem5,
                  {
                    backgroundColor: item == "OK" ? "#0078D4" : "#FFFFFF",
                    borderWidth: item == "+" ? 0 : 0.2,
                  },
                ]}>
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

export const styles = StyleSheet.create({
  viewLine1: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
    marginVertical: 7,
  },
  viewTextItem: {
    borderRadius: scaleWidth(8),
    backgroundColor: "#E7EAED",
    width: scaleWidth(80),
    // height: scaleHeight(42),
    paddingVertical: 12,
    alignItems: "center",
  },
  viewLine2: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
  viewTextItem2: {
    borderRadius: 8,
    width: scaleWidth(80),
    // height: scaleHeight(42),
    paddingVertical: 12,
    alignItems: "center",
  },
  viewLine3: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  viewTextItem3: {
    borderRadius: 8,
    width: scaleWidth(80),
    // height: scaleHeight(42),
    paddingVertical: 12,
    alignItems: "center",
  },
  viewLine4: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
  viewTextItem4: {
    borderRadius: 8,
    width: scaleWidth(80),
    // height: scaleHeight(42),
    paddingVertical: 12,
    alignItems: "center",
  },
  viewLine5: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  viewTextItem5: {
    borderRadius: 8,
    width: scaleWidth(80),
    // height: scaleHeight(42),
    paddingVertical: 12,
    alignItems: "center",
  },
});
