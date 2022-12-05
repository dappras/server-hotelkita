const auth = require("../../middlewares/auth");
const Hotel = require("../../models/hotel");
const Image = require("../../models/image");
const Category = require("../../models/category");
const User = require("../../models/user");
const { uploadMultipleImage } = require("../../middlewares/base64");

const addHotel = (router) => {
  router.post("/add-hotel", auth, uploadMultipleImage, async (req, res) => {
    try {
      const { name, address, description, price, room, urlMaps, categoryId } =
        req.body;

      const user = await User.findOne({ token: req.token });

      if (req.fileName == undefined) {
        return res.json({
          success: false,
          msg: "Please upload image",
        });
      }

      if (
        (user.nameBank == null ||
          user.nameBank == undefined ||
          user.nameBank == "") &&
        (user.nomorRekening == null ||
          user.nomorRekening == undefined ||
          user.nomorRekening == "") &&
        (user.nameAccountBank == null ||
          user.nameAccountBank == undefined ||
          user.nameAccountBank == "")
      ) {
        return res.json({
          success: false,
          msg: "Silahkan lengkapi informasi bank user anda",
        });
      } else {
        if (req.fileName.length > 0) {
          const category = await Category.findOne({ _id: categoryId });
          const newhotel = {
            categoryId: category._id,
            name,
            room,
            address,
            description,
            price,
            urlMaps,
            userId: user._id,
          };
          const hotel = await Hotel.create(newhotel);

          category.hotelId.push({ _id: hotel._id });
          await category.save();

          for (let i = 0; i < req.fileName.length; i++) {
            const imageSave = await Image.create({
              imageUrl: `images/${req.fileName[i]}`,
            });
            hotel.imageId.push({ _id: imageSave._id });
            await hotel.save();
          }

          return res.json({
            success: true,
            msg: "success create data",
            data: hotel,
          });
        }
      }
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = addHotel;
