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
import { SafeAreaView, Text } from "react-native";

export const getBookingStatus = (startDate, endDate) => {
  const now = new Date();

  const start = startDate;
  const end = endDate;

  let offset = now.getTimezoneOffset();
  offset = Math.abs(offset / 60);
  now.setHours(now.getHours() + offset);

  if (isToday(start)) {
    if (isBefore(now, start)) {
      const timeUntilStart = differenceInMilliseconds(start, now);
      return { status: "upcoming", timeUntilStart };
    }
    if (isAfter(now, start) && isBefore(now, end)) {
      return { status: "active" };
    }
  }

  if (isTomorrow(start)) {
    return {
      status: "upcoming",
      timeDescription: `Imorgon`,
    };
  }

  const daysUntilStart = differenceInCalendarDays(start, now);

  if (daysUntilStart !== 0) {
    return {
      status: "upcoming",
      timeDescription: `${daysUntilStart} dagar kvar`,
    };
  }

  return { status: "default" };
};

const BookingTimer = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [status, setStatus] = useState("");
  const [timeDescription, setTimeDescription] = useState("");

  useEffect(() => {
    const updateStatus = () => {
      const bookingStatus = getBookingStatus(startDate, endDate);

      if (bookingStatus.status === "upcoming") {
        if (bookingStatus.timeUntilStart) {
          setTimeLeft(bookingStatus.timeUntilStart);
        }
        if (bookingStatus.timeDescription) {
          setTimeDescription(bookingStatus.timeDescription);
        }
        setStatus("upcoming");
      } else if (bookingStatus.status === "active") {
        setStatus("active");
      } else {
        setStatus("default");
      }
    };

    updateStatus(); // Kör direkt
    const intervalId = setInterval(updateStatus, 1000); // Uppdatera varje sekund

    return () => clearInterval(intervalId);
  }, [startDate, endDate]);

  const formatTimeLeft = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);

    return `${hours} timmar ${minutes} minuter ${seconds} sekunder`;
  };

  if (status === "upcoming" && timeLeft && isToday(new Date(startDate))) {
    return <Text>Tid kvar: {formatTimeLeft(timeLeft)}</Text>;
  }

  if (status === "upcoming" && timeDescription) {
    return <Text>{timeDescription}</Text>;
  }

  if (status === "active") {
    return <Text>Status: Aktiv</Text>;
  }

  return <Text>Ingen aktiv bokning för tillfället.</Text>;
};

const Test = () => {
  let start = new Date("2024-09-21T13:00:00.000Z");
  let end = new Date("2024-09-21T15:00:00.000Z");

  let start2 = new Date("2024-09-22T12:00:00.000Z");
  let end2 = new Date("2024-09-22T17:00:00.000Z");

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      {/* <BookingTimer
        startDate={"2024-09-21T20:00:00.000Z"}
        endDate={"2024-09-22T21:00:00.000Z"}
      /> */}
      <BookingTimer startDate={start} endDate={end} />
      <BookingTimer startDate={start2} endDate={end2} />
    </SafeAreaView>
  );
};

export default Test;
