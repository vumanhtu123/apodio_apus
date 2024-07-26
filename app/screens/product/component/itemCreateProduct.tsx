import { Observer, observer } from 'mobx-react-lite';
import { FC, memo, useEffect, useState } from 'react';
import React, { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, fontSize, scaleHeight, scaleWidth } from '../../../theme';
import { Switch, Text, TextField } from '../../../components';
import { InputSelect } from '../../../components/input-select/inputSelect';
import DropdownModal from './multiSelect';
import { Controller, useFormContext } from 'react-hook-form';
import { translate } from '../../../i18n';
import { useStores } from '../../../models';
import { Images } from '../../../../assets';
import { addCommas, convertRetailPrice, convertWholesalePrice, formatCurrency, removeNonNumeric } from '../../../utils/validate';
import PriceModal from './modal-price';

interface ItemMoreInfo {
  defaultTags: {}[];
}
interface ItemGroupPrice {
  retailPrice?: {}[];
  wholesalePrice?: {}[];
  listPrice?: any;
  costPrice?: any;
}

export const ItemMoreInformation = memo(
  function ItemMoreInformation(props: ItemMoreInfo) {
    const { control } = useFormContext()
    const { productStore, categoryStore } = useStores()
    const [dataBrand, setDataBrand] = useState<{}[]>([])
    const [dataTagConvert, setDataTagConvert] = useState<{}[]>([]);
    const [dataCategory, setDataCategory] = useState<any>([]);

    const getListBrand = async () => {
      const data = await productStore.getListBrand();
      const newArr = data.result.data.content.map((item: any) => {
        return { label: item.name, id: item.id };
      })
      setDataBrand(newArr);
    };

    const getListCategory = async () => {
      const data = await categoryStore.getListCategoriesModal(0, 200);
      console.log("get list category", data);
      // setTotalPage(data.response.data.totalPages)
      // if (page === 0) {
      const newArr = data.response.data.content.map((item: { name: any; id: any }) => {
        return { label: item.name, id: item.id };
      });
      setDataCategory(newArr);
      // } else {
      //   setDataCategory(prevData => [...prevData, ...data.response.data.content]);
      // }
    };

    const getListTags = async () => {
      const data = await productStore.getListTagProduct();
      setDataTagConvert(
        data.result.data.content.map((item: { name: any; id: any }) => {
          return { text: item.name, value: item.id };
        })
      );
    };

    useEffect(() => {
      getListCategory()
      getListBrand()
      getListTags()
    }, [])
    return (
      <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
        <View style={styles.viewViewDetail}>
          <Text
            tx={"createProductScreen.infoMore"}
            style={styles.textTitleView}
          />
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <InputSelect
                titleTx={"inforMerchant.Category"}
                hintTx={"productScreen.select_catgory"}
                isSearch
                required={false}
                arrData={dataCategory}
                dataDefault={value?.label ?? ''}
                // onLoadMore={loadMoreCategories}
                // handleOnSubmitSearch={handleSubmitSearchCategory}
                // onChangeText={handleSearchCategoryChange}
                onPressChoice={(item: any) => {
                  onChange(item);
                }}
                styleView={{ marginBottom: scaleHeight(15) }}
              />
            )}
            name="category"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <InputSelect
                titleTx={"productScreen.trademark"}
                hintTx={"productScreen.select_trademark"}
                isSearch
                required={false}
                arrData={dataBrand}
                dataDefault={value?.label ?? ''}
                onPressChoice={(item: any) => {
                  onChange(item);
                }}
                styleView={{ marginBottom: scaleHeight(15) }}
              // styleView={{ width: scaleWidth(164), height: scaleHeight(56), marginRight: scaleWidth(15) }}
              />
            )}
            name="brand"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <DropdownModal
                required={false}
                arrData={dataTagConvert}
                onPressChoice={(item: any) => {
                  const items = item.map((item: { value: any }) => item.value);
                  onChange(items);
                }}
                dataEdit={props.defaultTags}
                titleTx={"productScreen.tag"}
                hintTx={"productScreen.select_tag"}
                styleView={{ marginBottom: scaleHeight(15) }}
              />
            )}
            name="tags"
          />
        </View>
      </View>
    )
  })

export const ItemGroupPrice = memo(
  function ItemGroupPrice(props: ItemGroupPrice) {
    const { vendorStore } = useStores()
    const [dataModal, setDataModal] = useState<{}[]>([]);
    const [modalRetailPrice, setModalRetailPrice] = useState(false);
    const [modalWholesalePrice, setModalWholesalePrice] = useState(false);
    const { control, setValue, getValues, watch } = useFormContext()

    return (
      <View>
        <View style={styles.viewLinePriceProduct}>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TouchableOpacity
                style={styles.viewBtnPriceProduct}
                onPress={() => {
                  setModalRetailPrice(true), setDataModal(value);
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      tx={"productScreen.priceRetail"}
                      style={styles.textTitleViewPrice}
                    />
                    {value?.length > 0 &&
                      value?.length !== 1 ? (
                      <Text
                        text={convertRetailPrice(value)}
                        numberOfLines={1}
                        style={styles.textTextField}
                      />
                    ) : value?.length > 0 &&
                      value?.length === 1 ? (
                      <Text
                        text={vendorStore.checkSeparator === "DOTS"
                          ? formatCurrency(
                            removeNonNumeric(value[0]?.price)
                          )
                          : addCommas(removeNonNumeric(value[0]?.price))}
                        numberOfLines={1}
                        style={styles.textTextField}
                      />
                    ) : (
                      <Text
                        text="0.000 - 0.000"
                        style={styles.textTextFieldNoData}
                      />
                    )}
                  </View>
                  <Images.icon_caretRightDown />
                </View>
              </TouchableOpacity>
            )}
            name="retailPriceProduct"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                maxLength={20}
                keyboardType={"number-pad"}
                labelTx={"productScreen.priceCapital"}
                labelDolphin
                style={{
                  width: scaleWidth(164),
                  flex: 1,
                }}
                inputStyle={styles.textTextField}
                value={value}
                onBlur={onBlur}
                showRightIcon={false}
                valueInput={vendorStore.checkSeparator === "DOTS"
                  ? formatCurrency(
                    removeNonNumeric(value)
                  )
                  : addCommas(removeNonNumeric(value))}
                onChangeText={(value) => {
                  onChange(
                    vendorStore.checkSeparator === "DOTS"
                      ? formatCurrency(removeNonNumeric(value))
                      : addCommas(removeNonNumeric(value))
                  );
                }}
                placeholderTx="productScreen.placeholderPrice"
              />
            )}
            // defaultValue={""}
            name="costPrice"
          />
        </View>
        <View style={styles.viewLinePriceProduct}>
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TextField
                maxLength={20}
                keyboardType={"number-pad"}
                labelTx={"productScreen.priceList"}
                labelDolphin
                style={{
                  // justifyContent: "center",
                  width: scaleWidth(164),
                }}
                inputStyle={styles.textTextField}
                value={value}
                onBlur={onBlur}
                showRightIcon={false}
                valueInput={vendorStore.checkSeparator === "DOTS"
                  ? formatCurrency(
                    removeNonNumeric(value)
                  )
                  : addCommas(removeNonNumeric(value))}
                onChangeText={(value) => {
                  onChange(
                    vendorStore.checkSeparator === "DOTS"
                      ? formatCurrency(removeNonNumeric(value))
                      : addCommas(removeNonNumeric(value))
                  );
                }}
                placeholderTx="productScreen.placeholderPrice"
              />
            )}
            // defaultValue={""}
            name="listPrice"
          />
          <Controller
            control={control}
            render={({ field: { onChange, value, onBlur } }) => (
              <TouchableOpacity
                style={styles.viewBtnPriceProduct}
                onPress={() => {
                  setModalWholesalePrice(true);
                  setDataModal(value);
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <Text
                      tx={"productScreen.priceWholesale"}
                      style={styles.textTitleViewPrice}
                    />
                    {value?.length > 0 &&
                      value?.length !== 1 ? (
                      <Text
                        text={convertWholesalePrice(value)}
                        numberOfLines={1}
                        style={styles.textTextField}
                      />
                    ) : value?.length > 0 &&
                      value?.length === 1 ? (
                      <Text
                        text={vendorStore.checkSeparator === "DOTS"
                          ? formatCurrency(
                            removeNonNumeric(value[0]?.price)
                          )
                          : addCommas(removeNonNumeric(value[0]?.price))}
                        numberOfLines={1}
                        style={styles.textTextField}
                      />
                    ) : (
                      <Text
                        text="0.000 - 0.000"
                        style={styles.textTextFieldNoData}
                      />
                    )}
                  </View>
                  <Images.icon_caretRightDown />
                </View>
              </TouchableOpacity>
            )}
            name="wholesalePriceProduct"
          />
        </View>
        <PriceModal
          isVisible={modalRetailPrice}
          setIsVisible={() => setModalRetailPrice(false)}
          title={"productDetail.retailPrice"}
          onCancel={() => {
            setModalRetailPrice(false);
            dataModal?.length !== 0
              ? setDataModal([])
              : setDataModal([{ min: "", price: "" }]);
          }}
          onConfirm={(data) => {
            setValue('retailPriceProduct', data.price)
            setModalRetailPrice(false);
            setDataModal([{ min: "", price: "" }]);
          }}
          dataAdd={dataModal}
        />
        <PriceModal
          isVisible={modalWholesalePrice}
          setIsVisible={() => setModalWholesalePrice(false)}
          title={"productDetail.wholesalePrice"}
          onCancel={() => {
            setModalWholesalePrice(false);
            dataModal.length !== 0
              ? setDataModal([])
              : setDataModal([{ min: "", price: "" }]);
          }}
          onConfirm={(data) => {
            setValue('wholesalePriceProduct', data.price)
            setModalWholesalePrice(false);
            setDataModal([]);
          }}
          dataAdd={dataModal}
        />
      </View>
    )
  })

  interface ItemUnit {
    detailUnitGroupData: any;
    valueSwitchUnit: boolean;
    arrUnitGroupData: any;
    uomGroupId: {label: string};
    uomId: {label: string};
    addUnitOrGroup: ()=> void;
    onChangeSwitch: ()=> void;
    onChangeInput: (item: any)=> void;
  }

export const ItemUnit = memo(
  function ItemUnit(props: ItemUnit) {

    const getConvertedUnitsForGroup = () => {
      return props.detailUnitGroupData
        ? props.detailUnitGroupData.uomGroupLines != null
          ? props.detailUnitGroupData.uomGroupLines
          : []
        : [];
    };

    return (
        <View
            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}
          >
            <View style={styles.viewViewDetail}>
              <Text
                tx={
                  props.valueSwitchUnit
                    ? "productScreen.unit_group"
                    : "productScreen.unit"
                }
                style={styles.textTitleView}
              />
              <View style={styles.viewLineSwitchUnit}>
                <Text
                  tx={"productScreen.manage_multiple_units"}
                  style={styles.textWeight400Dolphin}
                />
                <Switch
                  value={props.valueSwitchUnit}
                  onToggle={props.onChangeSwitch}
                />
              </View>
              <InputSelect
                titleTx={
                  props.valueSwitchUnit
                    ? "productScreen.unit_group"
                    : "productScreen.unit"
                }
                hintTx={
                  props.valueSwitchUnit
                    ? "productScreen.select_unit_group"
                    : "productScreen.select_unit"
                }
                isSearch
                required={true}
                arrData={props.arrUnitGroupData}
                dataDefault={props.valueSwitchUnit ? props.uomGroupId.label : props.uomId.label}
                onPressChoice={(item)=>props.onChangeInput(item)}
                styleView={{ marginBottom: scaleHeight(6) }}
              />
              <View style={{ marginBottom: scaleHeight(15) }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={props.addUnitOrGroup}
                >
                  <Images.ic_plusCircleBlue
                    width={scaleWidth(14)}
                    height={scaleHeight(14)}
                  />
                  <Text
                    tx={
                      props.valueSwitchUnit
                        ? "productScreen.create_unit_group"
                        : "productScreen.create_unit"
                    }
                    style={styles.textWeight400Blue}
                  />
                </TouchableOpacity>
              </View>
              {props.valueSwitchUnit ? (
                <>
                  <View style={styles.viewLineSwitchUnit}>
                    <Text
                      tx={"createProductScreen.originalUnit"}
                      style={{ fontSize: fontSize.size14 }}
                    />
                    {/* Hiển thị đơn vị gốc (baseUnit) từ arrDVT dựa trên group.label */}
                    {props.detailUnitGroupData ? (
                      <Text style={styles.textWeight600}>
                        {props.detailUnitGroupData.originalUnit.name}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.viewLineSwitchUnit}>
                    <Text
                      tx={"createProductScreen.conversion"}
                      style={{ fontSize: fontSize.size14 }}
                    />
                    <Text
                      tx={"createProductScreen.conversionRate"}
                      style={styles.textWeight600}
                    />
                  </View>
                  {getConvertedUnitsForGroup()?.map((item: any, index: any) => (
                    <View key={index} style={styles.viewLineSwitchUnit}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Images.ic_arrowDownRight
                          width={scaleWidth(14)}
                          height={scaleHeight(14)}
                        />
                        <Text
                          style={{
                            fontSize: fontSize.size14,
                            marginHorizontal: scaleWidth(6),
                          }}
                        >
                          {item.unitName}
                        </Text>
                      </View>
                      <Text style={styles.textWeight600}>
                        {item.conversionRate}{" "}
                        {props.detailUnitGroupData?.originalUnit?.name}
                      </Text>
                    </View>
                  ))}
                </>
              ) : null}
            </View>
          </View>
    )
  })

const styles = StyleSheet.create({
  viewViewDetail: {
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(20),
  },
  textTitleView: {
    fontSize: fontSize.size14,
    fontWeight: "700",
    marginBottom: scaleHeight(15),
  },
  viewLinePriceProduct: {
    flexDirection: "row",
    marginTop: scaleHeight(15),
    flex: 1,
    justifyContent: "space-between",
  },
  textTextFieldNoData: {
    fontSize: fontSize.size16,
    fontWeight: "500",
    color: colors.palette.dolphin,
    lineHeight: scaleHeight(24),
  },
  viewBtnPriceProduct: {
    borderRadius: 8,
    backgroundColor: colors.palette.aliceBlue,
    height: scaleHeight(56),
    paddingVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
    width: "48%",
  },
  textTitleViewPrice: {
    fontWeight: "500",
    fontSize: fontSize.size12,
    color: colors.palette.dolphin,
    lineHeight: scaleHeight(14),
  },
  textTextField: {
    fontSize: fontSize.size16,
    fontWeight: "500",
    color: colors.palette.nero,
    lineHeight: scaleHeight(24),
  },
  viewLineSwitchUnit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scaleHeight(15),
  },
  textWeight400Dolphin: {
    fontSize: fontSize.size13,
    fontWeight: "400",
    color: colors.palette.dolphin,
  },
  textWeight400Blue: {
    fontSize: fontSize.size12,
    fontWeight: "400",
    color: colors.palette.navyBlue,
    marginLeft: scaleWidth(4),
  },
  textWeight600: { fontSize: fontSize.size14, fontWeight: "600" },
})