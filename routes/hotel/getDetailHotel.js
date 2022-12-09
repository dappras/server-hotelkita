const Hotel = require("../../models/hotel");
const Image = require("../../models/image");

const getDetailHotel = (router) => {
  router.post("/get-detail-hotel", async (req, res) => {
    try {
      const { id } = req.body;
      const hotel = await Hotel.findOne({ _id: id });
      if (hotel === []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        const hasilItem = {
          _id: hotel._id,
          name: hotel.name,
          room: hotel.room,
          address: hotel.address,
          description: hotel.description,
          price: hotel.price,
          urlMaps: hotel.urlMaps,
          status: hotel.status,
          categoryId: hotel.categoryId,
          image: [],
          userId: hotel.userId,
        };
        for (let j = 0; j < hotel.imageId.length; j++) {
          const image = hotel.imageId[j];
          const imagehotel = await Image.findOne({ _id: image });

          hasilItem.image.push({
            id: image,
            imageUrl: `http://103.226.139.23:3000/${imagehotel.imageUrl}`,
          });
        }

        return res.json({
          success: true,
          msg: "success getting data",
          data: hasilItem,
        });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  });
};

module.exports = getDetailHotel;
