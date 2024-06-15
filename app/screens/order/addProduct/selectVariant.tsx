import { Observer, observer } from "mobx-react-lite";
import { FC, useEffect, useRef, useState } from "react";
import React, {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { AutoImage, Button, Header, Text } from "../../../components";
import { Images } from "../../../../assets";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  colors,
  fontSize,
  margin,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Modal from "react-native-modal";
import ProductAttribute from "../../product/component/productAttribute";
import FastImage from "react-native-fast-image";
import {
  Content,
  OrderVariantResult,
} from "../../../models/order-store/order-variant-model";
import { useStores } from "../../../models";
import AutoHeightImage from "react-native-auto-height-image";
import { ProductResult } from "../../../models/product-store/product-store-model";
import { ItemSelectVariant } from "../components/itemSelectVariant";
import { ALERT_TYPE, Toast } from "../../../components/dialog-notification";

export const SelectVariant: FC = observer(function SelectVariant() {
  const navigation = useNavigation();
  const { orderStore, productStore } = useStores();
  const route = useRoute();
  const [modalImages, setModalImages] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [dataSelect, setDataSelect] = useState([]);
  const [totalPagesProduct, setTotalPagesProduct] = useState<any>(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [arrImagesProduct, setArrImagesProduct] = useState([]);
  const [detailProduct, setDetailProduct] = useState<any>([]);
  const [dataVariant, setDataVariant] = useState<Content[]>([]);
  const refCarousel = useRef(null);
  const productTemplateId = route?.params?.productTemplateId;

  const handleGetDetailProduct = async () => {
    try {
      const response = await productStore.getDetailProduct(
        productStore.productId
      );
      console.log("productId", productStore.productId);
      if (response && response.kind === "ok") {
        const data: any = response.response.data;
        setDetailProduct(response.response.data);

        console.log("response---getDetailProduct-------", data);

        setArrImagesProduct(data.imageUrls);
      } else {
        console.error("Failed to fetch detail:", response);
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  const getDataVariant = async () => {
    try {
      const response: OrderVariantResult =
        await orderStore.getListOrderVariantPrice(
          page,
          size,
          undefined,
          undefined,
          "",
          orderStore.isLoadMore,
          undefined,
          productTemplateId,
          14061
        );
      console.log(
        "data variant ///////",
        JSON.stringify(response.response.data.content)
      );
      if (response && response.kind === "ok") {
        setTotalPagesProduct(response.response.data.totalPages);
        const aMap = new Map(
          orderStore.dataProductAddOrder.map((item) => [item.id, item])
        );
        console.log("////////////////", response.response.data.totalPages);
        if (page === 0) {
          const newArr = response.response.data.content.map((items: any) => {
            return { ...items, amount: 0, isSelect: false };
          });

          const newArr1 = newArr.map((item) => {
            if (aMap.has(item.id)) {
              return {
                ...item,
                isSelect: true,
                amount: aMap.get(item.id).amount,
                price: 28000,
              };
            }
            return item;
          });
          setDataVariant(newArr1);
        } else {
          const newArr = response.response.data.content.map((items: any) => {
            return { ...items, amount: 0, isSelect: false };
          });
          const newArr1 = newArr.map((item) => {
            if (aMap.has(item.id)) {
              return {
                ...item,
                isSelect: true,
                amount: aMap.get(item.id).amount,
                price: 28000,
              };
            }
            return item;
          });
          setDataVariant((prevProducts: any) => [...prevProducts, ...newArr1]);
        }
      } else {
        console.error("Failed to fetch variant:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    handleGetDetailProduct();
  }, []);

  useEffect(() => {
    if (orderStore.checkPriceList === true) {
      getDataVariant();
    }
  }, [page]);

  const handleEndReached = () => {
    if (dataVariant.length < 20) {
      console.log("123");
    } else {
      if (page <= totalPagesProduct - 1) {
        orderStore.setIsLoadMore(true);
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handlePlus = (data: any) => {
    const newArr1 = dataVariant.map((items) => {
      if (items.id === data.id) {
        return { ...data, amount: data.amount + 1, isSelect: true };
      } else {
        return items;
      }
    });
    setDataVariant(newArr1);
  };
  const handleMinus = (data: any) => {
    const newArr1 = dataVariant.slice();
    const newArr2 = newArr1.map((items: any) => {
      if (items.id === data.id) {
        if (items.amount === 0) {
          Toast.show({
            type: ALERT_TYPE.DANGER,
            textBody: "Số lượng không thể âm",
          });
          return items;
        } else {
          if (items.amount - 1 === 0) {
            return { ...items, amount: 0, isSelect: false };
          } else {
            return { ...items, amount: items.amount - 1, isSelect: true };
          }
        }
      } else {
        return items;
      }
    });
    setDataVariant(newArr2);
  };
  const addVariantToCart = () => {
    const newArr1 = dataVariant.filter((items: any) => items.isSelect === true);
    console.log(newArr1);
    const idSetB = new Set(dataVariant.map((item) => item.id));
    const newArr2 = orderStore.dataProductAddOrder.filter(
      (item) => !idSetB.has(item.id)
    );
    const newArr3 = newArr2.concat(newArr1);
    console.log(newArr3);
    orderStore.setDataProductAddOrder(newArr3);
    navigation.goBack();
  };

  return (
    <View style={{ backgroundColor: colors.palette.white, flex: 1 }}>
      <Header
        LeftIcon={Images.back}
        onLeftPress={() => navigation.goBack()}
        style={{ height: scaleHeight(54) }}
        headerText={`${detailProduct.sku}` + "/Chọn biến thể"}
        titleMiddleStyle={{ alignItems: "flex-start" }}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: scaleWidth(16),
          marginVertical: scaleHeight(20),
          justifyContent: "flex-start",
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            tx={"detailScreen.information"}
            style={{
              flex: 1,
              fontWeight: "700",
              fontSize: fontSize.size12,
              lineHeight: scaleHeight(14.52),
              color: colors.nero,
            }}
          />
          <TouchableOpacity>
            <Text
              tx={"order.seeDetail"}
              style={{
                fontWeight: "400",
                fontSize: fontSize.size12,
                lineHeight: scaleHeight(14.52),
                color: colors.navyBlue,
              }}
            />
          </TouchableOpacity>
        </View>
        {arrImagesProduct?.length !== 0 ? (
          <ScrollView
            style={{
              marginVertical: scaleHeight(margin.margin_12),
              // marginHorizontal: scaleWidth(margin.margin_16),
              maxHeight: scaleHeight(70),
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {arrImagesProduct?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setModalImages(true);
                    setActiveSlide(index);
                  }}>
                  <AutoImage
                    style={{
                      width: scaleWidth(70),
                      height: scaleHeight(70),
                      borderRadius: 10,
                      marginRight: 12,
                    }}
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
              style={{
                width: scaleWidth(70),
                height: scaleHeight(70),
                borderRadius: 10,
                marginRight: 12,
              }}
              source={require("../../../../assets/Images/no_images.png")}
            />
          </View>
        )}
        <ProductAttribute label="Mã sản phẩm" value={detailProduct.sku} />
        <ProductAttribute label="Tên sản phẩm" value={detailProduct.name} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: scaleHeight(12),
          }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              text={dataVariant.length.toString()}
              style={{
                lineHeight: scaleHeight(14.52),
                fontWeight: "400",
                fontSize: fontSize.size12,
                color: colors.nero,
              }}
            />
            <Text
              text=" phân loại sản phẩm"
              style={{
                lineHeight: scaleHeight(14.52),
                fontWeight: "400",
                fontSize: fontSize.size12,
                color: colors.nero,
              }}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              text="Đã chọn "
              style={{
                lineHeight: scaleHeight(14.52),
                fontWeight: "400",
                fontSize: fontSize.size12,
                color: colors.nero,
              }}
            />
            <Text
              text={dataSelect.length.toString()}
              style={{
                lineHeight: scaleHeight(14.52),
                fontWeight: "400",
                fontSize: fontSize.size12,
                color: colors.nero,
              }}
            />
          </View>
        </View>
        <FlatList
          data={dataVariant}
          // keyExtractor={item => item.id.toString()}
          onEndReached={() => handleEndReached()}
          renderItem={({ item, index }) => (
            <ItemSelectVariant
              item={item}
              handleMinus={handleMinus}
              handlePlus={handlePlus}
            />
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => addVariantToCart()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: scaleHeight(48),
          backgroundColor: colors.palette.navyBlue,
          marginHorizontal: scaleWidth(16),
          marginBottom: scaleHeight(20),
          borderRadius: 8,
          justifyContent: "center",
        }}>
        <Images.ic_ShoopingCar />
        <Text
          tx={"order.addToCart"}
          style={{
            marginLeft: scaleWidth(12),
            fontWeight: "600",
            fontSize: fontSize.size14,
            lineHeight: scaleHeight(24),
            color: colors.palette.white,
          }}
        />
      </TouchableOpacity>
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
    </View>
  );
});
