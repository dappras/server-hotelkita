const Bank = require("../../models/bank");
const auth = require("../../middlewares/auth");

const getDetailBank = (router) => {
  router.post("/get-detail-bank", auth, async (req, res) => {
    try {
      const { id } = req.body;
      const bank = await Bank.findOne({ _id: id });
      if (bank === []) {
        return res.json({
          success: true,
          msg: "success getting data",
          data: [],
        });
      } else {
        return res.json({
          success: true,
          msg: "success getting data",
          data: bank,
        });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  });
};

module.exports = getDetailBank;
