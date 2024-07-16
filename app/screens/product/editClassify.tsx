import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Images } from "../../../assets/index";
import { Header } from "../../components/header/header";
import { Text } from "../../components/text/text";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../theme";
import { products, suppliers, detailProduct, listCreateProduct } from "./data";
// import { styles } from "./styles"
import { AutoImage } from "../../../app/components/auto-image/auto-image";
import ProductAttribute from "./component/productAttribute";
import { ScrollView } from "react-native-gesture-handler";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { TextField } from "../../components/text-field/text-field";
import { Switch } from "../../components";
import { InputSelect } from "../../components/input-select/inputSelect";
import DropdownModal from "./component/multiSelect";
import PriceModal from "./component/modal-price";
import DescribeModal from "./component/modal-describe";
import { useStores } from "../../models";
import {
  addCommas,
  checkArrayIsEmptyOrNull,
  commasToDots,
  convertAttributeRetailPrice,
  convertAttributeWholesalePrice,
  convertRetailPrice,
  convertWholesalePrice,
  formatCurrency,
  formatNumber,
  formatNumberByString,
  formatStringToFloat,
  mapDataDistribute,
  removeNonNumeric,
  validateFileSize,
} from "../../utils/validate";

import {
  ALERT_TYPE,
  Dialog,
  Toast,
  Loading,
} from "../../components/dialog-notification";
import { translate } from "../../i18n/translate";
import UnitModal from "./component/modal-unit";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Modal from "react-native-modal/dist/modal";
import ImagesGroup from "./component/imageGroup";
import ItemWeight from "./component/weight-component";
import AutoHeightImage from "react-native-auto-height-image";

export const EditClassify: FC = (item) => {
  const route = useRoute();
  const reload = route?.params?.reload;
  const navigation = useNavigation();
  const [imagesNote, setImagesNote] = useState<any>();
  const [modalImage, setModalImage] = useState(false);
  const [valuePurchase, setValuePurchase] = useState(false);
  const [valueSwitchUnit, setValueSwitchUnit] = useState(true);
  const [modalRetailPrice, setModalRetailPrice] = useState(false);
  const [modalWholesalePrice, setModalWholesalePrice] = useState(false);
  const [modalRetailPrice1, setModalRetailPrice1] = useState(false);
  const [modalWholesalePrice1, setModalWholesalePrice1] = useState(false);
  const [wholesalePriceProduct, setWholesalePriceProduct] = useState([]);
  const [modalDescribe, setModalDescribe] = useState(false);
  const [addDescribe, setAddDescribe] = useState(false);
  const [addVariant, setAddVariant] = useState(false);
  const [dataBrand, setDataBrand] = useState([]);
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [sku, setSku] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [category, setCategory] = useState({ label: "", id: 0 });
  const [brand, setBrand] = useState({ label: "", id: 0 });
  const [brands, setBrands] = useState({ label: "", label2: "", id: 0 });
  const [dataTagConvert, setDataTagConvert] = useState<{}[]>([]);
  const [tags, setTags] = useState([]);
  const [arrUnitGroupData, setUnitGroupData] = useState([] as any);
  const [detailUnitGroupData, setDetailUnitGroupData] = useState();
  const [retailPriceProduct, setRetailPriceProduct] = useState([]);
  const [costPriceProduct, setCostPriceProduct] = useState(0);
  const [listPriceProduct, setListPriceProduct] = useState(0);
  const [addWeight, setAddWeight] = useState(false);
  const [attributeIds, setAttributeIds] = useState([]);
  const [description, setDescription] = useState("");
  const [indexVariant, setIndexVariant] = useState(0);
  const [attributeValues, setAttributeValues] = useState([]);
  const [textAttributes, setTextAttributes] = useState([]);
  const [modalcreateUnit, setModalcreateUnit] = useState(false);
  const [arrIdDelete, setArrIdDelete] = useState([]);
  const [arrIdOrigin, setArrIdOrigin] = useState([]);
  const [dataModal, setDataModal] = useState<{}[]>([{ min: "", price: "" }]);
  const [vendor, setVendor] = useState([]);
  const [unit, setUnit] = useState([{ id: "", label: "" }]);
  const [attributeToEdit, setAttributeToEdit] = useState([]);
  const [constAttributeToEdit, setConstAttributeToEdit] = useState([]);
  const [dropdownToEdit, setDropdownToEdit] = useState([]);
  const [defaultTags, setDefaultTags] = useState([]);
  const [isDeleteFailModalVisible, setIsDeleteFailModalVisible] =
    useState(false);
  const [errorContent, setErrorContent] = useState("");
  const { productStore, unitStore, categoryStore, vendorStore } = useStores();
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataCreateProduct, setDataCreateProduct] = useState([]);
  const [productUsing, setProductUsing] = useState(false);
  const [priceUsing, setPriceUsing] = useState(false);
  const [dataOldCreateProduct, setDataOldCreateProduct] = useState([]);
  const [hasVariantInConfig, setVariantInConfig] = useState(false);
  const [dataGroupAttribute, setDataGroupAttribute] = useState([]);
  const [showNCC, setShowNCC] = useState(false);
  const [arrNCC, setArrNCC] = useState([]);
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const methods = useForm({ defaultValues: { productName: '', costPrice: '', listPrice: '', SKU: '', weight: [], weightOriginal: '', volumeOriginal: '' } })
  const [uomId, setUomId] = useState({ id: "", label: "", uomGroupLineId: "" });
  const [uomGroupId, setUomGroupId] = useState({ id: "", label: "" });
  const [modalImages, setModalImages] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const refCarousel = useRef(null);
  const {
    selectedIds,
    idUnitGroup,
    nameUnitGroup,
    attributeArr,
    dropdownSelected,
    dataEdit,
    typeVariant,
    isVariantInConfig,
    selectedGroupAttribute,
    newDataCreateProduct,
    nameValue,
    attributes
  }: any = route?.params || {};


  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (dataEdit !== undefined) {
        if (dataEdit.hasVariantInConfig == false) {
          setAddVariant(true);
          setDataGroupAttribute(dataEdit.attributeCategory);
          setVariantInConfig(dataEdit.hasVariantInConfig);
        }
      }
    });
    return unsubscribe;
  }, [dataEdit]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (
        selectedGroupAttribute !== undefined &&
        isVariantInConfig !== undefined
      ) {
        setAddVariant(true);
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
  const [showDetails, setShowDetails] = useState(true);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    // getNameAndValue();
    // extractAttributeInfo(dataClassification.productTemplate)
    // selectDataClassification()
  };
  useEffect(() => {
    setVendor(selectedIds);
  }, [selectedIds]);
  useEffect(() => {
    console.log('first', nameValue)
    console.log('first2', attributes)
    console.log('first3', dataEdit)
  }, []);

  useEffect(() => {
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
      setVariantInConfig(dataEdit.newDataEdit);

      setUomId({
        id: newDataEdit?.uom?.id,
        label: newDataEdit?.uom?.name,
        uomGroupLineId: newDataEdit?.uomGroup?.uomGroupLineId,
      });

      if (newDataEdit.uomGroupId !== null) {
        getDetailUnitGroup(newDataEdit.uomGroupId);
      }

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
      console.log(attributeEdit, "yuefadyjafgsdyias");
      setConstAttributeToEdit(attributeEdit);
      setAttributeToEdit(attributeEdit);

      setRetailPriceProduct(dataEdit?.retailPrice);
      setWholesalePriceProduct(dataEdit?.wholesalePrice);
      // setCostPriceProduct(dataEdit?.costPrice);
      // setListPriceProduct(dataEdit?.listPrice);
      // setSku(dataEdit?.sku);
      if (
        newDataEdit?.baseTemplatePackingLine?.weight !== null &&
        newDataEdit?.baseTemplatePackingLine?.volume !== null
      ) {
        setAddWeight(true);
      }
      methods.setValue("costPrice", newDataEdit?.costPrice?.toString());
      methods.setValue("listPrice", newDataEdit?.listPrice?.toString());
      methods.setValue("SKU", newDataEdit?.sku);
      methods.setValue("productName", newDataEdit?.name);
      methods.setValue(
        "volumeOriginal",
        typeVariant === "variant"
          ? newDataEdit?.baseProductPackingLine?.volume?.toString()
          : newDataEdit?.baseTemplatePackingLine?.volume?.toString()
      );
      methods.setValue(
        "weightOriginal",
        typeVariant === "variant"
          ? newDataEdit?.baseProductPackingLine?.weight?.toString()
          : newDataEdit?.baseTemplatePackingLine?.weight?.toString()
      );
      methods.setValue(
        "weight",
        typeVariant === "variant"
          ? newDataEdit?.productPackingLines !== null
            ? dataEdit?.productPackingLines?.map((item: any) => {
              return {
                weight1: formatCurrency(
                  commasToDots(item.weight?.toString())
                ),
                volume: formatCurrency(commasToDots(item.volume?.toString())),
                unit: {
                  ...item.uomGroupLineOutput,
                  label: item.uomGroupLineOutput.unitName,
                },
              };
            })
            : []
          : dataEdit?.templatePackingLines !== null
            ? dataEdit?.templatePackingLines?.map((item: any) => {
              return {
                weight1: formatCurrency(commasToDots(item.weight?.toString())),
                volume: formatCurrency(commasToDots(item.volume?.toString())),
                unit: {
                  ...item.uomGroupLineOutput,
                  label: item.uomGroupLineOutput.unitName,
                },
              };
            })
            : []
      );
      // setNameProduct(dataEdit?.name);
      if (dataEdit?.description !== "") {
        setAddDescribe(true);
        setDescription(newDataEdit?.description);
      }
      // if (newDataEdit?.brand !== null) {
      //     setBrand({
      //         id: newDataEdit?.brand?.id,
      //         label: newDataEdit?.brand?.name,
      //     });
      // } else {
      //     setBrand({ id: 0, label: "" });
      // }
      const newArr = newDataEdit?.productTags?.map(
        (items: { name: any; id: any }) => {
          return { text: items.name, value: items.id };
        }
      );
      const abc = [
        ...new Set(
          newDataEdit?.attributeCategory?.flatMap((item: any) => item.id)
        ),
      ];
      setAttributeIds(abc);
      const newArr1 = newArr?.map((item: { value: any }) => item.value);
      setSelectedItems(newArr1);
      setDefaultTags(newArr);
      setBrands({
        label2: dataEdit?.managementForm,
        id: 0,
        label: getLabelByList(dataEdit?.managementForm),
      });
      if (newDataEdit?.productVariants) {
        setAddVariant(true);
        const newArr = newDataEdit?.productVariants.map((items: any) => {
          return {
            ...items,
            name: items.name.split("- ").slice(1).join("-"),
            weight: {
              weight: items.productPackingLines?.map((item: any) => {
                return {
                  unit: {
                    ...newDataEdit?.uomGroup.uomGroupLines.filter(
                      (item1: any) => item1.id === item.uomGroupLineId
                    )[0],
                    label: newDataEdit?.uomGroup.uomGroupLines.filter(
                      (item1: any) => item1.id === item.uomGroupLineId
                    )[0].unitName,
                  },
                  weight1: formatCurrency(commasToDots(item.weight)),
                  volume: formatCurrency(commasToDots(item.volume)),
                };
              }),
              weightOriginal: formatCurrency(
                commasToDots(items.baseProductPackingLine?.weight)
              ),
              volumeOriginal: formatCurrency(
                commasToDots(items.baseProductPackingLine?.volume)
              ),
              // uom: {

              // }
            }
          }
        })
        setDataCreateProduct(newArr);
        // setDataCreateProduct(newDataEdit?.productVariants);
        setDataOldCreateProduct(newDataEdit?.productVariants);
      }
      setCategory({
        id: newDataEdit?.productCategory?.id,
        label: newDataEdit?.productCategory?.name,
      });
      setImagesNote(newDataEdit?.imageUrls);
      setValuePurchase(newDataEdit?.purchaseOk);
      setValueSwitchUnit(newDataEdit?.uom !== null ? false : true);
      setUomGroupId({
        id: newDataEdit?.uomGroupId,
        label: newDataEdit?.uomGroup?.name,
      });
      setDetailUnitGroupData(newDataEdit?.uomGroup);
      if (newDataEdit?.vendors?.length !== 0) {
        const a = newDataEdit?.vendors?.map((item: { vendorId: any }) => {
          return item.vendorId;
        });
        const b = newDataEdit?.vendors?.map((item: { vendorId: any }) => {
          return item;
        });
        setVendor(a);
        setArrNCC(b)
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

  const getDetailUnitGroup = async (id: number) => {
    const unitResult = await unitStore.getDetailUnitGroup(id);
    if (unitResult && unitResult.kind === "ok") {
      const data = unitResult.result.data;
      console.log("getDetailUnitGroup:-------", data);
      setDetailUnitGroupData(data);
      const uomId = {
        id: data.originalUnit.id,
        label: data.originalUnit.name,
      };
      setUomId(uomId);
    } else {
      console.error("Failed to fetch list unit:", unitResult);
    }
  };

  const requestCameraPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        return result;
      } else {
        const result = await request(PERMISSIONS.ANDROID.CAMERA);
        return result;
      }
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  const checkCameraPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const result = await check(PERMISSIONS.IOS.CAMERA);
        return result;
      } else {
        const result = await check(PERMISSIONS.ANDROID.CAMERA);
        return result;
      }
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

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
          id: null,
          name: item,
          imageUrls: imagesNote,
          costPrice: methods.watch("costPrice"),
          retailPrice: retailPriceProduct,
          listPrice: methods.watch("listPrice"),
          wholesalePrice: wholesalePriceProduct,
          attributeValues: [],
          weight: {
            weight: methods.watch(`weight`),
            weightOriginal: methods.watch(`weightOriginal`),
            volumeOriginal: methods.watch(`volumeOriginal`),
            uom:
              valueSwitchUnit == false
                ? uomId
                : detailUnitGroupData?.originalUnit,
          },
        };
      });

      newArr5.forEach((item, index) => (dataArr[index].attributeValues = item));

      const bMap = new Map(
        dataOldCreateProduct.map((item) => [item.name.trim(), item])
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
      setPriceUsing(result.isUsingInPriceList);
    } else {
      console.error("Failed to fetch check using:", data);
    }
  };

  const submitAdd = async (data: any) => {
    console.log("dataInput------------", data);
    let hasError = false;
    if (data.productName.trim() !== "") {
      hasError = false;
    } else {
      methods.setError("productName", {
        type: "validate",
        message: "Vui lòng nhập thông tin",
      });
      hasError = true;
    }
    if (uomId.id === "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.required_information"),
      });
      hasError = true;
    }
    if (hasError == true) {
    } else {
      const newArr1: never[] = [];
      const newArr = dataCreateProduct?.map((item: any) => {
        return {
          ...item,
          productPackingLines: item.weight?.weight?.map((item: any) => {
            return {
              uomGroupLineId: item.unit.id,
              amount: item.unit.conversionRate,
              volume: formatStringToFloat(item?.volume),
              weight: formatStringToFloat(item?.weight1),
            };
          }),
        };
      });
      console.log("1");
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
      const dataPrice2 = retailPriceProduct?.map((item: any) => {
        return {
          min: item.min,
          price: Number(formatNumberByString(item.price.toString())),
        };
      });
      const dataPrice = wholesalePriceProduct?.map((item: any) => {
        return {
          min: item.min,
          price: Number(formatNumberByString(item.price.toString())),
        };
      });
      console.log(newArr, "12345");
      const newArr3 = newArr.map((item: any) => {
        return {
          ...item,
          name: methods.getValues("productName") + " - " + item.name,
          imageUrls: item.imageUrls,
          costPrice: item?.costPrice,
          retailPrice: item.retailPrice,
          listPrice: item?.listPrice,
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
                : item.productPackingLines,
        };
      });
      console.log("2");
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
        };
      });
      console.log("3");
      const doneData = {
        // sku: data.SKU === "" ? null : data.SKU,
        name: data.productName,
        // purchaseOk: valuePurchase,
        imageUrls: imagesNote,
        // saleOk: true,
        // vendorIds: vendor,
        // managementForm: brands.label2,
        // productCategoryId: category.id || null,
        // brandId: brand.id || null,
        // tagIds: selectedItems,
        // hasUomGroupInConfig: valueSwitchUnit,
        // uomId: valueSwitchUnit === false ? uomId.id : null,
        // uomGroupId: valueSwitchUnit === false ? null : uomGroupId.id,
        // hasVariantInConfig: !checkArrayIsEmptyOrNull(dataCreateProduct),
        // hasVariantInConfig: hasVariantInConfig === false ? hasVariantInConfig : !checkArrayIsEmptyOrNull(dataCreateProduct),
        // attributeValues: attributeValues,
        // attributeCategoryIds: attributeIds,
        // textAttributes: textAttributes,
        // description: description,
        // productVariants: newArr2,
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
        // deleteVariantIds: newArr1,
        hasPrice: true,
        activated: true,
      }
      console.log("dataCreate===========", JSON.stringify(doneData));
      const result = await productStore?.putClassify(
        productStore.productId,
        doneData
      );
      if (result.kind === "ok") {
        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("txtDialog.txt_title_dialog"),
          textBody: translate("txtDialog.product_repair_successful"),
          button2: translate("common.ok"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            navigation.navigate({
              name: "classifyDetailScreen",
              params: { reload: true },
            } as never);
            Dialog.hide();
          },
        });
      } else {
        console.log(
          "data------------------------------",
          JSON.stringify(result)
        );
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: translate("txtDialog.txt_title_dialog"),
          textBody: result.result.errorCodes[0].message,
          button: translate("common.ok"),
          closeOnOverlayTap: false,
        });
      }
    }
  };

  // console.log("dataCreateProduct----------------------", dataCreateProduct);
  const handleCameraUse = async () => {
    const permissionStatus = await checkCameraPermission();
    console.log(permissionStatus);

    if (permissionStatus === RESULTS.GRANTED) {
      console.log("You can use the camera");
      const options = {
        cameraType: "back",
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
      };
      launchCamera(options, (response) => {
        console.log("==========> response1233123", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets[0].uri) {
          console.log(response?.assets[0].uri);
          const imageAssets = [response?.assets[0]];
          //setImagesNote([...imagesNote, response?.assets[0].uri]);
          setModalImage(false);
          uploadImages(imageAssets, true, -1);
        }
      });
    } else if (permissionStatus === RESULTS.DENIED) {
      const newStatus = await requestCameraPermission();
      if (newStatus === RESULTS.GRANTED) {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.permission_denied"),
        });

        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("txtDialog.permission_allow"),
          textBody: translate("txtDialog.allow_permission_in_setting"),
          button: translate("common.cancel"),
          button2: translate("txtDialog.settings"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            Linking.openSettings();
            Dialog.hide();
          },
        });
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.permission_blocked"),
      });

      console.log("Permission blocked, you need to enable it from settings");
    }
  };
  const requestLibraryPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const result = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
        return result;
      } else {
        const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        return result;
      }
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  const checkLibraryPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const result = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);
        return result;
      } else {
        const result = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        return result;
      }
    } catch (error) {
      console.warn(error);
      return null;
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
  };

  const handleLibraryUse = async () => {
    const permissionStatus = await checkLibraryPermission();
    console.log(permissionStatus);

    if (permissionStatus === RESULTS.GRANTED) {
      const options = {
        cameraType: "back",
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 6 - productStore.imagesLimit,
      };
      launchImageLibrary(options, (response) => {
        console.log("==========> response4564546", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets && response.assets.length > 0) {
          const selectedAssets = response.assets.map((asset) => asset);
          //const selectedAssets = response.assets.map((asset) => asset.uri);
          //setImagesNote([...imagesNote, ...selectedAssets]);
          // uploadImages(selectedAssets, true, -1);
          // setModalImage(false);
          if (selectedAssets.length + imagesNote.length > 6) {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "",
              textBody: translate("txtToats.required_maximum_number_of_photos"),
            });
          } else {
            uploadImages(selectedAssets, true, -1);
          }
        }
      });
    } else if (permissionStatus === RESULTS.DENIED) {
      const newStatus = await requestLibraryPermission();
      if (newStatus === RESULTS.GRANTED) {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.permission_denied"),
        });
        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("txtDialog.permission_allow"),
          textBody: translate("txtDialog.allow_permission_in_setting"),
          button: translate("common.cancel"),
          button2: translate("txtDialog.settings"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            Linking.openSettings();
            Dialog.hide();
          },
        });
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.permission_blocked"),
      });

      console.log("Permission blocked, you need to enable it from settings");
    } else if (permissionStatus === RESULTS.UNAVAILABLE) {
      const options = {
        cameraType: "back",
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 6 - productStore.imagesLimit,
      };
      launchImageLibrary(options, (response) => {
        console.log("==========> response4564546", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets && response.assets.length > 0) {
          const selectedAssets = response.assets.map((asset) => asset);
          //const selectedAssets = response.assets.map((asset) => asset.uri);
          //setImagesNote([...imagesNote, ...selectedAssets]);
          // uploadImages(selectedAssets, true, -1);
          if (selectedAssets.length + imagesNote.length > 6) {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "",
              textBody: translate("txtToats.required_maximum_number_of_photos"),
            });
          } else {
            uploadImages(selectedAssets, true, -1);
          }
          // setModalImage(false);
        }
      });
    }
  };

  const handleDeleteImage = (index: number) => {
    const newArr = dataCreateProduct.slice();
    newArr[index].imageUrls = [];
    setDataCreateProduct(newArr);
  };
  const handleDeleteImageItem = (index: number, url: string) => {
    console.log("----------------indexItem-----------------", index);

    const newArr = dataCreateProduct.slice();
    const newArr1 = newArr[index].imageUrls.slice();
    newArr1.splice(productStore.imageModalIndex, 1);
    newArr[index].imageUrls = newArr1;
    setDataCreateProduct(newArr);
  };

  const handleLibraryUseProduct = async (itemId: any, indexItem: any) => {
    const permissionStatus = await checkLibraryPermission();
    const numberUrl = checkArrayIsEmptyOrNull(
      dataCreateProduct[indexItem]?.imageUrls
    )
      ? 0
      : dataCreateProduct[indexItem]?.imageUrls?.length;
    console.log("----------------indexItem-----------------", numberUrl);
    if (permissionStatus === RESULTS.GRANTED) {
      const options = {
        cameraType: "back",
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 6 - numberUrl,
      };
      launchImageLibrary(options, (response) => {
        console.log("==========> response4564546", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets && response.assets.length > 0) {
          const selectedAssets = response.assets.map((asset) => asset);
          uploadImages(selectedAssets, false, indexItem);
        }
      });
    } else if (permissionStatus === RESULTS.DENIED) {
      const newStatus = await requestLibraryPermission();
      if (newStatus === RESULTS.GRANTED) {
        console.log("Permission granted");
      } else {
        console.log("Permission denied");
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "",
          textBody: translate("txtToats.permission_denied"),
        });

        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("txtDialog.permission_allow"),
          textBody: translate("txtDialog.allow_permission_in_setting"),
          button: translate("common.cancel"),
          button2: translate("txtDialog.settings"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            Linking.openSettings();
            Dialog.hide();
          },
        });
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.permission_blocked"),
      });

      console.log("Permission blocked, you need to enable it from settings");
    } else if (permissionStatus === RESULTS.UNAVAILABLE) {
      const options = {
        cameraType: "back",
        quality: 1,
        maxHeight: 500,
        maxWidth: 500,
        selectionLimit: 6 - numberUrl,
      };
      launchImageLibrary(options, (response) => {
        console.log("==========> response4564546", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets && response.assets.length > 0) {
          const selectedAssets = response.assets.map((asset) => asset);
          if (selectedAssets.length + numberUrl > 6) {
            Toast.show({
              type: ALERT_TYPE.DANGER,
              title: "",
              textBody: translate("txtToats.required_maximum_number_of_photos"),
            });
          } else {
            uploadImages(selectedAssets, false, indexItem);
          }
        }
      });
    }
  };
  const handleRemoveImage = (index: number, url: string) => {
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
  };

  const getConvertedUnitsForGroup = () => {
    return detailUnitGroupData ? detailUnitGroupData.uomGroupLines : [];
  };

  const arrBrand = dataBrand.map((item) => {
    return { label: item.name, id: item.id };
  });
  const arrCategory = dataCategory.map((item: { name: any; id: any }) => {
    return { label: item.name, id: item.id };
  });

  const handleDeleteProduct = async (index: any, id: any) => {
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
                  ...dataCreateProduct.slice(0, index),
                  ...dataCreateProduct.slice(index + 1),
                ];
                setDataCreateProduct(updatedData);
                setErrorContent(checkDelete.result.message);
                await Dialog.hideDialog(); // Chờ dialog ẩn hoàn toàn
                Dialog.show({
                  type: ALERT_TYPE.DANGER,
                  title: translate("txtDialog.txt_title_dialog"),
                  textBody: checkDelete.result.message,
                  button: translate("common.ok"),
                  closeOnOverlayTap: false,
                });
              } else {
                setErrorContent(checkDelete.result.errorCodes[0].message);
                await Dialog.hideDialog(); // Chờ dialog ẩn hoàn toàn
                Dialog.show({
                  type: ALERT_TYPE.DANGER,
                  title: translate("txtDialog.txt_title_dialog"),
                  textBody: checkDelete.result.errorCodes[0].message,
                  button: translate("common.ok"),
                  closeOnOverlayTap: false,
                });
              }
            } else {
              setErrorContent(checkDelete.result.errorCodes[0].message);
              await Dialog.hideDialog(); // Chờ dialog ẩn hoàn toàn
              Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: translate("txtDialog.txt_title_dialog"),
                textBody: checkDelete.result.errorCodes[0].message,
                button: translate("common.ok"),
                closeOnOverlayTap: false,
              });
              console.error("Failed to fetch categories:", checkDelete.result);
            }
          } else {
            const updatedData = [
              ...dataCreateProduct.slice(0, index),
              ...dataCreateProduct.slice(index + 1),
            ];
            setDataCreateProduct(updatedData);
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
    });
  };

  const handleSelect = (items: any) => {
    setSelectedItems(items);
  };
  const handleDescribe = () => {
    setAddDescribe(true);
  };
  const handleCloseDescribe = () => {
    setAddDescribe(false);
  };
  // const [isEditing , setIsEditing] = useState(true)
  const goToChooseSupplierScreen = () => {
    const listIds = vendor;
    // console.log('mômmo' , listIds)
    navigation.navigate({
      name: "ChooseVendorScreen",
      params: { listIds, mode: "edit" },
    } as never);
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
              style={{
                marginHorizontal: scaleWidth(16),
                marginVertical: scaleHeight(20),
              }}>
              {imagesNote?.length > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: scaleHeight(20),
                  }}>
                  <View
                    style={{
                      flexDirection: "column",
                      marginRight: scaleHeight(11),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (imagesNote.length < 6) {
                          handleLibraryUse();
                          productStore.setImagesLimit(imagesNote.length);
                        } else {
                          Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: "",
                            textBody: translate(
                              "txtToats.required_maximum_number_of_photos"
                            ),
                          });
                        }
                      }}
                      style={styles.btnLibrary}>
                      <Images.ic_addImages
                        width={scaleWidth(16)}
                        height={scaleHeight(16)}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (imagesNote.length < 6) {
                          handleCameraUse();
                        } else {
                          Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: "",
                            textBody: translate(
                              "txtToats.required_maximum_number_of_photos"
                            ),
                          });
                        }
                      }}
                      style={styles.btnCamera}>
                      <Images.ic_camera
                        width={scaleWidth(16)}
                        height={scaleHeight(16)}
                      />
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={imagesNote}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setModalImages(true);
                          setActiveSlide(index);
                        }}>
                        <AutoImage
                          style={{
                            width: scaleWidth(107),
                            height: scaleHeight(70),
                            borderRadius: 8,
                          }}
                          source={{ uri: item }}
                        />
                        <TouchableOpacity
                          style={{
                            position: "absolute",
                            right: scaleWidth(5),
                            top: scaleHeight(5),
                          }}
                          onPress={() => handleRemoveImage(index, item)}>
                          <Images.circle_close
                            width={scaleWidth(16)}
                            height={scaleHeight(16)}
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View style={{ width: scaleWidth(11) }} />
                    )}
                  />
                </View>
              ) : (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      marginBottom: scaleHeight(20),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        if (imagesNote.length < 6) {
                          handleLibraryUse();
                          productStore.setImagesLimit(imagesNote.length);
                        } else {
                          Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: "",
                            textBody: translate(
                              "txtToats.required_maximum_number_of_photos"
                            ),
                          });
                        }
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#0078d4",
                        marginRight: scaleWidth(10),
                        borderRadius: 8,
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginHorizontal: scaleWidth(16),
                          marginVertical: scaleHeight(7),
                        }}>
                        <Images.ic_addImages
                          width={scaleWidth(16)}
                          height={scaleHeight(16)}
                        />
                        <Text
                          tx={"createProductScreen.uploadImage"}
                          style={{
                            fontSize: fontSize.size14,
                            color: "#0078d4",
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (imagesNote.length < 6) {
                          handleCameraUse();
                        } else {
                          Toast.show({
                            type: ALERT_TYPE.DANGER,
                            title: "",
                            textBody: translate(
                              "txtToats.required_maximum_number_of_photos"
                            ),
                          });
                        }
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#0078d4",
                        borderRadius: 8,
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginHorizontal: scaleWidth(16),
                          marginVertical: scaleHeight(7),
                        }}>
                        <Images.ic_camera
                          width={scaleWidth(16)}
                          height={scaleHeight(16)}
                        />
                        <Text
                          tx={"createProductScreen.openCamera"}
                          style={{
                            fontSize: fontSize.size14,
                            color: "#0078d4",
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </>
              )}
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
                    inputStyle={{
                      fontSize: fontSize.size16,
                      fontWeight: "500",
                    }}
                    value={value}
                    onBlur={onBlur}
                    defaultValue={methods.watch("SKU")}
                    RightIconClear={Images.icon_delete2}
                    error={errors?.SKU?.message}
                    onClearText={() => onChange("")}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    placeholderTx="productScreen.placeholderSKU"
                    RightIcon={Images.ic_QR}
                    editable={false}
                  // isImportant
                  />
                )}
                // defaultValue={''}
                name="SKU"
              // rules={{
              //   required: "Please input data",
              // }}
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
                    inputStyle={{
                      fontSize: fontSize.size16,
                      fontWeight: "500",
                    }}
                    value={value}
                    onBlur={onBlur}
                    // defaultValue={nameProduct}
                    RightIconClear={Images.icon_delete2}
                    error={methods.formState.errors.productName?.message}
                    onClearText={() => onChange("")}
                    onChangeText={(value) => {
                      onChange(value);
                    }}
                    placeholderTx="productScreen.placeholderProductName"
                    // RightIcon={Images.ic_QR}
                    isImportant
                  />
                )}
                // defaultValue={''}
                name="productName"
                rules={{
                  required: "Vui lòng nhập dữ liệu",
                }}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  tx="createProductScreen.canBuy"
                  style={{
                    fontSize: fontSize.size13,
                    marginRight: scaleWidth(10),
                  }}
                />
                <Switch value={valuePurchase} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: scaleHeight(15),
                  flex: 1,
                  justifyContent: "space-between",
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 8,
                    backgroundColor: colors.palette.aliceBlue,
                    height: scaleHeight(56),
                    paddingVertical: scaleHeight(8),
                    paddingHorizontal: scaleWidth(16),
                    width: "48%",
                  }}
                  onPress={() => {
                    const arr = retailPriceProduct?.map((item) => {
                      return {
                        min: item.min.toString(),
                        price: item.price.toString(),
                      };
                    });
                    setDataModal(arr);
                    setModalRetailPrice(true);
                  }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        tx={"productScreen.priceRetail"}
                        style={{
                          fontWeight: "500",
                          fontSize: fontSize.size12,
                          color: colors.palette.dolphin,
                          lineHeight: scaleHeight(14),
                        }}
                      />
                      {retailPriceProduct?.length > 0 &&
                        retailPriceProduct?.length !== 1 ? (
                        <Text
                          text={convertRetailPrice(retailPriceProduct)}
                          numberOfLines={1}
                          style={{
                            fontWeight: "500",
                            fontSize: fontSize.size16,
                            color: colors.palette.nero,
                            lineHeight: scaleHeight(24),
                          }}
                        />
                      ) : retailPriceProduct?.length > 0 &&
                        retailPriceProduct?.length === 1 ? (
                        <Text
                          text={retailPriceProduct[0]?.price}
                          numberOfLines={1}
                          style={{
                            fontWeight: "500",
                            fontSize: fontSize.size16,
                            color: colors.palette.nero,
                            lineHeight: scaleHeight(24),
                          }}
                        />
                      ) : (
                        <Text
                          text="0.000 - 0.000"
                          style={{
                            fontWeight: "500",
                            fontSize: fontSize.size16,
                            color: colors.palette.dolphin,
                            lineHeight: scaleHeight(24),
                          }}
                        />
                      )}
                    </View>
                    <Images.icon_caretRightDown />
                  </View>
                </TouchableOpacity>
                <Controller
                  control={methods.control}
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
                      inputStyle={{
                        fontSize: fontSize.size16,
                        fontWeight: "500",
                        marginTop: scaleHeight(4),
                      }}
                      value={value}
                      onBlur={onBlur}
                      showRightIcon={false}
                      // defaultValue={costPriceProduct?.toString()}
                      onChangeText={(value) => {
                        onChange(
                          vendorStore.checkSeparator === "DOTS"
                            ? formatCurrency(removeNonNumeric(value))
                            : addCommas(removeNonNumeric(value))
                        );
                        // setCostPriceProduct(Number(value));
                      }}
                      placeholderTx="productScreen.placeholderPrice"
                    />
                  )}
                  name="costPrice"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: scaleHeight(15),
                  flex: 1,
                  justifyContent: "space-between",
                }}>
                <Controller
                  control={methods.control}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <TextField
                      maxLength={20}
                      keyboardType={"number-pad"}
                      labelTx={"productScreen.priceList"}
                      labelDolphin
                      style={{
                        width: scaleWidth(164),
                        flex: 1,
                      }}
                      inputStyle={{
                        fontSize: fontSize.size16,
                        fontWeight: "500",
                        marginTop: scaleHeight(4),
                      }}
                      value={value}
                      onBlur={onBlur}
                      // defaultValue={listPriceProduct?.toString()}
                      showRightIcon={false}
                      onChangeText={(value) => {
                        onChange(
                          vendorStore.checkSeparator === "DOTS"
                            ? formatCurrency(removeNonNumeric(value))
                            : addCommas(removeNonNumeric(value))
                        );
                        // setListPriceProduct(Number(value));
                      }}
                      placeholderTx="productScreen.placeholderPrice"
                    />
                  )}
                  name="listPrice"
                />
                <TouchableOpacity
                  style={{
                    borderRadius: 8,
                    backgroundColor: colors.palette.aliceBlue,
                    height: scaleHeight(56),
                    paddingVertical: scaleHeight(8),
                    paddingHorizontal: scaleWidth(16),
                    width: "48%",
                  }}
                  onPress={() => {
                    setModalWholesalePrice(true);
                    const arr = wholesalePriceProduct?.map((item) => {
                      return {
                        min: item.min.toString(),
                        price: item.price.toString(),
                      };
                    });

                    setDataModal(arr);
                  }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        tx={"productScreen.priceWholesale"}
                        style={{
                          fontWeight: "500",
                          fontSize: fontSize.size12,
                          color: colors.palette.dolphin,
                          lineHeight: scaleHeight(14),
                        }}
                      />
                      {wholesalePriceProduct?.length > 0 &&
                        wholesalePriceProduct?.length !== 1 ? (
                        <Text
                          text={convertWholesalePrice(wholesalePriceProduct)}
                          numberOfLines={1}
                          style={{
                            fontWeight: "500",
                            fontSize: fontSize.size16,
                            color: colors.palette.nero,
                            lineHeight: scaleHeight(24),
                          }}
                        />
                      ) : wholesalePriceProduct?.length > 0 &&
                        wholesalePriceProduct?.length === 1 ? (
                        <Text
                          text={wholesalePriceProduct[0]?.price}
                          numberOfLines={1}
                          style={{
                            fontWeight: "500",
                            fontSize: fontSize.size16,
                            color: colors.palette.nero,
                            lineHeight: scaleHeight(24),
                          }}
                        />
                      ) : (
                        <Text
                          text="0.000 - 0.000"
                          style={{
                            fontWeight: "500",
                            fontSize: fontSize.size16,
                            color: colors.palette.dolphin,
                            lineHeight: scaleHeight(24),
                          }}
                        />
                      )}
                    </View>
                    <Images.icon_caretRightDown />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {valuePurchase ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
              <View
                style={{
                  marginHorizontal: scaleWidth(16),
                  marginVertical: scaleHeight(20),
                }}>
                <Text tx={"createProductScreen.infoSupplier"}
                  style={{
                    fontSize: fontSize.size14,
                    fontWeight: "700",
                    // marginBottom: scaleHeight(15),
                  }} />
                <TouchableOpacity
                  onPress={() => setShowNCC(!showNCC)}
                  style={{

                  }}>
                  {vendor?.length > 0 ? (
                    <View
                      style={{
                        paddingTop: scaleHeight(10),
                        // paddingHorizontal: scaleWidth(16),
                        // flexDirection: "row",
                        // justifyContent: 'space-between'
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          marginBottom:
                            showNCC === true ? scaleHeight(margin.margin_10) : 0,
                        }}>
                        <Text
                          style={[
                            styles.textDolphin12,
                            {
                              flex: 1,
                            },
                          ]}>
                          {vendor.length + " nhà cung cấp"}
                        </Text>

                        <Images.dropDown
                          width={scaleWidth(16)}
                          height={scaleHeight(16)}
                          style={{
                            transform: [{ rotate: showNCC ? "180deg" : "0deg" }],
                          }}
                        />
                      </View>
                      {showNCC === true
                        ? arrNCC.map((item: any) => {
                          return (
                            <View>
                              <View
                                style={{
                                  flexDirection: "row",
                                  paddingVertical: scaleHeight(padding.padding_8),
                                }}>
                                <AutoHeightImage
                                  source={{ uri: item.imgUrl }}
                                  width={scaleHeight(40)}
                                  height={scaleHeight(40)}
                                  style={{ borderRadius: 40 }}
                                  fallbackSource={Images.imageError}
                                />
                                <View
                                  style={{
                                    marginLeft: scaleWidth(6),
                                    justifyContent: "center",
                                  }}>
                                  <Text style={styles.textNameNCC}>
                                    {item.vendorCode + "- " + item.vendorName}
                                  </Text>
                                  <Text style={styles.textNameClassification}>
                                    {item.phoneNumber}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  height: scaleHeight(1),
                                  backgroundColor: colors.palette.ghostWhite,
                                }}
                              />
                            </View>
                          );
                        })
                        : null}
                    </View>
                  ) : (
                    <Text tx={"createProductScreen.noSelectSupplier"}
                      style={{
                        fontSize: fontSize.size13,
                        fontWeight: "400",
                        color: colors.palette.dolphin,
                        marginTop: scaleHeight(10)
                      }} />
                  )}
                  {/* <Images.icon_caretRight
                                        width={scaleWidth(16)}
                                        height={scaleHeight(16)}
                                    /> */}
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <View
            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
            <View
              style={{
                marginHorizontal: scaleWidth(16),
                marginVertical: scaleHeight(20),
              }}>
              <Text
                tx={"createProductScreen.infoMore"}
                style={{
                  fontSize: fontSize.size14,
                  fontWeight: "700",
                  marginBottom: scaleHeight(15),
                }}
              />
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
                value={dataEdit?.productTags
                  ?.flatMap((item: any) => item.name)
                  .join(", ")}
              />
              <ProductAttribute
                labelTx="createProductScreen.form_of_management"
                value={getLabelByList(dataEdit?.managementForm)}
              />
            </View>
          </View>
          <View
            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
            <View
              style={{
                marginHorizontal: scaleWidth(16),
                marginVertical: scaleHeight(20),
              }}>
              <Text
                tx={
                  valueSwitchUnit
                    ? "productScreen.unit_group"
                    : "createProductScreen.unit"
                }
                style={{
                  fontSize: fontSize.size14,
                  fontWeight: "700",
                  marginBottom: scaleHeight(15),
                }}
              />
              {valueSwitchUnit ? (
                <>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: scaleHeight(15),
                    }}>
                    <Text
                      tx={"createProductScreen.originalUnit"}
                      style={{ fontSize: fontSize.size14 }}
                    />
                    {/* Hiển thị đơn vị gốc (baseUnit) từ arrDVT dựa trên group.label */}
                    {detailUnitGroupData ? (
                      <Text
                        style={{
                          fontSize: fontSize.size14,
                          fontWeight: "600",
                        }}>
                        {detailUnitGroupData?.originalUnit?.name}
                      </Text>
                    ) : null}
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: scaleHeight(15),
                    }}>
                    <Text
                      tx={"createProductScreen.conversion"}
                      style={{ fontSize: fontSize.size14 }}
                    />
                    <Text
                      tx={"createProductScreen.conversionRate"}
                      style={{ fontSize: fontSize.size14, fontWeight: "600" }}
                    />
                  </View>
                  {getConvertedUnitsForGroup()?.map((item: any, index: any) => (
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
                        style={{
                          fontSize: fontSize.size14,
                          fontWeight: "600",
                        }}>
                        {item.conversionRate}{" "}
                        {detailUnitGroupData?.originalUnit?.name}
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
                <TouchableOpacity
                  style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                  onPress={() => {
                    methods.setValue(
                      "volumeOriginal",
                      typeVariant === "variant"
                        ? dataEdit?.baseProductPackingLine?.volume?.toString()
                        : dataEdit?.baseTemplatePackingLine?.volume?.toString()
                    );
                    methods.setValue(
                      "weightOriginal",
                      typeVariant === "variant"
                        ? dataEdit?.baseProductPackingLine?.weight?.toString()
                        : dataEdit?.baseTemplatePackingLine?.weight?.toString()
                    );
                    methods.setValue(
                      "weight",
                      typeVariant === "variant"
                        ? dataEdit?.productPackingLines !== null
                          ? dataEdit?.productPackingLines?.map((item: any) => {
                            return {
                              weight1: formatCurrency(
                                commasToDots(item.weight?.toString())
                              ),
                              volume: formatCurrency(
                                commasToDots(item.volume?.toString())
                              ),
                              unit: {
                                ...item.uomGroupLineOutput,
                                label: item.uomGroupLineOutput.unitName,
                              },
                            };
                          })
                          : []
                        : dataEdit?.templatePackingLines !== null
                          ? dataEdit?.templatePackingLines?.map((item: any) => {
                            return {
                              weight1: formatCurrency(
                                commasToDots(item.weight?.toString())
                              ),
                              volume: formatCurrency(
                                commasToDots(item.volume?.toString())
                              ),
                              unit: {
                                ...item.uomGroupLineOutput,
                                label: item.uomGroupLineOutput.unitName,
                              },
                            };
                          })
                          : []
                    );
                  }}>
                  <Text
                    tx={"productScreen.reset"}
                    style={{
                      color: colors.navyBlue,
                      fontSize: fontSize.size14,
                    }}
                  />
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
                  setAdd={methods.watch(`weight`)}
                />
              </View>
            </View>
          ) : null}
          {addVariant ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
              <View
                style={{
                  marginHorizontal: scaleWidth(16),
                  marginVertical: scaleHeight(20),
                }}>
                <Text
                  tx="createProductScreen.classify"
                  style={{ fontSize: fontSize.size14, fontWeight: "700" }}
                />
                {dataGroupAttribute.length > 0 ? (
                  <View>
                    <View style={styles.viewDetails}>
                      <View style={styles.viewTitleDetail}>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: fontSize.size12,
                          }}>
                          Thuộc tính
                        </Text>
                        <Text
                          style={{
                            fontWeight: "600",
                            fontSize: fontSize.size12,
                          }}>
                          Giá trị
                        </Text>
                      </View>
                      <View style={styles.viewLine2} />
                      {dataGroupAttribute?.map((item, index) => (
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

                          {item.attributeOutputList?.map((dto) => (
                            <View
                              style={{
                                marginTop: scaleHeight(margin.margin_12),
                              }}>
                              <ProductAttribute
                                label={dto.name}
                                value={dto.productAttributeValue
                                  .map((value) => value.value)
                                  .join("/")}
                                styleAttribute={{
                                  paddingHorizontal: scaleWidth(
                                    padding.padding_12
                                  ),
                                }}
                              />
                              {index !== dataGroupAttribute?.length - 1 ? (
                                <View style={styles.viewLine2} />
                              ) : null}
                            </View>
                          ))}
                        </View>
                      ))}
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        top: scaleHeight(-15),
                        flexDirection: "row",
                      }}>
                      {dataGroupAttribute?.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            if (productUsing === true || priceUsing === true) {
                              navigation.navigate({
                                name: "editAttributeByEdit",
                                params: {
                                  dataAttribute: attributeToEdit,
                                  constDataAttribute: constAttributeToEdit,
                                  dropdownSelected: dropdownToEdit,
                                },
                              } as never);
                            } else {
                              navigation.navigate({
                                name: "editAttribute",
                                params: {
                                  dataAttribute: attributeToEdit,
                                  dropdownSelected: dropdownToEdit,
                                  editScreen: true,
                                  hasVariantInConfig: hasVariantInConfig,
                                },
                              } as never);
                            }
                          }}>
                          <Images.icon_edit
                            // style={{ marginRight: scaleWidth(8) }}
                            width={scaleWidth(14)}
                            height={scaleHeight(14)}
                          />
                        </TouchableOpacity>
                      ) : null}

                      {dataGroupAttribute.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            setAddVariant(false);
                            setDataGroupAttribute([]);
                            setDataCreateProduct([]);
                            setVariantInConfig(false);
                          }}>
                          <Images.ic_close
                            width={scaleWidth(14)}
                            height={scaleHeight(14)}
                            style={{ marginLeft: 10 }}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                ) : (
                  <View>
                    {dataCreateProduct?.length > 0 ? (
                      <FlatList
                        data={dataCreateProduct}
                        keyExtractor={(item, index) => index.toString()}
                        scrollEnabled={false}
                        renderItem={({ item, index }: any) => {
                          return (
                            <ScrollView horizontal={true}>
                              <View style={{ marginTop: scaleHeight(15) }}>
                                <Text>
                                  {methods.getValues("productName") +
                                    " - " +
                                    item.name}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: scaleHeight(6),
                                  }}>
                                  <TouchableOpacity
                                    style={{ marginRight: scaleWidth(6) }}
                                    onPress={() =>
                                      handleDeleteProduct(index, item.id)
                                    }>
                                    <Images.ic_minusCircle
                                      width={scaleWidth(14)}
                                      height={scaleHeight(14)}
                                    />
                                  </TouchableOpacity>
                                  <ImagesGroup
                                    arrData={item.imageUrls || []}
                                    onPressOpenLibrary={() => {
                                      if (item.imageUrls !== undefined) {
                                        if (item.imageUrls?.length < 6) {
                                          handleLibraryUseProduct(
                                            item.imageUrls,
                                            index
                                          );
                                          productStore.setImagesLimit(
                                            item.imageUrls?.length
                                          );
                                        } else {
                                          Toast.show({
                                            type: ALERT_TYPE.DANGER,
                                            title: "",
                                            textBody: translate(
                                              "txtToats.required_maximum_number_of_photos"
                                            ),
                                          });
                                        }
                                      } else {
                                        handleLibraryUseProduct(
                                          item.imageUrls,
                                          index
                                        );
                                      }
                                    }}
                                    onPressDelete={() =>
                                      handleDeleteImage(index)
                                    }
                                    onPressDelete1={() =>
                                      handleDeleteImageItem(
                                        index,
                                        item.imageUrls[index]
                                      )
                                    }
                                  />
                                  <TouchableOpacity
                                    onPress={() =>
                                      navigation.navigate({
                                        name: "editWeight",
                                        params: {
                                          data: item.weight,
                                          check: valueSwitchUnit,
                                          unitData:
                                            valueSwitchUnit == false
                                              ? uomId
                                              : detailUnitGroupData?.originalUnit,
                                          unitOrigin:
                                            valueSwitchUnit == false
                                              ? []
                                              : detailUnitGroupData?.uomGroupLines,
                                          index: index,
                                          dataCreateProduct: dataCreateProduct,
                                          screen: "edit",
                                        },
                                      } as never)
                                    }
                                    style={{
                                      marginHorizontal: scaleWidth(2),
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}>
                                    <Text
                                      tx={"productScreen.weight"}
                                      style={[
                                        styles.textTitleViewPrice,
                                        { color: colors.nero },
                                      ]}
                                    />
                                    <Images.icon_edit />
                                  </TouchableOpacity>
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      marginLeft: scaleWidth(10),
                                    }}>
                                    <TouchableOpacity
                                      style={{
                                        borderRadius: 8,
                                        backgroundColor:
                                          colors.palette.aliceBlue,
                                        height: scaleHeight(56),
                                        paddingVertical: scaleHeight(8),
                                        paddingHorizontal: scaleWidth(16),
                                        width: scaleWidth(180),
                                        marginRight: scaleWidth(10),
                                      }}
                                      onPress={() => {
                                        setModalRetailPrice1(true);
                                        const arr = item.retailPrice?.map(
                                          (item: {
                                            min: { toString: () => any };
                                            price: { toString: () => any };
                                          }) => {
                                            return {
                                              min: item.min.toString(),
                                              price: item.price.toString(),
                                            };
                                          }
                                        );
                                        setDataModal(arr);
                                        setIndexVariant(index);
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}>
                                        <View style={{ flex: 1 }}>
                                          <Text
                                            tx={"productScreen.priceRetail"}
                                            style={{
                                              fontWeight: "500",
                                              fontSize: fontSize.size12,
                                              color: colors.palette.dolphin,
                                              lineHeight: scaleHeight(14),
                                            }}
                                          />
                                          {item.retailPrice?.length > 0 &&
                                            item.retailPrice?.length !== 1 ? (
                                            <Text
                                              text={convertAttributeRetailPrice(
                                                dataCreateProduct,
                                                index
                                              )}
                                              numberOfLines={1}
                                              style={{
                                                fontWeight: "500",
                                                fontSize: fontSize.size16,
                                                color: colors.palette.nero,
                                                lineHeight: scaleHeight(24),
                                              }}
                                            />
                                          ) : item.retailPrice?.length > 0 &&
                                            item.retailPrice?.length === 1 ? (
                                            <Text
                                              text={item.retailPrice[0]?.price}
                                              style={{
                                                fontWeight: "500",
                                                fontSize: fontSize.size16,
                                                color: colors.palette.nero,
                                                lineHeight: scaleHeight(24),
                                              }}
                                            />
                                          ) : (
                                            <Text
                                              text="0.000 - 0.000"
                                              style={{
                                                fontWeight: "500",
                                                fontSize: fontSize.size16,
                                                color: colors.palette.dolphin,
                                                lineHeight: scaleHeight(24),
                                              }}
                                            />
                                          )}
                                        </View>
                                        <Images.icon_caretRightDown />
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
                                          style={{
                                            marginRight: scaleWidth(10),
                                            width: scaleWidth(180),
                                            height: scaleHeight(56),
                                          }}
                                          inputStyle={{
                                            fontSize: fontSize.size16,
                                            fontWeight: "500",
                                          }}
                                          value={value}
                                          onBlur={onBlur}
                                          RightIconClear={Images.icon_delete2}
                                          // error={errors?.priceRetail?.message}
                                          onClearText={() => onChange("")}
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
                                          style={{
                                            marginRight: scaleWidth(10),
                                            width: scaleWidth(180),
                                            height: scaleHeight(56),
                                            // justifyContent : 'center'
                                          }}
                                          inputStyle={{
                                            fontSize: fontSize.size16,
                                            fontWeight: "500",
                                          }}
                                          value={value}
                                          onBlur={onBlur}
                                          RightIconClear={Images.icon_delete2}
                                          error={errors?.priceRetail?.message}
                                          onClearText={() => onChange("")}
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
                                    <TouchableOpacity
                                      style={{
                                        borderRadius: 8,
                                        backgroundColor:
                                          colors.palette.aliceBlue,
                                        height: scaleHeight(56),
                                        paddingVertical: scaleHeight(8),
                                        paddingHorizontal: scaleWidth(16),
                                        width: scaleWidth(180),
                                        marginRight: scaleWidth(10),
                                      }}
                                      onPress={() => {
                                        setModalWholesalePrice1(true);
                                        const arr = item.wholesalePrice?.map(
                                          (item: {
                                            min: { toString: () => any };
                                            price: { toString: () => any };
                                          }) => {
                                            return {
                                              min: item.min.toString(),
                                              price: item.price.toString(),
                                            };
                                          }
                                        );
                                        setDataModal(arr);
                                        setIndexVariant(index);
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                        }}>
                                        <View style={{ flex: 1 }}>
                                          <Text
                                            tx={"productScreen.priceWholesale"}
                                            style={{
                                              fontWeight: "500",
                                              fontSize: fontSize.size12,
                                              color: colors.palette.dolphin,
                                              lineHeight: scaleHeight(14),
                                            }}
                                          />
                                          {item.wholesalePrice?.length > 0 &&
                                            item.wholesalePrice?.length !== 1 ? (
                                            <Text
                                              text={convertAttributeWholesalePrice(
                                                dataCreateProduct,
                                                index
                                              )}
                                              numberOfLines={1}
                                              style={{
                                                fontWeight: "500",
                                                fontSize: fontSize.size16,
                                                color: colors.palette.nero,
                                                lineHeight: scaleHeight(24),
                                              }}
                                            />
                                          ) : item.wholesalePrice?.length > 0 &&
                                            item.wholesalePrice?.length ===
                                            1 ? (
                                            <Text
                                              text={
                                                item.wholesalePrice[0]?.price
                                              }
                                              style={{
                                                fontWeight: "500",
                                                fontSize: fontSize.size16,
                                                color: colors.palette.nero,
                                                lineHeight: scaleHeight(24),
                                              }}
                                            />
                                          ) : (
                                            <Text
                                              text="0.000 - 0.000"
                                              style={{
                                                fontWeight: "500",
                                                fontSize: fontSize.size16,
                                                color: colors.palette.dolphin,
                                                lineHeight: scaleHeight(24),
                                              }}
                                            />
                                          )}
                                        </View>
                                        <Images.icon_caretRightDown />
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </ScrollView>
                          );
                        }}
                      />
                    ) : (
                      <View style={{ marginTop: scaleHeight(10) }}>
                        <Text
                          tx="createProductScreen.details"
                          style={{
                            fontSize: fontSize.size13,
                            fontWeight: "400",
                            color: colors.palette.dolphin,
                            marginBottom: scaleHeight(12),
                          }}
                        />
                        <TouchableOpacity
                          style={styles.btnAddProperties}
                          onPress={() =>
                            navigation.navigate({
                              name: "addAttribute",
                              params: {
                                editScreen: true,
                              },
                            } as never)
                          }>
                          <Images.ic_plusBlue
                            width={scaleWidth(16)}
                            height={scaleHeight(16)}
                          />
                          <Text
                            tx="createProductScreen.addProperties"
                            style={{
                              color: "#0078d4",
                              fontSize: fontSize.size14,
                              marginLeft: scaleWidth(4),
                              fontWeight: "600",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    )}
                    <View
                      style={{
                        position: "absolute",
                        right: 0,
                        top: scaleHeight(-15),
                        flexDirection: "row",
                      }}>
                      {dataCreateProduct?.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            if (productUsing === true || priceUsing === true) {
                              navigation.navigate({
                                name: "editAttributeByEdit",
                                params: {
                                  dataAttribute: attributeToEdit,
                                  constDataAttribute: constAttributeToEdit,
                                  dropdownSelected: dropdownToEdit,
                                },
                              } as never);
                            } else {
                              navigation.navigate({
                                name: "editAttribute",
                                params: {
                                  dataAttribute: attributeToEdit,
                                  dropdownSelected: dropdownToEdit,
                                  editScreen: true,
                                  hasVariantInConfig: hasVariantInConfig,
                                },
                              } as never);
                            }
                          }}>
                          <Images.icon_edit
                            // style={{ marginRight: scaleWidth(8) }}
                            width={scaleWidth(14)}
                            height={scaleHeight(14)}
                          />
                        </TouchableOpacity>
                      ) : null}
                      {dataCreateProduct?.length > 0 ? null : (
                        <TouchableOpacity onPress={() => setAddVariant(false)}>
                          <Images.ic_close
                            width={scaleWidth(14)}
                            height={scaleHeight(14)}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : null}
          {/* {addDescribe ? (
                        <View
                            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
                            <View
                                style={{
                                    marginHorizontal: scaleWidth(16),
                                    marginVertical: scaleHeight(20),
                                }}>
                                <View>
                                    <View style={{ flexDirection: "row", alignContent: "center" }}>
                                        <Text tx={"createProductScreen.description"}
                                            style={{
                                                fontSize: fontSize.size14,
                                                fontWeight: "700",
                                                marginBottom: scaleHeight(15),
                                            }} />
                                        {description ? (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setModalDescribe(true);
                                                }}>
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
                                        }}>
                                        <Images.ic_close
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
                                            <Images.ic_plusCircleBlue
                                                width={scaleWidth(14)}
                                                height={scaleHeight(14)}
                                            />
                                            <Text tx={"createProductScreen.addDescription"}
                                                style={{
                                                    color: "#0078d4",
                                                    fontSize: fontSize.size12,
                                                    marginLeft: scaleWidth(4),
                                                }} />
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <Text text={description} />
                                )}
                            </View>
                        </View>
                    ) : null} */}
          {/* <View style={styles.viewLine2} /> */}
          {nameValue.length > 0 || attributes.length > 0 ? (
            <View style={{ backgroundColor: 'white', marginTop: scaleHeight(16) }}>
              <View >
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: scaleHeight(16),
                    marginHorizontal: scaleWidth(margin.margin_16),
                  }}
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
              {/* ) : null} */}

              {showDetails && (
                <View
                  style={[
                    styles.viewDetails,
                    { marginHorizontal: scaleWidth(16) },
                  ]}>
                  <View style={styles.viewTitleDetail}>
                    <Text
                      style={{ fontWeight: "600", fontSize: fontSize.size12 }}>
                      Thuộc tính
                    </Text>
                    <Text
                      style={{ fontWeight: "600", fontSize: fontSize.size12 }}>
                      Giá trị
                    </Text>
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
                                value={dto.value.join("/")}
                                styleAttribute={{
                                  paddingHorizontal: scaleWidth(
                                    padding.padding_12
                                  ),
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
            setRetailPriceProduct(data.price);
            setModalRetailPrice(false);
            setDataModal([{ min: "", price: "" }]);
          }}
          dataAdd={dataModal}
        />
        <Modal
          isVisible={modalImages}
          onBackdropPress={() => setModalImages(false)}>
          <View>
            {imagesNote && imagesNote?.length > 0 ? (
              <View>
                <Carousel
                  data={imagesNote}
                  autoplay={false}
                  ref={refCarousel}
                  loop
                  renderItem={({ item, index }: any) => (
                    <View>
                      <Image
                        source={{
                          uri: item,
                        }}
                        defaultSource={Images.imageError}
                        resizeMode="cover"
                        style={{
                          height: scaleHeight(416),
                          width: scaleWidth(294),
                          borderRadius: 16,
                          alignSelf: "center",
                        }}></Image>
                    </View>
                  )}
                  sliderWidth={Dimensions.get("window").width - 32}
                  itemWidth={Dimensions.get("window").width - 32}
                  firstItem={activeSlide}
                  onSnapToItem={(index) => setActiveSlide(index)}
                  lockScrollWhileSnapping={true}
                  enableMomentum={false}
                  decelerationRate={0.5}
                />
                <Pagination
                  dotsLength={imagesNote.length > 0 && imagesNote.length}
                  activeDotIndex={activeSlide}
                  dotStyle={{
                    borderRadius: 8,
                    height: scaleHeight(14),
                    width: scaleWidth(14),
                    borderColor: colors.palette.neutral100,
                    borderWidth: 2,
                  }}
                  dotColor={"#BBB9B9"}
                  inactiveDotColor={"#BBB9B9"}
                  inactiveDotOpacity={1}
                  inactiveDotScale={1}
                  inactiveDotStyle={{
                    width: scaleWidth(8),
                    height: scaleHeight(8),
                    borderRadius: 5,
                    borderColor: "#BBB9B9",
                    borderWidth: 2,
                  }}
                />
              </View>
            ) : null}
          </View>
        </Modal>
        <PriceModal
          isVisible={modalWholesalePrice}
          setIsVisible={() => setModalWholesalePrice(false)}
          title={"productDetail.wholesalePrice"}
          onCancel={() => {
            setModalWholesalePrice(false);
            dataModal?.length !== 0
              ? setDataModal([])
              : setDataModal([{ min: "", price: "" }]);
          }}
          onConfirm={(data) => {
            setWholesalePriceProduct(data.price);
            setModalWholesalePrice(false);
            setDataModal([]);
          }}
          dataAdd={dataModal}
        />
        <PriceModal
          isVisible={modalRetailPrice1}
          setIsVisible={() => setModalRetailPrice1(false)}
          title={"productDetail.retailPrice"}
          onCancel={() => {
            setModalRetailPrice1(false);
            dataModal.length !== 0
              ? setDataModal([])
              : setDataModal([{ min: "", price: "" }]);
          }}
          onConfirm={(data) => {
            // setRetailPriceProduct(data.price)
            dataCreateProduct[indexVariant].retailPrice = data.price;
            setModalRetailPrice1(false);
            setDataModal([]);
          }}
          dataAdd={dataModal}
        />
        <PriceModal
          isVisible={modalWholesalePrice1}
          setIsVisible={() => setModalWholesalePrice1(false)}
          title={"productDetail.wholesalePrice"}
          onCancel={() => {
            setModalWholesalePrice1(false);
            dataModal.length !== 0
              ? setDataModal([])
              : setDataModal([{ min: "", price: "" }]);
          }}
          onConfirm={(data) => {
            // setWholesalePriceProduct(data.price);
            dataCreateProduct[indexVariant].wholesalePrice = data.price;
            setModalWholesalePrice1(false);
            setDataModal([]);
          }}
          dataAdd={dataModal}
        />

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            paddingVertical: scaleHeight(20),
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              width: scaleWidth(165),
              height: scaleHeight(48),
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#c8c8c8",
            }}>
            <Text tx={"common.cancel"} style={{ fontSize: fontSize.size14 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={methods.handleSubmit(submitAdd)}
            style={{
              width: scaleWidth(150),
              height: scaleHeight(48),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: "#0078d4",
            }}>
            <Text
              tx={"createProductScreen.done"}
              style={{ fontSize: fontSize.size14, color: "white" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </FormProvider>
  );
};
const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: "#F3f4f9",
    flex: 1,
  },
  btnLibrary: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0078d4",
    borderRadius: 8,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(7),
    marginBottom: scaleHeight(10),
  },
  viewViewDetail: {
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(20),
  },
  btnCamera: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0078d4",
    borderRadius: 8,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(7),
  },
  textTitleViewPrice: {
    fontWeight: "500",
    fontSize: fontSize.size12,
    color: colors.palette.dolphin,
    lineHeight: scaleHeight(14),
  },
  btnAddProperties: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: scaleHeight(7),
    borderRadius: 8,
    borderColor: "#0078d4",
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
  textTitle: {
    fontWeight: "700",
    fontSize: fontSize.size12,
    lineHeight: scaleHeight(14.52),
    color: colors.palette.neutral900,
    marginBottom: scaleHeight(margin.margin_12),
  },
  textNameNCC: {
    marginBottom: scaleHeight(2),
    fontWeight: "500",
    fontSize: fontSize.size10,
    color: colors.palette.nero,
  },
  textDolphin12: {
    fontWeight: "400",
    fontSize: fontSize.size12,
    color: colors.palette.dolphin,
  },
  textNameClassification: {
    fontWeight: "400",
    fontSize: fontSize.size10,
    lineHeight: scaleHeight(12.1),
    color: colors.palette.dolphin,
  },
});
