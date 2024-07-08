import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Text, TextField } from "../../../components";
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import { Images } from "../../../../assets";
import { fontSize, margin, scaleHeight, scaleWidth } from "../../../theme";
import { InputSelect } from "../../../components/input-select/inputSelect";
import { ALERT_TYPE, Toast } from "../../../components/dialog-notification";
import { translate } from "../../../i18n";

interface InputSelectProps {
  control: any;
  index: any;
  data: any;
  remove: any;
  fields: any;
  originUit: any;
  onRemove: any;
  onRestore: any;
}

interface ItemWeight {
  checkList: boolean;
  data: {};
  dataUnitGroup: [];
  setAdd: any
  dataDefault?: any
}

interface ItemOriginal {
  data: any;
  control: any;
  checkList: any
}

export default function ItemWeight(props: ItemWeight) {
  const { control, setValue, setError } = useFormContext()
  const {
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      weight: [{ weight1: "", volume: "", unit: { id: '', label: 'qwe' } }],
    },
  });
  const dataUomGroup = props.dataUnitGroup?.map((item: any) => {
    return { ...item, label: item.unitName }
  })
  const [data, setData] = useState(props.dataUnitGroup?.map((item: any) => {
    return { ...item, label: item.unitName }
  }))
  useEffect(() => {
    setData(props.dataUnitGroup?.map((item: any) => {
      return { ...item, label: item.unitName }
    }))
  }, [props.dataUnitGroup])

  const handleRemove = (item: any) => {
    setData(data.filter((i) => i !== item));
  };

  const handleRestore = (item: any) => {
    console.log([...data, item], 'data')
    setData([...data, item]);
  };
  const deepEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };

  const resetData1 = (data1: any, index: any) => {
    const newArr3 = data.concat(data1[index].unit)
    setData(newArr3)
  }
  const resetData = (data: any, itemValue: any) => {
    const newArr = data.map((item: any) => {
      return item.unit
    })
    const filteredData = newArr.filter((obj: any) => Object.keys(obj).length > 0);
    const newArr2 = filteredData.concat(itemValue)
    const unitGroupData = props.dataUnitGroup?.map((item: any) => {
      return { ...item, label: item.unitName }
    })
    const newArr3 = unitGroupData.filter(
      (itemA) => !newArr2.some((itemB: any) => deepEqual(itemA, itemB))
    );
    setData(newArr3)
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: "weight",
  });

  // console.log("data -0-", fields);

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
          control={control}
          data={props.data}
          checkList={props.checkList}
        />
        {props.checkList ? <View
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
          {data ? (data.length !== 0 ? <TouchableOpacity
            onPress={() => {
              if (props.setAdd.length === 0) {
                append({ weight1: "", volume: "", unit: {} });
              } else {
                if (props.setAdd[fields.length - 1]?.weight1 === '' || props.setAdd[fields.length - 1]?.volume === '' || Object.keys(props.setAdd[fields.length - 1]?.unit).length === 0) {
                  Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "",
                    textBody: translate("txtToats.change_weight"),
                  })
                } else {
                  append({ weight1: "", volume: "", unit: {} });
                }
              }     
            }}>
            <Text
              style={{
                color: "#0078D4",
                fontSize: 12,
                fontWeight: "400",
              }}
              tx="productScreen.addLine"></Text>
          </TouchableOpacity> : null) : null}
        </View> : null}
      </View>
      {props.checkList ? <FlatList
        data={fields}
        scrollEnabled={false}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => {
          return (
            <ItemConversion
              onRemove={resetData}
              onRestore={resetData1}
              control={control}
              index={index}
              data={data}
              remove={() => {
                remove(index)
              }}
              fields={fields}
              originUit={props.data}

            />
          );
        }}
      /> : null}
    </View>
  );
}

const ItemOriginal = (item: ItemOriginal) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 6,
      }}>
      <Text style={{ color: "#000000", fontSize: 12, fontWeight: "400", width: scaleWidth(80) }}>
        {item.data?.id !== 0 ? (item.checkList === false ? item.data?.label : item.data?.name) : 'Đơn vị gốc'}
      </Text>
      <View style={{ marginLeft: scaleWidth(10) }}>
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
        control={item.control}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            styleTextLabel={true}
            keyboardType={'numeric'}
            labelTx={"createProductScreen.volume"}
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
  const [name, valueName] = useState({});

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
            width: '25%',
            marginRight: scaleWidth(2)
          }}>
          <TouchableOpacity
            style={{ marginBottom: scaleHeight(20) }}
            onPress={() => {
              item.onRestore(item.fields, item.index);
              item.remove(item.index);
            }}>
            <Images.minus_ic
              style={{
                marginRight: 4,
              }}
            />
          </TouchableOpacity>
          <Controller
            name={`weight.${item.index}.unit`}
            control={item.control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TouchableOpacity onPress={() => { }}>
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
                    dataDefault={value?.label}
                    onPressChoice={(items: any) => {
                      // valueName(items);
                      onChange(items)
                      item.onRemove(item.fields, items)
                    }}></InputSelect>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#DFE0EB",
                      marginBottom: 3,
                    }}></View>
                  <Text
                    style={{ color: "#747475A6", fontSize: 10, fontWeight: "500", width: '90%' }} numberOfLines={1}>
                    {item.originUit?.name == undefined || value?.conversionRate == undefined ? '' : value?.conversionRate + " " + item.originUit?.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
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
              labelTx={"createProductScreen.volume"}
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
