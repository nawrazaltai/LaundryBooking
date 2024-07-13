import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Calendar } from "react-native-calendars";

const Times = () => {
  const [timeslots, setTimeSlots] = useState(null);
  const [selected, setSelected] = useState(null);

  // const [date, setDate] = useState();
  const convertDay = (num) => {
    const daysArr = [
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
      "Söndag",
    ];

    return daysArr[num];
  };

  const generateSlots = (date) => {
    const day = convertDay(new Date(date).getDay());

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

  const { user } = useSelector((state) => state.user);
  // console.log(new Date().toLocaleDateString());

  useEffect(() => {
    // const today = new Date().toISOString();
    generateSlots(new Date());
  }, []);

  const handleDateSelection = (date) => {
    setSelected(date.dateString);
  };

  return (
    <SafeAreaProvider className="bg-white">
      <SafeAreaView className="flex-1 items-center justify-center">
        {/* <Text>{date}</Text> */}

        <View className="flex-1 w-full">
          <Calendar
            markedDates={{ [selected]: { selected: true } }}
            showWeekNumbers={true}
            onDayPress={handleDateSelection}
            theme={{ selectedDayBackgroundColor: "#00adf5" }}
          />
        </View>
        {/* {timeslots?.map((slot) => {
          return (
            <TouchableOpacity
            key={slot.id}
            disabled={!slot.available}
            className={`border p-8 bg-white rounded-md w-full ${
              !slot.available && "opacity-30"
              }`}
              >
              <Text>{slot.time}</Text>
              </TouchableOpacity>
              );
              })} */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Times;
