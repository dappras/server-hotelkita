const auth = require("../../middlewares/auth");
const Hotel = require("../../models/hotel");
const Image = require("../../models/image");
const Category = require("../../models/category");
const Booking = require("../../models/booking");
const BookingDate = require("../../models/booking-date");
const fs = require("fs-extra");
const path = require("path");

const deleteHotel = (router) => {
  router.post("/delete-hotel", auth, async (req, res) => {
    try {
      const { id } = req.body;
      const hotel = await Hotel.findOne({ _id: id });

      for (let i = 0; i < hotel.imageId.length; i++) {
        await Image.findOne({ _id: hotel.imageId[i]._id })
          .then((image) => {
            fs.unlink(path.join(`public/${image.imageUrl}`));
            image.remove();
          })
          .catch((e) => {
            return res.json({
              success: false,
              msg: e.message,
            });
          });
      }
      const category = await Category.findOne({ _id: hotel.categoryId });
      await Category.updateMany({}, { $pull: { hotelId: { $in: [id] } } });
      await category.save();

      try {
        const bookingFacility = await Booking.find({ hotelId: hotel._id });
        await bookingFacility.remove();
        const bookingDateFacility = await BookingDate.find({
          hotelId: hotel._id,
        });
        await bookingDateFacility.remove();

        await hotel.remove();
        return res.json({ success: true, msg: "success delete data" });
      } catch (e) {
        await hotel.remove();
        return res.json({ success: true, msg: "success delete data" });
      }

      // await hotel.remove();
      // return res.json({ success: true, msg: "success delete data" });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = deleteHotel;
