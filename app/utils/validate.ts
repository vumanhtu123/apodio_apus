import { el } from "date-fns/locale";
import { colors } from "../theme";
import moment from "moment";
import numeral from "numeral";
import "numeral/locales/vi";
import { FieldErrors, FieldValues } from "react-hook-form";
import { Platform } from "react-native";

// const ValidateJS = require("validate.js")
export function isFormValid(error: FieldErrors<FieldValues>, ...fields: any[]) {
  // Kiểm tra xem tất cả các trường có giá trị không rỗng
  const allFieldsFilled = fields.every(
    (field) => field !== undefined && field !== ""
  );

  const noErrors = Object.keys(error).length === 0;

  return allFieldsFilled && noErrors;
}

export const phoneNumberPattern = /^0[0-9]{9}$/;
export const patternPassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[,.!@#\/$&*~"|:]).{8,}$/;
export const patternvalidateBiCard = /^[a-zA-Z0-9]{0,17}$/;
export const patternvalidateID = /^[a-zA-Z0-9]{0,17}$/;
export const patternvalidatePassPost = /^[a-zA-Z0-9]{0,17}$/;
export const parternValidateSku = /^[A-Z0-9_]*$/;
export const validatePhoneStartsWith = (value: string) => {
  if (value.length == 8 && (value.startsWith("75") || value.startsWith("76"))) {
    return true;
  } else if (value.length == 11 && value.startsWith("670")) {
    return true;
  }
  return false;
};

export const showDate = (item: any, index: number, data: any[]) => {
  const current = item;
  let previous;
  if (index === 0) {
    return true;
  } else {
    previous = data[index - 1];
  }
  const currentDate = moment(current.createdDate).format("MM/DD/YYYY");
  const previousDate = moment(previous.createdDate).format("MM/DD/YYYY");
  if (currentDate === previousDate) {
    return false;
  }
  return true;
};

export const convertRetailPrice = (data: any) => {
  const prices = data.map(item => Number(formatNumberByString(item.price.toString())));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minPriceToString = formatCurrency(minPrice)
  const maxPriceToString = formatCurrency(maxPrice)
  return `${minPriceToString} - ${maxPriceToString}`
}
export const convertAttributeRetailPrice = (data: any, indexVariant: any) => {
  const retailPriceProduct = data[indexVariant].retailPrice;
  const prices = retailPriceProduct.map(item => Number(formatNumberByString(item.price.toString())));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minPriceToString = formatCurrency(minPrice);
  const maxPriceToString = formatCurrency(maxPrice);
  return `${minPriceToString} - ${maxPriceToString}`;
}
export const convertAttributeWholesalePrice = (data: any, indexVariant: any) => {
  const wholesalePriceProduct = data[indexVariant].wholesalePrice;
  const prices = wholesalePriceProduct.map(item => Number(formatNumberByString(item.price.toString())));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minPriceToString = formatCurrency(minPrice);
  const maxPriceToString = formatCurrency(maxPrice);
  return `${minPriceToString} - ${maxPriceToString}`;
}
export const convertWholesalePrice = (data: any) => {
  const prices = data.map(item => Number(formatNumberByString(item.price.toString())));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minPriceToString = formatCurrency(minPrice)
  const maxPriceToString = formatCurrency(maxPrice)
  return `${minPriceToString} - ${maxPriceToString}`
}

export const coverStringQueryParams = () => {
  return "";
};

// Hàm recursive để tạo mảng C từ các mảng con trong mảng A
const generateCombinations = (
  arrays: any[][],
  index: number = 0,
  currentCombination: string[] = []
): string[] => {
  if (index === arrays.length) {
    return [currentCombination.join(" - ")];
  }

  const results: string[] = [];
  for (let i = 0; i < arrays[index].length; i++) {
    const newCombination = [...currentCombination, arrays[index][i].value];
    results.push(...generateCombinations(arrays, index + 1, newCombination));
  }
  return results;
};

export const mapDataDistribute = (arr: [[]]) => {
  const arrData = generateCombinations(arr);
  console.log("combinedArray-----", arrData);
  return arrData;
};
// // HACK(steve): wierd typescript situation because of strange typings
// const Validate: any = ValidateJS.default ? ValidateJS.default : ValidateJS

// /**
//  * Validates that 1 attribute doesn't appear in another's attributes content.
//  */
// Validate.validators.excludes = function custom(value, options, key, attributes) {
//   const list = attributes[options.attribute] || []
//   if (value && list.includes(value)) {
//     return options.message || `${value} is in the list`
//   }
// }

// /**
//  * Validates that another attribute isn't true.
//  */
// Validate.validators.tripped = function custom(value, options, key, attributes) {
//   if (value && attributes[options.attribute] === true) {
//     return options.message || `${options.attribute} is true`
//   }
// }

// /**
//  * Defines the rules for validating.
//  *
//  * Example:
//  * ```ts
//  * const RULES = {
//  *   favoriteBand: {
//  *     inclusion: { ['Weezer', 'Other'], message: 'Pick wisely.' }
//  *   },
//  *   name: {
//  *     presence: { message: 'A developer has no name?' }
//  *   }
//  * }
//  * validate(RULES, {})
//  * ```
//  *
//  * See https://validatejs.org/#validators for more examples.
//  *
//  */
// export interface ValidationRules {
//   [key: string]: Record<string, unknown>
// }

// /**
//  * An object containing any errors found.
//  *
//  * Example:
//  * ```js
//  * {
//  *   email: ['Invalid email address.'],
//  *   password: [
//  *     'Password must be 6 characters.',
//  *     'Password must have at least 1 digit.'
//  *   ]
//  * }
//  * ```
//  */
// export interface ValidationErrors {
//   [key: string]: string[]
// }

// /**
//  * Runs the given rules against the data object.
//  *
//  * @param rules The rules to apply.
//  * @param data The object to validate.
//  */
// export function validate(rules: ValidationRules, data: Record<string, unknown>): ValidationErrors {
//   if (typeof data !== "object") {
//     return {} as ValidationErrors
//   }
//   return Validate(data, rules, { fullMessages: false }) || {}
// }
export const calculateTotalUnitPrice = (unitPrice: number, quantity: number) => {
  return unitPrice * quantity;
}
export const calculateTotalDiscountPrice = (unitPrice: number, discountPercentage: number) => {
  return unitPrice * (discountPercentage / 100)
}
export const calculateTotalPrice = (items: any) => {
  let totalPrice = 0;
  items?.forEach((item: any) => {
    const itemTotal = calculateTotalUnitPrice(item.unitPrice, item.quantity);
    totalPrice += itemTotal;
  });
  return totalPrice;
}
export const calculateTotalDiscount = (items: any) => {
  let totalPrice = 0;
  items?.forEach((item: any) => {
    const itemTotal = calculateTotalUnitPrice(item.unitPrice, item.quantity);
    const discountTotal = calculateTotalDiscountPrice(itemTotal, item.discount);
    totalPrice += discountTotal;
  });
  return totalPrice;
}
export const convertAttributePrice = (data: any) => {
  // const wholesalePriceProduct = data[indexVariant].wholesalePrice;
  const prices = data.map((item: { price: { toString: () => any; }; }) => Number(formatNumberByString(item.price.toString())));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minPriceToString = formatCurrency(minPrice);
  const maxPriceToString = formatCurrency(maxPrice);
  return `${minPriceToString} - ${maxPriceToString}`;
}
export function formatNumberFloat(inputNumber: string) {
  const number = parseFloat(inputNumber);
  if (isNaN(number)) {
    return "Invalid Number";
  }
  const formattedNumber = number.toFixed(2);
  const parts = formattedNumber.split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const result = integerPart + "." + parts[1];

  return result;
}
export function formatNumber(inputNumber: number) {
  if (isNaN(inputNumber)) {
    return "0";
  }
  if (inputNumber === null) {
    return ''
  }
  if (inputNumber === 0) {
    return "";
  }
  const integerPart = inputNumber
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const result = integerPart + "đ";

  return result;
}

numeral.locale("vi");
// export function formatCurrencyWithCommas(amount: any) {
//   const [wholePart, decimalPart = ""] = amount.split(","); 
//   console.log('wholePart', wholePart)
//   console.log('decimalPart', decimalPart)
//   const formattedWholePart = formatCurrency(wholePart); // Format phần nguyên
//   // const formattedDecimalPart = decimalPart.replace(/,/g, "."); // Format phần thập phân nếu có

//   return `${formattedWholePart}${decimalPart ? "." : ""}`;
// }
// export function formatCurrency(amount: any) {
//   return numeral(amount).format("0,0").replace(/,/g, ".");
// }
export function commasToDots(str: any): string {
  if (str == null) {
    return ''; // Hoặc trả về một giá trị mặc định khác nếu cần
  }
  return str.toString().replace(/\./g, ',');
}
export function formatCurrency(value: any, options = {}) {
  if (value == null || value === '') {
    return '';
  }
  const { separator = '.', prefix = '', suffix = '' } = options;
  // Loại bỏ ký tự không phải số và không phải dấu phẩy
  value = value.toString().replace(/[^0-9,]/g, '');

  // Thay dấu phẩy bằng dấu chấm để định dạng
  let [integerPart, decimalPart] = value.split(',');

  // Giới hạn số ký tự sau dấu phẩy
  if (decimalPart) {
    decimalPart = decimalPart.substring(0, 2);
  }

  // Thêm dấu phân cách hàng ngàn cho phần nguyên
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  // Ghép phần nguyên và phần thập phân (nếu có)
  return decimalPart !== undefined ? `${prefix}${integerPart},${decimalPart}${suffix}` : `${prefix}${integerPart}${suffix}`;

}
export function removeNonNumeric(num: any) {
  return num.toString().replace(/[^0-9.]/g, "");
}
export function formatNumberByString(num: any) {
  // console.log('num-------------------', num)
  if (num === 0 || num === null || num === undefined) {
    return 0;
  }
  if (typeof num === 'number') {
    num = num.toString();
  }
  return num.replace(/\./g, "");
}
// export function formatInputNumber(inputString: string): string {
//   const hasComma = inputString.includes(",");
//   if (!hasComma) {
//     // Kiểm tra xem người dùng có nhập dấu chấm hay không
//     const hasDecimalPoint = inputString.includes(".");

//     // Nếu có dấu chấm, coi đó là dấu thập phân
//     if (hasDecimalPoint) {
//       // Loại bỏ dấu phẩy đã nhập (nếu có) và thay thế dấu chấm bằng dấu phẩy
//       const normalizedInput = inputString.replace(/,/g, "").replace(".", ",");

//       // Định dạng lại thành số thập phân
//       return numeral(normalizedInput).format("0.0,00"); // Hoặc định dạng tùy chỉnh khác
//     } else {
//       // Nếu không có dấu chấm, coi đó là số nguyên và định dạng với dấu chấm phân cách hàng nghìn
//       const normalizedInput = inputString.replace(/,/g, ""); // Loại bỏ dấu phẩy đã nhập
//       return formatCurrency(normalizedInput); // Sử dụng hàm formatCurrency của bạn
//     }
//   } else {
//     // Nếu đã có dấu phẩy, giữ nguyên input
//     return inputString;
//   }
// }


export function convertArrStringToArrNumber(arr: any) {

}

export function addCommas(num: any) {
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".").toString();
}
// export function formatPhoneNumber(phoneNumber: any) {
//   // Remove leading zeros and spaces
//   const cleanedNumber = phoneNumber.replace(/^0+|\s+/g, "")

//   // Extract the area code and the rest of the number
//   const areaCode = cleanedNumber.substring(0, 3)
//   const restOfNumber = cleanedNumber.substring(3)

//   // Format the phone number
//   const formattedNumber = `(${areaCode}) ${restOfNumber.slice(0, 3)}-${restOfNumber.slice(3)}`

//   return formattedNumber
// }


// check còn hàng , đã hết có thể dùng sau 
// const filterCategory = (selectedCategory: string) => {
//   let a = dataProduct.slice();
//   let newArr = a.filter((item: any) => selectedCategory.includes(item.type));
//   return setSortedProducts(newArr);
// };
// useEffect(() => {
//   const sortedAndFiltered = sortAndFilterProducts(timeFilter, nameFilter, priceFilter, selectedTags, products);
//   setSortedProducts(sortedAndFiltered);
// }, [timeFilter, nameFilter, selectedTags, priceFilter]);
// const getStockStatus = (quantity: number): string => {
//   return quantity === 0
//     ? 'Hết hàng'
//     : quantity <= 10
//       ? 'Sắp hết hàng'
//       : 'Còn hàng';
// };

// const getStockStatusColor = (stockStatus: string): string => ({
//   'Còn hàng': 'green',
//   'Hết hàng': 'red',
//   'Sắp hết hàng': 'orange',
// }[stockStatus] || 'black');

// const productsWithStatus = sortedProducts.map((product) => ({
//   ...product,
//   stockStatus: getStockStatus(product.quantity),
// }));

export function validateFileSize(fileInput: any) {
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
  console.log("maxSizeInBytes", maxSizeInBytes);
  console.log("fileInput", fileInput);

  if (fileInput > maxSizeInBytes) {
    console.log("File size must be less than 5MB.");
    return true;
  } else {
    console.log("File size is within the allowed limit.");
    return false;
  }
}

export function getDateToday() {
  var today = moment().format("YYYY-MM-DD");
  let markedDates = {};
  markedDates[today] = {
    startingDay: true,
    color: colors.palette.navyBlue,
    textColor: "#FFFFFF",
  };
  console.log("-----state.getDateToday", markedDates);
  return markedDates;
}

export function formatStringToFloat(input: string) {
  // Loại bỏ dấu chấm
  let withoutDots = input.replace(/\./g, '');
  
  // Thay thế dấu phẩy bằng dấu chấm
  let formattedString = withoutDots.replace(',', '.');
  
  // Chuyển đổi thành số kiểu float
  let result = parseFloat(formattedString);
  
  return result;
}

export function getDateTodayOneDate() {
  var today = moment().format("YYYY-MM-DD");
  let markedDates = {};
  markedDates[today] = {
    selected: true,
    selectedColor: colors.palette.navyBlue,
    selectedTextColor: "#FFFFFF",
  };
  console.log("-----state.getDateToday", markedDates);
  return markedDates;
}

export function getDateLast7days() {
  var dateLast7days = moment().subtract(6, "d").format("YYYY-MM-DD");
  var today = moment().format("YYYY-MM-DD");
  let startDate = moment(dateLast7days);
  let endDate = moment(today);
  let markedDates = {};
  markedDates[dateLast7days] = {
    startingDay: true,
    color: colors.palette.navyBlue,
    textColor: "#FFFFFF",
  };
  let range = endDate.diff(startDate, "days");
  for (let i = 1; i <= range; i++) {
    let tempDate = startDate.add(1, "day");
    tempDate = moment(tempDate).format("YYYY-MM-DD");
    if (i < range) {
      markedDates[tempDate] = {
        color: colors.palette.gray,
        textColor: "#000000",
      };
    } else {
      markedDates[tempDate] = {
        endingDay: true,
        color: colors.palette.navyBlue,
        textColor: "#FFFFFF",
      };
    }
  }
  console.log("-----state.getDateLast7days", markedDates);
  return markedDates;
}

export function getOfMonthdays() {
  const startOfMonth = moment().startOf("month").format("YYYY-MM-DD");
  // const endOfMonth = moment().endOf('month').format('YYYY-MM-DD');
  var today = moment().format("YYYY-MM-DD");
  let startDate = moment(startOfMonth);
  // let endDate = moment(endOfMonth);
  let endDate = moment(today);
  let markedDates = {};
  markedDates[startOfMonth] = {
    startingDay: true,
    color: colors.palette.navyBlue,
    textColor: "#FFFFFF",
  };
  let range = endDate.diff(startDate, "days");
  for (let i = 1; i <= range; i++) {
    let tempDate = startDate.add(1, "day");
    tempDate = moment(tempDate).format("YYYY-MM-DD");
    if (i < range) {
      markedDates[tempDate] = {
        color: colors.palette.gray,
        textColor: "#000000",
      };
    } else {
      markedDates[tempDate] = {
        endingDay: true,
        color: colors.palette.navyBlue,
        textColor: "#FFFFFF",
      };
    }
  }
  console.log("-----state.getStartOfMonthdays", markedDates);
  return markedDates;
}

export function getEndOfMonthdays() {
  const endOfMonth = moment().endOf("month").format("YYYY-MM-DD");
  var month = moment().month();
  var dayEnd = moment().endOf("month").format("DD");
  var year = moment().year();
  var dateDataEnd = {
    year: year,
    month: month,
    day: dayEnd,
    timestamp: moment(endOfMonth).format("X"),
    dateString: endOfMonth,
  };
  console.log("-----state.getEndOfMonthdays", dateDataEnd);
  return dateDataEnd;
}

export const checkArrayIsEmptyOrNull = (value: string | any[] | null) => {
  console.log("-----state.checkArrayIsEmptyOrNull", value);
  return value === null || (Array.isArray(value) && value.length === 0) || value === undefined;
};

export function mergeIfDefined(
  obj1: Record<string, unknown>,
  obj2: Record<string, unknown>
) {
  const newObj = {
    ...obj1
  };
  Object.entries(obj2).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      newObj[key] = value;
    }
  });
  return newObj;
}

export function isIOS() {
  return Platform.OS === 'ios';
}

export function additiveInverseArray(arr: number[]) {
  return arr.map((i) => -i);
}


export function groupedTaxValues(products: []) {
  products.reduce((acc, product) => {
    const vatValue = product.VAT.value;
    if (acc[vatValue]) {
      acc[vatValue].taxValue += product.taxValue;
    } else {
      acc[vatValue] = {
        label: product.VAT.label,
        value: vatValue,
        taxValue: product.taxValue
      };
    }
    return acc;
  }, {});
}
