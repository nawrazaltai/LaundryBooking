import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useFetchBookingsByUserId } from "../../../hooks/booking/useBookings";

const Item = ({ item }) => {
  return (
    <View className="w-full p-5">
      <Text>{item?.start_date}</Text>
    </View>
  );
};

const Upcoming = () => {
  const { _id: user_id } = useSelector((state) => state?.user?.user);
  const { data, error, isLoading } = useFetchBookingsByUserId(user_id);

  return (
    <View className="py-2 bg-white flex-1">
      <FlatList
        data={data?.bookings}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default Upcoming;
