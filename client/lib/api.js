import axios from "axios";
import { API_URL } from "./constants";

export const getBookingsByDate = async (date) => {
  const { data } = await axios.get(`${API_URL}/booking/date/${date}`);
  return data;
};
