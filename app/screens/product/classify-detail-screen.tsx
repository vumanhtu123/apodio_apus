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
import { formatNumber } from "../../utils/validate";
import { showDialog } from "../../utils/toast";
import ProductAttribute from "./component/productAttribute";
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
  const handleGetDetailClassify = async () => {
    try {
      const response = await productStore.getDetailClassify(productId);
      console.log("handleGetDetailClassify----------", response);
      if (response && response.kind === "ok") {
        const data = response.response.data;
        console.log("response", response.response.data);

        setDetailProduct(response.response.data);
        setDataClassification(data);
        setArrImagesProduct(data.imageUrls);
        setArrClassification(data.productVariants);
        setArrNCC(data.vendors);
        setAttributeCategory(data.attributeCategory);
        if (data.productVariants !== undefined) {
          setChangeClassification(data.productVariants[0]?.id);
          setDetailsClassification(data.productVariants[0]);
        }
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

    attributeCategory.forEach((category) => {
      category.attributeOutputDtos.forEach((dto) => {
        dto.productAttributeValue.forEach((attrValue) => {
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
  // const result = getNameAndValue();
  // console.log('result:', result);
  // getNameAndValue();

  // useEffect(() => {
  //     console.log('checkkk', nameValue)
  // }, [nameValue])
  // const result = getNameAndValue();
  // console.log(result);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
    getNameAndValue();
    // selectDataClassification()
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerText={`Chi tiết phân loại`}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={styles.titleHeader}
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
          {arrImagesProduct.length > 0 ? (
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
                navigation.navigate("view3D" as any, {
                  scene: dataClassification?.scene?.url,
                })
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
                label="Mã sản phẩm"
                value={dataClassification.sku}
              />
              <ProductAttribute
                label="Tên sản phẩm "
                value={dataClassification.name}
              />
              <ProductAttribute
                label="Trạng thái"
                value={
                  dataClassification.saleOk === true
                    ? "Có thể bán"
                    : dataClassification.purchaseOk === true
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
                  {dataClassification.retailPrice?.map((item) => {
                    return (
                      <ProductAttribute
                        label={item.min}
                        value={formatNumber(item.price)}
                        labelStyle={{ color: colors.palette.nero }}
                        textStyle={{ color: colors.palette.radicalRed }}
                      />
                    );
                  })}
                </View>
              ) : null}
              <View>
                <ProductAttribute
                  label="Giá vốn"
                  value={formatNumber(dataClassification?.costPrice ?? 0)}
                  textStyle={{ color: colors.palette.radicalRed }}
                />
                <ProductAttribute
                  label="Giá niêm yết"
                  value={formatNumber(dataClassification?.listPrice ?? 0)}
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
                  {dataClassification.wholesalePrice?.map((item) => {
                    return (
                      <ProductAttribute
                        label={item.min}
                        value={formatNumber(item.price)}
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
                  .join(", ")}
              />
              <ProductAttribute
                label="Hình thức quản lý"
                value={getLabelByList(dataClassification.managementForm)}
              />
              <ProductAttribute
                label="Đơn vị tính gốc"
                value={dataClassification.uom?.name}
              />
            </View>
          </View>
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
          <View style={styles.viewLine} />

          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: scaleHeight(16),
              marginHorizontal: scaleWidth(margin.margin_16),
            }}
            onPress={toggleDetails}>
            <Text style={{ color: colors.palette.navyBlue }}>
              Xem chi tiết thuộc tính{" "}
            </Text>
            <Images.iconDownBlue
              width={16}
              height={16}
              style={{
                transform: [{ rotate: showDetails ? "180deg" : "0deg" }],
              }}
            />
          </TouchableOpacity>
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
                  Thuộc tính chung
                </Text>
              </View>
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
                  {index !== attributeDetailsClassification.length - 1 ? (
                    <View style={styles.viewLine2} />
                  ) : null}
                </View>
              ))}
            </View>
          )}
          {arrNCC ? (
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
});
