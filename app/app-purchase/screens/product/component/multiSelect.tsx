import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextInput,
  Dimensions,
  RefreshControl,
} from "react-native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { Text } from "../../../../components/text/text";
import { TxKeyPath, translate } from "../../../../i18n";
import { Svgs } from "../../../../../assets/svgs";
import Modal from "react-native-modal";
import { Button } from "../../../../components";
import { Controller, useForm } from "react-hook-form";
import { CustomModal } from "../../../../components/custom-modal";

export interface InputSelectProps {
  titleText?: string;
  titleTx?: TxKeyPath;

  hintText?: string;
  hintTx?: TxKeyPath;
  required?: boolean;
  styleView?: ViewStyle;

  arrData: {}[];
  onPressChoice?({ }): void;
  onRemove?({ }): void;
  loadMore?(): void;
  dataDefault?: string;
  multiple?: any;
  newData?: {};
  dataEdit?: {}[];
  disable?: boolean;
  isSearch?: boolean;
  onRefresh?: any
  isRefreshing?: any;
  setIsRefreshing?: any;
  handleOnSubmitSearch?: any
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
    isSearch,
    onRefresh,
    isRefreshing,
    setIsRefreshing,
    handleOnSubmitSearch
  } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [selectedItem, setSelectedItem] = useState<any>([]);
  const title = titleText || (titleTx && translate(titleTx)) || "";
  const hint = hintText || (hintTx && translate(hintTx)) || "";
  const { control, reset, formState: { errors }, clearErrors, watch } = useForm();
  const searchValue = watch('searchData');
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [filteredData, setFilteredData] = useState<{}[]>([]);
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    setFilteredData(arrData);
  }, [arrData]);
  useEffect(() => {
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
    if (text) {
      const newData = arrData.filter((item: any) => {
        const itemData = item?.text?.toUpperCase();
        const textData = text.toUpperCase();
        return itemData?.indexOf(textData) > -1;
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
  const refreshItem = async () => {
    setIsRefreshing(true)
    setFilteredData([])
    reset({ searchData: '' });
    await onRefresh()
      .then((result: any) => {
        setShowLoading(false);
      }).catch((error: any) => {
        setShowLoading(false);
      });
    setIsRefreshing(false)
  }
  const onConfirm = () => {
    setSelectedItems(selectedItem);
    onPressChoice!(selectedItem);
    toggleModal();
  };
  const renderItem = ({ item }: any) => {
    const isSelected = selectedItem.some(
      (selectedItem: { value: any }) => selectedItem.value === item.value
    );
    return (
      <View style={{}}>
        <View style={{ height: scaleHeight(1), backgroundColor: colors.solitude2 }} />
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleItemSelect(item)}>
          <View style={styles.radioButton}>
            {/* {isSelected && <Images.icon_checkGreen width={scaleWidth(20)} height={scaleHeight(20)} />} */}
            {isSelected && <Svgs.icon_checkBox />}
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
    onPressChoice!(updatedSelectedItems);
    setSelectedItem(updatedSelectedItems);
  };
  const onSubmitSearch = async () => {
    setShowLoading(true);
    setFilteredData([]);
    try {
      await handleOnSubmitSearch(searchValue);
    } catch (error) {
      setShowLoading(false);
    } finally {
      setShowLoading(false);
    }
  }
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
                        <Svgs.ic_close
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
            <Svgs.dropDown />
          </View>
        )}
      </TouchableOpacity>
      <CustomModal
        isVisible={modalVisible}
        setIsVisible={() => { setModalVisible(false) }}
        isHideKeyBoards={modalVisible}
        isVisibleLoading={showLoading}
      >
        <Text text={title} style={styles.textTitleModal} />
        {isSearch ? (
          <View style={{ flexDirection: "row", borderWidth: 1, borderColor: '#53A0F6', borderRadius: 4, paddingVertical: scaleHeight(5) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity style={{ justifyContent: 'center', marginLeft: scaleWidth(8) }}>
                <Svgs.icon_searchBlack width={scaleWidth(18)} height={scaleHeight(18)} />
              </TouchableOpacity>
            </View>
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  placeholder="Tìm kiếm..."
                  style={{
                    fontSize: fontSize.size16,
                    fontWeight: "400",
                    paddingVertical: 0,
                    flex: 1
                  }}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text)
                    handleSearch(text)
                  }}
                  multiline={true}
                />)}
              defaultValue={''}
              name='searchData'
            />
          </View>
        ) : null}
        {searchValue ? (
          <View style={{}}>
            <TouchableOpacity onPress={onSubmitSearch} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', marginRight: scaleWidth(2) }}>
                <Svgs.icon_searchBlack width={scaleWidth(14)} height={scaleHeight(14)} />
              </View>
              <Text style={styles.textLabel}>{searchValue}</Text>
            </TouchableOpacity>
            <View style={styles.viewLine}></View>
          </View>
        ) : null}
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          refreshControl={onRefresh ? (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshItem}
              title="ok"
            />
          ) : undefined
          }
          keyExtractor={(item: any) => item.value}
          onEndReached={loadMore}
        // style={{ height: scaleHeight(200) }}
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
            onPress={() => onConfirm()}
          />
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    // backgroundColor: colors.gray,
    // paddingVertical: 10,
    // paddingHorizontal: 15,
    // borderRadius: 5,
    flexDirection: "row",
  },
  dropdownText: {
    fontSize: fontSize.size12,
  },
  modalContainer: {
    // height: "50%",
    // backgroundColor: colors.palette.neutral100,
    // borderRadius: 8,
    // paddingVertical: scaleHeight(padding.padding_12),
    // paddingHorizontal: scaleWidth(padding.padding_16),
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
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
    color: colors.dolphin,
    marginRight: scaleWidth(4),
    fontSize: fontSize.size12,
  },
  closeButton: {
    backgroundColor: colors.dodgerBlue,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: colors.white,
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
    borderColor: colors.quartz,
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
    borderColor: colors.veryLightGrey2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(6),
  },
  textTitleModal: {
    marginVertical: scaleHeight(10),
    marginLeft: scaleWidth(9),
    fontWeight: "700",
    fontSize: fontSize.size14,
    color: colors.palette.nero,
  },
  viewModalButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: scaleHeight(margin.margin_15),
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
  textLabel: {
    fontWeight: '600',
    fontSize: fontSize.size14,
    lineHeight: scaleHeight(24),
    color: colors.palette.black,
    marginVertical: scaleHeight(margin.margin_8),
  },
  viewLine: {
    height: scaleHeight(1),
    width: "100%",
    backgroundColor: colors.palette.ghostWhite,
  }
});

export default DropdownModal;
