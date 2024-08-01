import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View
} from "react-native";
import { Svgs } from "../../../../../../assets/svgs";
import { Header } from "../../../../../components/header/header";
import { Text } from "../../../../../components/text/text";
import {
  colors,
  fontSize,
  margin,
  padding,
  scaleHeight,
  scaleWidth
} from "../../../../theme";
import AutoHeightImage from "react-native-auto-height-image";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { AutoImage } from "../../../../../components/auto-image/auto-image";
import {
  ALERT_TYPE,
  Dialog
} from "../../../../../components/dialog-notification";
import ProductAttributeDetails from "./render/attribute-detail";
import ProductClassificationDetail from "./render/classification-list-detail";
import ProductImageGallery from "./render/product-detail-images";
import ProductDetailsSection from "./render/product-detail-render";
import ProductWeightDetails from "./render/weight-detail";
import { translate } from "../../../../i18n/translate";
import { useStores } from "../../../../models";
import { styles } from "./styles";
type RouteParams = {
  reload?: boolean;
  screen?: any
};
type ScreenRouteProp = RouteProp<Record<string, RouteParams>, string>;
export const ProductDetailScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp>();
  const reload = route?.params?.reload;
  const screen = route?.params?.screen;
  const [showDetails, setShowDetails] = useState(false);
  const [showNCC, setShowNCC] = useState(false);
  const [changeClassification, setChangeClassification] = useState("");
  const [dataClassification, setDataClassification] = useState<any>({});
  const [dataClassificationToEdit, setDataClassificationToEdit] = useState({});
  const [arrImagesProduct, setArrImagesProduct] = useState([]);
  const [arrClassification, setArrClassification] = useState([]);
  const [detailsClassification, setDetailsClassification] = useState<any>([]);
  const [attributeCategory, setAttributeCategory] = useState([]);
  const [attributeDetailsClassification, setAttributeDetailsClassification] =
    useState<any>([]);
  const [arrNCC, setArrNCC] = useState([]);
  const [modalImages, setModalImages] = useState(false);
  const [modalImages1, setModalImages1] = useState(false);
  const { productStore } = useStores();
  const { productId } = productStore;
  const refCarousel = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [detailProduct, setDetailProduct] = useState<any>([]);
  const [dialogDeleteProduct, setDialogDeleteProduct] = useState(false);
  const [attributes, setAttributes] = useState<any>([]);
  const handleGetDetailProduct = async () => {
    try {
      const response = await productStore.getDetailProduct(productId);
      console.log("productId", productId);
      if (response && response.kind === "ok") {
        const data: any = response.response.data;
        setDetailProduct(data.baseTemplatePackingLine);
        setDataClassification(data);
        setDataClassificationToEdit(data);
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
    if (detailsClassification?.length !== 0) {
      selectDataClassification();
    }
  }, [detailsClassification]);

  useEffect(() => {
    handleGetDetailProduct();
  }, [productId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (reload === true) {
        handleGetDetailProduct();
      }
    });
    return unsubscribe;
  }, [navigation, reload]);
  function extractAttributeInfo(data: any) {
    if (!data.attributeCategory || data.attributeCategory.length === 0) {
      return [];
    }
    const groupedData = data.attributeCategory?.map((category: { name: any; attributeOutputList: any[]; }) => ({
      name: category.name,
      items:
        category.attributeOutputList?.map((attr) => ({
          value: attr.productAttributeValue.map((val: any) => val.value),
          name: attr.name,
        })) || [],
    }));
    setAttributes(groupedData);
    return groupedData;
  }
  useEffect(() => {
    extractAttributeInfo(dataClassification);
    // setAttributes(extractedAttributes);
  }, [dataClassification]);
  const selectDataClassification = () => {
    const arrTextfieldAttribute: any[] = [];

    attributeCategory.forEach((items: any) => {
      items.attributeOutputList?.forEach((item: { displayType: string; productAttributeValue: any[]; name: any; }) => {
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

    const matchingElements: any[] = [];
    attributeCategory.forEach((itemA: any) => {
      itemA.attributeOutputList?.forEach((dto: { productAttributeValue: any[]; id: any; }) => {
        dto.productAttributeValue.forEach((attrValueA) => {
          detailsClassification?.attributeValues?.forEach((itemB: { productAttributeValueId: any; productAttributeId: any; }) => {
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
    const newArr = detailsClassification?.attributeValues?.map((item: { productAttributeId: any; productAttributeValueId: any; }) => {
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

    const matchingElements1: { name: any; id: any; }[] = [];
    attributeCategory.forEach((itemA: any) => {
      itemA.attributeOutputList?.forEach((dto: { id: any; name: any; }) => {
        detailsClassification?.attributeValues?.forEach((itemB: { productAttributeId: any; }) => {
          if (dto.id === itemB.productAttributeId) {
            matchingElements1.push({ name: dto.name, id: dto.id });
          }
        });
      });
    });

    const newArr1 = newArr?.map((item: { productAttributeId: any; }) => {
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

    const newArr3 = newArr2
      ? Object.keys(newArr2).map((attributeName) => {
        return {
          name: attributeName,
          items: newArr2[attributeName] || [],
        };
      })
      : [];
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
        button: "",
        button2: translate("common.ok"),
        textBody: result.result.message,
        closeOnOverlayTap: false,
        onPressButton: () => {
          navigation.goBack();
          productStore.setReloadProductScreen(true);
          Dialog.hide();
        },
      });
    } else {
      await Dialog.hideDialog();
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: translate("productScreen.Notification"),
        button: translate("common.ok"),
        textBody: result.result.errorCodes[0].message,
        closeOnOverlayTap: false,
      });
    }
    setDialogDeleteProduct(false);
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    extractAttributeInfo(dataClassification);
    console.log("first", JSON.stringify(attributes));
    selectDataClassification();
  };
  // console.log('firszxczt',getUnitName)
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={translate("productScreen.detailsProduct")}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={styles.titleHeader}
        RightIcon2={screen === "seeDetail" ? null : Svgs.icon_trashWhite}
        RightIcon1={screen === "seeDetail" ? null : Svgs.icon_editWhite}
        onRightPress1={() =>
          navigation.navigate({
            name: "ProductEditScreen",
            params: {
              dataEdit: dataClassificationToEdit,
            },
          } as never)
        }
        onRightPress2={() => {
          Dialog.show({
            type: ALERT_TYPE.INFO,
            title: translate("productScreen.Notification"),
            button: translate("productScreen.cancel"),
            button2: translate("productScreen.BtnNotificationAccept"),
            textBody: translate("productScreen.ProductDelete"),
            closeOnOverlayTap: false,
            onPressButton: () => deleteProduct(),
          });
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
              tx="productScreen.infoAll"
              style={{
                fontSize: fontSize.size14,
                fontWeight: "500",
                flex: 1,
              }}></Text>
          </View>
          <ProductImageGallery
            arrImagesProduct={arrImagesProduct}
            setModalImages={setModalImages}
            setActiveSlide={setActiveSlide}
          />
          <ProductClassificationDetail
            arrClassification={arrClassification}
            changeClassification={changeClassification}
            setChangeClassification={setChangeClassification}
            setDetailsClassification={setDetailsClassification}
          />
          {detailsClassification.imageUrls?.length !== 0 ? (
            <ScrollView
              style={{
                marginVertical: scaleHeight(margin.margin_12),
                marginHorizontal: scaleWidth(margin.margin_16),
              }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {detailsClassification.imageUrls?.map((item: any, index: any) => {
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
          <ProductDetailsSection
            dataClassification={dataClassification}
            detailsClassification={detailsClassification}
            arrClassification={arrClassification}
          />
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
          <ProductWeightDetails
            dataClassification={dataClassification}
            detailProduct={detailProduct}
            arrClassification={arrClassification}
            detailsClassification={detailsClassification}
          />
          <ProductAttributeDetails
            attributeDetailsClassification={attributeDetailsClassification}
            attributes={attributes}
            showDetails={showDetails}
            toggleDetails={toggleDetails}
          />

          {arrNCC?.length > 0 ? (
            <View>
              <View style={styles.viewLine} />
              <View
                style={{
                  paddingVertical: scaleHeight(20),
                  paddingHorizontal: scaleWidth(16),
                }}>
                <Text tx="detailScreen.supplier" style={styles.textTitle} />
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
                      <Svgs.icon_caretUp />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => setShowNCC(!showNCC)}>
                      <Svgs.icon_caretRightDown />
                    </TouchableOpacity>
                  )}
                </View>
                {showNCC === true
                  ? arrNCC?.map((item: any) => {
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
                            fallbackSource={Svgs.imageError}
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
                renderItem={({ item, index }: any) => (
                  <View>
                    <Image
                      source={{
                        uri: item,
                      }}
                      defaultSource={Svgs.imageError}
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
                dotColor={colors.silver}
                inactiveDotColor={colors.silver}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
                inactiveDotStyle={{
                  width: scaleWidth(8),
                  height: scaleHeight(8),
                  borderRadius: 5,
                  borderColor: colors.silver,
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
                renderItem={({ item }: any) => (
                  <View>
                    <Image
                      source={{
                        uri: item,
                      }}
                      defaultSource={Svgs.imageError}
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
                dotColor={colors.silver}
                inactiveDotColor={colors.silver}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
                inactiveDotStyle={{
                  width: scaleWidth(8),
                  height: scaleHeight(8),
                  borderRadius: 5,
                  borderColor: colors.silver,
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
