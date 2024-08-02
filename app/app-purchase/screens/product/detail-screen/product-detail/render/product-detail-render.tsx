// ProductDetailsSection.tsx
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ProductAttribute from '../../../component/productAttribute';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../../../theme';
import { styles } from '../styles';
import { Text } from '../../../../../components';
import { Svgs } from '../../../../../../../assets/svgs';
import { commasToDots, formatCurrency, formatVND } from '../../../../../utils/validate';
import { translate } from '../../../../../i18n/translate';
import en from '../../../../../i18n/en';

const ProductDetailsSection = ({
    dataClassification,
    detailsClassification,
    arrClassification
}: any) => {
    const [showRetailPrice, setShowRetailPrice] = useState(false);
    const [showWholesalePrice, setShowWholesalePrice] = useState(false);
    const arrBrands = [
        { id: 3746, label: "Mặc định", label2: "DEFAULT" },
        { id: 4638, label: "Lô", label2: "LOTS" },
        { id: 4398, label: "Serial", label2: "SERIAL" },
    ];
    const getLabelByList = (label2: string) => {
        const item = arrBrands.find((item) => item.label2 === label2);
        return item ? item.label : "";
    };
    useEffect(() => {
        if (detailsClassification?.wholesalePrice?.length > 0) {
            setShowWholesalePrice(true);
        } else {
            setShowWholesalePrice(false);
        }
        if (detailsClassification?.retailPrice?.length > 0) {
            setShowRetailPrice(true);
        } else {
            setShowRetailPrice(false);
        }
    }, [detailsClassification]);
    return (
        <View style={{ marginHorizontal: scaleWidth(margin.margin_16) }}>
            <View style={{ marginTop: 20 }}>
                <ProductAttribute
                    label={translate("detailScreen.productCode")}
                    value={dataClassification.sku}
                />
                <ProductAttribute
                    label={translate("detailScreen.nameProduct")}
                    value={dataClassification.name}
                />
                {arrClassification ? (
                    <View>
                        <ProductAttribute
                            label={translate("detailScreen.codeProduct")}
                            value={detailsClassification.sku}
                        />
                        <ProductAttribute
                            label={translate("detailScreen.nameCodeProduct")}
                            value={detailsClassification.name}
                        />
                    </View>
                ) : null}
                <ProductAttribute
                    label={translate("detailScreen.status")}
                    value={
                        dataClassification.saleOk === true &&
                            dataClassification.purchaseOk === false
                            ? en.productScreen.canSell
                            : dataClassification.purchaseOk === true &&
                                dataClassification.saleOk === false
                                ? en.productScreen.canBuy
                                : dataClassification.saleOk === true &&
                                    dataClassification.purchaseOk === true
                                    ? en.productScreen.canSellOrBuy
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
                                tx={"detailScreen.miniumPurchase"}
                                style={[
                                    styles.textDolphin12,
                                    {
                                        flex: 1,
                                    },
                                ]}
                            />
                            <Text
                                tx="detailScreen.priceProduct"
                                style={styles.textDolphin12}
                            />
                        </View>
                        {detailsClassification?.length !== 0
                            ? detailsClassification?.retailPrice?.map((item: any) => {
                                return (
                                    <ProductAttribute
                                        label={formatCurrency(commasToDots(item.min))}
                                        value={`${formatVND(
                                            formatCurrency(commasToDots(item.price))
                                        )}/${dataClassification.uom?.name ||
                                        dataClassification.uomGroup?.originalUnit?.name
                                            }`}
                                        labelStyle={{ color: colors.palette.nero }}
                                        textStyle={{ color: colors.palette.radicalRed }}
                                    />
                                );
                            })
                            : dataClassification?.retailPrice?.map((item: any) => {
                                return (
                                    <ProductAttribute
                                        label={item.min}
                                        value={`${formatVND(
                                            formatCurrency(commasToDots(item.price))
                                        )}/${dataClassification.uom?.name ||
                                        dataClassification.uomGroup?.originalUnit?.name
                                            }`}
                                        labelStyle={{ color: colors.palette.nero }}
                                        textStyle={{ color: colors.palette.radicalRed }}
                                    />
                                );
                            })}
                    </View>
                ) : null}
                <View>
                    {/* {detailsClassification?.length !== 0 ? ( */}
                    <ProductAttribute
                        label={translate("detailScreen.capitalPrice")}
                        value={
                            detailsClassification?.costPrice > 0
                                ? `${formatVND(
                                    formatCurrency(
                                        commasToDots(detailsClassification?.costPrice)
                                    )
                                )}/${dataClassification.uom?.name ||
                                dataClassification.uomGroup?.originalUnit?.name
                                }`
                                : null
                        }
                        textStyle={{ color: colors.palette.radicalRed }}
                    />
                    {/* ) : (
                  <ProductAttribute
                    label="Giá vốn"
                    value={`${formatVND(formatCurrency(commasToDots(dataClassification?.costPrice)))}/${dataClassification?.uom?.name}`}
                    textStyle={{ color: colors.palette.radicalRed }}
                  />
                )} */}
                    {/* {detailsClassification?.length !== 0 ? ( */}
                    <ProductAttribute
                        labelTx="detailScreen.listedPrice"
                        value={
                            detailsClassification?.listPrice > 0
                                ? `${formatVND(
                                    formatCurrency(
                                        commasToDots(detailsClassification?.listPrice)
                                    )
                                )}/${dataClassification.uom?.name ||
                                dataClassification.uomGroup?.originalUnit?.name
                                }`
                                : null
                        }
                        textStyle={{ color: colors.palette.radicalRed }}
                    />
                    {/* ) : (
                  <ProductAttribute
                    label="Giá niêm yết"
                    value={`${formatVND(formatCurrency(commasToDots(dataClassification?.listPrice)))}/${dataClassification?.uom?.name}`}
                    textStyle={{ color: colors.palette.radicalRed }}
                  />
                )} */}
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
                                tx={"detailScreen.miniumPurchase"}
                                style={[
                                    styles.textDolphin12,
                                    {
                                        flex: 1,
                                    },
                                ]}
                            />
                            <Text
                                tx="detailScreen.priceProduct"
                                style={styles.textDolphin12}
                            />
                        </View>
                        {detailsClassification?.length !== 0
                            ? detailsClassification?.wholesalePrice?.map((item: { min: any; price: any; }) => {
                                return (
                                    <ProductAttribute
                                        label={formatCurrency(commasToDots(item.min))}
                                        value={`${formatVND(
                                            formatCurrency(commasToDots(item.price))
                                        )}/${dataClassification.uom?.name ||
                                        dataClassification.uomGroup?.originalUnit?.name
                                            }`}
                                        labelStyle={{ color: colors.palette.nero }}
                                        textStyle={{ color: colors.palette.radicalRed }}
                                    />
                                );
                            })
                            : dataClassification?.wholesalePrice?.map((item: { min: any; price: any; }) => {
                                return (
                                    <ProductAttribute
                                        label={item.min}
                                        value={`${formatVND(
                                            formatCurrency(commasToDots(item.price))
                                        )}/${dataClassification.uom?.name ||
                                        dataClassification.uomGroup?.originalUnit?.name
                                            }`}
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
                    label={translate("detailScreen.category")}
                    value={dataClassification.productCategory?.name}
                />
                <ProductAttribute
                    label={translate("detailScreen.brand")}
                    value={dataClassification.brand?.name}
                />
                <ProductAttribute
                    label="Tag"
                    value={dataClassification.productTags
                        ?.map((item: { name: any; }) => item.name)
                        .join("/ ")}
                />
                <ProductAttribute
                    label={translate("detailScreen.management")}
                    value={getLabelByList(dataClassification.managementForm)}
                />
                <ProductAttribute
                    label={translate("detailScreen.unit")}
                    value={
                        dataClassification.uom?.name ||
                        dataClassification.uomGroup?.originalUnit?.name
                    }
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
                                style={{ fontSize: fontSize.size12, fontWeight: "600" }} />
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

export default React.memo(ProductDetailsSection);