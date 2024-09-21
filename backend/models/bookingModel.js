import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    session_idx: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },

    // apartmentNumber: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
