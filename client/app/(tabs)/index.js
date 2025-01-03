import {
  Text,
  TouchableOpacity,
  Image,
  View,
  StatusBar as StatBar,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  Button,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Greeting from "../../components/greeting/Greeting";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../../components/button/CustomButton";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import joy from "../../assets/joy1.png";
import {
  useFetchBookingsByUserId,
  useFetchUpcomingBookings,
} from "../../hooks/booking/useBookings";
import { formatDistanceStrict, isToday, isTomorrow } from "date-fns";
import { ordinaryTimes, redDaysTimes } from "../../lib/constants";
import { logout } from "../redux/features/user/userSlice";
import UpcomingBookingCard from "../../components/times/UpcomingBookingCard";

const Dashboard = () => {
  const statusBarHeight = StatBar.currentHeight + 15;
  const { _id: user_id, firstName } = useSelector((state) => state?.user?.user);
  const [nearestBooking, setNearestBooking] = useState(null);

  const { data, isLoading, error } = useFetchUpcomingBookings(user_id);

  useEffect(() => {
    setNearestBooking(data?.bookings);
  }, [data]);

  const renderItem = ({ item }) => {
    return (
      <UpcomingBookingCard
        item={item}
        onPress={() => setSelectedId(item?._id)}
        booking={item}
      />
    );
  };
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <SafeAreaView
        className="flex-1 bg-primary"
        style={{
          paddingTop: Platform.OS == "android" ? statusBarHeight : 0,
        }}
      >
        <View className="flex-row items-center justify-between px-5 pb-5">
          <Greeting username={firstName} />
          <Link href={"/profile"} asChild>
            <Icon name="person-circle-outline" size={44} color={"#F5F5F5"} />
          </Link>
        </View>
        <View className="flex-1 bg-white rounded-t-2xl items-center">
          {!nearestBooking?.length && !isLoading ? (
            <View className="my-auto items-center">
              <Image
                source={joy}
                className="w-[400px] h-[290px]"
                resizeMode="contain"
              />
              <Text className="text-base font-interLight tracking-wider mt-[-35px]">
                Du har inga bokade tvättider
              </Text>
              <Link href={"/times"} asChild>
                <TouchableOpacity className="flex-row items-center justify-center mt-2.5 gap-x-2">
                  <Text className="text-accent text-lg font-interBold">
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
          ) : (
            <View className="flex-1 w-full rounded-t-2xl bg-violet-50">
              <View className="pt-5  flex flex-row items-end justify-between mx-3.5 border-b border-b-gray-200 mb-3 pb-1">
                <Text className="text-xl font-interBold">
                  Mina kommande tvättider
                </Text>
                {/* <Link href={"/(bookings)"} asChild> */}
                <TouchableWithoutFeedback>
                  <Text className="text-base font-interBold text-gray-700">
                    Se alla
                  </Text>
                </TouchableWithoutFeedback>
                {/* </Link> */}
              </View>
              <FlatList
                data={nearestBooking}
                keyExtractor={(b) => b?._id}
                renderItem={renderItem}
                contentContainerStyle={{
                  gap: 15,
                  display: "flex",
                  width: "100%",
                  paddingHorizontal: 12,
                }}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;
