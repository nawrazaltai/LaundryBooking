import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Slot, Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import Store from "./redux/store";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "./redux/features/user/userSlice";
import { getData } from "../lib/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useFonts,
  Inter_100Thin,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const InitialLayout = () => {
  const dispatch = useDispatch();

  const [fontsLoaded, error] = useFonts({
    Inter_100Thin,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // if (!fontsLoaded && !error) {
  //   return null;
  // }

  const { user } = useSelector((state) => state.user);
  // console.log(user);

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

  if (!fontsLoaded && !error) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={"large"} color={"gray"} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="profile"
        options={{
          animation: "slide_from_right",
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          animation: "slide_from_bottom",
          // presentation: "modal",
        }}
      />
    </Stack>
  );

  // <Slot />;
};

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <Provider store={Store}>
      <QueryClientProvider client={queryClient}>
        <InitialLayout />
      </QueryClientProvider>
    </Provider>
  );
};

export default RootLayout;
