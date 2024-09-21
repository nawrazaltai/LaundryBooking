import express from "express";
import {
  book,
  getBookingsByDate,
  getBookingsByUserId,
  getUpcomingBookingsByUser,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", book);
router.get("/date/:date", getBookingsByDate);
router.get("/upcoming/:user_id", getUpcomingBookingsByUser);
router.get("/:user_id", getBookingsByUserId);

export default router;
