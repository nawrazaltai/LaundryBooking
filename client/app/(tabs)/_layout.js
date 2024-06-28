import { Redirect, Tabs } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "react-native";

export default function TabLayout() {
  //   const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  if (!token) {
    return <Redirect href="/signIn" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "" }}>
      <Tabs.Screen name="index" options={{ title: "Hem" }} />
      <Tabs.Screen name="times" options={{ title: "Tider" }} />
    </Tabs>
  );
}
