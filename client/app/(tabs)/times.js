import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar as StatBar,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import PagerView from "react-native-pager-view";
import {
  formatDistance,
  formatDistanceStrict,
  format,
  isToday,
  isTomorrow,
} from "date-fns";
import { sv } from "date-fns/locale";
import { useGlobalSearchParams } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  useEvent,
  withTiming,
  runOnJS,
  useHandler,
  withSpring,
} from "react-native-reanimated";
import "react-native-reanimated";
import LaundryCalendar from "../../components/times/LaundryCalendar";
import { useFocusEffect } from "expo-router";

const Times = () => {
  // const { user } = useSelector((state) => state.user);

  useFocusEffect(
    useCallback(() => {
      // console.log("Loaded");
      return () => {};
    }, [])
  );

  return (
    <SafeAreaProvider className="w-full bg-white">
      <StatusBar />
      <SafeAreaView className="flex-1">
        <LaundryCalendar key="1" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Times;

// const formatDate = (date) => {
//   if (isToday(date)) {
//     console.log("idag");
//     return;
//   }

//   if (isTomorrow(date)) {
//     console.log("imorgon");
//     return;
//   }

//   console.log(
//     formatDistanceStrict(new Date(date), new Date(), {
//       addSuffix: true,
//       unit: "day",
//       locale: sv,
//     })
//   );
// };

// useEffect(() => {
//   formatDate("2024-07-21");
// }, []);
