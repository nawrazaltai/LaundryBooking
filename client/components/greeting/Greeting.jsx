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
  const date = new Date();

  const formattedDate = formatDateToSwedish(date);

  useEffect(() => {
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
  }, []);

  return (
    <View className="flex flex-row items-center">
      <Icon name={icon} size={38} color="#4D4C7D" />

      <View className="ml-2.5">
        <Text className="text-lg text-secondary font-bold">
          {greeting}, {username}
        </Text>
        <View>
          <Text className="text-secondary font-light">{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
};

export default Greeting;
