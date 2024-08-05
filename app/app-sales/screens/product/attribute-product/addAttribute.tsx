import { observer } from "mobx-react-lite";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Button, Header, Switch, Text } from "../../../../app-purchase/components";
import { Svgs } from "../../../../../assets/svgs";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  colors,
  scaleHeight,
} from "../../../theme";
import DropdownModal from "../component/multiSelect";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useStores } from "../../../models";
import { translate } from "../../../i18n";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
} from "../../../../app-purchase/components/dialog-notification";
import { FormProvider, useForm } from "react-hook-form";
import { ItemAttribute } from "./itemAttribute";
import { styles } from "./styles";

export const AddAttribute: FC = observer(function AddAttribute(props) {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const route = useRoute();
  const idNewAttribute = route?.params as {data: any};
  const editScreen = route?.params as {editScreen: any};
  const [attributeData, setAttributeData] = useState<{}[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<{}[]>([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [idAttributeCategory, setIdAttributeCategory] = useState<{}[]>([]);
  const [arrData, setArrData] = useState([]);
  const [filteredData, setFilteredData] = useState(arrData);
  const [arrSelect, setArrSelect] = useState([]);
  const [idAttributeModal, setIdAttributeModal] = useState("");
  const [inputText, setInputText] = useState<any[]>([]);
  const [dataEditDropdown, setDataEditDropdown] = useState<{}[]>([]);
  const { attributeStore } = useStores();
  const page = useRef(0);
  const methods = useForm({ defaultValues: { valueSwitch: true } })

  const getListAttribute = async () => {
    const response = await attributeStore.getListAttribute(
      page.current,
      50,
      true
    );
    if (response && response.kind === "ok") {
      if (page.current === 0) {
        const newArr = response.response.data.content;
        const formatArr = newArr.map((item: any) => ({
          text: item.name,
          value: item.id,
        }));
        page.current += 1;
        setAttributeData(formatArr);
      } else {
        const newArr = response.response.data.content;
        const formatArr = newArr.map((item: any) => ({
          text: item.name,
          value: item.id,
        }));
        const endArr = attributeData.concat(formatArr);
        setAttributeData(endArr);
        page.current += 1;
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

      //setAttrDataSelected(response.response.data)
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
  }, []);

  useEffect(() => {
    if (idAttributeCategory.length > 0) {
      getListDataAttribute();
    }
  }, [idAttributeCategory]);

  useEffect(() => {
    if (idNewAttribute !== undefined) {
      const newArr = [idNewAttribute?.data?.value].concat(idAttributeCategory);
      const arr = [idNewAttribute?.data].concat(attributeData);
      setIdAttributeCategory(newArr);
      setAttributeData(arr);
      getListDataAttribute();
    }
  }, [idNewAttribute]);

  const deleteLineAttribute = useCallback((items: any) => {
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
      (item) => item.attributeOutputList?.length !== 0
    );
    const newArr2 = selectedItems.filter(
      (item: any) => item.productAttributeId !== items.item.id
    );
    const newArr3 = newArr1.map((item) => {
      return { text: item.name, value: item.id };
    });
    setDataEditDropdown(newArr3);
    setSelectedItems(newArr2);
    setSelectedGroup(newArr1);
  }, [dataEditDropdown, selectedItems, selectedGroup])

  const handleSelect = (items: any) => {
    const newArr = items.map((item: any) => item.value);
    const setNew = new Set(newArr);
    const newIdAttribute = selectedGroup.map((items: any) => {
      return items.id;
    });
    const setOld = new Set(newIdAttribute);
    const onlyInOld = newIdAttribute.filter((element) => !setNew.has(element));

    const onlyInNew = newArr.filter((element: any) => !setOld.has(element));
    const newArr2 = newArr?.map((item: any) => {
      const a = selectedItems.map((items: { idGroup: any }) => {
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
    // setDropdownSelected(items);
    if (newArr.length === 0) {
      setSelectedGroup([]);
    }
    setIdAttributeCategory(onlyInNew);
  };

  const onPressCaret = (item: any, id: any, idGroup: any) => {
    const a = selectedItems.filter(
      (item: any) => item.productAttributeId === id
    );
    const newArray = item.map((items: any) => ({ ...items, idGroup: idGroup }));
    setArrData(newArray);
    setFilteredData(newArray);
    setArrSelect(a);
  };

  const handleItemSelect = useCallback((item: any) => {
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
  }, [arrSelect])

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
      const newArr2 = selectedItems.map((items: any) => {
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
        if (editScreen?.editScreen === true) {
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
              name: "ProductEditScreen",
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
              name: "ProductEditScreen",
              params: {
                check: true,
                attributeArr: selectedItems,
                dropdownSelected: newArr3,
                selectedGroupAttribute: [],
                isVariantInConfig: data.valueSwitch,
              },
            } as never);
          }
        } else {
          const newArr = selectedItems.map((item: any) => {
            return item.idGroup;
          });
          const newArr1 = [...new Set(newArr)];
          const newArr2 = newArr1.map((items: any) => {
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
              name: "ProductCreateScreen",
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
              name: "ProductCreateScreen",
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
        }
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
        textBody: translate("txtDialog.content_exit_dialog"),
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

  const onCancelModal = useCallback(() => {
    setArrSelect([]);
  }, [arrSelect])

  const onConfirmModal = useCallback(async () => {
    const a = selectedItems.filter(
      (item: any) => item.productAttributeId !== idAttributeModal
    );

    setSelectedItems(a.concat(arrSelect));
    setArrSelect([]);
  }, [selectedItems, arrSelect])

  return (
    <FormProvider {...methods}>
      <View style={styles.ROOT}>
        <Header
          LeftIcon={Svgs.back}
          onLeftPress={() => navigation.goBack()}
          headerTx="addAttribute.header"
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
            titleTx="addAttribute.title"
            hintTx="addAttribute.hint"
            newData={idNewAttribute?.data}
            dataEdit={dataEditDropdown}
            loadMore={() => getListAttribute()}
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
            screen="addAttribute"
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

