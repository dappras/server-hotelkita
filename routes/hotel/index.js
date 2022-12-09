const addHotel = require("./addHotel");
const confirmHotel = require("./confirmHotel");
const deleteHotel = require("./deleteHotel");
const editHotel = require("./editHotel");
const getAvailaleDate = require("./getAvailableDate");
const getBankHotel = require("./getBankHotel");
const getDetailHotel = require("./getDetailHotel");
const getHotel = require("./getHotel");
const getLatestHotel = require("./getLatestHotel");
const getMyHotel = require("./getMyHotel");
const searchHotel = require("./searchHotel");

const hotelRouter = (router) => {
  getHotel(router);
  getDetailHotel(router);
  searchHotel(router);
  addHotel(router);
  editHotel(router);
  deleteHotel(router);
  getMyHotel(router);
  getAvailaleDate(router);
  getBankHotel(router);
  getLatestHotel(router);
  confirmHotel(router);

  return router;
};

module.exports = hotelRouter;
