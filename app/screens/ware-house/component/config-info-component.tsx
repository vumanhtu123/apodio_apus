import React, { useState } from "react";
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
  const toggleModal = () => {
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
    } else {
      setSelectedItem([...selectedItem, item]);
    }
    // onPressChoice(selectedItems);
  };

  const onConfirm = () => {
    setSelectedItems(selectedItem);
    //   props.onPressChoice(selectedItem);
    toggleModal();
  };
  return (
    <View>
      <Controller
        control={props.control}
        // Account test setup new pin
        // defaultValue={"system_admin"}
        // Account test
        rules={{
          required: "Please input data",
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
          required: "Please input data",
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
            valueTextRight="m2"
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
          required: "Please input data",
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
              labelTx={"wareHouse.minimumStorageTemperature"}
              placeholder={translate("wareHouse.enterTemperature")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              // secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              valueTextRight="m2"
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
            required: "Please input data",
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
              labelTx={"wareHouse.standardHumidity"}
              placeholder={translate("wareHouse.enterHumidity")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              // secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              valueTextRight="m2"
              RightIconClear={null}
              RightIconShow={() => {}}
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
            required: "Please input data",
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
              labelTx={"wareHouse.standardHumidity"}
              placeholder={translate("wareHouse.enterHumidity")}
              style={{ marginBottom: scaleHeight(0) }}
              inputStyle={stylesWareHouse.inputPass}
              value={value}
              // secureTextEntry={false}
              onBlur={onBlur}
              isShowPassword
              valueTextRight="Tấn"
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
            required: "Please input data",
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
            data={[]}
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
  );
};
