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
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

const UpcomingBookingCard = (booking) => {
  const { start_date, session_idx, _id: id } = booking.booking;

  const getSessionTime = (date) => {
    if (isSunday(date)) {
      return redDaysTimes[session_idx].time;
    }
    return ordinaryTimes[session_idx].time;
  };

  const formatMonth = () => {
    let shortMonth = format(start_date, "LLL", { locale: sv });
    return shortMonth.replace(".", "");
  };

  const formatDate = (date) => {
    const now = new Date();
    const targetDate = new Date(start_date);

    const zonedTime = toZonedTime(targetDate, "Europe/Stockholm");

    if (isToday(targetDate)) {
      return `Idag ${format(zonedTime, "HH:mm")}`;
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
    <View className="flex-row border border-gray-200 overflow-hidden rounded-lg h-[110px] shadow-lg shadow-gray-500 bg-white">
      <View className="flex-col items-center border-r border-r-0.5 border-r-gray-300 justify-center px-5 bg-secondary">
        <Text className="font-interSemi text-2xl text-white">
          {new Date(start_date).getDate()}
        </Text>
        <Text className="font-interRegular text-white">{formatMonth()}</Text>
      </View>

      <View className="flex-1 justify-center pl-4 gap-2.5">
        <View className="flex-row items-end">
          <MaterialCommunityIcons
            name="calendar-today"
            size={20}
            color={"gray"}
          />
          <Text className="font-interSemi pl-2 capitalize text-gray-500">
            {formatDate(start_date)}
          </Text>
        </View>

        <View className="flex-row items-end">
          <MaterialCommunityIcons name="clock" size={20} color={"gray"} />
          <Text className="font-interSemi pl-2 text-gray-600">
            {getSessionTime(start_date)}
          </Text>
        </View>

        <View className="flex-row items-end">
          <MaterialCommunityIcons
            name="washing-machine"
            size={20}
            color={"gray"}
          />
          <Text className=" font-interSemi pl-2 text-gray-600">
            Tvättstuga 1
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UpcomingBookingCard;
