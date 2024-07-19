import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Header, Switch, Text } from "../../components";
import { Images } from "../../../assets";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../theme";
import DropdownModal from "./component/multiSelect";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { useStores } from "../../models";
import { translate } from "../../i18n/translate";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
} from "../../components/dialog-notification";

export const EditAttribute: FC = observer(function EditAttribute(props) {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const route = useRoute();
  const {
    dataAttribute,
    dropdownSelected,
    editScreen,
    hasVariantInConfig,
  }: any = route?.params;

  const [attributeData, setAttributeData] = useState<{}[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<{}[]>([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [idAttributeCategory, setIdAttributeCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [arrData, setArrData] = useState([]);
  const [filteredData, setFilteredData] = useState(arrData);
  const [titleModal, setTitleModal] = useState("");
  const [arrSelect, setArrSelect] = useState([]);
  const [arrSelectDrop, setArrSelectDrop] = useState([]);
  const [idAttributeModal, setIdAttributeModal] = useState("");
  const [inputText, setInputText] = useState<{}[]>([]);
  const [page, setPage] = useState(0);
  const [dataEditDropdown, setDataEditDropdown] = useState([]);
  const [loadNew, setLoadNew] = useState(true);
  const { attributeStore } = useStores();
  const [valueSwitch, setValueSwitch] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (hasVariantInConfig !== undefined) {
        // console.log("---N--1------hasVariantInConfig", hasVariantInConfig);
        setValueSwitch(hasVariantInConfig);
      }
    });
    return unsubscribe;
  }, [hasVariantInConfig]);

  const getListAttribute = async () => {
    try {
      const response = await attributeStore.getListAttribute(page, 50, true);
      if (response && response.kind === "ok") {
        if (page === 0) {
          // console.log(
          //   "getListAttribute---------------------",
          //   JSON.stringify(response.response.data)
          // );
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            text: item.name,
            value: item.id,
          }));
          setAttributeData(formatArr);
        } else {
          // console.log(
          //   "getListAttribute---------------------",
          //   JSON.stringify(response.response.data)
          // );
          const newArr = response.response.data.content;
          const formatArr = newArr.map((item: any) => ({
            text: item.name,
            value: item.id,
          }));
          const endArr = attributeData.concat(formatArr);
          setAttributeData(endArr);
        }
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const getListDataAttribute = async () => {
    try {
      const response = await attributeStore.getListDataAttribute(
        idAttributeCategory
      );
      if (response && response.kind === "ok") {
        // setSelectedGroup(response.response.data)
        const a = response.response.data;
        const b = a.concat(selectedGroup);
        setSelectedGroup(b);
        const newArr = response.response.data.map((items) => {
          items.attributeOutputList?.map((item) => {
            if (item.displayType === "TEXTFIELD") {
              const newItem = { value: "", productAttributeId: item.id };
              const newArr = [...inputText, newItem];
              return newArr;
            }
          });
        });
        setInputText(newArr);
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const getListDataAttributeNew = async () => {
    try {
      const response = await attributeStore.getListDataAttribute(
        idAttributeCategory
      );
      if (response && response.kind === "ok") {
        // setSelectedGroup(response.response.data)
        const newArr2 = selectedItems.map(
          (item: { productAttributeId: any }) => item.productAttributeId
        );
        const newArr3 = [...new Set(newArr2)];
        let idSet = new Set(newArr3);
        const newArr1 = response.response.data.map((obj) => ({
          ...obj,
          attributeOutputList: obj?.attributeOutputList?.filter((item) =>
            idSet.has(item.id)
          ),
        }));
        setSelectedGroup(newArr1);
        const newArr = response.response.data.map((items) => {
          items.attributeOutputList?.map((item) => {
            if (item.displayType === "TEXTFIELD") {
              const newItem = { value: "", productAttributeId: item.id };
              const newArr = [...inputText, newItem];
              return newArr;
            }
          });
        });
        setInputText(newArr);
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getListAttribute();
  }, [page]);

  useEffect(() => {
    if (idAttributeCategory.length > 0 && loadNew === false) {
      getListDataAttribute();
      // console.log("56789");
    }
    if (idAttributeCategory.length > 0 && loadNew === true) {
      getListDataAttributeNew();
      // console.log("12345");
    }
  }, [idAttributeCategory]);

  useEffect(() => {
    console.log('dataDropdown' ,dropdownSelected)
    if (dataAttribute !== undefined) {
      const newArr = dropdownSelected.map((item: any) => {
        return item.value;
      });
      setIdAttributeCategory(newArr);
      setSelectedItems(dataAttribute);
      setDataEditDropdown(dropdownSelected);
      setArrSelectDrop(dropdownSelected);
      // console.log(dataAttribute, "dataAttribute====");
    }
  }, [dropdownSelected]);

  const deleteLineAttribute = (items: any) => {
    const newArr = selectedGroup.map((item: any) => {
      if (item.id === items.item.attributeCategoryId) {
        const arr = item.attributeOutputList.slice();
        arr.splice(items.index, 1);
        return { ...item, attributeOutputList: arr };
      } else {
        return item;
      }
    });
    const newArr1 = newArr.filter(
      (item: any) => item.attributeOutputList?.length !== 0
    );
    const newArr2 = selectedItems.filter(
      (item: any) => item.productAttributeId !== items.item.id
    );
    const newArr3 = newArr1.map((item: any) => {
      return { text: item.name, value: item.id };
    });
    setDataEditDropdown(newArr3);
    setSelectedItems(newArr2);
    setSelectedGroup(newArr1);
  };

  const handleSelect = (items: any) => {
    const newArr = items.map((item: any) => item.value);
    const setNew = new Set(newArr);
    const newIdAttribute = selectedGroup.map((items: any) => {
      return items.id;
    });
    const setOld = new Set(newIdAttribute);
    const onlyInOld = newIdAttribute.filter((element) => !setNew.has(element));

    const onlyInNew = newArr.filter((element) => !setOld.has(element));
    const newArr2 = newArr.map((item) => {
      const a = selectedItems.map((items) => {
        if (item === items.idGroup) {
          return items;
        }
      });
      return a;
    });
    const newArr3 = newArr2.flatMap((items) =>
      items.filter((item) => item !== undefined)
    );
    const setOldSelect = new Set(onlyInOld);

    const newSelectGroup = selectedGroup.filter(
      (item) => !setOldSelect.has(item.id)
    );
    setSelectedItems(newArr3);
    setSelectedGroup(newSelectGroup);
    setArrSelectDrop(items);
    if (newArr.length === 0) {
      setSelectedGroup([]);
    }
    setIdAttributeCategory(onlyInNew);
    setLoadNew(false);
  };
  const handleRemove = () => {};

  const onPressCaret = (item: any, id: any, idGroup: any) => {
    const a = selectedItems.filter((item) => item.productAttributeId === id);
    const newArray = item.map((items: any) => ({ ...items, idGroup: idGroup }));
    setShowModal(true);
    setArrData(newArray);
    setFilteredData(newArray);
    setArrSelect(a);
  };

  const handleItemSelect = (item: any) => {
    var indexArr = arrSelect.findIndex(
      (selectedItem: { value: any; id: any }) =>
        selectedItem.value === item.value && selectedItem.id === item.id
    );
    if (indexArr === -1) {
      let a = arrSelect.concat(item);
      setArrSelect(a);
    } else {
      let b = arrSelect.slice();
      b.splice(indexArr, 1);
      setArrSelect(b);
    }
  };

  const onConfirm = () => {
    if (selectedItems.length === 0) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.please_select_attribute"),
      });
    } else {
      const newArr = selectedGroup.map((items) => {
        const a = items.attributeOutputList?.map((item) => {
          return item.id;
        });
        return a;
      });
      const newArr1 = newArr.flat();
      const newArr2 = selectedItems?.map((items) => {
        return items.productAttributeId;
      });
      const setNewArr2 = new Set(newArr2);
      const newArr3 = newArr1.some((element) => !setNewArr2.has(element));
      if (newArr3 === true) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.please_select_attribute"),
        });
      } else {
        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("txtDialog.txt_title_dialog"),
          textBody: translate("txtDialog.attribute_deletion_warning"),
          button: translate("common.cancel"),
          button2: translate("common.ok"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            if (editScreen === true) {
              const newArr = selectedItems?.map((item) => {
                return item.idGroup;
              });
              const newArr1 = [...new Set(newArr)];
              const newArr2 = newArr1.map((items) => {
                const a = attributeData?.filter((item) => item.value === items);
                return a;
              });
              const newArr3 = newArr2.flat();
              if (!valueSwitch) {
                // Tạo một tập hợp các cặp id và productAttributeId trong mảng con để dễ dàng kiểm tra
                let childSet = new Set(
                  selectedItems.map(
                    (item) => `${item.id}-${item.productAttributeId}`
                  )
                );
                // Duyệt qua từng mục trong mảng cha và xóa các mục không có trong mảng con
                const newArrSelectedGroup = selectedGroup.slice();
                newArrSelectedGroup.forEach((parent) => {
                  parent.attributeOutputList.forEach((attributeOutput) => {
                    attributeOutput.productAttributeValue =
                      attributeOutput.productAttributeValue.filter(
                        (attributeValue) =>
                          childSet.has(
                            `${attributeValue.id}-${attributeValue.productAttributeId}`
                          )
                      );
                  });
                });
                // console.log(
                //   "-N--------selectedGroup111-----",
                //   JSON.stringify(newArrSelectedGroup)
                // );
                navigation.navigate({name: "ProductEditScreen" as never, params:{
                  check: true,
                  attributeArr: selectedItems,
                  dropdownSelected: newArr3,
                  selectedGroupAttribute: newArrSelectedGroup,
                  isVariantInConfig: valueSwitch,
                }}as never);
              } else {
                navigation.navigate({name: "ProductEditScreen" as never, params: {
                  check: true,
                  attributeArr: selectedItems,
                  dropdownSelected: newArr3,
                  selectedGroupAttribute: [],
                  isVariantInConfig: valueSwitch,
                }}as never);
              }
              Dialog.hide();
            } else {
              const newArr = selectedItems.map((item) => {
                return item.idGroup;
              });
              const newArr1 = [...new Set(newArr)];
              const newArr2 = newArr1.map((items) => {
                const a = attributeData.filter((item) => item.value === items);
                return a;
              });
              const newArr3 = newArr2.flat();
              if (!valueSwitch) {
                // Tạo một tập hợp các cặp id và productAttributeId trong mảng con để dễ dàng kiểm tra
                let childSet = new Set(
                  selectedItems.map(
                    (item) => `${item.id}-${item.productAttributeId}`
                  )
                );
                // Duyệt qua từng mục trong mảng cha và xóa các mục không có trong mảng con
                const newArrSelectedGroup = selectedGroup.slice();
                newArrSelectedGroup.forEach((parent) => {
                  parent.attributeOutputList.forEach((attributeOutput) => {
                    attributeOutput.productAttributeValue =
                      attributeOutput.productAttributeValue.filter(
                        (attributeValue) =>
                          childSet.has(
                            `${attributeValue.id}-${attributeValue.productAttributeId}`
                          )
                      );
                  });
                });
                // console.log(
                //   "-N--------selectedGroup111-----",
                //   JSON.stringify(newArrSelectedGroup)
                // );
                navigation.navigate({name: "ProductCreateScreen" as never, params: {
                  check: true,
                  attributeArr: selectedItems,
                  dropdownSelected: newArr3,
                  resetData: false,
                  selectedGroupAttribute: newArrSelectedGroup,
                  isVariantInConfig: valueSwitch,
                }}as never);
              } else {
                navigation.navigate({name: "ProductCreateScreen" as never, params: {
                  check: true,
                  attributeArr: selectedItems,
                  dropdownSelected: newArr3,
                  resetData: false,
                  selectedGroupAttribute: [],
                  isVariantInConfig: valueSwitch,
                }}as never);
              }
              Dialog.hide();
            }
          },
        });
      }
    }
  };

  const onCancel = () => {
    if (selectedItems.length === 0) {
      navigation.goBack();
    } else {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: translate("txtDialog.txt_title_dialog"),
        textBody: translate("txtDialog.confirm_edit_attribute"),
        button: translate("common.cancel"),
        button2: translate("common.ok"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          navigation.goBack();
          Dialog.hide();
        },
      });
    }
  };

  const onCancelModal = () => {
    setShowModal(false);
    setArrSelect([]);
  };

  const onConfirmModal = async () => {
    const a = selectedItems.filter(
      (item) => item.productAttributeId !== idAttributeModal
    );
    setSelectedItems(a.concat(arrSelect));
    setShowModal(false);
    setArrSelect([]);
  };

  const renderItem = ({ item }: any) => {
    const isSelected = arrSelect.some(
      (selectedItem: { value: any; idAttribute: any }) =>
        selectedItem.value === item.value &&
        selectedItem.idAttribute === item.idAttribute
    );
    return (
      <View>
        <View style={{ height: scaleHeight(1), backgroundColor: "#E7EFFF" }} />
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            flexDirection: "row",
          }}
          onPress={() => handleItemSelect(item)}>
          <View style={styles.viewItemFlatListModal}>
            {isSelected && (
              <Images.icon_checkBox
                width={scaleWidth(16)}
                height={scaleHeight(16)}
              />
            )}
          </View>
          <Text
            style={{
              fontSize: fontSize.size14,
            }}>
            {item.value}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.ROOT}>
      <Header
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        headerText={translate("productScreen.updateAttribute")}
        style={{ height: scaleHeight(52) }}
      />
      <View
        style={[
          styles.viewBody,
          { top: scaleHeight(52) + scaleHeight(paddingTop) },
        ]}>
        <DropdownModal
          required
          arrData={attributeData}
          onPressChoice={handleSelect}
          onRemove={handleRemove}
          titleText={translate("addAttribute.title")}
          hintText={translate("addAttribute.hint")}
          dataEdit={dataEditDropdown}
          loadMore={() => setPage(page + 1)}
        />
        <ScrollView>
          {selectedGroup.map((item: any, index: any) => {
            return (
              <View key={index}>
                <View>
                  <Text
                    text={item.name}
                    style={{
                      fontWeight: "600",
                      fontSize: fontSize.size12,
                      color: colors.palette.nero,
                      marginTop: scaleHeight(15),
                    }}
                  />
                </View>
                <FlatList
                  data={item.attributeOutputList}
                  scrollEnabled={false}
                  keyExtractor={(item, index) => item.id}
                  renderItem={(items) => {
                    return (
                      <View style={styles.viewItemAttribute}>
                        <TouchableOpacity
                          style={{
                            height: scaleHeight(20),
                            width: scaleWidth(20),
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() => deleteLineAttribute(items)}>
                          <Images.icon_minusCircle />
                        </TouchableOpacity>
                        <Text
                          text={items.item.name}
                          style={[
                            styles.textAttribute,
                            {
                              width:
                                (Dimensions.get("screen").width -
                                  scaleWidth(32)) *
                                0.3,
                              marginLeft: scaleWidth(2),
                            },
                          ]}
                        />
                        {items.item.displayType === "CHECKBOX" ? (
                          <View style={{ flexDirection: "row" }}>
                            {selectedItems.some(
                              (item) =>
                                item.productAttributeId === items.item.id
                            ) ? (
                              <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={{
                                  maxWidth:
                                    (Dimensions.get("screen").width -
                                      scaleWidth(32)) *
                                    0.6,
                                }}>
                                {selectedItems.map((item) => {
                                  if (
                                    item.productAttributeId === items.item.id
                                  ) {
                                    return (
                                      <TouchableOpacity
                                        onPress={() => {
                                          const newArr = selectedItems.slice();
                                          const a = newArr.filter(
                                            (items) => items.id !== item.id
                                          );
                                          setSelectedItems(a);
                                        }}
                                        style={styles.viewDataAttribute}
                                        key={item.index}>
                                        <Text
                                          text={item.value}
                                          style={[
                                            styles.textAttribute,
                                            {
                                              marginRight: scaleWidth(4),
                                            },
                                          ]}
                                        />
                                        <Images.icon_delete2
                                          width={scaleWidth(10)}
                                          height={scaleHeight(10)}
                                        />
                                      </TouchableOpacity>
                                    );
                                  }
                                })}
                              </ScrollView>
                            ) : (
                              <View
                                style={{
                                  width:
                                    (Dimensions.get("screen").width -
                                      scaleWidth(32)) *
                                    0.6,
                                }}>
                                <Text
                                  text=" Chọn giá trị"
                                  style={{
                                    color: colors.palette.dolphin,
                                    fontSize: fontSize.size12,
                                  }}
                                />
                              </View>
                            )}
                            <TouchableOpacity
                              onPress={() => {
                                onPressCaret(
                                  items.item.productAttributeValue,
                                  items.item.id,
                                  item.id
                                );
                                setTitleModal(items.item.name);
                                setIdAttributeModal(items.item.id);
                              }}>
                              <Images.icon_caretRightDown />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View>
                            {selectedItems.some(
                              (item) =>
                                item.productAttributeId === items.item.id
                            ) ? (
                              <View>
                                {selectedItems.map((dto) => {
                                  if (
                                    dto.productAttributeId === items.item.id
                                  ) {
                                    return (
                                      <TextInput
                                        style={{
                                          width:
                                            (Dimensions.get("screen").width -
                                              scaleWidth(32)) *
                                            0.6,
                                          paddingVertical:
                                            Platform.OS === "ios"
                                              ? scaleHeight(4)
                                              : 0,
                                        }}
                                        placeholder={translate(
                                          "productScreen.enterValue"
                                        )}
                                        placeholderTextColor={
                                          colors.palette.dolphin
                                        }
                                        defaultValue={dto.value}
                                        onChangeText={(text) => {
                                          const newItem = {
                                            productAttributeId: items.item.id,
                                            value: text,
                                            idGroup: item.id,
                                          };
                                          var indexArr =
                                            selectedItems.findIndex(
                                              (selectedItem: {
                                                productAttributeId: any;
                                              }) =>
                                                selectedItem.productAttributeId ===
                                                items.item.id
                                            );
                                          if (indexArr === -1) {
                                            let a =
                                              selectedItems.concat(newItem);
                                            setSelectedItems(a);
                                          } else {
                                            let b = selectedItems.slice();
                                            b.splice(indexArr, 1, newItem);
                                            setSelectedItems(b);
                                          }
                                        }}
                                      />
                                    );
                                  }
                                })}
                              </View>
                            ) : (
                              <TextInput
                                style={{
                                  width:
                                    (Dimensions.get("screen").width -
                                      scaleWidth(32)) *
                                    0.6,
                                  paddingVertical:
                                    Platform.OS === "ios" ? scaleHeight(4) : 0,
                                }}
                                placeholder={translate(
                                  "productScreen.enterValue"
                                )}
                                placeholderTextColor={colors.palette.dolphin}
                                onChangeText={(text) => {
                                  const newItem = {
                                    productAttributeId: items.item.id,
                                    value: text,
                                    idGroup: item.id,
                                  };
                                  var indexArr = selectedItems.findIndex(
                                    (item) =>
                                      item.productAttributeId === items.item.id
                                  );
                                  if (indexArr === -1) {
                                    let a = selectedItems.concat(newItem);
                                    setSelectedItems(a);
                                  } else {
                                    let b = selectedItems.slice();
                                    b.splice(indexArr, 1, newItem);
                                    setSelectedItems(b);
                                  }
                                }}
                              />
                            )}
                          </View>
                        )}
                      </View>
                    );
                  }}
                />
              </View>
            );
          })}
          <View style={styles.viewLineSwitchUnit}>
            <Switch
              value={valueSwitch}
              onToggle={() => {
                setValueSwitch(!valueSwitch);
              }}
            />
            <Text
              tx={"addAttribute.allowsCreatingAttribute"}
              style={styles.textWeight400Dolphin}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.viewGroupButton}>
        <Button
          onPress={() => onCancel()}
          tx={"productScreen.cancel"}
          style={styles.viewButtonCancel}
          textStyle={styles.textButtonCancel}
        />
        <Button
          tx={"productScreen.save"}
          style={styles.viewButtonConfirm}
          textStyle={[
            styles.textButtonCancel,
            { color: colors.palette.neutral100 },
          ]}
          onPress={() => onConfirm()}
        />
      </View>
      <Modal isVisible={showModal}>
        <View style={styles.viewModal}>
          <Text
            text={titleModal}
            style={[
              styles.textButtonCancel,
              {
                marginVertical: scaleHeight(18),
                marginLeft: scaleWidth(9),
                color: colors.palette.nero,
              },
            ]}
          />
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: scaleHeight(margin.margin_10),
            }}>
            <Button
              onPress={() => onCancelModal()}
              tx={"productScreen.cancel"}
              style={[
                styles.viewButtonCancel,
                {
                  width:
                    (Dimensions.get("screen").width - scaleWidth(64)) * 0.48,
                  marginRight: 0,
                },
              ]}
              textStyle={styles.textButtonCancel}
            />
            <Button
              tx={"productScreen.BtnNotificationAccept"}
              style={[
                styles.viewButtonConfirm,
                {
                  width:
                    (Dimensions.get("screen").width - scaleWidth(64)) * 0.48,
                },
              ]}
              textStyle={[
                styles.textButtonCancel,
                { color: colors.palette.neutral100 },
              ]}
              onPress={(idAttributeModal) => onConfirmModal()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  viewItemFlatListModal: {
    width: scaleWidth(16),
    height: scaleHeight(16),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(6),
  },
  ROOT: { flex: 1, backgroundColor: colors.palette.neutral100 },
  viewBody: {
    paddingHorizontal: scaleWidth(16),
    paddingVertical: scaleHeight(16),
    position: "absolute",
    left: 0,
    right: 0,
    bottom: scaleHeight(54),
  },
  viewGroupButton: {
    position: "absolute",
    bottom: scaleHeight(20),
    marginHorizontal: scaleWidth(margin.margin_16),
    flexDirection: "row",
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
  viewModal: {
    height: Dimensions.get("screen").height * 0.4,
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    paddingVertical: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_16),
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  viewItemAttribute: {
    flexDirection: "row",
    alignItems: "center",
    height: scaleHeight(34),
    borderBottomWidth: 1,
    borderBottomColor: "#E7EFFF",
  },
  viewDataAttribute: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scaleWidth(8),
    backgroundColor: colors.palette.aliceBlue,
    marginRight: scaleWidth(8),
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
  viewLineSwitchUnit: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scaleHeight(20),
    marginBottom: scaleHeight(15),
  },
  textWeight400Dolphin: {
    fontSize: fontSize.size13,
    fontWeight: "400",
    marginLeft: scaleWidth(8),

    color: "black",
  },
});
