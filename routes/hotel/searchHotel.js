const Hotel = require("../../models/hotel");
const Image = require("../../models/image");

const searchHotel = (router) => {
  router.post("/search-hotel", async (req, res) => {
    const { search } = req.body;

    try {
      const hotel = await Hotel.find({
        $or: [{ name: { $regex: search } }],
      });

      if (hotel === []) {
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
            description: hotelItem.description,
            price: hotelItem.price,
            urlMaps: hotelItem.urlMaps,
            categoryId: hotelItem.categoryId,
            image: [],
            userId: hotelItem.userId,
          };
          for (let j = 0; j < hotelItem.imageId.length; j++) {
            const image = hotelItem.imageId[j];
            const imagehotel = await Image.findOne({ _id: image });

            hasilItem.image.push(
              `http://103.226.139.23:3000/${imagehotel.imageUrl}`
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

module.exports = searchHotel;
