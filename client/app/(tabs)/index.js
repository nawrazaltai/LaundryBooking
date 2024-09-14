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
import { useFetchBookingsByUserId } from "../../hooks/booking/useBookings";
import { isToday, isTomorrow } from "date-fns";
import { ordinaryTimes, redDaysTimes } from "../../lib/constants";
import { logout } from "../redux/features/user/userSlice";

const Dashboard = () => {
  const statusBarHeight = StatBar.currentHeight + 10;
  const { _id: user_id, firstName } = useSelector((state) => state.user.user);
  const [nearestBooking, setNearestBooking] = useState(null);

  const { data, isLoading, error } = useFetchBookingsByUserId(user_id);

  useEffect(() => {
    // const upcomingBookings = data?.bookings
    //   .filter((booking) => new Date(booking.date) >= new Date(booking.date))
    //   .sort((a, b) => new Date(b.date) - new Date(a.date))
    //   .slice(0, 2)
    //   .reverse();

    if (data) {
      const sortedBookings = data?.bookings.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      const upcomingBookings = sortedBookings
        ?.filter((d) => new Date(d.date) >= new Date())
        .reverse();

      setNearestBooking(upcomingBookings?.slice(0, 2));
    }
    // console.log(reversed.slice(0, 2));
  }, [data]);

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
            <View className="px-4 py-2.5 flex-1 w-full rounded-2xl">
              <Text className="text-2xl font-interMedium py-2">
                Kommande tvättider
              </Text>
              {nearestBooking?.map((b) => {
                return (
                  <BookingCard booking={b} />
                  // <View key={b._id}>
                  //   <Text>{b.date}</Text>
                  // </View>
                );
              })}
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Dashboard;

const BookingCard = (booking) => {
  const { date, session_idx } = booking.booking;

  if (isTomorrow(new Date(date)))
    return (
      <View className="w-full">
        <Text className="text-xl">Imorgon</Text>

        <Text>{ordinaryTimes[session_idx].time}</Text>
      </View>
    );
};
