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
    id: 2,
    label: translate("order.BANK"),
  },
  {
    id: 4,
    label: translate("order.DEDUCTION_OF_LIABILITIES"),
  },
];
export const advanceMethodData = [
  {
    id: 0,
    label: translate("order.CASH"),
  },
  // {
    // id: 1,
    // label: translate("order.BANK_TRANSFER"),
  // },
  // {
  //   id: 2,
  //   label: translate("order.BANK"),
  // },
  // {
    // id: 3,
    // label: translate("order.CREDIT"),
  // },
  {
    id: 4,
    label: translate("order.EXCEPT_FOR_LIABILITIES"),
  },
];

export interface ProductTemplate {
  id: number;
  hasVariant: boolean;
  sku: string;
  upc: string;
  name: string;
  productCategoryId: number;
  productCategoryName: string;
  uomId: number;
  uomName: string;
  managementForm: string;
  isInternal: boolean;
  isMaterial: boolean;
  isGoods: boolean;
  isSemiFinished: boolean;
  isOEM: boolean;
}

export interface UomGroupLineItem {
  id: number;
  uomId: number;
  uomName: string;
  conversionRate: number;
  accuracy: number;
  uomLineType: string;
}

export interface UomGroup {
  id: number;
  code: string;
  name: string;
  uomOriginId: number;
  uomOriginName: string;
  uomGroupLineItems: UomGroupLineItem[];
}

export interface BaseProductPackingLine {
  id: number;
  uomId: number;
  uomName: string;
  uomGroupLineId: number;
  productId: number;
  amount: number;
  uomLineType: string;
  length: number;
  high: number;
  wide: number;
  weight: number;
  volume: number;
}

export interface ProductPackingLine {
  id: number;
  uomId: number;
  uomName: string;
  uomGroupLineId: number;
  productId: number;
  amount: number;
  uomLineType: string;
  length: number;
  high: number;
  wide: number;
  weight: number;
  volume: number;
}

export interface SaleUom {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Warehouse {
  id: number;
  name: string;
  quantity: number;
}

export interface ProductInfo {
  id: number;
  name: string;
  sku: string;
  upc: string;
  uomId: number;
  uomCode: string;
  uomName: string;
  productImage: string[];
  productTemplate: ProductTemplate;
  quantityInventory: number;
  minQuantity: number;
  uomGroup: UomGroup;
  baseProductPackingLine: BaseProductPackingLine;
  productPackingLines: ProductPackingLine[];
  saleUom: SaleUom;
  brand: Brand;
  warehouses: Warehouse[];
}

export interface Tax {
  id: number;
  name: string;
}

export interface SaleOrderLine {
  id: number;
  productId: number;
  productInfo: ProductInfo;
  quantity: number;
  uomId: number;
  orderQty: number;
  orderUomId: number;
  unitPrice: number;
  amountUntaxed: number;
  amountTotal: number;
  taxes: Tax[];
  discount: number;
  discountComputeType: string;
  type: string;
  note: string;
  isPriceChange: boolean;
  quantityInventory: number;
}

export interface Order {
  id: number;
  code: string;
  state: string;
  partnerId: number;
  invoiceAddressId: number;
  deliveryAddressId: number;
  quotationDate: string;
  orderDate: string;
  quoteCreationDate: string;
  expireHoldDate: string;
  pricelistId: number;
  currencyId: number;
  paymentTermId: number;
  promotionIds: number[];
  paymentMethod: string;
  salePersonIds: number[];
  saleUserIds: number[];
  deliveryType: string;
  warehouseId: number;
  commitmentDate: string;
  deliveryStatus: string;
  campaignId: number;
  discount: number;
  discountComputeType: string;
  note: string;
  isOptionPrice: boolean;
  deliveryPolicy: string;
  totalPrice: number;
  saleOrderLines: any;
  saleOrderLineDeleteIds: number[];
  isRetail: boolean;
  scopeType: string;
  isMobile: boolean;
}
