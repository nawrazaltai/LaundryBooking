import Booking from "../models/bookingModel.js";

export const postBooking = async (req, res) => {
  // console.log(req.body);

  const { date, user_id, session_idx } = req.body;

  if (!user_id) {
    return res.status(400).send({ error: "Användar id saknas." });
  }

  try {
    const isBooked = await Booking.findOne({
      date: date,
      session_idx: session_idx,
    });

    if (isBooked) {
      res.send("Vald tid är redan bokad.");
      return;
    }

    const addBooking = await Booking.create({
      date,
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

  try {
    const bookings = await Booking.find({
      user_id: user_id,
      date: { $gte: today },
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

  try {
    const bookings = await Booking.find({ date });

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
