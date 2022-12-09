const auth = require("../../middlewares/auth");
const Hotel = require("../../models/hotel");
const User = require("../../models/user");

const confirmHotel = (router) => {
  router.post("/confirm-hotel", auth, async (req, res) => {
    const { hotelId } = req.body;
    try {
      const hotel = await Hotel.findOne({ _id: hotelId });

      hotel.status = 1;
      await hotel.save();

      return res.json({
        success: true,
        msg: "success confirm hotel!!",
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = confirmHotel;
