import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  differenceInCalendarDays,
  differenceInDays,
  format,
  isToday,
  isTomorrow,
} from "date-fns";
import { ordinaryTimes, redDaysTimes } from "../../lib/constants";
import { sv } from "date-fns/locale";

const UpcomingBookingCard = (booking) => {
  const { date, session_idx, _id: id } = booking.booking;

  const getSessionTime = () => {};

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
      return `${format(date, "eeee", {
        locale: sv,
      })}, om ${daysDifference} dagar`;
    }
  };

  return (
    <View className="mt-2.5">
      <Text className="font-interRegular text-lg capitalize">
        {formatDate(date)}
      </Text>

      <View className="flex-row border border-gray-200 overflow-hidden rounded-md my-1.5 h-[100px]">
        <View className="flex-col border-r bg-gray-50 border-r-gray-200 items-center justify-center px-5">
          <Text className="font-interSemi text-2xl">
            {new Date(date).getDate()}
          </Text>
          <Text className="font-interRegular">{formatMonth()}</Text>
        </View>
      </View>
    </View>
  );
};

export default UpcomingBookingCard;

const styles = StyleSheet.create({});
