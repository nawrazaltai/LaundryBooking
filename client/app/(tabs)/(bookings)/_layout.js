import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Upcoming from "./index";
import History from "./history";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontWeight: "800", fontSize: 15 },
        tabBarIndicatorStyle: { backgroundColor: "#F99417", height: 3 },
      }}
    >
      <Tab.Screen name="Kommande" component={Upcoming} />
      <Tab.Screen name="Historik" component={History} />
    </Tab.Navigator>
  );
}

const _layout = () => {
  return (
    <SafeAreaView className="flex-1 w-full bg-white pt-5">
      <View className="w-full flex justify-center items-center p-2">
        <Text className="font-interBold text-xl">Mina bokningar</Text>
      </View>

      <MyTabs></MyTabs>
    </SafeAreaView>
  );
};

export default _layout;
