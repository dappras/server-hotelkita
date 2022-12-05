const auth = require("../../middlewares/auth");
const Category = require("../../models/category");
const { uploadImage } = require("../../middlewares/base64");

const addCategory = (router) => {
  router.post("/add-category", auth, uploadImage, async (req, res) => {
    try {
      if (req.fileName == undefined) {
        return res.json({
          success: false,
          msg: "Please upload image",
        });
      }

      const { name } = req.body;
      const hasil = await Category.create({
        name,
        imageUrl: `images/${req.fileName}`,
      });
      return res.json({
        success: true,
        msg: "success create data",
        data: hasil,
      });
    } catch (error) {
      return res.json({ success: false, msg: e.message });
    }
  });
};

module.exports = addCategory;
