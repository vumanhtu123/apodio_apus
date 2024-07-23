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
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const heightUom = useRef({ id: 0, name: "" });
  const lengthUom = useRef({ id: 0, name: "" });
  const widthUom = useRef({ id: 0, name: "" });
  const weightCapacityUom = useRef({ id: 0, name: "" });

  console.log("list unit", props.list);
  const toggleModal = () => {
    console.log("preChoice", selectedItems);
    setModalVisible(!modalVisible);
  };
  const renderItem = ({ item }: any) => {
    const isSelected = selectedItem.some(
      (selectedItem: { value: any }) => selectedItem.value === item.value
    );
    return (
      <View>
        <View style={{ height: scaleHeight(1), backgroundColor: "#E7EFFF" }} />
        <TouchableOpacity
          style={stylesWareHouse.item}
          onPress={() => handleItemSelect(item)}>
          <Text style={[stylesWareHouse.itemText]}>{item.text}</Text>
          {isSelected ? <Images.icon_check /> : null}
        </TouchableOpacity>
      </View>
    );
  };

  const handleItemSelect = (item: any) => {
    const isSelected = selectedItem.some(
      (selectedItem: { value: any }) => selectedItem.value === item.value
    );
    if (isSelected) {
      setSelectedItem(
        selectedItem.filter(
          (selectedItem: { value: any }) => selectedItem.value !== item.value
        )
      );
    }
  };

  const onConfirm = () => {
    setSelectedItems(selectedItem);
    //   props.onPressChoice(selectedItem);
    toggleModal();
  };

  useEffect(() => {
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
            valueTextRight={lengthUom.current.name ?? ""}
            RightIconClear={null}
            RightIconShow={() => {}}
            onClearText={() => {
              onChange("");
            }}
            pressRightIcon={() => {
              toggleModal();
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
              valueTextRight={widthUom.current.name ?? ""}
              styleTextRight={stylesWareHouse.textConfig}
              RightIcon={Images.dropDown}
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
              valueTextRight={heightUom.current.name ?? ""}
              RightIconClear={null}
              styleTextRight={stylesWareHouse.textConfig}
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
              valueTextRight={weightCapacityUom.current.name ?? ""}
              RightIconClear={null}
              RightIconShow={() => {}}
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
            // keyExtractor={(item) => item.toString()}
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
