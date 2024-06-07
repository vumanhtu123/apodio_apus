import { translate } from "../../../i18n";

export const dataPromotion = [
  {
    percent: "VAT 10%",
    amount: "2.000.000",
  },
  {
    percent: "VAT 5%",
    amount: "2.000.000",
  },
  {
    percent: "VAT 9%",
    amount: "2.000.000",
  },
];

export const arrPayment = [
  {
    id: 0,
    label: translate("order.DOMESTICALLY"),
  },
  {
    id: 1,
    label: translate("order.EXPORTED"),
  },
];

export const arrProducts = [
  {
    images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
    name: "Gạch 1566CB503 60x60 wrw asfsada ads",
    unit: "Hop",
    qty: 1,
    cost: "28.000.000",
    price: "28.000.000",
    id: 1,
    VAT: "10%",
    valueVAT: "2.000.000đ",
    sumTexas: "30.000.000đ",
    addTaxes: false,
    selectTexas: false,
  },
  {
    images: "https://th.bing.com/th/id/OIG.ey_KYrwhZnirAkSgDhmg",
    name: "Gạch 1566CB503 60x60",
    unit: "Hop",
    qty: 2,
    cost: "28.000.000",
    price: "28.000.000",
    id: 2,
    VAT: "12%",
    valueVAT: "2.500.000đ",
    sumTexas: "30.000.000đ",
    addTaxes: true,
    selectTexas: false,
  },
];
export const methodData = [
  {
    id: 0,
    label: translate("order.CASH"),
  },
  {
    id: 1,
    label: translate("order.BANK_TRANSFER"),
  },
  {
    id: 2,
    label: translate("order.BANK"),
  },
  {
    id: 3,
    label: translate("order.CREDIT"),
  },
  {
    id: 4,
    label: translate("order.DEDUCTION_OF_LIABILITIES"),
  },
];
