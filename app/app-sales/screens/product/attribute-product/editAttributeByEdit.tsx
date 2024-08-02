import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Header } from "../../../../app-purchase/components";
import { Svgs } from "../../../../../assets/svgs";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
} from "../../../../app-purchase/components/dialog-notification";
import { ItemAttribute } from "./itemAttribute";
import { FormProvider, useForm } from "react-hook-form";
import { styles } from "./styles";

export const EditAttributeByEdit: FC = observer(function EditAttributeByEdit(
  props
) {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const route = useRoute();
  const { dataAttribute, dropdownSelected, constDataAttribute, hasVariantInConfig }: any =
    route?.params;
  const methods = useForm()

  const [attributeData, setAttributeData] = useState<{}[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<{}[]>([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [idAttributeCategory, setIdAttributeCategory] = useState([]);
  const [arrData, setArrData] = useState([]);
  const [filteredData, setFilteredData] = useState(arrData);
  const [arrSelect, setArrSelect] = useState([]);
  const [arrSelectDrop, setArrSelectDrop] = useState([]);
  const [idAttributeModal, setIdAttributeModal] = useState("");
  const [inputText, setInputText] = useState<{}[]>([]);
  const [page, setPage] = useState(0);
  const { attributeStore } = useStores();

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
      // setInputText(newArr)
    } else {
      console.error("Failed to fetch categories:", response);
    }
  };

  useEffect(() => {
    getListAttribute();
  }, [page]);

  useEffect(() => {
    if (idAttributeCategory.length > 0) {
      getListDataAttribute();
    }
  }, [idAttributeCategory]);

  useEffect(() => {
    if (dataAttribute !== undefined) {
      const newArr = dropdownSelected.map((item: { value: any }) => {
        return item.value;
      });
      const newArrData = constDataAttribute.map((items: any) => {
        return { ...items, isUsing: true };
      });
      const newArrData1 = dataAttribute.map((items: any) => {
        return { ...items, isUsing: false };
      });
      const bMap = new Map(
        newArrData.map((item: any) => [
          `${item.value}-${item.productAttributeId}`,
          item,
        ])
      );

      const newArr1 = newArrData1.map((item: any) => {
        const key = `${item.value}-${item.productAttributeId}`;
        return bMap.has(key) ? bMap.get(key) : item;
      });
      setIdAttributeCategory(newArr);
      setSelectedItems(newArr1);
      setArrSelectDrop(dropdownSelected);
    }
  }, [dropdownSelected]);

  const onPressCaret = (item: any, id: any, idGroup: any) => {
    const a = selectedItems.filter((item: any) => item.productAttributeId === id);
    const newArray = item.map((items: any) => ({
      ...items,
      idGroup: idGroup,
      isUsing: false,
    }));
    const bMap = new Map(
      a.map((item: any) => [`${item.value}-${item.productAttributeId}`, item])
    );

    const newArr1 = newArray.map((item: any) => {
      const key = `${item.value}-${item.productAttributeId}`;
      return bMap.has(key) ? bMap.get(key) : item;
    });
    setArrData(newArr1);
    setFilteredData(newArr1);
    setArrSelect(a);
  };

  const handleItemSelect = (item: any) => {
    if (item.isUsing === true) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.cannot_be_deselected"),
      });
    } else {
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
    }
  };

  const onConfirm = () => {
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: translate("txtDialog.txt_title_dialog"),
      textBody: translate("txtDialog.attribute_deletion_warning"),
      button: translate("common.cancel"),
      button2: translate("common.ok"),
      closeOnOverlayTap: false,
      onPressButton: () => {
        if (hasVariantInConfig === false) {
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
            name: "ProductEditScreen" as never, params: {
              check: true,
              attributeArr: selectedItems,
              dropdownSelected: arrSelectDrop,
              selectedGroupAttribute: newArrSelectedGroup,
              isVariantInConfig: hasVariantInConfig
            }
          } as never);
          Dialog.hide()
        } else {
          navigation.navigate({
            name: "ProductEditScreen" as never, params: {
              check: true,
              attributeArr: selectedItems,
              dropdownSelected: arrSelectDrop,
              selectedGroupAttribute: [],
              isVariantInConfig: hasVariantInConfig
            }
          } as never);
          Dialog.hide()
        }
      },
    });
  };

  const onCancel = () => {
    if (selectedItems.length === 0) {
      navigation.goBack();
    } else {
      Dialog.show({
        type: ALERT_TYPE.WARNING,
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
          headerTx="editAttribute.headerText"
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
            titleTx="addAttribute.title"
            hintText="addAttribute.selectAnAttributeGroup"

            dataEdit={dropdownSelected}
            disable={true}
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
            deleteLineAttribute={() => console.log('')}
            screen="editAttributeByEdit"
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
            onPress={() => onConfirm()}
          />
        </View>
      </View>
    </FormProvider>
  );
});