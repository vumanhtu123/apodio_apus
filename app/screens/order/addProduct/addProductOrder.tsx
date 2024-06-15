import { Observer, observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import React, {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Header, Text } from "../../../components";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Images } from "../../../../assets";
import { colors, fontSize, scaleHeight, scaleWidth } from "../../../theme";
import { useStores } from "../../../models";
import CategoryModalFilter from "../../product/component/modal-category";
import Dialog from "../../../components/dialog/dialog";
import { styles } from "./styles";
import RenderOrderItem from "../components/renderOrderItem";

export const AddProductOrder: FC = observer(function AddProductOrder() {
  const navigation = useNavigation();
  const [tabTypes, setTabTypes] = useState(["Sản phẩm", "Phân loại"]);
  const [showCategory, setShowCategory] = useState(false);
  const [indexItem, setIndexItem] = useState(0);
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeleteFailModalVisible, setIsDeleteFailModalVisible] =
    useState(false);
  const [totalPagesProduct, setTotalPagesProduct] = useState<any>(0);
  const [dataCategoryFilter, setDataCategoryFilter] = useState<any>([]);
  const [dataProduct, setDataProduct] = useState<any>([]);
  const { orderStore, categoryStore, productStore } = useStores();
  const [errorMessage, setErrorMessage] = useState("");
  const [size, setSize] = useState(20);
  const [viewProduct, setViewProduct] = useState(orderStore.viewProductType);
  const [index, setIndex] = useState();
  const { dataProductAddOrder } = orderStore;

  useFocusEffect(
    useCallback(() => {
      setIndexItem(orderStore.viewProductType === "VIEW_PRODUCT" ? 0 : 1);
    }, [viewProduct])
  );

  const handleGetCategoryFilter = async () => {
    try {
      const response = await categoryStore.getListCategoriesFilter(0, 100);
      if (response && response.kind === "ok") {
        const data = response.response.data.content;
        const newElement = { name: "Tất cả danh mục" };
        data.unshift(newElement);
        setDataCategoryFilter(data);
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const [searchValue, setSearchValue] = useState("");
  const handleSearchValueChange = (text: string) => {
    const newValue = text !== null ? text.toString() : "";
    setSearchValue(newValue);
  };
  const handleSubmitSearch = () => {
    setPage(0);
    if (
      orderStore.checkPriceList === false &&
      orderStore.viewProductType === "VIEW_PRODUCT"
    ) {
      handleGetProduct(searchValue);
    }
    if (
      orderStore.checkPriceList === false &&
      orderStore.viewProductType === "VIEW_VARIANT"
    ) {
      handleGetVariant(searchValue);
    }
    if (
      orderStore.checkPriceList === true &&
      orderStore.viewProductType === "VIEW_PRODUCT"
    ) {
      handleGetProductPrice(searchValue);
    }
    if (
      orderStore.checkPriceList === true &&
      orderStore.viewProductType === "VIEW_VARIANT"
    ) {
      handleGetVariantPrice(searchValue);
    }
    console.log("tim kiem");
  };
  const handleGetProduct = async (searchValue?: any) => {
    try {
      const parseSort =
        orderStore.sort.length === 0
          ? ""
          : orderStore.sort[0] !== ""
          ? "&sort=" + orderStore.sort[0]
          : "" +
            (orderStore.sort[1] !== "" ? "&sort=" + orderStore.sort[1] : "");
      const response: any = await orderStore.getListOrderProduct(
        page,
        size,
        orderStore.productCategoryId === 0
          ? undefined
          : orderStore.productCategoryId,
        searchValue,
        orderStore.tagId,
        parseSort,
        orderStore.isLoadMore,
        undefined
      );
      // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
      if (response && response.kind === "ok") {
        setTotalPagesProduct(response.response.data.totalPages);
        console.log("////////////////", response.response.data.totalPages);
        if (page === 0) {
          if (response.response.data.content.length === 0) {
            setDataProduct([]);
          } else {
            const newArr = response.response.data.content.map((items: any) => {
              return { ...items, amount: 0 };
            });
            setDataProduct(newArr);
          }
        } else {
          setDataProduct((prevProducts: any) => [
            ...prevProducts,
            ...response.response.data.content.map((items: any) => {
              return { ...items, amount: 0 };
            }),
          ]);
        }
      } else {
        console.error("Failed to fetch product:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const handleGetVariant = async (searchValue?: any) => {
    try {
      const parseSort =
        orderStore.sort.length === 0
          ? ""
          : orderStore.sort[0] !== ""
          ? "&sort=" + orderStore.sort[0]
          : "" +
            (orderStore.sort[1] !== "" ? "&sort=" + orderStore.sort[1] : "");
      const response: any = await orderStore.getListOrderVariant(
        page,
        size,
        orderStore.productCategoryId === 0
          ? undefined
          : orderStore.productCategoryId,
        searchValue,
        orderStore.tagId,
        parseSort,
        orderStore.isLoadMore,
        undefined,
        undefined
      );
      console.log(
        "mm------------------",
        JSON.stringify(response.response.data.content)
      );
      if (response && response.kind === "ok") {
        setTotalPagesProduct(response.response.data.totalPages);
        const aMap = new Map(
          orderStore.dataProductAddOrder.map((item) => [item.id, item])
        );
        console.log("////////////////", response.response.data.totalPages);
        if (page === 0) {
          if (response.response.data.content.length === 0) {
            setDataProduct([]);
          } else {
            const newArr = response.response.data.content.map((items: any) => {
              if (items.uomId === items.saleUom?.id) {
                return {
                  ...items,
                  amount: 0,
                  isSelect: false,
                  // conversionRate: 1,
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
                  // conversionRate: newObject[0].conversionRate,
                  originAmount: 0,
                };
              }
            });
            const newArr1 = newArr.map((item: any) => {
              if (aMap.has(item.id)) {
                return {
                  ...item,
                  isSelect: true,
                  amount: aMap.get(item.id).amount,
                  price: aMap.get(item.id).price,
                  conversionRate: aMap.get(item.id).conversionRate,
                  saleUom: aMap.get(item.id).saleUom,
                  originAmount: aMap.get(item.id).originAmount,
                  taxValue: aMap.get(item.id).taxValue,
                  VAT: aMap.get(item.id).VAT,
                };
              }
              return item;
            });
            setDataProduct(newArr1);
          }
        } else {
          const newArr = response.response.data.content.map((items: any) => {
            if (items.uomId === items.saleUom?.id) {
              return {
                ...items,
                amount: 0,
                isSelect: false,
                // conversionRate: 1,
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
                // conversionRate: newObject[0].conversionRate,
                originAmount: 0,
              };
            }
          });
          const newArr1 = newArr.map((item: any) => {
            if (aMap.has(item.id)) {
              return {
                ...item,
                isSelect: true,
                amount: aMap.get(item.id).amount,
                price: aMap.get(item.id).price,
                conversionRate: aMap.get(item.id).conversionRate,
                saleUom: aMap.get(item.id).saleUom,
                originAmount: aMap.get(item.id).originAmount,
                taxValue: aMap.get(item.id).taxValue,
                VAT: aMap.get(item.id).VAT,
              };
            }
            return item;
          });
          setDataProduct((prevProducts: any) => [...prevProducts, ...newArr1]);
        }
      } else {
        console.error("Failed to fetch product:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const handleGetProductPrice = async (searchValue?: any) => {
    try {
      const parseSort =
        orderStore.sort.length === 0
          ? ""
          : orderStore.sort[0] !== ""
          ? "&sort=" + orderStore.sort[0]
          : "" +
            (orderStore.sort[1] !== "" ? "&sort=" + orderStore.sort[1] : "");
      const response: any = await orderStore.getListOrderProductPrice(
        page,
        size,
        orderStore.productCategoryId === 0
          ? undefined
          : orderStore.productCategoryId,
        searchValue,
        orderStore.tagId,
        parseSort,
        orderStore.isLoadMore,
        undefined,
        Number(orderStore.dataPriceListSelected.id)
      );
      // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
      if (response && response.kind === "ok") {
        setTotalPagesProduct(response.response.data.totalPages);
        console.log("////////////////", response.response.data.totalPages);
        if (page === 0) {
          if (response.response.data.content.length === 0) {
            setDataProduct([]);
          } else {
            const newArr = response.response.data.content.map((items: any) => {
              return { ...items, amount: 0 };
            });
            setDataProduct(newArr);
          }
        } else {
          setDataProduct((prevProducts: any) => [
            ...prevProducts,
            ...response.response.data.content?.map((items: any) => {
              return { ...items, amount: 0 };
            }),
          ]);
        }
      } else {
        console.error("Failed to fetch product:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  const handleGetVariantPrice = async (searchValue?: any) => {
    try {
      const parseSort =
        orderStore.sort.length === 0
          ? ""
          : orderStore.sort[0] !== ""
          ? "&sort=" + orderStore.sort[0]
          : "" +
            (orderStore.sort[1] !== "" ? "&sort=" + orderStore.sort[1] : "");

      const response: any = await orderStore.getListOrderVariantPrice(
        page,
        size,
        orderStore.productCategoryId === 0
          ? undefined
          : orderStore.productCategoryId,
        searchValue,
        orderStore.tagId,
        parseSort,
        orderStore.isLoadMore,
        undefined,
        undefined,
        Number(orderStore.dataPriceListSelected.id)
      );
      // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
      if (response && response.kind === "ok") {
        setTotalPagesProduct(response.response.data.totalPages);
        const aMap = new Map(
          orderStore.dataProductAddOrder.map((item) => [item.id, item])
        );
        console.log("////////////////", response.response.data.totalPages);
        if (page === 0) {
          if (response.response.data.content.length === 0) {
            setDataProduct([]);
          } else {
            const newArr = response.response.data.content.map((items: any) => {
              if (items.uomId === items.saleUom?.id) {
                return {
                  ...items,
                  amount: items.minQuantity,
                  isSelect: false,
                  conversionRate: 1,
                  originAmount: items.minQuantity,
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
                  amount: newAmount,
                  isSelect: false,
                  conversionRate: newObject[0].conversionRate,
                  originAmount: Math.ceil(
                    newAmount * newObject[0].conversionRate
                  ),
                };
              }
            });
            const newArr1 = newArr.map((item: any) => {
              if (aMap.has(item.id)) {
                return {
                  ...item,
                  isSelect: true,
                  amount: aMap.get(item.id).amount,
                  price: aMap.get(item.id).price,
                  conversionRate: aMap.get(item.id).conversionRate,
                  saleUom: aMap.get(item.id).saleUom,
                  originAmount: aMap.get(item.id).originAmount,
                  taxValue: aMap.get(item.id).taxValue,
                  VAT: aMap.get(item.id).VAT,
                };
              }
              return item;
            });
            setDataProduct(newArr1);
          }
        } else {
          const newArr = response.response.data.content.map((items: any) => {
            if (items.uomId === items.saleUom?.id) {
              return {
                ...items,
                amount: items.minQuantity,
                isSelect: false,
                conversionRate: 1,
                originAmount: items.minQuantity,
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
                amount: newAmount,
                isSelect: false,
                conversionRate: newObject[0].conversionRate,
                originAmount: Math.ceil(
                  newAmount * newObject[0].conversionRate
                ),
              };
            }
          });
          const newArr1 = newArr.map((item: any) => {
            if (aMap.has(item.id)) {
              return {
                ...item,
                isSelect: true,
                amount: aMap.get(item.id).amount,
                price: aMap.get(item.id).price,
                conversionRate: aMap.get(item.id).conversionRate,
                saleUom: aMap.get(item.id).saleUom,
                originAmount: aMap.get(item.id).originAmount,
                taxValue: aMap.get(item.id).taxValue,
                VAT: aMap.get(item.id).VAT,
              };
            }
            return item;
          });
          setDataProduct((prevProducts: any) => [...prevProducts, ...newArr1]);
        }
      } else {
        console.error("Failed to fetch product:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
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
  const handleAddProduct = async (data: any) => {
    console.log(data);
    const arrProduct = dataProduct.map((items: any) => {
      if (items.id === data.id) {
        return {
          ...items,
          amount: orderStore.checkPriceList === true ? items.minQuantity : 1,
          isSelect: true,
        };
      } else {
        return items;
      }
    });
    setDataProduct(arrProduct);
    if (orderStore.checkPriceList === true) {
      if (data.uomId === data.saleUom?.id) {
        const dataGetPrice = {
          productCategoryId: data.productTemplate.productCategoryId,
          productTemplateId: data.productTemplate.id,
          productId: data.id,
          priceListId: Number(orderStore.dataPriceListSelected.id),
          quantity: data.minQuantity,
        };
        const newPrice = await getPriceVariant(dataGetPrice);
        const newArr1 = {
          ...data,
          amount: data.minQuantity,
          isSelect: true,
          price: newPrice,
        };
        const newArr = orderStore.dataProductAddOrder.concat(newArr1);
        orderStore.setDataProductAddOrder(newArr);
      } else {
        const newObject = data.uomGroup.uomGroupLineItems.filter(
          (item: any) => item.uomId === data.saleUom?.id
        );
        const newAmount = Math.ceil(
          data.minQuantity / newObject[0].conversionRate
        );
        const dataGetPrice = {
          productCategoryId: data.productTemplate.productCategoryId,
          productTemplateId: data.productTemplate.id,
          productId: data.id,
          priceListId: Number(orderStore.dataPriceListSelected.id),
          quantity: newAmount,
        };
        const newPrice = await getPriceVariant(dataGetPrice);
        const newArr1 = {
          ...data,
          amount: newAmount,
          isSelect: true,
          price: newPrice,
        };
        const newArr = orderStore.dataProductAddOrder.concat(newArr1);
        orderStore.setDataProductAddOrder(newArr);
      }
    } else {
      const newArr1 = { ...data, amount: 1, isSelect: true };
      const newArr = orderStore.dataProductAddOrder.concat(newArr1);
      orderStore.setDataProductAddOrder(newArr);
    }
    console.log(orderStore.dataProductAddOrder);
  };

  const handleMinus = (data: any) => {
    if (orderStore.checkPriceList === true) {
      const arrProduct = dataProduct.slice();
      const arrProduct1 = arrProduct.map((items: any) => {
        if (items.id === data.id) {
          const amounts = items.amount - 1;
          if (amounts === items.minQuantity) {
            return { ...items, amount: 0, isSelect: false };
          } else {
            return { ...items, amount: amounts };
          }
        } else {
          return items;
        }
      });
      setDataProduct(arrProduct1);
      const newArr1 = orderStore.dataProductAddOrder.slice();
      const newArr2 = newArr1.map((items: any) => {
        if (items.id === data.id) {
          const amounts = items.amount - 1;
          if (amounts === items.minQuantity) {
            return;
          } else {
            return { ...items, amount: amounts };
          }
        } else {
          return items;
        }
      });
      const newArr3 = newArr2.filter((items) => items !== undefined);
      orderStore.setDataProductAddOrder(newArr3);
      console.log(orderStore.dataProductAddOrder);
    } else {
      const arrProduct = dataProduct.slice();
      const arrProduct1 = arrProduct.map((items: any) => {
        if (items.id === data.id) {
          const amounts = items.amount - 1;
          if (amounts === 0) {
            return { ...items, amount: amounts, isSelect: false };
          } else {
            return { ...items, amount: amounts };
          }
        } else {
          return items;
        }
      });
      setDataProduct(arrProduct1);
      const newArr1 = orderStore.dataProductAddOrder.slice();
      const newArr2 = newArr1.map((items: any) => {
        if (items.id === data.id) {
          const amounts = items.amount - 1;
          if (amounts === 0) {
            return;
          } else {
            return { ...items, amount: amounts };
          }
        } else {
          return items;
        }
      });
      const newArr3 = newArr2.filter((items) => items !== undefined);
      orderStore.setDataProductAddOrder(newArr3);
      console.log(orderStore.dataProductAddOrder);
    }
  };
  const handlePlus = (data: any) => {
    const arrProduct = dataProduct.slice();
    const arrProduct1 = arrProduct.map((items: any) => {
      if (items.id === data.id) {
        return { ...items, amount: items.amount + 1 };
      } else {
        return items;
      }
    });
    setDataProduct(arrProduct1);
    const newArr1 = orderStore.dataProductAddOrder.slice();
    const newArr2 = newArr1.map((items: any) => {
      if (items.id === data.id) {
        return { ...items, amount: items.amount + 1 };
      } else {
        return items;
      }
    });
    orderStore.setDataProductAddOrder(newArr2);
    console.log(orderStore.dataProductAddOrder);
  };
  const handlePressViewProduct = (type: any) => {
    viewProductType(type);
    setPage(0);
    orderStore.setSort([]);
    orderStore.setTagId([]);
  };
  const viewProductType = (type: any) => {
    const viewType = type === "Sản phẩm" ? "VIEW_PRODUCT" : "VIEW_VARIANT";
    setViewProduct(viewType);
    orderStore.setViewProductType(viewType);
  };
  const [isGridView, setIsGridView] = useState(orderStore.viewGrid);
  useEffect(() => {
    if (
      orderStore.checkPriceList === false &&
      orderStore.viewProductType === "VIEW_PRODUCT"
    ) {
      handleGetProduct();
    }
    if (
      orderStore.checkPriceList === false &&
      orderStore.viewProductType === "VIEW_VARIANT"
    ) {
      handleGetVariant();
    }
    if (
      orderStore.checkPriceList === true &&
      orderStore.viewProductType === "VIEW_PRODUCT"
    ) {
      handleGetProductPrice();
    }
    if (
      orderStore.checkPriceList === true &&
      orderStore.viewProductType === "VIEW_VARIANT"
    ) {
      handleGetVariantPrice();
    }
    console.log("moi vao man");
    handleGetCategoryFilter();
  }, []);
  useEffect(() => {
    if (
      orderStore.checkPriceList === false &&
      orderStore.viewProductType === "VIEW_PRODUCT"
    ) {
      handleGetProduct();
    }
    if (
      orderStore.checkPriceList === false &&
      orderStore.viewProductType === "VIEW_VARIANT"
    ) {
      handleGetVariant();
    }
    if (
      orderStore.checkPriceList === true &&
      orderStore.viewProductType === "VIEW_PRODUCT"
    ) {
      handleGetProductPrice();
    }
    if (
      orderStore.checkPriceList === true &&
      orderStore.viewProductType === "VIEW_VARIANT"
    ) {
      handleGetVariantPrice();
    }
    console.log("chon category");
  }, [viewProduct, orderStore.productCategoryId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (
        orderStore.checkPriceList === false &&
        orderStore.viewProductType === "VIEW_PRODUCT"
      ) {
        handleGetProduct();
      }
      if (
        orderStore.checkPriceList === false &&
        orderStore.viewProductType === "VIEW_VARIANT"
      ) {
        handleGetVariant();
      }
      if (
        orderStore.checkPriceList === true &&
        orderStore.viewProductType === "VIEW_PRODUCT"
      ) {
        handleGetProductPrice();
      }
      if (
        orderStore.checkPriceList === true &&
        orderStore.viewProductType === "VIEW_VARIANT"
      ) {
        handleGetVariantPrice();
      }
    });
    console.log("sap xep");
    return unsubscribe;
  }, [navigation, orderStore.sort]);

  const handleEndReached = () => {
    console.log(
      "--------totalPagesProduct---------------",
      totalPagesProduct,
      "----",
      isRefreshing,
      "-----",
      page
    );
    if (
      !isRefreshing &&
      page <= totalPagesProduct - 1 &&
      size * (page + 1) === dataProduct.length
    ) {
      orderStore.setIsLoadMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    const fetchMoreProducts = async () => {
      try {
        if (
          orderStore.checkPriceList === false &&
          orderStore.viewProductType === "VIEW_PRODUCT"
        ) {
          handleGetProduct(searchValue);
        }
        if (
          orderStore.checkPriceList === false &&
          orderStore.viewProductType === "VIEW_VARIANT"
        ) {
          handleGetVariant(searchValue);
        }
        if (
          orderStore.checkPriceList === true &&
          orderStore.viewProductType === "VIEW_PRODUCT"
        ) {
          handleGetProductPrice(searchValue);
        }
        if (
          orderStore.checkPriceList === true &&
          orderStore.viewProductType === "VIEW_VARIANT"
        ) {
          handleGetVariantPrice(searchValue);
        }
      } catch (error) {
        console.error("Error fetching more products:", error);
      } finally {
        orderStore.setIsLoadMore(false);
      }
    };
    console.log("load more");

    if (orderStore.isLoadMore) {
      fetchMoreProducts();
    }
  }, [page]);
  // useEffect(() => {
  //     if (index == 0) {
  //         refreshProduct()
  //     }
  // }, [index])
  const refreshProduct = async () => {
    // setIsRefreshing(true);
    // setSelectedCategory(undefined);
    orderStore.setProductCategoryId(0);
    setPage(0);
    setSearchValue("");
    orderStore.setNameCategory("");
    setDataProduct([]);
    orderStore.setSort([]);
    orderStore.setTagId([]);
    if (
      orderStore.checkPriceList === false &&
      orderStore.viewProductType === "VIEW_PRODUCT"
    ) {
      await handleGetProduct(searchValue);
    }
    if (
      orderStore.checkPriceList === false &&
      orderStore.viewProductType === "VIEW_VARIANT"
    ) {
      await handleGetVariant(searchValue);
    }
    if (
      orderStore.checkPriceList === true &&
      orderStore.viewProductType === "VIEW_PRODUCT"
    ) {
      await handleGetProductPrice(searchValue);
    }
    if (
      orderStore.checkPriceList === true &&
      orderStore.viewProductType === "VIEW_VARIANT"
    ) {
      await handleGetVariantPrice(searchValue);
    }
    console.log("refreshProduct");
    // setIsRefreshing(false);
  };
  const renderFooter = () => {
    if (!isRefreshing) return null;
    return (
      <View>
        <ActivityIndicator size="large" color="#F6961C" />
      </View>
    );
  };
  useEffect(() => {
    orderStore.setViewGrid(isGridView);
  }, [isGridView]);
  const toggleView = () => {
    setIsGridView(!isGridView);
  };
  const handleProductDetail = (idProduct: number) => {
    productStore.setSelectedProductId(idProduct);
    navigation.navigate("selectVariant" as never, {
      productTemplateId: idProduct,
    });
  };
  const handleClassifyDetail = (idProduct: number) => {
    productStore.setSelectedProductId(idProduct);
    navigation.navigate("classifyDetailScreen" as never);
  };
  const [openSearch, setOpenSearch] = useState(true);

  const flatListRef = useRef(null);
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [viewProduct]);
  return (
    <View style={styles.ROOT}>
      <Header
        type={"AntDesign"}
        LeftIcon={Images.back}
        onLeftPress={() => {
          navigation.goBack();
          orderStore.setSort([]);
          orderStore.setProductCategoryId(0);
          orderStore.setNameCategory("");
          orderStore.setTagId([]);
        }}
        colorIcon={colors.text}
        headerTx={"order.order"}
        RightIcon2={Images.vector}
        onRightPress={() => navigation.navigate("filterOrderScreen" as never)}
        onRightPress2={toggleView}
        RightIcon={Images.slider}
        headerInput={openSearch}
        searchValue={searchValue}
        onSearchValueChange={handleSearchValueChange}
        handleOnSubmitSearch={handleSubmitSearch}
        widthRightIcon={20}
        heightRightIcon={20}
        style={{ height: scaleHeight(54) }}
        titleMiddleStyle={styles.titleHeader}
        searchTx={"order.searchCodeName"}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: "#f6f7f9",
          paddingTop: scaleHeight(15),
        }}>
        <>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}>
            <View style={styles.rowTabType}>
              {tabTypes.map((item, index) => {
                const isActive = index === indexItem;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handlePressViewProduct(item);
                      setIndexItem(index);
                    }}
                    key={index}
                    style={[
                      styles.tabButton,
                      isActive
                        ? styles.tabButtonActive
                        : styles.tabButtonInactive,
                    ]}>
                    <Text
                      style={[
                        styles.tabText,
                        isActive
                          ? styles.tabTextActive
                          : styles.tabTextInactive,
                      ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={styles.containerFilter}>
              <TouchableOpacity
                onPress={() => {
                  setShowCategory(true);
                }}
                style={styles.btnFilterByCategory}>
                <Text
                  tx={
                    orderStore.nameCategory === ""
                      ? "productScreen.directory"
                      : null
                  }
                  numberOfLines={1}
                  style={styles.textBtnFilter}>
                  {orderStore.nameCategory}
                </Text>
                <View style={{ marginRight: scaleWidth(8) }}>
                  <Images.iconDownBlue
                    width={scaleWidth(14)}
                    height={scaleHeight(14)}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <CategoryModalFilter
            showCategory={showCategory}
            setShowCategory={setShowCategory}
            dataCategory={dataCategoryFilter}
            selectedCategory={orderStore.productCategoryId}
            setSelectedCategory={orderStore.setProductCategoryId}
            setNameDirectory={orderStore.setNameCategory}
            isSearchBarVisible={openSearch}
            setIndex={setIndex}
          />
          <View style={styles.containerProduct}>
            <FlatList
              data={dataProduct}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={refreshProduct}
                  title="ok"
                />
              }
              keyExtractor={(item) => item.id.toString()}
              ref={flatListRef}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              key={isGridView ? "grid" : "list"}
              numColumns={isGridView ? 3 : 1}
              columnWrapperStyle={isGridView ? null : null}
              renderItem={({ item, index }) => (
                <RenderOrderItem
                  item={item}
                  index={index}
                  isGridView={isGridView}
                  viewProduct={orderStore.viewProductType}
                  handleProductDetail={handleProductDetail}
                  handleClassifyDetail={handleClassifyDetail}
                  handleAddProduct={handleAddProduct}
                  handleMinus={handleMinus}
                  handlePlus={handlePlus}
                />
              )}
            />
          </View>
        </>
      </View>
      {dataProductAddOrder.length !== 0 ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("newOrder" as never)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 8,
            paddingHorizontal: scaleWidth(16),
            paddingVertical: scaleHeight(11),
            marginBottom: scaleHeight(10),
            backgroundColor: colors.palette.navyBlue,
            bottom: Platform.OS === "ios" ? scaleHeight(20) : scaleHeight(5),
            marginHorizontal: scaleWidth(16),
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ marginRight: scaleWidth(10) }}>
              <View
                style={{
                  backgroundColor: "red",
                  alignItems: "center",
                  width: scaleWidth(14),
                  height: scaleHeight(14),
                  borderRadius: 30,
                  position: "absolute",
                  zIndex: 1,
                  right: scaleWidth(1),
                  top: 0,
                }}>
                <Text
                  style={{
                    fontSize: fontSize.size9,
                    fontWeight: "500",
                    color: "#ffffff",
                  }}>
                  {dataProductAddOrder.length}
                </Text>
              </View>
              <Images.ic_shopping
                width={scaleWidth(20)}
                height={scaleHeight(20)}
                style={{ marginRight: 6, marginTop: 2 }}
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: fontSize.size14,
                fontWeight: "600",
              }}>
              Giỏ hàng
            </Text>
          </View>
          <View>
            <Text
              tx="common.continue"
              style={{
                color: "white",
                fontSize: fontSize.size14,
                fontWeight: "600",
              }}
            />
          </View>
        </TouchableOpacity>
      ) : null}
      <Dialog
        isVisible={isDeleteFailModalVisible}
        title={"productScreen.Notification"}
        errorMessage={errorMessage}
        titleBTN2="productScreen.BtnNotificationAccept"
        styleBTN2={{ backgroundColor: "#0078D4", borderRadius: 8 }}
        onPressAccept={() => setIsDeleteFailModalVisible(false)}
      />
    </View>
  );
});
