const auth = require("../../middlewares/auth");
const Hotel = require("../../models/hotel");
const User = require("../../models/user");

const getBankHotel = (router) => {
  router.post("/get-bank-hotel", auth, async (req, res) => {
    const { hotelId } = req.body;
    try {
      const hotel = await Hotel.findOne({ _id: hotelId });
      const user = await User.findOne({ _id: hotel.userId });

      if (
        (user.nameBank == null ||
          user.nameBank == undefined ||
          user.nameBank == "") &&
        (user.nomorRekening == null ||
          user.nomorRekening == undefined ||
          user.nomorRekening == "") &&
        (user.nameAccountBank == null ||
          user.nameAccountBank == undefined ||
          user.nameAccountBank == "")
      ) {
        return res.json({
          success: false,
          msg: "Pemilik fasilitas belum melengkapi informasi akun",
        });
      } else {
        const hasil = {
          nameBank: user.nameBank,
          nomorRekening: user.nomorRekening,
          nameAccountBank: user.nameAccountBank,
        };

        return res.json({
          success: true,
          msg: "Success getting data !!",
          data: hasil,
        });
      }
    } catch (e) {
      return res.json({
        success: false,
        msg: e.message,
      });
    }
  });
};

module.exports = getBankHotel;
