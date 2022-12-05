const auth = require("../../middlewares/auth");
const Booking = require("../../models/booking");
const BookingDate = require("../../models/booking-date");

const confirmBooking = (router) => {
  router.post("/confirm-booking", auth, async (req, res) => {
    const { bookingId } = req.body;
    try {
      const booking = await Booking.findOne({ _id: bookingId });

      const bookingDate = await BookingDate.create({
        bookingDate: booking.bookingDate,
        bookingMonth: booking.bookingMonth,
        bookingYear: booking.bookingYear,
        invoice: booking.invoice,
        hotelId: booking.hotelId,
        userId: booking.userId,
      });

      booking.status = 2;
      booking.save();

      return res.json({
        success: true,
        msg: "success confirm payment",
        data: booking,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = confirmBooking;
