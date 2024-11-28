import e from "express";
import Booking from "../models/bookingModel.js";

export const postBooking = async (req, res) => {
  const { date, user_id, session_idx } = req.body;

  if (!user_id) {
    return res.status(400).send({ error: "Användar id saknas." });
  }

  try {
    let start_time = "";
    let end_time = "";

    const getDay = new Date(date).getDay();

    if (getDay == 0 || getDay == 6) {
      if (session_idx == "0") {
        start_time = "08";
        end_time = "13";
      } else {
        start_time = "13";
        end_time = "18";
      }
    } else {
      if (session_idx == "0") {
        start_time = "06";
        end_time = "11";
      } else if (session_idx == "1") {
        start_time = "11";
        end_time = "16";
      } else {
        start_time = "16";
        end_time = "21";
      }
    }

    const start_date = new Date(`${date}T${start_time}:00:00.000Z`);
    const end_date = new Date(`${date}T${end_time}:00:00.000Z`);

    const isBooked = await Booking.findOne({
      start_date: start_date,
      session_idx: session_idx,
    });

    if (isBooked) {
      res.status(401).send("Vald tid är redan bokad.");
      return;
    }

    const addBooking = await Booking.create({
      start_date,
      end_date,
      user_id,
      session_idx,
    });

    // console.log(user);
    res.send({ message: "Tiden bokades", booking: addBooking });
  } catch (err) {
    res.status(500).send({ error: "Internal server error" });
  }
};

export const getBookingsByUserId = async (req, res) => {
  const user_id = req.params.user_id;

  if (!user_id) {
    return res.status(400).send({ error: "Användar id saknas." });
  }

  try {
    const bookings = await Booking.find({ user_id });
    res.send({ bookings });
  } catch (error) {
    // console.log(error);
    res.send({ error });
  }
};

export const getUpcomingBookingsByUser = async (req, res) => {
  const user_id = req.params.user_id;
  const today = new Date();

  console.log(user_id);
  try {
    const bookings = await Booking.find({
      user_id: user_id,
      start_date: { $gte: today },
    })
      .sort({ date: 1 })
      .limit(3);

    if (bookings.length) {
      return res.send({ bookings });
    }

    return res.send([]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Serverfel. Kunde inte hämta bokningar." });
  }
};

export const getBookingsByDate = async (req, res) => {
  // console.log("body", req.params.date);

  const date = req.params.date;

  const startOfDay = new Date(`${date}T00:00:00.000Z`);
  const endOfDay = new Date(`${date}T23:59:59.999Z`);

  try {
    const bookings = await Booking.find({
      start_date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (bookings.length) {
      return res.send({ bookings });
    }

    return res.send([]);
  } catch (error) {
    res.send({ error });
  }
};

export const cancelBooking = async (req, res) => {
  const id = req.params.booking_id;

  try {
    const booking = await Booking.deleteOne({ _id: id });

    if (booking.deletedCount === 0) {
      return res.status(404).send({ error: "Ingen bokning med id:t hittades" });
    }

    res.send({ message: "Avbokning bekräftad", id });
  } catch (error) {
    res.status(500).res.send({ error });
  }
};
