import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../../../theme';
import ProductAttribute from '../../../component/productAttribute';
import { Svgs } from '../../../../../../../assets/svgs';
import { styles } from '../styles';
import { Text } from '../../../../../../components';
import { commasToDots, formatCurrency, formatVND } from '../../../../../utils/validate';
import { translate } from '../../../../../../i18n';


const ProductDetails = ({ dataClassification, getLabelByList }: any) => {
  const [showRetailPrice, setShowRetailPrice] = useState(false);
  const [showWholesalePrice, setShowWholesalePrice] = useState(false);
  useEffect(() => {
    if (dataClassification?.wholesalePrice?.length > 0) {
      setShowWholesalePrice(true);
    }
    if (dataClassification?.retailPrice?.length > 0) {
      setShowRetailPrice(true);
    }
  }, [dataClassification]);
  return (
    <View style={{ marginHorizontal: scaleWidth(margin.margin_16) }}>
      <View style={{ marginTop: 20 }}>
        <ProductAttribute
          labelTx="detailScreen.productCode"
          value={dataClassification.sku}
        />
        <ProductAttribute
          labelTx="detailScreen.nameProduct"
          value={dataClassification.name}
        />
        <ProductAttribute
          labelTx="detailScreen.status"
          value={
            dataClassification.saleOk === true && dataClassification.purchaseOk === false
              ? translate("productScreen.canSell")
              : dataClassification.purchaseOk === true && dataClassification.saleOk === false
                ? translate("productScreen.canBuy")
                : dataClassification.saleOk === true && dataClassification.purchaseOk === true
                  ? translate("productScreen.canSellOrBuy")
                  : null
          }
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.viewCaret}
          onPress={() => setShowRetailPrice(!showRetailPrice)}>
          <Text
            tx={"productDetail.retailPrice"}
            style={[
              styles.textDolphin12,
              {
                marginRight: scaleWidth(margin.margin_4),
              },
            ]}
          />
          {showRetailPrice === false ? (
            <Svgs.icon_caretRightDown />
          ) : (
            <Svgs.icon_caretUp />
          )}
        </TouchableOpacity>
        {showRetailPrice === true ? (
          <View style={{ paddingLeft: scaleWidth(padding.padding_16) }}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                marginBottom: scaleHeight(margin.margin_10),
              }}>
              <Text
                tx="detailScreen.minimumPurchase"
                style={[
                  styles.textDolphin12,
                  {
                    flex: 1,
                  },
                ]}
              />
              <Text tx="detailScreen.priceProduct" style={styles.textDolphin12} />
            </View>
            {dataClassification.retailPrice?.map((item: { min: any; price: any; }) => {
              return (
                <ProductAttribute
                  label={formatCurrency(commasToDots(item.min))}
                  value={`${formatVND(formatCurrency(commasToDots(item.price)))}/${dataClassification.uom?.name || dataClassification.uomGroup?.originalUnit?.name}`}
                  labelStyle={{ color: colors.palette.nero }}
                  textStyle={{ color: colors.palette.radicalRed }}
                />
              );
            })}
          </View>
        ) : null}
        <View>
          <ProductAttribute
            labelTx="productScreen.priceCapital"
            value={dataClassification?.costPrice > 0 ? `${formatVND(formatCurrency(commasToDots(dataClassification?.costPrice)))}/${dataClassification.uom?.name || dataClassification.uomGroup?.originalUnit?.name}` : null}
            textStyle={{ color: colors.palette.radicalRed }}
          />
          <ProductAttribute
            labelTx="productScreen.priceList"
            value={dataClassification?.listPrice > 0 ? `${formatVND(formatCurrency(commasToDots(dataClassification?.listPrice)))}/${dataClassification.uom?.name || dataClassification.uomGroup?.originalUnit?.name}` : null}
            textStyle={{ color: colors.palette.radicalRed }}
          />
        </View>
        <TouchableOpacity
          style={styles.viewCaret}
          onPress={() => setShowWholesalePrice(!showWholesalePrice)}>
          <Text
            tx={"productDetail.wholesalePrice"}
            style={[
              styles.textDolphin12,
              {
                marginRight: scaleWidth(margin.margin_4),
              },
            ]}
          />
          {showWholesalePrice === false ? (
            <Svgs.icon_caretRightDown />
          ) : (
            <Svgs.icon_caretUp />
          )}
        </TouchableOpacity>
        {showWholesalePrice === true ? (
          <View style={{ paddingLeft: scaleWidth(padding.padding_16) }}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                marginBottom: scaleHeight(margin.margin_10),
              }}>
              <Text
                tx="detailScreen.minimumPurchase"
                style={[
                  styles.textDolphin12,
                  {
                    flex: 1,
                  },
                ]}
              />
              <Text tx="detailScreen.priceProduct" style={styles.textDolphin12} />
            </View>
            {dataClassification?.wholesalePrice?.map((item: { min: any; price: any; }) => {
              return (
                <ProductAttribute
                  label={formatCurrency(commasToDots(item.min))}
                  value={`${formatVND(formatCurrency(commasToDots(item.price)))}/${dataClassification.uom?.name || dataClassification.uomGroup?.originalUnit?.name}`}
                  labelStyle={{ color: colors.palette.nero }}
                  textStyle={{ color: colors.palette.radicalRed }}
                />
              );
            })}
          </View>
        ) : null}
      </View>
      <View>
        <ProductAttribute
          labelTx="inforMerchant.Category"
          value={dataClassification.productCategory?.name}
        />
        <ProductAttribute
          labelTx="detailScreen.brand"
          value={dataClassification.brand?.name}
        />
        <ProductAttribute
          labelTx="detailScreen.tag"
          value={dataClassification.productTags
            ?.map((item: { name: any; }) => item.name)
            .join(", ")}
        />
        <ProductAttribute
          labelTx="detailScreen.management"
          value={getLabelByList(dataClassification.managementForm)}
        />
        <ProductAttribute
          labelTx="detailScreen.unit"
          value={dataClassification.uom?.name || dataClassification.uomGroup?.originalUnit?.name}
        />
        {dataClassification?.uomGroup ? (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: scaleHeight(15),
              }}>

              <Text tx={"createProductScreen.conversion"} style={{ fontSize: fontSize.size12, color: colors.palette.dolphin, }} />
              <Text tx={"createProductScreen.conversionRate"}
                style={{ fontSize: fontSize.size12, fontWeight: "600", color: colors.palette.dolphin, }} />
            </View>
            {dataClassification?.uomGroup?.uomGroupLines?.map((item: any, index: any) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: scaleHeight(15),
                }}>
                <View
                  style={{ flexDirection: "row", alignItems: "center" }}>
                  <Svgs.ic_arrowDownRight
                    width={scaleWidth(14)}
                    height={scaleHeight(14)}
                  />
                  <Text
                    style={{
                      fontSize: fontSize.size12,
                      marginHorizontal: scaleWidth(6),
                      color: colors.palette.dolphin,
                    }}>
                    {item.unitName}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: fontSize.size12,
                    fontWeight: "600",
                    color: colors.palette.dolphin,
                  }}>
                  {item.conversionRate} {dataClassification.uomGroup?.originalUnit?.name}
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default React.memo(ProductDetails);
