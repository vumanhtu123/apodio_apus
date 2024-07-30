import { Alert, PermissionsAndroid, Platform } from "react-native";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

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

  // Yêu cầu quyền truy cập bộ nhớ
  export const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const result = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        if (result === RESULTS.GRANTED) {
          console.log("You can use the storage");
        } else {
          console.log("Storage permission denied");
          Alert.alert("Permission Denied", "Storage permission is required to download and print files.");
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === 'ios') {
      try {
        const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (result === RESULTS.GRANTED) {
          console.log("You can use the storage");
        } else {
          console.log("Storage permission denied");
          Alert.alert("Permission Denied", "Storage permission is required to download and print files.");
        }
      } catch (err) {
        console.warn(err);
      }
    }
}

export const requestStoragePermission2 = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to download the file',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Storage Permission Denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};


export const checkStoragePermission = async () => {
  if (Platform.OS === 'android') {
    const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    return result === RESULTS.GRANTED;
  } else if (Platform.OS === 'ios') {
    const result = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return result === RESULTS.GRANTED;
  }
  return false;
};