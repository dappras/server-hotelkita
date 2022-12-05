var express = require("express");
var homeRouter = require("./home");
var bankRouter = require("./bank");
const userRouter = require("./user");
const categoryRouter = require("./category");

const routerComposer = () => {
  var expressRouter = express.Router();

  homeRouter(expressRouter);
  bankRouter(expressRouter);
  userRouter(expressRouter);
  categoryRouter(expressRouter);

  return expressRouter;
};

module.exports = routerComposer;
