// Use this import if you want to use "env.js" file
// const { API_URL } = require("../../config/env")
// Or just specify it directly like this:
import CONFIG from "../../config.json";

/**
 * The options used to configure the API.
 */

const getDomain = () => {
  const env = CONFIG.ENV;
  const domain = CONFIG.API.STAGING.URL;
  // console.log('URL',CONFIG.API.PRODUCT.URL);
  console.log("Domain", domain);
  return domain;
};

const getDomainErp = () => {
  const env = CONFIG.ENV;
  //const domain = CONFIG.API.STAGING.URL_ERP;
  const domain = CONFIG.API.STAGING.URL_ERP;
  // console.log('URL',CONFIG.API.PRODUCT.URL);
  console.log("ERP", domain);
  return domain;
};

const getDomainGetWay = () => {
  const env = CONFIG.ENV;
  const domain = CONFIG.API.STAGING.URL_GET_WAY_ERP;
  // console.log('URL',CONFIG.API.PRODUCT.URL);
  console.log("Getway", domain);
  return domain;
};

const getDomainUAA = () => {
  const env = CONFIG.ENV;
  const domain = CONFIG.API.STAGING.UAA;
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
  timeout: 10000,
};