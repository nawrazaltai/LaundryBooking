import {
  Text,
  TouchableOpacity,
  Image,
  View,
  StatusBar as StatBar,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Greeting from "../../components/greeting/Greeting";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/button/CustomButton";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import joy from "../../assets/joy1.png";

const Dashboard = () => {
  const dispatch = useDispatch();
  const statusBarHeight = StatBar.currentHeight + 10;
  const { firstName } = useSelector((state) => state.user.user);
  const times = [];

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
          <Greeting username={firstName} />
          <Link href={"/../profile"} asChild>
            <Icon name="person-circle-outline" size={44} color={"#F5F5F5"} />
          </Link>
        </View>

        <View className="flex-1 bg-white rounded-t-2xl items-center">
          {!times.length && (
            <View className="my-auto items-center">
              <Image
                source={joy}
                className="w-[400px] h-[290px]"
                resizeMode="contain"
              />
              <Text className="text-base font-light tracking-wider mt-[-35px]">
                Du har inga bokade tvättider
              </Text>

              <Link href={"/times?initialPage=0"} asChild>
                <TouchableOpacity className="flex-row items-center justify-center mt-2.5 gap-x-2">
                  <Text className="text-accent text-lg font-bold ">
                    Boka tvättid nu
                  </Text>
                  <Icon
                    name="arrow-forward-outline"
                    color={"#F99417"}
                    size={20}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;
