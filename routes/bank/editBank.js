const Bank = require("../../models/bank");
const auth = require("../../middlewares/auth");
const { uploadImage } = require("../../middlewares/base64");
const fs = require("fs-extra");
const path = require("path");

const editBank = (router) => {
  router.post("/edit-bank", auth, uploadImage, async (req, res) => {
    const { id, name, nameBank, nomorRekening } = req.body;
    const bank = await Bank.findOne({ _id: id });
    try {
      if (req.fileName === undefined) {
        bank.name = name;
        bank.nameBank = nameBank;
        bank.nomorRekening = nomorRekening;
        await bank.save();
        return res.json({ success: true, msg: "success update data" });
      } else {
        await fs.unlink(path.join(`public/${bank.imageUrl}`));
        bank.name = name;
        bank.nameBank = nameBank;
        bank.nomorRekening = nomorRekening;
        bank.imageUrl = `images/${req.fileName}`;
        await bank.save();
        return res.json({ success: true, msg: "success update data" });
      }
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  });
};

module.exports = editBank;
