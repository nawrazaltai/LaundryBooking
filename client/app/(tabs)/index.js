import {
  Text,
  TouchableOpacity,
  View,
  StatusBar,
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const statusBarHeight = StatusBar.currentHeight;

  const { username } = useSelector((state) => state.user);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className="flex-1 bg-base"
        style={{
          marginTop: Platform.OS == "android" ? statusBarHeight : 0,
        }}
      >
        <View className="flex-row items-center justify-between px-5 border-b border-b-neutral-400 pb-3">
          <Greeting username={username} />
          <Icon name="person-circle-outline" size={44} color={"gray"} />
        </View>

        <CustomButton
          onPress={handleLogOut}
          styles="mt-5 bg-red-500 items-center py-2.5 rounded-md"
        >
          <Text>Logga ut</Text>
        </CustomButton>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;
