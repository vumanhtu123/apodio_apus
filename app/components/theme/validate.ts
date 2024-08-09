import moment from 'moment';
import { colors } from "../theme";

export function isFormValid(error, ...fields) {
  // Kiểm tra xem tất cả các trường có giá trị không rỗng
  const allFieldsFilled = fields.every(
    field => field !== undefined && field !== '',
  );

  const noErrors = Object.keys(error).length === 0;

  return allFieldsFilled && noErrors;
}

export const patternPassword =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[,.!@#\/$&*~"|:]).{8,}$/;
export const patternvalidateBiCard = /^[a-zA-Z0-9]{0,17}$/;
export const patternvalidateID = /^[a-zA-Z0-9]{0,17}$/;
export const patternvalidatePassPost = /^[a-zA-Z0-9]{0,17}$/;
export const validatePhoneStartsWith = (value: string) => {
  if (value.length == 8 && (value.startsWith('75') || value.startsWith('76'))) {
    return true;
  } else if (value.length == 11 && value.startsWith('670')) {
    return true;
  }
  return false;
};

export const showDate = (item, index, data) => {
  const current = item;
  let previous;
  if (index === 0) {
    return true;
  } else {
    previous = data[index - 1];
  }
  const currentDate = moment(current.createdDate).format('MM/DD/YYYY');
  const previousDate = moment(previous.createdDate).format('MM/DD/YYYY');
  if (currentDate === previousDate) {
    return false;
  }
  return true;
};

export function getDateToday() {
  var today = moment().format("YYYY-MM-DD");
  let markedDates = {};
  markedDates[today] = {
    startingDay: true,
    color: colors.palette.navyBlue,
    textColor: colors.white,
  };
  console.log("-----state.getDateToday", markedDates);
  return markedDates;
}

export function getDateTodayOneDate() {
  var today = moment().format("YYYY-MM-DD");
  let markedDates = {};
  markedDates[today] = {
    selected: true,
    selectedColor: colors.palette.navyBlue,
    selectedTextColor: colors.white,
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
    textColor: colors.white,
  };
  let range = endDate.diff(startDate, "days");
  for (let i = 1; i <= range; i++) {
    let tempDate = startDate.add(1, "day");
    tempDate = moment(tempDate).format("YYYY-MM-DD");
    if (i < range) {
      markedDates[tempDate] = {
        color: colors.palette.gray,
        textColor: colors.black,
      };
    } else {
      markedDates[tempDate] = {
        endingDay: true,
        color: colors.palette.navyBlue,
        textColor: colors.white,
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
    textColor: colors.white,
  };
  let range = endDate.diff(startDate, "days");
  for (let i = 1; i <= range; i++) {
    let tempDate = startDate.add(1, "day");
    tempDate = moment(tempDate).format("YYYY-MM-DD");
    if (i < range) {
      markedDates[tempDate] = {
        color: colors.palette.gray,
        textColor: colors.black,
      };
    } else {
      markedDates[tempDate] = {
        endingDay: true,
        color: colors.palette.navyBlue,
        textColor: colors.white,
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
