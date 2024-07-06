import * as SecureStore from "expo-secure-store";

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await SecureStore.setItemAsync(key, jsonValue);
  } catch (e) {
    console.error("Saving data error", e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await SecureStore.getItemAsync(key);
    if (jsonValue) {
      return JSON.parse(jsonValue);
    } else {
      return null;
    }
  } catch (e) {
    console.error("Fetching data error", e);
  }
};

export const removeData = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (e) {
    console.error("Removing data error", e);
  }
};
