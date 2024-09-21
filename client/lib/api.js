import axios from "axios";
import { API_URL, ordinaryTimes, redDaysTimes } from "./constants";
import { isSunday } from "date-fns";

export const getBookingsByDate = async (date) => {
  const { data } = await axios.get(`${API_URL}/booking/date/${date}`);
  return data;
};

export const getBookingsByUserId = async (user_id) => {
  const { data } = await axios.get(`${API_URL}/booking/${user_id}`);
  return data;
};

export const getUpcomingBookings = async (user_id) => {
  const { data } = await axios.get(`${API_URL}/booking/upcoming/${user_id}`);
  return data;
};

export const postBooking = async (bookingData) => {
  const { obj, selectedDate, user_id } = bookingData;

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

  const res = await axios.post(`${API_URL}/booking`, newBooking);

  if (res.status !== 200) {
    throw new Error("Bokningen misslyckades");
  }

  return res;

  // const startDateStr = `${selectedDate}T${obj.time.split(" - ")[0]}`;
  // const endDateStr = `${selectedDate}T${obj.time.split(" - ")[1]}`;

  // console.log(formatISO(startDateStr, { representation: "" }));
  // console.log(endDateStr);
};
