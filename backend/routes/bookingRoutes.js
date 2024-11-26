import express from "express";
import {
  cancelBooking,
  getBookingsByDate,
  getBookingsByUserId,
  getUpcomingBookingsByUser,
  postBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", postBooking);
router.get("/date/:date", getBookingsByDate);
router.get("/upcoming/:user_id", getUpcomingBookingsByUser);
router.get("/:user_id", getBookingsByUserId);
router.delete("/:booking_id", cancelBooking);

export default router;
