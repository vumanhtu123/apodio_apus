import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextInput,
  Dimensions,
} from "react-native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Text } from "../../../components/text/text";
import { TxKeyPath, translate } from "../../../i18n";
import { Images } from "../../../../assets";
import Modal from "react-native-modal";
import { Button } from "../../../components";

export interface InputSelectProps {
  titleText?: string;
  titleTx?: TxKeyPath;

  hintText?: string;
  hintTx?: TxKeyPath;
  required?: boolean;
  styleView?: ViewStyle;

  arrData: {}[];
  onPressChoice?({}): void;
  onRemove?({}): void;
  loadMore?(): void;
  dataDefault?: string;
  multiple?: any;
  newData?: {};
  dataEdit?: {}[];
  disable?: boolean;
}
const ROOT: ViewStyle = {
  borderRadius: 8,
  backgroundColor: colors.palette.aliceBlue,
  paddingVertical: scaleHeight(margin.margin_8),
  paddingHorizontal: scaleWidth(margin.margin_16),
};
const DropdownModal = (props: InputSelectProps) => {
  const {
    titleText,
    titleTx,
    hintText,
    hintTx,
    arrData,
    onRemove,
    onPressChoice,
    loadMore,
    required,
    styleView,
    dataDefault,
    dataEdit,
    newData,
    disable,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const title = titleText || (titleTx && translate(titleTx)) || "";
  const hint = hintText || (hintTx && translate(hintTx)) || "";
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<{}[]>([]);

  useEffect(() => {
    setFilteredData(arrData);
    console.log("bugssss", arrData);
  }, [arrData]);

  useEffect(() => {
    console.log("--------newData222222--------", newData);
    if (newData !== undefined) {
      const arr = [newData]?.concat(selectedItems);
      setSelectedItems(arr);
      setSelectedItem(arr);
      const newArrData = [newData]?.concat(arrData);
      setFilteredData(newArrData);
      console.log("log multiselect");
    }
  }, [newData]);

  useEffect(() => {
    console.log("--------dataEdit--------", dataEdit);
    if (dataEdit !== undefined) {
      setSelectedItems(dataEdit);
      setSelectedItem(dataEdit);
    }
  }, [dataEdit]);

  const handleSearch = (text: any) => {
    setSearch(text);
    if (text) {
      const newData = arrData.filter((item: any) => {
        const itemData = item.label.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      setFilteredData(arrData);
    }
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
    onPressChoice(selectedItem);
    toggleModal();
  };

  // console.log("--------newData--------", newData);

  const renderItem = ({ item }: any) => {
    const isSelected = selectedItem.some(
      (selectedItem: { value: any }) => selectedItem.value === item.value
    );
    return (
      <View>
        <View style={{ height: scaleHeight(1), backgroundColor: "#E7EFFF" }} />
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleItemSelect(item)}>
          <View style={styles.radioButton}>
            {/* {isSelected && <Images.icon_checkGreen width={scaleWidth(20)} height={scaleHeight(20)} />} */}
            {isSelected && <Images.icon_checkBox />}
          </View>
          <Text style={[styles.itemText]}>{item.text}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const handleRemoveItem = (item: any) => {
    const updatedSelectedItems = selectedItems.filter(
      (selectedItem: { value: any }) => selectedItem.value !== item.value
    );
    setSelectedItems(updatedSelectedItems);
    onPressChoice(updatedSelectedItems);
    setSelectedItem(updatedSelectedItems);
  };
  return (
    <View style={[ROOT, styleView]}>
      <TouchableOpacity
        style={styles.dropdown}
        disabled={disable}
        onPress={toggleModal}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: scaleHeight(margin.margin_2),
            }}>
            <Text text={title} style={styles.textTitle} />
            {required === true ? (
              <Text text="*" style={styles.textRequired} />
            ) : null}
          </View>
          <View>
            {selectedItems.length > 0 ? (
              <View style={styles.selectedItemsContainer}>
                {selectedItems.map((item: any) => (
                  <View key={item.value} style={styles.selectedItem}>
                    <Text style={styles.selectedItemText}>{item?.text}</Text>
                    {disable === true ? null : (
                      <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                        <Images.ic_close
                          width={scaleWidth(14)}
                          height={scaleHeight(14)}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            ) : (
              <Text text={hint} style={styles.textHint} />
            )}
          </View>
        </View>
        {disable === true ? null : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Images.dropDown />
          </View>
        )}
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        style={{ margin: 0 }}>
        <View style={styles.modalContainer}>
          <Text text={title} style={styles.textTitleModal} />
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item: any) => item.value}
            onEndReached={loadMore}
            // keyExtractor={(item) => item.toString()}
          />
          <View style={styles.viewModalButton}>
            <Button
              onPress={() => {
                toggleModal();
              }}
              tx={"productScreen.cancel"}
              style={styles.buttonCancel}
              textStyle={styles.textCancel}
            />
            <Button
              tx={"productScreen.BtnNotificationAccept"}
              style={styles.buttonAccept}
              textStyle={styles.textAccept}
              onPress={(item) => onConfirm(item)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    // backgroundColor: '#f2f2f2',
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    // borderRadius: 5,
    flexDirection: "row",
  },
  dropdownText: {
    fontSize: fontSize.size12,
  },
  modalContainer: {
    height: "50%",
    backgroundColor: colors.palette.neutral100,
    borderRadius: 8,
    paddingVertical: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_16),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // marginHorizontal : 15
  },
  item: {
    paddingVertical: scaleHeight(10),
    flexDirection: "row",
    paddingHorizontal: scaleWidth(3),
    alignItems: "center",
  },
  itemText: {
    fontSize: fontSize.size14,
  },
  selectedItemText: {
    color: "#747475",
    marginRight: scaleWidth(4),
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textTitle: {
    fontSize: fontSize.size12,
    fontWeight: "500",
    lineHeight: scaleHeight(14),
    color: colors.palette.dolphin,
  },
  textRequired: {
    color: colors.palette.radicalRed,
    textAlignVertical: "top",
    fontSize: fontSize.size10,
    lineHeight: scaleHeight(12),
    marginLeft: scaleWidth(margin.margin_2),
  },
  textHint: {
    fontWeight: "500",
    fontSize: fontSize.size16,
    lineHeight: scaleHeight(24),
    color: colors.palette.dolphin,
  },
  selectedItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: "#DFE0EB",
    // backgroundColor: colors.palette.aliceBlue,
    borderRadius: 4,
    paddingHorizontal: scaleWidth(9),
    paddingVertical: scaleHeight(6),
    marginRight: scaleWidth(8),
    marginBottom: scaleHeight(4),
    flexDirection: "row",
    // justifyContent : 'center',
    alignItems: "center",
  },
  // selectedItemText: {
  //     fontSize: fontSize.size14,
  //     color: colors.palette.dodgerBlue,
  // },
  selectedItemSeparator: {
    fontSize: fontSize.size14,
    color: colors.palette.dodgerBlue,
  },
  radioButton: {
    width: scaleWidth(16),
    height: scaleHeight(16),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(6),
  },
  textTitleModal: {
    marginVertical: scaleHeight(18),
    marginLeft: scaleWidth(9),
    fontWeight: "700",
    fontSize: fontSize.size14,
    color: colors.palette.nero,
  },
  viewModalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(margin.margin_15),
    marginTop: scaleHeight(10),
  },
  buttonCancel: {
    height: scaleHeight(48),
    backgroundColor: colors.palette.neutral100,
    borderWidth: 1,
    borderColor: colors.palette.veryLightGrey,
    width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
    borderRadius: 8,
  },
  textCancel: {
    color: colors.palette.dolphin,
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
  buttonAccept: {
    height: scaleHeight(48),
    backgroundColor: colors.palette.navyBlue,
    width: (Dimensions.get("screen").width - scaleWidth(32)) * 0.48,
    borderRadius: 8,
  },
  textAccept: {
    color: colors.palette.neutral100,
    fontWeight: "700",
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
  },
});

export default DropdownModal;
