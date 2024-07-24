import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Text, TextField } from "../../../components";
import { scaleHeight } from "../../../theme";
import { stylesWareHouse } from "../style";
import { translate } from "../../../i18n";
import { Images } from "../../../../assets";
import Modal from "react-native-modal";
import { Button } from "../../../components";

export const ConfigInfoMoreComponent = (props: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>();
  console.log("log uom", props.heightUomData);

  const [heightUom, setHeightUom] = useState({ value: 0, text: "" });
  const [lengthUom, setLengthUom] = useState({ value: 0, text: "" });
  const [widthUom, setWidthUom] = useState({ value: 0, text: "" });
  const [weightCapacityUom, setWeightCapacityUom] = useState({
    value: 0,
    text: "",
  });

  const [focusedField, setFocusedField] = useState("");

  const toggleModal = (name?: any) => {
    setFocusedField(name);
    setModalVisible(!modalVisible);
  };

  const checkTicker = () => {
    switch (focusedField) {
      case "longs":
        return lengthUom.value;
      case "width":
        return widthUom.value;
      case "height":
        return heightUom.value;
      case "weight":
        return weightCapacityUom.value;
      default:
        return selectedItems?.value;
    }
  };

  const renderItem = ({ item }: any) => {
    return (
      <View>
        <View style={{ height: scaleHeight(1), backgroundColor: "#E7EFFF" }} />
        <TouchableOpacity
          style={stylesWareHouse.item}
          onPress={() => handleItemSelect(item)}>
          <Text style={[stylesWareHouse.itemText]}>{item.text}</Text>
          {checkTicker() == item.value ? <Images.icon_check /> : null}
        </TouchableOpacity>
      </View>
    );
  };

  const handleItemSelect = (item: any) => {
    switch (focusedField) {
      case "longs":
        lengthUom.value = item.value;
        lengthUom.text = item.text;
        props.lengthUom(lengthUom);
        console.log("selected length");
        toggleModal();
        break;
      case "width":
        widthUom.value = item.value;
        widthUom.text = item.text;
        props.widthUom(widthUom);
        toggleModal();
        break;
      case "height":
        heightUom.value = item.value;
        heightUom.text = item.text;
        props.heightUom(heightUom);
        toggleModal();
        break;
      case "weight":
        weightCapacityUom.value = item.value;
        weightCapacityUom.text = item.text;
        props.weightCapacityUom(weightCapacityUom);
        toggleModal();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setHeightUom({
      value: props?.heightUomData?.id,
      text: props?.heightUomData?.name,
    });
    setWidthUom({
      value: props?.widthUomData?.id,
      text: props?.widthUomData?.name,
    });
    setWeightCapacityUom({
      value: props?.weightCapacityUomData?.id,
      text: props?.weightCapacityUomData?.name,
    });
    setLengthUom({
      value: props?.lengthUomData?.id,
      text: props?.lengthUomData?.name,
    });
    // lengthUom.text = props.lengthUomData.name;
    // weightCapacityUom.text = props.weightCapacityUomData.name;
    // widthUom.value = props.widthUomData.id;
    // lengthUom.value = props.lengthUomData.id;
    // weightCapacityUom.value = props.weightCapacityUomData.id;
  }, []);

  const clearData = () => {
    props.setValue("longitude", "");
    props.setValue("latitude", "");
    props.setValue("longs", "");
    props.setValue("width", "");
    props.setValue("height", "");
    props.setValue("weight", "");
    props.clearError("longitude");
    props.clearError("latitude");
    props.clearError("longs");
    props.clearError("width");
    props.clearError("height");
    props.clearError("weight");
  };

  useEffect(() => {
    clearData();
  }, [props.config]);

  return (
    <View>
      <Controller
        control={props.control}
        // Account test setup new pin
        // defaultValue={"system_admin"}
        // Account test
        rules={{
          required: "Vui lòng nhập thông tin",
          maxLength: 50,
        }}
        defaultValue={""}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            labelTx={"wareHouse.Longitude"}
            placeholder={translate("wareHouse.enterLongitude")}
            style={{ marginTop: scaleHeight(0) }}
            inputStyle={stylesWareHouse.inputPass}
            isImportant
            value={value}
            onBlur={onBlur}
            isShowPassword
            maxLength={20}
            keyboardType={"numeric"}
            RightIconClear={null}
            RightIconShow={() => {}}
            onClearText={() => {
              onChange("");
            }}
            error={props.errors.longitude?.message ?? ""}
            onChangeText={(value) => {
              onChange(value);
            }}
          />
        )}
        name="longitude"
      />
      <Controller
        control={props.control}
        // Account test setup new pin
        // defaultValue={"system_admin"}
        // Account test
        defaultValue={""}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            maxLength={20}
            keyboardType={"numeric"}
            labelTx={"wareHouse.Latitude"}
            placeholder={translate("wareHouse.enterLatitude")}
            style={{ marginTop: scaleHeight(15) }}
            inputStyle={stylesWareHouse.inputPass}
            isImportant
            value={value}
            onBlur={onBlur}
            isShowPassword
            RightIconClear={null}
            RightIconShow={() => {}}
            onClearText={() => {
              onChange("");
            }}
            error={props.errors.latitude?.message ?? ""}
            onChangeText={(value) => {
              onChange(value);
            }}
          />
        )}
        name="latitude"
        rules={{
          required: "Vui lòng nhập thông tin",
          maxLength: 50,
        }}
      />
      <Controller
        control={props.control}
        // Account test setup new pin
        // defaultValue={"system_admin"}
        // Account test
        defaultValue={""}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextField
            maxLength={20}
            keyboardType={"numeric"}
            labelTx={"wareHouse.length"}
            placeholder={translate("wareHouse.enterLength")}
            style={{ marginTop: scaleHeight(15) }}
            inputStyle={stylesWareHouse.inputPass}
            isImportant
            value={value}
            onBlur={onBlur}
            isShowPassword
            RightIcon={Images.dropDown}
            styleTextRight={stylesWareHouse.textConfig}
            valueTextRight={lengthUom?.text ?? ""}
            RightIconClear={null}
            RightIconShow={() => {}}
            onClearText={() => {
              onChange("");
            }}
            pressRightIcon={() => {
              setSelectedItems(null);
              toggleModal("longs");
            }}
            error={props.errors.longs?.message ?? ""}
            onChangeText={(value) => {
              onChange(value);
            }}
          />
        )}
        name="longs"
        rules={{
          required: "Vui lòng nhập thông tin",
          maxLength: 50,
        }}
      />
      <View
        style={{
          marginVertical: scaleHeight(15),
        }}>
        <Controller
          control={props.control}
          // Account test setup new pin
          // defaultValue={"system_admin"}
          // Account test
          defaultValue={""}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              isImportant
              maxLength={20}
              keyboardType={"numeric"}
              labelTx={"wareHouse.width"}
              placeholder={translate("wareHouse.enterWidth")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              // secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              valueTextRight={widthUom?.text ?? ""}
              styleTextRight={stylesWareHouse.textConfig}
              RightIcon={Images.dropDown}
              pressRightIcon={() => {
                setSelectedItems(null);
                toggleModal("width");
              }}
              RightIconClear={null}
              RightIconShow={() => {}}
              onClearText={() => {
                onChange("");
              }}
              error={props.errors.width?.message ?? ""}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="width"
          rules={{
            required: "Vui lòng nhập thông tin",
            maxLength: 50,
          }}
        />
      </View>
      <View style={{ marginBottom: scaleHeight(15) }}>
        <Controller
          control={props.control}
          // Account test setup new pin
          // defaultValue={"system_admin"}
          // Account test
          defaultValue={""}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              isImportant
              maxLength={20}
              keyboardType={"numeric"}
              labelTx={"wareHouse.height"}
              placeholder={translate("wareHouse.enterHeight")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              // secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              valueTextRight={heightUom?.text ?? ""}
              RightIconClear={null}
              styleTextRight={stylesWareHouse.textConfig}
              RightIconShow={() => {}}
              pressRightIcon={() => {
                setSelectedItems(null);
                toggleModal("height");
              }}
              RightIcon={Images.dropDown}
              onClearText={() => {
                onChange("");
              }}
              error={props.errors.height?.message ?? ""}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="height"
          rules={{
            required: "Vui lòng nhập thông tin",
            maxLength: 50,
          }}
        />
      </View>
      <View style={{ marginBottom: scaleHeight(0) }}>
        <Controller
          control={props.control}
          // Account test setup new pin
          // defaultValue={"system_admin"}
          // Account test
          defaultValue={""}
          render={({ field: { onChange, value, onBlur } }) => (
            <TextField
              isImportant
              maxLength={20}
              keyboardType={"numeric"}
              labelTx={"wareHouse.foundationLoad"}
              placeholder={translate("wareHouse.enterFoundationLoad")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              // secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              valueTextRight={weightCapacityUom?.text ?? ""}
              RightIconClear={null}
              RightIconShow={() => {}}
              pressRightIcon={() => {
                setSelectedItems(null);
                toggleModal("weight");
              }}
              styleTextRight={stylesWareHouse.textConfig}
              RightIcon={Images.dropDown}
              onClearText={() => {
                onChange("");
              }}
              error={props.errors.weight?.message ?? ""}
              onChangeText={(value) => {
                onChange(value);
              }}
            />
          )}
          name="weight"
          rules={{
            required: "Vui lòng nhập thông tin",
            maxLength: 50,
          }}
        />
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        style={{ margin: 0 }}>
        <View style={stylesWareHouse.modalContainer}>
          {/* <Text text={"List"} style={stylesWareHouse.textTitleModal} /> */}
          <FlatList
            data={props.list}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.value}
            onEndReached={props.loadMore}
            keyExtractor={(item: any, index: any) => index.toString()}
          />
          {/* <View style={stylesWareHouse.viewModalButton}>
            <Button
              onPress={() => {
                toggleModal();
              }}
              tx={"productScreen.cancel"}
              style={stylesWareHouse.buttonCancel}
              textStyle={stylesWareHouse.textCancel}
            />
            <Button
              tx={"productScreen.BtnNotificationAccept"}
              style={stylesWareHouse.buttonAccept}
              textStyle={stylesWareHouse.textAccept}
              onPress={(item) => onConfirm()}
            />
          </View> */}
        </View>
      </Modal>
    </View>
  );
};
