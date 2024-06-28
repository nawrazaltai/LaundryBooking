import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Slot, Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/features/user/userSlice";

// const useInitializeToken = () => {

const RootLayout = () => {
  // useInitializeToken();

  return (
    <Provider store={store}>
      <Slot />
    </Provider>
  );
};

export default RootLayout;

// Works instead of <Slot/>
// <Stack screenOptions={{ headerShown: false }}>
//  <Stack.Screen name="(tabs)" />
// </Stack>
