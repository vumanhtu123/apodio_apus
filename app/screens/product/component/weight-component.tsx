import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Text, TextField } from "../../../components";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Images } from "../../../../assets";
import { fontSize, margin, scaleHeight, scaleWidth } from "../../../theme";
import { InputSelect } from "../../../components/input-select/inputSelect";

interface InputSelectProps {
  control: any;
  index: any;
  data: any;
  description: any;
  remove: any;
  fields: any;
}

interface ItemWeight {
checkList: boolean;
data: {};
}

interface ItemOriginal {
  data: any;
}

export default function ItemWeight(props: ItemWeight) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      weight: [{ weight1: "", volume: "" }],
    },
  });

  const data = [
    { label: "name", id: 1 },
    { label: "name2", id: 2 },
    { label: "name3", id: 3 },
  ];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "weight",
  });

  console.log("data -0-", fields);

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
        }}>
        <Text
          tx="productScreen.weight"
          style={{
            color: "#242424",
            fontWeight: "700",
            fontSize: 14,
          }}></Text>
        <Text
          tx="productScreen.weightOriginal"
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: "#242424",
            marginVertical: 15,
          }}></Text>
        <ItemOriginal 
        data={props.data}
        />
        {props.checkList ?<View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 10,
          }}>
          <Text
            style={{
              color: "#242424",
              fontSize: 12,
              fontWeight: "400",
            }}
            tx="productScreen.weightConversion"></Text>
          <TouchableOpacity
            onPress={() => {
              append({ weight1: "", volume: "" });
            }}>
            <Text
              style={{
                color: "#0078D4",
                fontSize: 12,
                fontWeight: "400",
              }}
              tx="productScreen.addLine"></Text>
          </TouchableOpacity>
        </View>: null}
      </View>
      {props.checkList ? <FlatList
        data={fields}
        scrollEnabled={false}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => {
          return (
            <ItemConversion
              control={control}
              index={index}
              data={data}
              description={"(3 thùng)"}
              remove={() => {
                console.log("index", index);
                remove(index);
              }}
              fields={fields}
            />
          );
        }}
      /> : null}
    </View>
  );
}

const ItemOriginal = (item: ItemOriginal) => {
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 6,
      }}>
      <Text style={{ color: "#000000", fontSize: 12, fontWeight: "400", width: scaleWidth(80) }}>
        {item.data.label}
      </Text>
      <View style={{ marginLeft: scaleWidth(10) }}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              styleTextLabel={true}
              keyboardType={'numeric'}
              labelTx={"productScreen.weightSpecified"}
              style={{
                marginBottom: scaleHeight(10),
                // marginTop: scaleHeight(20),
                width: scaleWidth(122),
              }}
              value={value}
              onBlur={onBlur}
              // RightIconClear={Images.icon_delete2}
              RightIconClear={null}
              RightIconShow={null}
              valueTextRight="Kg"
              styleTextRight={{
                color: "#747475",
                fontSize: 12,
                fontWeight: "500",
                marginTop: scaleHeight(20),
              }}
              error={""}
              onClearText={() => {
                onChange("");
              }}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          // Account test setup new pin
          defaultValue={""}
          // Account test
          // defaultValue={"67076743544"}
          name="weightOriginal"
          // rules={{ required: "Username is required" }}
        />
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            styleTextLabel={true}
            keyboardType={'numeric'}
            labelTx={"productScreen.weightSpecified"}
            style={{
              marginBottom: scaleHeight(10),
              marginLeft: scaleWidth(10),
              // marginTop: scaleHeight(20),
              width: scaleWidth(122),
            }}
            value={value}
            onBlur={onBlur}
            // RightIconClear={Images.icon_delete2}
            RightIconClear={null}
            RightIconShow={null}
            valueTextRight="m3"
            styleTextRight={{
              color: "#747475",
              fontSize: 12,
              fontWeight: "500",
              marginTop: scaleHeight(20),
            }}
            error={""}
            onClearText={() => {
              onChange("");
            }}
            onChangeText={(value) => {
              onChange(value);
            }}
          />
        )}
        // Account test setup new pin
        defaultValue={""}
        // Account test
        // defaultValue={"67076743544"}
        name="volumeOriginal"
        // rules={{ required: "Username is required" }}
      />
    </View>
  );
};

const ItemConversion = (item: InputSelectProps) => {
  const [name, valueName] = useState({ label: "" });
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        // marginHorizontal: 6,
      }}>
      {item.fields?.length >= 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}>
          <TouchableOpacity
            style={{ marginBottom: scaleHeight(20) }}
            onPress={() => {
              item.remove(item.index);
            }}>
            <Images.minus_ic
              style={{
                marginRight: 4,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                flexDirection: "column",
                marginBottom: scaleHeight(10),
              }}>
              <InputSelect
                textStyle={{ fontSize: 12, marginTop: scaleHeight(10) }}
                styleView={{
                  backgroundColor: "transparent",
                  width: scaleHeight(60),
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                }}
                styleViewDropdown={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 25,
                }}
                arrData={item.data ?? []}
                dataDefault={name.label}
                onPressChoice={(item: any) => {
                  valueName(item);
                }}></InputSelect>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#DFE0EB",
                  marginBottom: 3,
                }}></View>
              <Text
                style={{ color: "#747475A6", fontSize: 10, fontWeight: "500" }}>
                {item.description ?? "(3 Hộp)"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
        <Controller
          control={item.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              styleTextLabel={true}
              keyboardType={'numeric'}
              labelTx={"productScreen.weightSpecified"}
              style={{
                marginBottom: scaleHeight(10),
                width: scaleWidth(122),
              }}
              value={value}
              onBlur={onBlur}
              RightIconClear={null}
              RightIconShow={null}
              valueTextRight="Kg"
              styleTextRight={{
                color: "#747475",
                fontSize: 12,
                fontWeight: "500",
                marginTop: scaleHeight(20),
              }}
              error={""}
              onClearText={() => {
                onChange("");
              }}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          // Account test setup new pin
          defaultValue={""}
          // Account test
          // defaultValue={"67076743544"}
          name={`weight.${item.index}.weight1`}
          // rules={{ required: "Username is required" }}
        />
        <View style={{ width: scaleWidth(15) }}></View>
        <Controller
          control={item.control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              styleTextLabel={true}
              keyboardType={'numeric'}
              labelTx={"productScreen.weightSpecified"}
              style={{
                marginBottom: scaleHeight(10),
                // marginTop: scaleHeight(20),
                width: scaleWidth(122),
              }}
              value={value}
              onBlur={onBlur}
              // RightIconClear={Images.icon_delete2}
              RightIconClear={null}
              RightIconShow={null}
              valueTextRight="m3"
              styleTextRight={{
                color: "#747475",
                fontSize: 12,
                fontWeight: "500",
                marginTop: scaleHeight(20),
              }}
              error={""}
              onClearText={() => {
                onChange("");
              }}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          // Account test setup new pin
          defaultValue={""}
          // Account test
          // defaultValue={"67076743544"}
          name={`weight.${item.index}.volume`}
          // rules={{ required: "Username is required" }}
        />
      </View>
    </View>
  );
};
