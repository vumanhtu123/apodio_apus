import React, { useState } from "react";
import {
  FlatList,
  Platform,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Text, TextField } from "../../../components";
import { Controller, useForm } from "react-hook-form";
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../theme";
import { Svgs } from "../../../../assets/svgs";
import { CustomModal } from "../../../components/custom-modal";

interface Input {
  onVisible?: any;
  onClose?: any;
  selected: (data: any) => void;
}

export const FundsModal = (props: Input) => {
  const [selectedValue, setSelectedValue] = useState<any>([]);
  const [closeValue, setCloseValue] = useState<any>(props.onVisible);
  const [selectedItem, setSelectedItem] = useState<any>();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const handleSubmitForm = (item: any) => {
    if (selectedValue) {
      props.onClose();
      props.selected(item);
    }
  };

  console.log("tuvm acb", selectedValue);

  const selectItem = (id: any) => {
    setSelectedItem(id);
  };

  return (
    <CustomModal isVisible={props.onVisible} setIsVisible={props.onClose}>
      <View
        style={
          {
            //   flex: 1,
            //   backgroundColor: "white",
            //   width: "100%",
            //   bottom: 0,
            //   position: "absolute",
          }
        }>
        <View
          style={{
            height: 5,
            backgroundColor: colors.veryLightGrey1,
            borderRadius: 100,
            marginHorizontal: 142,
          }}></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginVertical: 16,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Svgs.ic_pen />
            <Text
              tx="analysis.refactorMoney"
              style={{
                color: colors.navyBlue,
                fontSize: 12,
                fontWeight: "400",
              }}></Text>
          </View>
          <Text
            tx={"revenueAndExpenditure.funds"}
            style={{
              color: colors.nero,
              fontSize: 14,
              fontWeight: "700",
              marginHorizontal: scaleWidth(110),
              marginLeft: scaleWidth(75),
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
            backgroundColor: colors.solitude2,
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
                    <Svgs.ic_search />
                  </View>
                }
                keyboardType={null}
                labelTx={"analysis.nameMoney"}
                txColor={colors.dolphin}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  width: "90%",
                  marginVertical: 20,
                  // borderWidth: 1.5,
                  borderColor: colors.palette.accent100,
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
              backgroundColor: colors.navyBlue,
              borderRadius: 8,
              padding: 10,
              alignSelf: "center",
            }}>
            <Svgs.icon_plus />
          </View>
        </View>
        <Text
          tx="analysis.listClassify"
          style={{
            fontWeight: "400",
            fontSize: 14,
            color: colors.dolphin,
          }}></Text>
        <FlatList
          numColumns={3}
          data={[
            { id: 0, value: "Chưa phân loại" },
            { id: 1, value: "Tiền mặt" },
            { id: 2, value: "Ví điện tử" },
            { id: 3, value: "Ngân hàng" },
            { id: 4, value: "Ví cửa hàng" },
            { id: 4, value: "Ví cửa hàng" },
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
          }}
          renderItem={({ item, index }) => {
            const backgroundColor =
              item.id === selectedItem ? colors.aliceBlue2 : colors.aliceBlue;
            const borderColor =
              item.id === selectedItem ? colors.navyBlue : colors.veryLightGrey;
            const textColor =
              item.id === selectedItem ? colors.navyBlue : colors.dolphin;
            const textWeight = item.id === selectedItem ? "600" : "400";
            return (
              <TouchableOpacity
                onPress={() => {
                  selectItem(item.id);
                  handleSubmitForm(item);
                }}>
                <View
                  style={{
                    width: 115,
                    borderRadius: 8,
                    borderColor: borderColor,
                    backgroundColor: backgroundColor,
                    borderWidth: 1,
                    alignItems: "center",
                    margin: 5,
                  }}>
                  <Text
                    text={item.value}
                    style={{
                      fontSize: 10,
                      fontWeight: textWeight,
                      color: textColor,
                      marginVertical: 13,
                    }}
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
