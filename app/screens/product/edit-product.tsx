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
import { colors, fontSize, margin, scaleHeight, scaleWidth } from "../../theme";
import { products, suppliers, detailProduct, listCreateProduct } from "./data";
// import { styles } from "./styles"
import { AutoImage } from "../../../app/components/auto-image/auto-image";
import ProductAttribute from "./component/productAttribute";
import { ScrollView } from "react-native-gesture-handler";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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
  convertAttributeRetailPrice,
  convertAttributeWholesalePrice,
  convertRetailPrice,
  convertWholesalePrice,
  formatCurrency,
  formatNumber,
  formatNumberByString,
  mapDataDistribute,
  removeNonNumeric,
  validateFileSize,
} from "../../utils/validate";
import { G } from "react-native-svg";
import Dialog from "../../components/dialog/dialog";
import {
  hideDialog,
  hideLoading,
  showDialog,
  showToast,
} from "../../utils/toast";
import { translate } from "../../i18n/translate";
import UnitModal from "./component/modal-unit";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Modal from "react-native-modal/dist/modal";
import ImagesGroup from "./component/imageGroup";

export const ProductEditScreen: FC = (item) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [imagesNote, setImagesNote] = useState<any>();
  const [modalImage, setModalImage] = useState(false);
  const [valuePurchase, setValuePurchase] = useState(false);
  const [valueSwitchUnit, setValueSwitchUnit] = useState(false);
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
  const [dataOldCreateProduct, setDataOldCreateProduct] = useState([]);
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const [uomId, setUomId] = useState({ id: "", label: "" });
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
  }: any = route?.params || {};

  useEffect(() => {
    console.log("-----------------dataEdit-------------------", dataEdit);
  }, [dataEdit]);

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
    getListBrand();
    getListCategory();
    getListTags();
    getListUnitGroup(false);
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
        (item: { attributeOutputDtos: any[] }) => {
          item.attributeOutputDtos.forEach(
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
        (item: { attributeOutputDtos: any[]; id?: any }) => {
          item.attributeOutputDtos.forEach(
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

      setRetailPriceProduct(dataEdit?.retailPrice);
      setWholesalePriceProduct(dataEdit?.wholesalePrice);
      setCostPriceProduct(dataEdit?.costPrice);
      setListPriceProduct(dataEdit?.listPrice);
      setSku(dataEdit?.sku);
      setNameProduct(dataEdit?.name);
      if (dataEdit?.description !== "") {
        setAddDescribe(true);
        setDescription(newDataEdit?.description);
      }
      if (newDataEdit?.brand !== null) {
        setBrand({
          id: newDataEdit?.brand?.id,
          label: newDataEdit?.brand?.name,
        });
      } else {
        setBrand({ id: 0, label: "" });
      }
      const newArr = newDataEdit?.productTags?.map(
        (items: { name: any; id: any }) => {
          return { text: items.name, value: items.id };
        }
      );
      const newArr1 = newArr?.map((item: { value: any }) => item.value);
      setSelectedItems(newArr1);
      setDefaultTags(newArr);
      setBrands({
        label2: dataEdit?.managementForm,
        id: 0,
        label: getLabelByList(dataEdit?.managementForm),
      });
      if (dataEdit?.productVariants) {
        setAddVariant(true);
        setDataCreateProduct(newDataEdit?.productVariants);
        setDataOldCreateProduct(newDataEdit?.productVariants);
      }
      setCategory({
        id: newDataEdit?.productCategory?.id,
        label: newDataEdit?.productCategory?.name,
      });
      setImagesNote(newDataEdit?.imageUrls);
      setValuePurchase(newDataEdit?.purchaseOk);
      setValueSwitchUnit(newDataEdit?.hasUomGroupInConfig);
      setUomId({ id: newDataEdit?.uom?.id, label: newDataEdit?.uom?.name });
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
          costPrice: costPriceProduct,
          retailPrice: retailPriceProduct,
          listPrice: listPriceProduct,
          wholesalePrice: wholesalePriceProduct,
          attributeValues: [],
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

  const getListCategory = async () => {
    const data = await categoryStore.getListCategoriesModal(0, 20);
    setDataCategory(data.response.data.content);
  };

  const getListBrand = async () => {
    const data = await productStore.getListBrand();
    setDataBrand(data.result.data.content);
  };

  const getCheckUsingProduct = async () => {
    const data = await productStore.usingProductCheck(productStore.productId);
    if (data && data.kind === "ok") {
      const result = data.result.data;
      console.log("checkUsing:-------", result);
      setProductUsing(result.isUsing);
    } else {
      console.error("Failed to fetch check using:", data);
    }
  };

  const getListTags = async () => {
    const data = await productStore.getListTagProduct();
    setDataTagConvert(
      data.result.data.content.map((item: { name: any; id: any }) => {
        return { text: item.name, value: item.id };
      })
    );
  };

  const submitAdd = async () => {
    if (uomId.id === "") {
      showToast("txtToats.required_information", "error");
    } else {
      const newArr1: never[] = [];
      const newArr = dataCreateProduct?.map((item) => {
        return { ...item, name: nameProduct + " - " + item.name };
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
      const dataPrice2 = retailPriceProduct?.map((item) => {
        return {
          min: item.min,
          price: Number(formatNumberByString(item.price.toString())),
        };
      });
      const dataPrice = wholesalePriceProduct?.map((item) => {
        return {
          min: item.min,
          price: Number(formatNumberByString(item.price.toString())),
        };
      });

      const newArr2 = newArr?.map((item) => {
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
      const data = await productStore?.putProduct(productStore.productId, {
        sku: sku,
        name: nameProduct,
        purchaseOk: valuePurchase,
        imageUrls: imagesNote,
        saleOk: true,
        vendorIds: vendor,
        managementForm: brands.label2,
        productCategoryId: category.id || null,
        brandId: brand.id || null,
        tagIds: selectedItems,
        hasUomGroupInConfig: valueSwitchUnit,
        uomId: uomId.id,
        uomGroupId: uomGroupId.id,
        hasVariantInConfig: !checkArrayIsEmptyOrNull(dataCreateProduct),
        attributeValues: attributeValues,
        textAttributes: textAttributes,
        description: description,
        productVariants: newArr2,
        retailPrice: dataPrice2,
        costPrice: Number(formatNumberByString(costPriceProduct)),
        listPrice: Number(formatNumberByString(listPriceProduct)),
        wholesalePrice: dataPrice,
        deleteVariantIds: newArr1,
      });
      if (data.kind === "ok") {
        showDialog(
          translate("txtDialog.txt_title_dialog"),
          "danger",
          translate("txtDialog.product_repair_successful"),
          "",
          translate("common.ok"),
          () => {
            hideDialog();
            navigation.navigate("productDetailScreen" as any, { reload: true });
          }
        );
      } else {
        console.log("data------------------------------", JSON.stringify(data));
        showDialog(
          translate("txtDialog.txt_title_dialog"),
          "danger",
          data.result.errorCodes[0].message,
          "",
          translate("common.ok"),
          () => {
            hideDialog();
          }
        );
      }
    }
  };

  console.log("dataCreateProduct----------------------", dataCreateProduct);
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
        showToast("txtToats.permission_granted", "success");
      } else {
        console.log("Permission denied");
        showToast("txtToats.permission_denied", "error");
        showDialog(
          translate("txtDialog.permission_allow"),
          "danger",
          translate("txtDialog.allow_permission_in_setting"),
          translate("common.cancel"),
          translate("txtDialog.settings"),
          () => {
            Linking.openSettings();
            hideDialog();
          }
        );
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      showToast("txtToats.permission_blocked", "error");
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
          hideLoading();
          showDialog(
            translate("txtDialog.imageUploadExceedLimitedSize"),
            "danger",
            "",
            "OK",
            "",
            ""
          );
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
            showToast('txtToats.required_maximum_number_of_photos', 'error')
          } else {
            uploadImages(selectedAssets, true, -1);
          }
        }
      });
    } else if (permissionStatus === RESULTS.DENIED) {
      const newStatus = await requestLibraryPermission();
      if (newStatus === RESULTS.GRANTED) {
        console.log("Permission granted");
        showToast("txtToats.permission_granted", "success");
      } else {
        console.log("Permission denied");
        showToast("txtToats.permission_denied", "error");
        showDialog(
          translate("txtDialog.permission_allow"),
          "danger",
          translate("txtDialog.allow_permission_in_setting"),
          translate("common.cancel"),
          translate("txtDialog.settings"),
          () => {
            Linking.openSettings();
            hideDialog();
          }
        );
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      showToast("txtToats.permission_blocked", "error");
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
            showToast('txtToats.required_maximum_number_of_photos', 'error')
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
      showToast("txtToats.permission_granted", "success");
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
        showToast("txtToats.permission_granted", "success");
      } else {
        console.log("Permission denied");
        showToast("txtToats.permission_denied", "error");
        showDialog(
          translate("txtDialog.permission_allow"),
          "danger",
          translate("txtDialog.allow_permission_in_setting"),
          translate("common.cancel"),
          translate("txtDialog.settings"),
          () => {
            Linking.openSettings();
            hideDialog();
          }
        );
      }
    } else if (permissionStatus === RESULTS.BLOCKED) {
      showToast("txtToats.permission_blocked", "error");
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
            showToast('txtToats.required_maximum_number_of_photos', 'error')
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
          } else {
            setErrorContent("Không thể xóa biến thể này!");
            setIsDeleteFailModalVisible(true);
          }
        } else {
          setErrorContent("Không thể xóa biến thể này!");
          setIsDeleteFailModalVisible(true);
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
    navigation.navigate("ChooseVendorScreen", { listIds, mode: "edit" });
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Sửa sản phẩm`}
        style={{ height: scaleHeight(54) }}
      />
      <ScrollView style={{ marginBottom: scaleHeight(20) }}>
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              marginHorizontal: scaleWidth(16),
              marginVertical: scaleHeight(20),
            }}>
            {imagesNote?.length > 0 ? (
              <View
                style={{ flexDirection: "row", marginBottom: scaleHeight(20) }}>
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
                        showToast(
                          "txtToats.required_maximum_number_of_photos",
                          "error"
                        );
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
                        showToast(
                          "txtToats.required_maximum_number_of_photos",
                          "error"
                        );
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
                        showToast(
                          "txtToats.required_maximum_number_of_photos",
                          "error"
                        );
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
                        style={{ fontSize: fontSize.size14, color: "#0078d4" }}>
                        Tải ảnh lên
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (imagesNote.length < 6) {
                        handleCameraUse();
                      } else {
                        showToast(
                          "txtToats.required_maximum_number_of_photos",
                          "error"
                        );
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
                        style={{ fontSize: fontSize.size14, color: "#0078d4" }}>
                        Chụp ảnh
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextField
                  // maxLength={maxLenngthPhoneNumber}
                  keyboardType={null}
                  labelTx={"productScreen.SKU"}
                  style={{
                    marginBottom: scaleHeight(5),
                    justifyContent: "center",
                  }}
                  inputStyle={{ fontSize: fontSize.size16, fontWeight: "500" }}
                  value={value}
                  onBlur={onBlur}
                  defaultValue={sku}
                  RightIconClear={Images.icon_delete2}
                  error={errors?.SKU?.message}
                  onClearText={() => onChange("")}
                  onChangeText={(value) => {
                    onChange(value), setSku(value);
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
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextField
                  // maxLength={maxLenngthPhoneNumber}
                  keyboardType={null}
                  labelTx={"productScreen.productName"}
                  style={{
                    marginBottom: scaleHeight(5),
                    justifyContent: "center",
                  }}
                  inputStyle={{ fontSize: fontSize.size16, fontWeight: "500" }}
                  value={value}
                  onBlur={onBlur}
                  defaultValue={nameProduct}
                  RightIconClear={Images.icon_delete2}
                  error={errors?.productName?.message}
                  onClearText={() => onChange("")}
                  onChangeText={(value) => {
                    setNameProduct(value), onChange(value);
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
                style={{
                  fontSize: fontSize.size13,
                  marginRight: scaleWidth(10),
                }}>
                Có thể mua
              </Text>
              <Switch
                value={valuePurchase}
                onToggle={() => {
                  setValuePurchase(!valuePurchase);
                }}
              />
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
                    inputStyle={{
                      fontSize: fontSize.size16,
                      fontWeight: "500",
                      marginTop: scaleHeight(4),
                    }}
                    value={value}
                    onBlur={onBlur}
                    showRightIcon={false}
                    defaultValue={costPriceProduct?.toString()}
                    onChangeText={(value) => {
                      onChange(
                        vendorStore.checkSeparator === "DOTS"
                          ? formatCurrency(removeNonNumeric(value))
                          : addCommas(removeNonNumeric(value))
                      );
                      setCostPriceProduct(Number(value));
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
                control={control}
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
                    defaultValue={listPriceProduct?.toString()}
                    showRightIcon={false}
                    onChangeText={(value) => {
                      onChange(
                        vendorStore.checkSeparator === "DOTS"
                          ? formatCurrency(removeNonNumeric(value))
                          : addCommas(removeNonNumeric(value))
                      );
                      setListPriceProduct(Number(value));
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
              <Text
                style={{
                  fontSize: fontSize.size14,
                  fontWeight: "700",
                  marginBottom: scaleHeight(15),
                }}>
                Thông tin nhà cung cấp
              </Text>
              <TouchableOpacity
                onPress={() => goToChooseSupplierScreen()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                {vendor?.length > 0 ? (
                  <Text
                    style={{
                      fontSize: fontSize.size13,
                      fontWeight: "400",
                      color: "#242424",
                    }}>
                    {vendor.length} nhà cung cấp
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: fontSize.size13,
                      fontWeight: "400",
                      color: "#747475",
                    }}>
                    Chưa có nhà cung cấp nào được chọn
                  </Text>
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
            style={{
              marginHorizontal: scaleWidth(16),
              marginVertical: scaleHeight(20),
            }}>
            <Text
              style={{
                fontSize: fontSize.size14,
                fontWeight: "700",
                marginBottom: scaleHeight(15),
              }}>
              Quản lý tồn kho
            </Text>
            <InputSelect
              titleText="Hình thức quản lý"
              //hintText="Mặc định"
              isSearch={false}
              required={true}
              arrData={arrBrands}
              dataDefault={brands.label}
              onPressChoice={(item: any) => {
                setBrands(item);
              }}
              disabled={productUsing === true ? true : false}
              // styleView={{ width: scaleWidth(164), height: scaleHeight(56), marginRight: scaleWidth(15) }}
            />
          </View>
        </View>

        <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
          <View
            style={{
              marginHorizontal: scaleWidth(16),
              marginVertical: scaleHeight(20),
            }}>
            <Text
              style={{
                fontSize: fontSize.size14,
                fontWeight: "700",
                marginBottom: scaleHeight(15),
              }}>
              Thông tin thêm
            </Text>
            <InputSelect
              titleText="Danh mục"
              hintText="Chọn danh mục"
              isSearch
              required={false}
              arrData={arrCategory}
              dataDefault={category.label}
              onPressChoice={(item: any) => {
                setCategory(item);
              }}
              styleView={{ marginBottom: scaleHeight(15) }}
            />
            <InputSelect
              titleText="Thương hiệu"
              hintText="Chọn thương hiệu"
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
              titleText="Tag"
              hintText="Chọn Tag"
              styleView={{ marginBottom: scaleHeight(15) }}
            />
          </View>
        </View>
        <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
          <View
            style={{
              marginHorizontal: scaleWidth(16),
              marginVertical: scaleHeight(20),
            }}>
            <Text
              style={{
                fontSize: fontSize.size14,
                fontWeight: "700",
                marginBottom: scaleHeight(15),
              }}>
              {valueSwitchUnit ? "Nhóm đơn vị tính" : "Đơn vị tính"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: scaleHeight(15),
              }}>
              <Text
                style={{
                  fontSize: fontSize.size13,
                  fontWeight: "400",
                  color: "#747475",
                }}>
                Quản lý nhiều đơn vị tính của sản phẩm
              </Text>
              <Switch
                value={valueSwitchUnit}
                onToggle={() => {
                  setUomId({ id: "", label: "" });
                  setUomGroupId({ id: "", label: "" });
                  setValueSwitchUnit(!valueSwitchUnit);
                  getListUnitGroup(!valueSwitchUnit);
                }}
              />
            </View>
            <InputSelect
              titleText={valueSwitchUnit ? "Nhóm đơn vị tính" : "Đơn vị tính"}
              hintText={
                valueSwitchUnit ? "Chọn nhóm đơn vị tính" : "Chọn đơn vị tính"
              }
              isSearch
              required={true}
              arrData={arrUnitGroupData}
              dataDefault={valueSwitchUnit ? uomGroupId.label : uomId.label}
              onPressChoice={(item: any) => {
                if (valueSwitchUnit) {
                  setUomGroupId(item);
                  getDetailUnitGroup(item.id);
                } else {
                  setUomId(item);
                }
              }}
              styleView={{ marginBottom: scaleHeight(6) }}
            />
            <View style={{ marginBottom: scaleHeight(15) }}>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => {
                  if (valueSwitchUnit) {
                    navigation.navigate("createConversionGroup" as any, {
                      editScreen: true,
                    });
                  } else {
                    setModalcreateUnit(true);
                  }
                }}>
                <Images.ic_plusCircleBlue
                  width={scaleWidth(14)}
                  height={scaleHeight(14)}
                />
                <Text
                  style={{
                    color: "#0078d4",
                    fontSize: fontSize.size12,
                    marginLeft: scaleWidth(4),
                  }}>
                  {valueSwitchUnit ? "Tạo nhóm đơn vị tính" : "Tạo đơn vị tính"}
                </Text>
              </TouchableOpacity>
            </View>
            {valueSwitchUnit ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: scaleHeight(15),
                  }}>
                  <Text style={{ fontSize: fontSize.size14 }}>Đơn vị gốc</Text>
                  {/* Hiển thị đơn vị gốc (baseUnit) từ arrDVT dựa trên group.label */}
                  {detailUnitGroupData ? (
                    <Text
                      style={{ fontSize: fontSize.size14, fontWeight: "600" }}>
                      {detailUnitGroupData.originalUnit.name}
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
                  <Text style={{ fontSize: fontSize.size14 }}>
                    Đơn vị quy đổi
                  </Text>
                  <Text
                    style={{ fontSize: fontSize.size14, fontWeight: "600" }}>
                    Tỷ lệ quy đổi
                  </Text>
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
                      {item.conversionRate}
                    </Text>
                  </View>
                ))}
              </>
            ) : null}
          </View>
        </View>
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
              {dataCreateProduct?.length > 0 ? (
                <FlatList
                  data={dataCreateProduct}
                  keyExtractor={(item, index) => index.toString()}
                  scrollEnabled={false}
                  renderItem={({ item, index }: any) => {
                    return (
                      <ScrollView horizontal={true}>
                        <View style={{ marginTop: scaleHeight(15) }}>
                          <Text>{nameProduct + " - " + item.name}</Text>
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
                                    showToast(
                                      "txtToats.required_maximum_number_of_photos",
                                      "error"
                                    );
                                  }
                                } else {
                                  handleLibraryUseProduct(
                                    item.imageUrls,
                                    index
                                  );
                                }
                              }}
                              onPressDelete={() => handleDeleteImage(index)}
                              onPressDelete1={() =>
                                handleDeleteImageItem(
                                  index,
                                  item.imageUrls[index]
                                )
                              }
                            />
                            <View
                              style={{
                                flexDirection: "row",
                                marginLeft: scaleWidth(10),
                              }}>
                              <TouchableOpacity
                                style={{
                                  borderRadius: 8,
                                  backgroundColor: colors.palette.aliceBlue,
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
                              <TouchableOpacity
                                style={{
                                  borderRadius: 8,
                                  backgroundColor: colors.palette.aliceBlue,
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
                                      item.wholesalePrice?.length === 1 ? (
                                      <Text
                                        text={item.wholesalePrice[0]?.price}
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
                <View style={{ marginTop: scaleHeight(15) }}>
                  <Text
                    tx="createProductScreen.details"
                    style={{
                      fontSize: fontSize.size13,
                      fontWeight: "400",
                      color: "#747475",
                      marginBottom: scaleHeight(12),
                    }}
                  />
                  <TouchableOpacity
                    style={styles.btnAddProperties}
                    onPress={() =>
                      navigation.navigate("addAttribute" as never, {
                        editScreen: true,
                      })
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
                  flexDirection: "row",
                }}>
                {dataCreateProduct?.length > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      //điều kiện chuyển màn tạm thời
                      if (productUsing === true) {
                        navigation.navigate("editAttributeByEdit" as never, {
                          dataAttribute: attributeToEdit,
                          constDataAttribute: constAttributeToEdit,
                          dropdownSelected: dropdownToEdit,
                        });
                      } else {
                        navigation.navigate("editAttribute" as any, {
                          dataAttribute: attributeToEdit,
                          dropdownSelected: dropdownToEdit,
                          editScreen: true,
                        });
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
          </View>
        ) : null}
        {addDescribe ? (
          <View
            style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
            <View
              style={{
                marginHorizontal: scaleWidth(16),
                marginVertical: scaleHeight(20),
              }}>
              <View>
                <View style={{ flexDirection: "row", alignContent: "center" }}>
                  <Text
                    style={{
                      fontSize: fontSize.size14,
                      fontWeight: "700",
                      marginBottom: scaleHeight(15),
                    }}>
                    Mô tả
                  </Text>
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
                      style={{
                        color: "#0078d4",
                        fontSize: fontSize.size12,
                        marginLeft: scaleWidth(4),
                      }}>
                      Thêm mô tả
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text text={description} />
              )}
            </View>
          </View>
        ) : null}
        <View style={{ backgroundColor: "white", marginTop: scaleHeight(12) }}>
          <View
            style={{
              marginHorizontal: scaleWidth(16),
              marginVertical: scaleHeight(20),
            }}>
            <Text
              tx="createProductScreen.information"
              style={{
                fontSize: fontSize.size14,
                fontWeight: "700",
                marginBottom: scaleHeight(15),
              }}
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
                    style={{
                      borderWidth: 1,
                      alignItems: "center",
                      paddingVertical: scaleHeight(6),
                      paddingHorizontal: scaleWidth(8),
                      borderColor: "#0078d4",
                      borderRadius: 4,
                      marginLeft: scaleWidth(8),
                    }}>
                    <Text
                      style={{ color: "#0078d4", fontSize: fontSize.size10 }}>
                      Mô tả
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {addVariant === false ? (
                  <TouchableOpacity
                    onPress={() => setAddVariant(true)}
                    style={{
                      borderWidth: 1,
                      alignItems: "center",
                      paddingVertical: scaleHeight(6),
                      paddingHorizontal: scaleWidth(8),
                      borderColor: "#0078d4",
                      borderRadius: 4,
                      marginLeft: scaleWidth(8),
                    }}>
                    <Text
                      style={{ color: "#0078d4", fontSize: fontSize.size10 }}>
                      Phân loại sản phẩm
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {addDescribe === true && addVariant === true ? (
                  <Text
                    style={{
                      marginLeft: scaleWidth(8),
                      fontSize: fontSize.size13,
                    }}>
                    Bạn đã thêm tất cả thông tin khác của sản phẩm
                  </Text>
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
      <Dialog
        isVisible={isDeleteFailModalVisible}
        title={"productScreen.Notification"}
        errorMessage={errorContent}
        titleBTN2="productScreen.BtnNotificationAccept"
        styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8 }}
        onPressAccept={() => setIsDeleteFailModalVisible(false)}
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
          console.log("--------onSave-------", data), setModalcreateUnit(false);
          getListUnitGroup(false);
        }}
        onSaveAndChange={(data) => {
          console.log("--------onSaveAndChange-------", data);
          setModalcreateUnit(false);
          setUomId(data);
          getListUnitGroup(false);
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
          <Text style={{ fontSize: fontSize.size14 }}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            submitAdd();
          }}
          style={{
            width: scaleWidth(150),
            height: scaleHeight(48),
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: "#0078d4",
          }}>
          <Text style={{ fontSize: fontSize.size14, color: "white" }}>
            Hoàn tất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  btnCamera: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0078d4",
    borderRadius: 8,
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(7),
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
});
