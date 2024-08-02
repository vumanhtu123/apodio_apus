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
import { Svgs } from "../../../../../../assets/svgs";
import { Header } from "../../../../../components/header/header";
import { Text } from "../../../../../components/text/text";
import {
  colors,
  fontSize,
  margin,
  padding,
  palette,
  scaleHeight,
  scaleWidth,
} from "../../../../theme";
// import { styles } from "./styles"
import { AutoImage } from "../../../../../components/auto-image/auto-image";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AutoHeightImage from "react-native-auto-height-image";
import { useStores } from "../../../../models";
import { commasToDots, formatCurrency, formatNumber, formatVND } from "../../../../utils/validate";
import ProductAttribute from "../../component/productAttribute";
import { ALERT_TYPE, Dialog } from "../../../../../components/dialog-notification";
import { translate } from "../../../../i18n/translate";
import SupplierList from "./render/supplier-detail";
import ProductAttributes from "./render/attribute-detail";
import ProductDetails from "./render/product-detail-render";
import { styles } from "./styles";
import ProductWeightDetails from "./render/weight-detal";
// import ProductAttribute from "./componet/productAttribute";

export const ClassifyDetailScreen: FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const reload = route?.params?.reload;
  const [showDetails, setShowDetails] = useState(false);
  const [dataClassification, setDataClassification] = useState<any>({});
  const [arrImagesProduct, setArrImagesProduct] = useState<any>([]);
  const [detailsClassification, setDetailsClassification] = useState<any>([]);
  const [attributeDetailsClassification, setAttributeDetailsClassification] =
    useState([]);
  const [arrNCC, setArrNCC] = useState([]);
  const [modalImages, setModalImages] = useState(false);
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
      if (response && response.kind === "ok") {
        const data: any = response.response.data;
        console.log("handleGetDetailClassify----------", JSON.stringify(data));
        setDetailProduct(data.baseProductPackingLine);
        setDataClassification(data);
        setArrImagesProduct(data.imageUrls);
        setArrNCC(data.vendors);
        if (data.productVariants !== undefined) {
          setDetailsClassification(data.productVariants[0]);
        }
        setIsChecking(false);
        getNameAndValue(data.attributeCategory);
        extractAttributeInfo(data.productTemplate)
      } else {
        console.error("Failed to fetch detail:", response);
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };
  useEffect(() => {
    handleGetDetailClassify();
  }, [productId]);


  useEffect(() => {
    console.log("---------useEffect---------reload------------------");
    const unsubscribe = navigation.addListener('focus', () => {
      if (reload === true) {
        handleGetDetailClassify();
      }
    });

    return unsubscribe;
  }, [navigation, reload]);

  const arrBrands = [
    { id: 3746, label: "Mặc định", label2: "DEFAULT" },
    { id: 4638, label: "Lô", label2: "LOTS" },
    { id: 4398, label: "Serial", label2: "SERIAL" },
  ];
  const getLabelByList = (label2: string) => {
    const item = arrBrands.find((item) => item.label2 === label2);
    return item ? item.label : "";
  };

  const getNameAndValue = (data: any) => {
    const nameAndValue: { name: any; value: any }[] = [];
    data?.forEach((category: any) => {
      category.attributeOutputList?.forEach((dto: any) => {
        dto.productAttributeValue?.forEach((attrValue: any) => {
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
  const extractAttributeInfo = (data: any) => {
    if (!data?.attributeCategory || data?.attributeCategory.length === 0) {
      return [];
    }
    const groupedData = data.attributeCategory?.map((category: { name: any; attributeOutputList: any[]; }) => ({
      name: category.name,
      items: category.attributeOutputList?.map(attr => ({
        value: attr.productAttributeValue.map((val: { value: any; }) => val.value),
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
    }
  };
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        colorIcon={colors.text}
        headerTx="detailScreen.headerClassify"
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={styles.titleHeader}
        widthRightIcon={scaleWidth(16)}
        heightRightIcon={scaleHeight(16)}
        RightIcon={Svgs.icon_editWhite}
        onRightPress={() => navigation.navigate({ name: 'EditClassify', params: { dataEdit: dataClassification, typeVariant: 'variant', nameValue: nameValue, attributes: attributes } } as never)}
        RightIcon1={Svgs.icon_trashWhite}
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
        <ScrollView
          style={{ marginVertical: scaleHeight(margin.margin_12), }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{ flexDirection: "row", marginHorizontal: scaleWidth(margin.margin_16), }}>
            <Text
              tx="detailScreen.information"
              style={{ fontSize: fontSize.size14, fontWeight: "500", flex: 1 }} />
          </View>
          {/* list ảnh  */}
          {arrImagesProduct?.length > 0 ? (
            <ScrollView
              style={{
                marginVertical: scaleHeight(margin.margin_12),
                marginHorizontal: scaleWidth(margin.margin_16),
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {arrImagesProduct?.map((item: any, index: React.SetStateAction<number>) => {
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
          {/* check 3d */}
          {!isChecking && dataClassification?.scene?.url !== "" ? (
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center", marginLeft: scaleWidth(16), }}
              onPress={() =>
                navigation.navigate({
                  name: "view3D", params: {
                    scene: dataClassification?.scene?.url,
                  }
                } as never)
              }>
              <Svgs.ic_3d
                width={scaleWidth(20)}
                height={scaleHeight(20)}
              />
              <Text
                tx="productScreen.Perspective"
                style={{ fontSize: fontSize.size12, marginLeft: 6, color: colors.navyBlue }}>
              </Text>
            </TouchableOpacity>
          ) : null}
          {/* chi tiết thuộc tính  */}
          <ProductDetails dataClassification={dataClassification} getLabelByList={getLabelByList} />
          {/* mô tả  */}
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
          {/* chi tiết trọng tải  */}
          <ProductWeightDetails dataClassification={dataClassification} detailProduct={detailProduct} />
          {/* chi tiết nhà cung cấp */}
          <ProductAttributes
            dataClassification={dataClassification}
            nameValue={nameValue}
            attributeDetailsClassification={attributeDetailsClassification}
            attributes={attributes} />
          <SupplierList arrNCC={arrNCC} />
        </ScrollView>
      </SafeAreaView>
      <Modal isVisible={modalImages} onBackdropPress={() => setModalImages(false)}>
        <View >
          {arrImagesProduct && arrImagesProduct.length > 0 ? (
            <View >
              <Carousel
                data={arrImagesProduct}
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