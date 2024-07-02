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
export default function ItemWeight(props: any) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      users: [{ firstName: "", lastName: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "users",
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
            paddingHorizontal: 20,
          }}></Text>
        <Text
          tx="productScreen.weightOriginal"
          style={{
            fontSize: 14,
            fontWeight: "400",
            color: "#242424",
            marginVertical: 15,
            paddingHorizontal: 20,
          }}></Text>
        <ItemOriginal />
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginVertical: 10,
            marginHorizontal: 20,
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
              append({ firstName: "", lastName: "" });
            }}>
            <Text
              style={{
                color: "#0078D4",
                fontSize: 12,
                fontWeight: "400",
              }}
              tx="productScreen.addLine"></Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={fields}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <ItemConversion
              control={control}
              index={null}
              data={null}
              description={"(3 thùng)"}
              remove={() => {
                remove(index);
              }}
              fields={fields}
            />
          );
        }}
      />
    </View>
  );
}

const ItemOriginal = (item: any) => {
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
        marginLeft: 25,
        marginRight: 6,
      }}>
      <Text style={{ color: "#000000", fontSize: 12, fontWeight: "400" }}>
        {item.name ?? "Hộp"}
      </Text>
      <View style={{ marginLeft: 50 }}>
        <Controller
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              styleTextLabel={true}
              keyboardType={null}
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
                marginTop: 20,
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
          name="valueEmailPhone"
          rules={{ required: "Username is required" }}
        />
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            styleTextLabel={true}
            keyboardType={null}
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
              marginTop: 20,
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
        name="valueEmailPhone"
        rules={{ required: "Username is required" }}
      />
    </View>
  );
};

const ItemConversion = (item: InputSelectProps) => {
  const [name, valueName] = useState();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        marginHorizontal: 6,
      }}>
      {item.fields?.length >= 0 ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
          }}>
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={() => {
              item.remove();
            }}>
            <Images.minus_ic
              style={{
                marginRight: 4,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={{ flexDirection: "column", marginBottom: 10 }}>
              <InputSelect
                textStyle={{ fontSize: 12, marginTop: 10 }}
                styleView={{
                  backgroundColor: "transparent",
                  width: 80,
                  paddingHorizontal: 4,
                  paddingVertical: 2,
                }}
                arrData={item.data ?? [{ label: "name", id: 1 }]}
                dataDefault={"name"}
                onPressChoice={() => {}}></InputSelect>
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
      <Controller
        control={item.control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            styleTextLabel={true}
            keyboardType={null}
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
              marginTop: 20,
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
        name={`users.${item.index}.firstName`}
        rules={{ required: "Username is required" }}
      />
      <Controller
        control={item.control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            styleTextLabel={true}
            keyboardType={null}
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
              marginTop: 20,
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
        name={`users.${item.index}.lastName`}
        rules={{ required: "Username is required" }}
      />
    </View>
  );
};
