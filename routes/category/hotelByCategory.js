const Category = require("../../models/category");
const Hotel = require("../../models/hotel");
const Image = require("../../models/image");

const hotelByCategory = (router) => {
  router.post("/hotel-by-category", async (req, res) => {
    const { id } = req.body;
    try {
      const category = await Category.findOne({ _id: id });
      const arrHotel = [];

      for (let i = 0; i < category.hotelId.length; i++) {
        let hotelItem = await Hotel.findOne({
          _id: category.hotelId[i],
        });
        if (hotelItem.status == 1) {
          const hasilItem = {
            id: hotelItem._id,
            name: hotelItem.name,
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
            const imageFacility = await Image.findOne({ _id: image });

            hasilItem.image.push(
              `http://103.226.139.23:3000/${imageFacility.imageUrl}`
            );
          }

          arrHotel.push(hasilItem);
        }
      }

      return res.json({
        success: true,
        msg: "success getting data",
        data: arrHotel,
      });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = hotelByCategory;
