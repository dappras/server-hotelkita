const booking = require("./booking");
const cancelBooking = require("./cancelBooking");
const confirmBooking = require("./confirmBooking");
const getDetailMerchantBooking = require("./getDetailMerchantBooking");
const getDetailUserBooking = require("./getDetailUserBooking");
const getMerchantBooking = require("./getMerchantBooking");
const getUserBooking = require("./getUserBooking");

const bookingRouter = (router) => {
  booking(router);
  cancelBooking(router);
  getUserBooking(router);
  getMerchantBooking(router);
  getDetailUserBooking(router);
  getDetailMerchantBooking(router);
  confirmBooking(router);

  return router;
};

module.exports = bookingRouter;
