import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  formatDistanceStrict,
  formatDistanceToNow,
  formatDistanceToNowStrict,
  formatISO,
  isSunday,
  parse,
  parseISO,
} from "date-fns";
import { sv } from "date-fns/locale";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";
import { formatInTimeZone } from "date-fns-tz";
import axios from "axios";
import { API_URL } from "../../lib/constants";
import useFetchBookingsByDate from "../../hooks/booking/useBookings";
import { ordinaryTimes, redDaysTimes } from "../../lib/constants";
import { useSelector } from "react-redux";

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

      const isBookedBy =
        isBooked &&
        data.bookings.find((booking) => booking.session_idx == d.id)?.user_id;

      return { ...d, available: !isBooked, bookedBy: isBookedBy };
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

    const d = parseISO(selectedDate);
    const formatted = format(d, "EEEE, d MMM", { locale: sv });
    setFormattedDate(formatted);
  }, [selectedDate, data]);

  const handleDateSelection = (date) => {
    setSelectedDate(date.dateString);
  };

  // const timeSlot = "07:00 - 12:00";
  // const [startTimeStr, endTimeStr] = timeSlot.split(" - ");

  // const test = `${selectedDate}T${startTimeStr}`;

  // const tz = formatInTimeZone(
  //   `${selectedDate}T${startTimeStr}`,
  //   "Europe/Stockholm",
  //   "yyyy-MM-dd HH:mm"
  // );

  // console.log(tz);

  // const result = formatISO(new Date(test), { representation: "basic" });
  // console.log(result);

  // console.log(formatDistanceToNowStrict(tz, { addSuffix: true }));

  const handleBooking = async (obj) => {
    let session_idx;
    if (isSunday(selectedDate)) {
      session_idx = redDaysTimes[obj.id].id;
    } else {
      session_idx = ordinaryTimes[obj.id].id;
    }

    const newBooking = {
      date: selectedDate,
      user_id,
      session_idx,
    };

    try {
      const postBooking = await axios.post(`${API_URL}/booking`, newBooking);

      if (postBooking.status == 200) {
        const insertedBooking = postBooking.data.booking;

        setTimeSlots((prevTimeSlots) =>
          prevTimeSlots.map((slot) =>
            slot.id == insertedBooking.session_idx
              ? {
                  ...slot,
                  available: !slot.available,
                  bookedBy: insertedBooking.user_id,
                }
              : slot
          )
        );

        Alert.alert("Bokning bekräftad", "Din bokning har lyckats.");
      }
    } catch (error) {
      Alert.alert(
        "Bokning misslyckades",
        "Ett fel inträffade vid bokningen, prova igen senare."
      );
    }

    // const startDateStr = `${selectedDate}T${obj.time.split(" - ")[0]}`;
    // const endDateStr = `${selectedDate}T${obj.time.split(" - ")[1]}`;

    // console.log(formatISO(startDateStr, { representation: "" }));
    // console.log(endDateStr);
  };

  if (isLoading) {
    bookingView = <ActivityIndicator size={"small"} color={"black"} />;
  }

  if (error) {
    bookingView = <Text>Ett fel uppstod, försök igen senare.</Text>;
  }

  if (!error && !isLoading) {
    bookingView = (
      <View>
        {timeslots?.map((t) => {
          return (
            <View
              key={t.id}
              className={`w-full flex-row overflow-hidden items-center bg-white justify-center rounded-md h-[88px] my-3 border border-gray-200 shadow-sm shadow-gray-700 px-1`}
            >
              <View className="">
                <Icon name="washing-machine" color={"#64748b"} size={56} />
              </View>

              <View className="flex-1 justify-center h-full">
                <Text className="text-slate-500 text-sm font-medium tracking-wider">
                  Tvättid {t.id + 1}
                </Text>
                <Text className="font-bold text-slate-600 text-base">
                  {t.time}
                </Text>

                {t.bookedBy && (
                  <View className="flex-row gap-x-0.5 items-center">
                    <Icon name="account" size={14} color={"gray"} />
                    <Text className="text-slate-400 text-sm font-medium">
                      {t.bookedBy}
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                onPress={() => handleBooking(t)}
                disabled={!t.available}
                className={`px-5 py-2 mx-0.5 items-center rounded-full justify-center ${
                  !t.available ? "bg-[#af210e]" : "bg-[#41B06E]"
                }`}
              >
                {t.available && (
                  <Text className="text-white font-bold">Boka</Text>
                )}

                {!t.available ? (
                  t.bookedBy == user_id ? (
                    <Text className="text-white font-bold">Avboka</Text>
                  ) : (
                    <Text className="text-white font-bold">Bokad</Text>
                  )
                ) : null}
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Calendar
        markedDates={{ [selectedDate]: { selected: true } }}
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
            <Icon name="calendar-month-outline" size={35} color={"#333"} />
            <Text className="capitalize text-xl text-slate-700 font-bold tracking-wide">
              {formattedDate}
            </Text>
          </View>

          <View className="flex-row pl-0.5 pt-1">
            <Text className="text-base font-medium text-slate-600">
              Tillgängliga tvättider för valt datum
            </Text>
          </View>
        </View>

        <ScrollView className="px-5 py-2 pb-10">{bookingView}</ScrollView>
      </View>
    </View>
  );
};

export default LaundryCalendar;
