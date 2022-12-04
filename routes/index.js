var express = require("express");
var homeRouter = require("./home");

const routerComposer = () => {
  var expressRouter = express.Router();

  homeRouter(expressRouter);

  return expressRouter;
};

module.exports = routerComposer;
