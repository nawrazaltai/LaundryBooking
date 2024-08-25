import express from "express";
import {
  book,
  getBookingsByDate,
  getBookingsByUserId,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", book);
router.get("/date/:date", getBookingsByDate);
router.get("/:user_id", getBookingsByUserId);

export default router;
