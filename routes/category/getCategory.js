const Category = require("../../models/category");

const getCategory = (router) => {
  router.post("/get-category", async (req, res) => {
    try {
      const category = await Category.find();
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

module.exports = getCategory;
