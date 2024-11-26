import { useQuery } from "@tanstack/react-query";
import {
  cancelBooking,
  getBookingsByDate,
  getBookingsByUserId,
  getUpcomingBookings,
} from "../../lib/api";

export const useFetchBookingsByDate = (date) => {
  return useQuery({
    queryKey: ["bookings", date],
    queryFn: () => getBookingsByDate(date),
    staleTime: 0,
  });
};

export const useFetchBookingsByUserId = (user_id) => {
  return useQuery({
    queryKey: ["userBookings", user_id],
    queryFn: () => getBookingsByUserId(user_id),
    // staleTime: 0,
  });
};

export const useFetchUpcomingBookings = (user_id) => {
  return useQuery({
    queryKey: ["upcomingBookings", user_id],
    queryFn: () => getUpcomingBookings(user_id),
    // staleTime: 0,
  });
};
