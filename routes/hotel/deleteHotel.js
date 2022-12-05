const auth = require("../../middlewares/auth");
const Hotel = require("../../models/hotel");
const Image = require("../../models/image");
const Category = require("../../models/category");
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
      await hotel.remove();
      return res.json({ success: true, msg: "success delete data" });
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = deleteHotel;
