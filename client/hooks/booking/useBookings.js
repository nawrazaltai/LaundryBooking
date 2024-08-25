import { useQuery } from "@tanstack/react-query";
import { getBookingsByDate } from "../../lib/api";

const useFetchBookingsByDate = (date) => {
  return useQuery({
    queryKey: ["bookings", date],
    queryFn: () => getBookingsByDate(date),
    staleTime: 0,
  });
};

export default useFetchBookingsByDate;
