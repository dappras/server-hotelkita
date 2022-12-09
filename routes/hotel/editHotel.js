const auth = require("../../middlewares/auth");
const Hotel = require("../../models/hotel");
const Image = require("../../models/image");
const Category = require("../../models/category");
const fs = require("fs-extra");
const path = require("path");
const { uploadMultipleImage } = require("../../middlewares/base64");

const editHotel = (router) => {
  router.post("/edit-hotel", auth, uploadMultipleImage, async (req, res) => {
    try {
      const {
        id,
        name,
        address,
        description,
        room,
        price,
        urlMaps,
        categoryId,
        removedImage,
      } = req.body;

      const hotel = await Hotel.findOne({ _id: id });

      if (req.fileName != undefined) {
        for (let i = 0; i < removedImage.length; i++) {
          const item = removedImage[i];
          await Hotel.updateMany({}, { $pull: { imageId: { $in: [item] } } });
          const image = await Image.findOne({ _id: item });
          await fs.unlink(path.join(`public/${image.imageUrl}`));
          await image.remove();
        }

        for (let i = 0; i < req.fileName.length; i++) {
          const item = req.fileName[i];
          const imageSave = await Image.create({
            imageUrl: `images/${item}`,
          });
          await hotel.imageId.push(imageSave._id);
        }

        hotel.name = name;
        hotel.room = room;
        hotel.address = address;
        hotel.description = description;
        hotel.price = price;
        hotel.urlMaps = urlMaps;

        if (hotel.categoryId === categoryId) {
          hotel.categoryId = categoryId;
        } else {
          const category = await Category.findOne({ _id: hotel.categoryId });
          await Category.updateMany({}, { $pull: { hotelId: { $in: [id] } } });
          await category.save();

          const categoryNew = await Category.findOne({ _id: categoryId });
          categoryNew.hotelId.push({ _id: id });
          await categoryNew.save();

          hotel.categoryId = categoryId;
        }

        await hotel.save();

        return res.json({
          success: true,
          msg: "success update data",
        });
      } else {
        for (let i = 0; i < removedImage.length; i++) {
          const item = removedImage[i];
          await Hotel.updateMany({}, { $pull: { imageId: { $in: [item] } } });
          const image = await Image.findOne({ _id: item });
          await fs.unlink(path.join(`public/${image.imageUrl}`));
          await image.remove();
        }

        hotel.name = name;
        hotel.room = room;
        hotel.address = address;
        hotel.description = description;
        hotel.price = price;
        hotel.urlMaps = urlMaps;
        hotel.categoryId = categoryId;

        if (hotel.categoryId === categoryId) {
          hotel.categoryId = categoryId;
        } else {
          const category = await Category.findOne({ _id: hotel.categoryId });
          await Category.updateMany({}, { $pull: { hotelId: { $in: [id] } } });
          await category.save();

          const categoryNew = await Category.findOne({ _id: categoryId });
          categoryNew.hotelId.push({ _id: id });
          await categoryNew.save();

          hotel.categoryId = categoryId;
        }

        await hotel.save();

        return res.json({
          success: true,
          msg: "success update data",
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

module.exports = editHotel;
