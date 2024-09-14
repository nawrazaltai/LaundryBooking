import { useQuery } from "@tanstack/react-query";
import { getBookingsByDate, getBookingsByUserId } from "../../lib/api";

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
