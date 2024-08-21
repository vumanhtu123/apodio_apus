import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import {
  Button,
  Header,
  Text,
} from "../../../../components";
import { Svgs } from "../../../../../assets/svgs";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  colors,
  padding,
  scaleHeight,
} from "../../../theme";
import { styles } from "./styles";
import { InputSelect } from "../../../../components/input-select/inputSelect";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { translate } from "../../../../i18n";
import moment from "moment";
import ItemListProduct from "../components/item-list-product";
import {
  AddressOrder,
  ChangePayment,
  HeaderOrder,
  PriceList,
  SumMoney,
} from "../components/header-order";
import { ModalTaxes } from "../components/modal-taxes-apply";
import { arrPayment, methodData } from "./data";
import { useStores } from "../../../models";
import { TaxModel } from "../../../models/order-store/entities/order-tax-model";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
} from "../../../../components/dialog-notification";
import { BottomOrder } from "../components/bottomOrder";
import { MoreInformation } from "../components/moreInfomation";

export const NewAndEditOrder: FC = observer(function NewAndEditOrder(
  props: any
) {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const heightScroll =
    Dimensions.get("window").height -
    scaleHeight(120) -
    scaleHeight(52) -
    paddingTop;
  const route = useRoute();
  const { orderStore, vendorStore } = useStores();
  const { newData, screen }: any = route?.params;

  const [arrProduct, setArrProduct] = useState<{}[]>([]);
  const [arrTax, setArrTax] = useState<{}[]>([]);
  const [payment, setPayment] = useState({
    label: translate("order.DOMESTICALLY"),
  });
  const [note, setNote] = useState(false);
  const [desiredDate, setDesiredDate] = useState(false);
  const [isDeposit, setIsDeposit] = useState(false);
  const [buttonSelect, setButtonSelect] = useState<boolean>(false);
  const countRef = useRef(translate("order.CASH"));
  const nameTax = useRef("");
  // const price = useRef(0);
  const [price, setPrice] = useState(0);
  const [priceNoVat, setPriceNoVat] = useState(0);
  const priceSumVAT = useRef(0);
  const priceSumAll = useRef(0);
  const arrTaxAll = useRef([{ percent: "", amount: "" }]);
  const idItemOrder = useRef(0);
  const store = useStores();
  const discount = useRef(0);
  const imageNote = useRef([])
  const { goBackPayment }: any = route?.params || {};
  const valueNote = useRef("");
  const valueDate = useRef('')

  const handleNamMethod = (): string => {
    switch (countRef.current) {
      case translate("order.CASH"):
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

  const handleNamPreMethod = (): string => {
    switch (orderStore.dataDebtPayment.methodPayment) {
      case translate("order.money_face"):
        return "CASH";
      // case translate("order.BANK_TRANSFER"):
      //   return "BANK_TRANSFER";
      // case translate("order.BANK"):
      //   return "BANK";
      // case translate("order.CREDIT"):
      //   return "CREDIT";
      case translate("order.EXCEPT_FOR_LIABILITIES"):
        return "DEDUCTION_OF_LIABILITIES";
      default:
        return "";
    }
  };

  const addProduct = () => {
    if (store.orderStore.dataClientSelect.id === '') {
      return Dialog.show({
        type: ALERT_TYPE.INFO,
        title: translate("productScreen.Notification"),
        textBody: translate("productScreen.youNeedSelectedClient"),
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          Dialog.hide();
        },
      });
    }
    if (orderStore.dataAddress.id === 0) {
      return Dialog.show({
        type: ALERT_TYPE.INFO,
        title: translate("productScreen.Notification"),
        textBody: translate("productScreen.youNeedEnterAddressShip"),
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          Dialog.hide();
        },
      });
    }
    if (arrProduct.length === 0) {
      return Dialog.show({
        type: ALERT_TYPE.INFO,
        title: translate("productScreen.Notification"),
        textBody: translate("productScreen.youNeedSelectedProduct"),
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          Dialog.hide();
        },
      });
    }
    if (handleNamMethod() == "") {
      return Dialog.show({
        type: ALERT_TYPE.INFO,
        title: translate("productScreen.Notification"),
        textBody: translate("productScreen.youNeedSelectedPaymentMethods"),
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          Dialog.hide();
        },
      });
    }
    if (
      handleNamMethod() == "DEDUCTION_OF_LIABILITIES" &&
      Number(price) - Number(orderStore.dataDebtPayment.inputPrice) >
      Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
        Number(store.orderStore.dataDebtLimit.amountOwed ?? 0)))
    ) {
      return navigation.navigate({
        name: "paymentBuy", params: {
          params: {
            type: false,
            price: price,
            warning: true,
            debtAmount:
              handleNamMethod() == "DEDUCTION_OF_LIABILITIES"
                ? Number(Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
                  Number(store.orderStore.dataDebtLimit.amountOwed ?? 0))))
                : null,
          },
        }
      } as never);
    }

    const newArr = arrProduct.map((data: any) => {
      return {
        id: screen === "copy" ? null : data.lineId,
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
        quantity: data.amount,
        uomId: data.uomId,
        orderQty: data.amount,
        unitPrice: data.unitPrice, //don gia cua bang gia
        amountTotal: data.amountTotal ?? data.price,
        taxes:
          data.VAT == undefined
            ? null
            : [{ id: data.VAT.value, name: data.VAT.label }],
        discount: data.taxesInput ?? 0, // nhập chiết khấu
        type: "PRODUCT",
        isPriceChange: true,
        quantityInventory: data.quantityInventory,
      };
    });
    const newArr1 = arrProduct.map((item: any) => {
      return item.id;
    });
    const newArr2 = newData.saleOrderLines?.map((item: any) => {
      return item.productId;
    });
    const newArr3 = newArr2.filter((item: any) => !newArr1.includes(item));
    const formattedDate = moment(valueDate.current).endOf("day").toISOString();

    console.log("data new", JSON.stringify(newArr));
    const order: any = {
      id: screen === "copy" ? null : newData.id,
      state: "SALE",
      partnerId: store.orderStore.dataClientSelect.id,
      code: screen === "copy" ? null : newData.code,
      deliveryAddressId: orderStore.dataAddress.id,
      commitmentDate: formattedDate,
      pricelistId: orderStore.dataPriceListSelected.id ?? null,
      currencyId: vendorStore.companyInfo.currencyId,
      paymentMethod: handleNamMethod(),
      paymentMethodPrepayment:
        handleNamPreMethod() !== "" ? handleNamPreMethod() : handleNamMethod(),
      deliveryType: "SHIP",
      discountComputeType: "FIXED",
      note: valueNote.current,
      noteImages: imageNote.current,
      isOptionPrice: orderStore.dataPriceListSelected.id === "" ? false : true,
      deliveryPolicy: "FULL_DELIVERY",
      saleOrderLines: newArr,
      saleOrderLineDeleteIds: screen === "copy" ? [] : newArr3,
      isClearingDebts: orderStore.clearingDebt, //co dung doi tru cong no hay ko
      isRetail: false,
      scopeType:
        payment.label == translate("order.DOMESTICALLY")
          ? "DOMESTICALLY"
          : "EXPORTED", //trong nuoc hoac xuat khau
      isMobile: true,
      isPrepayment:
        handleNamPreMethod() !== "" && orderStore.clearingDebt === false
          ? true
          : false, // boolean thanh toan truoc
      isPayment: handleNamPreMethod() === "" ? true : false,
      amountPrePayment:
        handleNamPreMethod() === ""
          ? Number(price)
          : orderStore.clearingDebt == false
            ? Number(orderStore.dataDebtPayment.inputPrice)
            : 0, // so tien gui len
      amountClearings:
        orderStore.clearingDebt == true
          ? Number(orderStore.dataDebtPayment.inputPrice)
          : 0,
    };
    console.log("done new order: ", JSON.stringify(order));
    store.orderStore.postAddOrderSale(order).then((values) => {
      console.log("success data sale order:", JSON.stringify(values));
      if (values.id !== undefined) {
        navigation.navigate({
          name: "orderSuccess", params: {
            idOrder: values.id,
            code: screen == 'edit' ? newData.code : values.code,
            screen: screen === "copy" ? "create" : "edit",
            price: price,
            inputPrice: orderStore.dataDebtPayment.inputPrice,
            paymentMethod: handleNamMethod() === "DEDUCTION_OF_LIABILITIES" ? true : false
          }
        } as never);
        orderStore.setDataProductAddOrder([]);
        setArrProduct([]);
        handleBack();
      } else {
        const v = values?.map((data: any) => {
          return data.message;
        });
        Dialog.show({
          type: ALERT_TYPE.INFO,
          title: translate("productScreen.Notification"),
          textBody: v[0],
          button2: translate("productScreen.BtnNotificationAccept"),
          closeOnOverlayTap: false,
          onPressButton: () => {
            Dialog.hide();
          },
        });
      }
    });
  };

  const selectClient = () => {
    props.navigation.navigate("selectClient");
  };

  const onPressAddress = () => {
    if (orderStore.dataClientSelect.id === "") {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "",
        textBody: translate("txtToats.noClient"),
      });
    } else {
      navigation.navigate("deliveryAddress" as never);
    }
  };

  const handleIncrease = (id: any) => {
    idItemOrder.current = id;
    let newArr = arrProduct!.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          amount: item.amount + 1,
          price: Number(item.unitPrice ?? 0) * Number(item.amount + 1),
        };
      }
      return item;
    });
    setArrProduct(newArr);
    postTaxLines(newArr);
    priceAll(newArr);
    if (isDeposit === true) {
      handleDebt();
    }
  };

  const handleInputTaxes = (id: any, text: any) => {
    if (Number(text) <= 0) {
      return Dialog.show({
        type: ALERT_TYPE.INFO,
        title: translate("productScreen.Notification"),
        textBody: translate("productScreen.discountMustBeGreaterThan0"),
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          Dialog.hide();
        },
      });
    }
    let newArr = arrProduct!.map((item: any) => {
      if (item.id === id) {
        return { ...item, taxesInput: Number(text), addInputTaxes: false };
      }
      return item;
    });
    setArrProduct(newArr);
    postTaxLines(newArr);
    if (isDeposit === true) {
      handleDebt();
    }
  };

  const handleAddTaxes = (id: any) => {
    let newArr = arrProduct.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          addTaxes: (item.addTaxes = !item.addTaxes),
          taxesInput: 0,
        };
      }
      return item;
    });
    setArrProduct(newArr);
  };

  const selectInputPrice = (id: any) => {
    let newArr = arrProduct.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          addPrice: (item.addPrice = !item.addPrice),
        };
      }
      return item;
    });
    setArrProduct(newArr);
  };
  const selectInputTaxes = (id: any) => {
    let newArr = arrProduct.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          addInputTaxes: true,
        };
      }
      return item;
    });
    setArrProduct(newArr);
  };

  const handleInputPrice = (id: any, text: any) => {
    let newArr = arrProduct.map((item: any) => {
      if (item.id === id) {
        return {
          ...item,
          unitPrice: Number(text),
          price: Number(text) * Number(item.amount),
        };
      }
      return item;
    });
    setArrProduct(newArr);
    postTaxLines(newArr);
  };

  const handleBack = () => {
    orderStore.reset()
    setArrProduct([]);
    setPayment({ label: translate("order.DOMESTICALLY") });
    setNote(false);
  }

  const handleSelectTaxes = (id: any) => {
    idItemOrder.current = id;
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
            price: Number(item.unitPrice ?? 0) * Number(item.amount - 1),
          };
        }
        return item;
      })
      .filter((item) => item.amount > 0);
    setArrProduct(newArr);
    postTaxLines(newArr);
    priceAll(newArr);
    if (isDeposit === true) {
      handleDebt();
    }
  };

  const deleteItemProduct = (id: any) => {
    const newArr = arrProduct.filter((item: any) => item.id !== id);
    setArrProduct(newArr);
  };

  const getListTax = async () => {
    const result = await store.orderStore.getListTax(
      "VAT_RATES",
      0,
      20,
      "SALE"
    );
    setArrTax(
      result.content.map((item: { name: any; id: any }) => {
        return { label: item.name, value: item.id };
      })
    );
  };
  useEffect(() => {
    getListTax();
  }, [payment]);

  const postTaxLines = async (data: any) => {
    const newItem = data.filter((item: any) => item.id === idItemOrder.current);
    const valueApi = {
      quantity: newItem[0].amount,
      unitPrice: newItem[0].unitPrice,
      discount: newItem[0].taxesInput ?? 0,
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
    await store.orderStore.postTaxLine([valueApi]).then((value: any) => {
      handleTaxes(value, data);
    });
  };

  const handleTaxes = (arrTaxLine: any, data: any) => {
    const newArr = data.map((value: any) => {
      if (value.id === idItemOrder.current) {
        return {
          ...value,
          taxValue: arrTaxLine[0].items[0].amount,
          amountTotal: Number(
            arrTaxLine[0].items[0].amount
            // + Number(value.price)
          ),
        };
      }
      return value;
    });
    handleSumAmountVAT(newArr);
    setArrProduct(newArr);
  };

  const handleSumAmountVAT = (value: any) => {
    const all = value?.reduce((sum: any, item: any) => {
      if (item.taxValue !== undefined) {
        return sum + item.taxValue;
      }
      return;
    }, 0);
    priceSumVAT.current = Number(all) + Number(price);
  };

  const selectTexas = () => {
    let newArr = arrProduct.map((item: any) => {
      if (item.id === idItemOrder.current) {
        return { ...item, VAT: nameTax.current };
      }
      return item;
    });
    setArrProduct(newArr);
    postTaxLines(newArr);
    if (isDeposit === true) {
      handleDebt();
    }
  };

  const handleDebt = () => {
    arrProduct.map((data: any) => {
      const price = Number(data.amount) * Number(data.unitPrice);
      const discountPrice = price - (Number(discount) / 100) * price;
      if (data.taxValue !== undefined) {
        return (priceSumAll.current = Number(data.taxValue) + discountPrice);
      } else {
        return discountPrice;
      }
    });
  };

  const selectProduct = () => {
    orderStore.setDataProductAddOrder(arrProduct.slice());
  };

  const priceAll = (data: any) => {
    const all = data?.reduce((sum: any, item: any) => {
      return (
        sum +
        (Number(item.unitPrice ?? 0) * Number(item.amount ?? 0) -
          (Number(item.taxesInput ?? 0) / 100) *
          (Number(item.unitPrice ?? 0) * Number(item.amount ?? 0)) +
          Number(item.taxValue ?? 0))
      );
    }, 0);
    const allNoVat = data?.reduce((sum: any, item: any) => {
      return sum + Number(item.unitPrice ?? 0) * Number(item.amount ?? 0);
    }, 0);
    setPrice(all);
    setPriceNoVat(allNoVat);
  };

  const getDebtLimit = (id: number) => {
    if (orderStore.dataClientSelect !== null) {
      orderStore.getDebtLimit(id).then((data: any) => {
        orderStore.setDataDebtLimit(data);
      });
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (orderStore.checkRenderList === true) {
        if (newData.isOptionPrice === true) {
          orderStore.setDataPriceListSelect({
            pricelistId: newData.priceList.id,
            name: newData.priceList.name,
            priceListCategory: "",
            currencyId: newData.currencyId !== null ? newData.currencyId : null,
            id: newData.priceList.id,
          });
        }
        orderStore.setCheckPriceList(newData.isOptionPrice);
        const newArr = newData.saleOrderLines?.map((items: any) => {
          return {
            ...items?.productInfo,
            amount: items?.quantity,
            originAmount: items?.orderQty,
            priceTotal: items?.amountTotal,
            unitPrice: items?.unitPrice,
            VAT:
              items?.taxLines?.items.length === 0
                ? undefined
                : {
                  value: items?.taxLines?.items[0]?.taxId,
                  label: items?.taxLines?.items[0]?.taxName,
                },
            taxValue: items?.taxLines?.items[0]?.amount,
            taxesInput: items.discount,
            addInputTaxes: items.discount !== 0 ? false : true,
            addTaxes: items.discount !== 0 ? true : false,
            lineId: screen === "edit" ? items.id : null,
          };
        });
        priceAll(newArr);
        handleSumAmountVAT(newArr);
        setArrProduct(newArr);
        orderStore.setDataClientSelect({
          id: newData.partner.id,
          code: newData.partner.code,
          name: newData.partner.name,
          phoneNumber: newData.partner.phoneNumber,
        });
        if (newData.commitmentDate !== "" && newData.commitmentDate !== null) {
          setDesiredDate(true);
          const appTimeZone = moment.tz.guess()
          const date1 = moment(newData.commitmentDate).subtract(1, 'seconds').set({ millisecond: 999 })
          valueDate.current = moment(date1).tz(appTimeZone).format("YYYY-MM-DD")
        }
        getDebtLimit(newData.partner.id);
        setPayment({
          label:
            newData.scopeTypes === "DOMESTICALLY"
              ? translate("order.DOMESTICALLY")
              : translate("order.EXPORTED"),
        });
        if ((newData.note !== '' && newData.note !== null) || (newData.noteImages?.length !== 0 && newData.noteImages !== null)) {
          setNote(true);
        }
        valueNote.current = newData.note;
        imageNote.current = newData.noteImages
        orderStore.setCheckRenderList(false);

        if (newData.isClearingDebts === true && screen === 'edit') {
          setIsDeposit(true)
          orderStore.setClearingDebt(true)
          orderStore.setMethodPayment({
            sumAll: newData.totalPrice ?? 0,
            methodPayment: translate("order.EXCEPT_FOR_LIABILITIES"),
            debt: 0,
            inputPrice: newData.amountClearings,
            apply: true,
          })
        }
        if (newData.isPrepayment === true && screen === 'edit') {
          setIsDeposit(true)
          orderStore.setClearingDebt(false)
          orderStore.setMethodPayment({
            sumAll: newData.totalPrice ?? 0,
            methodPayment: translate("order.money_face"),
            debt: 0,
            inputPrice: newData.amountPrePayment,
            apply: true,
          })
        }
        if (newData.isPrepayment === false && newData.isClearingDebts === false && screen === 'edit') {
          setIsDeposit(false)
          orderStore.setClearingDebt(false)
          orderStore.setMethodPayment({
            sumAll: newData.totalPrice ?? 0,
            methodPayment: '',
            debt: 0,
            inputPrice: 0,
            apply: false,
          })
        }
        if (screen === "edit") {
          switch (newData.paymentMethod) {
            case "CASH":
              return (countRef.current = translate("order.CASH"));
            case "BANK_TRANSFER":
              return (countRef.current = translate("order.BANK_TRANSFER"));
            case "BANK":
              return (countRef.current = translate("order.BANK"));
            case "CREDIT":
              return (countRef.current = translate("order.CREDIT"));
            case "DEDUCTION_OF_LIABILITIES":
              return (countRef.current = translate(
                "order.DEDUCTION_OF_LIABILITIES"
              ));
            default:
              return "";
          }
        }
        // setIsDeposit(true)
      } else {
        setArrProduct(orderStore.dataProductAddOrder.slice());
        getListTax();
        setIsDeposit(orderStore.dataDebtPayment.apply);
        if (
          Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
            Number(store.orderStore.dataDebtLimit.amountOwed ?? 0))) ===
          0
        ) {
          // setMethod(0);
          // setButtonPayment(false);
          countRef.current = translate("order.CASH");
          handleNamMethod();
        }
        if (orderStore.dataProductAddOrder.length !== 0) {
          priceAll(orderStore.dataProductAddOrder)
        }
      }
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    priceAll(arrProduct);
  }, [arrProduct]);

  return (
    <View style={{ backgroundColor: colors.palette.aliceBlue }}>
      <Header
        LeftIcon={Svgs.back}
        onLeftPress={() => {
          handleBack();
          navigation.goBack();
        }}
        style={{ height: scaleHeight(70) }}
        headerTx={screen === "copy" ? "order.confirm" : "order.editOrder"}
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
            disabled={screen === "edit" ? true : false}
            data={store.orderStore.dataClientSelect}
          />
          <AddressOrder
            onPressAddress={() => onPressAddress()}
            // data={address}
            addressIdDefault={newData.deliveryAddressId}
            addressDefault={newData.deliveryAddress}
          />
          <PriceList
            id={Number(orderStore.dataPriceListSelected.id) ?? null}
            name={orderStore.dataPriceListSelected.name ?? null}
            priceListCategory={
              orderStore.dataPriceListSelected.priceListCategory
            }
            disabled={screen === "edit" ? true : false}
            currencyId={Number(orderStore.dataPriceListSelected.currencyId)}
            pricelistId={Number(orderStore.dataPriceListSelected.pricelistId)}
          />
          <InputSelect
            styleView={{
              backgroundColor: "white",
              paddingHorizontal: padding.padding_16,
              paddingVertical: padding.padding_8,
              marginVertical: padding.padding_15,
            }}
            disabled={screen === "edit" ? true : false}
            required={true}
            hintTx={"order.selectPayment"}
            titleTx={"order.paymentMethods"}
            arrData={arrPayment}
            onPressChoice={(item: any) => {
              setPayment(item);
              // getListTax();
            }}
            dataDefault={payment.label}
          />
          <View style={styles.viewListProduct}>
            {screen === "edit" ? null : (
              <Button
                style={styles.buttonListProduct}
                disabled={screen === "edit" ? true : false}
                onPress={() => {
                  navigation.navigate("addProductOrder" as never);
                  selectProduct();
                }}>
                <Svgs.icon_add />
                <Text
                  tx={"order.addProduct"}
                  style={styles.textButtonListProduct}
                />
              </Button>
            )}
            <FlatList
              data={arrProduct}
              scrollEnabled={false}
              keyExtractor={(item: any) => item.id}
              renderItem={({ item, index }: any) => {
                console.log("item list", item);
                return (
                  <View>
                    <ItemListProduct
                      disabled={screen === "edit" ? true : false}
                      onPressAddTexas={() => handleAddTaxes(item.id)}
                      onPressSelectTexas={() => {
                        console.log("check validate", item.price);
                        item.unitPrice === undefined || item.unitPrice === 0
                          ? Dialog.show({
                            type: ALERT_TYPE.INFO,
                            title: translate("productScreen.Notification"),
                            textBody: "productScreen.youNeedEnterPriceBeforeSelectTax",
                            button2: translate(
                              "productScreen.BtnNotificationAccept"
                            ),
                            closeOnOverlayTap: false,
                            onPressButton: () => {
                              // navigation.goBack();
                              Dialog.hide();
                            },
                          })
                          : handleSelectTaxes(item.id);
                      }}
                      isEdit={screen}
                      taxesInput={item.taxesInput}
                      editTaxes={item.addInputTaxes}
                      sumTexas={item.sumTexas}
                      VAT={item.VAT?.label ?? undefined}
                      valueVAT={item.taxValue}
                      name={item.name}
                      unit={item.uomName}
                      id={item.id}
                      // images={item.productImage}
                      images={item.images}
                      cost={item.unitPrice}
                      qty={item.amount}
                      onPressPlus={() => handleIncrease(item.id)}
                      onPressMinus={() => handleDecrease(item.id)}
                      onPress={() => deleteItemProduct(item.id)}
                      addTaxes={item.addTaxes ?? false}
                      priceList={
                        orderStore.dataPriceListSelected.id !== ""
                          ? false
                          : true
                      }
                      editDiscount={() => {
                        selectInputTaxes(item.id);
                      }}
                      inputDiscount={(text: any) =>
                        handleInputTaxes(item.id, text)
                      }
                      textDiscount={item.taxesInput}
                      handleUpdatePrice={function ({ }: {}): void {
                        selectInputPrice(item.id);
                      }}
                      selectUpdate={item.addPrice}
                      inputPrice={function (textInput: any): void {
                        handleInputPrice(item.id, textInput);
                      }}
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
              sumNoVat={priceNoVat}
              sumVat={priceSumVAT.current}
              arrVat={arrProduct}
              discount={discount.current}
            />
          ) : (
            <View style={{ marginTop: 15 }}></View>
          )}
          <ChangePayment
          onChangeData={(data)=>{
            console.log(data)
            countRef.current = data.name
            setIsDeposit(false)
          }}
          defaultPayment={countRef.current}
          screen={screen}
          handleNamMethod={handleNamMethod()}
          price={price}
          />
          <MoreInformation
            price={price}
            handleDebt={() => handleDebt()}
            handleNamMethod={handleNamMethod()}
            note={note}
            isDeposit={isDeposit}
            desiredDate={desiredDate}
            addDataNote={(note, arr) => {
              valueNote.current = note
              imageNote.current = arr
            }}
            onChangeDate={(date) => valueDate.current = date}
            onChangeIsDeposit={()=>setIsDeposit(true)}
            valueNote={valueNote.current}
            imageNote={imageNote.current}
            valueDate={valueDate.current}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomOrder
        isDeposit={isDeposit}
        price={price}
        handleNamMethod={handleNamMethod()}
        onPressButton={() => addProduct()}
        screen={screen}
      />
      <ModalTaxes
        arrName={function (name: any): void {
          nameTax.current = name;
          selectTexas();
          setButtonSelect(false);
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
