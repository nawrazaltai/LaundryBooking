import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useState, useEffect } from "react";

const formatDateToSwedish = (date) => {
  return new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).format(date);
};

const Greeting = ({ username }) => {
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState("");
  const [date, setDate] = useState(new Date());

  const formattedDate = formatDateToSwedish(date);

  const updateGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("God morgon");
      setIcon("sunny");
    } else if (currentHour < 18) {
      setGreeting("God eftermiddag");
      setIcon("partly-sunny");
    } else {
      setGreeting("God kväll");
      setIcon("moon");
    }
  };

  useEffect(() => {
    updateGreeting();
    const now = new Date();
    const hours = now.getHours();
    let nextUpdate;

    if (hours < 12) {
      nextUpdate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        12,
        0,
        0,
        0
      );
    } else if (hours < 18) {
      nextUpdate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        18,
        0,
        0,
        0
      );
    } else {
      nextUpdate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0
      );
    }

    // console.log("Updated");
    const timeToNextUpdate = nextUpdate - now;

    const timeout = setTimeout(() => {
      updateGreeting();
    }, timeToNextUpdate);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <View className="flex flex-row items-center">
      <Icon name={icon} size={38} color="#F5F5F5" />

      <View className="ml-2.5">
        <Text className="text-base text-white font-interBold">
          {greeting}, {username}
        </Text>
        <View>
          <Text className="text-white font-interRegular">{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default Greeting;
