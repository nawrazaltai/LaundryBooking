import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["sv"] = {
  monthNames: [
    "januari",
    "februari",
    "mars",
    "april",
    "maj",
    "juni",
    "juli",
    "augusti",
    "september",
    "oktober",
    "november",
    "december",
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

const convertDay = (num) => {
  const daysArr = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
    "",
  ];

  return daysArr[num];
};
const convertMonth = (num) => {
  const monthsArr = [
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
  ];

  return monthsArr[num];
};

const LaundryCalendar = () => {
  const [timeslots, setTimeSlots] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );
  const [day, setDay] = useState("Idag");
  const [month, setMonth] = useState(convertMonth(new Date().getMonth()));
  const [date, setDate] = useState(new Date().getDate());

  const generateSlots = (date) => {
    const day = convertDay(new Date(date).getDay());
    // console.log(day);

    const ordinaryTimes = [
      { id: 0, time: "07:00 - 12:00", available: true },
      { id: 1, time: "12:00 - 17:00", available: false },
      { id: 2, time: "17:00 - 22:00", available: false },
    ];

    const redDaysTimes = [
      { id: 0, time: "09:00 - 14:00", available: true },
      { id: 1, time: "14:00 - 19:00", available: false },
    ];

    const redDays = ["2024-07-13"];

    if (day === "Söndag" || redDays.includes(date.toLocaleDateString())) {
      setTimeSlots(redDaysTimes);
      return;
    } else {
      setTimeSlots(ordinaryTimes);
    }

    // if ()
  };

  useEffect(() => {
    // const today = new Date().toISOString();
    generateSlots(new Date());
  }, []);

  const handleDateSelection = (date) => {
    setSelectedDate(date.dateString);
    setDay(convertDay(new Date(date.dateString).getDay()));
    setDate(date.day);
    setMonth(convertMonth(date.month - 1));
  };

  return (
    <View className="flex-1">
      <Calendar
        markedDates={{ [selectedDate]: { selected: true } }}
        showWeekNumbers={true}
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
      <View className="flex-1 w-full bg-zinc-50 border-t border-t-zinc-300 mt-2.5">
        <ScrollView className="px-5 pb-10">
          {timeslots?.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              className="w-full flex-row items-center justify-center rounded-md bg-white border border-gray-200 shadow-sm shadow-gray-400 h-24  my-3"
            >
              <View className="flex-1 items-start justify-center px-2 bg-white h-full">
                <Text>{slot.time}</Text>
              </View>
              <View className="px-8 bg-green-200 h-full items-center justify-center">
                <Text>Boka</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default LaundryCalendar;
