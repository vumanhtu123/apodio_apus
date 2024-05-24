import AsyncStorage from "@react-native-async-storage/async-storage";
import _const from "../const";

export async function setFirstOpenApp() {
  try {
    await AsyncStorage.setItem(_const.UserStatus.IS_FIRST, "true");
  } catch (err) {
    console.log(err);
  }
}

export async function getFirstOpenApp() {
  try {
    const userData = await AsyncStorage.getItem(_const.UserStatus.IS_FIRST);
    if (userData !== null) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function setAccessToken(token: any) {
  try {
    await AsyncStorage.setItem(
      _const.UserStatus.ACCESS_TOKEN,
      // token
      JSON.stringify(token)
    );
  } catch (err) {
    console.log(err);
  }
}

export async function getAccessToken() {
  try {
    const userData = await AsyncStorage.getItem(_const.UserStatus.ACCESS_TOKEN);
    if (userData !== null) {
      return JSON.parse(userData);
      // return userData;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function removeAccessToken() {
  try {
    await AsyncStorage.removeItem(_const.UserStatus.ACCESS_TOKEN);
  } catch (err) {
    return false;
  }
}

export async function setRefreshToken(token: any) {
  try {
    await AsyncStorage.setItem(
      _const.UserStatus.REFRESH_TOKEN,
      JSON.stringify(token)
    );
  } catch (err) {
    console.log(err);
  }
}

export async function getRefreshToken() {
  try {
    const userData = await AsyncStorage.getItem(
      _const.UserStatus.REFRESH_TOKEN
    );
    if (userData !== null) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function getTenantId() {
  try {
    const userData = await AsyncStorage.getItem(_const.UserStatus.TENANT_ID);
    if (userData !== null) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function setTenantId(id: any) {
  try {
    await AsyncStorage.setItem(_const.UserStatus.TENANT_ID, JSON.stringify(id));
  } catch (err) {
    console.log(err);
  }
}

export async function removeRefreshToken() {
  try {
    await AsyncStorage.removeItem(_const.UserStatus.REFRESH_TOKEN);
  } catch (err) {
    return false;
  }
}

/**
 * Loads a string from storage.
 *
 * @param key The key to fetch.
 */
export async function loadString(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    // not sure why this would fail... even reading the RN docs I'm unclear
    return null;
  }
}

/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from storage and runs it thru JSON.parse.
 *
 * @param key The key to fetch.
 */
export async function load(key: string): Promise<unknown | null> {
  try {
    const almostThere = await AsyncStorage.getItem(key);
    return JSON.parse(almostThere ?? "");
  } catch {
    return null;
  }
}

/**
 * Saves an object to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function save(key: string, value: unknown): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Removes something from storage.
 *
 * @param key The key to kill.
 */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {}
}

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {}
}

export async function setCurrentLanguage(lang: any) {
  try {
    await AsyncStorage.setItem(
      _const.UserStatus.CURRENT_LANG,
      JSON.stringify(lang)
    );
  } catch (err) {
    console.log(err);
  }
}

export async function getCurrentLanguage() {
  try {
    const userData = await AsyncStorage.getItem(_const.UserStatus.CURRENT_LANG);
    if (userData !== null) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
