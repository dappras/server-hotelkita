const auth = require("../../middlewares/auth");
const User = require("../../models/user");
const Booking = require("../../models/booking");
const Hotel = require("../../models/hotel");
const Image = require("../../models/image");

const getUserBooking = (router) => {
  router.post("/get-user-booking", auth, async (req, res) => {
    const { status } = req.body;
    try {
      const user = await User.findOne({ token: req.token });
      const bookingAll = await Booking.find({ userId: user._id });

      let booking = [];

      if (status != undefined) {
        bookingAll.forEach((item) => {
          if (item.status == status) {
            booking.push(item);
          }
        });
      } else {
        booking = bookingAll;
      }

      const hasil = [];

      for (let i = 0; i < booking.length; i++) {
        const item = booking[i];

        const hotel = await Hotel.findOne({ _id: item.hotelId });

        const hasilItem = {
          _id: hotel._id,
          name: hotel.name,
          room: hotel.room,
          address: hotel.address,
          description: hotel.description,
          price: hotel.price,
          urlMaps: hotel.urlMaps,
          categoryId: hotel.categoryId,
          image: [],
          userId: hotel.userId,
        };
        for (let j = 0; j < hotel.imageId.length; j++) {
          const image = hotel.imageId[j];
          const imageHotel = await Image.findOne({ _id: image });

          hasilItem.image.push(
            `http://103.226.139.23:3000/${imageHotel.imageUrl}`
          );
        }

        const hasilLoop = { booking: item, hotel: hasilItem };
        hasil.push(hasilLoop);
      }

      return res.json({
        success: true,
        msg: "success getting data!!",
        data: hasil,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = getUserBooking;
