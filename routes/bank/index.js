const addBank = require("./addBank");
const deleteBank = require("./deleteBank");
const editBank = require("./editBank");
const getBank = require("./getBank");
const getDetailBank = require("./getDetailBank");

const bankRouter = (router) => {
  getBank(router);
  getDetailBank(router);
  addBank(router);
  editBank(router);
  deleteBank(router);

  return router;
};

module.exports = bankRouter;
