import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  TouchableOpacity,
  View,
} from "react-native";
import { Svgs } from "../../../../../assets/svgs";
import { Header } from "../../../../components/header/header";
import { Text } from "../../../../components/text/text";
import { colors, fontSize, margin, padding, scaleHeight, scaleWidth } from "../../../theme";
import { styles } from "./styles"
import { ScrollView } from "react-native-gesture-handler";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { TextField } from "../../../../components/text-field/text-field";
import { Switch } from "../../../../components";
import { InputSelect } from "../../../../components/input-select/inputSelect";
import DescribeModal from "../component/modal-describe";
import { useStores } from "../../../models";
import {
  checkArrayIsEmptyOrNull,
  commasToDots,
  formatCurrency,
  formatNumberByString,
  formatStringToFloat,
  mapDataDistribute,
  validateFileSize,
} from "../../../utils/validate";

import { ALERT_TYPE, Dialog, Toast, Loading } from "../../../../components/dialog-notification";
import { translate } from "../../../i18n/translate";
import UnitModal from "../component/modal-unit";
import ItemWeight from "../component/weight-component";
import ImageProduct from "../create-prodcut/imageProduct";
import { ItemGroupPrice, ItemMoreInformation, ItemUnit } from "../component/itemCreateProduct";
import { ItemVariant } from "../component/itemVariant";
import en from "../../../i18n/en";


export const ProductEditScreen: FC = (item) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imagesNote, setImagesNote] = useState<any>();
  const [valuePurchase, setValuePurchase] = useState(false);
  const [valueSwitchUnit, setValueSwitchUnit] = useState(false);
  const [modalDescribe, setModalDescribe] = useState(false);
  const [addDescribe, setAddDescribe] = useState(false);
  const [addVariant, setAddVariant] = useState(false);
  const [arrUnitGroupData, setUnitGroupData] = useState([] as any);
  const [detailUnitGroupData, setDetailUnitGroupData] = useState<{ uomGroupLines: any, originalUnit: any }>({ uomGroupLines: [], originalUnit: '' });
  const [addWeight, setAddWeight] = useState(false);
  const [attributeIds, setAttributeIds] = useState<number[]>([]);
  const [description, setDescription] = useState("");
  const [attributeValues, setAttributeValues] = useState<{}[]>([]);
  const [textAttributes, setTextAttributes] = useState<{}[]>([]);
  const [modalcreateUnit, setModalcreateUnit] = useState(false);
  const [arrIdOrigin, setArrIdOrigin] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [attributeToEdit, setAttributeToEdit] = useState<{}[]>([]);
  const [constAttributeToEdit, setConstAttributeToEdit] = useState<{}[]>([]);
  const [dropdownToEdit, setDropdownToEdit] = useState<{}[]>([]);
  const [defaultTags, setDefaultTags] = useState([]);
  const { productStore, unitStore, categoryStore, vendorStore } = useStores();
  const [dataCreateProduct, setDataCreateProduct] = useState<{ imageUrls: string[], retailPrice: {}[], wholesalePrice: {}[] }[]>([]);
  const [productUsing, setProductUsing] = useState(false);
  const [priceUsing, setPriceUsing] = useState(false);
  const [dataOldCreateProduct, setDataOldCreateProduct] = useState([]);
  const [hasVariantInConfig, setVariantInConfig] = useState(false);
  const [dataGroupAttribute, setDataGroupAttribute] = useState([]);
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const methods = useForm({
    defaultValues: {
      productName: '', costPrice: '', listPrice: '', SKU: '', weight: [],
      weightOriginal: '', volumeOriginal: '', retailPriceProduct: [], wholesalePriceProduct: [],
      tags: [], brand: {}, brands: {
        id: 0,
        label: "Mặc định",
        label2: "DEFAULT",
      }, category: {}
    }
  })
  const [uomId, setUomId] = useState({ id: 0, label: "", uomGroupLineId: 0 });
  const [uomGroupId, setUomGroupId] = useState({ id: "", label: "" });
  const {
    selectedIds,
    idUnitGroup,
    nameUnitGroup,
    attributeArr,
    dropdownSelected,
    dataEdit,
    isVariantInConfig,
    selectedGroupAttribute,
    newDataCreateProduct
  }: any = route?.params || {};


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (dataEdit !== undefined) {
        if (dataEdit.hasVariantInConfig == false) {
          setDataGroupAttribute(dataEdit.attributeCategory);
          setVariantInConfig(dataEdit.hasVariantInConfig);
          if (dataEdit.attributeCategory.length > 0) {
            setAddVariant(true)
          }
        }
      }
    });
    return unsubscribe;
  }, [dataEdit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (selectedGroupAttribute !== undefined && isVariantInConfig !== undefined) {
        setAddVariant(true)
        setDataGroupAttribute(selectedGroupAttribute);
        setVariantInConfig(isVariantInConfig);
      }
    });
    return unsubscribe;
  }, [selectedGroupAttribute, isVariantInConfig]);


  useEffect(() => {
    console.log("----nameUnitGroup-----", nameUnitGroup);
    const dataModified = {
      id: idUnitGroup,
      label: nameUnitGroup,
    };
    setUomGroupId(dataModified);
  }, [nameUnitGroup]);

  useEffect(() => {
    if (idUnitGroup !== undefined) {
      getDetailUnitGroup(idUnitGroup);
    }
  }, [idUnitGroup]);

  useEffect(() => {
    setVendor(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    // getListUnitGroup(false);
    getCheckUsingProduct();

    if (dataEdit !== undefined) {
      console.log("--------------dataEdit---------------------", dataEdit);
      const newDataEdit = JSON.parse(JSON.stringify(dataEdit));
      const valueAttributeArr:
        | ((prevState: never[]) => never[])
        | { productAttributeId: any; productAttributeValueId: any }[] = [];
      const textAttributeArr:
        | ((prevState: never[]) => never[])
        | { productAttributeId: any; value: any }[] = [];
      newDataEdit?.attributeCategory?.forEach(
        (item: { attributeOutputList: any[] }) => {
          item.attributeOutputList.forEach(
            (items: { displayType: string; productAttributeValue: any[] }) => {
              if (items.displayType === "TEXTFIELD") {
                items.productAttributeValue.forEach(
                  (dto: { productAttributeId: any; value: any }) => {
                    textAttributeArr.push({
                      productAttributeId: dto.productAttributeId,
                      value: dto.value,
                    });
                  }
                );
              }
              if (items.displayType === "CHECKBOX") {
                items.productAttributeValue.forEach(
                  (dto: { productAttributeId: any; id: any }) => {
                    valueAttributeArr.push({
                      productAttributeId: dto.productAttributeId,
                      productAttributeValueId: dto.id,
                    });
                  }
                );
              }
            }
          );
        }
      );
      setAttributeValues(valueAttributeArr);
      setTextAttributes(textAttributeArr);
      setVariantInConfig(newDataEdit?.hasVariantInConfig);

      const dropdownEdit:
        | ((prevState: never[]) => never[])
        | { text: any; value: any }[] = [];
      newDataEdit?.attributeCategory?.forEach(
        (item: { name: any; id: any }) => {
          dropdownEdit.push({ text: item.name, value: item.id });
        }
      );
      setDropdownToEdit(dropdownEdit);

      const attributeEdit:
        | ((prevState: never[]) => never[])
        | {
          productAttributeId: any;
          value: any;
          activated?: any;
          sequence?: any;
          id?: any;
          idGroup?: any;
        }[] = [];

      newDataEdit?.attributeCategory?.forEach(
        (item: { attributeOutputList: any[]; id?: any }) => {
          item.attributeOutputList.forEach(
            (items: { displayType: string; productAttributeValue: any[] }) => {
              // if (items.displayType === 'SELECT_BOX') {
              if (items.displayType === "CHECKBOX") {
                items.productAttributeValue.forEach(
                  (dto: {
                    productAttributeId: any;
                    value: any;
                    activated: any;
                    sequence: any;
                    id: any;
                  }) => {
                    attributeEdit.push({
                      productAttributeId: dto.productAttributeId,
                      value: dto.value,
                      activated: dto.activated,
                      sequence: dto.sequence,
                      id: dto.id,
                      idGroup: item.id,
                    });
                  }
                );
              }
              if (items.displayType === "TEXTFIELD") {
                items.productAttributeValue.forEach(
                  (dto: { productAttributeId: any; value: any }) => {
                    attributeEdit.push({
                      productAttributeId: dto.productAttributeId,
                      value: dto.value,
                      idGroup: item.id,
                    });
                  }
                );
              }
            }
          );
        }
      );
      setConstAttributeToEdit(attributeEdit);
      setAttributeToEdit(attributeEdit);

      if (newDataEdit?.baseTemplatePackingLine?.weight !== null && newDataEdit?.baseTemplatePackingLine?.volume !== null && newDataEdit?.baseTemplatePackingLine !== null) {
        setAddWeight(true)
      }
      methods.setValue('costPrice', newDataEdit?.costPrice?.toString())
      methods.setValue('listPrice', newDataEdit?.listPrice?.toString())
      methods.setValue('retailPriceProduct', newDataEdit?.retailPrice)
      methods.setValue('wholesalePriceProduct', newDataEdit?.wholesalePrice)
      methods.setValue('SKU', newDataEdit?.sku)
      methods.setValue('productName', newDataEdit?.name)
      methods.setValue('volumeOriginal', newDataEdit?.baseTemplatePackingLine?.volume?.toString())
      methods.setValue('weightOriginal', newDataEdit?.baseTemplatePackingLine?.weight?.toString())
      methods.setValue('weight', newDataEdit?.templatePackingLines?.map((item: any) => {
        return {
          weight1: formatCurrency(commasToDots(item.weight?.toString())), volume: formatCurrency(commasToDots(item.volume?.toString())),
          unit: {
            ...item.uomGroupLineOutput,
            label: item.uomGroupLineOutput?.unitName
          }
        }
      }))
      if (newDataEdit?.description !== "" && newDataEdit?.description !== null) {
        setAddDescribe(true);
        setDescription(newDataEdit?.description);
      }
      if (newDataEdit?.brand !== null) {
        methods.setValue('brand', {
          id: newDataEdit?.brand?.id,
          label: newDataEdit?.brand?.name,
        });
      } else {
        methods.setValue('brand', { id: 0, label: "" });
      }
      const newArr = newDataEdit?.productTags?.map(
        (items: { name: any; id: any }) => {
          return { text: items.name, value: items.id };
        }
      );
      const abc: any = [...new Set(newDataEdit?.attributeCategory?.flatMap((item: any) => item.id))]
      setAttributeIds(abc)
      const newArr1 = newArr?.map((item: { value: any }) => item.value);
      setDefaultTags(newArr);
      methods.setValue('brands', {
        label2: dataEdit?.managementForm,
        id: 0,
        label: getLabelByList(dataEdit?.managementForm),
      });
      if (newDataEdit?.productVariants) {
        setAddVariant(true);
        const newArr = newDataEdit?.productVariants.map((items: any) => {
          return {
            ...items, name: items.name.split('- ').slice(1).join('-'),
            weight: {
              weight: items.productPackingLines?.map((item: any) => {
                return {
                  unit: {
                    ...newDataEdit?.uomGroup.uomGroupLines.filter((item1: any) => item1.id === item.uomGroupLineId)[0],
                    label: newDataEdit?.uomGroup?.uomGroupLines.filter((item1: any) => item1.id === item?.uomGroupLineId)[0]?.unitName
                  },
                  weight1: formatCurrency(commasToDots(item.weight)),
                  volume: formatCurrency(commasToDots(item.volume)),
                }
              }),
              weightOriginal: formatCurrency(commasToDots(items.baseProductPackingLine?.weight)),
              volumeOriginal: formatCurrency(commasToDots(items.baseProductPackingLine?.volume)),
              // uom: {

              // }
            }
          }
        })
        setDataCreateProduct(newArr);
        setDataOldCreateProduct(newDataEdit?.productVariants);
      }
      methods.setValue('category', {
        id: newDataEdit?.productCategory?.id,
        label: newDataEdit?.productCategory?.name,
      });
      setImagesNote(newDataEdit?.imageUrls);
      setValuePurchase(newDataEdit?.purchaseOk);
      setValueSwitchUnit(newDataEdit?.hasUomGroupInConfig);
      getListUnitGroup(newDataEdit?.hasUomGroupInConfig)
      setUomId({ id: newDataEdit?.uom?.id, label: newDataEdit?.uom?.name, uomGroupLineId: newDataEdit?.uomGroup?.uomGroupLineId });
      setUomGroupId({
        id: newDataEdit?.uomGroupId,
        label: newDataEdit?.uomGroup?.name,
      });
      setDetailUnitGroupData(newDataEdit?.uomGroup);
      if (newDataEdit?.vendors?.length !== 0) {
        const a = newDataEdit?.vendors?.map((item: { vendorId: any }) => {
          return item.vendorId;
        });
        setVendor(a);
        setValuePurchase(true);
      }
      const nameCreateProduct = newDataEdit?.productVariants?.map(
        (item: { name: string }) => {
          const a = item.name.split("-");
          a.shift();
          const b = a.join("-");
          return b;
        }
      );
      nameCreateProduct?.forEach((item: any, index: string | number) => {
        newDataEdit.productVariants[index].name = item;
      });
      const idCreateProduct = newDataEdit?.productVariants?.map(
        (item: { id: any }) => {
          return item.id;
        }
      );
      setArrIdOrigin(idCreateProduct);
    }
  }, [dataEdit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (newDataCreateProduct !== undefined) {
        setDataCreateProduct(newDataCreateProduct);
      }
    });
    return unsubscribe;
  }, [newDataCreateProduct]);

  const arrBrands = [
    { id: 3746, label: "Mặc định", label2: "DEFAULT" },
    { id: 4638, label: "Lô", label2: "LOTS" },
    { id: 4398, label: "Serial", label2: "SERIAL" },
  ];
  const getLabelByList = (label2: string) => {
    const item = arrBrands.find((item) => item.label2 === label2);
    return item ? item.label : "";
  };

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

  const getListUnitGroup = async (valueSwitchUnit: boolean) => {
    let unitResult = null;
    if (valueSwitchUnit) {
      unitResult = await unitStore.getListUnitGroup();
      console.log("getListUnitGroup---------------------:", unitResult);
    } else {
      unitResult = await unitStore.getListUnit();
      console.log("getListUnit---------------------:", unitResult);
    }
    if (unitResult && unitResult.kind === "ok") {
      const data = unitResult.result.data.content;
      let dataModified = data.map((obj: { id: any; name: any }) => {
        return {
          id: obj.id,
          label: obj.name,
        };
      });
      console.log("uomGroupId---------------------:", uomGroupId.id);

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
      const abc: any = [...new Set(attributeArr?.flatMap((item: any) => item.idGroup))]
      setAttributeIds(abc)

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
          id: null,
          name: item,
          imageUrls: imagesNote,
          costPrice: methods.getValues('costPrice'),
          retailPrice: methods.getValues('retailPriceProduct'),
          listPrice: methods.getValues('listPrice'),
          wholesalePrice: methods.getValues('wholesalePriceProduct'),
          attributeValues: [],
          weight: {
            weight: methods.getValues(`weight`), weightOriginal: methods.getValues(`weightOriginal`),
            volumeOriginal: methods.getValues(`volumeOriginal`), uom: valueSwitchUnit == false ? uomId : detailUnitGroupData?.originalUnit
          }
        };
      });

      newArr5.forEach((item: any, index) => (dataArr[index].attributeValues = item));

      const bMap = new Map(
        dataOldCreateProduct.map((item: { name: any }) => [item.name.trim(), item])
      );

      const updatedA = dataArr.map((item) => {
        return bMap.has(item.name.trim()) ? bMap.get(item.name.trim()) : item;
      });

      setDataCreateProduct(updatedA);
      setAttributeToEdit(attributeArr);
      setDropdownToEdit(dropdownSelected);
    }
  }, [attributeArr]);

  const getCheckUsingProduct = async () => {
    const data = await productStore.usingProductCheck(productStore.productId);
    console.log("checkUsing:-------", data);
    if (data && data.kind === "ok") {
      const result = data.result.data;
      console.log("checkUsing:-------", result);
      setProductUsing(result.isUsingInAnotherService);
      setPriceUsing(result.isUsingInPriceList)
    } else {
      console.error("Failed to fetch check using:", data);
    }
  };

  const submitAdd = async (data: any) => {
    console.log('dataInput------------', data)
    if (data.productName.trim() === "") {
      methods.setError("productName", { type: 'validate', message: en.productScreen.pleaseEnterInformation })
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

      const unitVariant = dataCreateProduct.map((items: any) => {
        return items.weight?.weight?.flatMap((item: any) => item.unit) ?? [];
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
        (item: any) => Object?.keys(item)?.length === 0
      );
      const checkWeight1Variant = weight1Variant?.some((item: any) => item?.trim() === "");
      const checkVolumeVariant = volumeVariant?.some((item: any) => item?.trim() === "");
      const checkWeight1OriginalVariant = weight1OriginalVariant?.some((item: any) => item?.trim() === "");
      const checkVolumeOriginalVariant = volumeOriginalVariant?.some((item: any) => item?.trim() === "");
      if (checkUnit == true || checkWeight1 == true || checkVolume == true || data.weightOriginal.trim() === "" || data.volumeOriginal.trim() === "") {
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
    const newArr1: never[] = [];
    const newArr = dataCreateProduct?.map((item: any) => {
      return {
        ...item,
        productPackingLines: item.weight?.weight?.map((item: any) => {
          return {
            uomGroupLineId: item.unit.id,
            amount: item.unit.conversionRate,
            volume: formatStringToFloat(item?.volume),
            weight: formatStringToFloat(item?.weight1)
          }
        })
      };
    });
    arrIdOrigin?.forEach((item) => {
      let isUnique = true;
      newArr?.forEach((obj) => {
        if (obj.id === item) {
          isUnique = false;
        }
      });

      if (isUnique) {
        newArr1.push(item);
      }
    });
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
    const newArr3 = newArr.map((item: any) => {
      return {
        ...item,
        name: methods.getValues("productName") + " - " + item.name,
        imageUrls: item.imageUrls,
        costPrice: (item?.costPrice),
        retailPrice: item.retailPrice,
        listPrice: (item?.listPrice),
        wholesalePrice: item.wholesalePrice,
        attributeValues: item.attributeValues,
        baseProductPackingLine: item.weight?.weightOriginal?.trim() === "" || item.weight?.volumeOriginal?.trim() === "" ? {} : (valueSwitchUnit === false ? {
          uomGroupLineId: null,
          amount: 1,
          volume: formatStringToFloat(item.weight?.volumeOriginal),
          weight: formatStringToFloat(item.weight?.weightOriginal),
        } : {
          uomGroupLineId: detailUnitGroupData?.originalUnit?.uomGroupLineId,
          amount: 1,
          volume: formatStringToFloat(item.weight?.volumeOriginal),
          weight: formatStringToFloat(item.weight?.weightOriginal),
        }),
        productPackingLines: item.weight?.weightOriginal?.trim() === "" || item.weight?.volumeOriginal?.trim() === "" ? [] : (valueSwitchUnit == false ? [] : item.productPackingLines)
      };
    });
    const newArr2 = newArr3?.map((item) => {
      return {
        ...item,
        retailPrice: item.retailPrice?.map((items: any) => {
          return {
            ...items,
            price: Number(formatNumberByString(items.price)),
          };
        }),
        wholesalePrice: item.wholesalePrice?.map((items: any) => {
          return {
            ...items,
            price: Number(formatNumberByString(items.price)),
          };
        }),
        costPrice: Number(formatNumberByString(item.costPrice)),
        listPrice: Number(formatNumberByString(item.listPrice)),
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
      sku: data.SKU === "" ? null : data.SKU,
      name: data.productName,
      purchaseOk: valuePurchase,
      imageUrls: imagesNote,
      saleOk: true,
      vendorIds: vendor,
      managementForm: data.brands?.label2,
      productCategoryId: data.category?.id || null,
      brandId: data.brand?.id || null,
      tagIds: data.tags,
      hasUomGroupInConfig: valueSwitchUnit,
      uomId: valueSwitchUnit === false ? uomId.id : null,
      uomGroupId: valueSwitchUnit === false ? null : uomGroupId.id,
      // hasVariantInConfig: !checkArrayIsEmptyOrNull(dataCreateProduct),
      hasVariantInConfig: hasVariantInConfig === false ? hasVariantInConfig : !checkArrayIsEmptyOrNull(dataCreateProduct),
      attributeValues: attributeValues,
      attributeCategoryIds: attributeIds,
      textAttributes: textAttributes,
      description: description,
      productVariants: hasVariantInConfig === false ? [] : newArr2,
      retailPrice: dataPrice2,
      costPrice: Number(formatNumberByString(methods.watch('costPrice'))),
      listPrice: Number(formatNumberByString(methods.watch('listPrice'))),
      wholesalePrice: dataPrice,
      baseTemplatePackingLine: data.weightOriginal?.trim() === "" || data.volumeOriginal?.trim() === "" ? {} : {
        uomGroupLineId: valueSwitchUnit == false ? null : detailUnitGroupData?.originalUnit?.uomGroupLineId,
        amount: 1,
        volume: formatStringToFloat(data.volumeOriginal),
        weight: formatStringToFloat(data.weightOriginal)
      },
      productTemplatePackingLines: data.weightOriginal?.trim() === "" || data.volumeOriginal?.trim() === "" ? [] : valueSwitchUnit == false ? [] : packingLine,
      deleteVariantIds: newArr1,
    }
    console.log('dataCreate===========', JSON.stringify(doneData))
    const result = await productStore?.putProduct(productStore.productId, doneData);
    if (result.kind === "ok") {
      Dialog.show({
        type: ALERT_TYPE.INFO,
        title: translate("txtDialog.txt_title_dialog"),
        textBody: translate("txtDialog.product_repair_successful"),
        button2: translate("common.ok"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          navigation.navigate({ name: "productDetailScreen", params: { reload: true } } as never);
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

  const uploadImages = useCallback(async (
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
        console.log("results-------123 : ", JSON.stringify(imagesNote));
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
  }, [dataCreateProduct, imagesNote])

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
  }, [valueSwitchUnit])

  const handleAddNewUnitOrGroup = useCallback(() => {
    if (valueSwitchUnit) {
      navigation.navigate({ name: "createConversionGroup", params: { editScreen: true } } as never);
    } else {
      setModalcreateUnit(true);
    }
  }, [valueSwitchUnit])

  const handleSwitchUnit = useCallback(() => {
    // setUomGroupId({ id: "", label: "" })
    setValueSwitchUnit(!valueSwitchUnit);
    getListUnitGroup(!valueSwitchUnit);
    methods.setValue("weightOriginal", "");
    methods.setValue("volumeOriginal", "");
  }, [valueSwitchUnit])

  const handleRemoveImage = useCallback((index: number, url: string) => {
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
  }, [imagesNote])

  const handleDescribe = () => {
    setAddDescribe(true);
  };
  const handleCloseDescribe = () => {
    setAddDescribe(false);
  };
  const goToChooseSupplierScreen = () => {
    const listIds = vendor;
    navigation.navigate({ name: "ChooseVendorScreen", params: { listIds, mode: "edit" } } as never);
  };

  const editAttribute = () => {
    if (productUsing === true || priceUsing === true) {
      navigation.navigate({
        name: "editAttributeByEdit", params: {
          dataAttribute: attributeToEdit,
          constDataAttribute: constAttributeToEdit,
          dropdownSelected: dropdownToEdit,
          hasVariantInConfig: hasVariantInConfig
        }
      } as never);
    } else {
      navigation.navigate({
        name: "editAttribute", params: {
          dataAttribute: attributeToEdit,
          dropdownSelected: dropdownToEdit,
          editScreen: true,
          hasVariantInConfig: hasVariantInConfig
        }
      } as never);
    }
  }

  return (
    <FormProvider {...methods}>
      <View style={styles.ROOT}>
        <Header
          type={"AntDesign"}
          LeftIcon={Svgs.back}
          onLeftPress={() => navigation.goBack()}
          colorIcon={colors.text}
          headerTx={"createProductScreen.edit_product"}
          style={{ height: scaleHeight(54) }}
        />
        <ScrollView style={{ marginBottom: scaleHeight(20) }}>
          <View style={{ backgroundColor: "white" }}>
            <View style={styles.viewViewDetail}>
              <ImageProduct
                arrData={imagesNote}
                uploadImage={(imageArray, checkUploadSlider, indexItem) => uploadImages(imageArray, checkUploadSlider, indexItem)}
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
                    RightIconClear={Svgs.icon_delete2}
                    error={methods.formState.errors?.SKU?.message}
                    onClearText={() => onChange("")}
                    onChangeText={(value) => {
                      onChange(value)
                    }}
                    placeholderTx="productScreen.placeholderSKU"
                    RightIcon={Svgs.ic_QR}
                    editable={false}
                  // isImportant
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
                    RightIconClear={Svgs.icon_delete2}
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
                  onToggle={() => {
                    setValuePurchase(!valuePurchase);
                  }}
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
                  onPress={() => goToChooseSupplierScreen()}
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
                  <Svgs.icon_caretRight
                    width={scaleWidth(16)}
                    height={scaleHeight(16)}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
            <View style={styles.viewViewDetail}>
              <Text tx={'createProductScreen.inventory_management'}
                style={styles.textTitleView} />
              <Controller
                control={methods.control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <InputSelect
                    titleTx={"createProductScreen.form_of_management"}
                    isSearch={false}
                    required={true}
                    arrData={arrBrands}
                    dataDefault={value.label ?? ''}
                    onPressChoice={(item: any) => {
                      onChange(item);
                    }}
                    disabled={productUsing === true || priceUsing === true ? true : false}
                  />
                )}
                name="brands"
              />
            </View>
          </View>
          <ItemMoreInformation
            defaultTags={defaultTags} />
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
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
              <View style={[styles.viewViewDetail]}>
                <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, zIndex: 1 }}
                  onPress={() => {
                    setAddWeight(false)
                    methods.setValue('weightOriginal', '')
                    methods.setValue('volumeOriginal', '')
                    methods.setValue('weight', [])
                  }}>
                  <Svgs.icon_deleteDolphin />
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
          <ItemVariant
            handleEditAttribute={editAttribute}
            addVariant={addVariant}
            setAddVariant={setAddVariant}
            addWeight={addWeight}
            dataCreateProduct={dataCreateProduct}
            dataGroupAttribute={dataGroupAttribute}
            isVariantInConfig={isVariantInConfig}
            detailUnitGroupData={detailUnitGroupData}
            isUsing={productUsing === true || priceUsing === true ? true : false}
            uomId={uomId}
            valueSwitchUnit={valueSwitchUnit}
            productName={methods.getValues('productName')}
            setDataCreateProduct={(arr: any) => setDataCreateProduct(arr)}
            setDataGroupAttribute={(arr: any) => setDataGroupAttribute(arr)}
            setVariantInConfig={(a) => setVariantInConfig(a)}
            screen="edit"
          />
          {addDescribe ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
              <View style={styles.viewViewDetail}>
                <View>
                  <View style={{ flexDirection: "row", alignContent: "center" }}>
                    <Text tx={"createProductScreen.description"}
                      style={styles.textTitleView} />
                    {description ? (
                      <TouchableOpacity
                        onPress={() => {
                          setModalDescribe(true);
                        }}>
                        <Svgs.icon_edit
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
                    }}>
                    <Svgs.ic_close
                      width={scaleWidth(14)}
                      height={scaleHeight(14)}
                    />
                  </TouchableOpacity>
                </View>
                {description === "" || description === null ? (
                  <View style={{}}>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => setModalDescribe(true)}>
                      <Svgs.ic_plusCircleBlue
                        width={scaleWidth(14)}
                        height={scaleHeight(14)}
                      />
                      <Text tx={"createProductScreen.addDescription"}
                        style={styles.textWeight400Blue} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text text={description} />
                )}
              </View>
            </View>
          ) : null}
          <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
            <View style={styles.viewViewDetail}>
              <Text
                tx="createProductScreen.information"
                style={styles.textTitleView}
              />
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Svgs.icon_gear
                    width={scaleWidth(20)}
                    height={scaleHeight(20)}
                  />
                  {addDescribe === false ? (
                    <TouchableOpacity
                      onPress={handleDescribe}
                      style={styles.viewBtnInMorInfo}>
                      <Text tx={"createProductScreen.description"}
                        style={styles.textBtnMorInfo} />
                    </TouchableOpacity>
                  ) : null}
                  {addVariant === false ? (
                    <TouchableOpacity
                      onPress={() => setAddVariant(true)}
                      style={styles.viewBtnInMorInfo}>
                      <Text tx={"createProductScreen.productClassification"}
                        style={styles.textBtnMorInfo} />
                    </TouchableOpacity>
                  ) : null}
                  {addWeight === false ? (
                    <TouchableOpacity
                      onPress={() => setAddWeight(true)}
                      style={styles.viewBtnInMorInfo}>
                      <Text
                        tx={"createProductScreen.weight"}
                        style={styles.textBtnMorInfo}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {addDescribe === true && addVariant === true && addWeight === true ? (
                    <Text tx={"createProductScreen.notificationAddAllInfoProduct"}
                      style={{
                        marginLeft: scaleWidth(8),
                        fontSize: fontSize.size13,
                      }} />
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <DescribeModal
          titleTx={"productScreen.describe"}
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
          titleTx={"productScreen.createUnit"}
          isVisible={modalcreateUnit}
          setIsVisible={() => setModalcreateUnit(false)}
          onSave={(data) => {
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
