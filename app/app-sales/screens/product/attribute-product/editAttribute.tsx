import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Header } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  colors,
  scaleHeight,
} from "../../../theme";
import DropdownModal from "../component/multiSelect";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStores } from "../../../models";
import { translate } from "../../../i18n/translate";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
} from "../../../../components/dialog-notification";
import { ItemAttribute } from "./itemAttribute";
import { styles } from "./styles";
import { FormProvider, useForm } from "react-hook-form";

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
  const methods = useForm({ defaultValues: { valueSwitch: true } })

  const [attributeData, setAttributeData] = useState<{}[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<{}[]>([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [idAttributeCategory, setIdAttributeCategory] = useState([]);
  const [arrData, setArrData] = useState([]);
  const [filteredData, setFilteredData] = useState(arrData);
  const [arrSelect, setArrSelect] = useState([]);
  const [arrSelectDrop, setArrSelectDrop] = useState([]);
  const [idAttributeModal, setIdAttributeModal] = useState("");
  const [inputText, setInputText] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [dataEditDropdown, setDataEditDropdown] = useState([]);
  const [loadNew, setLoadNew] = useState(true);
  const { attributeStore } = useStores();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (hasVariantInConfig !== undefined) {
        methods.setValue('valueSwitch', hasVariantInConfig)
      }
    });
    return unsubscribe;
  }, [hasVariantInConfig]);

  const getListAttribute = async () => {
    const response = await attributeStore.getListAttribute(page, 50, true);
    if (response && response.kind === "ok") {
      if (page === 0) {
        const newArr = response.response.data.content;
        const formatArr = newArr.map((item: any) => ({
          text: item.name,
          value: item.id,
        }));
        setAttributeData(formatArr);
      } else {
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
  };
  const getListDataAttribute = async () => {
    const response = await attributeStore.getListDataAttribute(
      idAttributeCategory
    );
    if (response && response.kind === "ok") {
      // setSelectedGroup(response.response.data)
      const a = response.response.data;
      const b = a.concat(selectedGroup as any);
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
  };
  const getListDataAttributeNew = async () => {
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
  };

  useEffect(() => {
    getListAttribute();
  }, [page]);

  useEffect(() => {
    if (idAttributeCategory.length > 0 && loadNew === false) {
      getListDataAttribute();
    }
    if (idAttributeCategory.length > 0 && loadNew === true) {
      getListDataAttributeNew();
    }
  }, [idAttributeCategory]);

  useEffect(() => {
    if (dataAttribute !== undefined) {
      const newArr = dropdownSelected.map((item: any) => {
        return item.value;
      });
      setIdAttributeCategory(newArr);
      setSelectedItems(dataAttribute);
      setDataEditDropdown(dropdownSelected);
      setArrSelectDrop(dropdownSelected);
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
    setDataEditDropdown(newArr3 as any);
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

    const onlyInNew = newArr.filter((element: any) => !setOld.has(element));
    const newArr2 = newArr.map((item: any) => {
      const a = selectedItems.map((items: any) => {
        if (item === items.idGroup) {
          return items;
        }
      });
      return a;
    });
    const newArr3 = newArr2.flatMap((items: any) =>
      items.filter((item: any) => item !== undefined)
    );
    const setOldSelect = new Set(onlyInOld);

    const newSelectGroup = selectedGroup.filter(
      (item: any) => !setOldSelect.has(item.id)
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
  const handleRemove = () => { };

  const onPressCaret = (item: any, id: any, idGroup: any) => {
    const a = selectedItems.filter((item: any) => item.productAttributeId === id);
    const newArray = item.map((items: any) => ({ ...items, idGroup: idGroup }));
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

  const onConfirm = (data: any) => {
    if (selectedItems.length === 0) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.please_select_attribute"),
      });
    } else {
      const newArr = selectedGroup.map((items: any) => {
        const a = items.attributeOutputList?.map((item: any) => {
          return item.id;
        });
        return a;
      });
      const newArr1 = newArr.flat();
      const newArr2 = selectedItems?.map((items: any) => {
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
              const newArr = selectedItems?.map((item: any) => {
                return item.idGroup;
              });
              const newArr1 = [...new Set(newArr)];
              const newArr2 = newArr1.map((items) => {
                const a = attributeData?.filter((item: any) => item.value === items);
                return a;
              });
              const newArr3 = newArr2.flat();
              if (!data.valueSwitch) {
                // Tạo một tập hợp các cặp id và productAttributeId trong mảng con để dễ dàng kiểm tra
                let childSet = new Set(
                  selectedItems.map(
                    (item: any) => `${item.id}-${item.productAttributeId}`
                  )
                );
                // Duyệt qua từng mục trong mảng cha và xóa các mục không có trong mảng con
                const newArrSelectedGroup = selectedGroup.slice();
                newArrSelectedGroup.forEach((parent: any) => {
                  parent.attributeOutputList.forEach((attributeOutput: any) => {
                    attributeOutput.productAttributeValue =
                      attributeOutput.productAttributeValue.filter(
                        (attributeValue: any) =>
                          childSet.has(
                            `${attributeValue.id}-${attributeValue.productAttributeId}`
                          )
                      );
                  });
                });
                navigation.navigate({
                  name: "ProductEditScreen" as never,
                  params: {
                    check: true,
                    attributeArr: selectedItems,
                    dropdownSelected: newArr3,
                    selectedGroupAttribute: newArrSelectedGroup,
                    isVariantInConfig: data.valueSwitch,
                  },
                } as never);
              } else {
                navigation.navigate({
                  name: "ProductEditScreen" as never,
                  params: {
                    check: true,
                    attributeArr: selectedItems,
                    dropdownSelected: newArr3,
                    selectedGroupAttribute: [],
                    isVariantInConfig: data.valueSwitch,
                  },
                } as never);
              }
              Dialog.hide();
            } else {
              const newArr = selectedItems.map((item: any) => {
                return item.idGroup;
              });
              const newArr1 = [...new Set(newArr)];
              const newArr2 = newArr1.map((items) => {
                const a = attributeData.filter((item: any) => item.value === items);
                return a;
              });
              const newArr3 = newArr2.flat();
              if (!data.valueSwitch) {
                // Tạo một tập hợp các cặp id và productAttributeId trong mảng con để dễ dàng kiểm tra
                let childSet = new Set(
                  selectedItems.map(
                    (item: any) => `${item.id}-${item.productAttributeId}`
                  )
                );
                // Duyệt qua từng mục trong mảng cha và xóa các mục không có trong mảng con
                const newArrSelectedGroup = selectedGroup.slice();
                newArrSelectedGroup.forEach((parent: any) => {
                  parent.attributeOutputList.forEach((attributeOutput: any) => {
                    attributeOutput.productAttributeValue =
                      attributeOutput.productAttributeValue.filter(
                        (attributeValue: any) =>
                          childSet.has(
                            `${attributeValue.id}-${attributeValue.productAttributeId}`
                          )
                      );
                  });
                });
                navigation.navigate({
                  name: "ProductCreateScreen" as never,
                  params: {
                    check: true,
                    attributeArr: selectedItems,
                    dropdownSelected: newArr3,
                    resetData: false,
                    selectedGroupAttribute: newArrSelectedGroup,
                    isVariantInConfig: data.valueSwitch,
                  },
                } as never);
              } else {
                navigation.navigate({
                  name: "ProductCreateScreen" as never,
                  params: {
                    check: true,
                    attributeArr: selectedItems,
                    dropdownSelected: newArr3,
                    resetData: false,
                    selectedGroupAttribute: [],
                    isVariantInConfig: data.valueSwitch,
                  },
                } as never);
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
    setArrSelect([]);
  };

  const onConfirmModal = async () => {
    const a = selectedItems.filter(
      (item: any) => item.productAttributeId !== idAttributeModal
    );
    setSelectedItems(a.concat(arrSelect));
    setArrSelect([]);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.ROOT}>
        <Header
          LeftIcon={Svgs.back}
          onLeftPress={() => navigation.goBack()}
          headerText={translate("productScreen.updateAttribute")}
          style={{ height: scaleHeight(52) }}
        />
        <View
          style={[
            styles.viewBody,
            { top: scaleHeight(52) + scaleHeight(paddingTop) },
          ]}
        >
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
          <ItemAttribute
            arrSelect={arrSelect}
            selectedGroup={selectedGroup}
            selectedItems={selectedItems}
            filteredData={filteredData}
            setIdAttributeModal={(item) => setIdAttributeModal(item)}
            setSelectedItems={(item) => setSelectedItems(item)}
            onCancelModal={() => onCancelModal()}
            onConfirmModal={() => onConfirmModal()}
            onPressCaret={(object, itemId, id) => onPressCaret(object, itemId, id)}
            handleItemSelect={(item) => handleItemSelect(item)}
            deleteLineAttribute={(item) => deleteLineAttribute(item)}
            screen="editAttribute"
          />
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
            onPress={methods.handleSubmit(onConfirm)}
          />
        </View>
      </View>
    </FormProvider>
  );
});