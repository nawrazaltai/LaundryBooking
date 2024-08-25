import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useFetchBookingsByDate from "../../hooks/booking/useBookings";
// import useTodos from "../../hooks/booking/useBookings";
import { ordinaryTimes, redDaysTimes } from "../../lib/constants";

const Test = () => {
  const { data, isLoading } = useFetchBookingsByDate("2024-08-25");
  const user_id = "0";

  if (isLoading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-xl text-white">Loading....</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <View>
        {data.bookings ? (
          data.bookings?.map((b) => {
            return (
              <View key={b._id}>
                <Text>{b.session_idx}</Text>
              </View>
            );
          })
        ) : (
          <Text>Inga tider för valt datum</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({});
