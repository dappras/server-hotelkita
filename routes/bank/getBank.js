const Bank = require("../../models/bank");
const auth = require("../../middlewares/auth");

const getBank = (router) => {
  router.post("/get-bank", auth, async (req, res) => {
    try {
      const bank = await Bank.find();
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

module.exports = getBank;
