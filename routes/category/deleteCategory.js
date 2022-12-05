const auth = require("../../middlewares/auth");
const Category = require("../../models/category");
const fs = require("fs-extra");
const path = require("path");

const deleteCategory = (router) => {
  router.post("/delete-category", auth, async (req, res) => {
    try {
      const { id } = req.body;
      const category = await Category.findOne({ _id: id });
      await fs.unlink(path.join(`public/${category.imageUrl}`));
      await category.delete();

      return res.json({ success: true, msg: "success delete data" });
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  });
};

module.exports = deleteCategory;
