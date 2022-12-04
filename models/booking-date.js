const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookingDateSchema = new mongoose.Schema({
  bookingDate: {
    type: Number,
    required: true,
  },
  bookingMonth: {
    type: Number,
    required: true,
  },
  bookingYear: {
    type: Number,
    required: true,
  },
  invoice: {
    type: String,
    required: true,
  },
  hotelId: {
    type: ObjectId,
    ref: "Hotel",
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Booking-Date", bookingDateSchema);
