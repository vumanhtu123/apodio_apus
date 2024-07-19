import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Linking, TouchableOpacity, View } from "react-native";
import { Images } from "../../../../assets/index";
import { Header } from "../../../components/header/header";
import { Text } from "../../../components/text/text";
import {
  colors,
  fontSize,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { ScrollView } from "react-native-gesture-handler";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { TextField } from "../../../components/text-field/text-field";
import { Switch } from "../../../components";
import { InputSelect } from "../../../components/input-select/inputSelect";
import DescribeModal from "../component/modal-describe";
import { useStores } from "../../../models";
import {
  checkArrayIsEmptyOrNull,
  formatNumberByString,
  formatStringToFloat,
  mapDataDistribute,
  parternValidateSku,
  validateFileSize,
} from "../../../utils/validate";
import UnitModal from "../component/modal-unit";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
  Loading,
} from "../../../components/dialog-notification";
import { translate } from "../../../i18n/translate";
import ImageProduct from "./imageProduct";
import { styles } from "./styles";
import ItemWeight from "../component/weight-component";
import {
  ItemGroupPrice,
  ItemMoreInformation,
  ItemUnit,
} from "../component/itemCreateProduct";
import { ItemVariant } from "../component/itemVariant";

export const ProductCreateScreen: FC = (item) => {
  const navigation = useNavigation();
  const [imagesNote, setImagesNote] = useState<any>([]);
  const [valuePurchase, setValuePurchase] = useState(false);
  const [valueSwitchUnit, setValueSwitchUnit] = useState(false);
  const [modalDescribe, setModalDescribe] = useState(false);
  const [modalcreateUnit, setModalcreateUnit] = useState(false);
  const [addDescribe, setAddDescribe] = useState(false);
  const [addVariant, setAddVariant] = useState(false);
  const [addWeight, setAddWeight] = useState(false);
  const [dataGroupAttribute, setDataGroupAttribute] = useState([]);
  const [arrUnitGroupData, setUnitGroupData] = useState([] as any);
  const [detailUnitGroupData, setDetailUnitGroupData] = useState();
  const [description, setDescription] = useState("");
  const [attributeValues, setAttributeValues] = useState([]);
  const [attributeIds, setAttributeIds] = useState([]);
  const [textAttributes, setTextAttributes] = useState([]);
  const { productStore, unitStore, categoryStore, vendorStore } = useStores();
  const [dataCreateProduct, setDataCreateProduct] = useState([]);
  const [hasVariantInConfig, setVariantInConfig] = useState(false);
  const [uomGroupId, setUomGroupId] = useState({ id: "", label: "" });
  const [uomId, setUomId] = useState({ id: "", label: "", uomGroupLineId: "" });
  const route = useRoute();
  const {
    selectedIds,
    idUnitGroup,
    nameUnitGroup,
    attributeArr,
    dropdownSelected,
    newDataCreateProduct,
    isVariantInConfig,
    selectedGroupAttribute,
    resetData,
    goBackConversionGroup,
  }: any = route?.params || {};
  const methods = useForm({
    defaultValues: {
      productName: "",
      costPrice: "",
      listPrice: "",
      SKU: "",
      weight: [],
      weightOriginal: "",
      volumeOriginal: "",
      brands: {
        id: 0,
        label: "Mặc định",
        label2: "DEFAULT",
      },
      retailPriceProduct: [],
      wholesalePriceProduct: [],
    },
  });

  const arrBrands = [
    { id: 3746, label: "Mặc định", label2: "DEFAULT" },
    { id: 4638, label: "Lô", label2: "LOTS" },
    { id: 4398, label: "Serial", label2: "SERIAL" },
  ];

  useEffect(() => {
    getListUnitGroup(false);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (idUnitGroup !== undefined) {
        const dataModified = {
          id: idUnitGroup,
          label: nameUnitGroup,
        };
        setUomGroupId(dataModified);
        getDetailUnitGroup(idUnitGroup);
      }
    });
    return unsubscribe;
  }, [idUnitGroup]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (newDataCreateProduct !== undefined) {
        setDataCreateProduct(newDataCreateProduct);
      }
    });
    return unsubscribe;
  }, [newDataCreateProduct]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (
        selectedGroupAttribute !== undefined &&
        isVariantInConfig !== undefined
      ) {
        setDataGroupAttribute(selectedGroupAttribute);
        setVariantInConfig(isVariantInConfig);
      }
    });
    return unsubscribe;
  }, [selectedGroupAttribute, isVariantInConfig]);

  const getDetailUnitGroup = async (id: number) => {
    // call nhieu lan
    if (id) {
      const unitResult = await unitStore.getDetailUnitGroup(id);
      if (unitResult && unitResult.kind === "ok") {
        const data = unitResult.result.data;
        console.log("getDetailUnitGroup:-------------------", data);
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
    }
  };

  const editAttribute = useCallback(() => {
    navigation.navigate({
      name: "editAttribute",
      params: {
        dataAttribute: attributeArr,
        dropdownSelected: dropdownSelected,
        hasVariantInConfig: hasVariantInConfig,
      },
    } as never);
  },[])

  const getListUnitGroup = async (valueSwitchUnit: boolean) => {
    let unitResult = null;
    if (valueSwitchUnit) {
      unitResult = await unitStore.getListUnitGroup();
      console.log("getListUnitGroup---------------------:", unitResult);
    } else {
      unitResult = await unitStore.getListUnit();
      console.log(
        "getListUnit---------------------:",
        JSON.stringify(unitResult)
      );
    }
    if (unitResult && unitResult.kind === "ok") {
      const data = unitResult.result.data.content;
      let dataModified = data.map((obj: { id: any; name: any }) => {
        return {
          id: obj.id,
          label: obj.name,
        };
      });
      setUnitGroupData(dataModified);
    } else {
      console.error("Failed to fetch list unit:", unitResult);
    }
  };

  useEffect(() => {
    if (attributeArr !== undefined) {
      const groupedById = attributeArr.reduce(
        (
          acc: { [x: string]: any[] },
          obj: { productAttributeId: string | number }
        ) => {
          if (!acc[obj.productAttributeId]) {
            acc[obj.productAttributeId] = [];
          }
          acc[obj.productAttributeId].push(obj);
          return acc;
        },
        {}
      );
      const resultArray = Object.values(groupedById);
      const attributeValueArr: any = [];
      const textAttributeValueArr: any = [];
      const a = attributeArr.slice();
      a.forEach((item: { productAttributeId: any; id: any; value: any }) => {
        if ("id" in item) {
          attributeValueArr.push({
            productAttributeId: item.productAttributeId,
            productAttributeValueId: item.id,
          });
        } else {
          textAttributeValueArr.push({
            productAttributeId: item.productAttributeId,
            value: item.value,
          });
        }
      });

      setAttributeValues(attributeValueArr);
      setTextAttributes(textAttributeValueArr);
      const abc = [
        ...new Set(attributeArr?.flatMap((item: any) => item.idGroup)),
      ];
      setAttributeIds(abc);

      const newArr = mapDataDistribute(resultArray);
      const newArr2 = newArr.map((item) => {
        const a = item.split(" - ");
        const b = a.map((items) => {
          return attributeArr.filter(
            (dto: { value: string }) => dto.value === items
          );
        });
        return b;
      });
      const newArr3 = newArr2.map((item) =>
        item.flatMap((row) => row.concat.apply([], row))
      );
      const newArr4 = newArr3.map((items) => {
        const a = items.map((item) => {
          if (item.id !== undefined) {
            return {
              productAttributeId: item.productAttributeId,
              productAttributeValueId: item.id,
            };
          } else {
            return {};
          }
        });
        return a;
      });
      const newArr5 = newArr4.map((item) =>
        item.filter((object) => Object.keys(object).length > 0)
      );
      const dataArr = newArr.map((item) => {
        return {
          // id: null,
          name: item,
          imageUrls: imagesNote,
          costPrice: methods.getValues("costPrice"),
          retailPrice: methods.getValues("retailPriceProduct"),
          listPrice: methods.getValues("listPrice"),
          wholesalePrice: methods.getValues("wholesalePriceProduct"),
          attributeValues: [],
          weight: {
            weight: methods.getValues(`weight`),
            weightOriginal: methods.getValues(`weightOriginal`),
            volumeOriginal: methods.getValues(`volumeOriginal`),
            uom:
              valueSwitchUnit == false
                ? uomId
                : detailUnitGroupData?.originalUnit,
          },
        };
      });

      newArr5.forEach((item, index) => (dataArr[index].attributeValues = item));
      setDataCreateProduct(dataArr);
      console.log('data variants', JSON.stringify(dataArr))
    }
  }, [attributeArr]);

  const submitAdd = async (data: any) => {
    console.log(data, "1268359812");
    console.log(JSON.stringify(dataCreateProduct));
    if (parternValidateSku.test(data.SKU) === false) {
      methods.setError("SKU", {
        type: "validate",
        message: "Mã SKU gồm chữ và số",
      });
      return
    }
    if (data.productName.trim() === "") {
      methods.setError("productName", {
        type: "validate",
        message: "Vui lòng nhập thông tin",
      });
      return
    }
    if (uomId.id === "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.required_information"),
      });
      return
    }
    if (addWeight == true) {
      const unit = data.weight?.flatMap((items: any) => items.unit);
      const weight1 = data.weight?.flatMap((items: any) => items.weight1);
      const volume = data.weight?.flatMap((items: any) => items.volume);
      const checkUnit = unit?.some(
        (item: any) => Object.keys(item).length === 0
      );
      const checkWeight1 = weight1?.some((item: any) => item?.trim() === "");
      const checkVolume = volume?.some((item: any) => item?.trim() === "");

      const unitVariant = dataCreateProduct.map((items: any) => {
        return items.weight?.weight?.flatMap((item: any) => item.unit);
      }).flat()
      const weight1Variant = dataCreateProduct.map((items: any) => {
        return items.weight?.weight?.flatMap((item: any) => item.weight1);
      }).flat()
      const volumeVariant = dataCreateProduct.map((items: any) => {
        return items.weight?.weight?.flatMap((item: any) => item.volume);
      }).flat()
      const weight1OriginalVariant = dataCreateProduct.map((items: any) => {
        return items.weight?.weightOriginal
      })
      const volumeOriginalVariant = dataCreateProduct.map((items: any) => {
        return items.weight?.volumeOriginal
      })
      const checkUnitVariant = unitVariant?.some(
        (item: any) => Object.keys(item).length === 0
      );
      const checkWeight1Variant = weight1Variant?.some((item: any) => item?.trim() === "");
      const checkVolumeVariant = volumeVariant?.some((item: any) => item?.trim() === "");
      const checkWeight1OriginalVariant = weight1OriginalVariant?.some((item: any) => item?.trim() === "");
      const checkVolumeOriginalVariant = volumeOriginalVariant?.some((item: any) => item?.trim() === "");

      if (
        checkUnit == true ||
        checkWeight1 == true ||
        checkVolume == true ||
        data.weightOriginal.trim() === "" ||
        data.volumeOriginal.trim() === ""
      ) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.input_weight"),
        });
        return
      }

      if (checkUnitVariant == true || checkVolumeVariant == true || checkWeight1Variant == true || checkVolumeOriginalVariant == true || checkWeight1OriginalVariant == true) {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.input_weight_variant"),
        });
        return
      }
    }
    const arrDataNew = dataCreateProduct?.map((items: any) => {
      return {
        ...items,
        productPackingLines:
          items.weight?.weight.length !== 0
            ? items.weight?.weight?.map((item: any) => {
              return {
                uomGroupLineId: item.unit.id,
                amount: item.unit.conversionRate,
                volume: formatStringToFloat(item.volume),
                weight: formatStringToFloat(item.weight1),
              };
            })
            : [],
      };
    });

    const newArr = arrDataNew?.map((item) => {
      return {
        name: methods.watch("productName") + " - " + item.name,
        imageUrls: item.imageUrls,
        costPrice: formatStringToFloat(item.costPrice),
        retailPrice: item.retailPrice,
        listPrice: formatStringToFloat(item.listPrice),
        wholesalePrice: item.wholesalePrice,
        attributeValues: item.attributeValues,
        baseProductPackingLine:
          item.weight?.weightOriginal?.trim() === "" ||
            item.weight?.volumeOriginal?.trim() === ""
            ? {}
            : valueSwitchUnit === false
              ? {
                uomGroupLineId: null,
                amount: 1,
                volume: formatStringToFloat(item.weight?.volumeOriginal),
                weight: formatStringToFloat(item.weight?.weightOriginal),
              }
              : {
                uomGroupLineId:
                  detailUnitGroupData?.originalUnit?.uomGroupLineId,
                amount: 1,
                volume: formatStringToFloat(item.weight?.volumeOriginal),
                weight: formatStringToFloat(item.weight?.weightOriginal),
              },
        productPackingLines:
          item.weight?.weightOriginal?.trim() === "" ||
            item.weight?.volumeOriginal?.trim() === ""
            ? []
            : valueSwitchUnit == false
              ? []
              : item?.productPackingLines,
      };
    });
    const dataPrice2 = data.retailPriceProduct.map((item: any) => {
      return {
        min: Number(formatNumberByString(item.min.toString())),
        price: Number(formatNumberByString(item.price)),
      };
    });
    const dataPrice = data.wholesalePriceProduct.map((item: any) => {
      return {
        min: Number(formatNumberByString(item.min.toString())),
        price: Number(formatNumberByString(item.price)),
      };
    });
    const newArr2 = newArr.map((item) => {
      return {
        ...item,
        retailPrice: item.retailPrice?.map((items: any) => {
          return {
            ...items,
            min: Number(formatNumberByString(items.min.toString())),
            price: Number(formatNumberByString(items.price.toString())),
          };
        }),
        wholesalePrice: item.wholesalePrice?.map((items: any) => {
          return {
            ...items,
            min: Number(formatNumberByString(items.min.toString())),
            price: Number(formatNumberByString(items.price.toString())),
          };
        }),
        costPrice: Number(formatNumberByString(item.costPrice.toString())),
        listPrice: Number(formatNumberByString(item.listPrice.toString())),
      };
    });
    // const arrUrlRoot = imagesURLSlider.map((obj) => obj.result);
    console.log(
      "post-product-data---submitAdd---- : ",
      JSON.stringify(newArr)
    );
    // console.log("submitAdd---------------------:", imagesURLSlider);
    const packingLine = data.weight?.map((item: any) => {
      return {
        uomGroupLineId: item.unit.id,
        amount: item.unit.conversionRate,
        volume: formatStringToFloat(item.volume),
        weight: formatStringToFloat(item.weight1),
      };
    });
    const doneData = {
      sku: data.SKU === "" ? null : data.SKU,
      name: data.productName,
      purchaseOk: valuePurchase,
      imageUrls: imagesNote,
      saleOk: true,
      vendorIds: selectedIds! || [],
      managementForm: data.brands?.label2,
      productCategoryId: data.category?.id || null,
      brandId: data.brand?.id || null,
      tagIds: data.tags,
      hasUomGroupInConfig: valueSwitchUnit,
      uomId: valueSwitchUnit === false ? uomId.id : null,
      uomGroupId: valueSwitchUnit === false ? null : uomGroupId.id,
      hasVariantInConfig:
        hasVariantInConfig === false
          ? hasVariantInConfig
          : !checkArrayIsEmptyOrNull(newArr2),
      attributeValues: attributeValues,
      textAttributes: textAttributes,
      attributeCategoryIds: attributeIds,
      description: description,
      productVariants: hasVariantInConfig ? newArr2 : [],
      retailPrice: dataPrice2,
      costPrice: Number(formatNumberByString(methods.watch("costPrice"))),
      listPrice: Number(formatNumberByString(methods.watch("listPrice"))),
      wholesalePrice: dataPrice,
      deleteVariantIds: [],
      baseTemplatePackingLine:
        data.weightOriginal?.trim() === "" ||
          data.volumeOriginal?.trim() === ""
          ? {}
          : {
            uomGroupLineId:
              valueSwitchUnit == false
                ? null
                : detailUnitGroupData?.originalUnit?.uomGroupLineId,
            amount: 1,
            volume: formatStringToFloat(data.volumeOriginal),
            weight: formatStringToFloat(data.weightOriginal),
          },
      productTemplatePackingLines:
        data.weightOriginal?.trim() === "" ||
          data.volumeOriginal?.trim() === ""
          ? []
          : valueSwitchUnit == false
            ? []
            : packingLine,
      activated: true,
    };
    console.log("Done data create: ", JSON.stringify(doneData));
    const result = await productStore.postProduct(doneData);
    console.log("data test---------", JSON.stringify(result));
    if (result.kind === "ok") {
      navigation.navigate({
        name: "successScreen", params: {
          idProduct: result.result.data.id,
        }
      } as never);
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: translate("txtDialog.txt_title_dialog"),
        textBody: result.result.errorCodes[0].message,
        button: translate("common.ok"),
        closeOnOverlayTap: false,
      });
    }
  };

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
          setImagesNote([...imagesNote, ...results]);
        } else {
          const newArr = dataCreateProduct.slice();
          const newArr1 = newArr[indexItem].imageUrls.concat(results);
          dataCreateProduct[indexItem].imageUrls = newArr1;
          setDataCreateProduct(newArr);
        }
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
  };

  const handleSelectUnit = useCallback((item: any) => {
    if (valueSwitchUnit) {
      setUomGroupId(item);
      getDetailUnitGroup(item.id);
      methods.setValue("weight", []);
      methods.setValue("weightOriginal", "");
      methods.setValue("volumeOriginal", "");
    } else {
      setUomId(item);
      methods.setValue("weightOriginal", "");
      methods.setValue("volumeOriginal", "");
    }
  }, [])

  const handleAddNewUnitOrGroup = useCallback(() => {
    if (valueSwitchUnit) {
      navigation.navigate("createConversionGroup" as never);
    } else {
      setModalcreateUnit(true);
    }
  }, [])

  const handleSwitchUnit = useCallback(() => {
    // setUomGroupId({ id: "", label: "" })
    setValueSwitchUnit(!valueSwitchUnit);
    getListUnitGroup(!valueSwitchUnit);
    methods.setValue("weightOriginal", "");
    methods.setValue("volumeOriginal", "");
  }, [])

  const handleRemoveImage = useCallback((index: number, url: any) => {
    let fileName = url.split("/").pop();
    console.log("handleRemoveImage Slider---Root", fileName);
    const indexToRemoveLocal = imagesNote.findIndex(
      (item: string) => item.split("/").pop() === fileName
    );
    if (indexToRemoveLocal !== -1) {
      const updatedImages = [...imagesNote];
      updatedImages.splice(indexToRemoveLocal, 1);
      setImagesNote(updatedImages);
    }
  }, [])

  const goToChooseSupplierScreen = () => {
    const listIds = selectedIds;
    navigation.navigate({
      name: "ChooseVendorScreen",
      params: { listIds, mode: "create" },
    } as never);
  };

  const handleDescribe = () => {
    setAddDescribe(true);
  };
  const handleCloseDescribe = () => {
    setAddDescribe(false);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.ROOT}>
        <Header
          type={"AntDesign"}
          LeftIcon={Images.back}
          onLeftPress={() => navigation.goBack()}
          colorIcon={colors.text}
          headerTx={"productScreen.create_product"}
          style={{ height: scaleHeight(54) }}
        />
        <ScrollView style={{ marginBottom: scaleHeight(20) }}>
          <View style={{ backgroundColor: "white" }}>
            <View style={styles.viewViewDetail}>
              <ImageProduct
                arrData={imagesNote}
                uploadImage={(imageArray, checkUploadSlider, indexItem) =>
                  uploadImages(imageArray, checkUploadSlider, indexItem)
                }
                deleteImage={(index, item) => {
                  handleRemoveImage(index, item);
                }}
              />
              <Controller
                control={methods.control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextField
                    maxLength={50}
                    keyboardType={null}
                    labelTx={"productScreen.SKU"}
                    style={{
                      marginBottom: scaleHeight(15),
                      justifyContent: "center",
                    }}
                    inputStyle={styles.textTextField}
                    value={value}
                    onBlur={onBlur}
                    RightIconClear={Images.icon_delete2}
                    error={methods.formState.errors.SKU?.message}
                    onClearText={() => onChange("")}
                    onChangeText={(value) => {
                      onChange(value.toUpperCase());
                    }}
                    placeholderTx="productScreen.placeholderSKU"
                  />
                )}
                defaultValue={""}
                name="SKU"
              />
              <Controller
                control={methods.control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <TextField
                    // maxLength={100}
                    keyboardType={null}
                    labelTx={"productScreen.productName"}
                    style={{
                      marginBottom: scaleHeight(15),
                      justifyContent: "center",
                    }}
                    inputStyle={styles.textTextField}
                    value={value}
                    onBlur={onBlur}
                    RightIconClear={Images.icon_delete2}
                    error={methods.formState.errors.productName?.message}
                    onClearText={() => {
                      onChange("");
                    }}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    placeholderTx="productScreen.placeholderProductName"
                    isImportant
                  />
                )}
                defaultValue={""}
                name="productName"
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  tx="createProductScreen.canBuy"
                  style={{
                    fontSize: fontSize.size13,
                    marginRight: scaleWidth(10),
                  }}
                />
                <Switch
                  value={valuePurchase}
                  onToggle={() => {
                    setValuePurchase(!valuePurchase);
                  }}
                />
              </View>
              <ItemGroupPrice />
            </View>
          </View>
          {valuePurchase === true ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}
            >
              <View style={styles.viewViewDetail}>
                <Text
                  tx={"createProductScreen.infoSupplier"}
                  style={styles.textTitleView}
                />
                <TouchableOpacity
                  onPress={() => goToChooseSupplierScreen()}
                  style={[styles.viewLineSwitchUnit, { marginBottom: 0 }]}
                >
                  {selectedIds?.length > 0 ? (
                    <Text style={styles.textWeight400Black}>
                      {selectedIds.length + " " + translate("createProductScreen.supplier")} 
                    </Text>
                  ) : (
                    <Text
                      tx={"createProductScreen.noSelectSupplier"}
                      style={styles.textWeight400Dolphin}
                    />
                  )}
                  <Images.icon_caretRight
                    width={scaleWidth(16)}
                    height={scaleHeight(16)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <View
            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}
          >
            <View style={styles.viewViewDetail}>
              <Text
                tx={"createProductScreen.inventory_management"}
                style={styles.textTitleView}
              />
              <Controller
                control={methods.control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputSelect
                    titleTx={"createProductScreen.form_of_management"}
                    isSearch={false}
                    required={true}
                    arrData={arrBrands}
                    dataDefault={value?.label ?? ''}
                    onPressChoice={(item: any) => {
                      onChange(item);
                    }}
                  />
                )}
                name="brands"
              />
            </View>
          </View>
          <ItemMoreInformation defaultTags={[]} />
          <ItemUnit
            detailUnitGroupData={detailUnitGroupData}
            arrUnitGroupData={arrUnitGroupData}
            valueSwitchUnit={valueSwitchUnit}
            uomGroupId={uomGroupId}
            uomId={uomId}
            onChangeInput={(item) => handleSelectUnit(item)}
            addUnitOrGroup={() => handleAddNewUnitOrGroup()}
            onChangeSwitch={() => handleSwitchUnit()}
          />
          {addWeight ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}
            >
              <View style={[styles.viewViewDetail]}>
                <TouchableOpacity
                  style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                  onPress={() => {
                    setAddWeight(false);
                    methods.setValue("weightOriginal", "");
                    methods.setValue("volumeOriginal", "");
                    methods.setValue("weight", []);
                  }}
                >
                  <Images.icon_deleteDolphin />
                </TouchableOpacity>
                <ItemWeight
                  dataUnitGroup={
                    valueSwitchUnit == false
                      ? []
                      : detailUnitGroupData?.uomGroupLines
                  }
                  checkList={valueSwitchUnit}
                  data={
                    valueSwitchUnit == false
                      ? uomId
                      : detailUnitGroupData?.originalUnit
                  }
                  setAdd={methods.getValues(`weight`)}
                />
              </View>
            </View>
          ) : null}
          <ItemVariant
            handleEditAttribute={editAttribute}
            addVariant={addVariant}
            setAddVariant={setAddVariant}
            addWeight={addWeight}
            dataCreateProduct={dataCreateProduct}
            dataGroupAttribute={dataGroupAttribute}
            detailUnitGroupData={detailUnitGroupData}
            uomId={uomId}
            valueSwitchUnit={valueSwitchUnit}
            productName={methods.getValues('productName')}
            setDataCreateProduct={(arr: any) => setDataCreateProduct(arr)}
            setDataGroupAttribute={(arr: any) => setDataGroupAttribute(arr)}
            setVariantInConfig={(a) => setVariantInConfig(a)}
            screen="create"
          />
          {addDescribe ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}
            >
              <View style={styles.viewViewDetail}>
                <View>
                  <View
                    style={{ flexDirection: "row", alignContent: "center" }}
                  >
                    <Text
                      tx={"createProductScreen.description"}
                      style={styles.textTitleView}
                    />
                    {description ? (
                      <TouchableOpacity
                        onPress={() => {
                          setModalDescribe(true);
                        }}
                      >
                        <Images.icon_edit
                          style={{ marginLeft: scaleWidth(8) }}
                          width={scaleWidth(14)}
                          height={scaleHeight(14)}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    onPress={handleCloseDescribe}
                    style={{
                      position: "absolute",
                      right: 0,
                      flexDirection: "row",
                    }}
                  >
                    <Images.ic_close
                      width={scaleWidth(14)}
                      height={scaleHeight(14)}
                    />
                  </TouchableOpacity>
                </View>
                {description === "" ? (
                  <View style={{}}>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => setModalDescribe(true)}
                    >
                      <Images.ic_plusCircleBlue
                        width={scaleWidth(14)}
                        height={scaleHeight(14)}
                      />
                      <Text
                        tx={"createProductScreen.addDescription"}
                        style={styles.textWeight400Blue}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text text={description} />
                )}
              </View>
            </View>
          ) : null}
          <View
            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}
          >
            <View style={styles.viewViewDetail}>
              <Text
                tx="createProductScreen.information"
                style={styles.textTitleView}
              />
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Images.icon_gear
                    width={scaleWidth(20)}
                    height={scaleHeight(20)}
                  />
                  {addDescribe === false ? (
                    <TouchableOpacity
                      onPress={handleDescribe}
                      style={styles.viewBtnInMorInfo}
                    >
                      <Text
                        tx={"createProductScreen.description"}
                        style={styles.textBtnMorInfo}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {addVariant === false ? (
                    <TouchableOpacity
                      onPress={() => setAddVariant(true)}
                      style={styles.viewBtnInMorInfo}
                    >
                      <Text
                        tx={"createProductScreen.productClassification"}
                        style={styles.textBtnMorInfo}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {addWeight === false ? (
                    <TouchableOpacity
                      onPress={() => setAddWeight(true)}
                      style={styles.viewBtnInMorInfo}
                    >
                      <Text
                        tx={"createProductScreen.weight"}
                        style={styles.textBtnMorInfo}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {addDescribe === true &&
                    addVariant === true &&
                    addWeight === true ? (
                    <Text
                      tx={"createProductScreen.notificationAddAllInfoProduct"}
                      style={[
                        styles.textWeight400Dolphin,
                        { marginLeft: scaleWidth(8) },
                      ]}
                    />
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <DescribeModal
          title={"productScreen.describe"}
          isVisible={modalDescribe}
          dataDescribe={description}
          setIsVisible={() => setModalDescribe(false)}
          onCancel={() => setModalDescribe(false)}
          onConfirm={(data) => {
            setDescription(data.Describe);
            setModalDescribe(false);
          }}
        />
        <UnitModal
          title={"productScreen.createUnit"}
          isVisible={modalcreateUnit}
          setIsVisible={() => setModalcreateUnit(false)}
          onSave={(data) => {
            setModalcreateUnit(false);
            getListUnitGroup(false);
          }}
          onSaveAndChange={(data) => {
            setModalcreateUnit(false);
            setUomId(data);
            getListUnitGroup(false);
          }}
        />
        <View style={styles.viewGroupBtn}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.viewBtnCancel}
          >
            <Text tx={"common.cancel"} style={styles.textBtnCancel} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={methods.handleSubmit(submitAdd)}
            style={styles.viewBtnConfirm}
          >
            <Text
              tx={"createProductScreen.done"}
              style={styles.textBtnConfirm}
            />
          </TouchableOpacity>
        </View>
      </View>
    </FormProvider>
  );
};
