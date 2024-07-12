import { useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useEffect, useRef, useState } from "react";
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
import { commasToDots, formatCurrency, formatNumber, formatVND } from "../../utils/validate";
import ProductAttribute from "./component/productAttribute";
import { ALERT_TYPE, Dialog } from "../../components/dialog-notification";
import { translate } from "../../i18n/translate";
// import ProductAttribute from "./componet/productAttribute";

export const ClassifyDetailScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const idProduct = route?.params?.data;
  const [showDetails, setShowDetails] = useState(false);
  const [showRetailPrice, setShowRetailPrice] = useState(false);
  const [showWholesalePrice, setShowWholesalePrice] = useState(false);
  const [showNCC, setShowNCC] = useState(false);
  const [changeClassification, setChangeClassification] = useState("");
  const [dataClassification, setDataClassification] = useState({});
  const [dataProductTemplate, setDataProductTemplate] = useState({});
  const [arrImagesProduct, setArrImagesProduct] = useState([]);
  const [arrClassification, setArrClassification] = useState([]);
  const [detailsClassification, setDetailsClassification] = useState([]);
  const [attributeCategory, setAttributeCategory] = useState([]);
  const [attributeDetailsClassification, setAttributeDetailsClassification] =
    useState([]);
  const [arrNCC, setArrNCC] = useState([]);
  const [modalImages, setModalImages] = useState(false);
  const [modalImages1, setModalImages1] = useState(false);
  const { productStore } = useStores();
  const { productId } = productStore;
  const refCarousel = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [detailProduct, setDetailProduct] = useState<any>([]);
  const [nameValue, setNameValue] = useState<any>([]);
  const [isChecking, setIsChecking] = useState(true);
  const [showOrHiddenWeight, setShowOrHiddenWeight] = useState<boolean>(false)
  const [attributes, setAttributes] = useState<any>([]);
  const handleGetDetailClassify = async () => {
    try {
      const response = await productStore.getDetailClassify(productId);
      // console.log("handleGetDetailClassify----------", response);
      if (response && response.kind === "ok") {
        const data = response.response.data;
        console.log("handleGetDetailClassify----------", JSON.stringify(data));
        setDetailProduct(data.baseProductPackingLine);
        setDataClassification(data);
        setArrImagesProduct(data.imageUrls);
        setArrClassification(data.productVariants);
        setAttributeCategory(data.attributeCategory);
        setArrNCC(data.vendors);
        if (data.productVariants !== undefined) {
          setChangeClassification(data.productVariants[0]?.id);
          setDetailsClassification(data.productVariants[0]);
        }
        // setDataProductTemplate(data.productTemplate)
        setIsChecking(false);
      } else {
        //setErrorMessage(response.response.errorCodes[0].message);
        console.error("Failed to fetch detail:", response);
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };
  useEffect(() => {
    handleGetDetailClassify();
  }, [productId]);

  const arrBrands = [
    { id: 3746, label: "Mặc định", label2: "DEFAULT" },
    { id: 4638, label: "Lô", label2: "LOTS" },
    { id: 4398, label: "Serial", label2: "SERIAL" },
  ];
  const getLabelByList = (label2: string) => {
    const item = arrBrands.find((item) => item.label2 === label2);
    return item ? item.label : "";
  };

  const getNameAndValue = () => {
    const nameAndValue: { name: any; value: any }[] = [];
    attributeCategory?.forEach((category) => {
      category.attributeOutputList?.forEach((dto) => {
        dto.productAttributeValue?.forEach((attrValue) => {
          nameAndValue.push({
            name: dto.name,
            value: attrValue.value,
          });
        });
      });
    });
    setNameValue(nameAndValue);
    // return nameAndValue;
  };
  function extractAttributeInfo(data: any) {
    if (!data?.attributeCategory || data?.attributeCategory.length === 0) {
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
    // return groupedData;
  }
  useEffect(() => {
    extractAttributeInfo(dataClassification.productTemplate)
  }, [dataClassification])


  const deleteProduct = async () => {
    const result = await productStore.deleteClassify(productId);
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
      //setErrorContent(result.result.errorCodes[0].message);
    }
    //setDialogDeleteProduct(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    getNameAndValue();
    extractAttributeInfo(dataClassification.productTemplate)
    // selectDataClassification()
  };

  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerTx="detailScreen.headerClassify"
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={styles.titleHeader}
        widthRightIcon={scaleWidth(16)}
        heightRightIcon={scaleHeight(16)}
        RightIcon={Images.icon_editWhite}
        onRightPress={() => navigation.navigate({ name: 'EditClassify', params: { dataEdit: dataClassification, typeVariant: 'variant' } } as never)}
        RightIcon1={Images.icon_trashWhite}
        onRightPress1={() => {
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
              tx="detailScreen.information"
              style={{ fontSize: fontSize.size14, fontWeight: "500", flex: 1 }} />
          </View>
          {arrImagesProduct?.length > 0 ? (
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
          ) : null}
          {!isChecking && dataClassification?.scene?.url !== "" ? (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginLeft: scaleWidth(16),
              }}
              onPress={() =>
                navigation.navigate({
                  name: "view3D", params: {
                    scene: dataClassification?.scene?.url,
                  }
                } as never)
                // console.log('first' ,)
              }>
              <Images.ic_3d
                width={scaleWidth(20)}
                height={scaleHeight(20)}
                style={{
                  transform: [{ rotate: showDetails ? "180deg" : "0deg" }],
                }}
              />
              <Text
                tx="productScreen.Perspective"
                style={{
                  fontSize: fontSize.size12,
                  marginLeft: 6,
                  color: "#0078d4",
                }}></Text>
            </TouchableOpacity>
          ) : null}
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
                  {dataClassification.retailPrice?.map((item: { min: any; price: number; }) => {
                    return (
                      <ProductAttribute
                        label={item.min}
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
                  {dataClassification?.wholesalePrice?.map((item: { min: string | undefined; price: any; }) => {
                    return (
                      <ProductAttribute
                        label={item.min}
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
                  ?.map((item) => item.name)
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
            </View>
          </View>
          {dataClassification.description ? (
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

          {dataClassification?.baseProductPackingLine?.volume || dataClassification?.productPackingLines?.length > 0 ? (
            <View>
              <View style={styles.viewLine} />
              <TouchableOpacity
                style={[styles.viewWeight, { flex: 1, padding: scaleWidth(16) }]}

                onPress={() => setShowOrHiddenWeight(!showOrHiddenWeight)}
              >
                <Text tx="productScreen.weight"
                  style={{ fontSize: fontSize.size12, color: colors.navyBlue, marginRight: scaleWidth(5) }}
                />
                <Images.icon_caretDownBlue
                  width={scaleWidth(16)}
                  height={scaleHeight(16)}
                  style={{ transform: [{ rotate: showOrHiddenWeight ? '180deg' : '0deg' }], }} />
              </TouchableOpacity>
            </View>
          ) : null}
          {
            showOrHiddenWeight ?
              <View style={{ paddingHorizontal: scaleWidth(16), flex: 1 }}>

                <Text tx="productScreen.weightOriginal" style={{ fontSize: fontSize.size14 }} />
                {/* <FlatList
                  data={detailProduct}
                  renderItem={({ item }) => {
                    return ( */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: scaleHeight(9) }}>
                  <Text style={[styles.fontSizeWeight, { flex: 2 }]}>
                    {dataClassification.uom == null ? detailProduct?.uomGroupLineOutput?.unitName : dataClassification?.uom?.name}
                  </Text>
                  <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row' }}>
                    <Text tx={`detailScreen.weight`} style={[styles.fontSizeWeight]} />
                    <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{detailProduct?.weight} kg</Text>
                  </View>
                  <View style={{ flex: 3, flexDirection: 'row' }}>
                    <Text tx="detailScreen.volume" style={[styles.fontSizeWeight]} />
                    <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{detailProduct?.volume} m3</Text>
                  </View>
                </View>
                {/* )
                  }}
                  keyExtractor={(item) => item.id.toString()}
                /> */}
                {dataClassification.productPackingLines.length > 0 ? (
                  <View>
                    <Text tx="productScreen.weightExchange" style={{ fontSize: fontSize.size14 }} />
                    <FlatList
                      data={dataClassification.productPackingLines}
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
                                {`${commasToDots(item.amount)} ${dataClassification.uom == null ? detailProduct?.uomGroupLineOutput?.unitName : dataClassification?.uom?.name}`}
                              </Text>
                            </View>

                            <View style={{ flex: 3, marginHorizontal: scaleWidth(25), flexDirection: 'row', alignItems: 'center' }}>
                              <Text tx="detailScreen.weight" style={[styles.fontSizeWeight,]} />
                              <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{item?.weight} kg</Text>
                            </View>

                            <View style={{ flex: 3, alignItems: 'center', flexDirection: 'row' }}>
                              <Text tx="detailScreen.volume" style={[styles.fontSizeWeight,]} />
                              <Text style={[styles.fontSizeWeight, { marginLeft: scaleWidth(2) }]}>{item?.volume} m3</Text>
                            </View>
                          </View>
                        )
                      }}
                      keyExtractor={(item) => item.id.toString()}
                      style={{ marginTop: scaleHeight(12) }}
                    />
                  </View>
                ) : null}

              </View>
              : null
          }


          {/* {attributes?.length !== 0 ? ( */}
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
              {/* <View
                style={{
                  marginVertical: scaleHeight(margin.margin_12),
                  paddingHorizontal: scaleWidth(padding.padding_12),
                }}>
                <Text
                  tx="detailScreen.properties"
                  style={{
                    fontWeight: "600",
                    fontSize: fontSize.size12,
                    color: colors.palette.navyBlue,
                  }} />
              </View>
              <View style={styles.viewLine2} /> */}
              {dataClassification?.productTemplate == null ? (
                <View>
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
                      {index !== attributeDetailsClassification.length - 1 ? (
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
                    {arrNCC.length + " nhà cung cấp"}
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
            </View>
          ) : null}
        </ScrollView>
        {/* </Screen> */}
      </SafeAreaView>
      {/* <Modal isVisible={modalImages} onBackdropPress={() => setModalImages(false)}>
                <View >
                    {arrImagesProduct && arrImagesProduct.length > 0 ? (
                        <View >
                            <Carousel
                                data={arrImagesProduct}
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
                                            resizeMode='cover'
                                            style={{ height: scaleHeight(416), width: scaleWidth(294), borderRadius: 16, alignSelf: 'center' }}>
                                        </Image>
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
                                dotsLength={arrImagesProduct.length > 0 && arrImagesProduct.length}
                                activeDotIndex={activeSlide}
                                dotStyle={{
                                    borderRadius: 8,
                                    height: scaleHeight(14),
                                    width: scaleWidth(14),
                                    borderColor: colors.palette.neutral100,
                                    borderWidth: 2,
                                }}
                                dotColor={'#BBB9B9'}
                                inactiveDotColor={'#BBB9B9'}
                                inactiveDotOpacity={1}
                                inactiveDotScale={1}
                                inactiveDotStyle={{
                                    width: scaleWidth(8),
                                    height: scaleHeight(8),
                                    borderRadius: 5,
                                    borderColor: '#BBB9B9',
                                    borderWidth: 2,
                                }}
                            />
                        </View>
                    ) : null}
                </View>
            </Modal>
            <Modal isVisible={modalImages1} onBackdropPress={() => setModalImages1(false)}>
                <View >
                    {detailsClassification.imageUrls && detailsClassification.imageUrls.length > 0 ? (
                        <View >
                            <Carousel
                                data={detailsClassification.imageUrls}
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
                                            resizeMode='cover'
                                            style={{ height: scaleHeight(416), width: scaleWidth(294), borderRadius: 16, alignSelf: 'center' }}>
                                        </Image>
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
                                dotsLength={detailsClassification.imageUrls.length > 0 && detailsClassification.imageUrls.length}
                                activeDotIndex={activeSlide}
                                dotStyle={{
                                    borderRadius: 8,
                                    height: scaleHeight(14),
                                    width: scaleWidth(14),
                                    borderColor: colors.palette.neutral100,
                                    borderWidth: 2,
                                }}
                                dotColor={'#BBB9B9'}
                                inactiveDotColor={'#BBB9B9'}
                                inactiveDotOpacity={1}
                                inactiveDotScale={1}
                                inactiveDotStyle={{
                                    width: scaleWidth(8),
                                    height: scaleHeight(8),
                                    borderRadius: 5,
                                    borderColor: '#BBB9B9',
                                    borderWidth: 2,
                                }}
                            />
                        </View>
                    ) : null}
                </View>
            </Modal> */}
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
    marginVertical: scaleHeight(margin.margin_10),
    marginHorizontal: scaleWidth(margin.margin_16),
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
