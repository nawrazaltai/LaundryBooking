import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Slot, Stack } from "expo-router";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "./redux/features/user/userSlice";
import { getData } from "../lib/storage";

// const useInitializeToken = () => {

const InitialLayout = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user);
  // console.log(user);

  useEffect(() => {
    const fetchAuthData = async () => {
      setLoading(true);
      const storedToken = await getData("token");
      const userData = await getData("userData");

      if (storedToken) {
        dispatch(setToken(storedToken));
      }

      if (userData) {
        dispatch(setUserData(userData));
      }
      setLoading(false);
    };

    fetchAuthData();
  }, [dispatch]);

  if (loading) {
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

const RootLayout = () => {
  return (
    <Provider store={store}>
      <InitialLayout />
    </Provider>
  );
};

export default RootLayout;
