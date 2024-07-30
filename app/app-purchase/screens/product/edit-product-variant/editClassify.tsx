import {
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
    TouchableOpacity,
    View,
} from "react-native";
import { Images } from "../../../../../assets/index";
import { Header } from "../../../../components/header/header";
import { Text } from "../../../../components/text/text";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme";
import ProductAttribute from "../component/productAttribute";
import { ScrollView } from "react-native-gesture-handler";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { TextField } from "../../../../components/text-field/text-field";
import { Switch } from "../../../../components";
import { useStores } from "../../../models";
import {
    commasToDots,
    formatCurrency,
    formatNumberByString,
    formatStringToFloat,
    validateFileSize,
} from "../../../utils/validate";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../../components/dialog-notification";
import { translate } from "../../../i18n/translate";
import ItemWeight from "../component/weight-component";
import ImageProduct from "../create-prodcut/imageProduct";
import { styles } from "./styles";
import { ItemGroupPrice } from "../component/itemCreateProduct";

export const EditClassify: FC = (item) => {
    const route = useRoute();
    // const reload = route?.params?.reload;
    const navigation = useNavigation();
    const [imagesNote, setImagesNote] = useState<any>([]);
    const [valuePurchase, setValuePurchase] = useState(false);
    const [valueSwitchUnit, setValueSwitchUnit] = useState(true);
    const [addDescribe, setAddDescribe] = useState(false);
    const [detailUnitGroupData, setDetailUnitGroupData] = useState<{uomGroupLines: any, originalUnit: any}>({uomGroupLines: [], originalUnit: ''});
    const [addWeight, setAddWeight] = useState(false);
    const [description, setDescription] = useState("");
    const [vendor, setVendor] = useState([]);
    const { productStore, unitStore } = useStores();
    const methods = useForm({ defaultValues: { productName: '', costPrice: '', listPrice: '', SKU: '', weight: [], weightOriginal: '', volumeOriginal: '', retailPriceProduct: [], wholesalePriceProduct: [] } })
    const [uomId, setUomId] = useState({ id: 0, label: "", uomGroupLineId: 0 });
    const {
        selectedIds,
        dataEdit,
        typeVariant,
        nameValue,
        attributes
    }: any = route?.params || {};

    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    useEffect(() => {
        setVendor(selectedIds);
    }, [selectedIds]);

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
        // getCheckUsingProduct();

        if (dataEdit !== undefined) {
            console.log("--------------dataEdit---------------------", dataEdit);
            const newDataEdit = JSON.parse(JSON.stringify(dataEdit));

            setUomId({ id: newDataEdit?.uom?.id, label: newDataEdit?.uom?.name, uomGroupLineId: newDataEdit?.uomGroup?.uomGroupLineId });

            if (newDataEdit.uomGroupId !== null) {
                getDetailUnitGroup(newDataEdit.uomGroupId)
            }

            if (newDataEdit?.baseTemplatePackingLine?.weight !== null && newDataEdit?.baseTemplatePackingLine?.volume !== null && newDataEdit?.baseTemplatePackingLine !== null ) {
                setAddWeight(true)
            }
            methods.setValue('costPrice', newDataEdit?.costPrice?.toString())
            methods.setValue('listPrice', newDataEdit?.listPrice?.toString())
            methods.setValue('retailPriceProduct', newDataEdit?.retailPrice)
            methods.setValue('wholesalePriceProduct', newDataEdit?.wholesalePrice)
            methods.setValue('SKU', newDataEdit?.sku)
            methods.setValue('productName', newDataEdit?.name)
            methods.setValue('volumeOriginal', typeVariant === 'variant' ? newDataEdit?.baseProductPackingLine?.volume?.toString() : newDataEdit?.baseTemplatePackingLine?.volume?.toString())
            methods.setValue('weightOriginal', typeVariant === 'variant' ? newDataEdit?.baseProductPackingLine?.weight?.toString() : newDataEdit?.baseTemplatePackingLine?.weight?.toString())
            methods.setValue('weight', typeVariant === 'variant' ? (newDataEdit?.productPackingLines !== null ? dataEdit?.productPackingLines?.map((item: any) => {
                return {
                    weight1: formatCurrency(commasToDots(item.weight?.toString())), volume: formatCurrency(commasToDots(item.volume?.toString())),
                    unit: {
                        ...item.uomGroupLineOutput,
                        label: item.uomGroupLineOutput?.unitName
                    }
                }
            }) : []) : (dataEdit?.templatePackingLines !== null ? dataEdit?.templatePackingLines?.map((item: any) => {
                return {
                    weight1: formatCurrency(commasToDots(item.weight?.toString())), volume: formatCurrency(commasToDots(item.volume?.toString())),
                    unit: {
                        ...item.uomGroupLineOutput,
                        label: item.uomGroupLineOutput.unitName
                    }
                }
            }) : []))
            if (dataEdit?.description !== "") {
                setAddDescribe(true);
                setDescription(newDataEdit?.description);
            }
            setImagesNote(newDataEdit?.imageUrls);
            setValuePurchase(newDataEdit?.purchaseOk);
            setValueSwitchUnit(newDataEdit?.uom !== null ? false : true);
            setDetailUnitGroupData(newDataEdit?.uomGroup);
            if (newDataEdit?.vendors?.length !== 0) {
                const a = newDataEdit?.vendors?.map((item: { vendorId: any }) => {
                    return item.vendorId;
                });
                setVendor(a);
                setValuePurchase(true);
            }
        }
    }, [dataEdit]);

    const getDetailUnitGroup = async (id: number) => {
        const unitResult = await unitStore.getDetailUnitGroup(id);
        if (unitResult && unitResult.kind === "ok") {
            const data = unitResult.result.data;
            console.log("getDetailUnitGroup:-------", data);
            setDetailUnitGroupData(data);
            const uomId = {
                id: data.originalUnit.id,
                label: data.originalUnit.name,
                uomGroupLineId: data.originalUnit.uomGroupLineId,
            };
            setUomId(uomId);
        } else {
            console.error("Failed to fetch list unit:", unitResult);
        }
    };

    const submitAdd = async (data: any) => {
        console.log('dataInput------------', data)
        if (data.productName.trim() === "") {
            methods.setError("productName", { type: 'validate', message: "Vui lòng nhập thông tin" })
            return
        }
        if (uomId.id === 0) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: "",
                textBody: translate("txtToats.required_information"),
            });
            return
        }
        if (addWeight == true) {
            const unit = data.weight?.flatMap((items: any) => items.unit)
            const weight1 = data.weight?.flatMap((items: any) => items.weight1)
            const volume = data.weight?.flatMap((items: any) => items.volume)
            const checkUnit = unit?.some((item: any) => Object.keys(item).length === 0)
            const checkWeight1 = weight1?.some((item: any) => item?.trim() === "")
            const checkVolume = volume?.some((item: any) => item?.trim() === "")
            if (checkUnit == true || checkWeight1 == true || checkVolume == true || data.weightOriginal.trim() === "" || data.volumeOriginal.trim() === "") {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: "",
                    textBody: translate("txtToats.input_weight"),
                });
                return
            }
        }
        const dataPrice2 = data.retailPriceProduct?.map((item: any) => {
            return {
                min: Number(formatNumberByString(item.min.toString())),
                price: Number(formatNumberByString(item.price.toString())),
            };
        });
        const dataPrice = data.wholesalePriceProduct?.map((item: any) => {
            return {
                min: Number(formatNumberByString(item.min.toString())),
                price: Number(formatNumberByString(item.price.toString())),
            };
        });
        
        const packingLine = data.weight?.map((item: any) => {
            return {
                uomGroupLineId: item.unit.id,
                amount: item.unit.conversionRate,
                volume: formatStringToFloat(item.volume),
                weight: formatStringToFloat(item.weight1),
            }
        })
        const doneData = {
            name: data.productName,
            imageUrls: imagesNote,
            retailPrice: dataPrice2,
            costPrice: Number(formatNumberByString(methods.watch('costPrice'))),
            listPrice: Number(formatNumberByString(methods.watch('listPrice'))),
            wholesalePrice: dataPrice,
            baseProductPackingLine: data.weightOriginal?.trim() === "" || data.volumeOriginal?.trim() === "" ? {} : {
                uomGroupLineId: valueSwitchUnit == false ? null : detailUnitGroupData?.originalUnit?.uomGroupLineId,
                amount: 1,
                volume: formatStringToFloat(data.volumeOriginal),
                weight: formatStringToFloat(data.weightOriginal)
            },
            productPackingLines: data.weightOriginal?.trim() === "" || data.volumeOriginal?.trim() === "" ? [] : (valueSwitchUnit == false ? [] : packingLine),
            hasPrice: true,
            activated: true,
        }
        console.log('dataCreate===========', JSON.stringify(doneData))
        const result = await productStore?.putClassify(productStore.productId, doneData);
        if (result.kind === "ok") {
            Dialog.show({
                type: ALERT_TYPE.INFO,
                title: translate("txtDialog.txt_title_dialog"),
                textBody: translate("txtDialog.product_repair_successful"),
                button2: translate("common.ok"),
                closeOnOverlayTap: false,
                onPressButton: () => {
                    navigation.navigate({ name: "classifyDetailScreen", params: { reload: true } } as never);
                    Dialog.hide();
                }
            })
        } else {
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: translate("txtDialog.txt_title_dialog"),
                textBody: result.result.errorCodes[0].message,
                button: translate("common.ok"),
                closeOnOverlayTap: false
            })
        }
    };

    const uploadImages = async (
        imageArray: any[],
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
                        closeOnOverlayTap: false
                    })
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
            let hasNull = results.some((item) => item === null);
            if (!hasNull) {
                    setImagesNote([...imagesNote, ...results]);
            }
            // Xử lý kết quả upload
            results.forEach((result, index) => {
                if (result) {
                    console.log(`Upload image ${imageArray[index]} successfully`);
                } else {
                    console.log(`Failed to upload image ${imageArray[index]}`);
                }
            });
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    }

    const handleRemoveImage = (index: number, url: string) => {
        let fileName = url.split("/").pop();
        const indexToRemoveLocal = imagesNote.findIndex(
            (item: string) => item.split("/").pop() === fileName
        );
        if (indexToRemoveLocal !== -1) {
            const updatedImages = [...imagesNote];
            updatedImages.splice(indexToRemoveLocal, 1);
            setImagesNote(updatedImages);
        }
    }

    const getConvertedUnitsForGroup = () => {
        return detailUnitGroupData ? detailUnitGroupData.uomGroupLines : [];
    };

    return (
        <FormProvider {...methods}>
            <View style={styles.ROOT}>
                <Header
                    type={"AntDesign"}
                    LeftIcon={Images.back}
                    onLeftPress={() => navigation.goBack()}
                    colorIcon={colors.text}
                    headerTx={"createProductScreen.editClassify"}
                    style={{ height: scaleHeight(54) }}
                />
                <ScrollView style={{ marginBottom: scaleHeight(10) }}>
                    <View style={{ backgroundColor: "white" }}>
                        <View
                            style={styles.viewViewDetail}>
                            <ImageProduct
                                arrData={imagesNote}
                                uploadImage={(imageArray, checkUploadSlider, indexItem) => uploadImages(imageArray)}
                                deleteImage={(index, item) => {
                                    handleRemoveImage(index, item);
                                }}
                            />
                            <Controller
                                control={methods.control}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextField
                                        // maxLength={maxLenngthPhoneNumber}
                                        keyboardType={null}
                                        labelTx={"productScreen.SKU"}
                                        style={{
                                            marginBottom: scaleHeight(15),
                                            justifyContent: "center",
                                        }}
                                        inputStyle={{ fontSize: fontSize.size16, fontWeight: "500" }}
                                        value={value}
                                        onBlur={onBlur}
                                        RightIconClear={Images.icon_delete2}
                                        error={methods.formState.errors?.SKU?.message}
                                        onClearText={() => onChange("")}
                                        onChangeText={(value) => {
                                            onChange(value)
                                        }}
                                        placeholderTx="productScreen.placeholderSKU"
                                        RightIcon={Images.ic_QR}
                                        editable={false}
                                    />
                                )}
                                name="SKU"
                            />
                            <Controller
                                control={methods.control}
                                render={({ field: { onChange, value, onBlur } }) => (
                                    <TextField
                                        // maxLength={maxLenngthPhoneNumber}
                                        keyboardType={null}
                                        labelTx={"productScreen.productName"}
                                        style={{
                                            marginBottom: scaleHeight(15),
                                            justifyContent: "center",
                                        }}
                                        inputStyle={{ fontSize: fontSize.size16, fontWeight: "500" }}
                                        value={value}
                                        onBlur={onBlur}
                                        RightIconClear={Images.icon_delete2}
                                        error={methods.formState.errors.productName?.message}
                                        onClearText={() => onChange("")}
                                        onChangeText={(value) => {
                                            onChange(value);
                                        }}
                                        placeholderTx="productScreen.placeholderProductName"
                                        isImportant
                                    />
                                )}
                                name="productName"
                            />
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text tx="createProductScreen.canBuy"
                                    style={{
                                        fontSize: fontSize.size13,
                                        marginRight: scaleWidth(10),
                                    }} />
                                <Switch
                                    value={valuePurchase}
                                />
                            </View>
                            <ItemGroupPrice />
                        </View>
                    </View>
                    {valuePurchase ? (
                        <View
                            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
                            <View
                                style={styles.viewViewDetail}>
                                <Text tx={"createProductScreen.infoSupplier"}
                                    style={styles.textTitleView} />
                                <TouchableOpacity
                                    // onPress={() => goToChooseSupplierScreen()}
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                    {vendor?.length > 0 ? (
                                        <Text
                                            style={styles.textWeight400Black}>
                                            {vendor.length + " " + translate("createProductScreen.supplier")}
                                        </Text>
                                    ) : (
                                        <Text tx={"createProductScreen.noSelectSupplier"}
                                            style={styles.textWeight400Dolphin} />
                                    )}
                                    <Images.icon_caretRight
                                        width={scaleWidth(16)}
                                        height={scaleHeight(16)}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null}
                    <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
                        <View
                            style={styles.viewViewDetail}>
                            <Text tx={"createProductScreen.infoMore"}
                                style={styles.textTitleView} />
                            <ProductAttribute
                                labelTx="inforMerchant.Category"
                                value={dataEdit?.productCategory?.name}
                            />
                            <ProductAttribute
                                labelTx="productScreen.trademark"
                                value={dataEdit?.brand?.name}
                            />
                            <ProductAttribute
                                labelTx="productScreen.tag"
                                value={dataEdit?.productTags?.flatMap((item: any) => item.name).join(', ')}
                            />
                            <ProductAttribute
                                labelTx="createProductScreen.form_of_management"
                                value={getLabelByList(dataEdit?.managementForm)}
                            />
                        </View>
                    </View>
                    <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
                        <View
                            style={styles.viewViewDetail}>
                            <Text tx={valueSwitchUnit ? "productScreen.unit_group" : "createProductScreen.unit"}
                                style={styles.textTitleView} />
                            {valueSwitchUnit ? (
                                <>
                                    <View
                                        style={styles.viewLineSwitchUnit}>
                                        <Text tx={"createProductScreen.originalUnit"} style={{ fontSize: fontSize.size14 }} />
                                        {/* Hiển thị đơn vị gốc (baseUnit) từ arrDVT dựa trên group.label */}
                                        {detailUnitGroupData ? (
                                            <Text
                                                style={styles.textWeight600}>
                                                {detailUnitGroupData?.originalUnit?.name}
                                            </Text>
                                        ) : null}
                                    </View>
                                    <View
                                        style={styles.viewLineSwitchUnit}>
                                        <Text tx={"createProductScreen.conversion"} style={{ fontSize: fontSize.size14 }} />
                                        <Text tx={"createProductScreen.conversionRate"}
                                            style={styles.textWeight600} />
                                    </View>
                                    {getConvertedUnitsForGroup()?.map((item: any, index: any) => (
                                        <View
                                            key={index}
                                            style={styles.viewLineSwitchUnit}>
                                            <View
                                                style={{ flexDirection: "row", alignItems: "center" }}>
                                                <Images.ic_arrowDownRight
                                                    width={scaleWidth(14)}
                                                    height={scaleHeight(14)}
                                                />
                                                <Text
                                                    style={{
                                                        fontSize: fontSize.size14,
                                                        marginHorizontal: scaleWidth(6),
                                                    }}>
                                                    {item.unitName}
                                                </Text>
                                            </View>
                                            <Text
                                                style={styles.textWeight600}>
                                                {item.conversionRate} {detailUnitGroupData?.originalUnit?.name}
                                            </Text>
                                        </View>
                                    ))}
                                </>
                            ) : (
                                <ProductAttribute
                                    labelTx="createProductScreen.unit"
                                    value={dataEdit?.uom?.name}
                                />
                            )}
                        </View>
                    </View>
                    {addWeight ? (
                        <View
                            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
                            <View style={[styles.viewViewDetail]}>
                                <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                                    onPress={() => {
                                        methods.setValue('volumeOriginal', typeVariant === 'variant' ? dataEdit?.baseProductPackingLine?.volume?.toString() : dataEdit?.baseTemplatePackingLine?.volume?.toString())
                                        methods.setValue('weightOriginal', typeVariant === 'variant' ? dataEdit?.baseProductPackingLine?.weight?.toString() : dataEdit?.baseTemplatePackingLine?.weight?.toString())
                                        methods.setValue('weight', typeVariant === 'variant' ? (dataEdit?.productPackingLines !== null ? dataEdit?.productPackingLines?.map((item: any) => {
                                            return {
                                                weight1: formatCurrency(commasToDots(item.weight?.toString())), volume: formatCurrency(commasToDots(item.volume?.toString())),
                                                unit: {
                                                    ...item.uomGroupLineOutput,
                                                    label: item.uomGroupLineOutput.unitName
                                                }
                                            }
                                        }) : []) : (dataEdit?.templatePackingLines !== null ? dataEdit?.templatePackingLines?.map((item: any) => {
                                            return {
                                                weight1: formatCurrency(commasToDots(item.weight?.toString())), volume: formatCurrency(commasToDots(item.volume?.toString())),
                                                unit: {
                                                    ...item.uomGroupLineOutput,
                                                    label: item.uomGroupLineOutput.unitName
                                                }
                                            }
                                        }) : []))
                                    }}>
                                    <Text tx={'productScreen.reset'} style={{ color: colors.navyBlue, fontSize: fontSize.size14 }} />
                                </TouchableOpacity>
                                <ItemWeight
                                    dataUnitGroup={valueSwitchUnit == false ? [] : detailUnitGroupData?.uomGroupLines}
                                    checkList={valueSwitchUnit}
                                    data={valueSwitchUnit == false ? uomId : detailUnitGroupData?.originalUnit}
                                    setAdd={methods.watch(`weight`)}
                                />
                            </View>
                        </View>
                    ) : null}
                    {addDescribe ? (
                        <View
                            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
                            <View
                                style={styles.viewViewDetail}>
                                <View>
                                    <View style={{ flexDirection: "row", alignContent: "center" }}>
                                        <Text tx={"createProductScreen.description"}
                                            style={styles.textTitleView} />
                                    </View>
                                </View>
                                <Text text={description} />
                            </View>
                        </View>
                    ) : null}
                    {/* <View style={styles.viewLine2} /> */}
                    {nameValue || attributes ? (
                        <View style={{ backgroundColor: 'white', marginTop: scaleHeight(16) }}>
                            <View >
                                <TouchableOpacity
                                    style={styles.viewAttribute}
                                    onPress={toggleDetails}>
                                    <Text tx="detailScreen.detailProperty" style={{ color: colors.palette.navyBlue, marginRight: scaleWidth(5), fontSize: fontSize.size12 }} />
                                    <Images.iconDownBlue
                                        width={scaleWidth(16)}
                                        height={scaleHeight(16)}
                                        style={{
                                            transform: [{ rotate: showDetails ? "180deg" : "0deg" }],
                                        }}
                                    />
                                </TouchableOpacity>

                            </View>
                            {showDetails && (
                                <View style={[styles.viewDetails, { marginHorizontal: scaleWidth(16) }]}>
                                    <View style={styles.viewTitleDetail}>
                                        <Text tx="createProductScreen.property" style={{ fontWeight: "600", fontSize: fontSize.size12 }}/>
                                        <Text tx="createProductScreen.value" style={{ fontWeight: "600", fontSize: fontSize.size12 }}/>
                                    </View>
                                    {dataEdit?.productTemplate == null ? (
                                        <View>
                                            <View style={styles.viewLine2} />
                                            {nameValue?.map((item: any, index: number) => (
                                                <View
                                                    style={{
                                                        marginTop: scaleHeight(margin.margin_12),
                                                    }}>
                                                    <ProductAttribute
                                                        label={item.name}
                                                        value={item.value}
                                                        styleAttribute={{
                                                            paddingHorizontal: scaleWidth(padding.padding_12),
                                                        }}
                                                    />
                                                    {index !== nameValue.length - 1 ? (
                                                        <View style={styles.viewLine2} />
                                                    ) : null}
                                                </View>
                                            ))}
                                        </View>
                                    ) : (
                                        <View>
                                            {attributes?.map((item: any, index: any) => (
                                                <View key={index}>
                                                    <View
                                                        style={{
                                                            marginVertical: scaleHeight(margin.margin_12),
                                                            paddingHorizontal: scaleWidth(padding.padding_12),
                                                        }}>
                                                        <Text
                                                            style={{
                                                                fontWeight: "600",
                                                                fontSize: fontSize.size12,
                                                                color: colors.palette.navyBlue,
                                                            }}>
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style={styles.viewLine2} />
                                                    {item.items?.map((dto: any) => (
                                                        <View
                                                            style={{
                                                                marginTop: scaleHeight(margin.margin_12),
                                                            }}>
                                                            <ProductAttribute
                                                                label={dto.name}
                                                                value={dto.value.join('/')}
                                                                styleAttribute={{
                                                                    paddingHorizontal: scaleWidth(padding.padding_12),
                                                                }}
                                                            />
                                                            {index !== attributes?.length - 1 ? (
                                                                <View style={styles.viewLine2} />
                                                            ) : null}
                                                        </View>
                                                    ))}
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            )}
                        </View>
                    ) : null}
                </ScrollView>
                <View
                    style={styles.viewGroupBtn}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                        style={styles.viewBtnCancel}>
                        <Text tx={"common.cancel"} style={{ fontSize: fontSize.size14 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={methods.handleSubmit(submitAdd)}
                        style={styles.viewBtnConfirm}>
                        <Text tx={"createProductScreen.done"} style={{ fontSize: fontSize.size14, color: "white" }} />
                    </TouchableOpacity>
                </View>
            </View>
        </FormProvider>
    );
};
