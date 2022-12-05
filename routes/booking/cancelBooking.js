const Booking = require("../../models/booking");
const auth = require("../../middlewares/auth");

const cancelBooking = (router) => {
  router.post("/cancel-booking", auth, async (req, res) => {
    const { id } = req.body;
    try {
      const booking = await Booking.findOne({ _id: id });

      if (booking.status != 0) {
        return res.json({
          success: false,
          msg: "Hanya bisa dilakukan pada tahap sebelum pembayaran",
        });
      }

      await booking.remove();

      return res.json({
        success: true,
        msg: "Success cancel booking",
      });
    } catch (e) {
      return res.json({
        success: true,
        msg: e.message,
      });
    }
  });
};

module.exports = cancelBooking;
