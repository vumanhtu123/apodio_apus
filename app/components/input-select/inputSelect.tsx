import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { Svgs } from "../../../assets/svgs";
import { translate } from "../../i18n";
import {
  colors,
  fontSize,
  margin,
  scaleHeight,
  scaleWidth,
} from "../theme";
import { Text } from "../text/text";
import { InputSelectProps } from "./inputSelect.props";
import { CustomModal } from "../custom-modal";

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
  // maxHeight: Dimensions.get('screen').height * 0.4,
  // minHeight: Dimensions.get('screen').height * 0.3,
  // // height: scaleHeight(350),
  // width: '100%',
  // backgroundColor: colors.palette.neutral100,
  // borderTopLeftRadius: margin.border_top_left_radius,
  // borderTopRightRadius: margin.border_top_right_radius,
  // paddingVertical: scaleWidth(margin.margin_16),
  // paddingHorizontal: scaleHeight(margin.margin_16),
  // position: 'absolute', bottom: 0,
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
    setIsRefreshing,
    normalInputSelect,
    headerTxModal
  } = props;
  const title = titleText || (titleTx && translate(titleTx)) || "";
  const hint = hintText || (hintTx && translate(hintTx)) || "";
  const _ = require("lodash");
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [filteredData, setFilteredData] = useState(arrData);
  // const [isRefreshing, setIsRefreshing] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { control, reset, formState: { errors }, clearErrors, watch } = useForm();
  const searchValue = watch('searchData');
  const handleSearch = (text: any) => {
    if (text) {
      if (normalInputSelect) {
        const newData = arrData.filter((item: any) => {
          const itemData = item.label.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
      } else {
        const dataChoiceItem = arrData.filter((item: any) => item.label !== data);
        const newData = dataChoiceItem.filter((item: any) => {
          const itemData = item.label.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredData(newData);
      }
    } else {
      if (normalInputSelect) {
        setFilteredData(arrData);
      } else {
        const dataChoiceItem = arrData.filter((item: any) => item.label !== data);
        setFilteredData(dataChoiceItem);
      }
    }
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
  useEffect(() => {
    if (selectedCategory && !normalInputSelect) {
      const filteredResult = arrData.filter((item: any) => item.id !== selectedCategory);
      setFilteredData(filteredResult);
    } else {
      setFilteredData(arrData);
    }
  }, [arrData]);
  useFocusEffect(
    useCallback(() => {
      reset();
      clearErrors();
    }, [showModal])
  )

  const highlightText = (text: string, highlight: string, id: number) => {
    if (!highlight?.trim()) {
      return <Text style={[TEXTLABELFLATLIST, { color: selectedCategory === id ? 'white' : colors.dolphin }]}>{text}</Text>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          regex.test(part) ? (
            <Text key={i} style={TEXTLABELHL}>{part}</Text>
          ) : (
            <Text style={[TEXTLABELFLATLIST, { color: selectedCategory === id ? 'white' : colors.dolphin }]} key={i}>{part}</Text>
          )
        )}
      </>
    );
  };
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
        setIsVisible={() => { setShowModal(false) }}
        isHideKeyBoards={showModal}
        isVisibleLoading={showLoading}
      >
        {headerTxModal ? (
          <View>
            <Text style={{
              textAlign: 'center',
              width: scaleWidth(68),
              height: scaleHeight(5),
              backgroundColor: colors.veryLightGrey1,
              borderRadius: 8,
              alignSelf: 'center',
              marginBottom: scaleHeight(10)
            }} />
            <Text
              tx={headerTxModal}
              style={{
                fontSize: fontSize.size14,
                fontWeight: '700',
                color: 'black',
                marginLeft: scaleWidth(9)
              }}></Text>
            <View style={{
              height: 1,
              backgroundColor: colors.solitude2,
              marginBottom: scaleHeight(10),
              marginTop: scaleHeight(14),
            }} />
          </View>
        ) : null}
        <View style={VIEWMODAL}>
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
                <Text style={TEXTLABELHL}>{searchValue}</Text>
              </TouchableOpacity>
              <View style={VIEWLINE}></View>
            </View>
          ) : null}
          <FlatList
            data={filteredData}
            refreshControl={onRefresh ? (
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={refreshItem}
                title="ok"
              />
            ) : undefined
            }
            style={{
              marginTop: searchValue ? 0 : scaleHeight(margin.margin_10),
              marginBottom: scaleHeight(margin.margin_15),
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
                    style={{
                      flexDirection: 'row', paddingHorizontal: scaleWidth(5),
                      backgroundColor:
                        selectedCategory === item.id
                          ? colors.palette.navyBlue
                          : colors.palette.neutral100,
                    }}
                    onPress={() => {
                      setData(item.label);
                      onPressChoice(item);
                      setShowModal(false);
                      setSelectedCategory(item.id)
                      if (!normalInputSelect) {
                        const dataChoiceItem = arrData.filter(
                          (i: any) => i.label !== item.label
                        );
                        setFilteredData(dataChoiceItem);
                      }
                    }}>
                    {isShowCheckBox ? (<View style={styles.radioButton}>
                      {data === item.label && <Svgs.icon_checkBox />}
                    </View>) : null}
                    {highlightText(item.label, searchValue, item.id)}
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