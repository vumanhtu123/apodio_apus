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
  SumMoney,
} from "../components/header-order";
import { ModalPayment } from "../components/modal-payment-method";
import { ModalTaxes } from "../components/modal-taxes-apply";
import { ShowNote } from "../components/note-new-order-component";
import { Order, arrPayment, dataPromotion, methodData } from "./data";
import { useStores } from "../../../models";
import { TaxModel } from "../../../models/order-store/entities/order-tax-model";
import { values } from "mobx";
import {
  ALERT_TYPE,
  Dialog,
  Toast,
} from "../../../components/dialog-notification";
import { commasToDots, formatCurrency, formatVND } from "../../../utils/validate";

export const NewOrder: FC = observer(function NewOrder(props: any) {
  const navigation = useNavigation();
  const paddingTop = useSafeAreaInsets().top;
  const heightScroll =
    Dimensions.get("window").height -
    scaleHeight(120) -
    scaleHeight(52) -
    paddingTop;
  const route = useRoute();
  const { orderStore, vendorStore } = useStores();
  console.log("props", orderStore.dataDebtPayment.sumAll);

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
  const [buttonSelect, setButtonSelect] = useState<boolean>(false);
  const [buttonPayment, setButtonPayment] = useState<boolean>(false);
  const [method, setMethod] = useState<number>(0);
  const [address, setAddress] = useState(orderStore.dataAddress);
  const [editTaxes, setEditTaxes] = useState(false);
  const countRef = useRef(translate("order.CASH"));
  const nameTax = useRef("");
  // const price = useRef(0);
  const [price, setPrice] = useState(0);
  const [priceNoVat, setPriceNoVat] = useState(0);
  const priceSumVAT = useRef(0);
  const priceSumAll = useRef(0);
  const arrTaxAll = useRef([{ percent: "", amount: "" }]);
  const idItemOrder = useRef(0);
  const valueNote = useRef("");
  const store = useStores();
  const discount = useRef(0);
  const { goBackPayment }: any = route?.params || {};

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
      orderStore.setCheckIdPartner(false);
      // console.log('mm------------------' , JSON.stringify(response.response.data.content) )
      if (response && response.kind === "ok") {
        console.log(
          "getListAddress---------------------",
          JSON.stringify(response.response.data)
        );
        const newArr = response.response.data;
        const newData = newArr.filter((item: any) => item.isDefault === true);
        if (newData.length !== 0) {
          orderStore.setDataAddress(newData[0]);
          setAddress(newData[0]);
        } else {
          setAddress({
            id: 0,
            partnerId: 0,
            phoneNumber: "",
            addressType: "",
            country: { id: 0, name: "" },
            region: { id: 0, name: "" },
            city: { id: 0, name: "" },
            district: { id: 0, name: "" },
            ward: { id: 0, name: "" },
            address: "",
            isDefault: false,
          });
          orderStore.setDataAddress({
            id: 0,
            partnerId: 0,
            phoneNumber: "",
            addressType: "",
            country: { id: 0, name: "" },
            region: { id: 0, name: "" },
            city: { id: 0, name: "" },
            district: { id: 0, name: "" },
            ward: { id: 0, name: "" },
            address: "",
            isDefault: false,
          });
        }
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
        textBody: "Bạn cần chọn khách hàng",
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          Dialog.hide();
        },
      });
    }
    if (address.id === 0) {
      return Dialog.show({
        type: ALERT_TYPE.INFO,
        title: translate("productScreen.Notification"),
        textBody: "Bạn cần nhập địa chỉ giao hàng",
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
        textBody: "Bạn cần chọn sản phẩm",
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
        textBody: "Bạn cần chọn phương thức thanh toán",
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          Dialog.hide();
        },
      });
    }
    if (
      handleNamMethod() == "DEDUCTION_OF_LIABILITIES" &&
      Number(price) -
      Number((orderStore.dataDebtPayment.inputPrice)) >
      Number(Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
        Number(store.orderStore.dataDebtLimit.amountOwed ?? 0))))
    ) {
      // orderStore.setMethodPayment({
      //   sumAll: 0,
      //   methodPayment: 0,
      //   debt: 0,
      //   inputPrice: 0,
      //   apply: false,
      // });
      return navigation.navigate({name: "paymentBuy", params: {
        params: {
          type: handleNamMethod() == "DEDUCTION_OF_LIABILITIES"
            ? false
            : true,
          warning: true,
          price: price,
          debtAmount:
            handleNamMethod() == "DEDUCTION_OF_LIABILITIES"
              ? Number(Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
                Number(store.orderStore.dataDebtLimit.amountOwed ?? 0))))
              : null,
        },
      }} as never);
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
        quantity: data.amount,
        uomId: data.uomId,
        orderQty: data.amount,
        // orderUomId: number, //chon
        unitPrice: data.unitPrice, //don gia cua bang gia
        // amountUntaxed: data.price,
        amountTotal: data.amountTotal ?? data.price,
        taxes:
          data.VAT == undefined
            ? null
            : [{ id: data.VAT.value, name: data.VAT.label }],
        discount: data.taxesInput ?? 0, // nhập chiết khấu
        // discountComputeType: string,
        type: "PRODUCT",
        // note: valueNote.current,
        isPriceChange: true,
        quantityInventory: data.quantityInventory,
      };
    });
    console.log("data new", JSON.stringify(newArr));
    const formattedDate = moment.utc(markedDatesS).endOf("day").toISOString();
    const order: any = {
      state: "SALE",
      partnerId: store.orderStore.dataClientSelect.id,
      // invoiceAddressId: 0,
      deliveryAddressId: address.id,
      // quotationDate: "",
      orderDate: formattedDate,
      // quoteCreationDate: "",
      // expireHoldDate: "",
      pricelistId: orderStore.dataPriceListSelected.id ?? null,
      currencyId: vendorStore.companyInfo.currencyId,
      // paymentTermId: 0,
      // promotionIds: [],
      paymentMethod: handleNamMethod(),
      paymentMethodPrepayment:
        handleNamPreMethod() !== "" ? handleNamPreMethod() : handleNamMethod(),
      // salePersonIds: [],
      // saleUserIds: [],
      deliveryType: "SHIP", //
      // warehouseId: 0,
      // commitmentDate: "",
      // deliveryStatus: "",
      // campaignId: 0,
      // discount: 0, //chiet khau
      discountComputeType: "FIXED",
      note: valueNote.current,
      isOptionPrice: orderStore.dataPriceListSelected.id === "" ? false : true,
      deliveryPolicy: "FULL_DELIVERY",
      // totalPrice: 0,
      saleOrderLines: newArr,
      // saleOrderLineDeleteIds: [],
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
        console.log("success data sale order:", JSON.stringify(values));
        // Dialog.show({
        //   type: ALERT_TYPE.INFO,
        //   title: translate("productScreen.Notification"),
        //   textBody: "Thành Công " + values.id,
        //   button2: translate("productScreen.BtnNotificationAccept"),
        //   closeOnOverlayTap: false,
        //   onPressButton: () => {
        //     Dialog.hide();
        //   },
        // });
        navigation.navigate({name: "orderSuccess" , params:  {
          idOrder: values.id,
          code: values.code,
          screen: "create",
          price: price,
          inputPrice: Number(orderStore.dataDebtPayment.inputPrice),
        }}as never);
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

  const toggleModalDate = () => {
    setIsSortByDate(!isSortByDate);
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
        textBody: "Chiết khấu phải lớn hơn 0",
        button2: translate("productScreen.BtnNotificationAccept"),
        closeOnOverlayTap: false,
        onPressButton: () => {
          Dialog.hide();
        },
      });
    }
    console.log("input taxes", text);
    let newArr = arrProduct!.map((item: any) => {
      if (item.id === id) {
        return { ...item, taxesInput: Number(text), addInputTaxes: false };
      }
      return item;
    });
    setArrProduct(newArr);
    // discountAll(newArr);
    postTaxLines(newArr);
    // setEditTaxes(false)
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
          addInputTaxes: true,
          taxesInput: item.taxesInput ?? 0,
        };
      }
      return item;
    });
    // setEditTaxes(false)
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
          addPrice: false,
        };
      }
      return item;
    });
    console.log(newArr, "log=====");
    setArrProduct(newArr);
    postTaxLines(newArr);
  };

  const handleBack = () => {
    orderStore.setDataAddress({
      id: 0,
      partnerId: 0,
      phoneNumber: "",
      addressType: "",
      country: { id: 0, name: "" },
      region: { id: 0, name: "" },
      city: { id: 0, name: "" },
      district: { id: 0, name: "" },
      ward: { id: 0, name: "" },
      address: "",
      isDefault: false,
    });
    orderStore.setDataDebtLimit({
      isHaveDebtLimit: false,
      debtAmount: 0,
      amountOwed: 0,
    });
    orderStore.setMethodPayment({
      sumAll: 0,
      methodPayment: '',
      debt: 0,
      inputPrice: 0,
      apply: false,
    });
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
    orderStore.setClearingDebt(false);
    orderStore.setCheckIdPartner(false);
    orderStore.setCheckRenderList(false);
    orderStore.setDataPriceListSelect({
      id: "",
      name: "",
      priceListCategory: "",
      currencyId: "",
      pricelistId: "",
    });
    setArrProduct([]);
    setPayment({
      label: translate("order.DOMESTICALLY"),
    });
    setNote(false);
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
    console.log("-tuvm", newArr);
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
    console.log("log data 12345", valueApi);
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
            arrTaxLine[0].items[0].amount
            // + Number(value.price)
          ),
        };
      }
      return value;
    });
    console.log("zxxzczxcx", newArr);
    handleSumAmountVAT(newArr);
    setArrProduct(newArr);
    console.log("data new tuvm", JSON.stringify(newArr));
  };

  const handleSumAmountVAT = (value: any) => {
    const all = value.reduce((sum: any, item: any) => {
      if (item.taxValue !== undefined) {
        console.log("cats", sum, item.taxValue);
        return sum + item.taxValue;
      }
      return;
    }, 0);
    priceSumVAT.current = Number(all) + Number(price);
    console.log("cat", all);
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
    if (isDeposit === true) {
      handleDebt();
    }
  };

  const handleDebt = () => {
    arrProduct.map((data: any) => {
      const price = Number(data.amount) * Number(data.unitPrice);
      const discountPrice = price - (Number(discount) / 100) * price;
      if (data.taxValue !== undefined) {
        console.log("tutu", data.taxValue);
        return (priceSumAll.current = Number(data.taxValue) + discountPrice);
      } else {
        console.log("tutuiii", data.taxValue);
        return discountPrice;
      }
    });
  };

  console.log("---------arrProduct--------", JSON.stringify(arrProduct));
  const selectProduct = () => {
    orderStore.setDataProductAddOrder(arrProduct.slice());
  };

  const priceAll = (data: any) => {
    console.log("data first", data);
    const all = data.reduce((sum: any, item: any) => {
      return (
        sum +
        (Number(item.unitPrice ?? 0) * Number(item.amount ?? 0) -
          (Number(item.taxesInput ?? 0) / 100) *
          (Number(item.unitPrice ?? 0) * Number(item.amount ?? 0)) +
          Number(item.taxValue ?? 0))
      );
    }, 0);
    const allNoVat = data.reduce((sum: any, item: any) => {
      return sum + Number(item.unitPrice ?? 0) * Number(item.amount ?? 0);
    }, 0);
    setPrice(all);
    setPriceNoVat(allNoVat);
    console.log("sum all: ", all);
  };

  const discountAll = (data: any) => {
    console.log("test discount", data);
    const all = data.reduce((sum: any, item: any) => {
      if (item.taxesInput !== undefined) {
        return sum + Number(item.taxesInput ?? 0);
      }
      return sum;
    }, 0);
    discount.current = all;
    console.log("discount all: ", discount.current);
  };

  // console.log("post add tuvm", JSON.stringify(orderStore.dataProductAddOrder));
  // console.log("post add tuvm 2", JSON.stringify(arrProduct));
  // console.log(
  //   "post add tuvm 3",
  //   JSON.stringify(store.orderStore.dataDebtLimit)
  // );
  // console.log("price scr", Number(price));
  // console.log("price scr 2", orderStore.dataDebtPayment);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log(
        "arrProduct------1----",
        JSON.stringify(orderStore.dataProductAddOrder)
      );
      setArrProduct(orderStore.dataProductAddOrder.slice());
      getListTax();
      if (
        orderStore.dataAddress.id === 0 ||
        orderStore.checkIdPartner === true
      ) {
        getListAddress();
      }
      setAddress(orderStore.dataAddress);
      // getListAddress();
      setIsDeposit(orderStore.dataDebtPayment.apply);
      if (
        Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
          Number(store.orderStore.dataDebtLimit.amountOwed ?? 0))) ===
        0
      ) {
        setMethod(0);
        setButtonPayment(false);
        countRef.current = translate("order.CASH");
        handleNamMethod();
      }
      if (orderStore.dataProductAddOrder.length !== 0) {
        priceAll(orderStore.dataProductAddOrder)
      }

    });
    return unsubscribe;
  }, [navigation]);
  console.log(vendorStore.companyInfo)

  useEffect(() => {
    priceAll(arrProduct);
  }, [arrProduct]);

  return (
    <View style={{ backgroundColor: colors.palette.aliceBlue }}>
      <Header
        LeftIcon={Images.back}
        onLeftPress={() => {
          handleBack();
          navigation.goBack();
        }}
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
            onPressAddress={() => onPressAddress()}
            data={address}
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
              orderStore.clearTaxValueAndTaxesInput();
              setArrProduct(orderStore.dataProductAddOrder.slice());
              // getListTax();
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
                      onPressSelectTexas={() => {
                        console.log("check validate", item.price);
                        item.unitPrice === undefined || item.unitPrice === 0
                          ? Dialog.show({
                            type: ALERT_TYPE.INFO,
                            title: translate("productScreen.Notification"),
                            textBody: "Bạn cần nhập giá trước khi chọn thuế",
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
                alignItems: "center",
              }}>
              <Text
                tx="order.method_pay"
                style={{
                  fontSize: 10,
                  fontWeight: "400",
                  color: "#242424",
                }}></Text>
              <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
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
                {countRef.current.toString() ===
                  translate("order.DEDUCTION_OF_LIABILITIES") ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      tx="order.available_limit"
                      style={{
                        fontWeight: "400",
                        fontSize: 10,
                        color: "#747475",
                        alignContent: "center",
                      }}></Text>
                    <Text
                      style={{
                        fontSize: 10,
                        fontWeight: "400",
                        color:
                          Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
                            Number(
                              store.orderStore.dataDebtLimit.amountOwed ?? 0
                            ))) >
                            Number(price)
                            ? "#00CC6A"
                            : "#FF0000",
                      }}>
                      {formatVND(formatCurrency(Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
                        Number(
                          store.orderStore.dataDebtLimit.amountOwed ?? 0
                        ))))) ?? 0}
                      <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 10,
                          color: "#747475",
                          alignContent: "center",
                        }}>
                        )
                      </Text>
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>

          <ShowNote
            note={note}
            setNoteData={function (note: string, arr: []): void {
              valueNote.current = note;
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
                      if (handleNamMethod() == "") {
                        return Dialog.show({
                          type: ALERT_TYPE.INFO,
                          title: translate("productScreen.Notification"),
                          textBody: "Bạn cần chọn phương thức thanh toán",
                          button2: translate(
                            "productScreen.BtnNotificationAccept"
                          ),
                          closeOnOverlayTap: false,
                          onPressButton: () => {
                            Dialog.hide();
                          },
                        });
                      }
                      // orderStore.setMethodPayment({
                      //   sumAll: 0,
                      //   methodPayment: 0,
                      //   debt: 0,
                      //   inputPrice: 0,
                      //   apply: false,
                      // });
                      handleDebt();
                      navigation.navigate({ name: "paymentBuy", params: {
                        params: {
                          type:
                            handleNamMethod() == "DEDUCTION_OF_LIABILITIES"
                              ? false
                              : true,
                          price: price,
                          warning: false,
                          debtAmount:
                            handleNamMethod() == "DEDUCTION_OF_LIABILITIES"
                              ? Number(Math.max(0, (Number(
                                store.orderStore.dataDebtLimit.debtAmount
                              ) -
                                Number(
                                  store.orderStore.dataDebtLimit.amountOwed ?? 0
                                ))))
                              : 0,
                        },
                      }} as never);
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
            {formatVND(formatCurrency(commasToDots(Number(price))))}
          </Text>
        </View>
        {isDeposit === true && orderStore.dataDebtPayment.apply ? (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: scaleHeight(padding.padding_12),
              justifyContent: "space-between",
            }}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <Text tx={"order.prepayment"} style={[styles.textTotal]} />
              <Text
                text={"(" + orderStore.dataDebtPayment.methodPayment + ")"}
                style={{
                  color: "#747475",
                  fontSize: 12,
                  fontWeight: "400",
                }}>
                {formatVND(formatCurrency(
                  commasToDots(Number(orderStore.dataDebtPayment.sumAll))
                ))}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.textTotal}>
                {formatVND(formatCurrency(
                  commasToDots(Number(orderStore.dataDebtPayment.inputPrice))
                ))}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  // orderStore.setMethodPayment({
                  //   sumAll: 0,
                  //   methodPayment: 0,
                  //   debt: 0,
                  //   inputPrice: 0,
                  //   apply: false,
                  // });
                  return navigation.navigate({name: "paymentBuy", params: {
                    params: {
                      type:
                        handleNamMethod() == "DEDUCTION_OF_LIABILITIES"
                          ? false
                          : true,
                      price: price,
                      warning: false,
                      debtAmount:
                        handleNamMethod() == "DEDUCTION_OF_LIABILITIES"
                          ? Number(Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
                            Number(
                              store.orderStore.dataDebtLimit.amountOwed ?? 0
                            ))))
                          : null,
                    },
                  }} as never);
                }}>
                <Images.icon_edit
                  style={{ marginLeft: scaleWidth(margin.margin_6) }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {isDeposit === true && orderStore.dataDebtPayment.apply && handleNamMethod() === "DEDUCTION_OF_LIABILITIES" ? (
          <View
            style={{
              flexDirection: "row",
              paddingBottom: scaleHeight(padding.padding_12),
            }}>
            <Text
              tx={"order.usedDebt"}
              style={[styles.textTotal, { flex: 1 }]}
            />
            <Text
              style={[styles.textCost, { color: colors.palette.radicalRed }]}>
              {formatVND(formatCurrency(
                commasToDots(
                  Number(price ?? 0) -
                  Number(orderStore.dataDebtPayment.inputPrice ?? 0)
                ))
              )}
            </Text>
          </View>
        ) : null}
        {isDeposit === true && orderStore.dataDebtPayment.apply ? (
          handleNamMethod() === "DEDUCTION_OF_LIABILITIES" ?
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
                {Number(price ?? 0) - Number(orderStore.dataDebtPayment.inputPrice ?? 0) > 
                Number(store.orderStore.dataDebtLimit.debtAmount) - Number( store.orderStore.dataDebtLimit.amountOwed ?? 0)
                  ? formatVND(formatCurrency(
                    commasToDots(
                      (Number(price ?? 0) - Number(orderStore.dataDebtPayment.inputPrice ?? 0)) - 
                      (Number(store.orderStore.dataDebtLimit.debtAmount) - Number( store.orderStore.dataDebtLimit.amountOwed ?? 0))
                    ))
                  ): 0
                  }
              </Text>
            </View>
            :
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
                {formatVND(formatCurrency(
                  commasToDots(
                    Number(price ?? 0) -
                    Number(orderStore.dataDebtPayment.inputPrice ?? 0)
                  ))
                )}
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
        minDate={new Date()}
      />
      <ModalPayment
        isVisible={buttonPayment}
        isPayment={true}
        closeDialog={function (): void {
          setButtonPayment(false);
        }}
        onSave={() => {
          // if (countRef.current !== translate("order.DEDUCTION_OF_LIABILITIES")) {
          //   console.log('12312312312312')
          orderStore.setMethodPayment({
            sumAll: 0,
            methodPayment: '',
            debt: 0,
            inputPrice: 0,
            apply: false,
          });
          setIsDeposit(false)
          // }
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
          debtAmount:
            Math.max(0, (Number(store.orderStore.dataDebtLimit.debtAmount) -
              Number(store.orderStore.dataDebtLimit.amountOwed ?? 0))),
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
