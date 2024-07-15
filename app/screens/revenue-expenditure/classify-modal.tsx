import React, { useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Text, TextField } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../theme";
import { Images } from "../../../assets";
import { CustomModal } from "../../components/custom-modal";

interface Input {
  onVisible?: any;
  onClose?: any;
}

export const ClassifyModal = (props: Input) => {
  const [selectedValue, setSelectedValue] = useState<any>([]);
  const [closeValue, setCloseValue] = useState<any>(props.onVisible);
  const [selectedItem, setSelectedItem] = useState<any>();

  const list = [
    { id: 0, value: "Đơn hàng" },
    { id: 1, value: "Đơn hàng 1" },
    { id: 2, value: "Đơn hàng 2" },
    { id: 3, value: "Đơn hàng 3" },
    { id: 4, value: "Đơn hàng 4" },
    { id: 5, value: "Đơn hàng 5" },
    { id: 6, value: "Đơn hàng 6" },
  ];
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

  const selectItem = (id: any) => {
    setSelectedItem(id);
  };

  return (
    <CustomModal isVisible={props.onVisible} setIsVisible={props.onClose}>
      <View>
        <View style={styles.viewContainer}></View>
        <View style={styles.viewHeader}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Images.ic_pen />
            <Text tx="analysis.refactorMoney" style={styles.textUpdate}></Text>
          </View>
          <Text tx={"analysis.classify"} style={styles.textClassify}></Text>
          <TouchableOpacity
            onPress={() => {
              props.onClose();
            }}>
            <Text tx={"analysis.cancel"} style={styles.textCancel}></Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#E7EFFF",
            borderWidth: 0.19,
          }}></View>
        <View style={{ flexDirection: "row" }}>
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
                style={styles.textFieldStyle}
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
          <View style={styles.viewIconPlus}>
            <Images.icon_plus />
          </View>
        </View>
        <Text tx="analysis.listClassify" style={styles.textTittleList}></Text>
        <FlatList
          numColumns={3}
          data={list}
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
          }}
          renderItem={({ item, index }) => {
            const backgroundColor =
              item.id === selectedItem ? "#EFF8FF" : "#F6F7F9";
            const borderColor =
              item.id === selectedItem ? "#0078D4" : "#C8C8C8";
            const textColor = item.id === selectedItem ? "#0078D4" : "#747475";
            const textWeight = item.id === selectedItem ? "600" : "400";
            return (
              <TouchableOpacity
                onPress={() => {
                  selectItem(item.id);
                }}>
                <View
                  style={[
                    styles.viewTextList,
                    {
                      borderColor: borderColor,
                      backgroundColor: backgroundColor,
                    },
                  ]}>
                  <Text
                    text={item.value}
                    style={[
                      styles.textList,
                      {
                        fontWeight: textWeight,
                        color: textColor,
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </CustomModal>
  );
};

export const styles = StyleSheet.create({
  viewContainer: {
    height: 5,
    backgroundColor: "#C7C7C7",
    borderRadius: 100,
    marginHorizontal: 142,
    marginTop: 8,
  },
  viewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 18,
  },
  textUpdate: {
    color: "#0078D4",
    fontSize: 12,
    fontWeight: "400",
  },
  textClassify: {
    color: "#242424",
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: scaleWidth(120),
    marginLeft: scaleWidth(85),
  },
  textCancel: {
    color: "#FF4956",
    fontSize: 14,
    fontWeight: "700",
  },
  textFieldStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    width: "90%",
    marginVertical: 20,
    // borderWidth: 1.5,
    borderColor: colors.palette.accent100,
  },
  viewIconPlus: {
    backgroundColor: "#0078D4",
    borderRadius: 8,
    padding: 10,
    alignSelf: "center",
  },
  textTittleList: {
    fontWeight: "400",
    fontSize: 14,
    color: "#747475",
  },
  viewTextList: {
    width: 115,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    margin: 5,
  },
  textList: {
    fontSize: 10,
    marginVertical: 13,
  },
});
