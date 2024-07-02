import React, { useEffect, useLayoutEffect } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextBase,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { InputSelectProps } from "./inputSelect.props";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../theme";
import { translate } from "../../i18n";
import { Text } from "../text/text";
import { useState } from "react";
import { Images } from "../../../assets/index";
import Modal from "react-native-modal";

const ROOT: ViewStyle = {
  borderRadius: 8,
  backgroundColor: colors.palette.aliceBlue,
  // backgroundColor : 'yellow',

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

export function InputSelect(props: InputSelectProps) {
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
    onLoadMore,
    checkUse,
    onPressNotUse,
    textStyle,
    handleOnSubmitSearch,
    onChangeText,
  } = props;
  const title = titleText || (titleTx && translate(titleTx)) || "";
  const hint = hintText || (hintTx && translate(hintTx)) || "";
  const _ = require("lodash");
  const [data, setData] = useState("");
  const [dataChoice, setDataChoice] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState(arrData);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSearch = (text: any) => {
    // onChangeText(text)
    setSearch(text);
    if (text) {
      const dataChoiceItem = arrData.filter((item) => item.label !== data);
      const newData = dataChoiceItem.filter((item) => {
        const itemData = item.label.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      const dataChoiceItem = arrData.filter((item) => item.label !== data);
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
  useEffect(() => {
    if (
      dataDefault !== undefined &&
      dataDefault !== null &&
      dataDefault !== ""
    ) {
      //   console.log("dataDefault---------------------------", dataDefault);
      //   const dataChoiceItem = arrData.filter(
      //     (item) => item.label !== dataDefault
      //   );
      //   setFilteredData(dataChoiceItem);
      // } else {
      setFilteredData(arrData);
    }
  }, [arrData]);

  return (
    <View style={[ROOT, styleView]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => {
          if (checkUse === true) {
            onPressNotUse();
          } else {
            setShowModal(true);
          }
        }}
        style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: scaleHeight(margin.margin_2),
            }}>
            <Text text={title} style={TEXTTITLE} />
            {required === true ? <Text text="*" style={TEXTREQUIRED} /> : null}
          </View>
          <View>
            {dataDefault !== "" && dataDefault !== null ? (
              // <Text text={data || dataDefault} style={TEXTDATA} />
              <Text text={dataDefault} style={textStyle ?? TEXTDATA} />
            ) : (
              <Text text={hint} style={TEXTHINT} />
            )}
          </View>
        </View>
        {disabled === true ? null : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}>
            <Images.dropDown />
          </View>
        )}
      </TouchableOpacity>
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
                <TextInput
                  style={{ fontSize: 16, fontWeight: "400" }}
                  onChangeText={(text) => handleSearch(text)}
                  value={search}
                  placeholder="Tìm kiếm..."
                  // enterKeyHint="search"
                  // onSubmitEditing={handleOnSubmitSearch}
                  // enablesReturnKeyAutomatically
                />
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
                renderItem={({ item }) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          setData(item.label);
                          onPressChoice(item);
                          setShowModal(false);
                          const dataChoiceItem = arrData.filter(
                            (i) => i.label !== item.label
                          );
                          setFilteredData(dataChoiceItem);
                        }}>
                        <Text text={item.label} style={TEXTLABELFLATLIST} />
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
    </View>
  );
}
