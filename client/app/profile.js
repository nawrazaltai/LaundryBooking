import { StyleSheet, Text, View, useAnimatedValue } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./redux/features/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { firstName } = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log("running in profle");
    dispatch(getUser("66812b7220e73fad12b62edb"));
  }, []);

  return (
    // <SafeAreaProvider>
    <SafeAreaView className="flex items-center justify-center">
      <Text>Hej, jag är {firstName} och det här är min profil</Text>
      <Text>Profile</Text>
      <Link href="/">
        <Text>Go back</Text>
      </Link>
    </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default Profile;

// 66812b7220e73fad12b62edb
