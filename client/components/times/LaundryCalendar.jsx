import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import { format, isSunday, parseISO } from "date-fns";
import { sv } from "date-fns/locale";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFetchBookingsByDate } from "../../hooks/booking/useBookings";
import { ordinaryTimes, redDaysTimes } from "../../lib/constants";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { cancelBooking, postBooking } from "../../lib/api";
import { useQueryClient } from "@tanstack/react-query";

LocaleConfig.locales["sv"] = {
  monthNames: [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
  ],
  monthNamesShort: [
    "jan",
    "feb",
    "mar",
    "apr",
    "maj",
    "jun",
    "jul",
    "aug",
    "sep",
    "okt",
    "nov",
    "dec",
  ],
  dayNames: [
    "söndag",
    "måndag",
    "tisdag",
    "onsdag",
    "torsdag",
    "fredag",
    "lördag",
  ],
  dayNamesShort: ["sön", "mån", "tis", "ons", "tor", "fre", "lör"],
  today: "i dag",
};
LocaleConfig.defaultLocale = "sv";

const LaundryCalendar = () => {
  const [timeslots, setTimeSlots] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );
  const [formattedDate, setFormattedDate] = useState();
  const { data, error, isLoading } = useFetchBookingsByDate(selectedDate);
  const { _id: user_id } = useSelector((state) => state.user.user);

  let bookingView;

  const setIsBookedAndBookedBy = (arr) => {
    const updateTimeSlots = arr.map((d) => {
      const isBooked = data?.bookings?.some(
        (booking) => booking?.session_idx == d.id
      );

      let isBookedBy = null;
      let booking_id = null;

      if (isBooked) {
        const booking = data?.bookings?.find(
          (booking) => booking.session_idx == d.id
        );
        isBookedBy = booking?.user_id;
        booking_id = booking?._id;
      }

      return {
        ...d,
        available: !isBooked,
        bookedBy: isBookedBy,
        booking_id: booking_id,
      };
    });

    return updateTimeSlots;
  };

  const generateSlots = (date) => {
    const redDays = ["2024-07-13"];

    if (isSunday(date) || redDays.includes(date.toLocaleDateString())) {
      const result = setIsBookedAndBookedBy(redDaysTimes);
      setTimeSlots(result);
    } else {
      const result = setIsBookedAndBookedBy(ordinaryTimes);
      setTimeSlots(result);
    }
  };

  useEffect(() => {
    generateSlots(new Date(selectedDate));

    const formatted = format(selectedDate, "EEEE, d MMMM.", { locale: sv });
    setFormattedDate(formatted);
  }, [selectedDate, data]);

  const handleDateSelection = (date) => {
    setSelectedDate(date.dateString);
  };

  const client = useQueryClient();
  const useBookAppointment = useMutation({
    mutationFn: (bookingData) => {
      return postBooking(bookingData);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["bookings"] });
      client.invalidateQueries({ queryKey: ["userBookings"] });
      client.invalidateQueries({ queryKey: ["upcomingBookings"] });
      Alert.alert("Bokning bekräftad", "Din bokning är bekräftad.");
    },
    onError: () => {
      Alert.alert("Något gick fel", "Bokningen misslyckades, prova igen.");
    },
  });

  const useCancelAppointment = useMutation({
    mutationFn: (bookingData) => {
      return cancelBooking(bookingData);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["bookings"] });
      client.invalidateQueries({ queryKey: ["userBookings"] });
      client.invalidateQueries({ queryKey: ["upcomingBookings"] });
      Alert.alert("Avbokning bekräftad", "Din avbokning är bekräftad.");
    },
    onError: () => {
      Alert.alert("Något gick fel", "Avbokningen misslyckades, prova igen.");
    },
  });

  const handlePress = ({
    available,
    item,
    selectedDate,
    user_id,
    bookedBy,
    booking_id,
  }) => {
    if (!available) {
      bookedBy == user_id
        ? useCancelAppointment.mutate({ booking_id, user_id })
        : null;
      return;
    }

    useBookAppointment.mutate({ obj: item, user_id, selectedDate });
  };

  const renderItem = ({ item }) => {
    return (
      <View
        key={item.id}
        className={`flex-1 py-5 mx-5 px-1.5 flex-row overflow-hidden items-center bg-white justify-center rounded-md border border-gray-200 shadow-sm shadow-gray-700`}
      >
        <View className="">
          <Icon name="washing-machine" color={"#64748b"} size={56} />
        </View>

        <View className="flex-1 justify-center h-full">
          <Text className="text-slate-500 text-sm font-interMedium tracking-wider">
            Tvättid {item.id + 1}
          </Text>
          <Text className="font-interBold text-slate-600 text-base">
            {item.time}
          </Text>

          {/* {item.bookedBy && (
            <View className="flex-row gap-x-0.5 items-center">
              <Icon name="account" size={14} color={"gray"} />
              <Text className="text-slate-400 text-sm font-interMedium max-w-[85%]">
                {item.bookedBy}
              </Text>
            </View>
          )} */}
        </View>

        <TouchableOpacity
          onPress={() =>
            handlePress({
              available: item?.available,
              item,
              selectedDate,
              user_id,
              bookedBy: item?.bookedBy,
              booking_id: item?.booking_id,
            })
          }
          disabled={!item.available && item.bookedBy !== user_id}
          className={`px-5 py-2 mx-0.5 items-center rounded-full justify-center ${
            !item.available ? "bg-[#af210e]" : "bg-[#41B06E]"
          }`}
        >
          {item.available && (
            <Text className="text-white font-interBold">Boka</Text>
          )}

          {!item.available ? (
            item.bookedBy == user_id ? (
              <Text className="text-white font-interBold">Avboka</Text>
            ) : (
              <Text className="text-white font-interBold">Bokad</Text>
            )
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  if (isLoading) {
    bookingView = <ActivityIndicator size={"small"} color={"black"} />;
  }

  if (error) {
    bookingView = (
      <Text className="pl-5 text-lg font-interSemi">
        Ett fel uppstod, försök igen senare.
      </Text>
    );
  }

  if (!error && !isLoading) {
    bookingView = (
      <FlatList
        data={timeslots}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{
          gap: 10,
          width: "100%",
          marginVertical: 5,
          paddingBottom: 50,
        }}
      />
    );
  }

  return (
    <View className="flex-1">
      <Calendar
        markedDates={{
          [new Date(selectedDate).toLocaleDateString()]: { selected: true },
        }}
        showWeekNumbers={true}
        minDate={new Date().toDateString()}
        firstDay={1}
        onDayPress={handleDateSelection}
        theme={{
          selectedDayBackgroundColor: "#F99417",
          arrowColor: "#000",
          todayTextColor: "#F99417",
          dayTextColor: "#4D4C7D",
          selectedDayTextColor: "#FFF",
          calendarBackground: "#FFF",
          monthTextColor: "#000",
        }}
        style={{ backgroundColor: "#FFF" }}
      />
      <View className="flex-1 w-full bg-neutral-50 border-t border-t-zinc-300 mt-2.5">
        <View className="pt-4 mx-5">
          <View className="flex-row items-end gap-x-0.5">
            <Text className="capitalize text-xl text-slate-700 font-interBold tracking-wide">
              {formattedDate}
            </Text>
          </View>

          <View className="flex-row  pt-1">
            <Text className="text-base font-interMedium text-slate-600 tracking-wide">
              Tvättider för valt datum
            </Text>
          </View>
        </View>

        <View className="flex-1 mt-3">{bookingView}</View>
      </View>
    </View>
  );
};

export default LaundryCalendar;
