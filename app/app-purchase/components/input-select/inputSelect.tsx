import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle
} from "react-native";
import Modal from "react-native-modal";
import { Svgs } from "../../../../assets/svgs";
import { translate } from "../../i18n";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../theme";
import { Text } from "../text/text";
import { InputSelectProps } from "./inputSelect.props";
import { CustomModal } from "../custom-modal";
import { ScrollView } from "react-native-gesture-handler";

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
  height: scaleHeight(350),
  backgroundColor: colors.palette.neutral100,
  borderTopRightRadius: 8,
  borderTopLeftRadius: 8,
  // paddingVertical: scaleHeight(padding.padding_12),
  // paddingHorizontal: scaleWidth(padding.padding_16),
  // position: "absolute",
  // bottom: 0,
  // left: 0,
  // right: 0,
};
const TEXTLABELFLATLIST: TextStyle = {
  //fontWeight: '500',
  fontSize: fontSize.size14,
  lineHeight: scaleHeight(24),
  color: colors.palette.dolphin,
  marginVertical: scaleHeight(margin.margin_8),
};
const TEXTLABELHL: TextStyle = {
  fontWeight: '600',
  fontSize: fontSize.size14,
  lineHeight: scaleHeight(24),
  color: colors.palette.black,
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
    isShowCheckBox,
    onLoadMore,
    checkUse,
    onPressNotUse,
    textStyle,
    styleViewDropdown,
    size,
    handleOnSubmitSearch,
    onRefresh,
    isRefreshing,
    setIsRefreshing
  } = props;
  const title = titleText || (titleTx && translate(titleTx)) || "";
  const hint = hintText || (hintTx && translate(hintTx)) || "";
  const _ = require("lodash");
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [filteredData, setFilteredData] = useState(arrData);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { control, reset, formState: { errors }, clearErrors, watch } = useForm();
  const searchValue = watch('searchData');
  const handleSearch = (text: any) => {
    if (text) {
      const dataChoiceItem = arrData.filter((item: any) => item.label !== data);
      const newData = dataChoiceItem.filter((item: any) => {
        const itemData = item.label.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
    } else {
      const dataChoiceItem = arrData.filter((item: any) => item.label !== data);
      setFilteredData(dataChoiceItem);
    }
  };
  const onSubmitSearch = async () => {
    // setShowLoading(true);
    setFilteredData([])
    await handleOnSubmitSearch(searchValue)
      .then((result: any) => {
        setShowLoading(false);
      }).catch((error: any) => {
        setShowLoading(false);
      });
  }
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
  useFocusEffect(
    useCallback(() => {
      reset();
      clearErrors();
    }, [showModal])
  )
  const highlightText = (text: string, highlight: string) => {
    if (!highlight?.trim()) {
      return <Text style={TEXTLABELFLATLIST}>{text}</Text>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <Text key={i} style={TEXTLABELHL}>{part}</Text>
          ) : (
            <Text style={TEXTLABELFLATLIST} key={i}>{part}</Text>
          )
        )}
      </>
    );
  };
  useEffect(() => {
    setFilteredData(arrData);
  }, [arrData]);
  const EmptyListComponent = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {arrData.length < 1 && (
        <Text tx={'common.emptyList'} style={TEXTLABELHL} />
      )}
    </View>
  );
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
            style={
              styleViewDropdown ?? {
                justifyContent: "center",
                alignItems: "center",
              }
            }>
            <Svgs.dropDown />
          </View>
        )}
      </TouchableOpacity>
      <CustomModal
        isVisible={showModal}
        setIsVisible={() => setShowModal(!showModal)}
        isHideKeyBoards={showModal}
        isVisibleLoading={showLoading}
      >
        <View style={VIEWMODAL}>
          {isSearch ? (
            <View style={{ flexDirection: "row", borderWidth: 1, borderColor: '#53A0F6', borderRadius: 4, paddingVertical: scaleHeight(5) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ justifyContent: 'center', marginLeft: scaleWidth(8) }}>
                  <Svgs.icon_searchBlack width={scaleWidth(18)} height={scaleHeight(18)} />
                </TouchableOpacity>
                {/* <View style = {{width : 1 , height : scaleHeight(16) , backgroundColor : '#0078D4' , marginLeft : scaleWidth(8)}}></View> */}
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
          {searchValue && size > 1 ? (
            <View style={{ paddingHorizontal: scaleWidth(5) }}>
              <TouchableOpacity onPress={onSubmitSearch} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ justifyContent: 'center', marginRight: scaleWidth(2) }}>
                  <Svgs.icon_searchBlack width={scaleWidth(14)} height={scaleHeight(14)} />
                </View>
                <Text style={TEXTLABELHL}>{searchValue}</Text>
              </TouchableOpacity>
              <View style={VIEWLINE}></View>
            </View>
          ) : null}
          <FlatList
            data={filteredData}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshItem}
                title="ok"
              />
            }
            style={{
              marginTop: scaleHeight(margin.margin_10),
              marginBottom: scaleHeight(margin.margin_15),
              // flex: 1
            }}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            ListEmptyComponent={EmptyListComponent}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: any) => {
              return (
                <View>
                  <TouchableOpacity
                    style={{ flexDirection: 'row', paddingHorizontal: scaleWidth(5) }}
                    onPress={() => {
                      setData(item.label);
                      onPressChoice(item);
                      setShowModal(false);
                      const dataChoiceItem = arrData.filter(
                        (i) => i.label !== item.label
                      );
                      setFilteredData(dataChoiceItem);
                    }}>
                    {isShowCheckBox ? (<View style={styles.radioButton}>
                      {data === item.label && <Svgs.icon_checkBox />}
                    </View>) : null}
                    {highlightText(item.label, searchValue)}
                  </TouchableOpacity>
                  <View style={VIEWLINE}></View>
                </View>
              );
            }}
          />
        </View>
      </CustomModal>
    </View>
  );
}
const styles = StyleSheet.create({
  radioButton: {
    width: scaleWidth(17),
    height: scaleHeight(18),
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.veryLightGrey2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: scaleWidth(6),
  },
})