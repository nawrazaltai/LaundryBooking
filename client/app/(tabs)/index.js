import {
  Text,
  TouchableOpacity,
  View,
  StatusBar as StatBar,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/features/user/userSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Greeting from "../../components/greeting/Greeting";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/button/CustomButton";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const statusBarHeight = StatBar.currentHeight + 10;
  const { username } = useSelector((state) => state.user);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />

      <SafeAreaView
        className="flex-1 bg-primary"
        style={{
          paddingTop: Platform.OS == "android" ? statusBarHeight : 0,
        }}
      >
        <View className="flex-row items-center justify-between px-5 pb-5">
          <Greeting username={username} />
          <Link href={"/../profile"} asChild>
            <Icon name="person-circle-outline" size={44} color={"#F5F5F5"} />
          </Link>
        </View>

        <View className="flex-1 bg-base rounded-t-2xl">
          {/* <CustomButton
            onPress={handleLogOut}
            styles="mt-5 bg-red-500 items-center py-2.5 rounded-md"
          >
            <Text>Logga ut</Text>
          </CustomButton> */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;
