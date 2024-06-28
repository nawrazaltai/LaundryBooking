import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot, Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "./redux/features/user/userSlice";
import { getData } from "../lib/storage";

// const useInitializeToken = () => {

const InitializeAuth = () => {
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAuthData = async () => {
      const storedToken = await getData("token");
      const userData = await getData("userData");

      if (storedToken) {
        dispatch(setToken(storedToken));
      }

      if (userData) {
        dispatch(setUserData(userData));
      }
    };

    fetchAuthData();
  }, [dispatch]);

  return null;
};

const RootLayout = () => {
  return (
    <Provider store={store}>
      <InitializeAuth />
      <Slot />
    </Provider>
  );
};

export default RootLayout;

// Works instead of <Slot/>
// <Stack screenOptions={{ headerShown: false }}>
//  <Stack.Screen name="(tabs)" />
// </Stack>
