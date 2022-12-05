const auth = require("../../middlewares/auth");
const Category = require("../../models/category");
const { uploadImage } = require("../../middlewares/base64");
const fs = require("fs-extra");
const path = require("path");

const editCategory = (router) => {
  router.post("/edit-category", auth, uploadImage, async (req, res) => {
    const { id, name } = req.body;
    try {
      const category = await Category.findOne({ _id: id });

      if (req.fileName == undefined) {
        category.name = name;
        await category.save();

        return res.json({ success: true, msg: "success update data" });
      } else {
        await fs.unlink(path.join(`public/${category.imageUrl}`));
        category.name = name;
        category.imageUrl = `images/${req.fileName}`;
        await category.save();

        return res.json({ success: true, msg: "success update data" });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  });
};

module.exports = editCategory;
