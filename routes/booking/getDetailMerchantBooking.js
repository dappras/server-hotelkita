const auth = require("../../middlewares/auth");
const Booking = require("../../models/booking");
const Hotel = require("../../models/hotel");
const Bank = require("../../models/bank");
const Image = require("../../models/image");

const getDetailMerchantBooking = (router) => {
  router.post("/get-detail-merchant-booking", auth, async (req, res) => {
    const { bookingId } = req.body;
    try {
      const booking = await Booking.findOne({ _id: bookingId });
      const hotel = await Hotel.findOne({ _id: booking.hotelId });
      const proofPayment = await Bank.findOne({ _id: booking.proofPaymentId });

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

      proofPayment.imageUrl = `http://103.226.139.23:3000/${proofPayment.imageUrl}`;

      const hasil = {
        hotel: hasilItem,
        booking: booking,
        proofPayment: proofPayment,
      };

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

module.exports = getDetailMerchantBooking;
