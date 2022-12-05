const Hotel = require("../../models/hotel");
const BookingDate = require("../../models/booking-date");

const getAvailaleDate = (router) => {
  router.post("/get-available-date", async (req, res) => {
    const { id } = req.body;
    try {
      const hotel = await Hotel.findOne({ _id: id });
      const date = await BookingDate.find({ hotelId: hotel._id });

      if (date != []) {
        let now = new Date();
        let tahun = now.getFullYear();
        const hasil = [];
        for (let i = 0; i < 14; i++) {
          let waktu = new Date(now);
          waktu.setDate(waktu.getDate() + i + 1);
          let tanggal = waktu.getDate();
          let bulan = waktu.getMonth() + 1;

          let jumlahroom = 0;

          for (let j = 0; j < date.length; j++) {
            const item = date[j];

            if (
              item.bookingDate === tanggal &&
              item.bookingMonth === bulan &&
              item.bookingYear === tahun
            ) {
              jumlahroom += 1;
            }
          }
          if (jumlahroom != hotel.room) {
            const data = {
              date: tanggal,
              month: bulan,
              year: tahun,
              availableRoom: hotel.room - jumlahroom,
            };

            hasil.push(data);
          }
        }

        return res.json({
          success: true,
          data: hasil,
        });
      } else {
        let now = new Date();
        let tahun = now.getFullYear();
        const hasil = [];
        for (let i = 0; i < 14; i++) {
          let waktu = new Date(now);
          waktu.setDate(waktu.getDate() + i);
          let tanggal = waktu.getDate();
          let bulan = waktu.getMonth() + 1;
          const data = {
            date: tanggal,
            month: bulan,
            year: tahun,
            availableRoom: hotel.room,
          };
          hasil.push(data);
        }

        return res.json({
          success: true,
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

module.exports = getAvailaleDate;
