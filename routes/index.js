var express = require("express");
var homeRouter = require("./home");
var bankRouter = require("./bank");
const userRouter = require("./user");
const categoryRouter = require("./category");
const profileRouter = require("./profile");
const hotelRouter = require("./hotel");
const bookingRouter = require("./booking");

const routerComposer = () => {
  var expressRouter = express.Router();

  homeRouter(expressRouter);
  bankRouter(expressRouter);
  userRouter(expressRouter);
  categoryRouter(expressRouter);
  profileRouter(expressRouter);
  hotelRouter(expressRouter);
  bookingRouter(expressRouter);

  return expressRouter;
};

module.exports = routerComposer;
