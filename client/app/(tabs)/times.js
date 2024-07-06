import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const Times = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <SafeAreaProvider className="flex-1 items-center justify-center">
      <Text>times</Text>
    </SafeAreaProvider>
  );
};

export default Times;
