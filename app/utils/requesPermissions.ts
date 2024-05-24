import { Platform } from "react-native";
import { PERMISSIONS, check, request } from "react-native-permissions";

export const requestCameraPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        return result;
      } else {
        const result = await request(PERMISSIONS.ANDROID.CAMERA);
        return result;
      }
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  export const checkCameraPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const result = await check(PERMISSIONS.IOS.CAMERA);
        return result;
      } else {
        const result = await check(PERMISSIONS.ANDROID.CAMERA);
        return result;
      }
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  export const requestLibraryPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const result = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
        return result;
      } else {
        const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        return result;
      }
    } catch (error) {
      console.warn(error);
      return null;
    }
  };

  export const checkLibraryPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        const result = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);
        return result;
      } else {
        const result = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
        return result;
      }
    } catch (error) {
      console.warn(error);
      return null;
    }
  };