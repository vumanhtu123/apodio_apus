import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  FlatList,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import { Images } from "../../../assets/index";
import { Header } from "../../components/header/header";
import { Text } from "../../components/text/text";
import {
  colors,
  fontSize,
  margin,
  padding,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../theme";
// import { styles } from "./styles"
import { AutoImage } from "../../../app/components/auto-image/auto-image";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AutoHeightImage from "react-native-auto-height-image";
import { useStores } from "../../models";
import { commasToDots, formatCurrency, formatVND } from "../../utils/validate";
import ProductAttribute from "./component/productAttribute";
import { translate } from "../../i18n/translate";
import { ALERT_TYPE, Dialog, Toast, Loading } from "../../components/dialog-notification";

export const ProductDetailScreen: FC = (item) => {
  const navigation = useNavigation();
  const route = useRoute();
  const reload = route?.params?.reload;
  const screen = route?.params?.screen;
  const [showDetails, setShowDetails] = useState(false);
  const [showRetailPrice, setShowRetailPrice] = useState(false);
  const [showWholesalePrice, setShowWholesalePrice] = useState(false);
  const [showNCC, setShowNCC] = useState(false);
  const [changeClassification, setChangeClassification] = useState("");
  const [dataClassification, setDataClassification] = useState({});
  const [dataClassificationToEdit, setDataClassificationToEdit] = useState({});
  const [arrImagesProduct, setArrImagesProduct] = useState([]);
  const [arrClassification, setArrClassification] = useState([]);
  const [detailsClassification, setDetailsClassification] = useState([]);
  const [attributeCategory, setAttributeCategory] = useState([]);
  const [attributeDetailsClassification, setAttributeDetailsClassification] =
    useState([]);
  const [arrNCC, setArrNCC] = useState([]);
  const [modalImages, setModalImages] = useState(false);
  const [modalImages1, setModalImages1] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const { productStore } = useStores();
  const { productId } = productStore;
  const refCarousel = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [detailProduct, setDetailProduct] = useState<any>([]);
  const [dialogDeleteProduct, setDialogDeleteProduct] = useState(false);
  const [showOrHiddenWeight, setShowOrHiddenWeight] = useState<boolean>(false)
  const [attributes, setAttributes] = useState<any>([]);

  const handleGetDetailProduct = async () => {
    try {
      const response = await productStore.getDetailProduct(productId);
      console.log("productId", productId);
      if (response && response.kind === "ok") {
        const data = response.response.data;
        setDetailProduct(data.baseTemplatePackingLine);
        setDataClassification(data);
        setDataClassificationToEdit(data);
        console.log("response---getDetailProduct-------", JSON.stringify(data));
        console.log(
          "attributeValues: ",
          data?.productVariants?.map((item) => item.attributeValues)
        );
        setArrImagesProduct(data.imageUrls);
        setArrClassification(data.productVariants);
        setArrNCC(data.vendors);
        setAttributeCategory(data.attributeCategory);
        if (data.productVariants != null) {
          setChangeClassification(data.productVariants[0].id);
          setDetailsClassification(data.productVariants[0]);
        }
      } else {
        console.error("Failed to fetch detail:", response);
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  useEffect(() => {
    console.log(
      "---------useEffect---------arrClassification------------------",
      JSON.stringify(arrClassification)
    );
    if (detailsClassification?.length !== 0) {
      selectDataClassification();
    }
  }, [detailsClassification]);

  useEffect(() => {
    console.log("---------useEffect---------productId------------------");
    handleGetDetailProduct();
  }, [productId]);

  useEffect(() => {
    console.log("---------useEffect---------reload------------------");
    const unsubscribe = navigation.addListener('focus', () => {
      if (reload === true) {
        handleGetDetailProduct();
      }
    });

    return unsubscribe;
  }, [navigation, reload]);
  // useEffect(() => {
  //   function processAttributes(data: any) {
  //     const processedAttributes = data.attributeCategory?.flatMap(category =>
  //       category.attributeOutputDtos.flatMap(attr =>
  //         attr.productAttributeValue.map(val => ({
  //           name: attr.name,
  //           value: val.value
  //         }))
  //       )
  //     );
  //     setAttributes(processedAttributes);
  //   }

  //   processAttributes(dataClassification);
  // }, [dataClassification]);
  function extractAttributeInfo(data: any) {
    if (!data.attributeCategory || data.attributeCategory.length === 0) {
      return [];
    }
    const groupedData = data.attributeCategory?.map(category => ({
      name: category.name,
      items: category.attributeOutputList?.map(attr => ({
        value: attr.productAttributeValue.map(val => val.value),
        name: attr.name,
      })
      ) || []
    }));
    setAttributes(groupedData)
    return groupedData;
  }
  useEffect(() => {
    extractAttributeInfo(dataClassification);
    // setAttributes(extractedAttributes);
  }, [dataClassification])
  const arrBrands = [
    { id: 3746, label: "Mặc định", label2: "DEFAULT" },
    { id: 4638, label: "Lô", label2: "LOTS" },
    { id: 4398, label: "Serial", label2: "SERIAL" },
  ];
  const getLabelByList = (label2: string) => {
    const item = arrBrands.find((item) => item.label2 === label2);
    return item ? item.label : "";
  };

  const selectDataClassification = () => {
    const arrTextfieldAttribute = [];

    attributeCategory.forEach((items) => {
      items.attributeOutputList?.forEach((item) => {
        if (item.displayType === "TEXTFIELD") {
          const newItem = {
            ...item.productAttributeValue[0],
            attributeName: items.name,
            name: item.name,
          };
          arrTextfieldAttribute.push(newItem);
        }
      });
    });

    const matchingElements = [];
    attributeCategory.forEach((itemA) => {
      itemA.attributeOutputList?.forEach((dto) => {
        dto.productAttributeValue.forEach((attrValueA) => {
          detailsClassification?.attributeValues?.forEach((itemB) => {
            if (
              attrValueA.id === itemB.productAttributeValueId &&
              dto.id === itemB.productAttributeId
            ) {
              const newItem = { ...attrValueA, attributeName: itemA.name };
              matchingElements.push(newItem);
            }
          });
        });
      });
    });
    const newArr = detailsClassification?.attributeValues?.map((item) => {
      const a = matchingElements.filter((items) => {
        if (
          item.productAttributeId === items.productAttributeId &&
          item.productAttributeValueId === items.id
        ) {
          return items;
        }
      });
      return {
        ...item,
        value: a[0]?.value,
        attributeName: a[0]?.attributeName,
      };
    });

    const matchingElements1 = [];
    attributeCategory.forEach((itemA) => {
      itemA.attributeOutputList?.forEach((dto) => {
        detailsClassification?.attributeValues?.forEach((itemB) => {
          if (dto.id === itemB.productAttributeId) {
            matchingElements1.push({ name: dto.name, id: dto.id });
          }
        });
      });
    });

    const newArr1 = newArr?.map((item) => {
      const a = matchingElements1.filter((items) => {
        if (items.id === item.productAttributeId) {
          return items;
        }
      });
      return { ...item, name: a[0]?.name };
    });

    const arrTextAndCheck = newArr1?.concat(arrTextfieldAttribute);

    const newArr2 = arrTextAndCheck?.reduce((acc: any, obj: any) => {
      if (!acc[obj.attributeName]) {
        acc[obj.attributeName] = [];
      }
      acc[obj.attributeName].push(obj);
      return acc;
    }, {});

    const newArr3 = newArr2 ? Object.keys(newArr2).map((attributeName) => {
      return {
        name: attributeName,
        items: newArr2[attributeName] || [],
      };
    }) : [];
    console.log(
      "---setAttributeDetailsClassification--------------",
      JSON.stringify(newArr3)
    );
    setAttributeDetailsClassification(newArr3);
  };

  const deleteProduct = async () => {
    const result = await productStore.deleteProduct(productId);
    console.log("deleteProduct-----------", result);
    if (result.kind === "ok") {
      await Dialog.hideDialog();
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: translate("txtDialog.txt_title_dialog"),
        button: '',
        button2: translate("common.ok"),
        textBody: result.result.message,
        closeOnOverlayTap: false,
        onPressButton: () => {
          navigation.goBack()
          productStore.setReloadProductScreen(true)
          Dialog.hide();
        }
      })
    } else {
      await Dialog.hideDialog();
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: translate("productScreen.Notification"),
        button: translate("common.ok"),
        textBody: result.result.errorCodes[0].message,
        closeOnOverlayTap: false
      })
      setErrorContent(result.result.errorCodes[0].message);
    }
    setDialogDeleteProduct(false);
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    extractAttributeInfo(dataClassification)
    console.log('first', JSON.stringify(attributes))
    selectDataClassification();
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Chi tiết sản phẩm`}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={styles.titleHeader}
        RightIcon2={screen === "seeDetail" ? null : Images.icon_trashWhite}
        RightIcon1={screen === "seeDetail" ? null : Images.icon_editWhite}
        onRightPress1={() =>
          navigation.navigate({name: "ProductEditScreen", params:{
            dataEdit: dataClassificationToEdit,
          }}as never)
        }
        onRightPress2={() => {
          Dialog.show({
            type: ALERT_TYPE.INFO,
            title: translate("productScreen.Notification"),
            button: translate("productScreen.cancel"),
            button2: translate("productScreen.BtnNotificationAccept"),
            textBody: translate("productScreen.ProductDelete"),
            closeOnOverlayTap: false,
            onPressButton: () =>
              deleteProduct()
          })
        }}
        widthRightIcon={scaleWidth(16)}
        heightRightIcon={scaleHeight(16)}
      />
      <SafeAreaView style={{ flex: 1 }}>
        {/* <Screen style={{ flex: 1, marginBottom: scaleHeight(64) }} preset="fixed" > */}
        <ScrollView
          style={{
            marginVertical: scaleHeight(margin.margin_12),
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: scaleWidth(margin.margin_16),
            }}>
            <Text
              style={{ fontSize: fontSize.size14, fontWeight: "500", flex: 1 }}>
              Thông tin chung
            </Text>
          </View>
          {arrImagesProduct?.length !== 0 ? (
            <ScrollView
              style={{
                marginVertical: scaleHeight(margin.margin_12),
                marginHorizontal: scaleWidth(margin.margin_16),
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {arrImagesProduct?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setModalImages(true);
                      setActiveSlide(index);
                    }}>
                    <AutoImage
                      style={styles.viewImage}
                      source={{
                        uri: item,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <View
              style={{
                marginVertical: scaleHeight(margin.margin_12),
                marginHorizontal: scaleWidth(margin.margin_16),
              }}>
              <AutoImage
                style={styles.viewImage}
                source={require("../../../assets/Images/no_images.png")}
              />
            </View>
          )}
          {arrClassification ? (
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: scaleWidth(margin.margin_16),
              }}>
              <Text
                text={arrClassification?.length.toString()}
                style={[
                  styles.textDolphin12,
                  {
                    marginRight: scaleWidth(margin.margin_4),
                    lineHeight: scaleHeight(14.52),
                    color: colors.palette.neutral900,
                  },
                ]}
              />
              <Text
                text=" phân loại sản phẩm"
                style={[
                  styles.textDolphin12,
                  {
                    lineHeight: scaleHeight(14.52),
                    color: colors.palette.neutral900,
                  },
                ]}
              />
            </View>
          ) : null}
          {arrClassification ? (
            <ScrollView
              style={{
                marginVertical: scaleHeight(margin.margin_12),
                marginHorizontal: scaleWidth(margin.margin_16),
              }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {arrClassification?.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.viewNameClassification,
                      {
                        borderColor:
                          item.id === changeClassification
                            ? colors.palette.navyBlue
                            : colors.palette.aliceBlue,
                      },
                    ]}
                    onPress={() => {
                      setChangeClassification(item.id);
                      setDetailsClassification(item);
                      console.log('first', item)
                      // setShowDetails(false);
                    }}>
                    <Text
                      text={item.name}
                      style={styles.textNameClassification}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : null}

          {detailsClassification.imageUrls?.length !== 0 ? (
            <ScrollView
              style={{
                marginVertical: scaleHeight(margin.margin_12),
                marginHorizontal: scaleWidth(margin.margin_16),
              }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {detailsClassification.imageUrls?.map((item, index) => {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalImages1(true);
                        setActiveSlide(index);
                      }}>
                      <AutoImage
                        style={styles.viewImage}
                        source={{
                          uri: item,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          ) : null}
          <View style={{ marginHorizontal: scaleWidth(margin.margin_16) }}>
            <View style={{ marginTop: 20 }}>
              <ProductAttribute
                label="Mã sản phẩm"
                value={dataClassification.sku}
              />
              <ProductAttribute
                label="Tên sản phẩm "
                value={dataClassification.name}
              />
              {arrClassification ? (
                <View>
                  <ProductAttribute
                    label="Mã biến thể sản phẩm "
                    value={detailsClassification.sku}
                  />
                  <ProductAttribute
                    label="Tên biến thể sản phẩm "
                    value={detailsClassification.name}
                  />
                </View>
              ) : null}
              <ProductAttribute
                label="Trạng thái"
                value={
                  dataClassification.saleOk === true &&
                    dataClassification.purchaseOk === false
                    ? "Có thể bán"
                    : dataClassification.purchaseOk === true &&
                      dataClassification.saleOk === false
                      ? "Có thể mua"
                      : dataClassification.saleOk === true &&
                        dataClassification.purchaseOk === true
                        ? "Có thể bán/ Có thể mua"
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
                  <Images.icon_caretRightDown />
                ) : (
                  <Images.icon_caretUp />
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
                      text="Mua tối thiểu"
                      style={[
                        styles.textDolphin12,
                        {
                          flex: 1,
                        },
                      ]}
                    />
                    <Text text="Giá sản phẩm" style={styles.textDolphin12} />
                  </View>
                  {detailsClassification?.length !== 0
                    ? detailsClassification?.retailPrice?.map((item) => {
                      return (
                        <ProductAttribute
                          label={item.min}
                          value={`${formatVND(formatCurrency(commasToDots(item.price)))}/${dataClassification?.uom?.name}`}
                          labelStyle={{ color: colors.palette.nero }}
                          textStyle={{ color: colors.palette.radicalRed }}
                        />
                      );
                    })
                    : dataClassification?.retailPrice?.map((item) => {
                      return (
                        <ProductAttribute
                          label={item.min}
                          value={`${formatVND(formatCurrency(commasToDots(item.price)))}/${dataClassification?.uom?.name}`}
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
                  label="Giá vốn"
                  value={dataClassification?.costPrice > 0 ? `${formatVND(formatCurrency(commasToDots(dataClassification?.costPrice)))}/${dataClassification?.uom?.name}` : null}
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
                  label="Giá niêm yết"
                  value={dataClassification?.listPrice > 0 ? `${formatVND(formatCurrency(commasToDots(dataClassification?.listPrice)))}/${dataClassification?.uom?.name}` : null}
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
                  <Images.icon_caretRightDown />
                ) : (
                  <Images.icon_caretUp />
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
                      text="Mua tối thiểu"
                      style={[
                        styles.textDolphin12,
                        {
                          flex: 1,
                        },
                      ]}
                    />
                    <Text text="Giá sản phẩm" style={styles.textDolphin12} />
                  </View>
                  {detailsClassification?.length !== 0
                    ? detailsClassification?.wholesalePrice?.map((item) => {
                      return (
                        <ProductAttribute
                          label={item.min}
                          value={`${formatVND(formatCurrency(commasToDots(item.price)))}/${dataClassification?.uom?.name}`}
                          labelStyle={{ color: colors.palette.nero }}
                          textStyle={{ color: colors.palette.radicalRed }}
                        />
                      );
                    })
                    : dataClassification?.wholesalePrice?.map((item) => {
                      return (
                        <ProductAttribute
                          label={item.min}
                          value={`${formatVND(formatCurrency(commasToDots(item.price)))}/${dataClassification?.uom?.name}`}
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
                label="Danh mục"
                value={dataClassification.productCategory?.name}
              />
              <ProductAttribute
                label="Thương hiệu"
                value={dataClassification.brand?.name}
              />
              <ProductAttribute
                label="Tag"
                value={dataClassification.productTags
                  ?.map((item) => item.name)
                  .join("/ ")}
              />
              <ProductAttribute
                label="Hình thức quản lý"
                value={getLabelByList(dataClassification.managementForm)}
              />
              <ProductAttribute
                label="Đơn vị tính gốc"
                value={dataClassification.uom?.name || dataClassification.uomGroup?.originalUnit?.name}
              />
            </View>
          </View>
          {dataClassification?.description !== "" &&
            dataClassification?.description !== null ? (
            <View>
              <View style={styles.viewLine} />
              <View style={styles.viewDescribe}>
                <Text tx={"productScreen.describe"} style={styles.textTitle} />
                <Text
                  text={dataClassification.description}
                  style={[
                    styles.textDolphin12,
                    {
                      color: colors.palette.nero,
                    },
                  ]}
                />
              </View>
            </View>
          ) : null}
          <View>
            {arrClassification?.baseProductPackingLine?.volume || dataClassification?.baseTemplatePackingLine?.volume != null ? (
              <View>
                <View style={styles.viewLine} />
                <TouchableOpacity
                  style={[styles.viewWeight, { flex: 1, padding: scaleWidth(16) }]}

                  onPress={() => setShowOrHiddenWeight(!showOrHiddenWeight)}
                >
                  <Text tx="productScreen.weight"
                    style={{ fontSize: fontSize.size12, color: colors.navyBlue, marginRight: scaleWidth(5) }}
                  />
                  <Images.icon_caretDownBlue width={scaleWidth(16)} height={scaleHeight(16)} style={{ transform: [{ rotate: showOrHiddenWeight ? '180deg' : '0deg' }], }} />
                </TouchableOpacity>
              </View>
            ) : null}
            {
              showOrHiddenWeight ?
                <View style={{ paddingHorizontal: scaleWidth(16), flex: 1 }}>

                  <Text tx="productScreen.weightOriginal" style={{ fontSize: fontSize.size14, fontWeight: 'bold' }} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: scaleHeight(9) }}>
                    <Text style={[styles.fontSizeWeight, { flex: 2 }]}>
                      {dataClassification.uomId == null ? detailProduct?.uomGroupLineOutput?.unitName : dataClassification?.uom?.name}
                    </Text>
                    <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row' }}>
                      <Text tx={`detailScreen.weight`} style={[styles.fontSizeWeight]} />
                      <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{arrClassification ? detailsClassification.baseProductPackingLine?.weight : detailProduct?.weight} kg</Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'row' }}>
                      <Text tx="detailScreen.volume" style={[styles.fontSizeWeight]} />
                      <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{arrClassification ? detailsClassification.baseProductPackingLine?.volume : detailProduct?.volume} m3</Text>
                    </View>
                  </View>
                  {arrClassification?.productPackingLines != null ? (
                    <View>
                      <View>
                        <Text tx="productScreen.weightExchange" style={{ fontSize: fontSize.size14, fontWeight: 'bold' }} />
                        <View style={{ flexDirection: 'row', marginBottom: scaleHeight(12), justifyContent: 'space-between' }}>
                          <View style={{ flex: 2 }}>
                            <Text style={[styles.fontSizeWeight, {}]}>
                              {detailsClassification.baseProductPackingLine?.unitName}
                            </Text>
                            <View
                              style={{ backgroundColor: '#E7EFFF', height: 1 }}
                            />
                            <Text style={[styles.fontSizeWeight, {}]}>
                              {`${commasToDots(detailsClassification.baseProductPackingLine?.amount)} ${dataClassification.uomId == null ? detailProduct?.uomGroupLineOutput?.unitName : dataClassification?.uom?.name}`}
                            </Text>
                          </View>
                          <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row', alignItems: 'center' }}>
                            <Text tx="detailScreen.weight" style={[styles.fontSizeWeight,]} />
                            <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{detailsClassification.productPackingLines?.weight} kg</Text>
                          </View>

                          <View style={{ flex: 3, alignItems: 'center', flexDirection: 'row' }}>
                            <Text tx="detailScreen.volume" style={[styles.fontSizeWeight,]} />
                            <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{detailsClassification.productPackingLines?.volume} m3</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : null}
                  {dataClassification?.templatePackingLines != null && arrClassification?.productPackingLines == null ? (
                    <View>
                      <View>
                        <Text tx="productScreen.weightExchange" style={{ fontSize: fontSize.size14, fontWeight: 'bold' }} />
                        <FlatList
                          data={dataClassification.templatePackingLines}
                          renderItem={({ item }) => {
                            return (
                              <View style={{ flexDirection: 'row', marginBottom: scaleHeight(12), justifyContent: 'space-between' }}>
                                <View style={{ flex: 2 }}>
                                  <Text style={[styles.fontSizeWeight, {}]}>
                                    {item.uomGroupLineOutput?.unitName}
                                  </Text>
                                  <View
                                    style={{ backgroundColor: '#E7EFFF', height: 1 }}
                                  />
                                  <Text style={[styles.fontSizeWeight, {}]}>
                                    {`${commasToDots(item.amount)} ${detailProduct?.uomGroupLineOutput?.unitName}`}
                                  </Text>
                                </View>
                                <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row', alignItems: 'center' }}>
                                  <Text tx="detailScreen.weight" style={[styles.fontSizeWeight,]} />
                                  <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{item.weight} kg</Text>
                                </View>

                                <View style={{ flex: 3, alignItems: 'center', flexDirection: 'row' }}>
                                  <Text tx="detailScreen.volume" style={[styles.fontSizeWeight,]} />
                                  <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{item.volume} m3</Text>
                                </View>
                              </View>
                            )
                          }}
                          keyExtractor={(item) => item.id.toString()}
                          style={{ marginTop: scaleHeight(12) }}
                        />
                      </View>
                    </View>
                  ) : null}
                </View>
                : null
            }
          </View>
          {attributeDetailsClassification?.length !== 0 || attributes?.length !== 0 ? (
            <View>
              <View style={styles.viewLine} />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: scaleHeight(16),
                  marginHorizontal: scaleWidth(margin.margin_16),
                }}
                onPress={toggleDetails}>
                <Text style={{ color: colors.palette.navyBlue, fontSize: fontSize.size12 }}>
                  Xem chi tiết thuộc tính{" "}
                </Text>
                <Images.iconDownBlue
                  width={scaleWidth(16)}
                  height={scaleHeight(16)}
                  style={{
                    transform: [{ rotate: showDetails ? "180deg" : "0deg" }],
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          {showDetails && (
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
              {attributeDetailsClassification.length !== 0 ? (
                <View>
                  {attributeDetailsClassification?.map((item, index) => (
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
                      {item.items?.map((dto) => (
                        <View
                          style={{
                            marginTop: scaleHeight(margin.margin_12),
                          }}>
                          <ProductAttribute
                            label={dto.name}
                            value={dto.value}
                            styleAttribute={{
                              paddingHorizontal: scaleWidth(padding.padding_12),
                            }}
                          />
                          {index !== attributeDetailsClassification?.length - 1 ? (
                            <View style={styles.viewLine2} />
                          ) : null}
                        </View>
                      ))}
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

          {arrNCC?.length > 0 ? (
            <View>
              <View style={styles.viewLine} />
              <View
                style={{
                  paddingVertical: scaleHeight(20),
                  paddingHorizontal: scaleWidth(16),
                }}>
                <Text text={"Nhà cung cấp"} style={styles.textTitle} />
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
                    {arrNCC?.length + " nhà cung cấp"}
                  </Text>
                  {showNCC === true ? (
                    <TouchableOpacity onPress={() => setShowNCC(!showNCC)}>
                      <Images.icon_caretUp />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShowNCC(!showNCC)}>
                      <Images.icon_caretRightDown />
                    </TouchableOpacity>
                  )}
                </View>
                {showNCC === true
                  ? arrNCC?.map((item) => {
                    return (
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            paddingVertical: scaleHeight(padding.padding_8),
                          }}>
                          <AutoHeightImage
                            source={{ uri: item?.avatarUrl }}
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
                              {item?.vendorCode + "- " + item?.vendorName}
                            </Text>
                            <Text style={styles.textNameClassification}>
                              {item?.phoneNumber}
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
            </View>
          ) : null}
        </ScrollView>
        {/* </Screen> */}
      </SafeAreaView>

      <Modal
        isVisible={modalImages}
        onBackdropPress={() => setModalImages(false)}>
        <View>
          {arrImagesProduct && arrImagesProduct?.length > 0 ? (
            <View>
              <Carousel
                data={arrImagesProduct}
                autoplay={false}
                ref={refCarousel}
                loop
                renderItem={({ item, index }) => (
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
                dotsLength={
                  arrImagesProduct?.length > 0 && arrImagesProduct?.length
                }
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
      <Modal
        isVisible={modalImages1}
        onBackdropPress={() => setModalImages1(false)}>
        <View>
          {detailsClassification.imageUrls &&
            detailsClassification.imageUrls?.length > 0 ? (
            <View>
              <Carousel
                data={detailsClassification.imageUrls}
                autoplay={false}
                ref={refCarousel}
                loop
                renderItem={({ item, index }) => (
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
                dotsLength={
                  detailsClassification.imageUrls?.length > 0 &&
                  detailsClassification.imageUrls?.length
                }
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
    </View>
  );
};

const styles = StyleSheet.create({
  ROOT: {
    backgroundColor: "#Ffffff",
    flex: 1,
  },
  titleHeader: {
    justifyContent: "flex-start",
    paddingLeft: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  textNameClassification: {
    fontWeight: "400",
    fontSize: fontSize.size10,
    lineHeight: scaleHeight(12.1),
    color: colors.palette.dolphin,
  },
  textDolphin12: {
    fontWeight: "400",
    fontSize: fontSize.size12,
    color: colors.palette.dolphin,
  },
  viewNameClassification: {
    width: scaleWidth(125),
    height: scaleHeight(56),
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.palette.aliceBlue,
    marginRight: scaleWidth(margin.margin_10),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scaleHeight(padding.padding_8),
    paddingHorizontal: scaleWidth(padding.padding_8),
  },
  viewImage: {
    width: scaleWidth(72),
    height: scaleHeight(72),
    borderRadius: 10,
    marginRight: 12,
  },
  viewCaret: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(margin.margin_10),
  },
  viewDescribe: {
    marginHorizontal: scaleWidth(margin.margin_16),
    backgroundColor: colors.palette.neutral100,
    paddingVertical: scaleHeight(padding.padding_20),
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
  viewLine: { height: scaleHeight(12), backgroundColor: "#F3F4F9" },
  viewDetails: {
    borderWidth: scaleHeight(1),
    marginVertical: scaleHeight(margin.margin_10),
    marginHorizontal: scaleWidth(margin.margin_16),
    borderRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#3A43E5",
    shadowOpacity: 0.25,
    backgroundColor: colors.palette.neutral100,
    borderColor: colors.palette.ghostWhite,
  },
  viewTitleDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: scaleHeight(margin.margin_12),
    marginBottom: scaleHeight(padding.padding_12),
    paddingHorizontal: scaleWidth(padding.padding_12),
  },
  viewLine2: {
    borderWidth: scaleHeight(1),
    borderColor: colors.palette.ghostWhite,
  },
  viewWeight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fontSizeWeight: {
    color: palette.dolphin, fontSize: fontSize.size12,
  }
});
