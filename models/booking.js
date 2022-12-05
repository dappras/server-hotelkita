const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const bookingSchema = new mongoose.Schema({
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
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  hotelId: {
    type: ObjectId,
    ref: "Hotel",
    required: true,
  },
  userHotelId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  proofPaymentId: {
    type: ObjectId,
    ref: "Bank",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
