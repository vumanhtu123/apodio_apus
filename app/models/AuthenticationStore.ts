import { Instance, SnapshotOut, flow, types } from "mobx-state-tree";
import { withEnvironment } from "./extensions/with-environment";
import { AuthApi } from "../services/api/api-config-auth";
import { LoginResponse } from "./login-model";
import {
  clear,
  getAccessToken,
  setAccessToken,
  setFirstOpenApp,
  setRefreshToken,
  setTenantId,
} from "../utils/storage";

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    accessToken: types.maybe(types.string),
    refreshToken: types.optional(types.string, ""),
    userId: types.optional(types.number, 0),
    jti: types.optional(types.string, ""),
    tenantId: types.maybe(types.string),
    authEmail: "",
    otpReceiver: types.optional(types.string, ""),
    receiverType: types.optional(types.string, ""),
    userName: types.optional(types.string, ""),
    passWord: types.optional(types.string, ""),
    errorMessage: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.accessToken;
    },
    get validationError() {
      if (store.authEmail.length === 0) {
        return "can't be blank";
      }
      if (store.authEmail.length < 6) {
        return "must be at least 6 characters";
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail)) {
        return "must be a valid email address";
      }
      return "";
    },
  }))
  .actions((store) => ({
    setUserID(id?: number) {
      store.userId = id ?? 0;
    },
    setJTI(jti: string) {
      store.jti = jti;
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "");
    },
    setTenantId(value: string) {
      store.tenantId = value;
    },
    setUserName(value: string) {
      store.userName = value;
    },
    setPassWord(value: string) {
      store.passWord = value;
    },
    setErrorMessage(value: string) {
      store.errorMessage = value;
    },
  }))
  .actions((store) => ({
    login: flow(function* (username: string, password: string) {
      store.setUserName(username);
      store.setPassWord(password);
      const authApi = new AuthApi(
        store.environment.apiGetWay,
        store.environment.apiUaa
      );
      try {
        const result: BaseResponse<LoginResponse, ErrorCode> =
          yield authApi.login(username, password);
        if (result.data != undefined) {
          console.log("tuvm", result);
          store.setUserID(result.data.userId);
          setAccessToken(result.data.accessToken);
          setRefreshToken(result.data.refreshToken);
          setTenantId(result.data.userId);
          return result.data;
        } else {
          const errorM = result.errorCodes.find((error) => error.code)?.message;
          console.log("err", errorM);
          store.setErrorMessage(errorM ?? "");
          __DEV__ && console.tron.log(result.errorCodes);
          console.log("error");
          return result.errorCodes;
        }
      } catch (err) {
        console.log(err);
      }
    }),

    logout: flow(function* () {
      const authApi = new AuthApi(
        store.environment.apiGetWay,
        store.environment.apiUaa
      );
      console.log("jti : ", store.jti);
      const result: any = yield authApi.logout(store.jti);
      setAccessToken("");
      store.setUserID();
      store.setJTI("");
      console.log("tuvm logout", result);
      if (result.kind === "ok") {
        console.log("token set", store.accessToken);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    forgotPass: flow(function* (otpReceiver: string, receiverType: string) {
      const authApi = new AuthApi(
        store.environment.apiGetWay,
        store.environment.apiUaa
      );
      console.log("otp receiver : ", otpReceiver);
      const result: any = yield authApi.forgotPass(otpReceiver, "EMAIL");
      console.log("tuvm result", JSON.stringify(result));
      if (result.kind === "ok") {
        console.log("result forgot", JSON.stringify(result));
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    submitPassword: flow(function* (otp: number, newPassword: string) {
      const authApi = new AuthApi(
        store.environment.apiGetWay,
        store.environment.apiUaa
      );
      console.log("otp receiver : ", newPassword);
      const result: any = yield authApi.submitPassword(otp, newPassword);
      console.log("tuvm result submit pass", JSON.stringify(result));
      if (result.kind === "ok") {
        console.log("result submit pass", JSON.stringify(result));
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    getRefreshToken: flow(function* (refreshToken: string) {
      const authApi = new AuthApi(
        store.environment.apiGetWay,
        store.environment.apiUaa
      );
      try {
        const result: BaseResponse<any, ErrorCode> = yield authApi.refreshToken(
          refreshToken
        );
        if (result.data != undefined) {
          store.setUserID(result.data.userId);
          store.setJTI(result.data.jti);
          setAccessToken(result.data.accessToken);
          setRefreshToken(result.data.refreshToken);
          setTenantId(result.data.tenantId);
          return result.data;
        } else {
          const errorM = result.errorCodes.find((error) => error.code)?.message;
          console.log("err", errorM);
          store.setErrorMessage(errorM ?? "");
          __DEV__ && console.tron.log(result.errorCodes);
          console.log("error");
          return result.errorCodes;
        }
      } catch (err) {
        console.log(err);
      }
    }),
  }));

export interface AuthenticationStore
  extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot
  extends SnapshotOut<typeof AuthenticationStoreModel> {}

// @demo remove-file
