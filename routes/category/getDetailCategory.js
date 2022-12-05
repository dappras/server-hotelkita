const Category = require("../../models/category");

const getDetailCategory = (router) => {
  router.post("/get-detail-category", async (req, res) => {
    try {
      const { id } = req.body;
      const category = await Category.findOne({ _id: id });
      if (category === []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        return res.json({
          success: true,
          msg: "success getting data",
          data: category,
        });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  });
};

module.exports = getDetailCategory;
