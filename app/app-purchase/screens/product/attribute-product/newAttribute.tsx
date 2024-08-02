import { observer } from "mobx-react-lite";
import { FC, useRef, useState } from "react";
import React, {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Header, Text, TextField } from "../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { useNavigation } from "@react-navigation/native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-native-modal";
import { useStores } from "../../../models";
import { ALERT_TYPE, Dialog, Toast } from "../../../components/dialog-notification";
import { translate } from "../../../i18n";

export const NewAttribute: FC = observer(function NewAttribute(props) {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isNameAttribute, setIsNameAttribute] = useState(true);
  const [nameGroupAttribute, setNameGroupAttribute] = useState<any>({});
  const [isAttribute, setIsAttribute] = useState(false);
  const [nameAttribute, setNameAttribute] = useState<{}[]>([]);
  const [name, setName] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [dataAttribute, setDataAttribute] = useState<{}[]>([]);
  const [idAttribute, setIdAttribute] = useState("");
  const [dataCheckbox, setDataCheckbox] = useState<{value: string, idItem: number}[]>([]);
  const [inputText, setInputText] = useState<string[]>([]);
  const [errorText, setErrorText] = useState<string | undefined>('')
  const { attributeStore } = useStores();

  function generateRandomString(length: any) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  function extractAndRemove(items: any, condition: any) {
    const extractedItems = items.filter((item: any) => condition(item));
    const retainedItems = items.filter((item: any) => !condition(item));
    items.length = 0;
    items.push(...retainedItems);
    return extractedItems;
  }

  const addAttribute = () => {
    if (name.trim() === "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '',
        textBody: translate('txtToats.required_value_null'),
      })
    } else {
      if (nameAttribute.some((item: any) => item.name.trim() === name.trim())) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: '',
          textBody: translate('txtToats.cannot_create_duplicate'),
        })
      } else {
        const id = generateRandomString(8);
        const nameArr = [{ name: name, id: id }];
        const newArr = nameAttribute.concat(nameArr);
        const newInput = [...inputText, ""];
        setInputText(newInput);
        setNameAttribute(newArr);
        setName("");
        const newData = [
          {
            name: name,
            displayType: "Checkbox",
            productAttributeValues: [],
            id: id,
          },
        ];
        const newArrData = dataAttribute?.concat(newData);
        setDataAttribute(newArrData);
      }
    }
  };

  const addDataAttribute = (data: any, index: any) => {
    if (dataCheckbox.length === 0 || dataCheckbox[dataCheckbox.length - 1]?.value.trim() === "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '',
        textBody: translate('txtToats.required_value_null'),
      })
    } else {
      const newArr = extractAndRemove(
        dataCheckbox,
        (item: any) => item.idItem === data
      );
      const dataAdd = newArr[newArr.length - 1];
      const newArray = dataAttribute.map((obj: any) => {
        if (obj.id === data) {
          if (obj.productAttributeValues.some((dto: any) => dto.value === dataAdd.value)) {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: '',
              textBody: translate('txtToats.cannot_create_duplicate'),
            })
          } else {
            const newValues = obj.productAttributeValues.concat(dataAdd);
            return { ...obj, productAttributeValues: newValues };
          }
        }
        return obj;
      });
      setDataAttribute(newArray);
      inputText.splice([index, 1, ""] as never);
      setInputText(inputText);
    }
  };

  const deleteNameAttributeById = (id: any) => {
    const nameArr = nameAttribute.filter((obj: any) => obj.id !== id);
    setNameAttribute(nameArr);
    const newArray = dataAttribute.filter((obj: any) => obj.id !== id);
    setDataAttribute(newArray);
  };

  const deleteAttribute = (index: any, data: any, data1: any) => {
    data.splice(index, 1);
    const newArray = dataAttribute.map((obj: any) => {
      if (obj.id === data1.idItem) {
        return { ...obj, productAttributeValues: data };
      }
      return obj;
    });
    setDataAttribute(newArray);
  };

  const onSubmit = async (data: any) => {
    if (data.attribute === '') {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: '',
        textBody: translate('txtToats.required_information'),
      })
    }
    else {
      try {
        const response = await attributeStore.createAttributeGroup(
          data.attribute
        );
        if (response && response.kind === "ok") {
          setIsNameAttribute(false);
          setNameGroupAttribute(response.response.data);
        } else {
          setErrorText(response.response.errorCodes[0].message)
          console.error("Failed to fetch categories:", response.response.errorCodes);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  };

  const handleSave = async () => {
    const newArr = dataAttribute.map(({ id, ...rest }: any) => rest);
    const updateArr = newArr.map((item: any) => {
      if (item.displayType === "Checkbox") {
        return {
          ...item,
          displayType: "CHECKBOX",
        };
      } else if (item.displayType === "Textfield") {
        return {
          ...item,
          displayType: "TEXTFIELD",
        };
      }
      return item;
    });
    const endArr = updateArr.map((item) => ({
      ...item,
      productAttributeValues: item?.productAttributeValues?.map(
        ({ idItem, ...rest }: any) => rest
      ),
    }));
    const response = await attributeStore.createAttributeDataGroup(
      endArr,
      nameGroupAttribute.id
    );
    if (response && response.kind === "ok") {
      Dialog.show({
        type: ALERT_TYPE.INFO,
        title: translate("productScreen.Notification"),
        textBody: translate("newAttribute.newAttributeDialog"),
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          navigation.goBack()
          Dialog.hide();
        }
      })
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: translate("txtDialog.txt_title_dialog"),
        textBody: response.response.errorCodes[0].message,
        button: translate("common.ok"),
        closeOnOverlayTap: false
      })
      console.error("Failed to fetch categories11111111:", response.response.message);
    }
  };

  const handleSaveAndChange = async () => {
    const newArr = dataAttribute.map(({ id, ...rest }: any) => rest);
    const updateArr = newArr.map((item: any) => {
      if (item.displayType === "Checkbox") {
        return {
          ...item,
          displayType: "CHECKBOX",
        };
      } else if (item.displayType === "Textfield") {
        return {
          ...item,
          displayType: "TEXTFIELD",
        };
      }
      return item;
    });
    const endArr = updateArr?.map((item: any) => ({
      ...item,
      productAttributeValues: item?.productAttributeValues?.map(
        ({ idItem, ...rest }: any) => rest
      ),
    }));
    const response = await attributeStore.createAttributeDataGroup(
      endArr,
      nameGroupAttribute.id
    );
    if (response && response.kind === "ok") {
      Dialog.show({
        type: ALERT_TYPE.INFO,
        title: translate("productScreen.Notification"),
        textBody: translate("newAttribute.newAttributeDialog"),
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          navigation.navigate({
            name: "addAttribute", params: {
              data: {
                value: nameGroupAttribute.id,
                text: nameGroupAttribute.name,
              },
            }
          } as never)
          Dialog.hide();
        }
      })
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: translate("txtDialog.txt_title_dialog"),
        textBody: response.response.errorCodes[0].message,
        button: translate("common.ok"),
        closeOnOverlayTap: false
      })
      console.error("Failed to fetch categories:", response);
    }
  };

  const onPressModal = (data: any) => {
    const newArray = dataAttribute.map((obj: any) => {
      if (obj.id === idAttribute) {
        return { ...obj, displayType: data.item, productAttributeValues: [] };
      }
      return obj;
    });
    setDataAttribute(newArray);
    setIsModal(false);
  };

  const arrDataType = ["Checkbox", "Textfield"];
  
  return (
    <View style={styles.ROOT}>
      <Header
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        headerTx={isNameAttribute === true ? "createProductScreen.addNewAttributeGroup" : "createProductScreen.addNewAttribute"}
        style={{ height: scaleHeight(52) }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
        {isNameAttribute === true ? (
          <View
            style={styles.viewScreen}>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextField
                  keyboardType={null}
                  style={{}}
                  inputStyle={{
                    marginBottom: scaleHeight(5),
                    marginTop:
                      Platform.OS === "ios" ? scaleHeight(margin.margin_10) : 0,
                    paddingBottom: scaleHeight(padding.padding_8),
                  }}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value)
                    setErrorText('')
                  }}
                  onClearText={() => onChange("")}
                  RightIconClear={Svgs.icon_delete2}
                  multiline={true}
                  labelTx={"productScreen.nameGroupAttribute"}
                  placeholderTx={"createProductScreen.inputNameAttributeGroup"}
                  placeholderTextColor={colors.palette.nero}
                  isImportant={true}
                  error={errorText}
                />
              )}
              defaultValue={''}
              name="attribute"
            />
          </View>
        ) : (
          <View
            style={styles.viewScreen}>
            <Text
              text={nameGroupAttribute.name}
              style={styles.textNameAttribute}
            />
            {isAttribute === false ? (
              <TouchableOpacity
                onPress={() => setIsAttribute(true)}
                style={{ flexDirection: "row" }}>
                <Svgs.icon_add />
                <Text tx="createProductScreen.createAttributeInGroup"
                  style={styles.textAddAttribute}
                />
              </TouchableOpacity>
            ) : (
              <View>
                <View
                  style={styles.viewLineNameGroupAttribute}>
                  <View
                    style={styles.viewNameGroupAttribute}>
                    {nameAttribute.length > 0
                      ? nameAttribute.map((item: any) => {
                        return (
                          <View
                            style={styles.viewDataAttribute}
                            key={item.id}>
                            <Text
                              text={item.name}
                              style={[
                                styles.textAttribute,
                                {
                                  marginRight: scaleWidth(4),
                                },
                              ]}
                            />
                            <TouchableOpacity
                              onPress={() =>
                                deleteNameAttributeById(item.id)
                              }>
                              <Svgs.icon_delete2
                                width={scaleWidth(10)}
                                height={scaleHeight(10)}
                              />
                            </TouchableOpacity>
                          </View>
                        );
                      })
                      : null}
                    <TextInput
                      style={{
                        paddingVertical:
                          Platform.OS === "ios" ? scaleHeight(4) : 0,
                        minWidth: scaleWidth(100),
                      }}
                      placeholder={translate('createProductScreen.inputNameAttribute')}
                      value={name}
                      onChangeText={(text) => setName(text)}
                      onSubmitEditing={() => addAttribute()}
                      blurOnSubmit={false}
                    // multiline={true}
                    />
                  </View>
                  <TouchableOpacity onPress={() => addAttribute()}>
                    <Svgs.icon_plusCircleBlue />
                  </TouchableOpacity>
                </View>
                {dataAttribute.length > 0
                  ? dataAttribute.map((item: any, index: any) => {
                    return (
                      <View
                        key={item.id}
                        style={styles.viewLineAttribute}>
                        <TouchableOpacity
                          onPress={() => deleteNameAttributeById(item.id)}>
                          <Svgs.icon_minusCircle />
                        </TouchableOpacity>
                        <Text
                          text={item.name}
                          style={[
                            styles.textAttribute,
                            {
                              marginLeft: scaleWidth(2),
                              width:
                                (Dimensions.get("screen").width -
                                  scaleWidth(32)) *
                                0.2,
                            },
                          ]}
                        />
                        <View style={styles.viewDataType}>
                          <Text
                            text={item.displayType}
                            style={styles.textNero400}
                          />
                          <TouchableOpacity
                            onPress={() => {
                              setIsModal(true);
                              setIdAttribute(item.id);
                            }}>
                            <Svgs.icon_caretRightDown />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={styles.viewAddDataAttribute}>
                          {item.displayType === "Textfield" ? null : (
                            <View style={styles.viewAddDataCheckbox}>
                              <ScrollView
                                horizontal
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  marginRight: scaleWidth(4),
                                }}>
                                {item.productAttributeValues.length > 0 &&
                                  item.productAttributeValues.map(
                                    (items: any, index: any) => {
                                      return (
                                        <View
                                          style={styles.viewDataAttribute}
                                          key={index}>
                                          <Text
                                            text={items?.value}
                                            style={[
                                              styles.textAttribute,
                                              {
                                                marginRight: scaleWidth(4),
                                              },
                                            ]}
                                          />
                                          <TouchableOpacity
                                            onPress={() =>
                                              deleteAttribute(
                                                index,
                                                item.productAttributeValues,
                                                items
                                              )
                                            }>
                                            <Svgs.icon_delete2
                                              width={scaleWidth(6)}
                                              height={scaleHeight(10)}
                                            />
                                          </TouchableOpacity>
                                        </View>
                                      );
                                    }
                                  )}
                                <TextInput
                                  style={{
                                    paddingVertical:
                                      Platform.OS === "ios"
                                        ? scaleHeight(4)
                                        : 0,
                                    minWidth: scaleWidth(160),
                                  }}
                                  value={inputText[index]}
                                  placeholder={translate('createProductScreen.enterValue')}
                                  onChangeText={(text) => {
                                    inputText.splice([index, 1, text] as never);
                                    setInputText(inputText);
                                    const newObj = {
                                      idItem: item.id,
                                      value: text,
                                    };
                                    const newData =
                                      dataCheckbox.concat(newObj);
                                    setDataCheckbox(newData);
                                  }}
                                  onSubmitEditing={() => addDataAttribute(item.id, index)}
                                  blurOnSubmit={false}
                                />
                              </ScrollView>
                            </View>
                          )}
                          {item.displayType === "Textfield" ? null : (
                            <TouchableOpacity
                              onPress={() =>
                                addDataAttribute(item.id, index)
                              }>
                              <Svgs.icon_plusCircleBlue />
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    );
                  })
                  : null}
              </View>
            )}
          </View>
        )}
      </KeyboardAvoidingView>
      {isNameAttribute === true ? (
        <View style={styles.viewGroupButton}>
          <Button
            onPress={() => navigation.goBack()}
            tx={"common.cancel"}
            style={styles.viewButtonCancel}
            textStyle={styles.textButtonCancel}
          />
          <Button
            tx="common.saveAndContinue"
            style={styles.viewButtonConfirm}
            textStyle={[
              styles.textButtonCancel,
              { color: colors.palette.neutral100 },
            ]}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      ) : null}
      {dataAttribute.length > 0 ? (
        <View style={styles.viewGroupButton}>
          <Button
            onPress={() => handleSave()}
            tx="common.save"
            style={styles.viewButtonCancel}
            textStyle={styles.textButtonCancel}
          />
          <Button
            tx="common.saveAndContinue"
            style={styles.viewButtonConfirm}
            textStyle={[
              styles.textButtonCancel,
              { color: colors.palette.neutral100 },
            ]}
            onPress={() => handleSaveAndChange()}
          />
        </View>
      ) : null}
      <Modal isVisible={isModal} style={{ margin: 0 }}>
        <View style={styles.viewModal}>
          <Text
            text={"DataType"}
            style={[
              styles.textButtonCancel,
              {
                marginVertical: scaleHeight(10),
                marginLeft: scaleWidth(9),
                color: colors.palette.nero,
              },
            ]}
          />
          <FlatList
            data={arrDataType}
            renderItem={(item) => {
              return (
                <View>
                  <View
                    style={{
                      height: scaleHeight(1),
                      backgroundColor: colors.solitude2,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      paddingVertical: 10,
                    }}
                    onPress={() => onPressModal(item)}>
                    <Text
                      style={{
                        fontSize: fontSize.size14,
                      }}>
                      {item.item}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(index) => index.toString()}
          />
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  ROOT: { flex: 1, backgroundColor: colors.palette.neutral100 },
  viewGroupButton: {
    position: "absolute",
    bottom: scaleHeight(20),
    marginHorizontal: scaleWidth(margin.margin_16),
    flexDirection: "row",
    // top: Dimensions.get('screen').height - scaleHeight(20) - scaleHeight(48)
    // justifyContent: 'space-between',
  },
  viewButtonCancel: {
    height: scaleHeight(48),
    backgroundColor: colors.palette.neutral100,
    borderWidth: 1,
    borderColor: colors.palette.veryLightGrey,
    width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
    borderRadius: 8,
    marginRight: (Dimensions.get("screen").width - scaleWidth(32)) * 0.04,
  },
  viewButtonConfirm: {
    height: scaleHeight(48),
    backgroundColor: colors.palette.navyBlue,
    width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
    borderRadius: 8,
  },
  viewDataAttribute: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(8),
    backgroundColor: colors.palette.aliceBlue,
    marginRight: scaleWidth(8),
    height: scaleHeight(24),
  },
  viewModal: {
    // height: Dimensions.get("screen").height * 0.3,
    backgroundColor: colors.palette.neutral100,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingVertical: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_16),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  viewDataType: {
    flexDirection: "row",
    marginHorizontal: scaleWidth(5),
    width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.2,
    borderBottomColor: colors.quartz,
    borderBottomWidth: scaleHeight(1),
    paddingVertical: scaleHeight(5),
  },
  textButtonCancel: {
    color: colors.palette.dolphin,
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
  textAttribute: {
    fontWeight: "400",
    fontSize: fontSize.size10,
    color: colors.palette.dolphin,
  },
  textAddAttribute: {
    fontWeight: "600",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.palette.navyBlue,
    marginLeft: scaleWidth(6),
  },
  textNameAttribute: {
    fontWeight: "600",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(16.94),
    color: colors.palette.nero,
    marginBottom: scaleHeight(15),
  },
  viewScreen: {
    marginTop: scaleHeight(20),
    marginHorizontal: scaleWidth(16),
  },
  textNero400: {
    fontWeight: "400",
    fontSize: fontSize.size10,
    color: colors.palette.nero,
    flex: 1,
  },
  viewLineNameGroupAttribute: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.quartz,
    borderBottomWidth: scaleHeight(1),
  },
  viewNameGroupAttribute: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: scaleWidth(4),
  },
  viewLineAttribute: {
    flexDirection: "row",
    marginTop: scaleHeight(15),
    alignItems: "center",
  },
  viewAddDataAttribute: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: colors.quartz,
    borderBottomWidth: scaleHeight(1),
    paddingBottom: scaleHeight(2),
  },
  viewAddDataCheckbox: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth:
      (Dimensions.get("screen").width -
        scaleWidth(32)) *
      0.5,
  },
});
