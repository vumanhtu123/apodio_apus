import moment from 'moment';

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
