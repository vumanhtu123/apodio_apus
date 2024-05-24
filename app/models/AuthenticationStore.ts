import { Instance, SnapshotOut, flow, types } from "mobx-state-tree";
import { withEnvironment } from "./extensions/with-environment";
import { AuthApi } from "../services/api/api-config-auth";

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    accessToken: types.optional(types.string, ""),
    refreshToken: types.optional(types.string, ""),
    userId: types.optional(types.number, 0),
    jti: types.optional(types.string, ""),
    authToken: types.maybe(types.string),
    tenantId: types.maybe(types.string),
    authEmail: "",
    otpReceiver: types.optional(types.string, ""),
    receiverType: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken;
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
    setAccessToken(token: string) {
      store.accessToken = token;
    },
    setRefreshToken(token: string) {
      store.refreshToken = token;
    },
    setUserID(id?: number) {
      store.userId = id ?? 0;
    },
    setJTI(jti: string) {
      store.jti = jti;
    },
    setAuthToken(value?: string) {
      store.authToken = value;
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "");
    },
    setTenantId(value: string) {
      store.tenantId = value;
    },
  }))
  .actions((store) => ({
    login: flow(function* (username: string, password: string) {
      const authApi = new AuthApi(
        store.environment.apiGetWay,
        store.environment.apiUaa
      );
      const result: any = yield authApi.login(username, password);

      console.log("tuvm", result);
      if (result.kind === "ok") {
        store.setAccessToken(result.data.data.accessToken);
        store.setRefreshToken(result.data.data.refreshToken);
        store.setUserID(result.data.data.userID);
        store.setJTI(result.data.data.jti);
        store.setUserID(result.data.data.userId);
        store.setTenantId(result.data.data.tenantId);
        console.log("token set", result.data.data.tenantId);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    logout: flow(function* () {
      const authApi = new AuthApi(
        store.environment.apiGetWay,
        store.environment.apiUaa
      );
      console.log("jti : ", store.jti);
      const result: any = yield authApi.logout(store.jti);
      store.authToken = undefined;
      console.log("tuvm logout", result);
      if (result.kind === "ok") {
        console.log("token set", store.accessToken);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),

    forgotPass: flow(function* (otpReceiver: string, receiverType: "EMAIL") {
      const authApi = new AuthApi(
        store.environment.apiGetWay,
        store.environment.apiUaa
      );
      console.log("otp receiver : ", otpReceiver);
      const result: any = yield authApi.forgotPass(otpReceiver, receiverType);
      console.log("tuvm result", result);
      if (result.kind === "ok") {
        console.log("result forgot", result);
        return result;
      } else {
        __DEV__ && console.tron.log(result.kind);
        return result;
      }
    }),
  }));

export interface AuthenticationStore
  extends Instance<typeof AuthenticationStoreModel> {}
export interface AuthenticationStoreSnapshot
  extends SnapshotOut<typeof AuthenticationStoreModel> {}

// @demo remove-file
