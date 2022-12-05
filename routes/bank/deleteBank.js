const Bank = require("../../models/bank");
const auth = require("../../middlewares/auth");
const fs = require("fs-extra");
const path = require("path");

const deleteBank = (router) => {
  router.post("/delete-bank", auth, async (req, res) => {
    try {
      const { id } = req.body;
      const bank = await Bank.findOne({ _id: id });
      await fs.unlink(path.join(`public/${bank.imageUrl}`));
      await bank.remove();

      return res.json({ success: true, msg: "success delete data" });
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  });
};

module.exports = deleteBank;
