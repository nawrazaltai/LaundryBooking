import {
  isToday,
  isTomorrow,
  format,
  differenceInDays,
  isBefore,
  isAfter,
  differenceInMilliseconds,
  differenceInCalendarDays,
} from "date-fns";
import sv from "date-fns/locale/sv"; // Svensk lokalisation
import { useEffect, useState } from "react";
import { Text, TouchableWithoutFeedback } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "react-native-vector-icons";

const Test = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaProvider className="flex-1 items-center">
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={32}
                  className="pl-1"
                />
              </TouchableWithoutFeedback>
            );
          },
          headerShown: true,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "black",
            fontFamily: "Inter_700Bold",
          },
        }}
      />
    </SafeAreaProvider>
  );
};

export default Test;
