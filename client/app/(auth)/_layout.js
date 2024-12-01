import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Slot, Stack } from "expo-router";
import { Provider, useSelector, useDispatch } from "react-redux";
import { setToken, setUserData } from "../redux/features/user/userSlice";

const AuthLayout = () => {
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state?.user);
  // console.log(token);

  // if (token) {
  //   return <Redirect href={"/(tabs)"} />;
  // }

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

  return <Slot />;

  // <Slot />;
};

export default AuthLayout;
