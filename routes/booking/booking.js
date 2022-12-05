const User = require("../../models/user");
const Booking = require("../../models/booking");
const Hotel = require("../../models/hotel");
const auth = require("../../middlewares/auth");

const booking = (router) => {
  router.post("/booking", auth, async (req, res) => {
    const { bookingDate, bookingYear, bookingMonth, total, hotelId } = req.body;
    try {
      const user = await User.findOne({ token: req.token });
      const userHotel = await Hotel.findOne({ _id: hotelId });
      let invoice = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < 25; i++) {
        invoice += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      const booking = await Booking.create({
        bookingDate,
        bookingMonth,
        bookingYear,
        invoice,
        total,
        hotelId,
        userHotelId: userHotel.userId,
        userId: user._id,
      });

      return res.json({
        success: true,
        msg: "success booking, please wait for validation",
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

module.exports = booking;
