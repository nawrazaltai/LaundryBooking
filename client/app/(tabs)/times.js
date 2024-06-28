import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Times = () => {
  return (
    <SafeAreaProvider className="flex-1 items-center justify-center">
      <Text>times</Text>
    </SafeAreaProvider>
  );
};

export default Times;
