import { Observer, observer } from 'mobx-react-lite';
import { FC, memo, useCallback, useState } from 'react';
import React, { FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from '../../../theme';
import { Text, TextField } from '../../../../components';
import { Svgs } from '../../../../../assets/svgs';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../../../models';
import ProductAttribute from './productAttribute';
import ImagesGroup from './imageGroup';
import { Controller, useForm } from 'react-hook-form';
import { addCommas, convertAttributeRetailPrice, convertAttributeWholesalePrice, formatCurrency, removeNonNumeric, validateFileSize } from '../../../utils/validate';
import { ALERT_TYPE, Dialog, Loading } from '../../../../components/dialog-notification';
import { translate } from '../../../../i18n';
import PriceModal from './modal-price';

interface ItemVariant {
    addVariant: boolean;
    productName: string;
    dataCreateProduct: { imageUrls: string[], retailPrice: {}[], wholesalePrice: {}[] }[];
    dataGroupAttribute: {}[];
    valueSwitchUnit: boolean;
    addWeight: boolean;
    detailUnitGroupData: { originalUnit: string, uomGroupLines: {}[] };
    uomId: {};
    screen: string;
    setDataCreateProduct: ([]) => void;
    setAddVariant: (a: boolean) => void;
    setDataGroupAttribute: ([]) => void;
    setVariantInConfig: (a: boolean) => void
    handleEditAttribute: () => void;
    isVariantInConfig: boolean;
    isUsing: boolean;
}

export const ItemVariant = memo(
    function ItemVariant(props: ItemVariant) {
        const navigation = useNavigation()
        const { vendorStore, productStore } = useStores()
        const { control } = useForm()
        const [dataModal, setDataModal] = useState<{}[]>([]);
        const [modalRetailPrice1, setModalRetailPrice1] = useState(false);
        const [modalWholesalePrice1, setModalWholesalePrice1] = useState(false);
        const [indexVariant, setIndexVariant] = useState(0);

        const uploadImages = async (
            imageArray: any[],
            checkUploadSlider: boolean,
            indexItem?: number
        ) => {
            try {
                const uploadPromises = imageArray.map(async (image: any, index: any) => {
                    const { fileSize, uri, type, fileName } = image;
                    const checkFileSize = validateFileSize(fileSize);
                    if (checkFileSize) {
                        Loading.hide();
                        Dialog.show({
                            type: ALERT_TYPE.DANGER,
                            title: translate("txtDialog.txt_title_dialog"),
                            textBody: translate("txtDialog.imageUploadExceedLimitedSize"),
                            button: translate("common.ok"),
                            closeOnOverlayTap: false,
                        });
                    } else {
                        const formData = new FormData();
                        formData.append("file", {
                            uri,
                            type,
                            name: fileName,
                        });
                        // Trả về một promise chứa cả vị trí của hình ảnh trong mảng
                        return await productStore.uploadImages(formData);
                    }
                });

                // Gửi các yêu cầu upload đồng thời và chờ cho đến khi tất cả hoàn thành
                const results = await Promise.all(uploadPromises);
                console.log(`successfully----------`, results);
                if (results) {
                    console.log(`imageArray---------------`, imageArray);
                    if (checkUploadSlider) {
                    } else {
                        const newArr = props.dataCreateProduct.slice();
                        const newArr1 = newArr[indexItem!].imageUrls.concat(results);
                        props.dataCreateProduct[indexItem!].imageUrls = newArr1;
                        props.setDataCreateProduct(newArr);
                    }
                }
                // Xử lý kết quả upload
                results.forEach((result, index) => {
                    if (result) {
                        console.log(`Upload image ${imageArray[index]} successfully`);
                        console.log(`Upload image successfully`, JSON.stringify(imageArray[index]));
                    } else {
                        console.log(`Failed to upload image ${imageArray[index]}`);
                    }
                });
            } catch (error) {
                console.error("Error uploading images:", error);
            }
        }

        const handleDeleteProduct = (index: any, id: any) => {
            if (props.screen === 'create') {
                const updatedData = [
                    ...props.dataCreateProduct.slice(0, index),
                    ...props.dataCreateProduct.slice(index + 1),
                ];
                props.setDataCreateProduct(updatedData);
            }
            if (props.screen === 'edit') {
                console.log('456')
                Dialog.show({
                    type: ALERT_TYPE.INFO,
                    title: translate("txtDialog.txt_title_dialog"),
                    textBody: translate("txtDialog.delete_variant"),
                    button: translate("common.cancel"),
                    button2: translate("common.confirm"),
                    closeOnOverlayTap: false,
                    onPressButton: async () => {
                        try {
                            if (id !== null) {
                                const checkDelete = await productStore.deleteCheck(id);
                                console.log(checkDelete, "----------check");
                                if (checkDelete.result && checkDelete.kind === "ok") {
                                    if (checkDelete.result.data.isUsing === false) {
                                        const updatedData = [
                                            ...props.dataCreateProduct.slice(0, index),
                                            ...props.dataCreateProduct.slice(index + 1),
                                        ];
                                        props.setDataCreateProduct(updatedData);
                                        await Dialog.hideDialog(); // Chờ dialog ẩn hoàn toàn
                                        Dialog.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: translate("txtDialog.txt_title_dialog"),
                                            textBody: checkDelete.result.message,
                                            button: translate("common.ok"),
                                            closeOnOverlayTap: false
                                        })
                                    } else {
                                        await Dialog.hideDialog(); // Chờ dialog ẩn hoàn toàn
                                        Dialog.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: translate("txtDialog.txt_title_dialog"),
                                            textBody: checkDelete.result.errorCodes[0].message,
                                            button: translate("common.ok"),
                                            closeOnOverlayTap: false
                                        })
                                    }
                                } else {
                                    await Dialog.hideDialog(); // Chờ dialog ẩn hoàn toàn
                                    Dialog.show({
                                        type: ALERT_TYPE.DANGER,
                                        title: translate("txtDialog.txt_title_dialog"),
                                        textBody: checkDelete.result.errorCodes[0].message,
                                        button: translate("common.ok"),
                                        closeOnOverlayTap: false
                                    })
                                    console.error("Failed to fetch categories:", checkDelete.result);
                                }
                            } else {
                                const updatedData = [
                                    ...props.dataCreateProduct.slice(0, index),
                                    ...props.dataCreateProduct.slice(index + 1),
                                ];
                                props.setDataCreateProduct(updatedData);
                            }
                        } catch (error) {
                            console.error("Error fetching categories:", error);
                        }
                    }
                })
            }
        };

        const handleDeleteImage = (index: number) => {
            const newArr = props.dataCreateProduct.slice();
            newArr[index].imageUrls = [];
            console.log("==========> handleDeleteImage--All");
            props.setDataCreateProduct(newArr);
        };

        const handleDeleteImageItem = (index: number) => {
            console.log(
                "-------productStore.imageModalIndex-----------",
                productStore.imageModalIndex
            );
            const newArr = props.dataCreateProduct.slice();
            const newArrUrl = newArr[index].imageUrls.slice();
            newArrUrl.splice(productStore.imageModalIndex, 1);
            newArr[index].imageUrls = newArrUrl;
            console.log("==========> handleDeleteImageItem---", newArr);
            props.setDataCreateProduct(newArr);
        };

        return (
            <View>
                {props.addVariant ? (
                    <View
                        style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}
                    >
                        <View style={styles.viewViewDetail}>
                            <Text
                                tx="createProductScreen.classify"
                                style={{ fontSize: fontSize.size14, fontWeight: "700" }}
                            />

                            {props.dataGroupAttribute.length > 0 ? (
                                <View style={styles.viewDetails}>
                                    <View style={styles.viewTitleDetail}>
                                        <Text tx="createProductScreen.property"
                                            style={{ fontWeight: "600", fontSize: fontSize.size12 }} />
                                        <Text tx="createProductScreen.value"
                                            style={{ fontWeight: "600", fontSize: fontSize.size12 }} />
                                    </View>
                                    <View style={styles.viewLine2} />
                                    {props.dataGroupAttribute?.map((item: any, index) => (
                                        <View key={index}>
                                            <View
                                                style={{
                                                    marginVertical: scaleHeight(margin.margin_12),
                                                    paddingHorizontal: scaleWidth(padding.padding_12),
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontWeight: "600",
                                                        fontSize: fontSize.size12,
                                                        color: colors.palette.navyBlue,
                                                    }}
                                                >
                                                    {item.name}
                                                </Text>
                                            </View>
                                            <View style={styles.viewLine2} />

                                            {item.attributeOutputList?.map((dto: any) => (
                                                <View
                                                    style={{
                                                        marginTop: scaleHeight(margin.margin_12),
                                                    }}
                                                >
                                                    <ProductAttribute
                                                        label={dto.name}
                                                        value={dto.productAttributeValue
                                                            .map((value: any) => value.value)
                                                            .join("/")}
                                                        styleAttribute={{
                                                            paddingHorizontal: scaleWidth(
                                                                padding.padding_12
                                                            ),
                                                        }}
                                                    />
                                                    {index !== props.dataGroupAttribute?.length - 1 ? (
                                                        <View style={styles.viewLine2} />
                                                    ) : null}
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <View>
                                    {props.dataCreateProduct.length > 0 ? (
                                        <FlatList
                                            data={props.dataCreateProduct}
                                            keyExtractor={(item, index) => index.toString()}
                                            scrollEnabled={false}
                                            renderItem={({ item, index }: any) => {
                                                return (
                                                    <ScrollView horizontal={true}>
                                                        <View style={{ marginTop: scaleHeight(15) }}>
                                                            <Text>
                                                                {props.productName +
                                                                    " - " +
                                                                    item.name}
                                                            </Text>
                                                            <View
                                                                style={{
                                                                    flexDirection: "row",
                                                                    marginTop: scaleHeight(6),
                                                                    // paddingVertical : 5,
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <View
                                                                    style={{
                                                                        flexDirection: "row",
                                                                        alignItems: "center",
                                                                        marginBottom: scaleHeight(8),
                                                                    }}
                                                                >
                                                                    <TouchableOpacity
                                                                        style={{ marginRight: scaleWidth(6) }}
                                                                        onPress={() => handleDeleteProduct(index, item.id)}
                                                                    >
                                                                        <Svgs.ic_minusCircle
                                                                            width={scaleWidth(14)}
                                                                            height={scaleHeight(14)}
                                                                        />
                                                                    </TouchableOpacity>
                                                                    <ImagesGroup
                                                                        arrData={item.imageUrls || []}
                                                                        uploadImage={(
                                                                            imageArray,
                                                                            checkUploadSlider,
                                                                            indexItem
                                                                        ) =>
                                                                            uploadImages(
                                                                                imageArray,
                                                                                checkUploadSlider,
                                                                                indexItem
                                                                            )
                                                                        }
                                                                        index1={index}
                                                                        onPressDelete={() =>
                                                                            handleDeleteImage(index)
                                                                        }
                                                                        onPressDelete1={() =>
                                                                            handleDeleteImageItem(index)
                                                                        }
                                                                    />
                                                                </View>
                                                                {props.addWeight === true ? (
                                                                    <TouchableOpacity
                                                                        onPress={() =>
                                                                            navigation.navigate({
                                                                                name: "editWeight",
                                                                                params: {
                                                                                    data: item.weight,
                                                                                    check: props.valueSwitchUnit,
                                                                                    unitData:
                                                                                        props.valueSwitchUnit == false
                                                                                            ? props.uomId
                                                                                            : props.detailUnitGroupData?.originalUnit,
                                                                                    unitOrigin:
                                                                                        props.valueSwitchUnit == false
                                                                                            ? []
                                                                                            : props.detailUnitGroupData?.uomGroupLines,
                                                                                    index: index,
                                                                                    dataCreateProduct:
                                                                                        props.dataCreateProduct,
                                                                                    screen: props.screen,
                                                                                },
                                                                            } as never)
                                                                        }
                                                                        style={{
                                                                            marginHorizontal: scaleWidth(2),
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                        }}
                                                                    >
                                                                        <Text
                                                                            tx={"productScreen.weight"}
                                                                            style={[
                                                                                styles.textTitleViewPrice,
                                                                                { color: colors.nero },
                                                                            ]}
                                                                        />
                                                                        <Svgs.icon_edit />
                                                                    </TouchableOpacity>
                                                                ) : null}
                                                                <View
                                                                    style={{
                                                                        flexDirection: "row",
                                                                        marginLeft: scaleWidth(10),
                                                                        // alignItems: 'center'
                                                                    }}
                                                                >
                                                                    <TouchableOpacity
                                                                        style={styles.viewBtnPriceVariants}
                                                                        onPress={() => {
                                                                            setModalRetailPrice1(true);
                                                                            setDataModal(item.retailPrice);
                                                                            setIndexVariant(index);
                                                                        }}
                                                                    >
                                                                        <View
                                                                            style={{
                                                                                flexDirection: "row",
                                                                                alignItems: "center",
                                                                            }}
                                                                        >
                                                                            <View style={{ flex: 1 }}>
                                                                                <Text
                                                                                    tx={"productScreen.priceRetail"}
                                                                                    style={styles.textTitleViewPrice}
                                                                                />
                                                                                {item.retailPrice?.length > 0 &&
                                                                                    item.retailPrice?.length !== 1 ? (
                                                                                    <Text
                                                                                        text={convertAttributeRetailPrice(
                                                                                            props.dataCreateProduct,
                                                                                            index
                                                                                        )}
                                                                                        numberOfLines={1}
                                                                                        style={styles.textTextField}
                                                                                    />
                                                                                ) : item.retailPrice?.length > 0 &&
                                                                                    item.retailPrice?.length === 1 ? (
                                                                                    <Text
                                                                                        text={
                                                                                            vendorStore.checkSeparator ===
                                                                                                "DOTS"
                                                                                                ? formatCurrency(
                                                                                                    removeNonNumeric(
                                                                                                        item.retailPrice[0]
                                                                                                            ?.price
                                                                                                    )
                                                                                                )
                                                                                                : addCommas(
                                                                                                    removeNonNumeric(
                                                                                                        item.retailPrice[0]
                                                                                                            ?.price
                                                                                                    )
                                                                                                )
                                                                                        }
                                                                                        style={styles.textTextField}
                                                                                    />
                                                                                ) : (
                                                                                    <Text
                                                                                        text="0.000 - 0.000"
                                                                                        style={styles.textTextFieldNoData}
                                                                                    />
                                                                                )}
                                                                            </View>
                                                                            <Svgs.icon_caretRightDown />
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                    <Controller
                                                                        control={control}
                                                                        render={({
                                                                            field: { onChange, value, onBlur },
                                                                        }) => (
                                                                            <TextField
                                                                                maxLength={20}
                                                                                keyboardType={"number-pad"}
                                                                                labelTx={"productScreen.priceCapital"}
                                                                                style={styles.viewTextFieldVariants}
                                                                                inputStyle={{
                                                                                    fontSize: fontSize.size16,
                                                                                    fontWeight: "500",
                                                                                }}
                                                                                value={value}
                                                                                onBlur={onBlur}
                                                                                RightIconClear={Svgs.icon_delete2}
                                                                                // error={errors?.priceRetail?.message}
                                                                                onClearText={() => onChange("")}
                                                                                valueInput={vendorStore.checkSeparator === "DOTS"
                                                                                    ? formatCurrency(
                                                                                        removeNonNumeric(value)
                                                                                    )
                                                                                    : addCommas(removeNonNumeric(value))}
                                                                                onChangeText={(value) => {
                                                                                    onChange(
                                                                                        vendorStore.checkSeparator ===
                                                                                            "DOTS"
                                                                                            ? formatCurrency(
                                                                                                removeNonNumeric(value)
                                                                                            )
                                                                                            : addCommas(
                                                                                                removeNonNumeric(value)
                                                                                            )
                                                                                    );
                                                                                    item.costPrice = value;
                                                                                }}
                                                                                placeholder="0.000"
                                                                                labelDolphin
                                                                            />
                                                                        )}
                                                                        defaultValue={item.costPrice?.toString()}
                                                                        name={`costPrice-${index}`}
                                                                    />
                                                                    <Controller
                                                                        control={control}
                                                                        render={({
                                                                            field: { onChange, value, onBlur },
                                                                        }) => (
                                                                            <TextField
                                                                                maxLength={20}
                                                                                keyboardType={"number-pad"}
                                                                                labelTx={"productScreen.priceList"}
                                                                                style={styles.viewTextFieldVariants}
                                                                                inputStyle={{
                                                                                    fontSize: fontSize.size16,
                                                                                    fontWeight: "500",
                                                                                }}
                                                                                value={value}
                                                                                onBlur={onBlur}
                                                                                RightIconClear={Svgs.icon_delete2}
                                                                                // error={errors?.priceRetail?.message}
                                                                                onClearText={() => onChange("")}
                                                                                valueInput={vendorStore.checkSeparator === "DOTS"
                                                                                    ? formatCurrency(
                                                                                        removeNonNumeric(value)
                                                                                    )
                                                                                    : addCommas(removeNonNumeric(value))}
                                                                                onChangeText={(value) => {
                                                                                    onChange(
                                                                                        vendorStore.checkSeparator ===
                                                                                            "DOTS"
                                                                                            ? formatCurrency(
                                                                                                removeNonNumeric(value)
                                                                                            )
                                                                                            : addCommas(
                                                                                                removeNonNumeric(value)
                                                                                            )
                                                                                    );
                                                                                    item.listPrice = value;
                                                                                }}
                                                                                placeholder="0.000"
                                                                                labelDolphin
                                                                            />
                                                                        )}
                                                                        defaultValue={item.listPrice?.toString()}
                                                                        name={`listPrice-${index}`}
                                                                    />
                                                                </View>
                                                                <TouchableOpacity
                                                                    style={styles.viewBtnPriceVariants}
                                                                    onPress={() => {
                                                                        setModalWholesalePrice1(true);
                                                                        setDataModal(item.wholesalePrice);
                                                                        setIndexVariant(index);
                                                                    }}
                                                                >
                                                                    <View
                                                                        style={{
                                                                            flexDirection: "row",
                                                                            alignItems: "center",
                                                                        }}
                                                                    >
                                                                        <View style={{ flex: 1 }}>
                                                                            <Text
                                                                                tx={"productScreen.priceWholesale"}
                                                                                style={styles.textTitleViewPrice}
                                                                            />
                                                                            {item.wholesalePrice?.length > 0 &&
                                                                                item.wholesalePrice?.length !== 1 ? (
                                                                                <Text
                                                                                    text={convertAttributeWholesalePrice(
                                                                                        props.dataCreateProduct,
                                                                                        index
                                                                                    )}
                                                                                    numberOfLines={1}
                                                                                    style={styles.textTextField}
                                                                                />
                                                                            ) : item.wholesalePrice?.length > 0 &&
                                                                                item.wholesalePrice?.length === 1 ? (
                                                                                <Text
                                                                                    text={
                                                                                        vendorStore.checkSeparator ===
                                                                                            "DOTS"
                                                                                            ? formatCurrency(
                                                                                                removeNonNumeric(
                                                                                                    item.wholesalePrice[0]
                                                                                                        ?.price
                                                                                                )
                                                                                            )
                                                                                            : addCommas(
                                                                                                removeNonNumeric(
                                                                                                    item.wholesalePrice[0]
                                                                                                        ?.price
                                                                                                )
                                                                                            )
                                                                                    }
                                                                                    style={styles.textTextField}
                                                                                />
                                                                            ) : (
                                                                                <Text
                                                                                    text="0.000 - 0.000"
                                                                                    style={styles.textTextFieldNoData}
                                                                                />
                                                                            )}
                                                                        </View>
                                                                        <Svgs.icon_caretRightDown />
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </ScrollView>
                                                );
                                            }}
                                        />
                                    ) : (
                                        <View style={{ marginTop: scaleHeight(15) }}>
                                            <Text
                                                tx="createProductScreen.details"
                                                style={[
                                                    styles.textWeight400Black,
                                                    { marginBottom: scaleHeight(12) },
                                                ]}
                                            />
                                            <TouchableOpacity
                                                style={styles.btnAddProperties}
                                                onPress={() =>
                                                    navigation.navigate("addAttribute" as never)
                                                }
                                            >
                                                <Svgs.ic_plusBlue
                                                    width={scaleWidth(16)}
                                                    height={scaleHeight(16)}
                                                />
                                                <Text
                                                    tx="createProductScreen.addProperties"
                                                    style={[
                                                        styles.textWeight600,
                                                        {
                                                            color: colors.palette.navyBlue,
                                                            marginLeft: scaleWidth(4),
                                                        },
                                                    ]}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            )}
                            <View
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    flexDirection: "row",
                                }}
                            >
                                {props.dataCreateProduct.length > 0 || props.dataGroupAttribute.length > 0 ? (
                                    <TouchableOpacity
                                        onPress={props.handleEditAttribute}
                                    // onPress={() => {
                                    //     navigation.navigate({
                                    //         name: "editAttribute",
                                    //         params: {
                                    //             dataAttribute: attributeArr,
                                    //             dropdownSelected: dropdownSelected,
                                    //             hasVariantInConfig: hasVariantInConfig,
                                    //         },
                                    //     } as never);
                                    // }}
                                    >
                                        <Svgs.icon_edit
                                            // style={{ marginRight: scaleWidth(8) }}
                                            width={scaleWidth(14)}
                                            height={scaleHeight(14)}
                                        />
                                    </TouchableOpacity>
                                ) : null}
                                {props.isVariantInConfig === undefined ?
                                    <TouchableOpacity onPress={() => props.setAddVariant(false)}>
                                        <Svgs.ic_close
                                            width={scaleWidth(14)}
                                            height={scaleHeight(14)}
                                            style={{ marginLeft: 10 }}
                                        />
                                    </TouchableOpacity>
                                    : (props.isVariantInConfig === true ?
                                        (props.dataCreateProduct.length === 0 ? (
                                            <TouchableOpacity onPress={() => props.setAddVariant(false)}>
                                                <Svgs.ic_close
                                                    width={scaleWidth(14)}
                                                    height={scaleHeight(14)}
                                                    style={{ marginLeft: 10 }}
                                                />
                                            </TouchableOpacity>
                                        ) : null) :
                                        (props.dataGroupAttribute.length > 0 && props.isUsing === false ? (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    props.setAddVariant(false);
                                                    props.setDataGroupAttribute([]);
                                                    props.setDataCreateProduct([]);
                                                    props.setVariantInConfig(false);
                                                }}
                                            >
                                                <Svgs.ic_close
                                                    width={scaleWidth(14)}
                                                    height={scaleHeight(14)}
                                                    style={{ marginLeft: 10 }}
                                                />
                                            </TouchableOpacity>
                                        ) : null))}
                            </View>
                        </View>
                    </View>
                ) : null}
                <PriceModal
                    isVisible={modalRetailPrice1}
                    setIsVisible={() => setModalRetailPrice1(false)}
                    titleTx={"productDetail.retailPrice"}
                    onCancel={() => {
                        setModalRetailPrice1(false);
                        dataModal?.length !== 0
                            ? setDataModal([])
                            : setDataModal([{ min: "", price: "" }]);
                    }}
                    onConfirm={(data) => {
                        // setRetailPriceProduct(data.price)
                        props.dataCreateProduct[indexVariant].retailPrice = data.price;
                        setModalRetailPrice1(false);
                        setDataModal([]);
                    }}
                    dataAdd={dataModal}
                />
                <PriceModal
                    isVisible={modalWholesalePrice1}
                    setIsVisible={() => setModalWholesalePrice1(false)}
                    titleTx={"productDetail.wholesalePrice"}
                    onCancel={() => {
                        setModalWholesalePrice1(false);
                        dataModal?.length !== 0
                            ? setDataModal([])
                            : setDataModal([{ min: "", price: "" }]);
                    }}
                    onConfirm={(data) => {
                        // setWholesalePriceProduct(data.price);
                        props.dataCreateProduct[indexVariant].wholesalePrice = data.price;
                        setModalWholesalePrice1(false);
                        setDataModal([]);
                    }}
                    dataAdd={dataModal}
                />
            </View>
        )
    })

const styles = StyleSheet.create({
    viewViewDetail: {
        marginHorizontal: scaleWidth(16),
        marginVertical: scaleHeight(20),
    },
    viewDetails: {
        marginVertical: scaleHeight(margin.margin_10),
        borderWidth: scaleHeight(1),
        borderColor: colors.palette.ghostWhite,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        shadowColor: "#3A43E5",
        shadowOpacity: 0.25,
        backgroundColor: colors.palette.neutral100,
    },
    viewTitleDetail: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: scaleHeight(margin.margin_12),
        marginBottom: scaleHeight(padding.padding_12),
        paddingHorizontal: scaleWidth(padding.padding_12),
    },
    viewLine2: {
        borderWidth: scaleHeight(0.5),
        borderColor: colors.palette.ghostWhite,
    },
    textWeight600: { fontSize: fontSize.size14, fontWeight: "600" },
    textTextField: {
        fontSize: fontSize.size16,
        fontWeight: "500",
        color: colors.palette.nero,
        lineHeight: scaleHeight(24),
    },
    textTextFieldNoData: {
        fontSize: fontSize.size16,
        fontWeight: "500",
        color: colors.palette.dolphin,
        lineHeight: scaleHeight(24),
    },
    textTitleViewPrice: {
        fontWeight: "500",
        fontSize: fontSize.size12,
        color: colors.palette.dolphin,
        lineHeight: scaleHeight(14),
    },
    textWeight400Black: {
        fontSize: fontSize.size13,
        fontWeight: "400",
        color: colors.palette.nero,
    },
    btnAddProperties: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        paddingVertical: scaleHeight(7),
        borderRadius: 8,
        borderColor: colors.palette.navyBlue,
    },
    viewBtnPriceVariants: {
        borderRadius: 8,
        backgroundColor: colors.palette.aliceBlue,
        height: scaleHeight(56),
        paddingVertical: scaleHeight(8),
        paddingHorizontal: scaleWidth(16),
        width: scaleWidth(180),
        marginRight: scaleWidth(10),
    },
    viewTextFieldVariants: {
        marginRight: scaleWidth(10),
        width: scaleWidth(180),
        height: scaleHeight(56),
    },
})