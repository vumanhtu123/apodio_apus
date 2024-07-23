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
  const heightUom = useRef({ value: 0, text: "" });
  const lengthUom = useRef({ value: 0, text: "" });
  const widthUom = useRef({ value: 0, text: "" });
  const weightCapacityUom = useRef({ value: 0, text: "" });
  const [focusedField, setFocusedField] = useState("");

  const toggleModal = (name?: any) => {
    setFocusedField(name);
    setModalVisible(!modalVisible);
  };

  const checkTicker = () => {
    switch (focusedField) {
      case "longs":
        return lengthUom.current.value;
      case "width":
        return widthUom.current.value;
      case "height":
        return heightUom.current.value;
      case "weight":
        return weightCapacityUom.current.value;
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
          onPress={() => setSelectedItems(item)}>
          <Text style={[stylesWareHouse.itemText]}>{item.text}</Text>
          {checkTicker() == item.value ? (
            <Images.icon_check />
          ) : selectedItems?.value == item.value ? (
            <Images.icon_check />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const handleItemSelect = (item: any) => {
    switch (focusedField) {
      case "longs":
        lengthUom.current.value = item.value;
        lengthUom.current.text = item.text;
        break;
      case "width":
        widthUom.current.value = item.value;
        widthUom.current.text = item.text;
        break;
      case "height":
        heightUom.current.value = item.value;
        heightUom.current.text = item.text;
        break;
      case "weight":
        weightCapacityUom.current.value = item.value;
        weightCapacityUom.current.text = item.text;
        break;
      default:
        break;
    }
  };

  const onConfirm = () => {
    handleItemSelect(selectedItems);
    toggleModal();
    props.heightUom(heightUom.current);
    props.lengthUom(lengthUom.current);
    props.widthUom(widthUom.current);
    props.weightCapacityUom(weightCapacityUom.current);
  };

  useEffect(() => {
    heightUom.current = props.heightUomData;
    widthUom.current = props.widthUomData;
    lengthUom.current = props.lengthUomData;
    weightCapacityUom.current = props.weightCapacityUomData;
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
  }, [props.config]);
  return props.config ? (
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
            valueTextRight={lengthUom.current.text ?? ""}
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
              valueTextRight={widthUom.current.text ?? ""}
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
              valueTextRight={heightUom.current.text ?? ""}
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
              valueTextRight={weightCapacityUom.current.text ?? ""}
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
          <View style={stylesWareHouse.viewModalButton}>
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
          </View>
        </View>
      </Modal>
    </View>
  ) : null;
};
