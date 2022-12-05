const Bank = require("../../models/bank");
const Booking = require("../../models/booking");
const auth = require("../../middlewares/auth");
const { uploadImage } = require("../../middlewares/base64");

const addBank = (router) => {
  router.post("/add-bank", auth, uploadImage, async (req, res) => {
    try {
      if (req.fileName == undefined) {
        return res.json({
          success: false,
          msg: "Please upload image",
        });
      }
      const { name, nameBank, nomorRekening, idBooking } = req.body;
      const booking = await Booking.findOne({ _id: idBooking });
      const hasil = await Bank.create({
        nameBank,
        nomorRekening,
        name,
        imageUrl: `images/${req.fileName}`,
      });
      booking.status = 1;
      booking.proofPaymentId = hasil._id;
      booking.save();
      return res.json({
        success: true,
        msg: "success create data",
        data: hasil,
      });
    } catch (e) {
      return res.json({ success: false, msg: e.message });
    }
  });
};

module.exports = addBank;
