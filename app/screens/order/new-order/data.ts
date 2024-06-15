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

// export const newObjects: {
//   id: 0;
//   code: "string";
//   state: "string";
//   partnerId: 0;
//   invoiceAddressId: 0;
//   deliveryAddressId: 0;
//   quotationDate: "2024-06-14T08:48:32.516Z";
//   orderDate: "2024-06-14T08:48:32.516Z";
//   quoteCreationDate: "2024-06-14T08:48:32.516Z";
//   expireHoldDate: "2024-06-14T08:48:32.516Z";
//   pricelistId: 0;
//   currencyId: 0;
//   paymentTermId: 0;
//   promotionIds: [0];
//   paymentMethod: "string";
//   salePersonIds: [0];
//   saleUserIds: [0];
//   deliveryType: "string";
//   warehouseId: 0;
//   commitmentDate: "2024-06-14";
//   deliveryStatus: "string";
//   campaignId: 0;
//   discount: 0;
//   discountComputeType: "string";
//   note: "string";
//   isOptionPrice: true;
//   deliveryPolicy: "string";
//   totalPrice: 0;
//   saleOrderLines: [
//     {
//       id: 0;
//       productId: 0;
//       productInfo: {
//         id: 0;
//         name: "string";
//         sku: "string";
//         upc: "string";
//         uomId: 0;
//         uomCode: "string";
//         uomName: "string";
//         productImage: ["string"];
//         productTemplate: {
//           id: 0;
//           hasVariant: true;
//           sku: "string";
//           upc: "string";
//           name: "string";
//           productCategoryId: 0;
//           productCategoryName: "string";
//           uomId: 0;
//           uomName: "string";
//           managementForm: "string";
//           isInternal: true;
//           isMaterial: true;
//           isGoods: true;
//           isSemiFinished: true;
//           isOEM: true;
//         };
//         quantityInventory: 0;
//         minQuantity: 0;
//         uomGroup: {
//           id: 0;
//           code: "string";
//           name: "string";
//           uomOriginId: 0;
//           uomOriginName: "string";
//           uomGroupLineItems: [
//             {
//               id: 0;
//               uomId: 0;
//               uomName: "string";
//               conversionRate: 0;
//               accuracy: 0;
//               uomLineType: "string";
//             }
//           ];
//         };
//         baseProductPackingLine: {
//           id: 0;
//           uomId: 0;
//           uomName: "string";
//           uomGroupLineId: 0;
//           productId: 0;
//           amount: 0;
//           uomLineType: "string";
//           length: 0;
//           high: 0;
//           wide: 0;
//           weight: 0;
//           volume: 0;
//         };
//         productPackingLines: [
//           {
//             id: 0;
//             uomId: 0;
//             uomName: "string";
//             uomGroupLineId: 0;
//             productId: 0;
//             amount: 0;
//             uomLineType: "string";
//             length: 0;
//             high: 0;
//             wide: 0;
//             weight: 0;
//             volume: 0;
//           }
//         ];
//         saleUom: {
//           id: 0;
//           name: "string";
//         };
//         brand: {
//           id: 0;
//           name: "string";
//         };
//         warehouses: [
//           {
//             id: 0;
//             name: "string";
//             quantity: 0;
//           }
//         ];
//       };
//       quantity: 0;
//       uomId: 0;
//       orderQty: 0;
//       orderUomId: 0;
//       unitPrice: 0;
//       amountUntaxed: 0;
//       amountTotal: 0;
//       taxes: [
//         {
//           id: 0;
//           name: "string";
//         }
//       ];
//       discount: 0;
//       discountComputeType: "string";
//       type: "string";
//       note: "string";
//       isPriceChange: true;
//       quantityInventory: 0;
//     }
//   ];
//   saleOrderLineDeleteIds: [0];
//   isRetail: true;
//   scopeType: "string";
// } = {};

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
  saleOrderLines: SaleOrderLine[];
  saleOrderLineDeleteIds: number[];
  isRetail: boolean;
  scopeType: string;
}
