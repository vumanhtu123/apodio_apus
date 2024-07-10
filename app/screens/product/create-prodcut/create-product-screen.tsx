import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Linking,
  TouchableOpacity,
  View,
} from "react-native";
import { Images } from "../../../../assets/index";
import { Header } from "../../../components/header/header";
import { Text } from "../../../components/text/text";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
// import { styles } from "./styles"
import ProductAttribute from "../component/productAttribute";
import { ScrollView } from "react-native-gesture-handler";
import { RESULTS } from "react-native-permissions";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { TextField } from "../../../components/text-field/text-field";
import { Switch } from "../../../components";
import { InputSelect } from "../../../components/input-select/inputSelect";
import DropdownModal from "../component/multiSelect";
import PriceModal from "../component/modal-price";
import DescribeModal from "../component/modal-describe";
import ImagesGroup from "../component/imageGroup";
import { useStores } from "../../../models";
import {
  addCommas,
  checkArrayIsEmptyOrNull,
  convertAttributeRetailPrice,
  convertAttributeWholesalePrice,
  convertRetailPrice,
  convertWholesalePrice,
  formatCurrency,
  formatNumberByString,
  formatStringToFloat,
  mapDataDistribute,
  parternValidateSku,
  removeNonNumeric,
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
// import { styles } from "./styles";
import {
  checkCameraPermission,
  checkLibraryPermission,
  requestCameraPermission,
  requestLibraryPermission,
} from "../../../utils/requesPermissions";
import ImageProduct from "./imageProduct";
import { styles } from "./styles";
import ItemWeight from "../component/weight-component";

export const ProductCreateScreen: FC = (item) => {
  const navigation = useNavigation();
  const [modalImage, setModalImage] = useState(false);
  const [imagesNote, setImagesNote] = useState<any>([]);
  const [imagesURLSlider, setImagesURLSlider] = useState<any>([]);
  const [valuePurchase, setValuePurchase] = useState(false);
  const [valueSwitchUnit, setValueSwitchUnit] = useState(false);
  const [modalRetailPrice, setModalRetailPrice] = useState(false);
  const [modalWholesalePrice, setModalWholesalePrice] = useState(false);
  const [modalRetailPrice1, setModalRetailPrice1] = useState(false);
  const [modalWholesalePrice1, setModalWholesalePrice1] = useState(false);
  const [wholesalePriceProduct, setWholesalePriceProduct] = useState([]);
  const [modalDescribe, setModalDescribe] = useState(false);
  const [modalcreateUnit, setModalcreateUnit] = useState(false);
  const [addDescribe, setAddDescribe] = useState(false);
  const [addVariant, setAddVariant] = useState(false);
  const [dataBrand, setDataBrand] = useState([]);
  const [dataCategory, setDataCategory] = useState<any>([]);
  const [sku, setSku] = useState("");
  const [nameProduct, setNameProduct] = useState("");
  const [category, setCategory] = useState({ label: "", id: 0 });
  const [brand, setBrand] = useState({ label: "", id: 0 });
  const [brands, setBrands] = useState({
    id: 0,
    label: "Mặc định",
    label2: "DEFAULT",
  });
  const [dataTagConvert, setDataTagConvert] = useState<{}[]>([]);
  const [dataGroupAttribute, setDataGroupAttribute] = useState([]);
  const [arrUnitGroupData, setUnitGroupData] = useState([] as any);
  const [detailUnitGroupData, setDetailUnitGroupData] = useState();
  const [retailPriceProduct, setRetailPriceProduct] = useState([]);
  const [costPriceProduct, setCostPriceProduct] = useState(0);
  const [listPriceProduct, setListPriceProduct] = useState(0);
  const [description, setDescription] = useState("");
  const [indexVariant, setIndexVariant] = useState(0);
  const [defaultTags, setDefaultTags] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [attributeIds, setAttributeIds] = useState([]);
  const [textAttributes, setTextAttributes] = useState([]);
  const [errorSku, setErrorSku] = useState("");
  const [dataModal, setDataModal] = useState<{}[]>([]);
  const { productStore, unitStore, categoryStore, vendorStore } = useStores();
  const [selectedItems, setSelectedItems] = useState([]);
  const [dataCreateProduct, setDataCreateProduct] = useState([]);
  const [hasVariantInConfig, setVariantInConfig] = useState(false);
  const {
    control,
    handleSubmit,
    // formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "all",
  });
  const [uomGroupId, setUomGroupId] = useState({ id: "", label: "" });
  const [uomId, setUomId] = useState({ id: "", label: "", uomGroupLineId: '' });
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
  const [modalImages, setModalImages] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const refCarousel = useRef(null);
  const methods = useForm({ defaultValues: { productName: '', costPrice: '', listPrice: '', SKU: '', weight: '', weightOriginal: '', volumeOriginal: '' } })
  const a = useRef(1)
  console.log('re-render', a.current++)

  const arrBrands = [
    { id: 3746, label: "Mặc định", label2: "DEFAULT" },
    { id: 4638, label: "Lô", label2: "LOTS" },
    { id: 4398, label: "Serial", label2: "SERIAL" },
  ];

  useEffect(() => {
    setBrands(arrBrands[0]);
    getListBrand();
    getListCategory();
    getListTags();
    getListUnitGroup(false);
  }, []);

  console.log('--N----attributeValueSwitch------', isVariantInConfig)
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
      if (selectedGroupAttribute !== undefined && isVariantInConfig !== undefined) {
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
          uomGroupLineId: data.originalUnit.uomGroupLineId
        };
        setUomId(uomId);
      } else {
        console.error("Failed to fetch list unit:", unitResult);
      }
    }
  };

  const getListUnitGroup = async (valueSwitchUnit: boolean) => {
    let unitResult = null;
    if (valueSwitchUnit) {
      unitResult = await unitStore.getListUnitGroup();
      console.log("getListUnitGroup---------------------:", unitResult);
    } else {
      unitResult = await unitStore.getListUnit();
      console.log("getListUnit---------------------:", JSON.stringify(unitResult));
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
      const abc = [...new Set(attributeArr?.flatMap((item: any)=> item.idGroup))]
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
          // id: null,
          name: item,
          imageUrls: imagesNote,
          costPrice: methods.getValues("costPrice"),
          retailPrice: retailPriceProduct,
          listPrice: methods.getValues("listPrice"),
          wholesalePrice: wholesalePriceProduct,
          attributeValues: [],
          weight: {
            weight: methods.watch(`weight`), weightOriginal: methods.watch(`weightOriginal`),
            volumeOriginal: methods.watch(`volumeOriginal`), uom: valueSwitchUnit == false ? uomId : detailUnitGroupData?.originalUnit
          }
        };
      });

      newArr5.forEach((item, index) => (dataArr[index].attributeValues = item));
      setDataCreateProduct(dataArr);
    }
  }, [attributeArr]);
  const getListCategory = async () => {
    const data = await categoryStore.getListCategoriesModal(0, 200);
    console.log("get list category", data);
    // setTotalPage(data.response.data.totalPages)
    // if (page === 0) {
    setDataCategory(data.response.data.content);
    // } else {
    //   setDataCategory(prevData => [...prevData, ...data.response.data.content]);
    // }
  };
  const getListBrand = async () => {
    const data = await productStore.getListBrand();
    setDataBrand(data.result.data.content);
  };

  const getListTags = async () => {
    const data = await productStore.getListTagProduct();
    console.log("get list tag--", JSON.stringify(data));
    setDataTagConvert(
      data.result.data.content.map((item: { name: any; id: any }) => {
        return { text: item.name, value: item.id };
      })
    );
  };

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data), 'asdjghas')
    console.log(dataCreateProduct)
  }

  const submitAdd = async (data: any) => {
    console.log(data, '1268359812')
    console.log(JSON.stringify(dataCreateProduct))
    let hasError = false
    if (parternValidateSku.test(data.SKU) === true) {
      hasError = false
    } else {
      methods.setError("SKU", { type: 'validate', message: "Mã SKU gồm chữ và số" })
      hasError = true
    }
    if (data.productName.trim() !== "" ) {
      hasError = false
    } else {
      methods.setError("productName", { type: 'validate', message: "Vui lòng nhập thông tin" })
      hasError = true
    }
    if (uomId.id === "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.required_information"),
      });
      hasError = true
    }
    if (hasError == true) {
    } else {
      console.log(
        "post-product-data---retailPriceProduct---- : ",
        JSON.stringify(retailPriceProduct)
      );
      const arrDataNew = dataCreateProduct?.map((items: any) => {
        return {
          ...items,
          productPackingLines: items.weight?.weight.length  !== 0 ? items.weight?.weight?.map((item: any) => {
            return {
              uomGroupLineId: item.unit.id,
              amount: item.unit.conversionRate,
              volume: formatStringToFloat(item.volume),
              weight: formatStringToFloat(item.weight1)
            }
          }): []
        };
      })

      const newArr = arrDataNew?.map((item) => {
        return {
          name: methods.getValues("productName") + " - " + item.name,
          imageUrls: item.imageUrls,
          costPrice: formatStringToFloat(item.costPrice),
          retailPrice: item.retailPrice,
          listPrice: formatStringToFloat(item.listPrice),
          wholesalePrice: item.wholesalePrice,
          attributeValues: item.attributeValues,
          baseProductPackingLine: item.weight?.weightOriginal.trim() === "" && item.weight?.volumeOriginal.trim() === "" ? {} : (valueSwitchUnit === false ? {
            uomGroupLineId: null,
            amount: 1,
            volume: formatStringToFloat(item.weight?.volumeOriginal),
            weight: formatStringToFloat(item.weight?.weightOriginal),
          } : {
            uomGroupLineId: detailUnitGroupData?.originalUnit?.uomGroupLineId ,
            amount: 1,
            volume: formatStringToFloat(item.weight?.volumeOriginal),
            weight: formatStringToFloat(item.weight?.weightOriginal),
          }),
          productPackingLines: item.weight?.weightOriginal.trim() === "" && item.weight?.volumeOriginal.trim() === "" ? [] : (valueSwitchUnit == false ? [] : item?.productPackingLines)
        };
      });
      const dataPrice2 = retailPriceProduct.map((item: any) => {
        return {
          min: formatStringToFloat(item.min),
          price: Number(formatNumberByString(item.price.toString())),
        };
      });
      const dataPrice = wholesalePriceProduct.map((item: any) => {
        return {
          min: formatStringToFloat(item.min),
          price: Number(formatNumberByString(item.price.toString())),
        };
      });
      const newArr2 = newArr.map((item) => {
        return {
          ...item,
          retailPrice: item.retailPrice?.map((items: any) => {
            return {
              ...items,
              price: formatNumberByString(items.price.toString()),
            };
          }),
          wholesalePrice: item.wholesalePrice?.map((items: any) => {
            return {
              ...items,
              price: formatNumberByString(items.price.toString()),
            };
          }),
          costPrice: Number(formatNumberByString(item.costPrice.toString())),
          listPrice: Number(formatNumberByString(item.listPrice.toString())),
        };
      });
      const arrUrlRoot = imagesURLSlider.map((obj) => obj.result);
      console.log(
        "post-product-data---submitAdd---- : ",
        JSON.stringify(newArr)
      );
      console.log("submitAdd---------------------:", imagesURLSlider);
      const packingLine = data.weight?.map((item: any)=>{
        return {
          uomGroupLineId: item.unit.id,
          amount: item.unit.conversionRate,
          volume: formatStringToFloat(item.volume),
          weight: formatStringToFloat(item.weight1),
        }
      })
      const doneData = {
        sku: data.SKU === "" ? null: data.SKU,
        name: data.productName,
        purchaseOk: valuePurchase,
        imageUrls: imagesNote,
        saleOk: true,
        vendorIds: selectedIds! || [],
        managementForm: brands.label2,
        productCategoryId: category.id || null,
        brandId: brand.id || null,
        tagIds: selectedItems,
        hasUomGroupInConfig: valueSwitchUnit,
        uomId: valueSwitchUnit === false ? uomId.id : null,
        uomGroupId: valueSwitchUnit === false ? null : uomGroupId.id,
        hasVariantInConfig: hasVariantInConfig  === false?  hasVariantInConfig : !checkArrayIsEmptyOrNull(newArr2),
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
        baseTemplatePackingLine: data.weightOriginal === "" && data.volumeOriginal === "" ? {} : {
          uomGroupLineId: valueSwitchUnit == false ? null : detailUnitGroupData?.originalUnit?.uomGroupLineId,
          amount: 1,
          volume: formatStringToFloat(data.volumeOriginal),
          weight: formatStringToFloat(data.weightOriginal)
        },
        productTemplatePackingLines:data.weightOriginal === "" && data.volumeOriginal === "" ? [] : (valueSwitchUnit == false ? [] : packingLine),
        activated: true,
      }
      console.log('Done data create: ', JSON.stringify(doneData))
      const result = await productStore.postProduct(doneData);
      console.log("data test---------", JSON.stringify(result));
      if (result.kind === "ok") {
        navigation.navigate({name: "successScreen", params: {
          idProduct: result.result.data.id,
        }}as never);
      } else {
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
          uploadImages(selectedAssets, true, -1);
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
    }
  };

  const handleDeleteImage = (index: number) => {
    const newArr = dataCreateProduct.slice();
    newArr[index].imageUrls = [];
    console.log("==========> handleDeleteImage--All");
    setDataCreateProduct(newArr);
  };
  const handleDeleteImageItem = (index: number) => {
    console.log(
      "-------productStore.imageModalIndex-----------",
      productStore.imageModalIndex
    );
    const newArr = dataCreateProduct.slice();
    const newArrUrl = newArr[index].imageUrls.slice();
    newArrUrl.splice(productStore.imageModalIndex, 1);
    newArr[index].imageUrls = newArrUrl;
    console.log("==========> handleDeleteImageItem---", newArr);
    setDataCreateProduct(newArr);
  };
  const handleLibraryUseProduct = async (itemId: any, indexItem: any) => {
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
        console.log("==========> response---Phan loai", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets && response.assets.length > 0) {
          const selectedAssets = response.assets.map((asset) => asset);
          console.log(
            "first ",
            selectedAssets.length + productStore.imagesLimit
          );
          if (selectedAssets.length + productStore.imagesLimit > 6) {
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
        console.log("==========> responsePhan loai upload", response);
        if (response.didCancel) {
          console.log("User cancelled photo picker1");
        } else if (response.errorCode) {
          console.log("ImagePicker Error2: ", response.errorCode);
        } else if (response.errorCode) {
          console.log("User cancelled photo picker1");
        } else if (response?.assets && response.assets.length > 0) {
          const selectedAssets = response.assets.map((asset) => asset);
          // uploadImages(selectedAssets, false, indexItem);
          console.log(
            "first ",
            selectedAssets.length + productStore.imagesLimit
          );
          if (selectedAssets.length + productStore.imagesLimit > 6) {
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

  const handleRemoveImage = (index: number, url: any) => {
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
    return detailUnitGroupData
      ? detailUnitGroupData.uomGroupLines != null
        ? detailUnitGroupData.uomGroupLines
        : []
      : [];
  };

  const goToChooseSupplierScreen = () => {
    const listIds = selectedIds;
    navigation.navigate({ name: "ChooseVendorScreen", params: { listIds, mode: 'create' } } as never);
  }

  const arrBrand = dataBrand.map((item) => {
    return { label: item.name, id: item.id };
  });
  const arrCategory = dataCategory.map((item: { name: any; id: any }) => {
    return { label: item.name, id: item.id };
  });

  const handleDeleteProduct = (index: any) => {
    const updatedData = [
      ...dataCreateProduct.slice(0, index),
      ...dataCreateProduct.slice(index + 1),
    ];
    setDataCreateProduct(updatedData);
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
  // const isValid = isFormValid(errors, watch("productName"));


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
                useCamera={() => handleCameraUse()}
                useLibrary={() => handleLibraryUse()}
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
                      // methods.setValue("SKU", value.toUpperCase())
                      // if (parternValidateSku.test(value.toUpperCase()) === true) {
                      //   // setSku(value.toUpperCase());
                      // methods.clearErrors()
                      //   // setErrorSku("");
                      // } else {
                      //   methods.setError("SKU", {type: 'validate', message: "Mã SKU gồm chữ và số" })
                      //   // setErrorSku("Mã SKU gồm chữ và số");
                      // }
                    }}
                    placeholderTx="productScreen.placeholderSKU"
                  // RightIcon={Images.ic_QR}
                  />
                )}
                defaultValue={""}
                name="SKU"
                // rules={{
                //   pattern: {
                //     value: parternValidateSku,
                //     message: "Mã SKU gồm chữ và số"
                //   },
                // }}
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
                    onClearText={() => {onChange("")
                      // methods.setValue("productName", value)
                    }}
                    onChangeText={(value) => {
                      // setNameProduct(value), 
                      onChange(value)
                      // methods.setValue("productName", value)
                    }}
                    placeholderTx="productScreen.placeholderProductName"
                    // RightIcon={Images.ic_QR}
                    isImportant
                  />
                )}
                defaultValue={""}
                name="productName"
                // rules={{
                //   required: "Vui lòng nhập thông tin",
                // }}
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
              <View style={styles.viewLinePriceProduct}>
                <TouchableOpacity
                  style={styles.viewBtnPriceProduct}
                  onPress={() => {
                    setModalRetailPrice(true), setDataModal(retailPriceProduct);
                  }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        tx={"productScreen.priceRetail"}
                        style={styles.textTitleViewPrice}
                      />
                      {retailPriceProduct.length > 0 &&
                        retailPriceProduct.length !== 1 ? (
                        <Text
                          text={convertRetailPrice(retailPriceProduct)}
                          numberOfLines={1}
                          style={styles.textTextField}
                        />
                      ) : retailPriceProduct.length > 0 &&
                        retailPriceProduct.length === 1 ? (
                        <Text
                          text={retailPriceProduct[0]?.price}
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
                      inputStyle={styles.textTextField}
                      value={value}
                      onBlur={onBlur}
                      showRightIcon={false}
                      onChangeText={(value) => {
                        onChange(
                          vendorStore.checkSeparator === "DOTS"
                            ? formatCurrency(removeNonNumeric(value))
                            : addCommas(removeNonNumeric(value))
                        );
                        // setCostPriceProduct(value);
                        // methods.setValue('costPrice', value)
                      }}
                      placeholderTx="productScreen.placeholderPrice"
                    />
                  )}
                  defaultValue={""}
                  name="costPrice"
                />
              </View>
              <View style={styles.viewLinePriceProduct}>
                <Controller
                  control={methods.control}
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
                      onChangeText={(value) => {
                        onChange(
                          vendorStore.checkSeparator === "DOTS"
                            ? formatCurrency(removeNonNumeric(value))
                            : addCommas(removeNonNumeric(value))
                        );
                        // setListPriceProduct(value);
                        // methods.setValue('listPrice', value)
                      }}
                      placeholderTx="productScreen.placeholderPrice"
                    />
                  )}
                  defaultValue={""}
                  name="listPrice"
                />
                <TouchableOpacity
                  style={styles.viewBtnPriceProduct}
                  onPress={() => {
                    setModalWholesalePrice(true);
                    setDataModal(wholesalePriceProduct);
                  }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ flex: 1 }}>
                      <Text
                        tx={"productScreen.priceWholesale"}
                        style={styles.textTitleViewPrice}
                      />
                      {wholesalePriceProduct.length > 0 &&
                        wholesalePriceProduct.length !== 1 ? (
                        <Text
                          text={convertWholesalePrice(wholesalePriceProduct)}
                          numberOfLines={1}
                          style={styles.textTextField}
                        />
                      ) : wholesalePriceProduct.length > 0 &&
                        wholesalePriceProduct.length === 1 ? (
                        <Text
                          text={wholesalePriceProduct[0]?.price}
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
              </View>
            </View>
          </View>
          {valuePurchase === true ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
              <View style={styles.viewViewDetail}>
                <Text
                  tx={"createProductScreen.infoSupplier"}
                  style={styles.textTitleView}
                />
                <TouchableOpacity
                  onPress={() => goToChooseSupplierScreen()}
                  style={[styles.viewLineSwitchUnit, { marginBottom: 0 }]}>
                  {selectedIds?.length > 0 ? (
                    <Text style={styles.textWeight400Black}>
                      {selectedIds.length} nhà cung cấp
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
          <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
            <View style={styles.viewViewDetail}>
              <Text
                tx={"createProductScreen.inventory_management"}
                style={styles.textTitleView}
              />
              <InputSelect
                titleTx={"createProductScreen.form_of_management"}
                // hintText="Mặc định"
                isSearch={false}
                required={true}
                arrData={arrBrands}
                dataDefault={brands.label}
                onPressChoice={(item: any) => {
                  setBrands(item);
                }}
              // styleView={{ width: scaleWidth(164), height: scaleHeight(56), marginRight: scaleWidth(15) }}
              />
            </View>
          </View>

          {/* View Thông tin thêm */}
          <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
            <View style={styles.viewViewDetail}>
              <Text
                tx={"createProductScreen.infoMore"}
                style={styles.textTitleView}
              />
              <InputSelect
                titleTx={"inforMerchant.Category"}
                hintTx={"productScreen.select_catgory"}
                isSearch
                required={false}
                arrData={arrCategory}
                dataDefault={category.label}
                // onLoadMore={loadMoreCategories}
                // handleOnSubmitSearch={handleSubmitSearchCategory}
                // onChangeText={handleSearchCategoryChange}
                onPressChoice={(item: any) => {
                  setCategory(item);
                }}
                styleView={{ marginBottom: scaleHeight(15) }}
              />
              <InputSelect
                titleTx={"productScreen.trademark"}
                hintTx={"productScreen.select_trademark"}
                isSearch
                required={false}
                arrData={arrBrand}
                dataDefault={brand.label}
                onPressChoice={(item: any) => {
                  setBrand(item);
                }}
                styleView={{ marginBottom: scaleHeight(15) }}
              // styleView={{ width: scaleWidth(164), height: scaleHeight(56), marginRight: scaleWidth(15) }}
              />
              <DropdownModal
                required={false}
                arrData={dataTagConvert}
                onPressChoice={(item: any) => {
                  const items = item.map((item: { value: any }) => item.value);
                  handleSelect(items);
                }}
                dataEdit={defaultTags}
                titleTx={"productScreen.tag"}
                hintTx={"productScreen.select_tag"}
                styleView={{ marginBottom: scaleHeight(15) }}
              />
            </View>
          </View>
          <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
            <View style={styles.viewViewDetail}>
              <Text
                tx={
                  valueSwitchUnit
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
                  value={valueSwitchUnit}
                  onToggle={() => {
                    // setUomGroupId({ id: "", label: "" })
                    setValueSwitchUnit(!valueSwitchUnit);
                    getListUnitGroup(!valueSwitchUnit);
                    methods.setValue('weightOriginal', '')
                    methods.setValue('volumeOriginal', '')
                  }}
                />
              </View>
              <InputSelect
                titleTx={
                  valueSwitchUnit
                    ? "productScreen.unit_group"
                    : "productScreen.unit"
                }
                hintTx={
                  valueSwitchUnit
                    ? "productScreen.select_unit_group"
                    : "productScreen.select_unit"
                }
                isSearch
                required={true}
                arrData={arrUnitGroupData}
                dataDefault={valueSwitchUnit ? uomGroupId.label : uomId.label}
                onPressChoice={(item: any) => {
                  if (valueSwitchUnit) {
                    setUomGroupId(item);
                    getDetailUnitGroup(item.id);
                    methods.setValue('weight', [])
                    methods.setValue('weightOriginal', '')
                    methods.setValue('volumeOriginal', '')
                  } else {
                    setUomId(item);
                    methods.setValue('weightOriginal', '')
                    methods.setValue('volumeOriginal', '')
                  }
                }}
                styleView={{ marginBottom: scaleHeight(6) }}
              />
              <View style={{ marginBottom: scaleHeight(15) }}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    if (valueSwitchUnit) {
                      navigation.navigate("createConversionGroup" as never)
                    } else {
                      setModalcreateUnit(true);
                    }
                  }}>
                  <Images.ic_plusCircleBlue
                    width={scaleWidth(14)}
                    height={scaleHeight(14)}
                  />
                  <Text
                    tx={
                      valueSwitchUnit
                        ? "productScreen.create_unit_group"
                        : "productScreen.create_unit"
                    }
                    style={styles.textWeight400Blue}
                  />
                </TouchableOpacity>
              </View>
              {valueSwitchUnit ? (
                <>
                  <View style={styles.viewLineSwitchUnit}>
                    <Text
                      tx={"createProductScreen.originalUnit"}
                      style={{ fontSize: fontSize.size14 }}
                    />
                    {/* Hiển thị đơn vị gốc (baseUnit) từ arrDVT dựa trên group.label */}
                    {detailUnitGroupData ? (
                      <Text style={styles.textWeight600}>
                        {detailUnitGroupData.originalUnit.name}
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
                      <Text style={styles.textWeight600}>
                        {item.conversionRate}{" "}
                        {detailUnitGroupData?.originalUnit?.name}
                      </Text>
                    </View>
                  ))}
                </>
              ) : null}
            </View>
          </View>
          {uomId?.label?.trim() !== "" ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
              <View style={[styles.viewViewDetail]}>
                <ItemWeight
                  dataUnitGroup={valueSwitchUnit == false ? [] : detailUnitGroupData?.uomGroupLines}
                  checkList={valueSwitchUnit}
                  data={valueSwitchUnit == false ? uomId : detailUnitGroupData?.originalUnit}
                  setAdd={methods.watch(`weight`)}
                />
              </View>
            </View>
          ) : null}
          {addVariant ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
              <View style={styles.viewViewDetail}>
                <Text
                  tx="createProductScreen.classify"
                  style={{ fontSize: fontSize.size14, fontWeight: "700" }}
                />
                
                {dataGroupAttribute.length > 0 ? (
                    <View style={styles.viewDetails}>
                      <View style={styles.viewTitleDetail}>
                        <Text style={{ fontWeight: "600", fontSize: fontSize.size12 }}>
                          Thuộc tính
                        </Text>
                        <Text style={{ fontWeight: "600", fontSize: fontSize.size12 }}>
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
                                value={dto.productAttributeValue.map(value => value.value).join('/')}
                                styleAttribute={{
                                  paddingHorizontal: scaleWidth(padding.padding_12),
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
                ) : <View>
                  {dataCreateProduct.length > 0 ? (
                  <FlatList
                    data={dataCreateProduct}
                    keyExtractor={(item, index) => index.toString()}
                    scrollEnabled={false}
                    renderItem={({ item, index }: any) => {
                      return (
                        <ScrollView horizontal={true}>
                          <View style={{ marginTop: scaleHeight(15) }}>
                            <Text>{methods.watch('productName') + " - " + item.name}</Text>
                            <View
                              style={{
                                flexDirection: "row",
                                marginTop: scaleHeight(6),
                                // paddingVertical : 5,
                                alignItems: "center",
                              }}>
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                  marginBottom: scaleHeight(8),
                                }}>
                                <TouchableOpacity
                                  style={{ marginRight: scaleWidth(6) }}
                                  onPress={() => handleDeleteProduct(index)}>
                                  <Images.ic_minusCircle
                                    width={scaleWidth(14)}
                                    height={scaleHeight(14)}
                                  />
                                </TouchableOpacity>
                                <ImagesGroup
                                  arrData={item.imageUrls || []}
                                  onchangeData={(data) => {
                                    console.log(
                                      "---------------#######---------",
                                      data
                                    );
                                  }}
                                  onPressOpenLibrary={() => {
                                    if (item.imageUrls.length < 6) {
                                      handleLibraryUseProduct(
                                        item.imageUrls,
                                        index
                                      );
                                      productStore.setImagesLimit(
                                        item.imageUrls.length
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
                                  }}
                                  onPressDelete={() => handleDeleteImage(index)}
                                  onPressDelete1={() =>
                                    handleDeleteImageItem(index)
                                  }
                                />
                              </View>
                              <TouchableOpacity onPress={() => navigation.navigate({ name: 'editWeight', params: { data: item.weight, check: valueSwitchUnit, unitData: valueSwitchUnit == false ? uomId : detailUnitGroupData?.originalUnit, unitOrigin: valueSwitchUnit == false ? [] : detailUnitGroupData?.uomGroupLines, index: index, dataCreateProduct: dataCreateProduct, screen: 'create' } } as never)}
                                style={{ marginHorizontal: scaleWidth(2), alignItems: 'center', justifyContent: 'center' }}>
                                <Text tx={'productScreen.weight'} style={[styles.textTitleViewPrice, { color: colors.nero }]} />
                                <Images.icon_edit />
                              </TouchableOpacity>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: scaleWidth(10),
                                  // alignItems: 'center'
                                }}>
                                <TouchableOpacity
                                  style={styles.viewBtnPriceVariants}
                                  onPress={() => {
                                    setModalRetailPrice1(true);
                                    setDataModal(item.retailPrice);
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
                                        style={styles.textTitleViewPrice}
                                      />
                                      {item.retailPrice.length > 0 &&
                                        item.retailPrice.length !== 1 ? (
                                        <Text
                                          text={convertAttributeRetailPrice(
                                            dataCreateProduct,
                                            index
                                          )}
                                          numberOfLines={1}
                                          style={styles.textTextField}
                                        />
                                      ) : item.retailPrice.length > 0 &&
                                        item.retailPrice.length === 1 ? (
                                        <Text
                                          text={item.retailPrice[0]?.price}
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
                                      RightIconClear={Images.icon_delete2}
                                      // error={errors?.priceRetail?.message}
                                      onClearText={() => onChange("")}
                                      onChangeText={(value) => {
                                        onChange(
                                          vendorStore.checkSeparator === "DOTS"
                                            ? formatCurrency(
                                              removeNonNumeric(value)
                                            )
                                            : addCommas(removeNonNumeric(value))
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
                                      RightIconClear={Images.icon_delete2}
                                      // error={errors?.priceRetail?.message}
                                      onClearText={() => onChange("")}
                                      onChangeText={(value) => {
                                        onChange(
                                          vendorStore.checkSeparator === "DOTS"
                                            ? formatCurrency(
                                              removeNonNumeric(value)
                                            )
                                            : addCommas(removeNonNumeric(value))
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
                                }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}>
                                  <View style={{ flex: 1 }}>
                                    <Text
                                      tx={"productScreen.priceWholesale"}
                                      style={styles.textTitleViewPrice}
                                    />
                                    {item.wholesalePrice.length > 0 &&
                                      item.wholesalePrice.length !== 1 ? (
                                      <Text
                                        text={convertAttributeWholesalePrice(
                                          dataCreateProduct,
                                          index
                                        )}
                                        numberOfLines={1}
                                        style={styles.textTextField}
                                      />
                                    ) : item.wholesalePrice.length > 0 &&
                                      item.wholesalePrice.length === 1 ? (
                                      <Text
                                        text={item.wholesalePrice[0]?.price}
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
                      }>
                      <Images.ic_plusBlue
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
                }



                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    flexDirection: "row",
                  }}>
                  {dataCreateProduct.length > 0 ? (
                    <TouchableOpacity onPress={() => {
                      navigation.navigate({ name: 'editAttribute', params: { dataAttribute: attributeArr, dropdownSelected: dropdownSelected, hasVariantInConfig: hasVariantInConfig } } as never)
                    }}>
                      <Images.icon_edit
                        // style={{ marginRight: scaleWidth(8) }}
                        width={scaleWidth(14)}
                        height={scaleHeight(14)}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {dataCreateProduct.length > 0 ? null : (
                    <TouchableOpacity onPress={() => setAddVariant(false)}>
                      <Images.ic_close
                        width={scaleWidth(14)}
                        height={scaleHeight(14)}
                      />
                    </TouchableOpacity>
                  )}
                  {dataGroupAttribute.length > 0 ?(
                    <TouchableOpacity onPress={() => {
                      setAddVariant(false)
                      setDataGroupAttribute([])
                      setDataCreateProduct([])
                      setVariantInConfig(false)
                    }}>
                      <Images.ic_close
                        width={scaleWidth(14)}
                        height={scaleHeight(14)}
                        style={{marginLeft: 10}}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          ) : null}
          {addDescribe ? (
            <View
              style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
              <View style={styles.viewViewDetail}>
                <View>
                  <View style={{ flexDirection: "row", alignContent: "center" }}>
                    <Text
                      tx={"createProductScreen.description"}
                      style={styles.textTitleView}
                    />
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
                {description === "" ? (
                  <View style={{}}>
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => setModalDescribe(true)}>
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
          <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
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
                      style={styles.viewBtnInMorInfo}>
                      <Text
                        tx={"createProductScreen.description"}
                        style={styles.textBtnMorInfo}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {addVariant === false ? (
                    <TouchableOpacity
                      onPress={() => setAddVariant(true)}
                      style={styles.viewBtnInMorInfo}>
                      <Text
                        tx={"createProductScreen.productClassification"}
                        style={styles.textBtnMorInfo}
                      />
                    </TouchableOpacity>
                  ) : null}
                  {addDescribe === true && addVariant === true ? (
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

        <PriceModal
          isVisible={modalRetailPrice}
          setIsVisible={() => setModalRetailPrice(false)}
          title={"productDetail.retailPrice"}
          onCancel={() => {
            setModalRetailPrice(false);
            dataModal.length !== 0
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
            style={styles.viewBtnCancel}>
            <Text tx={"common.cancel"} style={styles.textBtnCancel} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={methods.handleSubmit(submitAdd)}
            style={styles.viewBtnConfirm}>
            <Text tx={"createProductScreen.done"} style={styles.textBtnConfirm} />
          </TouchableOpacity>
        </View>
      </View>
    </FormProvider>
  );
};
