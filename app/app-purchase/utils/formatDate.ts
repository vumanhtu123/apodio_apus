import I18n from "i18n-js"
import momentTimeZone from 'moment-timezone'
// Note the syntax of these imports from the date-fns library.
// If you import with the syntax: import { format } from "date-fns" the ENTIRE library
// will be included in your production bundle (even if you only use one function).
// This is because react-native does not support tree-shaking.
import type { Locale } from "date-fns"
import format from "date-fns/format"
import parseISO from "date-fns/parseISO"
import ar from "date-fns/locale/ar-SA"
import ko from "date-fns/locale/ko"
import en from "date-fns/locale/en-US"

type Options = Parameters<typeof format>[2]

const getLocale = (): Locale => {
  const locale = I18n.currentLocale().split("-")[0]
  return locale === "ar" ? ar : locale === "ko" ? ko : en
}

export const formatDate = (date: string, dateFormat?: string, options?: Options) => {
  const locale = getLocale()
  const dateOptions = {
    ...options,
    locale,
  }
  return format(parseISO(date), dateFormat ?? "MMM dd, yyyy", dateOptions)
}

export const formatDateTime = (dateTimeString: string | number | Date) => {
  const date = new Date(dateTimeString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  // Lấy thông tin năm
  const year = date.getFullYear();
  // Lấy thông tin giờ
  const hours = String(date.getHours()).padStart(2, '0');
  // Lấy thông tin phút
  const minutes = String(date.getMinutes()).padStart(2, '0');
  // Lấy thông tin giây
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDateTime = ` ${hours}:${minutes} ${day}/${month}`;

  return formattedDateTime;
}

export function convertToOffsetDateTime(date: string | any): string {
  let format = 'YYYY-MM-DDTHH:mm:ssZ'
  const targetTimeZone = 'Asia/Ho_Chi_Minh'
  const momentDate = momentTimeZone.tz(date, format, targetTimeZone)
  return momentDate.format('YYYY-MM-DDTHH:mm:ssZ')
}