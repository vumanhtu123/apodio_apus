import Toast from "react-native-toast-message";
import { translate } from "../i18n/translate";

let toastRef: { show: (arg0: any, arg1: string, arg2: string, arg3: { type: string; name: string }, arg4: any) => any; hidden: () => any }
let loadingRef: { showLoading: () => any; hideLoading: () => any }
let dialogRef: { showDialog: (arg0: any, arg1: string, arg2: any, arg3: any, arg4: any, arg5: any) => any; hideDialog: () => any }
let codepushAlertRef: { showAlert: (arg0: any) => any; hideAlert: () => any }
let loadingRefT: { showLoading: () => any; hideLoading: () => any }

type ToastType = 'success' | 'error' | 'info' | (string & {});
type ToastPosition = 'top' | 'bottom';
export const setToast = (_toast: any) => {
  toastRef = _toast
}
export const showToast = (message: any, type: ToastType = "success", position: ToastPosition = 'top' , ) => {
  Toast.show({
    type:  type,
    text1: translate(message),
    //text2: 'This is some something 👋 ',
    position: position,
  });
}

export const hidenToast = () => {
  Toast.hide();
}

export const setLoading = (_toast: any) => {
  loadingRef = _toast
}
export const showLoading = () => {
  loadingRef && loadingRef.showLoading && loadingRef.showLoading()
}
export const hideLoading = () => {
  loadingRef && loadingRef.hideLoading && loadingRef.hideLoading()
}

export const setLoadingT = (_toast: any) => {
  loadingRefT = _toast
}
export const showLoadingT = () => {
  loadingRefT && loadingRefT.showLoading() 
}
export const hideLoadingT = () => {
  loadingRefT && loadingRefT.hideLoading() 
}



export const setDialog = (_toast: any) => {
  dialogRef = _toast
}

type DialogType = "danger" | "success" | "warning"

export const showDialog = (
  message: string,
  type: DialogType = "success",
  content: string,
  titleBTN1: string,
  titleBTN2: string,
  funcBTN2: { (): void; (): void; (): void; (): void; (): void },
) => {
  dialogRef &&
    dialogRef.showDialog &&
    dialogRef.showDialog(message, type, content, titleBTN1, titleBTN2, funcBTN2)
}
export const hideDialog = () => {
  dialogRef && dialogRef.hideDialog && dialogRef.hideDialog()
}

export const setCodepushAlert = (_ref: any) => {
  codepushAlertRef = _ref
}
export const showCodepushAlert = (remotePackage: any) => {
  codepushAlertRef && codepushAlertRef.showAlert && codepushAlertRef.showAlert(remotePackage)
}
export const hideCodepushAlert = () => {
  codepushAlertRef && codepushAlertRef.showAlert && codepushAlertRef.hideAlert()
}
