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
import { format, parseISO } from "date-fns";
import { sv } from "date-fns/locale";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
  const [formattedDate, setFormattedDate] = useState();

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
    generateSlots(new Date(selectedDate));

    const d = parseISO(selectedDate);
    const formatted = format(d, "EEE, d MMM", { locale: sv });
    setFormattedDate(formatted);
  }, [selectedDate]);

  const handleDateSelection = (date) => {
    setSelectedDate(date.dateString);
    // setDay(convertDay(new Date(date.dateString).getDay()));
    // setDate(date.day);
    // setMonth(convertMonth(date.month - 1));
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
      <View className="flex-1 w-full bg-gray-50 border-t border-t-zinc-300 mt-2.5">
        <View className="pt-4 mx-5">
          <View className="flex-row items-end gap-x-0.5">
            <Icon name="calendar-month-outline" size={29} color={"#333"} />
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

        <ScrollView className="px-5 py-2 pb-10">
          {timeslots?.map((slot) => (
            <View
              key={slot.id}
              className={` ${
                slot.id == 2 ? "opacity-60 bg-red-100" : "bg-white"
              } w-full flex-row overflow-hidden items-center justify-center rounded-md h-[86px] my-3 border border-gray-200 shadow-sm shadow-black`}
            >
              <View>
                <Icon name="washing-machine" color={"#4D4C7D"} size={56} />
              </View>
              <View className="flex-1 justify-center h-full">
                <Text className="text-slate-500 text-sm font-medium tracking-wider">
                  Tvättid {slot.id + 1}
                </Text>
                <Text className="font-bold text-slate-600 text-base">
                  {slot.time}
                </Text>
                {/* <Text className="">Tvättstuga 1</Text> */}
              </View>

              <TouchableOpacity
                disabled={slot.id == 2}
                className={`px-5 py-2 mx-2.5 items-center rounded-full justify-center ${
                  slot.id == 2 ? "bg-[#b04541]" : "bg-[#41B06E]"
                }`}
              >
                {slot.id == 2 ? (
                  <Text className="text-white font-bold">Uppbokad</Text>
                ) : (
                  <Text className="text-white font-bold">Boka</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default LaundryCalendar;
