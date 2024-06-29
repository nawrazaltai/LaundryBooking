import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Profile = () => {
  return (
    // <SafeAreaProvider>
    <SafeAreaView className="flex items-center justify-center">
      <Text>Profile</Text>
      <Link href="/">
        <Text>Go back</Text>
      </Link>
    </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default Profile;
