import { Redirect, Tabs, Stack, withLayoutContext, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";

export default function TabLayout() {
  //   const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state?.user);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!token) {
    return <Redirect href="/signIn" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "orange",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Hem",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={30} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="times"
        options={{
          title: "Boka",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={30}
              name="washing-machine"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="(bookings)"
        // initialParams={{ initialPage: null }}
        options={{
          title: "Mina bokningar",
          headerTintColor: "#FFF",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={30}
              name="calendar-clock"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
