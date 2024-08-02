import React, { useCallback, useEffect, useLayoutEffect } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { useState } from "react";
import Modal from "react-native-modal";
import { Controller, useForm } from "react-hook-form";
import { useFocusEffect } from "@react-navigation/native";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { translate } from "../../../i18n";
import { Text } from "../../../../app-purchase/components";
import { Svgs } from "../../../../../assets/svgs";

const ROOT: ViewStyle = {
  borderRadius: 8,
  backgroundColor: colors.palette.aliceBlue,
  // backgroundColor: 'yellow',

  paddingVertical: scaleHeight(margin.margin_8),
  paddingHorizontal: scaleWidth(margin.margin_16),
};
const TEXTTITLE: TextStyle = {
  fontSize: fontSize.size12,
  fontWeight: "500",
  lineHeight: scaleHeight(14),
  color: colors.palette.dolphin,
};
const TEXTREQUIRED: TextStyle = {
  color: colors.palette.radicalRed,
  textAlignVertical: "top",
  fontSize: fontSize.size10,
  lineHeight: scaleHeight(12),
  marginLeft: scaleWidth(margin.margin_2),
};
const TEXTDATA: TextStyle = {
  fontWeight: "500",
  fontSize: fontSize.size16,
  lineHeight: scaleHeight(24),
  color: colors.palette.nero,
};
const TEXTHINT: TextStyle = {
  fontWeight: "500",
  fontSize: fontSize.size16,
  lineHeight: scaleHeight(24),
  color: colors.palette.dolphin,
};
const VIEWMODAL: ViewStyle = {
  // width: Dimensions.get('screen').width - 32,
  height: Dimensions.get("screen").height * 0.4,
  backgroundColor: colors.palette.neutral100,
  borderTopRightRadius: 8,
  borderTopLeftRadius: 8,
  paddingVertical: scaleHeight(padding.padding_12),
  paddingHorizontal: scaleWidth(padding.padding_16),
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
};
const TEXTLABELFLATLIST: TextStyle = {
  //fontWeight: '500',
  fontSize: fontSize.size14,
  lineHeight: scaleHeight(24),
  color: colors.palette.nero,
  marginVertical: scaleHeight(margin.margin_8),
};
const VIEWLINE: ViewStyle = {
  height: scaleHeight(1),
  width: "100%",
  backgroundColor: colors.palette.ghostWhite,
};

const RADIOBUTTON: ViewStyle = {
  width: scaleWidth(17),
  height: scaleHeight(18),
  borderRadius: 3,
  borderWidth: 1,
  borderColor: colors.veryLightGrey2,
  justifyContent: "center",
  alignItems: "center",
  marginRight: scaleWidth(6),
};

export const SelectUom = (props: any) => {
  const {
    titleText,
    titleTx,
    hintText,
    hintTx,
    disabled,
    arrData,
    onPressChoice,
    required,
    styleView,
    dataDefault,
    isSearch,
    isShowCheckBox,
    onLoadMore,
    checkUse,
    onPressNotUse,
    textStyle,
    styleViewDropdown,
    handleOnSubmitSearch,
    onChangeText,
    showModal,
    setShowModal,
  } = props;
  const _ = require("lodash");
  const [data, setData] = useState("");
  const [dataChoice, setDataChoice] = useState({});
  const [filteredData, setFilteredData] = useState(arrData);
  const [loading, setLoading] = useState(false);
  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  const handleSearch = (text: any) => {
    if (text) {
      const dataChoiceItem = arrData.filter((item: any) => item.text !== data);
      const newData = dataChoiceItem.filter((item: any) => {
        const itemData = item?.text?.toUpperCase();
        const textData = text?.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      const dataChoiceItem = arrData.filter((item: any) => item.text !== data);
      setFilteredData(dataChoiceItem);
    }
  };
  const loadMore = async () => {
    if (!loading && onLoadMore) {
      setLoading(true);
      await onLoadMore();
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      reset();
      clearErrors();
    }, [showModal])
  );

  useEffect(() => {
    setFilteredData(arrData);
  }, [arrData]);

  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => {
        setShowModal(false);
      }}
      style={{ margin: 0 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          setShowModal(false);
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "height" : "height"}
          keyboardVerticalOffset={0}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={VIEWMODAL}>
            {/* <Text text="chon ly do" /> */}
            {isSearch ? (
              <View
                style={{
                  flexDirection: "row",
                  borderWidth: 1,
                  borderColor: colors.cornflowerBlue,
                  borderRadius: 4,
                  paddingVertical: scaleHeight(5),
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      marginLeft: scaleWidth(8),
                    }}>
                    <Svgs.icon_searchBlack
                      width={scaleWidth(18)}
                      height={scaleHeight(18)}
                    />
                  </TouchableOpacity>
                  {/* <View style = {{width : 1 , height : scaleHeight(16) , backgroundColor : colors.navyBlue , marginLeft : scaleWidth(8)}}></View> */}
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
                        flex: 1,
                      }}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(text) => {
                        onChange(text);
                        handleSearch(text);
                      }}
                      multiline={true}
                    />
                  )}
                  defaultValue={""}
                  name="searchData"
                />
              </View>
            ) : null}
            <FlatList
              data={filteredData}
              style={{
                // flex: 1,
                marginTop: scaleHeight(margin.margin_10),
                marginBottom: scaleHeight(margin.margin_15),
              }}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              renderItem={({ item }: any) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: scaleWidth(5),
                      }}
                      onPress={() => {
                        setData(item.text);
                        onPressChoice(item);
                        setShowModal(false);
                        const dataChoiceItem = arrData.filter(
                          (i: any) => i.text !== item.text
                        );
                        // setFilteredData(dataChoiceItem);
                        // console.log(data , 'dsadasd')
                      }}>
                      {isShowCheckBox ? (
                        <View style={RADIOBUTTON}>
                          {/* {isSelected && <Images.icon_checkGreen width={scaleWidth(20)} height={scaleHeight(20)} />} */}
                          {data === item.text && <Svgs.icon_checkBox />}
                        </View>
                      ) : null}
                      <Text text={item.text} style={TEXTLABELFLATLIST} />
                    </TouchableOpacity>
                    <View style={VIEWLINE}></View>
                  </View>
                );
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
