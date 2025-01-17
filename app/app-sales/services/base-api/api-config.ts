// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
import CONFIG from "../../config.json";

/**
 * The options used to configure the API.
 */

const getDomain = () => {
  const env = CONFIG.ENV;
  const domain = CONFIG.API.DEV.URL;
  // console.log('URL',CONFIG.API.PRODUCT.URL);
  console.log("Domain", domain);
  return domain;
};
const getDomainOrder = () => {
  const env = CONFIG.ENV;
  const domain = CONFIG.API.DEV.URL_ORDER;
  // console.log('URL',CONFIG.API.PRODUCT.URL);
  console.log("Domainmm", domain);
  return domain;
};
const getDomainAccounting = () => {
  const domain = CONFIG.API.DEV.URL_ACCOUNTING;
  console.log("Domain accounting", domain);
  return domain;
};
const getDomainErp = () => {
  const env = CONFIG.ENV;
  const domain = CONFIG.API.DEV.URL_ERP;
  // console.log('URL',CONFIG.API.PRODUCT.URL);
  console.log("ERP", domain);
  return domain;
};

const getDomainGetWay = () => {
  const env = CONFIG.ENV;
  const domain = CONFIG.API.DEV.URL_GET_WAY_ERP;
  // console.log('URL',CONFIG.API.PRODUCT.URL);
  console.log("Getway", domain);
  return domain;
};

const getDomainUAA = () => {
  const env = CONFIG.ENV;
  const domain = CONFIG.API.DEV.UAA;
  console.log("URL", CONFIG.API.STAGING.UAA);
  return domain;
};

const getDomainUpload = () => {
  const env = CONFIG.ENV;
  const domain = CONFIG.API.STAGING.URL_UPLOAD;
  // console.log('URL',CONFIG.API.PRODUCT.URL);
  console.log("Upload", domain);
  return domain;
};

const getVersion = () => {
  const env = CONFIG.ENV;
  const version = CONFIG.API[env].VERSION;
  return version;
};
const getBaseURL = () => {
  const domain = getDomain();
  const version = getVersion();
  return domain + "/" + version;
};

const getDomainWarehouse = () => {
  const domain = CONFIG.API.DEV.URL_WAREHOUSE;
  console.log("URL warehouse 2", domain);
  return domain;
};
const getDomainSupplier = () => {
  const domain = CONFIG.API.STAGING.URL_SUPPLIER;
  console.log("URL Supplier", domain);
  return domain;
};

const getDomainDebtSales = () => {
  const domain = CONFIG.API.DEV.URL_TEST_DEBT;
  console.log("URL DEBT SALE", domain);
  return  domain;
}
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: getDomain(),
  timeout: 100000,
};

export const DEFAULT_API_CONFIG_UPLOAD: ApiConfig = {
  url: getDomainUpload(),
  timeout: 100000,
};

export const DEFAULT_API_CONFIG_ERP: ApiConfig = {
  url: getDomainErp(),
  timeout: 100000,
};

export const DEFAULT_API_CONFIG_GET_WAY: ApiConfig = {
  url: getDomainGetWay(),
  timeout: 100000,
};

export const DEFAULT_API_CONFIG_UAA: ApiConfig = {
  url: getDomainUAA(),
  timeout: 100000,
};
export const DEFAULT_API_CONFIG_ORDER: ApiConfig = {
  url: getDomainOrder(),
  timeout: 100000,
};

export const DEFAULT_API_CONFIG_ACCOUNTING: ApiConfig = {
  url: getDomainAccounting(),
  timeout: 100000,
};

export const DEFAULT_API_WAREHOUSE: ApiConfig = {
  url: getDomainWarehouse(),
  timeout: 100000,
};

export const DEFAULT_API_SUPPLIER: ApiConfig = {
  url: getDomainSupplier(),
  timeout: 100000,
};

export const DEFAULT_API_DEBT_SALES: ApiConfig ={
  url: getDomainDebtSales(),
  timeout: 100000,
}