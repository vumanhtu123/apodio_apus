export const UserStatus = {
  LOGGED: "LOGGED",
  NOT_LOGGED: "NOT_LOGGED",
  USER_LOGGED: "USER_LOGGED",
  ACCESS_TOKEN: "ACCESS_TOKEN",
  REFRESH_TOKEN: "REFRESH_TOKEN",
  PASSWORD: "PASSWORD",
  IS_FIRST: "IS_FIRST",
  CURRENT_LANG: "CURRENT_LANG",
  TENANT_ID: "TENANT_ID",
};

export const ApiStatus = {
  MESSAGE_VALID: "message.valid",
  FORGOT_SEND_MAIL_VALID: "auth.send_mail_success",
  FORGOT_RESET_PASSWORD_SUCCESS: "auth.reset_password_success",
  FORGOT_RESET_PASSWORD_FAIL: "auth.reset_password_error",
  API_DATA_SUCCESS: "success",
};

export const LinkStatus = {
  FORGOT_RESET_PASSWORD: "api/reset-password",
  REGISTER_ACTIVE_LINK: "api/activateCustomer",
  SHOP_DISCONNECT_INTERNET: "The Internet connection appears to be offline.",
};

export default {
  UserStatus: UserStatus,
  ApiStatus: ApiStatus,
  LinkStatus: LinkStatus,
};
