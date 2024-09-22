import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  differenceInCalendarDays,
  differenceInDays,
  format,
  isSunday,
  isToday,
  isTomorrow,
} from "date-fns";
import { ordinaryTimes, redDaysTimes } from "../../lib/constants";
import { sv } from "date-fns/locale";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const UpcomingBookingCard = (booking) => {
  const { date, session_idx, _id: id } = booking.booking;

  const getSessionTime = () => {
    if (isSunday(date)) {
      return redDaysTimes[session_idx].time;
    }
    return ordinaryTimes[session_idx].time;
  };

  const formatMonth = () => {
    let shortMonth = format(date, "LLL", { locale: sv });
    return shortMonth.replace(".", "");
  };

  const formatDate = (date) => {
    const now = new Date();
    const targetDate = new Date(date);

    if (isToday(targetDate)) {
      return `Idag ${format(targetDate, "HH:mm")}`;
    }

    if (isTomorrow(targetDate)) {
      return `Imorgon`;
    }

    const daysDifference = differenceInCalendarDays(targetDate, now);

    if (daysDifference >= 2) {
      return `${format(date, "eeeeeee", {
        locale: sv,
      })}, om ${daysDifference} dagar`;
    }
  };

  return (
    <View className="mt-2.5">
      <View className="flex-row border border-gray-400 overflow-hidden rounded-md h-[100px] bg-neutral-50">
        <View className="flex-col bg-secondary  items-center justify-center px-5">
          <Text className="font-interSemi text-2xl text-neutral-50">
            {new Date(date).getDate()}
          </Text>
          <Text className="font-interRegular text-neutral-50">
            {formatMonth()}
          </Text>
        </View>

        <View className="flex-1 justify-center pl-4 gap-2">
          <View className="flex-row items-end">
            <MaterialCommunityIcons
              name="calendar-today"
              size={20}
              color={"gray"}
            />
            <Text className="font-interSemi pl-2 capitalize text-gray-600">
              {formatDate(date)}.
            </Text>
          </View>

          <View className="flex-row items-end">
            <MaterialCommunityIcons name="clock" size={20} color={"gray"} />
            <Text className="font-interSemi pl-2 text-gray-600">
              {getSessionTime(date)}.
            </Text>
          </View>

          <View className="flex-row items-end">
            <MaterialCommunityIcons
              name="washing-machine"
              size={20}
              color={"gray"}
            />
            <Text className=" font-interSemi pl-2 text-gray-600">
              Tvättstuga 1.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default UpcomingBookingCard;
