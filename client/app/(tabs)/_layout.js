import { Redirect, Tabs, Stack } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TabLayout() {
  //   const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

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
        name="test"
        // initialParams={{ initialPage: null }}
        options={{
          title: "Mina Tider",
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
    </Tabs>
  );
}
