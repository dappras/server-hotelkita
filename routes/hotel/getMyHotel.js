const auth = require("../../middlewares/auth");
const Hotel = require("../../models/hotel");
const Image = require("../../models/image");
const User = require("../../models/user");

const getMyHotel = (router) => {
  router.post("/get-my-hotel", auth, async (req, res) => {
    try {
      const user = await User.findOne({ token: req.token });

      const hotel = await Hotel.find({ userId: user._id });

      if (hotel == []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        hasil = [];
        for (let i = 0; i < hotel.length; i++) {
          const hotelItem = hotel[i];
          const hasilItem = {
            _id: hotelItem._id,
            name: hotelItem.name,
            room: hotelItem.room,
            address: hotelItem.address,
            status: hotelItem.status,
            description: hotelItem.description,
            price: hotelItem.price,
            urlMaps: hotelItem.urlMaps,
            categoryId: hotelItem.categoryId,
            image: [],
            userId: hotelItem.userId,
          };
          for (let j = 0; j < hotelItem.imageId.length; j++) {
            const image = hotelItem.imageId[j];
            const imageHotel = await Image.findOne({ _id: image });

            hasilItem.image.push(
              `http://103.226.139.23:3000/${imageHotel.imageUrl}`
            );
          }

          hasil.push(hasilItem);
        }
        return res.json({
          success: true,
          msg: "success getting data",
          data: hasil,
        });
      }
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = getMyHotel;
