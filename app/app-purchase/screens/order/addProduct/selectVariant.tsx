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
import { AutoImage, Button, Header, Text } from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
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
import {
  Content,
  OrderVariantResult,
} from "../../../models/order-store/entities/order-variant-model";
import { useStores } from "../../../models";
import { ItemSelectVariant } from "../components/itemSelectVariant";
import { styles } from "./styles";
import PriceModal from "../components/modal-price";
import Images from "../../../../../assets/index";

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
  const [modalPrice, setModalPrice] = useState<any>(false);
  const refCarousel = useRef(null);
  const productTemplateId = route?.params?.productTemplateId;

  const handleGetDetailProduct = async () => {
    try {
      const response = await productStore.getDetailProduct(
        productStore.productId
      );
      console.log("productId", response);
      if (response && response.kind === "ok") {
        const data: any = response.response.data;
        setDetailProduct(response.response.data);
        console.log("response---getDetailProduct-------", data);
        setArrImagesProduct(data.imageUrls);
      } else {
        console.error(
          "Failed to fetch detail:",
          response.response.errorCodes[0].message
        );
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  const getPriceVariant = async (value: any) => {
    try {
      const response = await orderStore.getPriceOrderVariant(value);
      console.log("productId", productStore.productId);
      if (response && response.kind === "ok") {
        const data = response.response.data;
        return data.price;
      } else {
        console.error("Failed to fetch detail:", response);
      }
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  const getDataVariantPrice = async () => {
    const response: OrderVariantResult =
      await orderStore.getListOrderVariantPrice(
        page,
        size,
        undefined,
        undefined,
        [],
        "",
        orderStore.isLoadMore,
        undefined,
        productTemplateId,
        Number(orderStore.dataPriceListSelected.id)
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
          if (items.saleUom === null) {
            return {
              ...items,
              amount:
                items.quantityInventory >= items.minQuantity
                  ? items.minQuantity
                  : 0,
              isSelect: false,
              conversionRate: 1,
              originAmount:
                items.quantityInventory >= items.minQuantity
                  ? items.minQuantity
                  : 0,
              saleUom: {
                id: items.uomGroup.uomOriginId,
                name: items.uomGroup.uomOriginName,
              },
            };
          } else {
            if (items.uomId === items.saleUom?.id) {
              return {
                ...items,
                amount:
                  items.quantityInventory >= items.minQuantity
                    ? items.minQuantity
                    : 0,
                isSelect: false,
                conversionRate: 1,
                originAmount:
                  items.quantityInventory >= items.minQuantity
                    ? items.minQuantity
                    : 0,
              };
            } else {
              const newObject = items.uomGroup.uomGroupLineItems.filter(
                (item: any) => item.uomId === items.saleUom?.id
              );
              const newAmount = Math.ceil(
                items.minQuantity / newObject[0].conversionRate
              );
              return {
                ...items,
                amount:
                  items.quantityInventory >= items.minQuantity
                    ? items.minQuantity
                    : 0,
                isSelect: false,
                conversionRate: newObject[0].conversionRate,
                originAmount:
                  items.quantityInventory >= items.minQuantity
                    ? items.minQuantity
                    : 0,
              };
            }
          }
        });
        const newArr2 = await Promise.all(
          newArr.map(async (items: any) => {
            const dataGetPrice = {
              productCategoryId: items.productTemplate.productCategoryId,
              productTemplateId: items.productTemplate.id,
              productId: items.id,
              priceListId: Number(orderStore.dataPriceListSelected.id),
              quantity: items.amount * items.conversionRate,
            };
            const newPrice = await getPriceVariant(dataGetPrice);
            return { ...items, unitPrice: newPrice };
          })
        );
        const newArr1 = newArr2.map((item) => {
          if (aMap.has(item.id)) {
            return {
              ...item,
              isSelect: true,
              amount: aMap.get(item.id).amount,
              price: aMap.get(item.id).price,
              unitPrice: aMap.get(item.id).unitPrice,
              conversionRate: aMap.get(item.id).conversionRate,
              saleUom: aMap.get(item.id).saleUom,
              originAmount: aMap.get(item.id).originAmount,
              taxValue: aMap.get(item.id).taxValue,
              VAT: aMap.get(item.id).VAT,
            };
          }
          return item;
        });
        setDataVariant(newArr1);
      } else {
        const newArr = response.response.data.content.map((items: any) => {
          if (items.saleUom === null) {
            return {
              ...items,
              amount:
                items.quantityInventory >= items.minQuantity
                  ? items.minQuantity
                  : 0,
              isSelect: false,
              conversionRate: 1,
              originAmount:
                items.quantityInventory >= items.minQuantity
                  ? items.minQuantity
                  : 0,
              saleUom: {
                id: items.uomGroup.uomOriginId,
                name: items.uomGroup.uomOriginName,
              },
            };
          } else {
            if (items.uomId === items.saleUom?.id) {
              return {
                ...items,
                amount:
                  items.quantityInventory >= items.minQuantity
                    ? items.minQuantity
                    : 0,
                isSelect: false,
                conversionRate: 1,
                originAmount:
                  items.quantityInventory >= items.minQuantity
                    ? items.minQuantity
                    : 0,
              };
            } else {
              const newObject = items.uomGroup.uomGroupLineItems.filter(
                (item: any) => item.uomId === items.saleUom?.id
              );
              const newAmount = Math.ceil(
                items.minQuantity / newObject[0].conversionRate
              );
              return {
                ...items,
                amount:
                  items.quantityInventory >= items.minQuantity
                    ? items.minQuantity
                    : 0,
                isSelect: false,
                conversionRate: newObject[0].conversionRate,
                originAmount:
                  items.quantityInventory >= items.minQuantity
                    ? items.minQuantity
                    : 0,
              };
            }
          }
        });
        const newArr2 = await Promise.all(
          newArr.map(async (items: any) => {
            const dataGetPrice = {
              productCategoryId: items.productTemplate.productCategoryId,
              productTemplateId: items.productTemplate.id,
              productId: items.id,
              priceListId: Number(orderStore.dataPriceListSelected.id),
              quantity: items.amount * items.conversionRate,
            };
            const newPrice = await getPriceVariant(dataGetPrice);
            return { ...items, unitPrice: newPrice };
          })
        );
        const newArr1 = newArr2.map((item: any) => {
          if (aMap.has(item.id)) {
            return {
              ...item,
              isSelect: true,
              amount: aMap.get(item.id).amount,
              price: aMap.get(item.id).price,
              unitPrice: aMap.get(item.id).unitPrice,
              conversionRate: aMap.get(item.id).conversionRate,
              saleUom: aMap.get(item.id).saleUom,
              originAmount: aMap.get(item.id).originAmount,
              taxValue: aMap.get(item.id).taxValue,
              VAT: aMap.get(item.id).VAT,
            };
          }
          return item;
        });
        setDataVariant((prevProducts: any) => [...prevProducts, ...newArr1]);
      }
    } else {
      console.error("Failed to fetch variant:", response);
    }
  };

  const getDataVariant = async () => {
    const response: OrderVariantResult = await orderStore.getListOrderVariant(
      page,
      size,
      undefined,
      undefined,
      [],
      "",
      orderStore.isLoadMore,
      undefined,
      productTemplateId
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
          if (items.saleUom === null) {
            return {
              ...items,
              amount: 0,
              isSelect: false,
              conversionRate: 1,
              originAmount: 0,
              saleUom: {
                id: items.uomGroup.uomOriginId,
                name: items.uomGroup.uomOriginName,
              },
            };
          } else {
            if (items.uomId === items.saleUom?.id) {
              return {
                ...items,
                amount: 0,
                isSelect: false,
                conversionRate: 1,
                originAmount: 0,
              };
            } else {
              const newObject = items.uomGroup.uomGroupLineItems.filter(
                (item: any) => item.uomId === items.saleUom?.id
              );
              return {
                ...items,
                amount: 0,
                isSelect: false,
                conversionRate: newObject[0].conversionRate,
                originAmount: 0,
              };
            }
          }
        });
        const newArr1 = newArr.map((item: any) => {
          if (aMap.has(item.id)) {
            return {
              ...item,
              isSelect: true,
              amount: aMap.get(item.id).amount,
              unitPrice: aMap.get(item.id).unitPrice,
              conversionRate: aMap.get(item.id).conversionRate,
              saleUom: aMap.get(item.id).saleUom,
              originAmount: aMap.get(item.id).originAmount,
              taxValue: aMap.get(item.id).taxValue,
              VAT: aMap.get(item.id).VAT,
            };
          }
          return item;
        });
        setDataVariant(newArr1);
      } else {
        const newArr = response.response.data.content.map((items: any) => {
          if (items.saleUom === null) {
            return {
              ...items,
              amount: 0,
              isSelect: false,
              conversionRate: 1,
              originAmount: 0,
              saleUom: {
                id: items.uomGroup.uomOriginId,
                name: items.uomGroup.uomOriginName,
              },
            };
          } else {
            if (items.uomId === items.saleUom?.id) {
              return {
                ...items,
                amount: 0,
                isSelect: false,
                conversionRate: 1,
                originAmount: 0,
              };
            } else {
              const newObject = items.uomGroup.uomGroupLineItems.filter(
                (item: any) => item.uomId === items.saleUom?.id
              );
              return {
                ...items,
                amount: 0,
                isSelect: false,
                conversionRate: newObject[0].conversionRate,
                originAmount: 0,
              };
            }
          }
        });
        const newArr1 = newArr.map((item: any) => {
          if (aMap.has(item.id)) {
            return {
              ...item,
              isSelect: true,
              amount: aMap.get(item.id).amount,
              price: aMap.get(item.id).price,
              unitPrice: aMap.get(item.id).unitPrice,
              conversionRate: aMap.get(item.id).conversionRate,
              saleUom: aMap.get(item.id).saleUom,
              originAmount: aMap.get(item.id).originAmount,
              taxValue: aMap.get(item.id).taxValue,
              VAT: aMap.get(item.id).VAT,
            };
          }
          return item;
        });
        setDataVariant((prevProducts: any) => [...prevProducts, ...newArr1]);
      }
    } else {
      console.error("Failed to fetch variant:", response);
    }
  };

  useEffect(() => {
    handleGetDetailProduct();
  }, []);

  useEffect(() => {
    if (orderStore.checkPriceList === true) {
      getDataVariantPrice();
    }
    if (orderStore.checkPriceList === false) {
      getDataVariant();
    }
  }, [page]);

  const handleEndReached = () => {
    if (dataVariant.length < 20) {
      // console.log("123");
    } else {
      if (page <= totalPagesProduct - 1) {
        orderStore.setIsLoadMore(true);
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleAddToCartPrice = (data: any) => {
    const newArr1 = dataVariant.map((items) => {
      if (items.id === data.id) {
        if (Number(items.amount) >= Number(items.minQuantity)) {
          return { ...data, isSelect: !data.isSelect };
        } else {
          return { ...data, isSelect: false };
        }
      } else {
        return items;
      }
    });
    setDataVariant(newArr1);
  };
  const handleAddToCart = (data: any) => {
    const newArr1 = dataVariant.map((items) => {
      if (items.id === data.id) {
        if (items.amount !== 0) {
          return { ...data, isSelect: !data.isSelect };
        } else {
          return { ...data, isSelect: false };
        }
      } else {
        return items;
      }
    });
    setDataVariant(newArr1);
  };

  const handlePlus = (data: any) => {
    const newArr1 = dataVariant.slice().map((items) => {
      if (items.id === data.id) {
        if (data.saleUom.id === data.uomId) {
          return {
            ...items,
            unitPrice: data.unitPrice,
            // price: data.unitPrice * (data.amount + 1),
            amount: data.amount + 1,
            isSelect: true,
            originAmount: data.amount + 1,
          };
        } else {
          return {
            ...items,
            unitPrice: data.unitPrice,
            // price: data.unitPrice * (data.amount+1),
            amount: data.amount + 1,
            isSelect: true,
            originAmount: data.amount + 1,
          };
        }
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
        if (data.saleUom.id === data.uomId) {
          if (data.amount - 1 === 0) {
            return {
              ...items,
              unitPrice: data.unitPrice,
              // price: data.unitPrice * (data.amount-1),
              amount: data.amount - 1,
              isSelect: false,
              originAmount: data.amount - 1,
            };
          } else {
            return {
              ...items,
              unitPrice: data.unitPrice,
              // price: data.unitPrice * (data.amount- 1),
              amount: data.amount - 1,
              isSelect: true,
              originAmount: data.amount - 1,
            };
          }
        } else {
          if (data.amount - 1 === 0) {
            return {
              ...items,
              unitPrice: data.unitPrice,
              // price: data.unitPrice * (data.amount -1),
              amount: data.amount - 1,
              isSelect: false,
              originAmount: data.amount - 1,
            };
          } else {
            return {
              ...items,
              unitPrice: data.unitPrice,
              // price: data.unitPrice *  (data.amount -1),
              amount: data.amount - 1,
              isSelect: true,
              originAmount: data.amount - 1,
            };
          }
        }
      } else {
        return items;
      }
    });
    setDataVariant(newArr2);
  };

  const handlePlusPrice = async (data: any) => {
    const newArr1 = await Promise.all(
      dataVariant.slice().map(async (items) => {
        if (items.id === data.id) {
          const dataGetPrice = {
            productCategoryId: data.productTemplate.productCategoryId,
            productTemplateId: data.productTemplate.id,
            productId: data.id,
            priceListId: Number(orderStore.dataPriceListSelected.id),
            quantity: data.amount + 1,
          };
          const newPrice = await getPriceVariant(dataGetPrice);
          console.log(newPrice);
          if (data.amount + 1 >= items.minQuantity) {
            return {
              ...items,
              unitPrice: newPrice,
              // price: newPrice * (data.amount +1),
              amount: data.amount + 1,
              isSelect: true,
              originAmount: data.amount + 1,
            };
          } else {
            return {
              ...items,
              unitPrice: newPrice,
              // price: newPrice * (data.amount +1),
              amount: data.amount + 1,
              isSelect: false,
              originAmount: data.amount + 1,
            };
          }
        } else {
          return items;
        }
      })
    );
    setDataVariant(newArr1);
  };

  const handleMinusPrice = async (data: any) => {
    const newArr1 = dataVariant.slice();
    const newArr2 = await Promise.all(
      newArr1.map(async (items: any) => {
        if (items.id === data.id) {
          const dataGetPrice = {
            productCategoryId: data.productTemplate.productCategoryId,
            productTemplateId: data.productTemplate.id,
            productId: data.id,
            priceListId: Number(orderStore.dataPriceListSelected.id),
            quantity: data.amount - 1,
          };
          const newPrice = await getPriceVariant(dataGetPrice);
          if (data.amount - 1 < items.minQuantity) {
            return {
              ...items,
              unitPrice: newPrice,
              amount: data.amount - 1,
              isSelect: false,
              originAmount: data.amount - 1,
            };
          } else {
            return {
              ...items,
              unitPrice: newPrice,
              amount: data.amount - 1,
              isSelect: true,
              originAmount: data.amount - 1,
            };
          }
        } else {
          return items;
        }
      })
    );
    setDataVariant(newArr2);
  };

  const changePrice = (data: any, text: any) => {
    console.log(text, "text=====");
    const newArr1 = dataVariant.map((items) => {
      if (items.id === data.id) {
        return {
          ...items,
          unitPrice: text,
          // price: Number(text) * Number(data.amount),
          amount: data.amount,
          isSelect: true,
          originAmount: data.originAmount,
        };
      } else {
        return items;
      }
    });
    console.log("dsadassa0", newArr1);
    setDataVariant(newArr1);
  };
  const addVariantToCart = () => {
    const newArr1 = dataVariant.filter((items: any) => items.isSelect === true);
    const idSetB = new Set(dataVariant.map((item) => item.id));
    const newArr2 = orderStore.dataProductAddOrder.filter(
      (item) => !idSetB.has(item.id)
    );
    const newArr3 = newArr2.concat(newArr1);
    orderStore.setDataProductAddOrder(newArr3);
    navigation.goBack();
  };

  return (
    <View style={styles.ROOT}>
      <Header
        LeftIcon={Svgs.back}
        onLeftPress={() => navigation.goBack()}
        style={{ height: scaleHeight(54) }}
        headerText={`${detailProduct.sku}` + "/Chọn biến thể"}
        titleMiddleStyle={{ alignItems: "flex-start" }}
      />
      <View style={styles.viewBodySelectVariant}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            tx={"detailScreen.information"}
            style={styles.textDetailInfor}
          />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({
                name: "productDetailScreen" as never,
                params: { screen: "seeDetail" },
              } as never)
            }>
            <Text tx={"order.seeDetail"} style={styles.textViewInfo} />
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
                    style={styles.viewImageSelectVariant}
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
              style={styles.viewImageSelectVariant}
              source={Images.noImages}
            />
          </View>
        )}
        <ProductAttribute
          labelTx="detailScreen.productCode"
          value={detailProduct.sku}
        />
        <ProductAttribute
          labelTx="detailScreen.nameProduct"
          value={detailProduct.name}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: scaleHeight(12),
          }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text
              text={dataVariant.length.toString()}
              style={[
                styles.textViewInfo,
                { color: colors.nero, marginRight: scaleWidth(3) },
              ]}
            />
            <Text
              tx="createProductScreen.productClassification"
              style={[styles.textViewInfo, { color: colors.nero }]}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              tx="common.selected"
              style={[
                styles.textViewInfo,
                { color: colors.nero, marginRight: scaleWidth(3) },
              ]}
            />
            <Text
              text={dataVariant
                .filter((items: any) => items.isSelect === true)
                .length.toString()}
              style={[styles.textViewInfo, { color: colors.nero }]}
            />
          </View>
        </View>
        <FlatList
          data={dataVariant}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={() => handleEndReached()}
          renderItem={({ item, index }) => (
            <ItemSelectVariant
              item={item}
              handleMinusPrice={handleMinusPrice}
              handlePlusPrice={handlePlusPrice}
              handleAddToCart={handleAddToCart}
              handleAddToCartPrice={handleAddToCartPrice}
              handleMinus={handleMinus}
              handlePlus={handlePlus}
              changeText={changePrice}
            />
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => addVariantToCart()}
        disabled={
          dataVariant.filter((items: any) => items.isSelect === true).length ===
          0
            ? true
            : false
        }
        style={{
          flexDirection: "row",
          alignItems: "center",
          height: scaleHeight(48),
          backgroundColor: colors.palette.navyBlue,
          marginHorizontal: scaleWidth(16),
          marginBottom: scaleHeight(20),
          borderRadius: 8,
          justifyContent: "center",
          opacity:
            dataVariant.filter((items: any) => items.isSelect === true)
              .length === 0
              ? 0.6
              : 1,
        }}>
        <Svgs.ic_ShoopingCar />
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
    </View>
  );
});
