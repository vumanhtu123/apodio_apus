import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AutoImage,
  Button,
  Header,
  Text,
  TextField,
} from "../../../components";
import { Images } from "../../../../assets";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  colors,
  margin,
  padding,
  scaleHeight,
  scaleWidth,
} from "../../../theme";
import { styles } from "./styles";
import { InputSelect } from "../../../components/input-select/inputSelect";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import { translate } from "../../../i18n";
import moment from "moment";
import CustomCalendar from "../../../components/calendar";
import ItemListProduct from "../components/item-list-product";
import {
  AddressOrder,
  HeaderOrder,
  PriceList,
} from "../components/header-order";
import { ModalPayment } from "../components/modal-payment-method";
import { ModalTaxes } from "../components/modal-taxes-apply";
import { ShowNote } from "../components/note-new-order-component";
import { Order, arrPayment, dataPromotion, methodData } from "./data";
import { useStores } from "../../../models";
import { TaxModel } from "../../../models/order-store/entities/order-tax-model";
import { values } from "mobx";

export const NewOrder: FC = observer(function NewOrder(props) {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const heightScroll =
    Dimensions.get("window").height -
    scaleHeight(120) -
    scaleHeight(52) -
    paddingTop;
  const route = useRoute();
  const { orderStore } = useStores();

  const [arrProduct, setArrProduct] = useState<{}[]>([]);
  const [arrTax, setArrTax] = useState<{}[]>([]);
  const [payment, setPayment] = useState({
    label: translate("order.DOMESTICALLY"),
  });
  const [note, setNote] = useState(false);
  const [desiredDate, setDesiredDate] = useState(false);
  const [isDeposit, setIsDeposit] = useState(false);
  const [isSortByDate, setIsSortByDate] = useState(false);
  const [isReset, setIReset] = useState<boolean>(false);
  const [imagesNote, setImagesNote] = useState<any>([]);
  const [markedDatesS, setMarkedDatesS] = useState("");
  const [markedDatesE, setMarkedDatesE] = useState("");
  const [deposit, setDeposit] = useState<number>(0);
  const [buttonSelect, setButtonSelect] = useState<boolean>(false);
  const [buttonPayment, setButtonPayment] = useState<boolean>(false);
  const [method, setMethod] = useState<number>(0);
  const countRef = useRef("");
  const [arrDataPostTax, setArrDataPostTax] = useState<{}[]>([]);
  const nameTax = useRef("");
  const price = useRef(0);
  const priceSumVAT = useRef(0);
  const priceSum = useRef(0);
  const arrTaxAll = useRef([{ percent: "", amount: "" }]);
  const idItemOrder = useRef(0);
  const address = useRef<{}>();
  const store = useStores();

  address.current = route?.params?.dataAddress;
  console.log("adr", route?.params?.dataAddress);
  console.log("id,", Number(store.orderStore.dataClientSelect.id));

  const getListAddress = async () => {
    if (
      store.orderStore.dataClientSelect.id == undefined ||
      Number(store.orderStore.dataClientSelect.id) == 0
    ) {
      return;
    }
    try {
      const response = await orderStore.getListAddress(
        Number(store.orderStore.dataClientSelect.id)
      );
      orderStore.setReloadAddressScreen(false);
      // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
      if (response && response.kind === "ok") {
        console.log(
          "getListAddress---------------------",
          JSON.stringify(response.response.data)
        );
        const newArr = response.response.data;
        newArr.map((data: any) => {
          if (data.isDefault === true) {
            address.current = data;
          }
          console.log("tuvm address", address.current);
        });
      } else {
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleNamMethod = (): string => {
    switch (countRef.current) {
      case translate("order.CASH"):
        console.log("aaa 1");
        return "CASH";
      case translate("order.BANK_TRANSFER"):
        return "BANK_TRANSFER";
      case translate("order.BANK"):
        return "BANK";
      case translate("order.CREDIT"):
        return "CREDIT";
      case translate("order.DEDUCTION_OF_LIABILITIES"):
        return "DEDUCTION_OF_LIABILITIES";
      default:
        return "";
    }
  };

  const addProduct = () => {
    if (handleNamMethod() == "") {
      return navigation.navigate("paymentBuy", {
        params: { type: true },
      });
    }
    const newArr = arrProduct.map((data: any) => {
      return {
        productId: data.id,
        productInfo: {
          id: data.id,
          name: data.name,
          sku: data.sku,
          upc: data.upc,
          uomId: data.uomId,
          uomCode: data.uomCode,
          uomName: data.uomName,
          productImage: data.productImage,
          productTemplate: {
            id: data.productTemplate.id,
            hasVariant: data.productTemplate.hasVariant,
            sku: data.productTemplate.sku,
            upc: data.productTemplate.upc,
            name: data.productTemplate.name,
            productCategoryId: data.productTemplate.productCategoryId,
            productCategoryName: data.productTemplate.productCategoryName,
            uomId: data.productTemplate.uomId,
            uomName: data.productTemplate.uomName,
            managementForm: data.productTemplate.managementForm,
            isInternal: data.productTemplate.isInternal,
            isMaterial: data.productTemplate.isMaterial,
            isGoods: data.productTemplate.isGoods,
            isSemiFinished: data.productTemplate.isSemiFinished,
            isOEM: data.productTemplate.isOEM,
          },
          quantityInventory: data.quantityInventory,
          minQuantity: data.minQuantity,
          uomGroup: {
            id: data.uomGroup.id,
            code: data.uomGroup.code,
            name: data.uomGroup.name,
            uomOriginId: data.uomGroup.uomOriginId,
            uomOriginName: data.uomGroup.uomOriginName,
            uomGroupLineItems: [
              {
                id: data.uomGroup.uomGroupLineItems.id,
                uomId: data.uomGroup.uomGroupLineItems.uomId,
                uomName: data.uomGroup.uomGroupLineItems.uomName,
                conversionRate: data.uomGroup.uomGroupLineItems.conversionRate,
                accuracy: data.uomGroup.uomGroupLineItems.accuracy,
                uomLineType: data.uomGroup.uomGroupLineItems.uomLineType,
              },
            ],
          },
          baseProductPackingLine: null,
          productPackingLines: [],
          saleUom: {
            id: data.saleUom.id,
            uomId: data.saleUom.uomId,
            uomName: data.saleUom.uomName,
            conversionRate: data.saleUom.conversionRate,
            accuracy: data.saleUom.accuracy,
            uomLineType: data.saleUom.uomLineType,
          },
          brand: null,
          warehouses:
            data.warehouses == undefined
              ? []
              : [
                  {
                    id: data.warehouses.id,
                    name: data.warehouses.name,
                    quantity: data.warehouses.quantity,
                  },
                ],
        },
        quantity: data.originAmount,
        uomId: data.uomId,
        orderQty: data.mount,
        // orderUomId: number, //chon
        unitPrice: data.price, //don gia cua bang gia
        // amountUntaxed: data.price,
        amountTotal: data.amountTotal ?? data.price,
        taxes:
          data.VAT == undefined
            ? null
            : [{ id: data.VAT.value, name: data.VAT.label }],
        // discount: number,
        // discountComputeType: string,
        type: "PRODUCT",
        // note: string,
        isPriceChange: true,
        quantityInventory: data.quantityInventory,
      };
    });
    console.log("data new", JSON.stringify(newArr));
    const order: any = {
      state: "SALE",
      partnerId: store.orderStore.dataClientSelect.id,
      // invoiceAddressId: 0,
      deliveryAddressId: address.current?.id,
      // quotationDate: "",
      // orderDate: "",
      // quoteCreationDate: "",
      // expireHoldDate: "",
      pricelistId: orderStore.dataPriceListSelected.pricelistId ?? null,
      currencyId: orderStore.dataPriceListSelected.currencyId ?? null,
      // paymentTermId: 0,
      // promotionIds: [],
      paymentMethod: handleNamMethod(),
      // salePersonIds: [],
      // saleUserIds: [],
      deliveryType: "SHIP", //
      // warehouseId: 0,
      // commitmentDate: "",
      // deliveryStatus: "",
      // campaignId: 0,
      // discount: 0,
      // discountComputeType: "",
      note: "",
      isOptionPrice: false,
      deliveryPolicy: "FULL_DELIVERY",
      // totalPrice: 0,
      saleOrderLines: newArr,
      // saleOrderLineDeleteIds: [],
      isRetail: false,
      scopeType:
        payment.label == translate("order.DOMESTICALLY")
          ? "DOMESTICALLY"
          : "EXPORTED", //trong nuoc hoac xuat khau
      isMobile: true,
      isPrepayment: false, // boolean thanh toan truoc
      amountPrePayment: "", // so tien gui len
    };
    console.log("done new order: ", JSON.stringify(order));
    store.orderStore.postAddOrderSale(order).then((values) => {
      console.log("success data sale order:", JSON.stringify(values));
    });
  };

  const selectClient = () => {
    props.navigation.navigate("selectClient");
  };

  const toggleModalDate = () => {
    setIsSortByDate(!isSortByDate);
  };

  const handleIncrease = (id: any) => {
    idItemOrder.current = id;
    let newArr = arrProduct!.map((item: any) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    setArrProduct(newArr);
    postTaxLines(newArr);
  };

  const handleAddTaxes = (id: any) => {
    let newArr = arrProduct.map((item: any) => {
      if (item.id === id) {
        return { ...item, addTaxes: (item.addTaxes = !item.addTaxes) };
      }
      return item;
    });
    setArrProduct(newArr);
  };

  const handleBack = () => {
    navigation.goBack();
    orderStore.setDataProductAddOrder([]);
    orderStore.setViewProductType("VIEW_PRODUCT");
    orderStore.setDataClientSelect({
      id: "",
      name: "",
      code: "",
      phoneNumber: "",
    });
    orderStore.setDataPriceListSelect({
      id: "",
      name: "",
      priceListCategory: "",
    });
    orderStore.setCheckPriceList(false);
    orderStore.setViewGrid(true);
  };

  const handleSelectTaxes = (id: any) => {
    idItemOrder.current = id;
    console.log("tuuup", idItemOrder.current);
    setButtonSelect(true);
  };

  const handleDecrease = (id: any) => {
    idItemOrder.current = id;
    let newArr = arrProduct!
      .map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            amount: item.amount - 1,
          };
        }
        return item;
      })
      .filter((item) => item.amount > 0);
    setArrProduct(newArr);
    postTaxLines(newArr);
    console.log("-tuvm", arrProduct);
  };

  const deleteItemProduct = (id: any) => {
    const newArr = arrProduct.filter((item: any) => item.id !== id);
    setArrProduct(newArr);
  };

  const getListTax = async () => {
    const result: TaxModel = await store.orderStore.getListTax(
      "VAT_RATES",
      0,
      20,
      payment.label == translate("order.DOMESTICALLY")
        ? "DOMESTICALLY"
        : "EXPORTED"
    );
    setArrTax(
      result.content.map((item: { name: any; id: any }) => {
        return { label: item.name, value: item.id };
      })
    );
  };

  const postTaxLines = async (data: any) => {
    const newItem = data.filter((item: any) => item.id === idItemOrder.current);
    const valueApi = {
      quantity: newItem[0].amount,
      unitPrice: newItem[0].price,
      discount: 0,
      taxes: [
        {
          id: newItem[0].VAT ? newItem[0].VAT.value : 0,
          name: newItem[0].VAT ? newItem[0].VAT.label : "",
        },
      ],
      importTax: 0,
      specialConsumptionTax: 0,
      environmentalResourceTax: 0,
      vat: 0,
    };
    console.log("tuvm tax 1234", JSON.stringify(arrTaxAll.current));
    await store.orderStore.postTaxLine([valueApi]).then((value: any) => {
      console.log("tuvm tax post", JSON.stringify(value));
      handleTaxes(value, data);
    });
  };

  const handleTaxes = (arrTaxLine: any, data: any) => {
    const newArr = data.map((value: any) => {
      console.log("log b1", arrTaxLine);
      if (value.id === idItemOrder.current) {
        return {
          ...value,
          taxValue: arrTaxLine[0].items[0].amount,
          amountTotal: Number(
            arrTaxLine[0].items[0].amount + Number(value.price)
          ),
        };
      }
      return value;
    });
    handleSumAmountVAT(newArr);
    setArrProduct(newArr);
    console.log("data new tuvm", JSON.stringify(newArr));
  };

  const handleSumAmountVAT = (value: any) => {
    const all = value.reduce((sum: any, item: any) => {
      if (item.taxValue !== undefined) {
        return sum + item.taxValue;
      }
      return;
    }, 0);
    priceSumVAT.current = Number(all) + Number(price.current);
    console.log("cat");
  };

  const selectTexas = () => {
    console.log("select Texas", idItemOrder.current);
    let newArr = arrProduct.map((item: any) => {
      if (item.id === idItemOrder.current) {
        console.log("select :", JSON.stringify(nameTax.current));
        return { ...item, VAT: nameTax.current };
      }
      return item;
    });
    setArrProduct(newArr);
    postTaxLines(newArr);
  };

  const selectProduct = () => {
    orderStore.setDataProductAddOrder(arrProduct.slice());
  };

  const priceAll = (data: any) => {
    const all = data.reduce((sum: any, item: any) => {
      return sum + Number(item.price);
    }, 0);
    price.current = all;
    console.log("sum all: ", all);
  };

  console.log("post add tuvm", JSON.stringify(orderStore.dataProductAddOrder));
  console.log("post add tuvm 2", JSON.stringify(arrProduct));
  console.log(
    "post add tuvm 3",
    JSON.stringify(orderStore.dataPriceListSelected)
  );
  console.log("price scr", Number(price.current));
  console.log("price scr 2", Number(priceSum.current));

  // console.log("data adres", address.current.address);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setArrProduct(orderStore.dataProductAddOrder.slice());
      priceAll(orderStore.dataProductAddOrder.slice());
      getListTax();
      getListAddress();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {}, [arrProduct]);

  return (
    <View style={{ backgroundColor: colors.palette.aliceBlue }}>
      <Header
        LeftIcon={Images.back}
        onLeftPress={() => handleBack()}
        style={{ height: scaleHeight(70) }}
        headerTx={"order.confirm"}
        titleStyle={styles.textTitle}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          bounces={false}
          style={[
            styles.viewScrollVertical,
            {
              height:
                isDeposit === true
                  ? heightScroll - scaleHeight(64)
                  : heightScroll,
            },
          ]}>
          <HeaderOrder
            openDialog={function (): void {
              selectClient();
            }}
            data={store.orderStore.dataClientSelect}
          />
          <AddressOrder
            onPressAddress={() =>
              navigation.navigate([
                "deliveryAddress",
                {
                  dataAddress: dataAddress,
                },
              ] as never)
            }
            data={address.current}
          />
          <PriceList
            id={Number(orderStore.dataPriceListSelected.id) ?? null}
            name={orderStore.dataPriceListSelected.name ?? null}
            priceListCategory={
              orderStore.dataPriceListSelected.priceListCategory
            }
            currencyId={Number(orderStore.dataPriceListSelected.currencyId)}
            pricelistId={Number(orderStore.dataPriceListSelected.pricelistId)}
          />
          <InputSelect
            styleView={{
              backgroundColor: "white",
              paddingHorizontal: 16,
              paddingVertical: 8,
              marginVertical: 15,
            }}
            required={true}
            hintTx={"order.selectPayment"}
            titleTx={"order.paymentMethods"}
            arrData={arrPayment}
            onPressChoice={(item: any) => {
              setPayment(item);
              getListTax();
            }}
            dataDefault={payment.label}
          />
          <View style={styles.viewListProduct}>
            <Button
              style={styles.buttonListProduct}
              onPress={() => {
                navigation.navigate("addProductOrder" as never);
                selectProduct();
              }}>
              <Images.icon_add />
              <Text
                tx={"order.addProduct"}
                style={styles.textButtonListProduct}
              />
            </Button>
            <FlatList
              data={arrProduct}
              scrollEnabled={false}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item, index }: any) => {
                console.log("item list", item);
                return (
                  <View>
                    <ItemListProduct
                      onPressAddTexas={() => handleAddTaxes(item.id)}
                      onPressSelectTexas={() => handleSelectTaxes(item.id)}
                      sumTexas={item.sumTexas}
                      VAT={item.VAT?.label ?? undefined}
                      valueVAT={item.taxValue}
                      name={item.name}
                      unit={item.uomName}
                      images={item.images}
                      cost={item.price}
                      qty={item.amount}
                      onPressPlus={() => handleIncrease(item.id)}
                      onPressMinus={() => handleDecrease(item.id)}
                      onPress={() => deleteItemProduct(item.id)}
                      addTaxes={item.addTaxes ?? false}
                    />
                    {index !== arrProduct.length - 1 ? (
                      <View
                        style={{
                          height: scaleHeight(1),
                          backgroundColor: colors.palette.ghostWhite,
                        }}
                      />
                    ) : null}
                  </View>
                );
              }}
            />
          </View>
          {arrProduct.length > 0 ? (
            <SumMoney
              sumNoVat={price.current}
              sumVat={priceSumVAT.current}
              arrVat={arrProduct}
            />
          ) : (
            <View style={{ marginTop: 15 }}></View>
          )}
          <TouchableOpacity
            onPress={() => {
              setButtonPayment(true);
            }}>
            <View
              style={{
                flexDirection: "row",
                borderRadius: 8,
                backgroundColor: "white",
                paddingHorizontal: 16,
                paddingVertical: 15,
                justifyContent: "space-between",
              }}>
              <Text
                tx="order.method_pay"
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#242424",
                }}></Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  text={countRef.current.toString()}
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: "#242424",
                    marginRight: 6,
                  }}></Text>
                <Images.icon_caretRight2 />
              </View>
            </View>
          </TouchableOpacity>

          <ShowNote
            note={note}
            setNoteData={function (note: String, arr: []): void {
              console.log("note---------", note);
              console.log("arr---------", arr);
            }}
          />
          {desiredDate === true ? (
            <View
              style={{
                flexDirection: "row",
                marginVertical: 15,
                alignItems: "center",
              }}>
              <TouchableOpacity onPress={() => setDesiredDate(false)}>
                <Images.icon_deleteDolphin />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsSortByDate(true)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: scaleWidth(margin.margin_8),
                }}>
                <Images.icon_calendar />
                <Text
                  style={[
                    styles.textDate,
                    { marginHorizontal: scaleWidth(margin.margin_4) },
                  ]}>
                  {translate("order.desiredDate") +
                    ": " +
                    moment(
                      markedDatesS === "" ? new Date() : markedDatesS
                    ).format("MMMM DD, YYYY")}
                </Text>
                <Images.icon_caretDownBlue />
              </TouchableOpacity>
            </View>
          ) : null}
          <Text
            tx={"order.moreInformation"}
            style={[
              styles.textTotal,
              {
                color: colors.palette.neutral900,
                marginVertical: 15,
              },
            ]}
          />
          <View style={styles.viewMoreInformation}>
            <Images.icon_gear
              style={{ marginRight: scaleWidth(margin.margin_4) }}
            />
            {note === false || isDeposit === false || desiredDate === false ? (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {note === false ? (
                  <Button
                    tx={"order.note"}
                    onPress={() => setNote(true)}
                    style={styles.buttonFeature}
                    textStyle={[
                      styles.textVoucher,
                      { color: colors.palette.navyBlue },
                    ]}
                  />
                ) : null}
                {isDeposit === false ? (
                  <Button
                    tx={"order.deposit"}
                    onPress={() => {
                      setIsDeposit(true);
                      navigation.navigate("paymentBuy", {
                        params: { type: true },
                      });
                    }}
                    style={styles.buttonFeature}
                    textStyle={[
                      styles.textVoucher,
                      { color: colors.palette.navyBlue },
                    ]}
                  />
                ) : null}
                {desiredDate === false ? (
                  <Button
                    tx={"order.desiredDate"}
                    onPress={() => setDesiredDate(true)}
                    style={styles.buttonFeature}
                    textStyle={[
                      styles.textVoucher,
                      { color: colors.palette.navyBlue },
                    ]}
                  />
                ) : null}
              </ScrollView>
            ) : (
              <Text tx={"order.noMoreInformation"} style={styles.textVoucher} />
            )}
          </View>
          {/* <View style={styles.viewVoucher}>
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.textVoucher, { flex: 1 }]}>
                {translate("order.total") +
                  " " +
                  arrProduct.length +
                  " " +
                  translate("order.product")}
              </Text>
              <Text
                style={[styles.textVoucher, { color: colors.palette.nero }]}>
                84000000
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("promotion" as any)}
              style={{
                flexDirection: "row",
                marginTop: scaleHeight(margin.margin_20),
              }}>
              <Images.icon_tag height={16} width={16} />
              <Text
                style={[
                  styles.textVoucher,
                  {
                    flex: 1,
                    marginLeft: scaleWidth(margin.margin_6),
                  },
                ]}
                tx={"order.applyPromoHint"}
              />
              <Images.icon_caretRight2 height={16} width={16} />
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
      <View
        style={[
          styles.viewButtonOrder,
          {
            top:
              isDeposit === true
                ? Dimensions.get("window").height - scaleHeight(184)
                : Dimensions.get("window").height - scaleHeight(120),
          },
        ]}>
        <View
          style={{
            flexDirection: "row",
            paddingTop: scaleHeight(padding.padding_20),
            paddingBottom: scaleHeight(padding.padding_12),
          }}>
          <Text tx={"order.sum"} style={[styles.textTotal, { flex: 1 }]} />
          <Text style={isDeposit === true ? styles.textTotal : styles.textCost}>
            {/* {isNaN(priceSumVAT.current)
              ? Number(priceSumVAT.current)
              : price.current} */}
            {Number(price.current)}
          </Text>
        </View>
        {isDeposit === true ? (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: scaleHeight(padding.padding_12),
              justifyContent: "space-between",
            }}>
            <View style={{ flexDirection: "row" }}>
              <Text tx={"order.prepayment"} style={[styles.textTotal]} />
              <Text
                tx="order.contrast"
                style={{
                  color: "#747475",
                  fontSize: 12,
                  fontWeight: "400",
                }}></Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTotal}>{deposit}</Text>
              <TouchableOpacity>
                <Images.icon_edit
                  style={{ marginLeft: scaleWidth(margin.margin_6) }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {isDeposit === true ? (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: scaleHeight(padding.padding_12),
            }}>
            <Text
              tx={"order.stillInDebt"}
              style={[styles.textTotal, { flex: 1 }]}
            />
            <Text
              style={[styles.textCost, { color: colors.palette.radicalRed }]}>
              84000000000
            </Text>
          </View>
        ) : null}
        <Button
          onPress={() => {
            addProduct();
          }}
          tx={"order.order"}
          style={styles.buttonOrder}
          textStyle={styles.textButtonOrder}
        />
      </View>
      <CustomCalendar
        isReset={isReset}
        handleReset={() => setIReset(!isReset)}
        handleShort={() => {
          // handleOrderMerchant()
          toggleModalDate();
        }}
        onMarkedDatesChangeS={(markedDatesS: any) => {
          setMarkedDatesS(markedDatesS);
        }}
        onMarkedDatesChangeE={(markedDatesE: any) => {
          setMarkedDatesE(markedDatesE);
        }}
        isShowTabs={false}
        isSortByDate={isSortByDate}
        isOneDate={true}
        toggleModalDate={toggleModalDate}
      />
      <ModalPayment
        isVisible={buttonPayment}
        closeDialog={function (): void {
          setButtonPayment(false);
        }}
        arrData={methodData}
        method={method}
        setMethod={function (item: number, name: string): void {
          setMethod(item);
          countRef.current = name;
          console.log("tuvm2", countRef);
          handleNamMethod();
        }}
        debt={{
          isHaveDebtLimit: store.orderStore.dataDebtLimit.isHaveDebtLimit,
          debtAmount: store.orderStore.dataDebtLimit.debtLimit,
        }}
      />
      <ModalTaxes
        arrName={function (name: any): void {
          nameTax.current = name;
          selectTexas();
          setButtonSelect(false);
          console.log("tuvm09", nameTax);
        }}
        arrTaxes={arrTax}
        isVisible={buttonSelect}
        closeDialog={function (): void {
          setButtonSelect(false);
        }}
        arrEditName={nameTax}
      />
    </View>
  );
});
interface DataSumMoney {
  arrVat: any;
  sumNoVat: number;
  sumVat: number;
}

const SumMoney = (props: DataSumMoney) => {
  var sumValue;
  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        borderRadius: 8,
        backgroundColor: "white",
        justifyContent: "space-between",
        marginVertical: 15,
      }}>
      <View style={{ flexDirection: "column" }}>
        <Text
          tx="order.sum_no_texas"
          style={{ fontSize: 10, fontWeight: "400", color: "#747475" }}></Text>
        {props.arrVat != null
          ? props.arrVat.map((data: any) => {
              return data.VAT != undefined ? (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: "#747475",
                    marginTop: 8,
                  }}>
                  {data?.VAT?.label ?? null}
                </Text>
              ) : null;
            })
          : null}
        <Text
          tx="order.sum_yes_texas"
          style={{
            fontSize: 10,
            fontWeight: "400",
            color: "#747475",
            marginTop: 8,
          }}></Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
        <Text style={{ fontSize: 10, fontWeight: "400", color: "#747475" }}>
          {(isNaN(props.sumNoVat) ? 0 : props.sumNoVat) ?? 0}
        </Text>
        {props.arrVat != undefined
          ? props.arrVat.map((data: any) => {
              if (data.taxValue !== undefined) {
                sumValue = Number(data.taxValue) + Number(props.sumNoVat);
                console.log("tutu", data.taxValue, props.sumNoVat);
              }
              return data.taxValue != undefined ? (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    color: "#747475",
                    marginTop: 8,
                  }}>
                  {data?.taxValue ?? null}
                </Text>
              ) : null;
            })
          : null}
        <Text
          style={{
            fontSize: 12,
            fontWeight: "600",
            color: "#FF4956",
            marginTop: 8,
          }}>
          {(isNaN(props.sumVat) ? sumValue : props.sumVat) ?? 0}
        </Text>
      </View>
    </View>
  );
};
